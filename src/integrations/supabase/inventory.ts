import { supabase } from './client';
import { v4 as uuidv4 } from 'uuid';
import { User } from '@supabase/supabase-js';

// Type definitions
export interface InventoryItem {
  id: string;
  item_id: string;
  barcode: string;
  description: string;
  purchase_amount: number;
  selling_price: number;
  markup_percentage: number;
  quantity: number;
  minimum_stock_level: number;
  category: string;
  batch_no: string;
  supplier: string;
  location: string;
  notes: string;
  receive_date: string;
  expiry_date?: string;
  created_at: string;
  updated_at: string;
  status: 'active' | 'low_stock' | 'out_of_stock' | 'expired' | 'damaged';
}

export interface StockTransaction {
  id: string;
  inventory_item_id: string;
  transaction_type: 'add' | 'remove' | 'damage' | 'expire' | 'adjust';
  quantity: number;
  previous_quantity: number;
  new_quantity: number;
  notes: string;
  performed_by: string;
  transaction_date: string;
  reference?: string; // For invoice, quotation, etc. references
  location?: string;
}

export interface DamageReport {
  id: string;
  inventory_item_id: string;
  type: 'damaged' | 'expired';
  quantity: number;
  reason: string;
  action_taken: 'write-off' | 'return-to-supplier';
  location: string;
  notes: string;
  report_date: string;
  reported_by: string;
}

// Create a new inventory item
export const createInventoryItem = async (
  item: Omit<InventoryItem, 'id' | 'created_at' | 'updated_at' | 'status'>,
  user: User
): Promise<InventoryItem | null> => {
  try {
    // Determine status based on quantity and minimum stock level
    let status: InventoryItem['status'] = 'active';
    if (item.quantity <= 0) {
      status = 'out_of_stock';
    } else if (item.quantity <= item.minimum_stock_level) {
      status = 'low_stock';
    }
    
    // Check if item has expired
    if (item.expiry_date && new Date(item.expiry_date) <= new Date()) {
      status = 'expired';
    }
    
    const newItem = {
      id: uuidv4(),
      ...item,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      status
    };
    
    const { data, error } = await supabase
      .from('inventory_items')
      .insert(newItem)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating inventory item:', error);
      return null;
    }
    
    // Create initial stock transaction
    if (item.quantity > 0) {
      await createStockTransaction({
        inventory_item_id: data.id,
        transaction_type: 'add',
        quantity: item.quantity,
        previous_quantity: 0,
        new_quantity: item.quantity,
        notes: 'Initial stock',
        performed_by: user.id,
        transaction_date: new Date().toISOString(),
        location: item.location
      }, user);
    }
    
    return data;
  } catch (error) {
    console.error('Unexpected error creating inventory item:', error);
    return null;
  }
};

// Get all inventory items with optional filters
export const getInventoryItems = async (filters?: {
  category?: string;
  status?: InventoryItem['status'];
  search?: string;
  lowStock?: boolean;
  expiringSoon?: boolean;
}): Promise<InventoryItem[]> => {
  try {
    let query = supabase
      .from('inventory_items')
      .select('*');
    
    // Apply filters if provided
    if (filters) {
      if (filters.category) {
        query = query.eq('category', filters.category);
      }
      
      if (filters.status) {
        query = query.eq('status', filters.status);
      }
      
      if (filters.search) {
        query = query.or(`description.ilike.%${filters.search}%,barcode.ilike.%${filters.search}%,item_id.ilike.%${filters.search}%`);
      }
      
      if (filters.lowStock) {
        query = query.lte('quantity', supabase.raw('minimum_stock_level'));
      }
      
      if (filters.expiringSoon) {
        // Items that expire within the next 30 days
        const thirtyDaysFromNow = new Date();
        thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
        
        query = query.lte('expiry_date', thirtyDaysFromNow.toISOString());
        query = query.gt('expiry_date', new Date().toISOString());
      }
    }
    
    const { data, error } = await query.order('updated_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching inventory items:', error);
      return [];
    }
    
    return data;
  } catch (error) {
    console.error('Unexpected error fetching inventory items:', error);
    return [];
  }
};

// Get a single inventory item by ID
export const getInventoryItemById = async (id: string): Promise<InventoryItem | null> => {
  try {
    const { data, error } = await supabase
      .from('inventory_items')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching inventory item:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Unexpected error fetching inventory item:', error);
    return null;
  }
};

// Get a single inventory item by barcode
export const getInventoryItemByBarcode = async (barcode: string): Promise<InventoryItem | null> => {
  try {
    const { data, error } = await supabase
      .from('inventory_items')
      .select('*')
      .eq('barcode', barcode)
      .single();
    
    if (error) {
      console.error('Error fetching inventory item by barcode:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Unexpected error fetching inventory item by barcode:', error);
    return null;
  }
};

// Update an inventory item
export const updateInventoryItem = async (
  id: string, 
  updates: Partial<InventoryItem>
): Promise<InventoryItem | null> => {
  try {
    // Don't allow direct updates to quantity through this function
    // Quantity should only be updated through stock transactions
    const { quantity, ...validUpdates } = updates;
    
    const { data, error } = await supabase
      .from('inventory_items')
      .update({
        ...validUpdates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating inventory item:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Unexpected error updating inventory item:', error);
    return null;
  }
};

// Delete an inventory item
export const deleteInventoryItem = async (id: string): Promise<boolean> => {
  try {
    // First, delete all related transactions
    const { error: transactionError } = await supabase
      .from('stock_transactions')
      .delete()
      .eq('inventory_item_id', id);
    
    if (transactionError) {
      console.error('Error deleting related stock transactions:', transactionError);
      return false;
    }
    
    // Then, delete all related damage reports
    const { error: damageError } = await supabase
      .from('damage_reports')
      .delete()
      .eq('inventory_item_id', id);
    
    if (damageError) {
      console.error('Error deleting related damage reports:', damageError);
      return false;
    }
    
    // Finally, delete the inventory item
    const { error } = await supabase
      .from('inventory_items')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting inventory item:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Unexpected error deleting inventory item:', error);
    return false;
  }
};

// Create a stock transaction and update item quantity
export const createStockTransaction = async (
  transaction: Omit<StockTransaction, 'id'>,
  user: User
): Promise<StockTransaction | null> => {
  try {
    // Start a Supabase transaction
    const newTransaction = {
      id: uuidv4(),
      ...transaction,
      performed_by: transaction.performed_by || user.id
    };
    
    // Insert the transaction
    const { data: transactionData, error: transactionError } = await supabase
      .from('stock_transactions')
      .insert(newTransaction)
      .select()
      .single();
    
    if (transactionError) {
      console.error('Error creating stock transaction:', transactionError);
      return null;
    }
    
    // Update the inventory item's quantity
    const { data: itemData, error: itemError } = await supabase
      .from('inventory_items')
      .update({
        quantity: transaction.new_quantity,
        updated_at: new Date().toISOString(),
        // Update status based on new quantity
        status: await getStatusFromQuantity(transaction.new_quantity, transaction.inventory_item_id)
      })
      .eq('id', transaction.inventory_item_id)
      .select()
      .single();
    
    if (itemError) {
      console.error('Error updating inventory item quantity:', itemError);
      return null;
    }
    
    return transactionData;
  } catch (error) {
    console.error('Unexpected error creating stock transaction:', error);
    return null;
  }
};

// Helper function to determine item status based on quantity
const getStatusFromQuantity = async (newQuantity: number, itemId: string): Promise<InventoryItem['status']> => {
  try {
    // Get current item to check minimum stock level
    const { data, error } = await supabase
      .from('inventory_items')
      .select('minimum_stock_level, expiry_date')
      .eq('id', itemId)
      .single();
    
    if (error) {
      console.error('Error fetching item details for status update:', error);
      return 'active'; // Default fallback
    }
    
    // Check expiry first
    if (data.expiry_date && new Date(data.expiry_date) <= new Date()) {
      return 'expired';
    }
    
    // Then check stock levels
    if (newQuantity <= 0) {
      return 'out_of_stock';
    } else if (newQuantity <= data.minimum_stock_level) {
      return 'low_stock';
    }
    
    return 'active';
  } catch (error) {
    console.error('Unexpected error determining item status:', error);
    return 'active'; // Default fallback
  }
};

// Get stock transactions for an item
export const getStockTransactions = async (itemId: string): Promise<StockTransaction[]> => {
  try {
    const { data, error } = await supabase
      .from('stock_transactions')
      .select('*')
      .eq('inventory_item_id', itemId)
      .order('transaction_date', { ascending: false });
    
    if (error) {
      console.error('Error fetching stock transactions:', error);
      return [];
    }
    
    return data;
  } catch (error) {
    console.error('Unexpected error fetching stock transactions:', error);
    return [];
  }
};

// Create a damage report and update item status
export const createDamageReport = async (
  report: Omit<DamageReport, 'id'>,
  user: User,
  updateStock: boolean = true
): Promise<DamageReport | null> => {
  try {
    const newReport = {
      id: uuidv4(),
      ...report,
      reported_by: report.reported_by || user.id
    };
    
    // Insert the damage report
    const { data: reportData, error: reportError } = await supabase
      .from('damage_reports')
      .insert(newReport)
      .select()
      .single();
    
    if (reportError) {
      console.error('Error creating damage report:', reportError);
      return null;
    }
    
    // If we need to update the stock quantity (e.g., write-off)
    if (updateStock && report.action_taken === 'write-off') {
      // Get current item quantity
      const { data: itemData, error: itemError } = await supabase
        .from('inventory_items')
        .select('quantity')
        .eq('id', report.inventory_item_id)
        .single();
      
      if (itemError) {
        console.error('Error fetching item quantity for damage report:', itemError);
        return reportData;
      }
      
      const previousQuantity = itemData.quantity;
      const newQuantity = Math.max(0, previousQuantity - report.quantity);
      
      // Create a stock transaction for the damaged/expired items
      await createStockTransaction({
        inventory_item_id: report.inventory_item_id,
        transaction_type: report.type === 'damaged' ? 'damage' : 'expire',
        quantity: report.quantity,
        previous_quantity: previousQuantity,
        new_quantity: newQuantity,
        notes: `${report.type === 'damaged' ? 'Damaged' : 'Expired'} item report: ${report.reason}`,
        performed_by: report.reported_by,
        transaction_date: report.report_date,
        location: report.location,
        reference: reportData.id
      }, user);
      
      // Update item status to damaged if appropriate
      if (report.type === 'damaged' && newQuantity === 0) {
        await updateInventoryItem(report.inventory_item_id, {
          status: 'damaged'
        });
      }
    }
    
    return reportData;
  } catch (error) {
    console.error('Unexpected error creating damage report:', error);
    return null;
  }
};

// Get damage reports for an item
export const getDamageReports = async (itemId: string): Promise<DamageReport[]> => {
  try {
    const { data, error } = await supabase
      .from('damage_reports')
      .select('*')
      .eq('inventory_item_id', itemId)
      .order('report_date', { ascending: false });
    
    if (error) {
      console.error('Error fetching damage reports:', error);
      return [];
    }
    
    return data;
  } catch (error) {
    console.error('Unexpected error fetching damage reports:', error);
    return [];
  }
};

// Get inventory summary statistics
export const getInventorySummary = async (): Promise<{
  totalItems: number;
  totalValue: number;
  lowStockItems: number;
  expiringItems: number;
  damagedItems: number;
  outOfStockItems: number;
}> => {
  try {
    // Get total count and values
    const { data: countData, error: countError } = await supabase
      .from('inventory_items')
      .select('id, quantity, purchase_amount, status')
      .order('id');
    
    if (countError) {
      console.error('Error fetching inventory summary:', countError);
      return {
        totalItems: 0,
        totalValue: 0,
        lowStockItems: 0,
        expiringItems: 0,
        damagedItems: 0,
        outOfStockItems: 0
      };
    }
    
    // Calculate summary data
    const totalValue = countData.reduce((sum, item) => sum + (item.quantity * item.purchase_amount), 0);
    const lowStockItems = countData.filter(item => item.status === 'low_stock').length;
    const expiringItems = countData.filter(item => item.status === 'expired').length;
    const damagedItems = countData.filter(item => item.status === 'damaged').length;
    const outOfStockItems = countData.filter(item => item.status === 'out_of_stock').length;
    
    return {
      totalItems: countData.length,
      totalValue,
      lowStockItems,
      expiringItems,
      damagedItems,
      outOfStockItems
    };
  } catch (error) {
    console.error('Unexpected error fetching inventory summary:', error);
    return {
      totalItems: 0,
      totalValue: 0,
      lowStockItems: 0,
      expiringItems: 0,
      damagedItems: 0,
      outOfStockItems: 0
    };
  }
};


import React from 'react';
import InvoicesTable from './InvoicesTable';
import InvoicesGrid from './InvoicesGrid';
import InvoicesPagination from './InvoicesPagination';
import { Invoice } from '@/pages/Invoices';

interface InvoicesContentProps {
  invoices: Invoice[];
  viewMode: 'table' | 'grid';
  selectedInvoices: string[];
  onSelectInvoice: (id: string) => void;
  onSelectAll: (selected: boolean) => void;
  sortField: string;
  sortDirection: 'asc' | 'desc';
  onSort: (field: string) => void;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (items: number) => void;
  onRecordPayment: (invoice: Invoice) => void;
}

const InvoicesContent: React.FC<InvoicesContentProps> = ({
  invoices,
  viewMode,
  selectedInvoices,
  onSelectInvoice,
  onSelectAll,
  sortField,
  sortDirection,
  onSort,
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  onPageChange,
  onItemsPerPageChange,
  onRecordPayment
}) => {
  return (
    <div className="space-y-6">
      {viewMode === 'table' ? (
        <InvoicesTable
          invoices={invoices}
          selectedInvoices={selectedInvoices}
          onSelectInvoice={onSelectInvoice}
          onSelectAll={onSelectAll}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={onSort}
          onRecordPayment={onRecordPayment}
        />
      ) : (
        <InvoicesGrid
          invoices={invoices}
          selectedInvoices={selectedInvoices}
          onSelectInvoice={onSelectInvoice}
          onRecordPayment={onRecordPayment}
        />
      )}
      
      <InvoicesPagination
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        onPageChange={onPageChange}
        onItemsPerPageChange={onItemsPerPageChange}
      />
    </div>
  );
};

export default InvoicesContent;

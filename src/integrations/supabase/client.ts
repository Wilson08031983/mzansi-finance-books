import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Use environment variables to get the Supabase URL and key
// For Vite, we need to use import.meta.env instead of process.env
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://lkspukpjchmysbbhjksz.supabase.co";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxrc3B1a3BqY2hteXNiYmhqa3N6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1NDM5ODAsImV4cCI6MjA2NTExOTk4MH0.fYIbKPTyMv0T9chlyG4LLA7AmXRPpTrxbiQvkU6flT8";

// Check if environment variables are configured properly
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn(
    "⚠️ Supabase environment variables are not set. Using default values.",
  );
}

console.log("🔐 Initializing Supabase client with URL:", SUPABASE_URL);

// Create the Supabase client with error handling
let supabase;
try {
  supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
  console.log("✅ Supabase client created successfully");
} catch (error) {
  console.error("❌ Error creating Supabase client:", error);
  // Create a fallback client that won't crash the app but won't work properly
  supabase = createClient<Database>(
    "https://lkspukpjchmysbbhjksz.supabase.co", 
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxrc3B1a3BqY2hteXNiYmhqa3N6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1NDM5ODAsImV4cCI6MjA2NTExOTk4MH0.fYIbKPTyMv0T9chlyG4LLA7AmXRPpTrxbiQvkU6flT8"
  );
}

export { supabase };

/**
 * Check if the Supabase connection is working
 */
export async function checkSupabaseConnection(): Promise<{ connected: boolean; error?: string; projectRef?: string }> {
  try {
    // A simple health check query
    const { data, error } = await supabase.from('profiles').select('count', { count: 'exact', head: true });
    
    if (error) {
      console.error('Supabase connection check failed:', error.message);
      return { connected: false, error: error.message };
    }
    
    console.log("✅ Supabase connection successful!");
    console.log("Project: lkspukpjchmysbbhjksz");
    console.log("URL:", SUPABASE_URL);
    
    return {
      connected: true,
      projectRef: 'lkspukpjchmysbbhjksz'
    };
  } catch (err) {
    const error = err instanceof Error ? err.message : 'Unknown error';
    console.error('Supabase connection check error:', error);
    return { connected: false, error };
  }
}

// Export config for reference
export const supabaseConfig = {
  url: SUPABASE_URL,
  projectRef: 'lkspukpjchmysbbhjksz'
};

console.log("Supabase URL:", SUPABASE_URL);
console.log("Using Supabase config for project lkspukpjchmysbbhjksz");
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://oymlikmotraabukjqkkx.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95bWxpa21vdHJhYWJ1a2pxa2t4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5NTk5MTIsImV4cCI6MjA2NDUzNTkxMn0.GpzCytmpAwCMJZ3p1W6Sq7ARICev00N54AYioyrplhQ";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
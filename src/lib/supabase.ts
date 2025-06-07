import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oymlikmotraabukjqkkx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95bWxpa21vdHJhYWJ1a2pxa2t4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5NTk5MTIsImV4cCI6MjA2NDUzNTkxMn0.GpzCytmpAwCMJZ3p1W6Sq7ARICev00N54AYioyrplhQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

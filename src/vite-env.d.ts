/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Supabase configuration
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_SUPABASE_SERVICE_ROLE_KEY: string;
  readonly VITE_SUPABASE_PROJECT_ID: string;
  
  // PostgreSQL configuration
  readonly VITE_POSTGRES_HOST: string;
  readonly VITE_POSTGRES_USER: string;
  readonly VITE_POSTGRES_PASSWORD: string;
  readonly VITE_POSTGRES_DATABASE: string;
  readonly VITE_POSTGRES_CONNECTION_STRING: string;
  readonly VITE_POSTGRES_CONNECTION_TRANSACTION: string;
  readonly VITE_POSTGRES_CONNECTION_SESSION: string;
  
  // Organization details
  readonly VITE_ORGANIZATION_NAME: string;
  readonly VITE_ORGANIZATION_SLUG: string;
  
  // Vercel integration
  readonly VITE_VERCEL_PROJECT_API_KEY: string;
  
  // Payment gateways
  readonly VITE_PAYSTACK_PUBLIC_KEY_TEST: string;
  readonly VITE_PAYSTACK_PUBLIC_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

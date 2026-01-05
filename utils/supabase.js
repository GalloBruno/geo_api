/**
 * Supabase Client Configuration
 * 
 * Creates and exports a configured Supabase client for database operations.
 * Uses environment variables for secure credential management.
 * 
 * Required environment variables:
 * - SUPABASE_URL: Your Supabase project URL
 * - SUPABASE_KEY: Your Supabase anon/public API key
 * 
 * @see https://supabase.com/docs/reference/javascript/initializing
 */

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

export default supabase

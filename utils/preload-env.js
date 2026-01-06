/**
 * Preload Environment Variables
 * 
 * This file should be imported first in the entry point to ensure
 * environment variables are loaded before any other dependencies
 * (like Supabase) try to access them.
 */

if (process.env.NODE_ENV !== 'production' && process.loadEnvFile) {
    try {
        process.loadEnvFile()
    } catch (error) {
        // Fail silently if .env doesn't exist or error occurs
    }
}

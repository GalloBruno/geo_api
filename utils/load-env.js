/**
 * Environment Variables Loader
 * 
 * Loads environment variables from .env file in development mode.
 * Uses Node.js built-in process.loadEnvFile() (Node 20.6.0+).
 * 
 * In production (Vercel), environment variables are automatically loaded
 * from the platform settings, so this function does nothing.
 * 
 * @example
 * // In src/index.js (if needed for local development)
 * import { loadEnv } from '../utils/load-env.js'
 * loadEnv()
 */
export const loadEnv = () => {
  if (process.env.NODE_ENV !== 'production' && process.loadEnvFile) {
    process.loadEnvFile()
  }
}

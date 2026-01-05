export const loadEnv = () => {
  if (process.env.NODE_ENV !== 'production' && process.loadEnvFile) {
    process.loadEnvFile()
  }
}

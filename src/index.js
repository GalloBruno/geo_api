/**
 * Geo API - Main Server Entry Point
 * 
 * Express.js server that provides geolocation services based on IP addresses
 * and coordinates. Includes rate limiting, CORS support, and static asset serving.
 * 
 * @author GalloBruno
 * @version 1.0.1
 * @updated 2026-01-05
 */

import '../utils/preload-env.js'
import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import { geoRouter } from '../routes/router.js'

const app = express()

/**
 * CORS Configuration
 * Allows GET and POST requests from any origin
 * Sets cache max age to 24 hours (86400 seconds)
 */
const corsOptions = {
  methods: ['GET', 'POST'],
  maxAge: 86400,
}

// Middleware setup
app.use(express.json())
app.use(cors(corsOptions))
app.disable('x-powered-by') // Hide Express signature for security
app.use('/assets', express.static('assets')) // Serve static files from assets directory

/**
 * Rate Limiter Configuration
 * Limits each IP to 60 requests per 15-minute window
 * Helps prevent abuse and ensures fair usage
 */
const limiter = rateLimit({
  windowMS: 15 * 60 * 1000, // 15 minutes
  max: 60, // Limit each IP to 60 requests per window
  message: 'Demasiadas peticiones desde esta IP, por favor intente más tarde',
})

app.use(limiter)
app.use('/', geoRouter)

// Server configuration
const PORT = process.env.PORT ?? 5000

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})

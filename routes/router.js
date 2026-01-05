/**
 * API Routes Configuration
 * 
 * Defines all available endpoints for the Geo API:
 * - Home page with interactive geolocation UI
 * - API documentation
 * - Location detection endpoints
 */

import { Router } from 'express'
import { GeoController } from '../controller/GeoController.js'

export const geoRouter = Router()

// Main routes
geoRouter.get('/', GeoController.home)              // Interactive home page with location info
geoRouter.get('/docs', GeoController.docs)          // API documentation page

// Geolocation endpoints
geoRouter.get('/location', GeoController.location)  // Get location from IP (Vercel headers)
geoRouter.get('/geolocation', GeoController.geolocation) // Get location from coordinates

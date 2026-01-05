import { Router } from 'express'
import { GeoController } from '../controller/GeoController.js'
import { QrCodeController } from '../controller/QrCodeController.js'

export const geoRouter = Router()

geoRouter.get('/', GeoController.home)
geoRouter.get('/docs', GeoController.docs)
geoRouter.get('/location', GeoController.location)
geoRouter.get('/geolocation', GeoController.geolocation)
geoRouter.get('/qr', QrCodeController.generateQrCode)
geoRouter.get('/qr/buffer', QrCodeController.generateDataURL)

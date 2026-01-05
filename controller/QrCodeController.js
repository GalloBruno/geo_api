/**
 * QR Code Controller
 * 
 * Handles QR code generation requests.
 * Provides two endpoints:
 * - HTML page with embedded QR code
 * - Data URL for programmatic use
 */

import QRCode from 'qrcode'
import { excepctionQR } from '../views/exception-qr.js'
import { qrCode } from '../views/qr-code.js'

export class QrCodeController {
  /**
   * Generate QR Code as HTML Page
   * 
   * Creates a QR code from a URL and displays it in a styled HTML page.
   * Uses high error correction level (H) for better reliability.
   * 
   * @param {Request} req - Express request with 'url' query parameter
   * @param {Response} res - Express response object
   * @returns {HTML} HTML page with QR code image or error page
   * 
   * @example
   * GET /qr?url=https://example.com
   * Returns: HTML page with QR code for https://example.com
   */
  static async generateQrCode(req, res) {
    const { url } = req.query

    // Validate required parameter
    if (!url) {
      return res.status(400).send(excepctionQR())
    }

    try {
      // Generate QR code as data URL
      const qrDataUrl = await QRCode.toDataURL(url, {
        type: 'image/png',
        width: 800,
        margin: 2,
        errorCorrectionLevel: 'H', // High error correction
      })

      res.send(qrCode({ dataURL: qrDataUrl }))
    } catch (error) {
      console.error(error)
      res.status(500).send('Error al generar el código QR')
    }
  }

  /**
   * Generate QR Code as Data URL
   * 
   * Creates a QR code and returns it as a base64 data URL for programmatic use.
   * Useful for embedding QR codes in other applications.
   * 
   * @param {Request} req - Express request with 'text' query parameter
   * @param {Response} res - Express response object
   * @returns {JSON} Object containing the base64 data URL
   * 
   * @example
   * GET /qr/buffer?text=Hello World
   * Response: { "dataBaseURL": "data:image/png;base64,iVBORw0KG..." }
   */
  static async generateDataURL(req, res) {
    const { text } = req.query

    // Validate required parameter
    if (!text) {
      return res.status(400).json({ message: 'Falta parámetro en la url' })
    }

    try {
      // Generate QR code as data URL
      const dataURL = QRCode.toDataURL(text, {
        type: 'image/png',
        width: 800,
        margin: 2,
        errorCorrectionLevel: 'H',
      })
      const dataBaseURL = await dataURL
      res.status(200).json({ dataBaseURL })
    } catch (error) {
      res.status(500).json({ error: 'Error al generar el buffer: ' + error })
    }
  }
}

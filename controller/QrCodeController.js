import QRCode from 'qrcode'
import { excepctionQR } from '../views/exception-qr.js'
import { qrCode } from '../views/qr-code.js'

export class QrCodeController {
  static async generateQrCode(req, res) {
    const { url } = req.query

    if (!url) {
      return res.status(400).send(excepctionQR())
    }

    try {
      const qrDataUrl = await QRCode.toDataURL(url, {
        type: 'image/png',
        width: 800,
        margin: 2,
        errorCorrectionLevel: 'H',
      })

      res.send(qrCode({ dataURL: qrDataUrl }))
    } catch (error) {
      console.error(error)
      res.status(500).send('Error al generar el código QR')
    }
  }

  static async generateDataURL(req, res) {
    const { text } = req.query
    if (!text) {
      return res.status(400).json({ message: 'Falta parámetro en la url' })
    }
    try {
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

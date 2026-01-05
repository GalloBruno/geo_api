import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import { geoRouter } from '../routes/router.js'
// import { loadEnv } from '../utils/load-env.js'

const app = express()

const corsOptions = {
  methods: ['GET', 'POST'],
  maxAge: 86400,
}

app.use(express.json())
app.use(cors(corsOptions))
app.disable('x-powered-by')
app.use('/assets', express.static('assets'))

const limiter = rateLimit({
  windowMS: 15 * 60 * 1000,
  max: 60,
  message: 'Demasiadas peticiones desde esta IP, por favor intente más tarde',
})

app.use(limiter)
app.use('/', geoRouter)

const PORT = process.env.PORT ?? 5000

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})

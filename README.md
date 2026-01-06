# 🌍 Geo API

> **Geolocation API** that provides location information based on IP addresses and coordinates. Built with Express.js and deployed on Vercel.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/GalloBruno/geo_api)

**Live Demo:** [https://geo-api-fawn.vercel.app](https://geo-api-fawn.vercel.app)

---

## ✨ Features

- 🗺️ **IP-based Geolocation** - Real-time location detection inspired by Vercel edge headers.
- 📍 **Reverse Geocoding** - Precise metadata retrieval from specific coordinates.
- ✈️ **Proximity Intelligence** - Calculates nearest airport and city centers using Haversine algorithm.
- 🔒 **Rate Limiting** - 60 requests/15min per IP protection.
- 📊 **Analytics** - Full query logging via Supabase integration.
- 🎨 **Modern Interface** - Minimalist, Vercel-inspired dark/light mode UI with raw JSON visualization.
- 📖 **Developer Docs** - Integrated technical documentation at `/docs`.

---

## 🚀 Quick Start

### Prerequisites

- Node.js 20.6.0 or higher
- npm or pnpm
- Supabase account (for analytics)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/GalloBruno/geo_api.git
   cd geo_api
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_anon_key
   PORT=5000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

   The server will start at `http://localhost:5000`

---

## 📡 API Endpoints

### 🏠 Home Page
```
GET /
```
Minimalist dashboard providing real-time client location telemetry and raw JSON payload inspection.

### 📍 Get Location from IP
```
GET /location
```

**Response:**
```json
{
  "ip": "123.456.789.0",
  "city": {
    "name": "Buenos Aires",
    "postalCode": 1000
  },
  "country": {
    "name": "Argentina",
    "alpha": "AR",
    "emojiFlag": "🇦🇷",
    "timezone": "America/Argentina/Buenos_Aires"
  },
  "coords": {
    "latitude": -34.6037,
    "longitude": -58.3816
  },
  "sysInfo": {
    "system": "Windows",
    "webBrowser": {
      "browser": "Chrome",
      "version": "120"
    }
  }
}
```

### 🗺️ Get Location from Coordinates
```
GET /geolocation?lat={latitude}&lon={longitude}
```

**Parameters:**
- `lat` (required) - Latitude
- `lon` (required) - Longitude

**Example:**
```
GET /geolocation?lat=-33.0548161&lon=-65.6174943
```

**Response:**
```json
{
  "ip": "123.456.789.0",
  "city": "Villa Mercedes",
  "type": "Ciudad",
  "departament": "Pedernera",
  "state": "San Luis",
  "country": "Argentina",
  "centerSquare": "5.366mts",
  "coordinates": {
    "latitude": -33.0548,
    "longitude": -65.6175
  },
  "closestAirport": {
    "iata": "VME",
    "name": "Valle Del Conlara International Airport",
    "city": "Villa Mercedes",
    "state": "San Luis",
    "country": "Argentina",
    "latitude": -33.6333,
    "longitude": -65.4833,
    "distance": "17.116mts"
  }
}
```

### 📖 API Documentation
```
GET /docs
```
Interactive documentation page with examples and usage instructions.

---

## 🛠️ Tech Stack

- **Runtime:** Node.js 20+
- **Framework:** Express.js
- **Database:** Supabase (PostgreSQL)
- **Deployment:** Vercel
- **CDN:** jsDelivr (for geo data)
- **Libraries:**
  - `express-rate-limit` - API rate limiting
  - `cors` - Cross-origin resource sharing
  - `moment-timezone` - Timezone handling
  - `iso-3166` - Country code utilities

---

## 📂 Project Structure

```
geo_api/
├── src/
│   └── index.js              # Main server entry point
├── routes/
│   └── router.js             # API route definitions
├── controller/
│   └── GeoController.js      # Geolocation endpoints
├── services/
│   ├── get-location-info.js  # Extract Vercel headers
│   ├── get-cities.js         # Fetch cities from CDN
│   ├── get-airports.js       # Fetch airports from CDN
│   └── closest-airport.js    # Haversine distance calculator
├── utils/
│   ├── supabase.js           # Supabase client
│   ├── convert-to-flag.js    # Country code to emoji
│   ├── set-undefined.js      # Browser check utility
│   └── load-env.js           # Environment loader
├── views/
│   ├── main-view.js          # Home page HTML
│   └── docs.js               # Documentation page
├── assets/
│   ├── geo-data.json         # Argentine cities data
│   ├── world-airports.json   # Worldwide airports data
│   └── grunge.png            # UI assets
├── package.json
├── vercel.json               # Vercel configuration
└── README.md
```

---

## 🌐 Deployment

### Deploy to Vercel

1. **Fork this repository**

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your forked repository

3. **Add Environment Variables**
   ```
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_anon_key
   ```

4. **Deploy!**
   
   Vercel will automatically deploy your API and provide a URL.

### Vercel Configuration

The `vercel.json` file is already configured:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "src/index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "src/index.js"
    }
  ]
}
```

---

## 📊 Database Setup (Supabase)

### Required Tables

#### `geo_api_visitor`
Stores IP-based location requests:

```sql
CREATE TABLE geo_api_visitor (
  id SERIAL PRIMARY KEY,
  ip VARCHAR(50),
  city VARCHAR(100),
  country VARCHAR(100),
  system VARCHAR(50),
  host_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### `geolocation_requests`
Stores coordinate-based queries:

```sql
CREATE TABLE geolocation_requests (
  id SERIAL PRIMARY KEY,
  ip VARCHAR(50),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  city_name VARCHAR(100),
  country_name VARCHAR(100),
  departament VARCHAR(100),
  closest_airport VARCHAR(200),
  airport_distance VARCHAR(50),
  state VARCHAR(100),
  center_square_distance VARCHAR(50),
  so VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🔧 Development

### Available Scripts

```bash
# Start development server with auto-reload
npm run dev

# Start production server
npm start

# Run tests (not implemented yet)
npm test
```

### Local Development Notes

- Vercel geolocation headers won't be available locally
- Default fallback coordinates: Villa Mercedes, San Luis, Argentina
- Use the `/geolocation` endpoint with custom coordinates for testing

---

## 📝 License

ISC License

---

## 👤 Author

**GalloBruno**

- GitHub: [@GalloBruno](https://github.com/GalloBruno)
- API: [geo-api-fawn.vercel.app](https://geo-api-fawn.vercel.app)

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## ⭐ Show your support

Give a ⭐️ if this project helped you!

---

## 📌 Notes

- **Rate Limiting:** 60 requests per 15 minutes per IP
- **CDN Data:** City and airport data is served via jsDelivr CDN from this repository
- **Vercel Headers:** The API relies on Vercel's automatic geolocation headers in production
- **Haversine Formula:** Used for accurate distance calculations considering Earth's curvature

---

Made with ❤️ by GalloBruno

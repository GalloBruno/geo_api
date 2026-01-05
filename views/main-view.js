export const mainView = ({ data, latitude, longitude }) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Geo API - Precision Geolocation</title>
    <meta
      property="og:description"
      content="High-precision IP and coordinate-based geolocation service."
    />
    <meta
      property="og:image"
      content="https://raw.githubusercontent.com/GalloBruno/PortfolioenVercel/main/src/assets/img/BrunoLinkendinCircularRecortado.png"
    />
    <meta name="color-scheme" content="light dark" />
    
    <!-- Fonts: Inter for UI, JetBrains Mono for Code -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
      rel="stylesheet"
    />
    
    <link
      rel="shortcut icon"
      href="https://raw.githubusercontent.com/GalloBruno/PortfolioenVercel/main/src/assets/img/BrunoLinkendinCircularRecortado.png"
    />
    <link
      rel="stylesheet"
      href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
    />
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    
    <style>
      :root {
        /* Core Palette - Modern & Premium */
        --primary: #6366f1; /* Indigo 500 */
        --primary-hover: #4f46e5; /* Indigo 600 */
        --surface-light: rgba(255, 255, 255, 0.9);
        --surface-dark: rgba(15, 23, 42, 0.8);
        --glass-light: rgba(255, 255, 255, 0.7);
        --glass-dark: rgba(15, 23, 42, 0.6);
        --text-main: #0f172a;
        --text-muted: #64748b;
        --border-light: rgba(226, 232, 240, 0.8);
        --border-dark: rgba(51, 65, 85, 0.5);
        --accent-gradient: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
        --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
        --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
        
        /* Syntax Highlighting */
        --sh-class: #d19a66;
        --sh-identifier: #61afef;
        --sh-keyword: #c678dd;
        --sh-string: #98c379;
      }

      @media (prefers-color-scheme: dark) {
        :root {
          --surface-light: rgba(30, 41, 59, 0.9);
          --text-main: #f8fafc;
          --text-muted: #94a3b8;
          --border-light: rgba(51, 65, 85, 0.5);
        }
      }

      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      body {
        font-family: 'Inter', sans-serif;
        background-color: #0f172a;
        color: var(--text-main);
        height: 100dvh;
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }

      /* Full Screen Map Layout */
      #layout {
        position: relative;
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 380px 1fr;
        grid-template-rows: 1fr;
      }

      /* Sidebar / Data Panel */
      .sidebar {
        z-index: 1000;
        background: var(--surface-light);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border-right: 1px solid var(--border-light);
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        overflow-y: auto;
        box-shadow: var(--shadow-lg);
        transition: transform 0.3s ease;
      }

      /* Brand Header */
      .brand {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-weight: 700;
        font-size: 1.25rem;
        color: var(--text-main);
      }
      
      .brand-icon {
        width: 32px;
        height: 32px;
        background: var(--accent-gradient);
        border-radius: 8px;
        display: grid;
        place-items: center;
        color: white;
      }

      /* Data Card (JSON View) */
      .data-card {
        background: rgba(0, 0, 0, 0.03);
        border-radius: 12px;
        border: 1px solid var(--border-light);
        overflow: hidden;
        display: flex;
        flex-direction: column;
        flex: 1;
        min-height: 300px;
      }
      
      .data-header {
        padding: 0.75rem 1rem;
        border-bottom: 1px solid var(--border-light);
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--text-muted);
        background: rgba(255,255,255,0.05);
      }

      .json-content {
        padding: 1rem;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.85rem;
        line-height: 1.5;
        overflow: auto;
        flex: 1;
      }
      
      /* Actions Area */
      .actions {
        display: flex;
        gap: 0.75rem;
        flex-wrap: wrap;
      }

      .btn {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.625rem 1.25rem;
        border-radius: 99px;
        font-size: 0.875rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        border: none;
        text-decoration: none;
      }

      .btn-primary {
        background: var(--accent-gradient);
        color: white;
        box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
      }

      .btn-primary:hover {
        transform: translateY(-1px);
        box-shadow: 0 6px 16px rgba(99, 102, 241, 0.4);
      }
      
      .btn-secondary {
        background: transparent;
        border: 1px solid var(--border-light);
        color: var(--text-main);
      }
      
      .btn-secondary:hover {
        background: rgba(0,0,0,0.05);
      }

      /* Map Container */
      .map-container {
        position: relative;
        z-index: 1;
        background: #e2e8f0;
      }

      #map {
        width: 100%;
        height: 100%;
      }

      /* Address Bar / Endpoint display */
      .endpoint-display {
        background: rgba(0,0,0,0.03);
        padding: 0.5rem 0.75rem;
        border-radius: 8px;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.8rem;
        color: var(--text-muted);
        border: 1px solid var(--border-light);
        margin-bottom: 0.5rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      /* Footer / Credits */
      .footer {
        margin-top: auto;
        padding-top: 1rem;
        font-size: 0.75rem;
        color: var(--text-muted);
        text-align: center;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .footer a {
        color: var(--text-main);
        text-decoration: none;
        font-weight: 600;
      }

      /* Dialog Styles */
      dialog {
        padding: 0;
        border: none;
        border-radius: 16px;
        background: var(--surface-light);
        backdrop-filter: blur(16px);
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        max-width: 400px;
        width: 90%;
        color: var(--text-main);
        animation: slideUp 0.3s ease-out;
      }
      
      dialog::backdrop {
        background: rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(4px);
      }

      .dialog-content {
        padding: 1.5rem;
      }

      .dialog-header {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 1rem;
        font-size: 1.125rem;
        font-weight: 700;
      }

      @keyframes slideUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }

      /* Utilities */
      .hidden-mobile { display: flex; }
      
      /* Mobile Responsive */
      @media (max-width: 768px) {
        #layout {
          grid-template-columns: 1fr;
          grid-template-rows: 1fr auto;
        }
        
        .sidebar {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: auto;
          max-height: 60vh;
          border-right: none;
          border-top: 1px solid var(--border-light);
          border-radius: 20px 20px 0 0;
          padding: 1.25rem;
          z-index: 2000;
        }
        
        .data-card {
           min-height: 200px;
        }
        
        .hidden-mobile { display: none; }
      }
    </style>
  </head>

  <body>
    <div id="layout">
      <!-- Info Panel -->
      <aside class="sidebar">
        <!-- Header -->
        <div class="brand">
          <div class="brand-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <span>Geo API</span>
        </div>

        <div style="flex: 1; display: flex; flex-direction: column; gap: 1rem;">
          <!-- Description -->
          <p style="font-size: 0.875rem; color: var(--text-muted); line-height: 1.6;">
            Tu ubicación actual detectada automáticamente. Copia el endpoint o explora la documentación.
          </p>

          <!-- Endpoint Bar -->
          <div>
            <div class="endpoint-display address-bar">/location</div>
            <div class="actions">
              <button class="btn btn-primary" id="copy-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                   <path stroke-linecap="round" stroke-linejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2v1h5v11a2 2 0 01-2 2H8l-1.07-5" />
                </svg>
                <span class="text">Copiar Endpoint</span>
              </button>
              <a href="/docs" class="btn btn-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Docs
              </a>
            </div>
          </div>

          <!-- JSON Response -->
          <div class="data-card">
            <div class="data-header">
              <span>Respuesta JSON</span>
              <span style="width: 8px; height: 8px; border-radius: 50%; background: #22c55e;"></span>
            </div>
            <div class="json-content">
              <pre><code>\n${JSON.stringify(data, null, 2)}</code></pre>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="footer">
          <span>v1.0.0</span>
          <a href="https://github.com/GalloBruno" target="_blank">@GalloBruno</a>
        </div>
      </aside>

      <!-- Map Area -->
      <main class="map-container">
        <div id="map"></div>
      </main>
    </div>

    <!-- Hidden Elements for Logic Compatibility -->
    <div style="display: none;">
       <div class="footer">Logic Target</div>
       <button id="legacy-copy-btn">Logic Target</button>
    </div>

    <!-- Precision Dialog Removed -->
    <!-- <dialog id="dialog"></dialog> -->

    <script type="module">
      import { highlight } from "https://esm.sh/sugar-high";
      
      function cleanIndent(str) {
        const lines = str.split("\\n").filter((line) => line.trim());
        if (lines.length === 0) return str;
        
        const indents = lines.map((line) => {
          const match = line.match(/^[ \\t]*/);
          return match ? match[0].length : 0;
        });
        
        const minIndent = Math.min(...indents);
        if (minIndent === 0) return str;
        
        const regex = new RegExp("^[ \\\\t]{" + minIndent + "}", "gm");
        return str.replace(regex, "").trim();
      }

      /* Map Initialization */
      const lat = ${latitude} || -33.2991;
      const lon = ${longitude} || -66.3547;

      const map = L.map("map", { zoomControl: false }).setView([lat, lon], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);
      
      // Custom Marker
      const customIcon = L.divIcon({
        className: 'custom-pin',
        html: \`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#6366f1" width="48" height="48" style="filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3))"><path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/></svg>\`,
        iconSize: [48, 48],
        iconAnchor: [24, 48]
      });
      
      L.marker([lat, lon], { icon: customIcon }).addTo(map);
      L.control.zoom({ position: 'topright' }).addTo(map);

      /* Code Highlighting */
      const code = document.querySelector("pre > code");
      if(code) {
          code.innerHTML = highlight(cleanIndent(code.innerText));
      }

      /* Copy Logic */
      const copyToClipboard = async (text) => {
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(text);
          const btn = document.querySelector("#copy-btn");
          const originalText = btn.innerHTML;
          btn.innerHTML = \`<span style="margin-right:8px">✅</span> Copiado!\`;
          setTimeout(() => {
             btn.innerHTML = originalText;
          }, 2000);
        } else {
          console.error("Clipboard not supported");
        }
      };

      document.querySelector("#copy-btn").addEventListener("click", async () => {
        const url = document.querySelector(".address-bar");
        await copyToClipboard(url.textContent);
      });

      /* Timer / Dialog Logic Removed */
      // const startTimer = ...
      
      // Footer Machine Writer Effect (Optional, adapted for new footer)
      const footerLink = document.querySelector(".footer a");
      if(footerLink) {
          // kept simple static text for now to match new design
      }
    </script>
  </body>
</html>
`;

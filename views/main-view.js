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
      href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>▲</text></svg>"
    />
    <link
      rel="stylesheet"
      href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
    />
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    
    <link rel="stylesheet" href="/assets/css/style.css" />
    <style>
      /* Custom tweaks for main view specific elements */
      .brand-icon {
        background: var(--geist-foreground);
        color: var(--geist-background);
        display: grid;
        place-items: center;
        width: 32px;
        height: 32px;
        border-radius: 6px;
      }
      .json-content {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.85rem;
      }
    </style>
  </head>

  <body>
    <div class="layout-split">
      <!-- Info Panel -->
      <aside class="sidebar">
        <!-- Header -->
        <div style="padding: 1.5rem; border-bottom: 1px solid var(--accents-2);">
          <div class="flex items-center gap-2" style="font-weight: 700; font-size: 1.25rem;">
            <div class="brand-icon">
              <!-- Vercel-style Triangle Logo -->
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 1L24 22H0L12 1Z" />
              </svg>
            </div>
            <span style="letter-spacing: -0.02em;">Geo API</span>
          </div>
        </div>

        <div style="flex: 1; display: flex; flex-direction: column; gap: 1rem; padding: 1.5rem; overflow-y: auto; min-height: 0;">
          <p style="margin-bottom: 1rem;">Ubicación detectada en tiempo real.</p>

          <!-- Endpoint Display -->
          <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; background: var(--accents-1); padding: 0.75rem; border-radius: 6px; border: 1px solid var(--accents-2); color: var(--geist-foreground); margin-bottom: 1rem; word-break: break-all;">
             <span id="endpoint-url">Loading...</span>
          </div>

          <div class="actions">
            <button class="btn btn-primary" onclick="copyEndpoint()">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                 <path stroke-linecap="round" stroke-linejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2v1h5v11a2 2 0 01-2 2H8l-1.07-5" />
              </svg>
              Copiar Endpoint
            </button>
            <a href="/docs" class="btn btn-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Docs
            </a>
          </div>

          <!-- JSON Response -->
          <div class="card" style="display: flex; flex-direction: column; padding: 0; overflow: hidden;">
            <div style="padding: 0.75rem 1rem; border-bottom: 1px solid var(--accents-2); background: var(--accents-1); font-size: 0.875rem; display: flex; justify-content: space-between; align-items: center;">
              <span class="text-muted">Respuesta de API</span>
              <span style="width: 8px; height: 8px; border-radius: 50%; background: #22c55e;"></span>
            </div>
            <div class="json-content" style="padding: 1rem; overflow-x: auto; background: transparent;">
              <pre style="margin: 0; padding: 0; background: transparent; border: none;"><code>\n${JSON.stringify(data, null, 2)}</code></pre>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="footer" style="padding: 1.5rem; text-align: center; border-top: 1px solid var(--accents-2);">
          <span class="text-muted">v1.0.0</span>
          <a href="https://github.com/GalloBruno" target="_blank">@GalloBruno</a>
        </div>
      </aside>

      <!-- Map Area -->
      <main class="map-wrapper">
        <div id="map" style="width: 100%; height: 100%;"></div>
      </main>
    </div>

    <!-- Hidden Elements for Logic Compatibility -->
    <div style="display: none;">
       <div class="footer">Logic Target</div>
       <button id="legacy-copy-btn">Logic Target</button>
    </div>

    <script>
      /* Utility Functions */
      function highlight(json) {
        // Simple syntax highlighter
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return json.replace(/("(\\\\u[a-zA-Z0-9]{4}|\\\\[^u]|[^\\\\"])*"(\\s*:)?|\\b(true|false|null)\\b|-?\\d+(?:\\.\\d*)?(?:[eE][+\\-]?\\d+)?)/g, function (match) {
          let cls = 'number';
          if (/^"/.test(match)) {
            if (/:$/.test(match)) {
              cls = 'key';
            } else {
              cls = 'string';
            }
          } else if (/true|false/.test(match)) {
            cls = 'boolean';
          } else if (/null/.test(match)) {
            cls = 'null';
          }
          return '<span class="' + cls + '">' + match + '</span>';
        });
      }
      
      const endpoint = window.location.origin + "/location";
      document.getElementById('endpoint-url').textContent = endpoint;
      
      /* Copy Functionality */
      async function copyEndpoint() {
        try {
          await navigator.clipboard.writeText(endpoint);
          const btn = document.querySelector('.btn-primary');
          const original = btn.innerHTML;
          btn.innerHTML = '¡Copiado!';
          setTimeout(() => btn.innerHTML = original, 2000);
        } catch (err) {
          console.error('Error al copiar:', err);
        }
      }

      /* Map Initialization */
      const lat = ${latitude} || -33.2991;
      const lon = ${longitude} || -66.3547;

      const map = L.map("map", { zoomControl: false }).setView([lat, lon], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);
      
      // Custom Marker (Black/White Vercel Style)
      const customIcon = L.divIcon({
        className: 'custom-pin',
        html: \`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000" width="48" height="48" style="filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3)); stroke: white; stroke-width: 1.5;"><path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/></svg>\`,
        iconSize: [48, 48],
        iconAnchor: [24, 48]
      });
      
      L.marker([lat, lon], { icon: customIcon }).addTo(map);
      L.control.zoom({ position: 'topright' }).addTo(map);

      // Simple highlight application
      const codeBlock = document.querySelector('pre code');
      if (codeBlock) {
         // Optionally enhance highlighting here
      }
    </script>
  </body>
</html>
`;

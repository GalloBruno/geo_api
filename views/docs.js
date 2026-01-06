export const docsView = (data) => `
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Geo API - Documentación</title>
    <meta name="color-scheme" content="light dark" />
    
    <!-- Fonts -->
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

    <link rel="stylesheet" href="/assets/css/style.css" />
    <style>
      /* Docs specific minimal overrides */
      .layout { display: grid; grid-template-columns: 280px 1fr; max-width: 1400px; margin: 0 auto; min-height: 100vh; }
      .sidebar { position: sticky; top: 0; height: 100vh; overflow-y: auto; border-right: 1px solid var(--accents-2); padding: 2rem 1.5rem; }
      .main-content { padding: 3rem 4rem; max-width: 900px; }
      .brand-icon { background: var(--geist-foreground); color: var(--geist-background); display: grid; place-items: center; width: 32px; height: 32px; border-radius: 6px; }
      .nav-link { display: block; padding: 0.5rem 0.75rem; border-radius: 6px; color: var(--accents-5); text-decoration: none; transition: all 0.2s; }
      .nav-link:hover { background: var(--accents-1); color: var(--geist-foreground); }
      @media (max-width: 768px) {
        .layout { grid-template-columns: 1fr; }
        .sidebar { display: none; }
        .main-content { padding: 1.5rem; }
      }
    </style>
  </head>
  <body>
    <div class="layout">
      <!-- Sidebar -->
      <aside class="sidebar">
        <a href="/" class="flex items-center gap-2" style="font-weight: 700; font-size: 1.25rem; margin-bottom: 2rem; color: inherit; text-decoration: none;">
          <div class="brand-icon">
             <!-- Vercel-style Triangle Logo -->
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 1L24 22H0L12 1Z" />
             </svg>
          </div>
          <span style="letter-spacing: -0.02em;">Geo API</span>
        </a>

        <div class="lang-selector">
           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="opacity:0.6">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
           </svg>
           <select id="lang"></select>
        </div>

        <nav class="nav-links">
          <a href="#introduccion" class="nav-link">Introducción</a>
          <a href="#endpoints" class="nav-link">Endpoints</a>
          <a href="#uso-coordenadas" class="nav-link">Uso Frontend</a>
          <a href="#calculo-distancias" class="nav-link">Cálculo de Distancias</a>
          <a href="#codigos-estado" class="nav-link">Códigos de Estado</a>
        </nav>
        
        <div style="margin-top: auto; font-size: 0.8rem; color: var(--text-muted);">
          <a href="/" style="display: flex; align-items: center; gap: 0.5rem; color: inherit; text-decoration: none;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver a la App
          </a>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="main-content">
        <!-- Introduction -->
        <section id="introduccion">
          <h1>Documentación API</h1>
          <div style="display: flex; gap: 1rem; font-size: 0.9rem; color: var(--text-muted); margin-bottom: 2rem;">
             <span style="display: flex; align-items: center; gap: 0.4rem;">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
               4 min lectura
             </span>
             <span style="display: flex; align-items: center; gap: 0.4rem;">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
               Actualizado 2025
             </span>
          </div>
          
          <p>
            La <strong>Geo API</strong> proporciona inteligencia de ubicación precisa basada en IP o coordenadas. 
            Arquitectura de baja latencia optimizada para integración inmediata en aplicaciones web y servicios backend.
          </p>
          
          <div style="background: var(--surface-light); padding: 1rem; border-left: 4px solid var(--primary); border-radius: 4px; box-shadow: var(--shadow-sm);">
            <strong>Base URL:</strong> <code style="background:transparent; color: var(--text-main);">https://geo-api-fawn.vercel.app/</code>
          </div>
        </section>

        <!-- Endpoints -->
        <section id="endpoints">
          <h2>Endpoints</h2>
          
          <h3>1. Detección por IP</h3>
          <p>Identifica la ubicación del cliente mediante inspección de dirección IP en tiempo real.</p>
          <div class="endpoint">GET /location</div>
          <pre><code>\n${JSON.stringify(data, null, 2)}</code></pre>

          <h3>2. Geocodificación Inversa</h3>
          <p>Recupera metadatos geográficos detallados a partir de coordenadas.</p>
          <div class="endpoint">GET /geolocation</div>
          <p>
            Parámetros:
            <code>lat</code> (latitud), 
            <code>lon</code> (longitud)
          </p>
          <p><strong>Ejemplo:</strong> <br>
            <a href="/geolocation?lat=-33.0548161&lon=-65.6174943" target="_blank">
              /geolocation?lat=-33.0548161&lon=-65.6174943
            </a>
          </p>
        </section>

        <!-- Frontend Usage -->
        <section id="uso-coordenadas">
          <h2>Integración en Cliente</h2>
          <p>
            Implementación asíncrona utilizando API de Geolocalización nativa.
          </p>
          
          <pre><code>
async function getLocationData() {
  try {
    // 1. Obtener coordenadas del navegador
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    const { latitude, longitude } = position.coords;

    // 2. Consultar Geo API
    const response = await fetch(
      \`https://geo-api-fawn.vercel.app/geolocation?lat=\${latitude}&lon=\${longitude}\`
    );
    
    if (!response.ok) throw new Error('Error en la petición');
    
    const data = await response.json();
    console.log('Ubicación:', data);
    return data;

  } catch (error) {
    console.error('Error obteniendo ubicación:', error);
  }
}
          </code></pre>
        </section>

        <!-- Distances -->
        <section id="calculo-distancias">
          <h2>Cálculo de Distancias</h2>
          <p>
            La API utiliza la <strong>fórmula de Haversine</strong> para calcular distancias geodésicas precisas, considerando la curvatura de la Tierra.
          </p>
          <ul>
            <li>Calcula la distancia a la <strong>plaza central</strong> más cercana.</li>
            <li>Calcula la distancia al <strong>aeropuerto</strong> más cercano.</li>
          </ul>
          
          <p>Ejemplo de respuesta parcial:</p>
          <pre><code>
{
  "centerSquare": "5.366mts",
  "closestAirport": {
      "name": "Valle Del Conlara International Airport",
      "distance": "17.116mts"
  }
}
          </code></pre>
        </section>

        <!-- Status Codes -->
        <section id="codigos-estado">
          <h2>Códigos de Estado</h2>
          <div style="display: grid; gap: 1rem;">
             <div style="display: flex; gap: 1rem; align-items: baseline;">
                <code style="color: var(--success); min-width: 60px;">200</code>
                <span><strong>OK</strong> - Petición exitosa.</span>
             </div>
             <div style="display: flex; gap: 1rem; align-items: baseline;">
                <code style="color: var(--warning); min-width: 60px;">400</code>
                <span><strong>Bad Request</strong> - Parámetros faltantes o inválidos.</span>
             </div>
             <div style="display: flex; gap: 1rem; align-items: baseline;">
                <code style="color: var(--accents-5); min-width: 60px;">429</code>
                <span><strong>Too Many Requests</strong> - Límite de 60 req/hora excedido.</span>
             </div>
             <div style="display: flex; gap: 1rem; align-items: baseline;">
                <code style="color: var(--error); min-width: 60px;">500</code>
                <span><strong>Internal Server Error</strong> - Error procesando la solicitud.</span>
             </div>
          </div>
        </section>
      </main>
    </div>

    <script type="module">
      import { highlight } from "https://esm.sh/sugar-high";
      
      /* Syntax Highlighting */
      const codeBlocks = document.querySelectorAll("pre code");
      codeBlocks.forEach(block => {
         // Basic indent cleanup
         const text = block.innerText;
         const lines = text.split('\\n').filter(l => l.trim());
         // Simple re-indentation logic could go here, but sugar-high handles basic highligting
         block.innerHTML = highlight(text);
      });

      /* Language Selector Logic */
      const selectorLanguages = document.getElementById("lang");
      
      const languages = [
        { name: "Español", value: "es" },
        { name: "English", value: "en" },
        { name: "Português", value: "pt" },
        { name: "中文 (Chino)", value: "zh" },
        { name: "हिन्दी (Hindi)", value: "hi" },
        { name: "العربية (Árabe)", value: "ar" },
        { name: "Русский", value: "ru" },
        { name: "Deutsch", value: "de" },
        { name: "Français", value: "fr" },
        { name: "Italiano", value: "it" },
        { name: "日本語 (Japonés)", value: "ja" },
      ];

      // Populate Selector
      languages.forEach(lang => {
         const option = document.createElement("option");
         option.value = lang.value;
         option.textContent = lang.name;
         selectorLanguages.appendChild(option);
      });

      // Loading Indicator
      function showLoadingIndicator(show = true, text = "Traduciendo...") {
        let loader = document.getElementById("translation-loader");
        if (show && !loader) {
          loader = document.createElement("div");
          loader.id = "translation-loader";
          loader.innerHTML = \`
            <div style="
              position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
              background: rgba(15, 23, 42, 0.9); color: white; padding: 20px 40px;
              border-radius: 12px; z-index: 9999; display: flex; align-items: center; gap: 12px;
              box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
              font-weight: 500; font-family: 'Inter', sans-serif;
            ">
              <div class="spinner"></div>
              <span id="text">\${text}</span>
            </div>
            <style>
              .spinner {
                width: 20px; height: 20px; border: 2px solid rgba(255,255,255,0.3);
                border-top-color: white; border-radius: 50%; animation: spin 0.8s linear infinite;
              }
              @keyframes spin { to { transform: rotate(360deg); } }
            </style>
          \`;
          document.body.appendChild(loader);
        } else if (!show && loader) {
          loader.remove();
        }
      }

      // Translation Logic
      selectorLanguages.onchange = async (event) => {
          const targetLang = event.target.value;
          showLoadingIndicator(true);
          
          try {
            if (!("Translator" in self)) {
               alert("Tu navegador no soporta la API de Traducción experimental.");
               return;
            }

            const translator = await self.Translator.create({
               sourceLanguage: 'es',
               targetLanguage: targetLang
            });
            
            // Translate Text Nodes
            const elementsToTranslate = document.querySelectorAll("h1, h2, h3, p, li, span, a.nav-link");
            
            for (const el of elementsToTranslate) {
               // Skip if it contains code or is the selector
               if(el.closest('pre') || el.closest('.lang-selector') || el.closest('.brand')) continue;
               
               // Simple text node check
               if(el.childNodes.length === 1 && el.childNodes[0].nodeType === 3 && el.innerText.trim()) {
                  el.innerText = await translator.translate(el.innerText);
               }
            }

          } catch (error) {
             console.log("Translation error or API not available", error);
             // Fallback or silent fail
          } finally {
             showLoadingIndicator(false);
          }
      };
    </script>
  </body>
</html>
`;

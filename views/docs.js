export const docsView = (data) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Geo API - Documentation</title>
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
      href="https://raw.githubusercontent.com/GalloBruno/PortfolioenVercel/main/src/assets/img/BrunoLinkendinCircularRecortado.png"
    />

    <style>
      :root {
        /* Core Palette - Consistent with Main View */
        --primary: #6366f1;
        --primary-hover: #4f46e5;
        --surface-light: rgba(255, 255, 255, 0.95);
        --surface-dark: rgba(15, 23, 42, 0.95);
        --glass-light: rgba(255, 255, 255, 0.7);
        --glass-dark: rgba(15, 23, 42, 0.7);
        --bg-light: #f8fafc;
        --bg-dark: #0f172a;
        --text-main: #0f172a;
        --text-muted: #64748b;
        --border-light: rgba(226, 232, 240, 1);
        --border-dark: rgba(51, 65, 85, 0.5);
        --accent-gradient: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
        --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
        
        /* Syntax Highlighting */
        --sh-class: #d19a66;
        --sh-identifier: #61afef;
        --sh-keyword: #c678dd;
        --sh-string: #98c379;
      }

      @media (prefers-color-scheme: dark) {
        :root {
          --surface-light: rgba(30, 41, 59, 0.95);
          --text-main: #f8fafc;
          --text-muted: #94a3b8;
          --border-light: rgba(51, 65, 85, 0.5);
          --bg-light: #0f172a; /* Force dark bg in dark mode */
        }
      }

      * { box-sizing: border-box; margin: 0; padding: 0; }

      body {
        font-family: 'Inter', sans-serif;
        background-color: var(--bg-light);
        color: var(--text-main);
        display: flex;
        flex-direction: column;
        min-height: 100vh;
      }

      @media (prefers-color-scheme: dark) {
         body { background-color: var(--bg-dark); }
      }

      /* Layout Grid */
      .layout {
        display: grid;
        grid-template-columns: 280px 1fr;
        max-width: 1400px;
        margin: 0 auto;
        width: 100%;
        min-height: 100vh;
      }

      /* Sidebar Navigation */
      .sidebar {
        position: sticky;
        top: 0;
        height: 100vh;
        overflow-y: auto;
        padding: 2rem 1.5rem;
        border-right: 1px solid var(--border-light);
        background: var(--surface-light);
        display: flex;
        flex-direction: column;
        gap: 2rem;
      }

      .brand {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-weight: 700;
        font-size: 1.25rem;
        color: var(--text-main);
        text-decoration: none;
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

      .nav-links {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      .nav-link {
        padding: 0.5rem 0.75rem;
        border-radius: 6px;
        color: var(--text-muted);
        text-decoration: none;
        font-size: 0.9rem;
        font-weight: 500;
        transition: all 0.2s;
      }

      .nav-link:hover {
        background: rgba(99, 102, 241, 0.1);
        color: var(--primary);
      }
      
      .nav-link.active {
        background: rgba(99, 102, 241, 0.1);
        color: var(--primary);
        font-weight: 600;
      }

      /* Main Content */
      .main-content {
        padding: 3rem 4rem;
        max-width: 900px;
      }

      /* Headers */
      h1 {
        font-size: 2.5rem;
        font-weight: 800;
        letter-spacing: -0.02em;
        margin-bottom: 1rem;
        line-height: 1.2;
        background: var(--accent-gradient);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      h2 {
        font-size: 1.75rem;
        font-weight: 700;
        margin-top: 3rem;
        margin-bottom: 1.5rem;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid var(--border-light);
        letter-spacing: -0.01em;
      }

      h3 {
        font-size: 1.25rem;
        font-weight: 600;
        margin-top: 2rem;
        margin-bottom: 1rem;
        color: var(--text-main);
      }

      p {
        line-height: 1.7;
        margin-bottom: 1.5rem;
        color: var(--text-muted);
        font-size: 1.05rem;
      }

      /* Language Selector */
      .lang-selector {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem;
        background: rgba(0,0,0,0.05);
        border-radius: 8px;
        margin-bottom: 1rem;
      }

      select {
        background: transparent;
        border: none;
        font-family: 'Inter', sans-serif;
        color: var(--text-main);
        font-size: 0.9rem;
        font-weight: 500;
        cursor: pointer;
        outline: none;
        width: 100%;
      }

      /* Code Blocks */
      pre {
        background: #1e1e1e;
        border-radius: 12px;
        padding: 1.5rem;
        overflow-x: auto;
        margin: 1.5rem 0;
        box-shadow: var(--shadow-sm);
        border: 1px solid var(--border-dark);
      }

      code {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.9rem;
        color: #e2e8f0;
        line-height: 1.5;
      }

      /* Inline Code */
      p code, li code {
        background: rgba(99, 102, 241, 0.1);
        color: var(--primary);
        padding: 0.2rem 0.4rem;
        border-radius: 4px;
        font-size: 0.85em;
        font-family: 'JetBrains Mono', monospace;
      }

      /* Links */
      a {
        color: var(--primary);
        text-decoration: none;
        font-weight: 500;
        border-bottom: 1px solid transparent;
        transition: border-bottom 0.2s;
      }
      
      a:hover {
        border-bottom-color: var(--primary);
      }

      /* Lists */
      ul {
        padding-left: 1.5rem;
        margin-bottom: 1.5rem;
      }

      li {
        margin-bottom: 0.5rem;
        color: var(--text-muted);
        line-height: 1.6;
      }

      /* Endpoint Badge */
      .endpoint {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        background: rgba(34, 197, 94, 0.1);
        color: #16a34a;
        border-radius: 99px;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.9rem;
        font-weight: 600;
        margin-bottom: 1rem;
      }

      /* Mobile */
      @media (max-width: 768px) {
        .layout {
          grid-template-columns: 1fr;
        }
        
        .sidebar {
          height: auto;
          position: relative;
          border-right: none;
          border-bottom: 1px solid var(--border-light);
          padding: 1.5rem;
        }
        
        .main-content {
          padding: 2rem 1.5rem;
        }

        h1 { font-size: 2rem; }
      }
    </style>
  </head>
  <body>
    <div class="layout">
      <!-- Sidebar -->
      <aside class="sidebar">
        <a href="/" class="brand">
          <div class="brand-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <span>Geo API</span>
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
            La <strong>Geo API</strong> permite obtener información geográfica detallada basada en IP o coordenadas (latitud/longitud).
            Diseñada para ser rápida, sencilla y fácil de integrar en cualquier aplicación frontend o backend.
          </p>
          
          <div style="background: var(--surface-light); padding: 1rem; border-left: 4px solid var(--primary); border-radius: 4px; box-shadow: var(--shadow-sm);">
            <strong>Base URL:</strong> <code style="background:transparent; color: var(--text-main);">https://geo-api-black.vercel.app/</code>
          </div>
        </section>

        <!-- Endpoints -->
        <section id="endpoints">
          <h2>Endpoints</h2>
          
          <h3>1. Geolocalización Automática</h3>
          <p>Detecta automáticamente la ubicación del cliente a partir de su dirección IP.</p>
          <div class="endpoint">GET /location</div>
          <pre><code>\n${JSON.stringify(data, null, 2)}</code></pre>

          <h3>2. Geolocalización por Coordenadas</h3>
          <p>Obtén información precisa enviando latitud y longitud.</p>
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
          <h2>Implementación Frontend</h2>
          <p>
            Ejemplo moderno de cómo consumir la API utilizando <code>async/await</code> y la API de Geolocalización del navegador.
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
      \`https://geo-api-black.vercel.app/geolocation?lat=\${latitude}&lon=\${longitude}\`
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
                <code style="color: #22c55e; min-width: 60px;">200</code>
                <span><strong>OK</strong> - Petición exitosa.</span>
             </div>
             <div style="display: flex; gap: 1rem; align-items: baseline;">
                <code style="color: #eab308; min-width: 60px;">400</code>
                <span><strong>Bad Request</strong> - Parámetros faltantes o inválidos.</span>
             </div>
             <div style="display: flex; gap: 1rem; align-items: baseline;">
                <code style="color: #ef4444; min-width: 60px;">429</code>
                <span><strong>Too Many Requests</strong> - Límite de 60 req/hora excedido.</span>
             </div>
             <div style="display: flex; gap: 1rem; align-items: baseline;">
                <code style="color: #a855f7; min-width: 60px;">500</code>
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

export const excepctionQR = () => `
<html>
<head>
<title>Error - Parámetro faltante</title>
<meta name="viewport" content="width=device-width, initial-scale=1" />
<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        position: relative;
        overflow: hidden;
    }
    
    body::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><radialGradient id="a" cx="50%" cy="50%" r="50%"><stop offset="0%" style="stop-color:rgba(255,255,255,0.1)"/><stop offset="100%" style="stop-color:rgba(255,255,255,0)"/></radialGradient></defs><polygon points="200,150 350,400 50,400" fill="url(%23a)"/><polygon points="750,200 900,450 600,450" fill="url(%23a)"/><polygon points="150,600 300,850 0,850" fill="url(%23a)"/><polygon points="850,650 1000,900 700,900" fill="url(%23a)"/></svg>') no-repeat center center;
        background-size: cover;
        pointer-events: none;
        animation: float 15s ease-in-out infinite;
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-15px) rotate(180deg); }
    }
    
    .container {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 24px;
        padding: 40px 30px;
        max-width: 480px;
        width: 100%;
        box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.1),
            0 0 0 1px rgba(255, 255, 255, 0.05) inset;
        position: relative;
        animation: slideUp 0.6s ease-out;
        text-align: center;
    }
    
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .error-icon {
        width: 80px;
        height: 80px;
        margin: 0 auto 25px;
        background: linear-gradient(135deg, #ff6b6b, #ee5a52);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: pulse 2s ease-in-out infinite;
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    .error-icon svg {
        width: 40px;
        height: 40px;
        color: white;
    }
    
    h4 { 
        background: linear-gradient(135deg, #ff6b6b, #ee5a52);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 20px;
        letter-spacing: -0.5px;
    }
    
    p {
        font-size: 1.1rem;
        line-height: 1.6;
        color: #555;
        margin-bottom: 15px;
    }
    
    .code-block {
        background: #f8f9fa;
        border: 1px solid #e9ecef;
        border-radius: 12px;
        padding: 15px;
        margin: 20px 0;
        font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
        font-size: 0.9rem;
        color: #495057;
        word-break: break-all;
        position: relative;
        overflow: hidden;
    }
    
    .code-block::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 4px;
        height: 100%;
        background: linear-gradient(135deg, #ff6b6b, #ee5a52);
    }
    
    .code-highlight {
        background: linear-gradient(135deg, #ff6b6b20, #ee5a5220);
        padding: 2px 6px;
        border-radius: 4px;
        font-weight: 600;
        color: #c1341c;
    }
    
    .button-container {
        display: flex;
        gap: 15px;
        justify-content: center;
        flex-wrap: wrap;
        margin-top: 30px;
    }
    
    a { 
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 14px 28px;
        background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
        color: white;
        text-decoration: none;
        border-radius: 50px;
        font-size: 1rem;
        font-weight: 600;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
        position: relative;
        overflow: hidden;
    }
    
    a::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
        transition: left 0.5s;
    }
    
    a:hover::before {
        left: 100%;
    }
    
    a:hover { 
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(255, 107, 107, 0.6);
    }
    
    a:active {
        transform: translateY(0);
    }
    
    .example-icon {
        width: 18px;
        height: 18px;
    }
    
    .usage-section {
        margin-top: 25px;
        padding: 20px;
        background: rgba(255, 107, 107, 0.05);
        border-radius: 16px;
        border: 1px solid rgba(255, 107, 107, 0.1);
    }
    
    .usage-section h5 {
        color: #c1341c;
        font-size: 1.1rem;
        margin-bottom: 10px;
        font-weight: 600;
    }
    
    @media (max-width: 600px) {
        body { 
            padding: 15px; 
        }
        .container { 
            padding: 30px 20px;
            border-radius: 20px;
            max-width: 100%;
        }
        h4 { 
            font-size: 1.6rem;
            margin-bottom: 15px;
        }
        p {
            font-size: 1rem;
        }
        .error-icon {
            width: 60px;
            height: 60px;
            margin-bottom: 20px;
        }
        .error-icon svg {
            width: 30px;
            height: 30px;
        }
        .code-block {
            font-size: 0.8rem;
            padding: 12px;
        }
        a { 
            padding: 12px 24px;
            font-size: 0.95rem;
        }
    }
    
    @media (max-width: 400px) {
        .container {
            padding: 25px 15px;
        }
        .button-container {
            flex-direction: column;
            align-items: center;
        }
        a {
            width: 100%;
            justify-content: center;
            max-width: 250px;
        }
        .code-block {
            font-size: 0.75rem;
        }
    }
</style>
</head>
<body>
<div class="container">
    <div class="error-icon">
        <svg fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
        </svg>
    </div>
    
    <h4>Parámetro faltante</h4>
    
    <p>Debes enviar la URL a convertir en código QR mediante el parámetro <span class="code-highlight">url</span>.</p>
    
    <div class="usage-section">
        <h5>💡 Ejemplo de uso:</h5>
        <div class="code-block">
            https://geo-api-black.vercel.app/qr?<span class="code-highlight">url=https://neo-wifi.vercel.app</span>
        </div>
    </div>
    
    <div class="button-container">
        <a href="/qr?url=https://neo-wifi.vercel.app">
            <svg class="example-icon" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clip-rule="evenodd"/>
            </svg>
            Probar ejemplo
        </a>
    </div>
</div>
</body>
</html>
`

export const qrCode = ({ dataURL }) => `
<html>
    <head>
    <title>Código QR</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><radialGradient id="a" cx="50%" cy="50%" r="50%"><stop offset="0%" style="stop-color:rgba(255,255,255,0.1)"/><stop offset="100%" style="stop-color:rgba(255,255,255,0)"/></radialGradient></defs><circle cx="200" cy="200" r="100" fill="url(%23a)"/><circle cx="800" cy="300" r="120" fill="url(%23a)"/><circle cx="300" cy="700" r="80" fill="url(%23a)"/><circle cx="700" cy="800" r="90" fill="url(%23a)"/></svg>') no-repeat center center;
            background-size: cover;
            pointer-events: none;
        }
        
        .container {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 24px;
            padding: 40px 30px;
            max-width: 420px;
            width: 100%;
            box-shadow: 
                0 8px 32px rgba(0, 0, 0, 0.1),
                0 0 0 1px rgba(255, 255, 255, 0.05) inset;
            position: relative;
        }
        
        h1 { 
            background: linear-gradient(135deg, #667eea, #764ba2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-size: 2.2rem;
            font-weight: 700;
            margin-bottom: 30px;
            text-align: center;
            letter-spacing: -0.5px;
        }
        
        .qr-wrapper {
            position: relative;
            display: flex;
            width: fit-content;
            margin: 0 auto;
            justify-content: center;
            margin-bottom: 30px;
        }
        
        .qr-wrapper::before {
            content: '';
            position: absolute;
            top: -10px;
            left: -10px;
            right: -10px;
            bottom: -10px;
            background: linear-gradient(45deg, #667eea, #764ba2, #667eea);
            border-radius: 20px;
            z-index: -1;
        }
        
        img { 
            width: 280px;
            height: 280px;
            border-radius: 16px;
            background: white;
            padding: 10px;
            display: block;
            transition: all 0.3s ease;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        
        .button-container {
            display: flex;
            gap: 15px;
            justify-content: center;
            flex-wrap: wrap;
        }
        
        a { 
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 14px 28px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-decoration: none;
            border-radius: 50px;
            font-size: 1rem;
            font-weight: 600;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
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
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
        }
        
        a:active {
            transform: translateY(0);
        }
        
        .download-icon {
            width: 18px;
            height: 18px;
        }
        
        @media (max-width: 600px) {
            body { 
                padding: 15px; 
            }
            .container { 
                padding: 30px 20px;
                border-radius: 20px;
            }
            h1 { 
                font-size: 1.8rem;
                margin-bottom: 25px;
            }
            img { 
                width: 240px;
                height: 240px;
            }
            .qr-wrapper::before {
                top: -8px;
                left: -8px;
                right: -8px;
                bottom: -8px;
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
            img {
                width: 200px;
                height: 200px;
            }
            .button-container {
                flex-direction: column;
                align-items: center;
            }
            a {
                width: 100%;
                justify-content: center;
                max-width: 200px;
            }
        }
    </style>
    </head>
    <body>
    <div class="container">
        <h1>Tu código QR</h1>
        <div class="qr-wrapper">
            <img src="${dataURL}" alt="Código QR" />
        </div>
        <div class="button-container">
            <a href="${dataURL}" download="codigo-qr.png">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-download-icon lucide-download"><path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/></svg>
                Descargar QR
            </a>
        </div>
    </div>
    </body>
</html>
`

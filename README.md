# Solo Leveling: Sistema

Aplicación de fan construida con Ionic React + Capacitor, una API REST ligera en Express y un generador de PDF con QR. No incluye material audiovisual ni imágenes oficiales; proporciona ilustraciones abstractas y admite URLs/archivos de imagen y video que tengas derecho a utilizar.

## Estructura

```text
frontend/
  src/
    components/     Componentes reutilizables y navegación por tabs
    pages/          Inicio, cazadores, momentos, acerca de, juego y perfil
    theme/          Paleta oscura y estilos responsive
    App.tsx
    api.ts
    types.ts
  capacitor.config.ts
backend/
  src/
    data.js         Datos JSON para cazadores y momentos
    server.js       API REST
deliverable/
  generate-delivery.js
```

## Requisitos

- Node.js 20.19+ o 22.12+ y npm.
- Ionic CLI (`npm install -g @ionic/cli`).
- Android Studio con Android SDK 35 y JDK 21 para generar el proyecto nativo de Capacitor 7.
- Para ejecutar el PDF: Node.js/npm y una foto del estudiante.

## Desarrollo local

En una terminal:

```powershell
cd backend
npm install
npm run dev
```

En otra terminal:

```powershell
cd frontend
npm install
npm run dev
```

La app carga cazadores y momentos desde `http://localhost:3001`. Copia `frontend/.env.example` como `frontend/.env.local` para configurar las URLs. `VITE_HOME_HERO_IMAGE_URL` controla la imagen destacada de Inicio y `VITE_PROFILE_PHOTO_URL` la foto de Edwin en Contrátame. Para usar un host API diferente, define `VITE_API_URL` antes de compilar. En un dispositivo Android, `localhost` apunta al propio dispositivo: configura `VITE_API_URL` con la URL HTTPS o la dirección LAN accesible del backend, o publica los datos como parte de la app.

Los retratos de Jinwoo, Cha Hae-In y Beru se configuran mediante `portraitUrl` en `backend/src/data.js`; cada momento acepta `videoUrl` y `posterUrl`. Esos campos deben apuntar a recursos HTTP(S) accesibles. Usa medios propios o con licencia adecuada.

## Generar APK de Android (PowerShell)

Desde la raíz del proyecto, ejecuta los comandos en este orden:

```powershell
cd frontend
npm install
npx ionic build
npx cap add android
npx cap sync android
npx cap open android
```

En Android Studio selecciona **Build > Build Bundle(s) / APK(s) > Build APK(s)**. El APK de depuración queda normalmente en `frontend/android/app/build/outputs/apk/debug/app-debug.apk`.

Para compilar desde CLI una vez agregado Android:

```powershell
cd frontend
npx ionic build
npx cap sync android
cd android
.\gradlew.bat assembleDebug
```

El APK generado se encuentra en `frontend/android/app/build/outputs/apk/debug/app-debug.apk`. Para distribuir una versión de producción, configura una clave de firma en Android Studio y genera un APK firmado (`Build > Generate Signed Bundle / APK`).

## PDF de entrega con QR

Después de publicar el APK en una URL accesible, configura los datos reales. El generador no inventa matrícula, foto ni URL de descarga; informa un error si falta cualquiera:

```powershell
cd deliverable
npm install
$env:STUDENT_NAME = "Edwin Perez"
$env:STUDENT_ID = "REEMPLAZAR_CON_MATRICULA"
$env:PHOTO_PATH = "C:\ruta\a\foto.jpg"
$env:APK_URL = "https://servidor-ejemplo.com/app-debug.apk"
$env:OUTPUT_PDF = "entrega-solo-leveling.pdf"
npm run generate
```

El PDF se escribe en la ruta especificada por `OUTPUT_PDF` (o `deliverable/entrega-solo-leveling.pdf` por defecto) e incluye nombre, matrícula, foto y QR con el enlace del APK.

## Juego

“Sube de nivel” es un juego de reflejos, no de trivia: durante rondas de 20 segundos aparecen portales en posiciones aleatorias. Cada portal tocado otorga 10 EXP; se conservan los puntos entre rondas y el rango progresa de E a S.

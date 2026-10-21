import fs from "node:fs";
import path from "node:path";
import PDFDocument from "pdfkit";
import QRCode from "qrcode";

const name = process.env.STUDENT_NAME;
const studentId = process.env.STUDENT_ID;
const photoPath = process.env.PHOTO_PATH;
const apkUrl = process.env.APK_URL;
const outputPath = process.env.OUTPUT_PDF ?? "entrega-solo-leveling.pdf";

const missing = [
  ["STUDENT_NAME", name],
  ["STUDENT_ID", studentId],
  ["PHOTO_PATH", photoPath],
  ["APK_URL", apkUrl],
].filter(([, value]) => !value).map(([key]) => key);

if (missing.length > 0) {
  console.error(`Faltan variables requeridas: ${missing.join(", ")}`);
  process.exitCode = 1;
} else if (!fs.existsSync(photoPath)) {
  console.error(`No se encontró la foto indicada en PHOTO_PATH: ${photoPath}`);
  process.exitCode = 1;
} else {
  let parsedUrl;
  try {
    parsedUrl = new URL(apkUrl);
  } catch {
    console.error("APK_URL debe ser una URL válida y pública.");
    process.exitCode = 1;
  }

  if (parsedUrl && !["http:", "https:"].includes(parsedUrl.protocol)) {
    console.error("APK_URL debe usar el protocolo http o https.");
    process.exitCode = 1;
  } else if (parsedUrl) {
    const absoluteOutputPath = path.resolve(outputPath);
    const document = new PDFDocument({ size: "A4", margin: 54 });
    const output = fs.createWriteStream(absoluteOutputPath);
    output.on("finish", () => console.log(`PDF creado: ${absoluteOutputPath}`));
    document.pipe(output);

    const qr = await QRCode.toBuffer(apkUrl, { errorCorrectionLevel: "H", margin: 1, width: 220 });
    document.rect(0, 0, document.page.width, 170).fill("#0b1020");
    document.fillColor("#59dcff").fontSize(10).text("ENTREGA · PROYECTO MÓVIL", 54, 50, { characterSpacing: 2 });
    document.fillColor("#ffffff").fontSize(28).text("Solo Leveling: Sistema", 54, 78);
    document.fillColor("#152238").roundedRect(54, 205, 487, 455, 10).fill();

    document.image(photoPath, 76, 230, { fit: [142, 142], align: "center", valign: "center" });
    document.fillColor("#61dfff").fontSize(9).text("ESTUDIANTE", 245, 246, { characterSpacing: 1.5 });
    document.fillColor("#ffffff").fontSize(20).text(name, 245, 265, { width: 270 });
    document.fillColor("#94a6bf").fontSize(10).text("MATRÍCULA", 245, 310, { characterSpacing: 1.5 });
    document.fillColor("#ffffff").fontSize(14).text(studentId, 245, 328, { width: 260 });

    document.fillColor("#61dfff").fontSize(11).text("DESCARGA LA APLICACIÓN", 76, 414, { characterSpacing: 1.3 });
    document.image(qr, 76, 440, { fit: [150, 150] });
    document.fillColor("#b5c2d4").fontSize(9).text("Escanea el código QR para abrir el enlace del APK.", 246, 464, { width: 255, lineGap: 4 });
    document.fillColor("#77dcf4").fontSize(8).text(apkUrl, 246, 500, { width: 255, link: apkUrl });

    document.fillColor("#8d9bb0").fontSize(8).text(
      "Aplicación móvil desarrollada con Ionic React, Capacitor y Node.js.",
      54,
      720,
      { align: "center", width: 487 },
    );
    document.end();
  }
}

import puppeteer from "puppeteer";

export const generateStudentResultPDF = async (studentData) => {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: "new",
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--font-render-hinting=none",
      ],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 1600 });

    // Pre-load the fonts before setting the content
    await page.evaluateOnNewDocument(() => {
      // Create a preload link for the font
      const link = document.createElement("link");
      link.rel = "preload";
      link.href =
        "https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;700&display=swap";
      link.as = "style";
      document.head.appendChild(link);

      // Also create a stylesheet link
      const style = document.createElement("link");
      style.rel = "stylesheet";
      style.href =
        "https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;700&display=swap";
      document.head.appendChild(style);
    });

    const html = generateHTML(studentData);

    // Set content and wait for load
    await page.setContent(html, {
      waitUntil: ["load", "networkidle2"],
      timeout: 60000,
    });

    // Add Google Fonts explicitly with a longer timeout
    await page.addStyleTag({
      url: "https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;700&display=swap",
      timeout: 10000,
    });

    // More robust font loading
    await page.evaluate(() => {
      return new Promise((resolve) => {
        // Check if document.fonts is available
        if (document.fonts && document.fonts.ready) {
          // Wait for fonts to load
          document.fonts.ready.then(() => {
            // Additional wait time to ensure proper rendering
            setTimeout(resolve, 2000);
          });
        } else {
          // Fallback if document.fonts is not available
          setTimeout(resolve, 3000);
        }
      });
    });

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "15mm",
        right: "15mm",
        bottom: "15mm",
        left: "15mm",
      },
      preferCSSPageSize: true,
      displayHeaderFooter: false,
    });

    return pdfBuffer;
  } catch (error) {
    console.error("PDF generation error:", error);
    throw error;
  } finally {
    if (browser)
      await browser
        .close()
        .catch((e) => console.error("Error closing browser:", e));
  }
};

const generateHTML = (studentData) => {
  const { name, standard, academicYear, result, division } = studentData;

  // Base64 encoded logos
  const rightLogo =
    "https://res.cloudinary.com/dloe8x9e4/image/upload/v1745153175/PANCHKOSHADHARIT_GURUKUL_c28rql.jpg";
  const leftLogo =
    "https://res.cloudinary.com/dloe8x9e4/image/upload/v1743612669/hindavi_logo_1_zgn1rn.png";
  const watermarkLogo = "https://res.cloudinary.com/dloe8x9e4/image/upload/v1743612654/gurukul_logo_xtcv1x.jpg";

  const styles = `
    <style>
      @font-face {
        font-family: 'CustomDevanagari';
        src: url('https://fonts.gstatic.com/s/notosansdevanagari/v28/TuGFUUFzXI5FBtUq5a8bjKYTZjtRU6Sgv3kY.woff2') format('woff2');
        font-weight: 400;
        font-style: normal;
        font-display: swap;
      }
      @font-face {
        font-family: 'CustomDevanagari';
        src: url('https://fonts.gstatic.com/s/notosansdevanagari/v28/TuGOUUFzXI5FBtUq5a8bjKYTZjtRU6Sgv3U_AmT6.woff2') format('woff2');
        font-weight: 700;
        font-style: normal;
        font-display: swap;
      }
      
      @page {
        size: A4;
        margin: 0;
      }
      body {
        font-family: 'CustomDevanagari', 'Noto Sans Devanagari', Arial, sans-serif;
        color: #333;
        margin: 0;
        padding: 0;
        background-color: #fff;
      }
      
      /* Rest of your styles remain the same */
      .page {
        width: 210mm;
        height: 297mm;
        position: relative;
        box-sizing: border-box;
        page-break-after: always;
        overflow: hidden;
      }
      .page-content {
        border: 1px solid #000;
        height: calc(100% - 10mm);
        padding: 5mm;
        box-sizing: border-box;
        position: relative;
        margin: 5mm;
      }
      .watermark {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        opacity: 0.15;
        z-index: -1;
        width: 520px;
        height: 600px;
      }
      .header {
        text-align: center;
        margin-bottom: 8px;
        padding-bottom: 8px;
        border-bottom: 1px solid #eee;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 15px;
      }
      .header-content {
        flex: 1;
      }
      .logo {
        width: 150px;
        height: 150px;
        object-fit: contain;
      }
      h1, h2, h3, h4 {
        text-align: center;
        margin: 5px 0;
        line-height: 1.2;
        font-family: 'CustomDevanagari', 'Noto Sans Devanagari', Arial, sans-serif;
      }
      h2 {
        font-size: 18px;
      }
      h3 {
        font-size: 16px;
      }
      h4 {
        font-size: 14px;
      }
      .student-info {
        text-align: center;
        margin-bottom: 10px;
        font-weight: bold;
        font-size: 15px;
        line-height: 1.2;
        font-family: 'CustomDevanagari', 'Noto Sans Devanagari', Arial, sans-serif;
      }
      .section-container {
        margin-bottom: 12px;
      }
      .section-title {
        text-align: center;
        font-size: 16px;
        font-weight: bold;
        margin: 10px 0 8px 0;
        padding-bottom: 5px;
        border-bottom: 1px solid black;
        line-height: 1.2;
        font-family: 'CustomDevanagari', 'Noto Sans Devanagari', Arial, sans-serif;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin: 8px 0;
        font-size: 13px;
        line-height: 1.2;
      }
      th, td {
        border: 1px solid black;
        padding: 5px;
        text-align: left;
        line-height: 1.2;
      }
      th {
        background-color: #f8f9fa;
        font-weight: bold;
        text-align: center;
        padding: 6px;
      }
      .physical-measurements-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 5px;
        margin-bottom: 12px;
      }
      .physical-measurement-card {
        width: calc(33.33% - 10px);
        min-width: 80px;
        border: 1px solid black;
        border-radius: 0;
        overflow: hidden;
      }
      .physical-measurement-header {
        background-color: #f8f9fa;
        padding: 5px;
        text-align: center;
        font-weight: bold;
        border-bottom: 1px solid black;
        font-size: 11px;
        line-height: 1.2;
      }
      .physical-measurement-sessions {
        display: grid;
        grid-template-columns: 1fr 1fr;
      }
      .session-divider {
        border-right: 1px solid black;
      }
      .session-header {
        padding: 3px;
        text-align: center;
        font-weight: bold;
        border-bottom: 1px solid black;
        font-size: 10px;
        line-height: 1.2;
      }
      .session-value {
        padding: 5px;
        text-align: center;
        font-size: 11px;
        line-height: 1.2;
      }
      .yogabhyas-pathantar-container {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 8px;
        margin-bottom: 12px;
      }
      .yogabhyas-container {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 0;
        border: 1px solid black;
      }
      .yogabhyas-column {
        border-right: 1px solid black;
      }
      .yogabhyas-header {
        background-color: #f8f9fa;
        padding: 5px;
        text-align: center;
        font-weight: bold;
        border-bottom: 1px solid black;
        font-size: 13px;
        line-height: 1.2;
      }
      .yogabhyas-item {
        padding: 4px;
        border-bottom: 1px solid #eee;
        font-size: 12px;
        line-height: 1.2;
      }
      .checked-item {
        font-weight: bold;
      }
      .pathantar-columns {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
      }
      .pathantar-column {
        border: 1px solid black;
      }
      .pathantar-header {
        background-color: #f8f9fa;
        padding: 5px;
        text-align: center;
        font-weight: bold;
        border-bottom: 1px solid black;
        font-size: 13px;
        line-height: 1.2;
      }
      .pathantar-content {
        padding: 5px;
        font-size: 12px;
        line-height: 1.2;
      }
      .annual-result-table {
        font-size: 12px;
        width: 100%;
        overflow-x: auto;
      }
      .annual-result-table th, .annual-result-table td {
        text-align: center;
        padding: 5px;
        line-height: 1.2;
      }
      .maunabhyas-table {
        width: 100%;
        margin-top: 10px;
      }
      .maunabhyas-table th {
        font-size: 12px;
        padding: 6px;
        line-height: 1.2;
      }
      .maunabhyas-table td {
        font-size: 11px;
        line-height: 1.2;
      }
      .prakruti {
        text-align: center;
        font-weight: bold;
        margin: 8px 0;
        font-family: 'CustomDevanagari', 'Noto Sans Devanagari', Arial, sans-serif;
        font-size: 14px;
        line-height: 1.2;
      }
      .compact-table {
        font-size: 12px;
      }
      .compact-table th, .compact-table td {
        padding: 4px;
      }
      .page-break {
        page-break-after: always;
      }
      .hindavi{
      font-size: 25px;
      font-family: 'CustomDevanagari', 'Noto Sans Devanagari', Arial, sans-serif;
      }
    </style>
  `;

  let htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Student Result</title>
      ${styles}
    </head>
    <body>
      <!-- Page 1: Header + Annamaya Kosha -->
      <div class="page">
        <div class="page-content">
          <img src="${watermarkLogo}" class="watermark" alt="Watermark">
          <div class="header">
            <div class="logo"></div>
            <div class="header-content">
              <h4>श्रीनिधी एज्युकेशन सोसायटी</h4>
              <h2 class="hindavi">हिंदवी पब्लिक स्कूल सातारा</h2>
              <h2 class="hindavi">हिंदवी पंचकोशाधारित गुरुकुल</h2>
              <h2>कोशनिहाय प्रगती ${academicYear || "२०२४-२५"}</h2>
            </div>
            <img src="${rightLogo}" class="logo" alt="Right Logo">
          </div>
          
          <div class="student-info">
        <p>
            ${
              studentData.gender === "मुलगा"
                ? "विद्यार्थ्याचे नाव"
                : "विद्यार्थिनीचे नाव"
            }: ${name || ""}
  </p>
  <p>इयत्ता: ${standard || ""} वी  ${division || ""} </p>
</div>

  `;

  if (result?.annamayaKosha) {
    htmlContent += `
      <div class="section-container">
        <h2 class="section-title">अन्नमयकोश - शारीरिक विकसन (समूहाचे स्थूल रूप)</h2>
        ${
          result.annamayaKosha.prakruti
            ? `<div class="prakruti">प्रकृती: ${result.annamayaKosha.prakruti}</div>`
            : ""
        }
    `;

    // Physical Measurements - Now in 3 columns per row
    if (result.annamayaKosha.physicalMeasurements?.length > 0) {
      htmlContent += `
        <div class="section-title">शारीरिक क्षमता मापन चाचणी तक्ता</div>
        <div class="physical-measurements-container">
      `;

      result.annamayaKosha.physicalMeasurements.forEach(
        (measurement, index) => {
          if (index % 3 === 0 && index !== 0) {
            htmlContent += `</div><div class="physical-measurements-container">`;
          }
          htmlContent += `
          <div class="physical-measurement-card">
            <div class="physical-measurement-header">
              ${measurement.name}
            </div>
            <div class="physical-measurement-sessions">
              <div class="session-divider">
                <div class="session-header">सत्र १</div>
                <div class="session-value">${measurement.session1 || "-"}</div>
              </div>
              <div>
                <div class="session-header">सत्र २</div>
                <div class="session-value">${measurement.session2 || "-"}</div>
              </div>
            </div>
          </div>
        `;
        }
      );

      htmlContent += `</div>`;
    }

    // Daily Observations
    if (result.annamayaKosha.dailyObservations?.length > 0) {
      htmlContent += `
        <div class="section-title">दैनंदिन निरीक्षण</div>
        <table class="compact-table">
          <thead>
            <tr>
              <th style="width: 30%;">श्रेणी</th>
              <th style="width: 70%;">निरीक्षण</th>
            </tr>
          </thead>
          <tbody>
      `;

      result.annamayaKosha.dailyObservations.forEach((observation) => {
        htmlContent += `
          <tr>
            <td style="font-weight: bold; text-align: start;">${
              observation.category
            }</td>
            <td>${observation.selectedOption || "-"}</td>
          </tr>
        `;
      });

      htmlContent += `</tbody></table>`;
    }

    // Annual Activities
    if (result.annamayaKosha.annualActivities?.length > 0) {
      htmlContent += `
        <div class="section-title">वार्षिक उपक्रम</div>
        <table class="compact-table">
          <thead>
            <tr>
              <th style="width: 30%;">उपक्रम</th>
              <th style="width: 70%;">विवरण</th>
            </tr>
          </thead>
          <tbody>
      `;

      result.annamayaKosha.annualActivities.forEach((activity) => {
        htmlContent += `
          <tr>
            <td style="font-weight: bold;">${activity.name}</td>
            <td>${activity.value || "-"}</td>
          </tr>
        `;
      });

      htmlContent += `</tbody></table>`;
    }

    htmlContent += `</div>`;
  }

  htmlContent += `
        </div>
      </div>
      
      <!-- Page 2: Pranamaya Kosha -->
      <div class="page">
        <div class="page-content">
          <img src="${watermarkLogo}" class="watermark" alt="Watermark">
          <div class="section-container">
            <h2 class="section-title">प्राणमयकोश – प्राणिक (दृश्य नसणारे  स्थूल रूप)</h2>
  `;

  if (result?.pranamayaKosha) {
    // Function to convert numbers to Marathi digits
    const toMarathiDigits = (num) => {
      const marathiDigits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
      return num
        .toString()
        .split("")
        .map((d) => marathiDigits[parseInt(d)])
        .join("");
    };

    // Chhandavarga (Hobby Classes)
    if (result.pranamayaKosha.chhandavarga) {
      htmlContent += `
        <div class="section-title">छंदवर्ग </div>
        <table>
          <thead>
            <tr>
              <th style="width: 33%;">संगीत</th>
              <th style="width: 33%;">संगणक</th>
              <th style="width: 34%;">चित्रकला</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="vertical-align: top;">
      `;

      // Music
      if (result.pranamayaKosha.chhandavarga.music?.length > 0) {
        let presentCount = 0;
        result.pranamayaKosha.chhandavarga.music.forEach((item) => {
          if (item.isPresent) {
            presentCount++;
            htmlContent += `<div class="checked-item">${toMarathiDigits(
              presentCount
            )}. ${item.name}</div>`;
          }
        });
      }

      htmlContent += `
              </td>
              <td style="vertical-align: top;">
      `;

      // Computer
      if (result.pranamayaKosha.chhandavarga.computer?.length > 0) {
        let presentCount = 0;
        result.pranamayaKosha.chhandavarga.computer.forEach((item) => {
          if (item.isPresent) {
            presentCount++;
            htmlContent += `<div class="checked-item">${toMarathiDigits(
              presentCount
            )}. ${item.name}</div>`;
          }
        });
      }

      htmlContent += `
              </td>
              <td style="vertical-align: top;">
      `;

      // Art
      if (result.pranamayaKosha.chhandavarga.art?.length > 0) {
        let presentCount = 0;
        result.pranamayaKosha.chhandavarga.art.forEach((item) => {
          if (item.isPresent) {
            presentCount++;
            htmlContent += `<div class="checked-item">${toMarathiDigits(
              presentCount
            )}. ${item.name}</div>`;
          }
        });
      }

      htmlContent += `
              </td>
            </tr>
          </tbody>
        </table>
      `;
    }

    // Yogabhyas and Pathantar side by side
    htmlContent += `<div class="yogabhyas-pathantar-container">`;

    // Yogabhyas - Now with 3 columns
    htmlContent += `
      <div>
        <div class="section-title">योगाभ्यास</div>
        <div class="yogabhyas-container">
          <div class="yogabhyas-column">
            <div class="yogabhyas-header">आसन (१-१०)</div>
    `;

    // Asanas 1-10
    if (result.pranamayaKosha.yogabhyas?.asanas?.length > 0) {
      let presentCount = 0;
      result.pranamayaKosha.yogabhyas.asanas.slice(0, 10).forEach((item) => {
        if (item.isPresent) {
          presentCount++;
          htmlContent += `<div class="yogabhyas-item checked-item">${toMarathiDigits(
            presentCount
          )}. ${item.name}</div>`;
        }
      });
    }

    htmlContent += `
          </div>
          <div class="yogabhyas-column">
            <div class="yogabhyas-header">आसन (११-२०)</div>
    `;

    // Asanas 11-20
    if (result.pranamayaKosha.yogabhyas?.asanas?.length > 10) {
      let presentCount = 10;
      result.pranamayaKosha.yogabhyas.asanas.slice(10).forEach((item) => {
        if (item.isPresent) {
          presentCount++;
          htmlContent += `<div class="yogabhyas-item checked-item">${toMarathiDigits(
            presentCount
          )}. ${item.name}</div>`;
        }
      });
    }

    htmlContent += `
          </div>
          <div class="yogabhyas-column">
            <div class="yogabhyas-header">प्राणायाम</div>
    `;

    // Pranayam
    if (result.pranamayaKosha.yogabhyas?.pranayam?.length > 0) {
      let presentCount = 0;
      result.pranamayaKosha.yogabhyas.pranayam.forEach((item) => {
        if (item.isPresent) {
          presentCount++;
          htmlContent += `<div class="yogabhyas-item checked-item">${toMarathiDigits(
            presentCount
          )}. ${item.name}</div>`;
        }
      });
    }

    htmlContent += `
          </div>
        </div>
      </div>
    `;

    // Pathantar - 2 columns
    htmlContent += `
      <div>
        <div class="section-title">पाठांतर</div>
        <div class="pathantar-columns">
          <div class="pathantar-column">
            <div class="pathantar-header">संस्कृत पाठांतर</div>
            <div class="pathantar-content">
    `;

    // Sanskrit Pathantar
    if (result.pranamayaKosha.pathantar?.sanskrit?.length > 0) {
      let presentCount = 0;
      result.pranamayaKosha.pathantar.sanskrit.forEach((item) => {
        if (item.isPresent) {
          presentCount++;
          htmlContent += `<div class="checked-item">${toMarathiDigits(
            presentCount
          )}. ${item.name}</div>`;
        }
      });
    }

    htmlContent += `
            </div>
          </div>
          <div class="pathantar-column">
            <div class="pathantar-header">मराठी पाठांतर</div>
            <div class="pathantar-content">
    `;

    // Marathi Pathantar
    if (result.pranamayaKosha.pathantar?.marathi?.length > 0) {
      let presentCount = 0;
      result.pranamayaKosha.pathantar.marathi.forEach((item) => {
        if (item.isPresent) {
          presentCount++;
          htmlContent += `<div class="checked-item">${toMarathiDigits(
            presentCount
          )}. ${item.name}</div>`;
        }
      });
    }

    htmlContent += `
            </div>
          </div>
        </div>
      </div>
    `;

    htmlContent += `</div>`; // Close yogabhyas-pathantar-container

    // Daily Observations
    if (result.pranamayaKosha.dailyObservations?.length > 0) {
      htmlContent += `
        <div class="section-title">दैनंदिन निरीक्षण</div>
        <table class="compact-table">
          <thead>
            <tr>
              <th style="width: 30%;">श्रेणी</th>
              <th style="width: 70%;">निरीक्षण</th>
            </tr>
          </thead>
          <tbody>
      `;

      result.pranamayaKosha.dailyObservations.forEach((observation) => {
        htmlContent += `
          <tr>
            <td style="font-weight: bold; text-align: start;">${
              observation.category
            }</td>
            <td>${observation.selectedOption || "-"}</td>
          </tr>
        `;
      });

      htmlContent += `</tbody></table>`;
    }

    // Annual Activities
    if (result.pranamayaKosha.annualActivities?.length > 0) {
      htmlContent += `
        <div class="section-title">वार्षिक उपक्रम</div>
        <table class="compact-table">
          <thead>
            <tr>
              <th style="width: 30%;">उपक्रम</th>
              <th style="width: 70%;">विवरण</th>
            </tr>
          </thead>
          <tbody>
      `;

      result.pranamayaKosha.annualActivities.forEach((activity) => {
        htmlContent += `
          <tr>
            <td style="font-weight: bold;">${activity.name}</td>
            <td>${activity.value || "-"}</td>
          </tr>
        `;
      });

      htmlContent += `</tbody></table>`;
    }
  }

  htmlContent += `
          </div>
        </div>
      </div>
      
      <!-- Page 3: Manomaya Kosha + Vidnyanmaya Kosha (Annual Result) -->
      <div class="page">
        <div class="page-content">
          <img src="${watermarkLogo}" class="watermark" alt="Watermark">
          <div class="section-container">
            <h2 class="section-title">मनोमयकोश - मानसिक विकसन (प्राणांचे स्पंदन)</h2>
  `;

  if (result?.manomayaKosha) {
    // Daily Observations
    if (result.manomayaKosha.dailyObservations?.length > 0) {
      htmlContent += `
        <div class="section-title">दैनंदिन निरीक्षण</div>
        <table class="compact-table">
          <thead>
            <tr>
              <th style="width: 30%;">श्रेणी</th>
              <th style="width: 70%;">निरीक्षण</th>
            </tr>
          </thead>
          <tbody>
      `;

      result.manomayaKosha.dailyObservations.forEach((observation) => {
        htmlContent += `
          <tr>
            <td style="font-weight: bold; text-align: start;">${
              observation.category
            }</td>
            <td>${observation.selectedOption || "-"}</td>
          </tr>
        `;
      });

      htmlContent += `</tbody></table>`;
    }

    // Annual Activities
    if (result.manomayaKosha.annualActivities?.length > 0) {
      htmlContent += `
        <div class="section-title">वार्षिक उपक्रम</div>
        <table class="compact-table">
          <thead>
            <tr>
              <th style="width: 30%;">उपक्रम</th>
              <th style="width: 70%;">विवरण</th>
            </tr>
          </thead>
          <tbody>
      `;

      result.manomayaKosha.annualActivities.forEach((activity) => {
        htmlContent += `
          <tr>
            <td style="font-weight: bold;">${activity.name}</td>
            <td>${activity.value || "-"}</td>
          </tr>
        `;
      });

      htmlContent += `</tbody></table>`;
    }
  }

  // ... (previous code remains the same until Vidnyanmaya Kosha section)

  if (result?.vidnyanmayaKosha) {
    const isSeventhOrSixthStandard = ["७", "६"].includes(studentData.standard);
    const isFifthOrEighthStandard = ["५", "८"].includes(studentData.standard);

    htmlContent += `
      <div class="section-container">
        <h2 class="section-title">विज्ञानमयकोश - बौद्धिक विकसन (कल्पना विकास /सूक्ष्म/चेतन/अमूर्त कोश )</h2>
        <div class="section-title">Annual Result</div>
        
        <!-- Tables Container -->
        <div style="display: flex; justify-content: space-between; gap: 4px; margin-bottom: 8px; font-size: 8px;">
          <!-- Table 1: Academic Examination -->
          <div style="width: ${
            isSeventhOrSixthStandard ? "60%" : "38%"
          }; display: flex; flex-direction: column;">
            <table style="width: 100%; border-collapse: collapse; border: 1px solid black;">
              <thead>
                <tr style="background-color: #f2f2f2; height: 20px;">
                  <th colspan="3" style="text-align: center; padding: 1px; border: 1px solid black;">Academic Examination</th>
                </tr>
                <tr style="background-color: #f2f2f2; height: 20px;">
                  <th style="width: 10%; text-align: center; padding: 1px; border: 1px solid black;">Sr No</th>
                  <th style="width: 55%; text-align: left; padding: 1px; border: 1px solid black;">Subject</th>
                  <th style="width: 35%; text-align: center; padding: 0; border: 1px solid black;">
                    <div style="display: flex; flex-direction: column; height: 100%;">
                      <span style="">Grade</span>
                      <div style="display: flex; border-top: 1px solid black; margin-top: 1px;">
                        <span style="flex: 1; text-align: center; padding: 1px 0; border-right: 1px solid black;">Sem1</span>
                        <span style="flex: 1; text-align: center; padding: 1px 0;">Sem2</span>
                      </div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>`;

    // Add subjects to Table 1
    result.vidnyanmayaKosha.subjects?.forEach((subject, index) => {
      htmlContent += `
                <tr style="height: 18px;">
                  <td style="text-align: center; padding: 1px; border: 1px solid black; vertical-align: middle;">${
                    index + 1
                  }</td>
                  <td style="text-align: left; padding: 1px; border: 1px solid black; vertical-align: middle;">${
                    subject.label
                  }</td>
                  <td style="text-align: center; padding: 0; border: 1px solid black; vertical-align: middle;">
                    <div style="display: flex; height: 100%;">
                      <span style="flex: 1; text-align: center; padding: 2px 0; border-right: 1px solid black; font-weight: bold; display: flex; align-items: center; justify-content: center;">${
                        subject.grade?.sem1 || "-"
                      }</span>
                      <span style="flex: 1; text-align: center; padding: 2px 0; font-weight: bold; display: flex; align-items: center; justify-content: center;">${
                        subject.grade?.sem2 || "-"
                      }</span>
                    </div>
                  </td>
                </tr>`;
    });

    htmlContent += `
              </tbody>
            </table>
          </div>`;

    // Only show Annual Marks table for standards other than 7th and 8th
    if (!isSeventhOrSixthStandard) {
      htmlContent += `
          <!-- Table 2: Annual Marks -->
          <div style="width: 38%;">
            <table style="width: 100%; border-collapse: collapse; border: 1px solid black; height: 100%;">
              <thead>
                <tr style="background-color: #f2f2f2; height: 20px;">
                  <th colspan="3" style="text-align: center; padding: 1px; border: 1px solid black;">Annual Marks</th>
                </tr>
                <tr style="background-color: #f2f2f2; height: 20px; ">
                  <th style="width: 30%; text-align: center; padding: 1px; border: 1px solid black;">Min Marks</th>
                  <th style="width: 50%; text-align: center; padding: 1px; border: 1px solid black;">Sem2 obtained Marks</th>
                  <th style="width: 20%; text-align: center; padding: 1px; border: 1px solid black;">Remarks</th>
                </tr>
              </thead>
              <tbody style="height: 100%;">`;

      // Add marks to Table 2
      let totalMinMarks = 0;
      let totalSem2Marks = 0;
      const subjectCount = result.vidnyanmayaKosha.subjects?.length || 0;

      // Using fixed height of 18px for each row to match Academic Examination table
      result.vidnyanmayaKosha.subjects?.forEach((subject) => {
        totalMinMarks += Number(subject.minimumMarks) || 0;
        totalSem2Marks += Number(subject.sem2obtainedMarks) || 0;

        htmlContent += `
                <tr style="height: 19.5px;">
                  <td style="text-align: center; padding: 1px; border: 1px solid black; vertical-align: middle;">${
                    subject.minimumMarks || "-"
                  }</td>
                  <td style="text-align: center; padding: 1px; border: 1px solid black; vertical-align: middle; font-weight: bold;">${
                    subject.sem2obtainedMarks || "-"
                  }</td>
                  <td style="text-align: center; padding: 1px; border: 1px solid black; vertical-align: middle;">${
                    subject.remarks || "-"
                  }</td>
                </tr>`;
      });

      // Add total row
      const percentage =
        result.vidnyanmayaKosha.percentage ||
        (totalSem2Marks > 0
          ? Math.round((totalSem2Marks / totalMinMarks) * 100)
          : 0);

      // For 5th and 8th standard, show overall remarks in brackets next to percentage
      const percentageWithRemarks =
        isFifthOrEighthStandard && result.vidnyanmayaKosha.overallRemarks
          ? `${percentage}% (${result.vidnyanmayaKosha.overallRemarks})`
          : `${percentage}%`;

      htmlContent += `
                <tr style="height: 18px; font-weight: bold; background-color: #f5f5f5;">
                  <td style="text-align: center; padding: 1px; border: 1px solid black; vertical-align: middle;">Total</td>
                  <td style="text-align: center; padding: 1px; border: 1px solid black; vertical-align: middle;">${
                    totalSem2Marks || "-"
                  }</td>
                  <td style="text-align: center; padding: 1px; border: 1px solid black; vertical-align: middle;">${percentageWithRemarks}</td>
                </tr>
              </tbody>
            </table>
          </div>`;
    }

    htmlContent += `
          <!-- Table 3: Grade Range -->
          <table style="width: ${
            isSeventhOrSixthStandard ? "40%" : "24%"
          }; border-collapse: collapse; border: 1px solid black;">
            <thead>
              <tr style="background-color: #f2f2f2; height: 20px;">
                <th colspan="2" style="text-align: center; padding: 1px; border: 1px solid black;">Grade Range</th>
              </tr>
              <tr style="background-color: #f2f2f2; height: 20px;">
                <th style="width: 60%; text-align: center; padding: 1px; border: 1px solid black;">Range</th>
                <th style="width: 40%; text-align: center; padding: 1px; border: 1px solid black;">Grade</th>
              </tr>
            </thead>
            <tbody>
              <tr style="height: 18px;">
                <td style="text-align: center; padding: 1px; border: 1px solid black; vertical-align: middle;">91% to 100%</td>
                <td style="text-align: center; padding: 1px; border: 1px solid black; vertical-align: middle;">A1</td>
              </tr>
              <tr style="height: 18px;">
                <td style="text-align: center; padding: 1px; border: 1px solid black; vertical-align: middle;">81% to 90%</td>
                <td style="text-align: center; padding: 1px; border: 1px solid black; vertical-align: middle;">A2</td>
              </tr>
              <tr style="height: 18px;">
                <td style="text-align: center; padding: 1px; border: 1px solid black; vertical-align: middle;">71% to 80%</td>
                <td style="text-align: center; padding: 1px; border: 1px solid black; vertical-align: middle;">B1</td>
              </tr>
              <tr style="height: 18px;">
                <td style="text-align: center; padding: 1px; border: 1px solid black; vertical-align: middle;">61% to 70%</td>
                <td style="text-align: center; padding: 1px; border: 1px solid black; vertical-align: middle;">B2</td>
              </tr>
              <tr style="height: 18px;">
                <td style="text-align: center; padding: 1px; border: 1px solid black; vertical-align: middle;">51% to 60%</td>
                <td style="text-align: center; padding: 1px; border: 1px solid black; vertical-align: middle;">C1</td>
              </tr>
              <tr style="height: 18px;">
                <td style="text-align: center; padding: 1px; border: 1px solid black; vertical-align: middle;">41% to 50%</td>
                <td style="text-align: center; padding: 1px; border: 1px solid black; vertical-align: middle;">C2</td>
              </tr>
              <tr style="height: 18px;">
                <td style="text-align: center; padding: 1px; border: 1px solid black; vertical-align: middle;">33% to 40%</td>
                <td style="text-align: center; padding: 1px; border: 1px solid black; vertical-align: middle;">D</td>
              </tr>
              <tr style="height: 18px;">
                <td style="text-align: center; padding: 1px; border: 1px solid black; vertical-align: middle;">Below 33%</td>
                <td style="text-align: center; padding: 1px; border: 1px solid black; vertical-align: middle;">E</td>
              </tr>
            </tbody>
          </table>
        </div>`;
  }

  // Daily Observations (remaining code remains the same)
  if (result.vidnyanmayaKosha.dailyObservations?.length > 0) {
    htmlContent += `
        <div class="section-title" style="margin-top: 20px" >दैनंदिन निरीक्षण</div>
        <table class="compact-table">
          <thead>
            <tr>
              <th style="width: 30%;">श्रेणी</th>
              <th style="width: 70%;">निरीक्षण</th>
            </tr>
          </thead>
          <tbody>
      `;

    result.vidnyanmayaKosha.dailyObservations.forEach((observation) => {
      htmlContent += `
          <tr>
            <td style="font-weight: bold; text-align: start;">${
              observation.category
            }</td>
            <td>${observation.selectedOption || "-"}</td>
          </tr>
        `;
    });

    htmlContent += `</tbody></table>`;
  }

  htmlContent += `</div>`;

  htmlContent += `
          </div>
        </div>
      </div>
      
      <!-- Page 4: Maunabhyas + Vidnyanmaya Annual Activities + Anandmaya Kosha -->
      <div class="page">
        <div class="page-content">
          <img src="${watermarkLogo}" class="watermark" alt="Watermark">
  `;

  // Vidnyanmaya Kosha (Maunabhyas)
  if (result?.vidnyanmayaKosha?.maunAbhyasActivities) {
    htmlContent += `
      <div class="section-container">
        <h2 class="section-title">मौनाभ्यास-आत्मिक विकसन (स्वतःच्या स्वरूपाचे भान/ जाणीव)</h2>
        <table class="maunabhyas-table">
          <thead>
            <tr>
              <th style="width: 20%;">मुख्य विषय</th>
              <th style="width: 20%;">अनुभव लेखन</th>
              <th style="width: 20%;">चरित्राभ्यास</th>
              <th style="width: 20%;">प्रकट वाचन</th>
              <th style="width: 20%;">रस ग्रहण</th>
            </tr>
          </thead>
          <tbody>
    `;

    // Determine maximum rows needed
    const maxRows = Math.max(
      result.vidnyanmayaKosha.maunAbhyasActivities.mukhyaVishay?.filter(
        (item) => item.isPresent
      )?.length || 0,
      result.vidnyanmayaKosha.maunAbhyasActivities.anubhavLekhan?.filter(
        (item) => item.isPresent
      )?.length || 0,
      result.vidnyanmayaKosha.maunAbhyasActivities.charitryaAbhyas?.filter(
        (item) => item.isPresent
      )?.length || 0,
      result.vidnyanmayaKosha.maunAbhyasActivities.prakatVachan?.filter(
        (item) => item.isPresent
      )?.length || 0,
      result.vidnyanmayaKosha.maunAbhyasActivities.rasGrahan?.filter(
        (item) => item.isPresent
      )?.length || 0
    );

    for (let i = 0; i < maxRows; i++) {
      htmlContent += `<tr>`;

      // Mukhya Vishay
      const mukhyaVishayPresent =
        result.vidnyanmayaKosha.maunAbhyasActivities.mukhyaVishay?.filter(
          (item) => item.isPresent
        ) || [];
      htmlContent += `<td>${mukhyaVishayPresent[i]?.name || ""}</td>`;

      // Anubhav Lekhan
      const anubhavLekhanPresent =
        result.vidnyanmayaKosha.maunAbhyasActivities.anubhavLekhan?.filter(
          (item) => item.isPresent
        ) || [];
      htmlContent += `<td>${anubhavLekhanPresent[i]?.name || ""}</td>`;

      // Charitrya Abhyas
      const charitryaAbhyasPresent =
        result.vidnyanmayaKosha.maunAbhyasActivities.charitryaAbhyas?.filter(
          (item) => item.isPresent
        ) || [];
      htmlContent += `<td>${charitryaAbhyasPresent[i]?.name || ""}</td>`;

      // Prakat Vachan
      const prakatVachanPresent =
        result.vidnyanmayaKosha.maunAbhyasActivities.prakatVachan?.filter(
          (item) => item.isPresent
        ) || [];
      htmlContent += `<td>${prakatVachanPresent[i]?.name || ""}</td>`;

      // Ras Grahan
      const rasGrahanPresent =
        result.vidnyanmayaKosha.maunAbhyasActivities.rasGrahan?.filter(
          (item) => item.isPresent
        ) || [];
      htmlContent += `<td>${rasGrahanPresent[i]?.name || ""}</td>`;

      htmlContent += `</tr>`;
    }

    htmlContent += `</tbody></table></div>`;
  }

  // Vidnyanmaya Kosha Annual Activities (Moved after Maunabhyas)
  if (result?.vidnyanmayaKosha?.annualActivities?.length > 0) {
    htmlContent += `
      <div class="section-container">
        <h2 class="section-title">वार्षिक उपक्रम</h2>
        <table class="compact-table">
          <thead>
            <tr>
              <th style="width: 30%;">उपक्रम</th>
              <th style="width: 70%;">विवरण</th>
            </tr>
          </thead>
          <tbody>
    `;

    result.vidnyanmayaKosha.annualActivities.forEach((activity) => {
      htmlContent += `
        <tr>
          <td style="font-weight: bold;">${activity.name}</td>
          <td>${activity.value || "-"}</td>
        </tr>
      `;
    });

    htmlContent += `</tbody></table></div>`;
  }

  // Anandmaya Kosha
  if (result?.anandmayaKosha) {
    htmlContent += `
      <div class="section-container">
        <h2 class="section-title">आनंदमयकोश - आध्यात्मिक विकसन (आनंदाचे स्वरूप)</h2>
    `;

    // Daily Observations
    if (result.anandmayaKosha.dailyObservations?.length > 0) {
      htmlContent += `
        <div class="section-title">दैनंदिन निरीक्षण</div>
        <table class="compact-table">
          <thead>
            <tr>
              <th style="width: 30%;">श्रेणी</th>
              <th style="width: 70%;">निरीक्षण</th>
            </tr>
          </thead>
          <tbody>
      `;

      result.anandmayaKosha.dailyObservations.forEach((observation) => {
        htmlContent += `
          <tr>
            <td style="font-weight: bold; text-align: start;">${
              observation.category
            }</td>
            <td>${observation.selectedOption || "-"}</td>
          </tr>
        `;
      });

      htmlContent += `</tbody></table>`;
    }

    // Annual Activities
    if (result.anandmayaKosha.annualActivities?.length > 0) {
      htmlContent += `
        <div class="section-title">वार्षिक उपक्रम</div>
        <table class="compact-table">
          <thead>
            <tr>
              <th style="width: 30%;">उपक्रम</th>
              <th style="width: 70%;">विवरण</th>
            </tr>
          </thead>
          <tbody>
      `;

      result.anandmayaKosha.annualActivities.forEach((activity) => {
        htmlContent += `
          <tr>
            <td style="font-weight: bold;">${activity.name}</td>
            <td>${activity.value || "-"}</td>
          </tr>
        `;
      });

      htmlContent += `</tbody></table>`;
    }

    htmlContent += `</div>`;
  }

  htmlContent += `
    <div style="position: absolute; bottom: 20px; left: 0; right: 0; width: 100%; display: flex; justify-content: space-around; padding-top: 10px; ">
      <div style="text-align: center; width: 30%;">
        <div style="margin-bottom: 5px;">(सही)</div>
        <div>वर्गाध्यापक</div>
      </div>
      <div style="text-align: center; width: 30%;">
        <div style="margin-bottom: 5px;">(सही)</div>
        <div>गुरुकुल प्रमुख</div>
      </div>
      <div style="text-align: center; width: 30%;">
        <div style="margin-bottom: 5px;">(सही)</div>
        <div>संचालिका</div>
      </div>
    </div>
  `;
  htmlContent += `
        </div>
      </div>
    </body>
    </html>
  `;

  return htmlContent;
};

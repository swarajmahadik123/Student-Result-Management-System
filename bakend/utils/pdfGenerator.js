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
    const html = generateHTML(studentData);

    await page.setContent(html, {
      waitUntil: ["load", "networkidle2"],
      timeout: 60000,
    });

    await page.evaluate(() => document.fonts.ready);
    await new Promise((resolve) => setTimeout(resolve, 1000));

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

    if (pdfBuffer.length < 5000) {
      console.warn("Warning: PDF buffer is suspiciously small");
    }

    return pdfBuffer;
  } catch (error) {
    console.error("PDF generation error:", error);
    throw error;
  } finally {
    if (browser) {
      await browser
        .close()
        .catch((e) => console.error("Error closing browser:", e));
    }
  }
};

const generateHTML = (studentData) => {
  const { name, standard, academicYear, result, division } = studentData;

  // Base64 encoded logos
  const rightLogo =
    "https://res.cloudinary.com/dloe8x9e4/image/upload/v1743612654/gurukul_logo_xtcv1x.jpg";
  const leftLogo =
    "https://res.cloudinary.com/dloe8x9e4/image/upload/v1743612669/hindavi_logo_1_zgn1rn.png";
  const watermarkLogo = rightLogo;

  const styles = `
    <style>
      @page {
        size: A4;
        margin: 0;
      }
      body {
        font-family: Arial, sans-serif;
        color: #333;
        margin: 0;
        padding: 0;
        background-color: #fff;
      }
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
            <img src="${leftLogo}" class="logo" alt="Left Logo">
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
            <h2 class="section-title">प्राणमयकोश - प्राणिक विकसन (दृश्य नसणारे  स्थूल रूप)</h2>
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
        <div class="section-title">छंदवर्ग</div>
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

  // Vidnyanmaya Kosha (Annual Result only)
  if (result?.vidnyanmayaKosha) {
    htmlContent += `
      <div class="section-container">
        <h2 class="section-title">विज्ञानमयकोश - बौद्धिक विकसन (कल्पना विकास /सूक्ष्म/चेतन/अमूर्त कोश )</h2>
        <div class="section-title">Annual Result</div>
    `;

    // Subjects (Annual Result Table)
 if (result.vidnyanmayaKosha.subjects?.length > 0) {
   htmlContent += `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 20px;">
            <!-- Subject and Grade Table -->
            <table class="annual-result-table" style="width: 50%; border-collapse: collapse; border: 1px solid black;">
                <thead>
                    <tr style="background-color: #f2f2f2;">
                        <th style="width: 70%; text-align: left; padding: 8px; border: 1px solid black;">Subject</th>
                        <th style="width: 30%; text-align: center; padding: 8px; border: 1px solid black;">Grade</th>
                    </tr>
                </thead>
                <tbody>`;

   result.vidnyanmayaKosha.subjects.forEach((subject) => {
     htmlContent += `
                    <tr>
                        <td style="text-align: left; padding: 8px; border: 1px solid black;">${
                          subject.label
                        }</td>
                        <td style="text-align: center; padding: 8px; border: 1px solid black; font-weight: bold;">${
                          subject.grade || "-"
                        }</td>
                    </tr>`;
   });

   htmlContent += `
                </tbody>
            </table>

            <!-- Grade Range Table - 4 column layout -->
            <table class="grade-range-table" style="width: 50%; border-collapse: collapse; border: 1px solid black;">
                <thead>
                    <tr style="background-color: #f2f2f2;">
                        <th colspan="4" style="text-align: center; padding: 8px; border: 1px solid black;">Grade Range</th>
                    </tr>
                    <tr style="background-color: #f2f2f2;">
                        <th style="width: 40%; text-align: left; padding: 8px; border: 1px solid black;">Marks</th>
                        <th style="width: 10%; text-align: center; padding: 8px; border: 1px solid black;">Grade</th>
                        <th style="width: 40%; text-align: left; padding: 8px; border: 1px solid black;">Marks</th>
                        <th style="width: 10%; text-align: center; padding: 8px; border: 1px solid black;">Grade</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="text-align: left; padding: 8px; border: 1px solid black;">91% to 100%</td>
                        <td style="text-align: center; padding: 8px; border: 1px solid black;">A-1</td>
                        <td style="text-align: left; padding: 8px; border: 1px solid black;">51% to 60%</td>
                        <td style="text-align: center; padding: 8px; border: 1px solid black;">C-1</td>
                    </tr>
                    <tr>
                        <td style="text-align: left; padding: 8px; border: 1px solid black;">81% to 90%</td>
                        <td style="text-align: center; padding: 8px; border: 1px solid black;">A-2</td>
                        <td style="text-align: left; padding: 8px; border: 1px solid black;">41% to 50%</td>
                        <td style="text-align: center; padding: 8px; border: 1px solid black;">C-2</td>
                    </tr>
                    <tr>
                        <td style="text-align: left; padding: 8px; border: 1px solid black;">71% to 80%</td>
                        <td style="text-align: center; padding: 8px; border: 1px solid black;">B-1</td>
                        <td style="text-align: left; padding: 8px; border: 1px solid black;">33% to 40%</td>
                        <td style="text-align: center; padding: 8px; border: 1px solid black;">D-1</td>
                    </tr>
                    <tr>
                        <td style="text-align: left; padding: 8px; border: 1px solid black;">61% to 70%</td>
                        <td style="text-align: center; padding: 8px; border: 1px solid black;">B-2</td>
                        <td style="text-align: left; padding: 8px; border: 1px solid black;">21% to 32%</td>
                        <td style="text-align: center; padding: 8px; border: 1px solid black;">E-1</td>
                    </tr>
                    <tr>
                        <td style="text-align: left; padding: 8px; border: 1px solid black;"></td>
                        <td style="text-align: center; padding: 8px; border: 1px solid black;"></td>
                        <td style="text-align: left; padding: 8px; border: 1px solid black;">20% & Below</td>
                        <td style="text-align: center; padding: 8px; border: 1px solid black;">E-2</td>
                    </tr>
                </tbody>
            </table>
        </div>`;
 }



    // Daily Observations
    if (result.vidnyanmayaKosha.dailyObservations?.length > 0) {
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
  }

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
        </div>
      </div>
    </body>
    </html>
  `;

  return htmlContent;
};

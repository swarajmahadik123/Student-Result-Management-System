import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { evaluationFields } from "./dummyData";

// Add Marathi font support
// This is a placeholder - in a real implementation, we would need to use a proper Marathi font
const addMarathiFont = (doc) => {
  // In a real implementation, we would add the Marathi font here
  // For example: doc.addFont('path/to/marathi-font.ttf', 'Marathi', 'normal');
  return doc;
};

export const generatePDF = (student, result) => {
  // Create a new PDF document
  const doc = new jsPDF();

  // Add Marathi font support
  addMarathiFont(doc);

  // Set font
  doc.setFont("helvetica");

  // Add school header
  doc.setFontSize(12);
  doc.text("श्रीनिधी एज्युकेशन सोसायटी", doc.internal.pageSize.width / 2, 15, {
    align: "center",
  });
  doc.text("हिंदवी पब्लिक स्कूल सातारा", doc.internal.pageSize.width / 2, 20, {
    align: "center",
  });
  doc.text("हिंदवी पंचकोशाधारित गुरुकूल", doc.internal.pageSize.width / 2, 25, {
    align: "center",
  });

  doc.setFontSize(14);
  doc.text("कोशानिहाय प्रगती २०२४-२५", doc.internal.pageSize.width / 2, 35, {
    align: "center",
  });

  // Add student details
  doc.setFontSize(12);
  doc.text(
    `विद्यार्थ्याचे नाव :- कु. ${student.name}`,
    doc.internal.pageSize.width / 2,
    45,
    { align: "center" }
  );
  doc.text(
    `इयत्ता : ${student.standard} सूची`,
    doc.internal.pageSize.width / 2,
    50,
    { align: "center" }
  );

  let yPos = 60;

  // Generate content for each kosh
  const koshes = [
    {
      id: "annamayakosh",
      title: "अन्नमयकोश - शारीरिक विकसन (संपूर्णाचे स्थूल रूप)",
    },
    {
      id: "pranamayakosh",
      title: "प्राणमयकोश - प्राणिक विकसन (दृश्य नसणारे स्थूल रूप)",
    },
    { id: "manomayakosh", title: "मनोमयकोश - मानसिक विकसन (प्राणाचे वेदन)" },
    {
      id: "navgyanmayakosh",
      title:
        "विज्ञानमयकोश - बौद्धिक विकसन (कल्पनेचा विकास/बुध्दी/विवेक/अमूर्त बोध)",
    },
    {
      id: "anandmayakosh",
      title: "आनंदमयकोश - आत्मिक विकसन (स्वत:च्या स्वरूपाचे भान/आत्मीय)",
    },
  ];

  for (const kosh of koshes) {
    // Check if we need a new page
    if (yPos > 240) {
      doc.addPage();
      yPos = 20;
    }

    // Add student name and class at the top of each page
    doc.setFontSize(10);
    doc.text(`विद्यार्थ्याचे नाव :- कु. ${student.name}`, 15, yPos);
    doc.text(`इयत्ता: ${student.standard} सूची`, 15, yPos + 5);
    yPos += 15;

    // Add kosh title
    doc.setFontSize(12);
    doc.text(kosh.title, 15, yPos);
    yPos += 10;

    // Get the data for this kosh
    const koshData = result[kosh.id] || {
      marks: {},
      checkboxes: {},
      dailyObservations: {},
      dailyObservationsStatus: {},
      annualActivities: {},
      remarks: {},
    };
    const koshFields = evaluationFields[kosh.id];

    // Special handling for प्राणमयकोश sections
    if (kosh.id === "pranamayakosh") {
      // Access PranamayakoshExtras properties
      const pranamayaData = koshData;

      // Handle छंदम् section with संगीत, संगणक, चित्रकला subsections
      doc.text("छंदम्", doc.internal.pageSize.width / 2, yPos, {
        align: "center",
      });
      yPos += 5;

      // Create tables for संगीत, संगणक, चित्रकला
      doc.autoTable({
        startY: yPos,
        head: [["संगीत", "संगणक", "चित्रकला"]],
        body: [
          [
            generateCheckedList(
              [
                "स्वराभ्यास",
                "अलंकार-१५पलटे",
                "ताल-त्रिताल",
                "ताल हातावर म्हणणे",
                "सरगम गीत",
                "राग-भूप",
                "देशभक्तीपर गीत (३)",
              ],
              pranamayaData.chhandam?.sangeet || {}
            ),
            generateCheckedList(
              ["WORD", "EXCEL", "POWER POINT", "HTML", "Q BASIC"],
              pranamayaData.chhandam?.sanganak || {}
            ),
            generateCheckedList(
              [
                "स्मरणचित्र",
                "स्थिरचित्र",
                "कोलाज",
                "रेखाचित्र (फळे,फुले,भाज्या)",
              ],
              pranamayaData.chhandam?.chitrakala || {}
            ),
          ],
        ],
        theme: "grid",
        headStyles: { fillColor: [220, 220, 220], textColor: [0, 0, 0] },
        margin: { left: 15, right: 15 },
        styles: { cellPadding: 5, fontSize: 8 },
        columnStyles: {
          0: { cellWidth: 60 },
          1: { cellWidth: 60 },
          2: { cellWidth: 60 },
        },
      });

      yPos = doc.lastAutoTable.finalY + 10;

      // Handle योगाभ्यास section
      doc.text("योगाभ्यास", 15, yPos);
      yPos += 5;

      // Create tables for २०आसनांचे प्रशिक्षण and प्राणायाम
      doc.autoTable({
        startY: yPos,
        head: [["२०आसनांचे प्रशिक्षण", "प्राणायाम"]],
        body: [
          [
            generateCheckedList(
              [
                "१. जानुकपालासन",
                "११. वज्रासन",
                "२. अर्धभुजंगासन",
                "१२. वृक्षासन",
                "३. सरलहस्त भुजंगासन",
                "१३. कोनासन",
                "४. पर्वतासन",
                "१४. वीरासन",
                "५. नमस्कारासन",
                "१५. त्रीकोणासन",
                "६. अधोमुखश्वानासन",
                "१६. वीरभद्रासन",
                "७. ताडासन",
                "१७. उत्कटासन",
                "८. तिर्यक ताडासन",
                "१८.उत्तानमंडूकासन",
                "९. शशांकासन",
                "१९.पश्चिमोत्तानासन",
                "१०.डंडूकासन",
                "२०. पतंगासन",
              ],
              pranamayaData.yogabhyas?.asanas || {}
            ),
            generateCheckedList(
              ["भ्रामरी", "नाडीशुध्दी", "शीतली", "सित्कारी"],
              pranamayaData.yogabhyas?.pranayam || {}
            ),
          ],
        ],
        theme: "grid",
        headStyles: { fillColor: [220, 220, 220], textColor: [0, 0, 0] },
        margin: { left: 15, right: 15 },
        styles: { cellPadding: 5, fontSize: 8 },
      });

      yPos = doc.lastAutoTable.finalY + 10;

      // Handle पाठांतर section
      doc.text("पाठांतर", 15, yPos);
      yPos += 5;

      // Create tables for संस्कृत पाठांतर and मराठी पाठांतर
      doc.autoTable({
        startY: yPos,
        head: [["संस्कृत पाठांतर", "मराठी पाठांतर"]],
        body: [
          [
            generateCheckedList(
              [
                "श्लोक - १२",
                "गणपती स्तोत्र",
                "भवानी अष्टक",
                "महालक्ष्मी अष्टक",
                "भीमरूपी",
                "गीता -१५ वा अध्याय",
              ],
              pranamayaData.pathantar?.sanskrit || {}
            ),
            generateCheckedList(
              [
                "पद्य - ५",
                "अभंग - ५",
                "मनाचे श्लोक - २०",
                "स्फूर्तीगीत - ५",
                "इतर श्लोक - १०",
              ],
              pranamayaData.pathantar?.marathi || {}
            ),
          ],
        ],
        theme: "grid",
        headStyles: { fillColor: [220, 220, 220], textColor: [0, 0, 0] },
        margin: { left: 15, right: 15 },
        styles: { cellPadding: 5, fontSize: 8 },
      });

      yPos = doc.lastAutoTable.finalY + 10;
    }

    // Add marks section if it exists
    if (koshFields.marks && koshFields.marks.length > 0) {
      // For navgyanmayakosh, create a special academic table
      if (kosh.id === "navgyanmayakosh") {
        // Create academic results table
        doc.autoTable({
          startY: yPos,
          head: [
            [
              "Subject",
              "Unit test 1",
              "Semester - I",
              "Unit test 2",
              "Terminal exam",
              "Grade",
            ],
          ],
          body: koshFields.marks.map((field) => {
            const marksValue = koshData.marks?.[field.id] || "";
            return [field.label, "", "", "", marksValue, ""];
          }),
          theme: "grid",
          headStyles: { fillColor: [220, 220, 220], textColor: [0, 0, 0] },
          margin: { left: 15, right: 15 },
          tableWidth: 180,
        });
      } else {
        // For other koshes, add regular marks table
        doc.autoTable({
          startY: yPos,
          head: [["विषय", "गुण"]],
          body: koshFields.marks.map((field) => [
            field.label,
            koshData.marks?.[field.id] || "-",
          ]),
          theme: "grid",
          headStyles: { fillColor: [220, 220, 220], textColor: [0, 0, 0] },
          margin: { left: 15, right: 15 },
          tableWidth: 180,
        });
      }

      yPos = doc.lastAutoTable.finalY + 10;
    }

    // Add checkbox remarks if they exist
    if (koshFields.checkboxes && koshFields.checkboxes.length > 0) {
      doc.setFontSize(12);
      doc.text("मुल्यांकन", 15, yPos);
      yPos += 5;

      doc.autoTable({
        startY: yPos,
        head: [["मुल्यांकन", "निवड"]],
        body: koshFields.checkboxes.map((checkbox) => [
          checkbox.label,
          koshData.checkboxes?.[checkbox.id] || "-",
        ]),
        theme: "grid",
        headStyles: { fillColor: [220, 220, 220], textColor: [0, 0, 0] },
        margin: { left: 15, right: 15 },
      });

      yPos = doc.lastAutoTable.finalY + 10;
    }

    // Add daily observations if they exist
    if (
      koshFields.dailyObservations &&
      koshFields.dailyObservations.length > 0
    ) {
      doc.setFontSize(12);
      doc.text("दैनंदिन निरीक्षण", 15, yPos);
      yPos += 5;

      doc.autoTable({
        startY: yPos,
        head: [["निरीक्षण", "टिप्पणी", "मूल्यांकन"]],
        body: koshFields.dailyObservations.map((obs) => [
          obs.label,
          koshData.dailyObservations?.[obs.id] || obs.defaultValue || "-",
          koshData.dailyObservationsStatus?.[obs.id] || "-",
        ]),
        theme: "grid",
        headStyles: { fillColor: [220, 220, 220], textColor: [0, 0, 0] },
        margin: { left: 15, right: 15 },
      });

      yPos = doc.lastAutoTable.finalY + 10;
    }

    // Add annual activities if they exist
    if (koshFields.annualActivities && koshFields.annualActivities.length > 0) {
      doc.setFontSize(12);
      doc.text("वार्षिक उपक्रम २०२४-२५", 15, yPos);
      yPos += 5;

      doc.autoTable({
        startY: yPos,
        head: [["उपक्रम", "वर्णन"]],
        body: koshFields.annualActivities.map((act) => [
          act.label,
          koshData.annualActivities?.[act.id] || act.defaultValue || "-",
        ]),
        theme: "grid",
        headStyles: { fillColor: [220, 220, 220], textColor: [0, 0, 0] },
        margin: { left: 15, right: 15 },
      });

      yPos = doc.lastAutoTable.finalY + 10;
    }

    // Add remarks if they exist
    if (koshFields.remarks && koshFields.remarks.length > 0) {
      doc.setFontSize(12);
      doc.text("शिक्षकांचे अभिप्राय", 15, yPos);
      yPos += 5;

      doc.autoTable({
        startY: yPos,
        head: [["अभिप्राय", "विवरण"]],
        body: koshFields.remarks.map((remark) => [
          remark.label,
          koshData.remarks?.[remark.id] || "-",
        ]),
        theme: "grid",
        headStyles: { fillColor: [220, 220, 220], textColor: [0, 0, 0] },
        margin: { left: 15, right: 15 },
      });

      yPos = doc.lastAutoTable.finalY + 10;
    }

    // Check if we need a new page for the next kosh
    if (yPos > 240) {
      doc.addPage();
      yPos = 20;
    } else {
      yPos += 10;
    }
  }

  // Add signature section
  yPos = Math.min(yPos, 250);
  doc.setFontSize(12);
  doc.text("शिक्षकाची स्वाक्षरी", 40, yPos);
  doc.text(
    "मुख्याध्यापकाची स्वाक्षरी",
    doc.internal.pageSize.width - 40,
    yPos,
    { align: "right" }
  );

  // Add footer
  doc.setFontSize(10);
  doc.text(
    "मराठी परिणाम व्यवस्थापन प्रणाली © 2024",
    doc.internal.pageSize.width / 2,
    doc.internal.pageSize.height - 10,
    { align: "center" }
  );

  // Save the PDF
  doc.save(`${student.name}_${student.standard}_result.pdf`);
};

// Helper function to generate a list with checkmarks
function generateCheckedList(items, checkedItems) {
  return items
    .map((item) => {
      const isChecked = checkedItems[item] === true;
      return `${isChecked ? "✓ " : "☐ "}${item}`;
    })
    .join("\n");
}

export default generatePDF;

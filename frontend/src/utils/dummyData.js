// Student data structure

// Group students by standard
export const getStudentsByStandard = () => {
  return dummyStudents.reduce((acc, student) => {
    if (!acc[student.standard]) {
      acc[student.standard] = [];
    }
    acc[student.standard].push(student);
    return acc;
  }, {});
};

// Default dynamic activities
export const defaultDynamicActivities = {
  yogabhyas: {
    asanas: [
      { id: "janu", label: "१. जानुकपालासन" },
      { id: "ardha", label: "२. अर्धभुजंगासन" },
      // ... rest of the asanas
    ],
    pranayam: [
      { id: "bhramari", label: "भ्रामरी" },
      // ... rest of the pranayam
    ],
  },
  pathantar: {
    sanskrit: [
      { id: "shloka12", label: "श्लोक - १२" },
      // ... rest of sanskrit items
    ],
    marathi: [
      { id: "padya5", label: "पद्य - ५" },
      // ... rest of marathi items
    ],
  },
};

// Evaluation fields
export const evaluationFields = {
  annamayakosh: {
    title: "अन्नमयकोश",
    marks: [
      { id: "weight", label: "वजन (कि.ग्रॅम)" },
      // ... rest of marks
    ],
    checkboxes: [
      {
        id: "physical_fitness",
        label: "शारीरिक क्षमता",
        options: ["उत्तम", "चांगले", "सुधारणे आवश्यक"],
      },
    ],
    // ... rest of the structure
  },
  // ... other koshes (pranamayakosh, manomayakosh, etc.)
};

// Note: The actual implementation should include all the fields from your original TypeScript interface
// I've shown a partial structure here for brevity
// dummydata.js
export const dummyData = {
  AnnamayaKosha: {
    physicalMeasurements: [
      { id: "weight", name: "वजन (कि.ग्रॅम)" },
      { id: "height", name: "उंची (सेमी.)" },
      { id: "chest", name: "छाती विस्तार (सेमी.)" },
      { id: "broad", name: "स्टँडिंग ब्रॉड (मी.)" },
      { id: "jump", name: "सतत उड्या (मी.)" },
      { id: "run", name: "रे मिनिट धावण (कि.मी.)" },
    ],
    measurementValues: {
      weight: { session1: "", session2: "" },
      height: { session1: "", session2: "" },
      chest: { session1: "", session2: "" },
      broad: { session1: "", session2: "" },
      jump: { session1: "", session2: "" },
      run: { session1: "", session2: "" },
    },
    dailyObservations: [
      {
        id: "cleanliness",
        category: "स्वच्छता",
        options: [
          "वैयक्तिक स्वच्छतेकडे लक्ष देते.",
          "वैयक्तिक स्वच्छतेकडे लक्ष देतो.",
          "सूचना द्यावी लागते.",
          "स्वच्छतेमध्ये सुधारणा आवश्यक आहे.",
        ],
        selectedOption: "वैयक्तिक स्वच्छतेकडे लक्ष देते.",
      },
      {
        id: "diet",
        category: "आहार",
        options: [
          "ऋतुमानानुसार सकस व संतुलित आहार घेते.",
          "ऋतुमानानुसार सकस व संतुलित आहार घेतो.",
          "सांस्कृतिक आहारापेक्षा वेगळा आहार आणतो.",
          "सांस्कृतिक आहारापेक्षा वेगळा आहार आणते.",
          "बाहेरचे पदार्थ आणतो.",
          "बाहेरचे पदार्थ आणते.",
        ],
        selectedOption: "ऋतुमानानुसार सकस व संतुलित आहार घेते.",
      },
      {
        id: "health",
        category: "आरोग्य",
        options: [
          "निरोगी आहे.",
          "आरोग्यात सुधारणा आवश्यक आहे.",
          "आरोग्याकडे लक्ष देणे गरजेचे आहे.",
        ],
        selectedOption: "निरोगी आहे.",
      },
      {
        id: "schedule",
        category: "वेळापत्रक",
        options: [
          "दैनंदिन वेळापत्रक काटेकोरपणे पाळते.",
          "दैनंदिन वेळापत्रक काटेकोरपणे पाळतो.",
          "सूचना द्यावी लागते.",
          "दैनंदिन वेळापत्रक पाळणे गरजेचे आहे.",
        ],
        selectedOption: "दैनंदिन वेळापत्रक काटेकोरपणे पाळते.",
      },
      {
        id: "yoga",
        category: "योगाभ्यास",
        options: [
          "५ मिनिटे ध्यान करते. ध्यानातील एकाग्रतेत सुधारणा आवश्यक आहे.",
          "५ मिनिटे ध्यान करतो.",
          "११ ओंकारांचा अभ्यास करते. ओंकार ५ अंक मोजून करणे आवश्यक आहे.",
          "११ ओंकारांचा अभ्यास करतो.",
          "२५ सूर्यनमस्कार मंत्रासहित घालते. संख्या अचूक ठेवणे आवश्यक आहे.",
          "२५ सूर्यनमस्कार मंत्रासहित घालतो.",
        ],
        selectedOption:
          "५ मिनिटे ध्यान करते. ध्यानातील एकाग्रतेत सुधारणा आवश्यक आहे.",
      },
      {
        id: "fitness",
        category: "सुदृढता",
        options: [
          "२५ जोर, ५० बैठका व ५० सिट-अप्स नियमीत करते.",
          "२५ जोर, ५० बैठका व ५० सिट-अप्स नियमीत करतो.",
          "मध्यम विश्रांती घेतो.",
          "मध्यम विश्रांती घेते.",
          "सुदृढतेत सुधारणा आवश्यक आहे.",
        ],
        selectedOption: "२५ जोर, ५० बैठका व ५० सिट-अप्स नियमीत करते.",
      },
      {
        id: "sports",
        category: "मैदानी खेळ",
        options: [
          "दीड ते दोन तास शारीरिक श्रमाचे व चपळता निर्माण करणारे मैदानी खेळ मनापासून खेळते.",
          "दीड ते दोन तास शारीरिक श्रमाचे व चपळता निर्माण करणारे मैदानी खेळ मनापासून खेळतो.",
          "खेळामध्ये मनापासून सहभाग घेणे आवश्यक आहे.",
        ],
        selectedOption:
          "दीड ते दोन तास शारीरिक श्रमाचे व चपळता निर्माण करणारे मैदानी खेळ मनापासून खेळते.",
      },
      {
        id: "relaxation",
        category: "विश्रांती",
        options: [
          "रात्री ठरलेल्या वेळेत झोपून आठ तासांची विश्रांती घेते.",
          "रात्री ठरलेल्या वेळेत झोपून आठ तासांची विश्रांती घेतो.",
          "विश्रांती अपूर्ण असते.",
          "आठ तासांची विश्रांती घेणे आवश्यक आहे.",
        ],
        selectedOption:
          "रात्री ठरलेल्या वेळेत झोपून आठ तासांची विश्रांती घेते.",
      },
    ],
    annualActivities: [
      {
        id: "youth_day",
        name: "युवा दिन",
        defaultValue: "स्वामी विवेकानंद जयंती निमित्त १००० सूर्यनमस्कार घातले.",
      },
      {
        id: "fort_visit",
        name: "दुर्गभ्रमंती",
        defaultValue: "किल्ले अजिंक्यतारा न दमता चढली व उतरली.",
      },
      {
        id: "cycle_trip",
        name: "सायकल सफर",
        defaultValue:
          "स्वराज्यातून २१ कि.मी. सायकल सफर यशस्वीरीत्या पूर्ण केली.",
      },
      {
        id: "sadhakatla",
        name: "साधकतल",
        defaultValue: "साधकतल शिबिरात सहभागी झाली.",
      },
    ],
  },

  PranamayaKosha: {
    chhandavarga: {
      music: [
        { id: "swar", name: "१.स्वराभ्यास" },
        { id: "alankar", name: "२.अलंकार-१५पलटे" },
        { id: "taal", name: "३.ताल-त्रिताल" },
        { id: "taalHands", name: "४.ताल हातावर म्हणणे." },
        { id: "sargam", name: "५.सरगम गीत" },
        { id: "raag", name: "६.राग-भूप," },
        { id: "patriotic", name: "७.देशभक्तीपर गीत (३)" },
      ],
      computer: [
        { id: "word", name: "1.WORD" },
        { id: "excel", name: "2.EXCEL" },
        { id: "powerpoint", name: "3. POWER POINT" },
        { id: "html", name: "4. HTML" },
        { id: "qbasic", name: "5. Q BASIC" },
      ],
      art: [
        { id: "memory", name: "१.स्मरणचित्र" },
        { id: "still", name: "२.स्थिरचित्र" },
        { id: "collage", name: "३.कोलाज" },
        { id: "line", name: "४.रेखाचित्र" },
        { id: "nature", name: "(फळे,फुले,भाज्या)" },
      ],
    },
    yogabhyas: {
      asanas: [
        { id: "janu", name: "१. जानुकपालासन" },
        { id: "ardha", name: "२. अर्धभुजंगासन" },
        { id: "saral", name: "३. सरलहस्त भुजंगासन" },
        { id: "parvat", name: "४. पर्वतासन" },
        { id: "namaskar", name: "५. नमस्कारासन" },
        { id: "adhomukh", name: "६. अधोमुखश्वानासन" },
        { id: "tada", name: "७. ताडासन" },
        { id: "tiryak", name: "८. तिर्यक ताडासन" },
        { id: "shashank", name: "९. शशांकासन" },
        { id: "danda", name: "१०.डंडासन" },
        { id: "vajra", name: "११. वज्रासन" },
        { id: "vriksha", name: "१२. वृक्षासन" },
        { id: "kona", name: "१३. कोनासन" },
        { id: "vira", name: "१४. वीरासन" },
        { id: "trikona", name: "१५. त्रीकोणासन" },
        { id: "virabhadra", name: "१६. वीरभद्रासन" },
        { id: "utkata", name: "१७. उत्कटासन" },
        { id: "uttana", name: "१८.उत्तानमंडूकासन" },
        { id: "paschimottana", name: "१९.पश्चिमोत्तानासन" },
        { id: "patanga", name: "२०. पतंगासन" },
      ],
      pranayam: [
        { id: "bhramari", name: "१. भ्रामरी" },
        { id: "nadishudhi", name: "२.नाडीशुद्धी" },
        { id: "shitali", name: "३. शितली" },
        { id: "sitkari", name: "४.सित्कारी" },
      ],
    },
    pathantar: {
      sanskrit: [
        { id: "shloka", name: "श्लोक - १२" },
        { id: "ganpati", name: "गणपती स्तोत्र" },
        { id: "bhavani", name: "भवानी अष्टक" },
        { id: "mahalaxmi", name: "महालक्ष्मी अष्टक" },
        { id: "bhimrupi", name: "भीमरूपी" },
        { id: "gita", name: "गीता -१५ वाअध्याय" },
      ],
      marathi: [
        { id: "padya", name: "पद्य - ५" },
        { id: "abhang", name: "अभंग - ५" },
        { id: "manache", name: "मनाचे श्लोक - २०" },
        { id: "stotra", name: "स्फूर्तीगीत - ५" },
        { id: "itara", name: "इतर श्लोक - १०" },
      ],
    },
    dailyObservations: [
      {
        id: "yogashikvale",
        category: "योगासने",
        options: [
          "शिकवलेली आसने व्यवस्थित करते.",
          "शिकवलेली आसने व्यवस्थित करतो.",
          "आसन स्थिती योग्य असणे आवश्यक आहे.",
        ],
      },
      {
        id: "pranayamshikvale",
        category: "प्राणायाम",
        options: [
          "शिकवलेले प्राणायाम लयबद्ध श्वसनात करते.",
          "शिकवलेले प्राणायाम लयबद्ध श्वसनात करतो.",
          "सुचनेनुसार श्वसन करणे आवश्यक आहे.",
        ],
      },
      {
        id: "pathantar",
        category: "पाठांतर",
        options: [
          "न अडखळता श्लोक, स्तोत्र पठण करते.",
          "न अडखळता श्लोक, स्तोत्र पठण करतो.",
          "न अडखळता व दिलेल्या वेळेत पठण करणे आवश्यक आहे.",
        ],
      },
      {
        id: "sambhashan",
        category: "सभाधीटपणा",
        options: [
          "कथाकथन, वक्तृत्व आत्मविश्वासाने करते.",
          "कथाकथन, वक्तृत्व आत्मविश्वासाने करतो.",
          "वक्तृत्व आत्मविश्वासाने व नियोजनपूर्वक करणे आवश्यक आहे.",
        ],
      },
      {
        id: "music",
        category: "छंदवर्ग - संगीत",
        options: [
          "लयबद्ध आरोह अवरोहात गाते.",
          "लयबद्ध आरोह अवरोहात गातो.",
          "तालासुरात गाणे आवश्यक आहे.",
        ],
      },
      {
        id: "art",
        category: "छंदवर्ग - चित्रकला",
        options: [
          "चांगली चित्रे काढण्याचा प्रयत्न करते.",
          "चांगली चित्रे काढण्याचा प्रयत्न करतो.",
          "प्रमाणबद्ध चित्रे काढणे व रंगवणे आवश्यक आहे.",
        ],
      },
      {
        id: "computer",
        category: "छंदवर्ग - संगणक",
        options: [
          "Presentation व programming चांगले करते.",
          "Presentation व programming चांगले करतो.",
          "Practical लक्षपूर्वक समजून घेणे व करणे आवश्यक आहे.",
        ],
      },
      {
        id: "sports",
        category: "मैदानी खेळ व संचलन",
        options: [
          "मैदानी खेळातील आवश्यक कौशल्ये आत्मसात केलेली आहेत व लयबद्ध संचलन करते.",
          "मैदानी खेळातील आवश्यक कौशल्ये आत्मसात केलेली आहेत व लयबद्ध संचलन करतो.",
          "नेतृत्वगुण, संघभावना उत्तम आहे.",
          "नेतृत्वगुण, संघभावनेत सुधारणा आहे.",
          "नेतृत्वगुण, संघभावनेत सुधारणा आवश्यक आहे.",
          "खेळातील कौशल्य प्रयत्नपूर्वक शिकणे व लयबद्ध संचलन करणे आवश्यक आहे.",
        ],
      },
    ],
    annualActivities: [
      {
        id: "ashadhi",
        name: "आषाढी एकादशी",
        description: "अभंगाचे निरुपण व गायन उत्तमप्रकारे केले.",
      },
      {
        id: "nagpanchami",
        name: "नागपंचमी",
        description: "मातीपासून सुबक नाग बनवला.",
      },
      {
        id: "shilpworkshop",
        name: "घुडशिल्प कार्यशाळा",
        description: "आकर्षक छोटी शिल्पे व खेळणी उत्तमप्रकारे बनवली.",
      },
      {
        id: "navkri",
        name: "नवक्री उपक्रम",
        description: "पंक्त्या स्वतः रंगवून त्याची ८ पालकटे विकली.",
      },
      {
        id: "mahasangam",
        name: "महासंगम (घोष)",
        description: "वंशी वादन उत्तमप्रकारे करते.",
      },
      {
        id: "snehsameli",
        name: "स्नेहसंमेलन",
        description: "गायन आणि नृत्याचे उत्तम सादरीकरण केले.",
      },
    ],
  },

  VidnyanmayaKosha: {
    marks: [
      { id: "marathi", label: "मराठी" },
      { id: "english", label: "इंग्रजी" },
      { id: "hindi", label: "हिंदी" },
      { id: "science", label: "विज्ञान" },
      { id: "maths", label: "गणित" },
      { id: "social_science", label: "सामाजिक शास्त्रे" },
    ],
    marksData: {
      marathi: {
        unit1: { total: "", obtained: "" },
        semester1: { total: "", obtained: "" },
        unit2: { total: "", obtained: "" },
        terminal: { total: "", obtained: "" },
        grade: "",
      },
      english: {
        unit1: { total: "", obtained: "" },
        semester1: { total: "", obtained: "" },
        unit2: { total: "", obtained: "" },
        terminal: { total: "", obtained: "" },
        grade: "",
      },
      hindi: {
        unit1: { total: "", obtained: "" },
        semester1: { total: "", obtained: "" },
        unit2: { total: "", obtained: "" },
        terminal: { total: "", obtained: "" },
        grade: "",
      },
      science: {
        unit1: { total: "", obtained: "" },
        semester1: { total: "", obtained: "" },
        unit2: { total: "", obtained: "" },
        terminal: { total: "", obtained: "" },
        grade: "",
      },
      maths: {
        unit1: { total: "", obtained: "" },
        semester1: { total: "", obtained: "" },
        unit2: { total: "", obtained: "" },
        terminal: { total: "", obtained: "" },
        grade: "",
      },
      social_science: {
        unit1: { total: "", obtained: "" },
        semester1: { total: "", obtained: "" },
        unit2: { total: "", obtained: "" },
        terminal: { total: "", obtained: "" },
        grade: "",
      },
    },
    maunAbhyasActivities: [
      { id: "1", name: "१. माझे कुटुंब", completed: false },
      { id: "2", name: "२. माझे गुरुकुल", completed: false },
      { id: "3", name: "३. अनुबंध लेखन - आण्णाचे एक्कावीस", completed: false },
      { id: "4", name: "४. रक्षा बंधन", completed: false },
      { id: "5", name: "५. गण्याचे लग्न", completed: false },
      { id: "6", name: "६. तुळशी विवाह", completed: false },
      { id: "7", name: "७. भाविक विक्री", completed: false },
      { id: "8", name: "८. नाट्यमंच परिचय", completed: false },
    ],
    characterStudy: [
      { id: "family", label: "१. माझे कुटुंब" },
      { id: "gurukul", label: "२. माझे गुरुकुल" },
      { id: "village", label: "३. माझे गाव" },
      { id: "field_visit", label: "८. क्षेत्रभेट" },
      { id: "fort_visit", label: "९. दुर्गभ्रमंती" },
      { id: "cycle_trip", label: "१०. सायकल सफर" },
      { id: "fort_run", label: "११. दुर्ग दौड" },
      { id: "friendship", label: "१२. स्नेह संमेलन" },
      { id: "archery", label: "१४. धनुर्विद्या" },
    ],
    experienceWriting: [
      { id: "ashadi", label: "१. आषाढी एकादशी" },
      { id: "rakhi", label: "२. रक्षाबंधन" },
      { id: "dahi_hundi", label: "३. दही हुंडी" },
      { id: "ganesh", label: "४. गणेशोत्सव" },
      { id: "nagpanchami", label: "५. नागपंचमी" },
      { id: "kite", label: "६. पतंग उत्सव" },
      { id: "motherland", label: "७. मातृभूमी परिचय" },
    ],
    readingPractice: [
      { id: "1857", label: "१. १८५७ चे स्वातंत्र्य समर" },
      { id: "pundlik", label: "२. डॉ. पुंडलिक खानखोजे" },
      { id: "tukaram", label: "३. संत तुकाराम" },
      { id: "gazi", label: "४. The Ghazi Attack" },
      { id: "pawankhind", label: "५. पावनखिंड" },
      { id: "lakshya", label: "६. लक्ष्य" },
      { id: "chandu", label: "७. Chandu Champion" },
      { id: "chhava", label: "८. छावा" },
    ],
    dailyObservations: [
      {
        id: "attentiveness",
        category: "एकाग्रता",
        options: [
          "शिकवत असताना एकाग्र असते",
          "शिकवत असताना एकाग्र असतो",
          "एकाग्रतेत सुधारणा आवश्यक आहे",
        ],
        selectedOption: "शिकवत असताना एकाग्र असते",
      },
      {
        id: "observation",
        category: "निरीक्षण",
        options: [
          "निरीक्षणातून समजून घेण्याचा प्रयत्न करते",
          "निरीक्षणातून समजून घेण्याचा प्रयत्न करतो",
          "लक्षपूर्वक निरीक्षण आवश्यक आहे",
        ],
        selectedOption: "निरीक्षणातून समजून घेण्याचा प्रयत्न करते",
      },
      {
        id: "perception",
        category: "आकलन",
        options: [
          "शिकवलेले लगेच समजते",
          "समजण्यास वेळ लागतो",
          "पुन्हा सांगावे लागते",
        ],
        selectedOption: "शिकवलेले लगेच समजते",
      },
      {
        id: "memory",
        category: "स्मरण",
        options: [
          "शिकवलेल्या सर्व भाषांच्या कविता व २ ते ३० पाढे पाठ आहेत",
          "कविता व पाढे पूर्ण पाठ करणे आवश्यक आहे",
          "अर्थ समजून घेऊन पाठांतर करणे आवश्यक आहे",
        ],
        selectedOption:
          "शिकवलेल्या सर्व भाषांच्या कविता व २ ते ३० पाढे पाठ आहेत",
      },
      {
        id: "intelligence",
        category: "तर्कशक्ती",
        options: [
          "नवीन संकल्पना व गणिते तर्कशक्तीने उत्तम समजून घेते",
          "नवीन संकल्पना व गणिते तर्कशक्तीने उत्तम समजून घेतो",
          "मूळ संकल्पनांची माहिती व तर्कशक्तीचा पूर्ण वापर आवश्यक आहे",
        ],
        selectedOption: "नवीन संकल्पना व गणिते तर्कशक्तीने उत्तम समजून घेते",
      },
      {
        id: "writing",
        category: "लेखन व मांडणी",
        options: [
          "उत्तरांचे लेखन व मांडणी चांगली करते",
          "उत्तरांचे लेखन व मांडणी चांगली करतो",
          "लेखन व मांडणीत सूसुत्रता आवश्यक आहे",
        ],
        selectedOption: "उत्तरांचे लेखन व मांडणी चांगली करते",
      },
      {
        id: "application",
        category: "उपयोजन",
        options: [
          "शिकलेल्या सूत्रांचे छान उपयोजन करते",
          "शिकलेल्या सूत्रांचे छान उपयोजन करतो",
          "सूत्र लक्षपूर्वक शिकणे आवश्यक आहे",
        ],
        selectedOption: "शिकलेल्या सूत्रांचे छान उपयोजन करते",
      },
      {
        id: "self_study",
        category: "स्वयंअध्ययन",
        options: [
          "सर्वेक्षण: सर्वेक्षण लक्षपूर्वक करते\nपूर्ववाचन: समजून घेऊन करण्याचा प्रयत्न करते\nउत्तरवाचन: मनापासून करते\nस्वाध्याय: वेळेत पूर्ण करते",
          "सर्वेक्षण: सर्वेक्षण लक्षपूर्वक करतो\nपूर्ववाचन: समजून घेऊन करण्याचा प्रयत्न करतो\nउत्तरवाचन: मनापासून करतो\nस्वाध्याय: वेळेत पूर्ण करतो",
          "पूर्ववाचन लक्षपूर्वक करणे आवश्यक आहे\nअर्थ समजून उत्तरवाचन करणे आवश्यक आहे\nसूचना द्यावी लागते",
        ],
        selectedOption:
          "सर्वेक्षण: सर्वेक्षण लक्षपूर्वक करते\nपूर्ववाचन: समजून घेऊन करण्याचा प्रयत्न करते\nउत्तरवाचन: मनापासून करते\nस्वाध्याय: वेळेत पूर्ण करते",
      },
    ],
    annualActivities: [
      {
        id: "atal_tinkering",
        name: "Atal Tinkering (Robotics)",
        defaultValue:
          "Sanitary Pad vending Machine हा project तिने स्वतः programming व Model बनवून उत्तम प्रकारे पूर्ण केला.",
      },
      {
        id: "horticulture",
        name: "Horticulture",
        defaultValue: "ठेवीन फिरून शरीराचे निरीक्षण केले.",
      },
      {
        id: "soil_testing",
        name: "माती परीक्षण",
        defaultValue:
          "तीन प्रकारच्या माती परीक्षणातून रासायनिक बाबींचे मूल्यमापन महत्त्व जाणे.",
      },
      {
        id: "waste_management",
        name: "वेस्टमेट",
        defaultValue:
          "या प्रदेशे ची पावसन, कचऱ्याचे व्यवस्थ (विघटन) व यू टयूबवर वाचवा याची माहिती घेतली.",
      },
      {
        id: "student_project",
        name: "वैयक्तिक प्रकल्प (विद्यार्थी निष्ठ)",
        defaultValue:
          "Botany व Post Office ह्या दोन्ही प्रणालीची माहिती मिळवून त्याचे वर्गीकरण केले.",
      },
    ],
    maunAbhyas: [
      {
        id: "sloka",
        category: "मौनाभ्यास",
        defaultValue:
          "मनाचे श्लोक मनाचे श्लोक अिायसलहत समजून घेतल् यामुळे वागण्यात बदल झाला आहे.",
      },
      {
        id: "self_control",
        category: "",
        defaultValue:
          "मौिाभ्यास स्वतः लवचार करून व संवेदनलशलतेने व्यि होत आहे.",
      },
      {
        id: "respect",
        category: "",
        defaultValue:
          "घरातील वतिणूक मोठ्ांलवर्यी आदरभाव ठे वते आलण जबाबदारीने वागते.",
      },
      {
        id: "culture",
        category: "",
        defaultValue:
          "सिंस्कार नम्रपणे बोलते, इतरांना मदत करते, भारतीय संस्कृ ती नुसार सवय सण साजरे करते.",
      },
    ],
    varshikUpakram: [
      {
        id: "motherland",
        category: "वानषिक उपक्रम २०२४-२५",
        defaultValue:
          "मातृभूमी पररचय मातृभूमी पररचय लशलबरात पूणय मनाने सहभागी झाली.",
      },
      {
        id: "sajjangad",
        category: "",
        defaultValue: "सज्जनगडावरील लदनचयेचा अनुभव घेतला.",
      },
      {
        id: "probodhini",
        category: "",
        defaultValue: "प्रबोलर्नीतील लवद्यालियनींशी जमवून घेतले.",
      },
      {
        id: "reading",
        category: "प्रकट वाचि",
        defaultValue: "महापुरुर्ांलवर्यी आत्मीयता लनमायण झाली.",
      },
      {
        id: "rashtriya",
        category: "",
        defaultValue:
          "रस ग्र ण देव, देश आलण र्मय याबद्दल आदरभावना लनमायण झाली.",
      },
    ],
  },

  AnandmayaKosha: {
    dailyObservations: [
      {
        id: "devotion",
        category: "उपासना",
        options: [
          "भक्तीयुक्त मनाने उपासना करते.",
          "उपासनेत मन लावते पण पूर्ण लक्ष नसते.",
          "उपासनेत सुधारणे आवश्यक आहे.",
        ],
        selectedOption: "भक्तीयुक्त मनाने उपासना करते.",
      },
      {
        id: "cleanliness_environment",
        category: "परिसरी स्वच्छता",
        options: [
          "वर्गाची स्वच्छता आनंदाने करते.",
          "स्वच्छतेची काळजी घेते पण नियमित नाही.",
          "स्वच्छतेबाबत अधिक जागरूकता आवश्यक आहे.",
        ],
        selectedOption: "वर्गाची स्वच्छता आनंदाने करते.",
      },
      {
        id: "sharing",
        category: "वेळ",
        options: [
          "वेळ मद्दता पुरेपुर आनंद घेते.",
          "कधीकधी वेळेचे व्यवस्थापन करते.",
          "वेळेचे व्यवस्थापन सुधारणे आवश्यक आहे.",
        ],
        selectedOption: "वेळ मद्दता पुरेपुर आनंद घेते.",
      },
      {
        id: "cooperation",
        category: "सहकार्य",
        options: [
          "इतरांना आनंदाने मदत करते.",
          "मदत करते पण कधीकधीच.",
          "सहकार्य भावना विकसित करणे आवश्यक आहे.",
        ],
        selectedOption: "इतरांना आनंदाने मदत करते.",
      },
    ],
    annualActivities: [
      {
        id: "gurukul_activities",
        name: "गुरुकुलातील उपक्रम व प्रकल्प",
        defaultValue:
          "गुरुकुलातील शैक्षणिक व इतर उपक्रमात व कल्पनात आनंदाने सहभागी होते व आनंद घेते.",
      },
      {
        id: "joy_creation",
        name: "आनंदात प्रसार करणे",
        defaultValue: "आनंदात प्रसारातानी उत्साहात सहभाग घेतला.",
      },
      {
        id: "gratitude_chart",
        name: "कृतज्ञतापूर्ण सूची बनवणे",
        defaultValue: "स्वतः फूल वनवून गणितीसाठी आरम केली.",
      },
      {
        id: "helping_others",
        name: "मेहेती काळजी /रोपांची काळजी",
        defaultValue:
          "स्वयंस्फूर्तीने रोपांची काळजी आणि मेढी काळजी आनंद घेतला.",
      },
      {
        id: "cleanliness_drive",
        name: "स्वच्छतेकरिता",
        defaultValue: "वर्गाचे स्वच्छ व सुंदरता स्वच्छ याना आनंद घेते.",
      },
    ],
  },
  ManomayaKosha: {
    dailyObservations: [
      {
        id: "mind_verses",
        category: "मनाचे श्लोक",
        options: [
          "मनाचे श्लोक अर्थासहित समजून घेतल्यामुळे वागण्यात बदल झाला आहे",
          "मनाचे श्लोक समजून घेणे व पाठ करणे आवश्यक आहे",
        ],
      },
      {
        id: "silence_practice",
        category: "मौनाभ्यास",
        options: [
          "स्वतः विचार करून व संवेदनशिलतेने व्यक्त होत आहे",
          "मौनाभ्यास विचारपूर्वक व मनपासून लिहिणे आवश्यक आहे",
        ],
      },
      {
        id: "home_behavior",
        category: "घरातील वर्तणूक",
        options: [
          "मोठ्यांविषयी आदरभाव ठेवते आणि जबाबदारीने वागते",
          "मोठ्यांविषयी आदरभाव ठेवतो आणि जबाबदारीने वागतो",
          "वर्तणुकीत सुधारणा आवश्यक आहे",
        ],
      },
      {
        id: "values",
        category: "संस्कार",
        options: [
          "नम्रपणे बोलते, इतरांना मदत करते, भारतीय संस्कृती नुसार सर्व सण साजरे करते",
          "नम्रपणे बोलतो, इतरांना मदत करतो, भारतीय संस्कृती नुसार सर्व सण साजरे करतो",
          "नम्रता, सहकार्य भावना आवश्यक आहे",
        ],
      },
      {
        id: "mental_health",
        category: "मानसिक आरोग्य",
        options: ["उत्कृष्ट", "चांगले", "सुधारणा आवश्यक"],
      },
      {
        id: "concentration",
        category: "एकाग्रता",
        options: ["उच्च", "मध्यम", "निम्न"],
      },
      {
        id: "discipline",
        category: "शिस्त",
        options: ["उत्कृष्ट", "चांगले", "सुधारणा आवश्यक"],
      },
      {
        id: "social_skills",
        category: "सामाजिक कौशल्य",
        options: ["उत्कृष्ट", "चांगले", "सुधारणा आवश्यक"],
      },
      {
        id: "emotional_stability",
        category: "भावनिक स्थिरता",
        options: ["उच्च", "मध्यम", "निम्न"],
      },
    ],
    annualActivities: [
      {
        id: "mental_health_workshop",
        name: "मानसिक आरोग्य कार्यशाळा",
        description: "कार्यशाळेत सहभागी झाला/झाली",
      },
      {
        id: "meditation_camp",
        name: "ध्यान शिबीर",
        description: "शिबीरात नियमित सहभाग",
      },
      {
        id: "personality_dev",
        name: "व्यक्तिमत्व विकास कार्यक्रम",
        description: "कार्यक्रमात सक्रिय सहभाग",
      },
      {
        id: "counseling",
        name: "मार्गदर्शन सत्र",
        description: "मार्गदर्शन घेतले",
      },
    ],
  },
};
// Dummy student data
export const dummyStudents = Array(100).fill().map((_, i) => ({
  _id: `student_${i}`,
  name: `विद्यार्थी ${i + 1}`,
  standard: ["५ वी", "६ वी", "७ वी"][Math.floor(Math.random() * 3)],
  gender: ["मुलगा", "मुलगी"][Math.floor(Math.random() * 2)],
  academicYear: "2023-24",
  rollNumber: String(Math.floor(Math.random() * 100) + 1),
  age: Math.floor(Math.random() * 5) + 10,
  address: "सातारा, महाराष्ट्र",
  parentName: `पालक ${i + 1}`,
  contactNumber: `98765${Math.floor(10000 + Math.random() * 90000)}`,
  results: [
    {
      kosha: "अन्नमयकोश",
      grade: ["उत्तम", "चांगले", "सुधारणे_आवश्यक"][Math.floor(Math.random() * 3)]
    },
    {
      kosha: "प्राणमयकोश",
      grade: ["उत्तम", "चांगले", "सुधारणे_आवश्यक"][Math.floor(Math.random() * 3)]
    },
    {
      kosha: "मनोमयकोश",
      grade: ["उत्तम", "चांगले", "सुधारणे_आवश्यक"][Math.floor(Math.random() * 3)]
    },
    {
      kosha: "नवज्ञानमयकोश",
      grade: ["उत्तम", "चांगले", "सुधारणे_आवश्यक"][Math.floor(Math.random() * 3)]
    },
    {
      kosha: "आनंदमयकोश",
      grade: ["उत्तम", "चांगले", "सुधारणे_आवश्यक"][Math.floor(Math.random() * 3)]
    }
  ]
}));

// Dummy result format data
export const resultFormats = [
  {
    _id: "format_1",
    name: "पंचकोश मूल्यांकन - २०२३-२४",
    standard: "५ वी",
    academicYear: "2023-24",
    koshas: [
      {
        name: "अन्नमयकोश",
        categories: ["शारीरिक विकास", "आरोग्य", "पोषण"]
      },
      {
        name: "प्राणमयकोश",
        categories: ["ऊर्जा", "क्रियाशीलता", "खेळ"]
      },
      {
        name: "मनोमयकोश",
        categories: ["भावना", "विचार", "एकाग्रता"]
      },
      {
        name: "नवज्ञानमयकोश",
        categories: ["बुद्धिमत्ता", "विश्लेषण", "निर्णय"]
      },
      {
        name: "आनंदमयकोश",
        categories: ["आनंद", "समाधान", "स्वीकृती"]
      }
    ]
  },
  {
    _id: "format_2",
    name: "पंचकोश मूल्यांकन - २०२३-२४",
    standard: "६ वी",
    academicYear: "2023-24",
    koshas: [
      {
        name: "अन्नमयकोश",
        categories: ["शारीरिक विकास", "आरोग्य", "पोषण"]
      },
      {
        name: "प्राणमयकोश",
        categories: ["ऊर्जा", "क्रियाशीलता", "खेळ"]
      },
      {
        name: "मनोमयकोश",
        categories: ["भावना", "विचार", "एकाग्रता"]
      },
      {
        name: "नवज्ञानमयकोश",
        categories: ["बुद्धिमत्ता", "विश्लेषण", "निर्णय"]
      },
      {
        name: "आनंदमयकोश",
        categories: ["आनंद", "समाधान", "स्वीकृती"]
      }
    ]
  }
];

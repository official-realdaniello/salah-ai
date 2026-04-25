window.__SALAH_APP_READY__ = true;

const STORAGE_KEY = "salah-ai-platform-v6";
const LEGACY_STORAGE_KEYS = ["salah-ai-platform-v5", "salah-ai-platform-v4"];
const LEGACY_PROFILE_STORE_KEY = "salah-ai-profiles-v1";
const LEGACY_ACTIVE_PROFILE_KEY = "salah-ai-active-profile-v1";
const LEGACY_PROFILE_STORAGE_PREFIX = "salah-ai-profile-v1:";
const DEVICE_PROFILE_ID_KEY = "salah-ai-device-profile-id-v1";
const DEVICE_PROFILE_STORAGE_PREFIX = "salah-ai-device-profile-v1:";
const CHAT_STORAGE_MESSAGE_LIMIT = 120;
const TUTOR_REQUEST_HISTORY_LIMIT = 40;
const CODING_REQUEST_HISTORY_LIMIT = 32;
const MAX_TEXT_UPLOAD_BYTES = 2 * 1024 * 1024;
const MAX_PDF_UPLOAD_BYTES = 8 * 1024 * 1024;
const TEXT_UPLOAD_EXTENSIONS = new Set([
  ".txt", ".md", ".json", ".csv", ".js", ".jsx", ".ts", ".tsx", ".py", ".java",
  ".c", ".cpp", ".cs", ".go", ".rs", ".php", ".rb", ".html", ".css", ".sql",
  ".xml", ".yml", ".yaml"
]);
const pageAliases = { exam: "quiz", flashcards: "home", progress: "insights" };
const page = pageAliases[document.body.dataset.page] || document.body.dataset.page || "home";

const pages = [
  { key: "home", href: "index.html", icon: "01" },
  { key: "tutor", href: "tutor.html", icon: "02" },
  { key: "coding", href: "coding.html", icon: "03" },
  { key: "notes", href: "notes.html", icon: "04" },
  { key: "quiz", href: "quiz.html", icon: "05" },
  { key: "planner", href: "planner.html", icon: "06" },
  { key: "insights", href: "insights.html", icon: "07" },
  { key: "images", href: "images.html", icon: "08" },
  { key: "cv", href: "cv.html", icon: "09" },
  { key: "ieee", href: "ieee.html", icon: "10" }
];

const AI_PROVIDER_NAMES = [
  "Gemini",
  "OpenAI / ChatGPT",
  "Groq",
  "DeepSeek",
  "Together AI",
  "xAI",
  "Eden AI",
  "Pixazo",
  "Runway",
  "Fal",
  "Pollinations"
];

const REPOSITORY_URL = "https://github.com/official-realdaniello/salah-ai";

const copy = {
  en: {
    brand: "Salah's AI",
    brandSub: "AI learning platform for Palestinian students",
    footerBrand: "Salah's AI - 2026",
    footerText: "Focused study, bilingual clarity, and calm AI workflows.",
    online: "AI online",
    offline: "AI offline",
    light: "Light",
    dark: "Dark",
    send: "Send",
    analyze: "Analyze",
    generate: "Generate",
    grade: "Grade",
    clear: "Clear",
    askEdit: "Ask for changes",
    attach: "Attach",
    upload: "Upload file",
    uploadImage: "Upload image",
    removeFile: "Remove file",
    deleteChat: "Delete",
    newTopic: "New topic",
    newSession: "New session",
    topics: "Topics",
    sessions: "Sessions",
    noAi: "Salah's AI is unavailable. Start the local server and configure at least one provider key.",
    typing: "Salah's AI is typing...",
    working: "Working...",
    emptyTutor: "Start a topic and ask anything in Arabic or English.",
    emptyCoding: "Start a session and ask for code, fixes, review, or debugging.",
    emptyNotes: "Paste notes or upload a file to generate a cleaner study summary.",
    emptyExams: "Create an exam from text or PDF to start practicing.",
    emptyPlanner: "Generate a plan, then ask for changes when you want a lighter or tighter schedule.",
    emptyImages: "Generate an image from a prompt.",
    notifyFallback: "Primary provider was unavailable. Salah's AI continued with a backup provider.",
    notifyRateLimit: "A provider hit a rate limit. Salah's AI switched to a backup provider.",
    notifyAllFailed: "AI is unavailable right now. Please return later.",
    count: "Question count",
    hours: "Hours per day",
    nav: {
      home: "Dashboard",
      tutor: "AI Tutor",
      coding: "Coding",
      notes: "Notes",
      quiz: "Exams",
      planner: "Planner",
      insights: "Insights",
      images: "Images",
      cv: "CV Creator",
      ieee: "IEEE Paper Generator"
    },
    tutor: {
      placeholder: "Ask anything about your lesson, chapter, or homework...",
      fileHint: "PDF, TXT, MD, JSON, or CSV",
      untitled: "New topic"
    },
    coding: {
      placeholder: "Describe what you want built, fixed, or improved...",
      codePlaceholder: "Paste the current code here...",
      untitled: "New session",
      modes: {
        write: "Write",
        edit: "Edit",
        debug: "Debug",
        review: "Review"
      },
      labels: {
        code: "Code",
        explanation: "Explanation",
        security: "Security",
        tests: "Tests",
        cautions: "Cautions"
      }
    },
    notes: {
      placeholder: "Paste lesson notes, textbook excerpts, or copied PDF text...",
      fileHint: "Upload a PDF or text file if you want the notes analyzed directly.",
      summary: "Summary",
      terms: "Key terms",
      prompts: "Practice prompts",
      next: "Next steps"
    },
    quiz: {
      text: "Text",
      pdf: "PDF",
      textPlaceholder: "Paste lesson content or a notes summary here...",
      fileHint: "Use PDF mode to generate questions from an uploaded document."
    },
    planner: {
      subjectsPlaceholder: "Math, Physics, Arabic",
      goalPlaceholder: "Finish mechanics review and solve one timed English paper.",
      editPlaceholder: "Ask for a lighter plan, a stricter plan, or a new study focus."
    },
    images: {
      generate: "Generate",
      placeholder: "Create a clean educational poster, study-themed scene, or learning visual...",
      fileHint: ""
    }
  },
  ar: {
    brand: "Salah's AI",
    brandSub: "منصة تعليم ذكية للطلبة الفلسطينيين",
    footerBrand: "Salah's AI - 2026",
    footerText: "دراسة أهدأ، شرح أوضح، وتجربة ذكاء اصطناعي أنظف.",
    online: "الذكاء متصل",
    offline: "الذكاء غير متصل",
    light: "فاتح",
    dark: "داكن",
    send: "إرسال",
    analyze: "حلّل",
    generate: "أنشئ",
    grade: "صحّح",
    clear: "مسح",
    askEdit: "اطلب تعديلًا",
    attach: "إرفاق",
    upload: "ارفع ملفًا",
    uploadImage: "ارفع صورة",
    removeFile: "إزالة الملف",
    deleteChat: "حذف",
    newTopic: "موضوع جديد",
    newSession: "جلسة جديدة",
    topics: "الموضوعات",
    sessions: "الجلسات",
    noAi: "Salah's AI غير متاح الآن. شغّل الخادم المحلي وأضف مفتاح مزود واحد على الأقل.",
    typing: "Salah's AI يكتب الآن...",
    working: "جارٍ التنفيذ...",
    emptyTutor: "ابدأ موضوعًا جديدًا واسأل بالعربية أو الإنجليزية.",
    emptyCoding: "ابدأ جلسة جديدة واطلب كتابة كود أو تعديلًا أو تصحيحًا أو مراجعة.",
    emptyNotes: "ألصق الملاحظات أو ارفع ملفًا للحصول على ملخص أنظف للمراجعة.",
    emptyExams: "أنشئ اختبارًا من نص أو PDF لتبدأ التدريب.",
    emptyPlanner: "أنشئ خطة ثم اطلب تعديلها عندما تريدها أخف أو أكثر تركيزًا.",
    emptyImages: "أنشئ صورة من طلب نصي.",
    notifyFallback: "تعذر استخدام المزود الأساسي، فانتقل Salah's AI إلى مزود احتياطي.",
    notifyRateLimit: "أحد المزودين وصل إلى حد الاستخدام، فانتقل Salah's AI إلى مزود احتياطي.",
    notifyAllFailed: "الذكاء غير متاح الآن. يرجى العودة لاحقًا.",
    count: "عدد الأسئلة",
    hours: "ساعات يومية",
    nav: {
      home: "لوحة التحكم",
      tutor: "المعلم الذكي",
      coding: "البرمجة",
      notes: "الملاحظات",
      quiz: "الاختبارات",
      planner: "الخطة",
      insights: "الرؤى",
      images: "الصور"
    },
    tutor: {
      placeholder: "اسأل عن الدرس أو الفصل أو الواجب...",
      fileHint: "PDF أو TXT أو MD أو JSON أو CSV",
      untitled: "موضوع جديد"
    },
    coding: {
      placeholder: "اشرح ما الذي تريد بناءه أو إصلاحه أو تحسينه...",
      codePlaceholder: "ألصق الكود الحالي هنا...",
      untitled: "جلسة جديدة",
      modes: {
        write: "كتابة",
        edit: "تعديل",
        debug: "تصحيح",
        review: "مراجعة"
      },
      labels: {
        code: "الكود",
        explanation: "الشرح",
        security: "الأمان",
        tests: "الاختبارات",
        cautions: "ملاحظات"
      }
    },
    notes: {
      placeholder: "ألصق ملاحظات الدرس أو نصًا من الكتاب أو محتوى من PDF...",
      fileHint: "ارفع ملف PDF أو ملفًا نصيًا إذا أردت تحليل الملاحظات مباشرة.",
      summary: "الملخص",
      terms: "المصطلحات",
      prompts: "أسئلة تدريب",
      next: "الخطوات التالية"
    },
    quiz: {
      text: "نص",
      pdf: "PDF",
      textPlaceholder: "ألصق محتوى الدرس أو ملخص الملاحظات هنا...",
      fileHint: "استخدم وضع PDF لإنشاء أسئلة من ملف مرفوع."
    },
    planner: {
      subjectsPlaceholder: "رياضيات، فيزياء، عربي",
      goalPlaceholder: "إنهاء مراجعة الميكانيكا وحل اختبار إنجليزي مؤقت.",
      editPlaceholder: "اطلب خطة أخف أو أصعب أو أكثر تركيزًا."
    },
    images: {
      generate: "إنشاء",
      placeholder: "أنشئ ملصقًا تعليميًا نظيفًا أو مشهدًا دراسيًا أو صورة تعليمية...",
      fileHint: ""
    }
  }
};

const homeText = {
  en: {
    eyebrow: "",
    title: "A smoother AI study platform for Palestinian students.",
    subtitle: "Tutor, coding, notes, exams, planner, and images in one place.",
    primary: "Open Tutor",
    secondary: "Open Coding",
    cards: [
      { key: "tutor", title: "AI Tutor", text: "Topic-based conversation with remembered history and file context." },
      { key: "coding", title: "Coding", text: "Chat-style coding help with write, edit, debug, and review modes." },
      { key: "notes", title: "Notes", text: "Turn study material into a cleaner summary with key terms and next steps." },
      { key: "quiz", title: "Exams", text: "Generate practice exams from text or PDF and grade them in one page." },
      { key: "planner", title: "Planner", text: "Create a calm weekly schedule and revise it with follow-up requests." },
      { key: "images", title: "Images", text: "Generate study visuals from a clean prompt." }
    ]
  },
  ar: {
    eyebrow: "",
    title: "منصة دراسة أذكى وأكثر سلاسة للطلبة الفلسطينيين.",
    subtitle: "المعلم والبرمجة والملاحظات والاختبارات والخطة والصور في مكان واحد.",
    primary: "افتح المعلم",
    secondary: "افتح البرمجة",
    cards: [
      { key: "tutor", title: "المعلم الذكي", text: "محادثات محفوظة حسب الموضوع مع تذكر السياق والملفات." },
      { key: "coding", title: "البرمجة", text: "مساعدة برمجية بأسلوب محادثة مع أوضاع كتابة وتعديل وتصحيح ومراجعة." },
      { key: "notes", title: "الملاحظات", text: "حوّل المادة الدراسية إلى ملخص أنظف مع مصطلحات وخطوات تالية." },
      { key: "quiz", title: "الاختبارات", text: "أنشئ اختبارًا من نص أو PDF وصحّحه في الصفحة نفسها." },
      { key: "planner", title: "الخطة", text: "أنشئ خطة أسبوعية هادئة ثم اطلب تعديلها لاحقًا." },
      { key: "images", title: "الصور", text: "أنشئ صورًا تعليمية من طلب نصي نظيف." }
    ]
  }
};

copy.ar.nav.cv = "\u0635\u0627\u0646\u0639 \u0627\u0644\u0633\u064a\u0631\u0629";
copy.ar.nav.ieee = "\u0645\u0648\u0644\u062f \u0648\u0631\u0642\u0629 IEEE";
homeText.en.cards.push({ key: "cv", title: "CV Creator", text: "Build a clean ATS-friendly CV, preview it, and export a polished PDF." });
homeText.ar.cards.push({ key: "cv", title: "\u0635\u0627\u0646\u0639 \u0627\u0644\u0633\u064a\u0631\u0629", text: "\u0627\u0628\u0646\u0650 \u0633\u064a\u0631\u0629 \u0630\u0627\u062a\u064a\u0629 \u0646\u0638\u064a\u0641\u0629 \u0648\u0645\u062a\u0648\u0627\u0641\u0642\u0629 \u0645\u0639 \u0623\u0646\u0638\u0645\u0629 \u0627\u0644\u062a\u0648\u0638\u064a\u0641 \u0645\u0639 \u0645\u0639\u0627\u064a\u0646\u0629 \u0648PDF." });
homeText.en.cards.push({ key: "ieee", title: "IEEE Paper Generator", text: "Draft a conference-style paper, switch between full and anonymous versions, and export clean PDFs." });
homeText.ar.cards.push({ key: "ieee", title: "\u0645\u0648\u0644\u062f \u0648\u0631\u0642\u0629 IEEE", text: "\u0623\u0646\u0634\u0626 \u0648\u0631\u0642\u0629 \u0628\u0623\u0633\u0644\u0648\u0628 IEEE \u0645\u0639 \u0645\u0639\u0627\u064a\u0646\u0629 \u0644\u0644\u0646\u0633\u062e\u0629 \u0627\u0644\u0643\u0627\u0645\u0644\u0629 \u0648\u0627\u0644\u0645\u062c\u0647\u0648\u0644\u0629 \u0648\u062a\u0635\u062f\u064a\u0631 PDF." });

function createCvStateSafe() {
  return typeof window.createCvState === "function"
    ? window.createCvState()
    : { form: null, generated: null, validation: {} };
}

function createIeeeStateSafe() {
  return typeof window.createIeeeState === "function"
    ? window.createIeeeState()
    : {
        form: null,
        generated: { full: null, anonymous: null },
        warnings: {},
        validation: {}
      };
}

function migrateCvStateSafe(payload) {
  return typeof window.migrateCvState === "function" ? window.migrateCvState(payload) : createCvStateSafe();
}

function migrateIeeeStateSafe(payload) {
  return typeof window.migrateIeeeState === "function" ? window.migrateIeeeState(payload) : createIeeeStateSafe();
}

const defaultState = {
  ui: {
    theme: "dark",
    lang: "en",
    textScale: 100,
    readingMode: false,
    reducedMotion: false,
    selectionReadEnabled: false
  },
  api: { aiEnabled: false, defaultModel: "gemini-2.5-flash", codingModel: "gemini-2.5-flash" },
  tutor: {
    topics: [],
    activeTopicId: "",
    draftText: "",
    attachmentName: ""
  },
  coding: {
    sessions: [],
    activeSessionId: "",
    composer: {
      mode: "write",
      codeLanguage: "JavaScript",
      prompt: "",
      code: ""
    },
    attachmentName: ""
  },
  notes: {
    documents: [],
    activeDocumentId: "",
    sourceText: "",
    language: "bilingual",
    fileName: "",
    analysis: null
  },
  quiz: {
    exams: [],
    activeExamId: "",
    sourceMode: "text",
    sourceText: "",
    fileName: "",
    count: 6,
    difficulty: "medium",
    outputLanguage: "bilingual",
    title: "",
    instructions: "",
    subject: "",
    questions: [],
    score: null
  },
  planner: {
    plans: [],
    activePlanId: ""
  },
  images: {
    result: null,
    lastInput: {
      prompt: "",
      aspectRatio: "1:1"
    }
  },
  cv: createCvStateSafe(),
  ieee: createIeeeStateSafe(),
  analytics: {
    events: []
  }
};

const runtime = {
  busy: { tutor: false, coding: false, notes: false, quiz: false, planner: false, images: false, cv: false, ieee: false },
  typing: { tutor: null, coding: null, notes: null, planner: null },
  files: { tutor: null, coding: null, notes: null, quiz: null, images: null },
  sampleNotices: {
    cv: page === "cv",
    ieee: page === "ieee"
  },
  imagesProgress: null,
  imagesRequestToken: "",
  notifications: [],
  panel: "",
  confirm: null,
  globalBound: false,
  pageHideBound: false,
  speech: {
    supported: typeof window !== "undefined" && "speechSynthesis" in window,
    speaking: false,
    selectionText: "",
    selectionTimer: null,
    lastSpokenText: ""
  }
};

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function defaultPlannerInput() {
  return {
    subjectsText: "",
    startDate: "",
    endDate: "",
    hoursPerDay: "3",
    goal: ""
  };
}

function makeId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function createDeviceStorageKey(deviceId) {
  return `${DEVICE_PROFILE_STORAGE_PREFIX}${deviceId}`;
}

function ensureDeviceProfileId() {
  let deviceId = String(localStorage.getItem(DEVICE_PROFILE_ID_KEY) || "").trim();
  if (!deviceId) {
    deviceId = `device-${makeId("profile")}`;
    localStorage.setItem(DEVICE_PROFILE_ID_KEY, deviceId);
  }
  return deviceId;
}

function legacyProfileStorageKey(profileId) {
  return `${LEGACY_PROFILE_STORAGE_PREFIX}${profileId}`;
}

function readStorageJson(key) {
  if (!key) {
    return null;
  }
  const raw = localStorage.getItem(key);
  if (!raw) {
    return null;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function currentStorageKey() {
  return createDeviceStorageKey(ensureDeviceProfileId());
}

function shouldUseLegacyStorageFallback() {
  return !readStorageJson(currentStorageKey());
}

function legacyProfileStorageKeys() {
  const profileStore = readStorageJson(LEGACY_PROFILE_STORE_KEY);
  const profileIds = [];
  const activeId = String(localStorage.getItem(LEGACY_ACTIVE_PROFILE_KEY) || profileStore?.activeId || "").trim();
  if (activeId) {
    profileIds.push(activeId);
  }
  if (Array.isArray(profileStore?.profiles)) {
    profileStore.profiles.forEach((profile) => {
      const profileId = String(profile?.id || "").trim();
      if (profileId) {
        profileIds.push(profileId);
      }
    });
  }
  return Array.from(new Set(profileIds)).map(legacyProfileStorageKey);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function slugifyFileName(value, fallback = "generated-image") {
  const cleaned = String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return cleaned || fallback;
}

function fileExtension(value) {
  const match = String(value || "").toLowerCase().match(/\.[a-z0-9]+$/);
  return match ? match[0] : "";
}

function validateSelectedFile(file, options = {}) {
  if (!file) {
    return null;
  }

  const allowPdf = Boolean(options.allowPdf);
  const allowText = Boolean(options.allowText);
  const extension = fileExtension(file.name);
  const mimeType = String(file.type || "").toLowerCase();
  const isPdf = extension === ".pdf" || mimeType === "application/pdf";
  const isTextLike = mimeType.startsWith("text/")
    || mimeType === "application/json"
    || mimeType === "application/xml"
    || TEXT_UPLOAD_EXTENSIONS.has(extension);

  if (isPdf) {
    if (!allowPdf) {
      throw new Error(uiWord("PDF files are not supported here.", "ملفات PDF غير مدعومة هنا."));
    }
    if (file.size > MAX_PDF_UPLOAD_BYTES) {
      throw new Error(uiWord("PDF files must be 8 MB or smaller.", "يجب أن يكون حجم ملف PDF أقل من 8 ميغابايت."));
    }
    return file;
  }

  if (isTextLike) {
    if (!allowText) {
      throw new Error(uiWord("This uploader only accepts PDF files.", "هذا الحقل يقبل ملفات PDF فقط."));
    }
    if (file.size > MAX_TEXT_UPLOAD_BYTES) {
      throw new Error(uiWord("Text files must be 2 MB or smaller.", "يجب أن يكون حجم الملفات النصية أقل من 2 ميغابايت."));
    }
    return file;
  }

  throw new Error(uiWord("Unsupported file type.", "نوع الملف غير مدعوم."));
}

function fileExtensionForMimeType(mimeType) {
  switch (String(mimeType || "").toLowerCase()) {
    case "image/jpeg":
      return "jpg";
    case "image/webp":
      return "webp";
    case "image/gif":
      return "gif";
    case "image/svg+xml":
      return "svg";
    default:
      return "png";
  }
}

function imageDownloadFileName(result, fallbackPrompt = "") {
  const prompt = String(result?.prompt || fallbackPrompt || "").trim();
  const base = slugifyFileName(prompt, "generated-image");
  const extension = fileExtensionForMimeType(result?.mimeType);
  return `${base}.${extension}`;
}

function downloadDataUrl(dataUrl, fileName) {
  const anchor = document.createElement("a");
  anchor.href = String(dataUrl || "");
  anchor.download = fileName || "generated-image.png";
  anchor.rel = "noopener";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
}

function openBrowserPrintFallback(html) {
  return new Promise((resolve, reject) => {
    const iframe = document.createElement("iframe");
    const blob = new Blob([String(html || "")], { type: "text/html" });
    const blobUrl = URL.createObjectURL(blob);
    let settled = false;

    const cleanup = () => {
      if (iframe.parentNode) {
        iframe.remove();
      }
      URL.revokeObjectURL(blobUrl);
    };

    const finish = () => {
      if (settled) {
        return;
      }
      settled = true;
      cleanup();
      resolve();
    };

    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "1px";
    iframe.style.height = "1px";
    iframe.style.opacity = "0";
    iframe.style.pointerEvents = "none";
    iframe.onload = () => {
      try {
        const printWindow = iframe.contentWindow;
        if (!printWindow) {
          throw new Error("Print preview could not open.");
        }
        if ("onafterprint" in printWindow) {
          printWindow.onafterprint = () => window.setTimeout(finish, 120);
        }
        printWindow.focus();
        window.setTimeout(() => {
          try {
            printWindow.print();
          } catch (error) {
            cleanup();
            reject(error);
            return;
          }
          notify(
            uiWord("Print dialog opened. Choose Save as PDF in your browser.", "تم فتح نافذة الطباعة. اختر الحفظ كملف PDF من المتصفح."),
            "info"
          );
          if (!("onafterprint" in printWindow)) {
            window.setTimeout(finish, 1500);
          }
        }, 120);
      } catch (error) {
        cleanup();
        reject(error);
      }
    };
    iframe.onerror = () => {
      cleanup();
      reject(new Error("Print preview could not open."));
    };

    document.body.appendChild(iframe);
    iframe.src = blobUrl;
  });
}

function makeNotification(message, kind = "info") {
  return { id: makeId("note"), message, kind };
}

function notify(message, kind = "info") {
  if (!message) {
    return;
  }
  const notification = makeNotification(message, kind);
  runtime.notifications = [...runtime.notifications.slice(-3), notification];
  renderApp();
  window.setTimeout(() => {
    runtime.notifications = runtime.notifications.filter((item) => item.id !== notification.id);
    renderApp();
  }, 4600);
}

function read(path) {
  return path.split(".").reduce((accumulator, part) => accumulator?.[part], copy[state.ui.lang]) || path;
}

function pageLink(key) {
  return pages.find((item) => item.key === key)?.href || "index.html";
}

function detectSubject(text) {
  const source = String(text || "").toLowerCase();
  const map = [
    { en: "Mathematics", ar: "الرياضيات", terms: ["math", "equation", "algebra", "geometry", "رياض", "معادلة", "جبر"] },
    { en: "Physics", ar: "الفيزياء", terms: ["physics", "force", "motion", "circuit", "فيزياء", "قوة", "حركة"] },
    { en: "Chemistry", ar: "الكيمياء", terms: ["chemistry", "reaction", "atom", "chem", "كيمياء", "تفاعل"] },
    { en: "Biology", ar: "الأحياء", terms: ["biology", "cell", "organism", "photosynthesis", "أحياء", "خلية"] },
    { en: "English", ar: "اللغة الإنجليزية", terms: ["english", "grammar", "essay", "paragraph", "إنجليزي", "قواعد"] },
    { en: "Arabic", ar: "اللغة العربية", terms: ["arabic", "بلاغة", "نحو", "عربي", "قراءة"] },
    { en: "Programming", ar: "البرمجة", terms: ["code", "coding", "programming", "javascript", "python", "برمجة", "كود"] }
  ];
  const match = map.find((entry) => entry.terms.some((term) => source.includes(term)));
  if (!match) {
    return state.ui.lang === "ar" ? "دراسة عامة" : "General Study";
  }
  return state.ui.lang === "ar" ? match.ar : match.en;
}

function compactPhrase(text, maxWords = 7, maxLength = 64) {
  const clean = String(text || "").replace(/\s+/g, " ").trim();
  if (!clean) {
    return "";
  }
  return clean.split(" ").slice(0, maxWords).join(" ").slice(0, maxLength);
}

function deriveWeakAreaLabel(question, fallbackSubject = "") {
  const subject = compactPhrase(fallbackSubject, 5, 40);
  if (subject) {
    return uiWord(`Core concepts in ${subject}`, `المفاهيم الأساسية في ${subject}`);
  }
  return uiWord("Core concepts", "المفاهيم الأساسية");
}

function formatDateLabel(timestamp) {
  try {
    return new Date(timestamp).toLocaleDateString(state.ui.lang === "ar" ? "ar" : "en", {
      month: "short",
      day: "numeric"
    });
  } catch {
    return "";
  }
}

function recordAnalyticsEvent(event) {
  const payload = {
    id: makeId("event"),
    type: String(event?.type || "activity"),
    subject: compactPhrase(event?.subject || detectSubject(event?.title || ""), 5, 48),
    title: compactPhrase(event?.title || "", 8, 72),
    score: Number(event?.score) || 0,
    total: Number(event?.total) || 0,
    weakAreas: Array.isArray(event?.weakAreas) ? event.weakAreas.map((item) => compactPhrase(item, 8, 72)).filter(Boolean).slice(0, 6) : [],
    meta: typeof event?.meta === "object" && event.meta ? event.meta : {},
    timestamp: Number(event?.timestamp) || Date.now()
  };
  state.analytics.events = [...state.analytics.events.slice(-149), payload];
}

function computeAnalytics() {
  const events = Array.isArray(state.analytics?.events) ? state.analytics.events.slice().sort((left, right) => right.timestamp - left.timestamp) : [];
  const assessmentEvents = events.filter((event) => event.type === "quiz_attempt");
  const subjects = new Map();
  const weakAreas = new Map();
  let correct = 0;
  let total = 0;

  assessmentEvents.forEach((event) => {
    const subjectKey = event.subject || (state.ui.lang === "ar" ? "دراسة عامة" : "General Study");
    if (!subjects.has(subjectKey)) {
      subjects.set(subjectKey, {
        subject: subjectKey,
        attempts: 0,
        correct: 0,
        total: 0,
        lastSeen: 0,
        recentScores: []
      });
    }
    const subjectEntry = subjects.get(subjectKey);
    subjectEntry.attempts += 1;
    subjectEntry.correct += event.score;
    subjectEntry.total += event.total;
    subjectEntry.lastSeen = Math.max(subjectEntry.lastSeen, event.timestamp);
    if (event.total > 0) {
      subjectEntry.recentScores.push(Math.round((event.score / event.total) * 100));
    }

    correct += event.score;
    total += event.total;

    event.weakAreas.forEach((label) => {
      const compositeKey = `${subjectKey}::${label}`;
      const current = weakAreas.get(compositeKey) || { label, subject: subjectKey, count: 0, lastSeen: 0 };
      current.count += 1;
      current.lastSeen = Math.max(current.lastSeen, event.timestamp);
      weakAreas.set(compositeKey, current);
    });
  });

  const subjectRows = Array.from(subjects.values()).map((entry) => {
    const mastery = entry.total ? Math.round((entry.correct / entry.total) * 100) : 0;
    const recent = entry.recentScores.slice(0, 3);
    const earlier = entry.recentScores.slice(3, 6);
    const recentAverage = recent.length ? recent.reduce((sum, value) => sum + value, 0) / recent.length : mastery;
    const earlierAverage = earlier.length ? earlier.reduce((sum, value) => sum + value, 0) / earlier.length : recentAverage;
    const trend = recentAverage > earlierAverage + 4 ? "up" : recentAverage < earlierAverage - 4 ? "down" : "flat";
    return {
      ...entry,
      mastery,
      trend
    };
  }).sort((left, right) => right.lastSeen - left.lastSeen);

  return {
    hasData: assessmentEvents.length > 0,
    overallMastery: total ? Math.round((correct / total) * 100) : 0,
    totalAttempts: assessmentEvents.length,
    activeSubjects: subjectRows.length,
    recentActivity: events.slice(0, 6),
    subjects: subjectRows.slice(0, 6),
    weakAreas: Array.from(weakAreas.values()).sort((left, right) => right.count - left.count || right.lastSeen - left.lastSeen).slice(0, 6)
  };
}

function topWeakAreas(limit = 4) {
  return computeAnalytics().weakAreas.slice(0, limit).map((item) => item.label);
}

function normalizeTitle(value, fallback) {
  const clean = String(value || "").replace(/\s+/g, " ").trim();
  return clean ? clean.slice(0, 48) : fallback;
}

function normalizeConversationMessages(messages, limit = CHAT_STORAGE_MESSAGE_LIMIT) {
  if (!Array.isArray(messages)) {
    return [];
  }
  return messages
    .slice(-limit)
    .map((message) => ({
      role: message?.role === "assistant" ? "assistant" : "user",
      content: String(message?.content || ""),
      requestContent: String(message?.requestContent || message?.content || ""),
      attachmentName: String(message?.attachmentName || "")
    }))
    .filter((message) => message.content.trim() || message.requestContent.trim() || message.attachmentName);
}

function createConversationMessage(role, content, options = {}) {
  return {
    role: role === "assistant" ? "assistant" : "user",
    content: String(content || ""),
    requestContent: String(options.requestContent || content || ""),
    attachmentName: String(options.attachmentName || "")
  };
}

function conversationMessageForAI(message) {
  const requestContent = String(message?.requestContent || message?.content || "");
  const attachmentName = String(message?.attachmentName || "");
  if (!attachmentName || requestContent.includes(attachmentName)) {
    return requestContent;
  }
  return [requestContent, `[Attached file: ${attachmentName}]`].filter(Boolean).join("\n\n");
}

function buildRequestHistory(messages, limit) {
  return normalizeConversationMessages(messages, limit).map((message) => ({
    role: message.role,
    content: conversationMessageForAI(message)
  }));
}

function createTutorTopic(title = "") {
  return {
    id: makeId("topic"),
    title: normalizeTitle(title, read("tutor.untitled")),
    messages: [],
    updatedAt: Date.now()
  };
}

function createCodingSession(title = "") {
  return {
    id: makeId("session"),
    title: normalizeTitle(title, read("coding.untitled")),
    messages: [],
    lastCode: "",
    lastLanguage: "JavaScript",
    updatedAt: Date.now()
  };
}

function plannerFallbackTitle(index = 1) {
  return state.ui.lang === "ar" ? `الخطة ${index}` : `Plan ${index}`;
}

function createPlannerPlan(title = "", index = 1) {
  return {
    id: makeId("plan"),
    title: normalizeTitle(title, plannerFallbackTitle(index)),
    plan: null,
    editRequest: "",
    lastInput: defaultPlannerInput(),
    updatedAt: Date.now()
  };
}

function noteFallbackTitle(index = 1) {
  return uiWord(`Note ${index}`, `ملاحظة ${index}`);
}

function examFallbackTitle(index = 1) {
  return uiWord(`Exam ${index}`, `اختبار ${index}`);
}

function createNoteRecord(title = "", index = 1) {
  return {
    id: makeId("note"),
    title: normalizeTitle(title, noteFallbackTitle(index)),
    sourceText: "",
    language: "bilingual",
    fileName: "",
    analysis: null,
    updatedAt: Date.now()
  };
}

function createExamRecord(title = "", index = 1) {
  return {
    id: makeId("exam"),
    title: normalizeTitle(title, examFallbackTitle(index)),
    titleText: "",
    sourceMode: "text",
    sourceText: "",
    fileName: "",
    count: 6,
    difficulty: "medium",
    outputLanguage: "bilingual",
    instructions: "",
    subject: "",
    questions: [],
    score: null,
    updatedAt: Date.now()
  };
}

function sortByUpdated(items) {
  return items.slice().sort((left, right) => right.updatedAt - left.updatedAt);
}

function activeTutorTopic() {
  return state.tutor.topics.find((topic) => topic.id === state.tutor.activeTopicId) || null;
}

function activeCodingSession() {
  return state.coding.sessions.find((session) => session.id === state.coding.activeSessionId) || null;
}

function activePlannerPlan() {
  return state.planner.plans.find((plan) => plan.id === state.planner.activePlanId) || null;
}

function activeNoteRecord() {
  return state.notes.documents.find((record) => record.id === state.notes.activeDocumentId) || null;
}

function activeExamRecord() {
  return state.quiz.exams.find((record) => record.id === state.quiz.activeExamId) || null;
}

function ensureTutorTopic(title = "") {
  let topic = activeTutorTopic();
  if (topic) {
    return topic;
  }
  topic = createTutorTopic(title);
  state.tutor.topics.unshift(topic);
  state.tutor.activeTopicId = topic.id;
  return topic;
}

function ensureCodingSession(title = "") {
  let session = activeCodingSession();
  if (session) {
    return session;
  }
  session = createCodingSession(title);
  state.coding.sessions.unshift(session);
  state.coding.activeSessionId = session.id;
  return session;
}

function ensurePlannerPlan(title = "") {
  let plan = activePlannerPlan();
  if (plan) {
    return plan;
  }
  plan = createPlannerPlan(title, state.planner.plans.length + 1);
  state.planner.plans.unshift(plan);
  state.planner.activePlanId = plan.id;
  return plan;
}

function noteTitleFromState() {
  const analysisTitle = String(state.notes.analysis?.title || "");
  const sourceHeadline = String(state.notes.sourceText || "").split(/\r?\n/).find((line) => line.trim()) || "";
  return analysisTitle || state.notes.fileName || sourceHeadline;
}

function examTitleFromState() {
  return state.quiz.title || state.quiz.subject || state.quiz.fileName || state.quiz.sourceText.split(/\r?\n/).find((line) => line.trim()) || "";
}

function applyNoteRecordToState(record) {
  state.notes.activeDocumentId = record?.id || "";
  state.notes.sourceText = String(record?.sourceText || "");
  state.notes.language = String(record?.language || "bilingual");
  state.notes.fileName = String(record?.fileName || "");
  state.notes.analysis = record?.analysis && typeof record.analysis === "object" ? record.analysis : null;
}

function applyExamRecordToState(record) {
  state.quiz.activeExamId = record?.id || "";
  state.quiz.sourceMode = String(record?.sourceMode || "text");
  state.quiz.sourceText = String(record?.sourceText || "");
  state.quiz.fileName = String(record?.fileName || "");
  state.quiz.count = Number(record?.count) || 6;
  state.quiz.difficulty = String(record?.difficulty || "medium");
  state.quiz.outputLanguage = String(record?.outputLanguage || "bilingual");
  state.quiz.title = String(record?.titleText || record?.title || "");
  state.quiz.instructions = String(record?.instructions || "");
  state.quiz.subject = String(record?.subject || "");
  state.quiz.questions = Array.isArray(record?.questions)
    ? record.questions.map((question) => ({ ...question }))
    : [];
  state.quiz.score = record?.score && typeof record.score === "object" ? { ...record.score } : null;
}

function syncActiveNoteRecord(touchTimestamp = false) {
  const record = activeNoteRecord();
  if (!record) {
    return null;
  }
  record.sourceText = String(state.notes.sourceText || "");
  record.language = String(state.notes.language || "bilingual");
  record.fileName = String(state.notes.fileName || "");
  record.analysis = state.notes.analysis && typeof state.notes.analysis === "object" ? deepClone(state.notes.analysis) : null;
  record.title = normalizeTitle(noteTitleFromState(), noteFallbackTitle(Math.max(1, state.notes.documents.findIndex((item) => item.id === record.id) + 1)));
  if (touchTimestamp) {
    record.updatedAt = Date.now();
  }
  return record;
}

function syncActiveExamRecord(touchTimestamp = false) {
  const record = activeExamRecord();
  if (!record) {
    return null;
  }
  record.sourceMode = String(state.quiz.sourceMode || "text");
  record.sourceText = String(state.quiz.sourceText || "");
  record.fileName = String(state.quiz.fileName || "");
  record.count = Number(state.quiz.count) || 6;
  record.difficulty = String(state.quiz.difficulty || "medium");
  record.outputLanguage = String(state.quiz.outputLanguage || "bilingual");
  record.titleText = String(state.quiz.title || "");
  record.title = normalizeTitle(examTitleFromState(), examFallbackTitle(Math.max(1, state.quiz.exams.findIndex((item) => item.id === record.id) + 1)));
  record.instructions = String(state.quiz.instructions || "");
  record.subject = String(state.quiz.subject || "");
  record.questions = Array.isArray(state.quiz.questions)
    ? state.quiz.questions.map((question) => ({ ...question }))
    : [];
  record.score = state.quiz.score && typeof state.quiz.score === "object" ? { ...state.quiz.score } : null;
  if (touchTimestamp) {
    record.updatedAt = Date.now();
  }
  return record;
}

function ensureNoteRecord(title = "") {
  let record = activeNoteRecord();
  if (record) {
    return record;
  }
  record = createNoteRecord(title, state.notes.documents.length + 1);
  state.notes.documents.unshift(record);
  applyNoteRecordToState(record);
  return record;
}

function ensureExamRecord(title = "") {
  let record = activeExamRecord();
  if (record) {
    return record;
  }
  record = createExamRecord(title, state.quiz.exams.length + 1);
  state.quiz.exams.unshift(record);
  applyExamRecordToState(record);
  return record;
}

function createFreshNoteRecord() {
  syncActiveNoteRecord(true);
  const record = createNoteRecord("", state.notes.documents.length + 1);
  state.notes.documents.unshift(record);
  runtime.files.notes = null;
  applyNoteRecordToState(record);
  persist();
  renderApp({ transition: true });
}

function deleteNoteRecord(recordId) {
  if (!recordId) {
    return;
  }
  state.notes.documents = state.notes.documents.filter((record) => record.id !== recordId);
  runtime.files.notes = null;
  if (state.notes.activeDocumentId === recordId) {
    applyNoteRecordToState(state.notes.documents[0] || null);
  }
  persist();
  renderApp({ transition: true });
}

function createFreshExamRecord() {
  syncActiveExamRecord(true);
  const record = createExamRecord("", state.quiz.exams.length + 1);
  state.quiz.exams.unshift(record);
  runtime.files.quiz = null;
  applyExamRecordToState(record);
  persist();
  renderApp({ transition: true });
}

function deleteExamRecord(recordId) {
  if (!recordId) {
    return;
  }
  state.quiz.exams = state.quiz.exams.filter((record) => record.id !== recordId);
  runtime.files.quiz = null;
  if (state.quiz.activeExamId === recordId) {
    applyExamRecordToState(state.quiz.exams[0] || null);
  }
  persist();
  renderApp({ transition: true });
}

function isTutorTopicEmpty(topic) {
  return !topic || !Array.isArray(topic.messages) || topic.messages.length === 0;
}

function isCodingSessionEmpty(session) {
  return !session || (
    (!Array.isArray(session.messages) || session.messages.length === 0)
    && !String(session.lastCode || "").trim()
  );
}

function pruneEmptyTutorTopics(exceptId = state.tutor.activeTopicId) {
  const previousLength = state.tutor.topics.length;
  state.tutor.topics = state.tutor.topics.filter((topic) => topic.id === exceptId || !isTutorTopicEmpty(topic));
  if (state.tutor.activeTopicId && !state.tutor.topics.some((topic) => topic.id === state.tutor.activeTopicId)) {
    state.tutor.activeTopicId = state.tutor.topics[0]?.id || "";
  }
  return state.tutor.topics.length !== previousLength;
}

function pruneEmptyCodingSessions(exceptId = state.coding.activeSessionId) {
  const previousLength = state.coding.sessions.length;
  state.coding.sessions = state.coding.sessions.filter((session) => session.id === exceptId || !isCodingSessionEmpty(session));
  if (state.coding.activeSessionId && !state.coding.sessions.some((session) => session.id === state.coding.activeSessionId)) {
    state.coding.activeSessionId = state.coding.sessions[0]?.id || "";
  }
  return state.coding.sessions.length !== previousLength;
}

function loadStoredPayload() {
  const keys = [
    currentStorageKey(),
    ...legacyProfileStorageKeys(),
    ...(shouldUseLegacyStorageFallback() ? [STORAGE_KEY, ...LEGACY_STORAGE_KEYS] : [])
  ];
  for (const key of keys) {
    const parsed = readStorageJson(key);
    if (parsed) {
      return parsed;
    }
  }
  return null;
}

function formatCodingResultText(result, languageName) {
  const labels = read("coding.labels");
  const fence = String(languageName || "").trim().toLowerCase() || "text";
  return [
    result.summary || "",
    result.improved_code ? `${labels.code}:\n\`\`\`${fence}\n${result.improved_code}\n\`\`\`` : "",
    result.explanation?.length ? `${labels.explanation}:\n- ${result.explanation.join("\n- ")}` : "",
    result.security_notes?.length ? `${labels.security}:\n- ${result.security_notes.join("\n- ")}` : "",
    result.tests?.length ? `${labels.tests}:\n- ${result.tests.join("\n- ")}` : "",
    result.cautions?.length ? `${labels.cautions}:\n- ${result.cautions.join("\n- ")}` : ""
  ].filter(Boolean).join("\n\n");
}

function formatTutorResultText(result) {
  return String(result.answer || "").trim();
}

function formatNotesResultText(result) {
  return [
    result.title || "",
    result.subject ? `${uiWord("Subject", "المادة")}: ${result.subject}` : "",
    result.summary?.length ? `${read("notes.summary")}:\n- ${result.summary.join("\n- ")}` : "",
    result.key_terms?.length ? `${read("notes.terms")}:\n- ${result.key_terms.map((item) => `${item.term}: ${item.definition}`).join("\n- ")}` : "",
    result.quiz_prompts?.length ? `${read("notes.prompts")}:\n- ${result.quiz_prompts.join("\n- ")}` : "",
    result.next_steps?.length ? `${read("notes.next")}:\n- ${result.next_steps.join("\n- ")}` : ""
  ].filter(Boolean).join("\n\n");
}

function thinkingStepsFor(task) {
  switch (task) {
    case "tutor":
      return state.ui.lang === "ar"
        ? ["أقرأ السؤال والسياق", "أحدد النقاط التعليمية الأهم", "أرتب إجابة واضحة خطوة بخطوة"]
        : ["Reading the question and context", "Finding the key learning points", "Drafting a clear step-by-step answer"];
    case "coding":
      return state.ui.lang === "ar"
        ? ["أفهم المطلوب والكود الحالي", "أراجع المخاطر والحالات المهمة", "أجهز حلاً أنظف وأسهل للمراجعة"]
        : ["Understanding the request and current code", "Checking the risky edges", "Preparing a cleaner implementation"];
    case "notes":
      return state.ui.lang === "ar"
        ? ["أراجع المادة المرفوعة", "أستخرج الأفكار والمصطلحات الأساسية", "أرتب الملخص وأسئلة المراجعة"]
        : ["Reviewing the study material", "Pulling out the key ideas and terms", "Structuring the summary and revision prompts"];
    case "planner":
      return state.ui.lang === "ar"
        ? ["أراجع المواد والوقت المتاح", "أوزع الأولويات والضغط الدراسي", "أبني خطة متوازنة قابلة للتنفيذ"]
        : ["Reviewing subjects and available time", "Balancing priorities and workload", "Building a plan that stays realistic"];
    default:
      return state.ui.lang === "ar"
        ? ["أعالج الطلب", "أرتب الناتج", "أجهز الرد النهائي"]
        : ["Processing the request", "Organizing the output", "Preparing the final response"];
  }
}

function buildThinkingText(task, stepIndex, pulseIndex) {
  const steps = thinkingStepsFor(task);
  const visibleCount = Math.min(stepIndex, steps.length);
  const dots = ".".repeat((pulseIndex % 3) + 1);
  return steps.slice(0, visibleCount).map((step, index) => (
    index === visibleCount - 1 ? `• ${step}${dots}` : `• ${step}`
  )).join("\n");
}

function startThinkingStream(task, contextId = "") {
  const totalSteps = thinkingStepsFor(task).length;
  let stepIndex = 1;
  let pulseIndex = 0;

  const paint = () => {
    runtime.typing[task] = {
      contextId,
      phase: "thinking",
      text: buildThinkingText(task, stepIndex, pulseIndex)
    };
    renderApp();
    pulseIndex += 1;
    if (pulseIndex % 3 === 0 && stepIndex < totalSteps) {
      stepIndex += 1;
    }
  };

  paint();
  const timerId = window.setInterval(paint, 360);
  return () => {
    window.clearInterval(timerId);
  };
}

function migrateTutorTopics(parsed) {
  if (Array.isArray(parsed?.tutor?.topics) && parsed.tutor.topics.length) {
    return {
      topics: parsed.tutor.topics.map((topic) => ({
        id: topic.id || makeId("topic"),
        title: normalizeTitle(topic.title, read("tutor.untitled")),
        messages: normalizeConversationMessages(topic.messages),
        updatedAt: Number(topic.updatedAt) || Date.now()
      })),
      activeTopicId: parsed.tutor.activeTopicId || parsed.tutor.topics[0]?.id || ""
    };
  }

  if (Array.isArray(parsed?.chats?.tutor) && parsed.chats.tutor.length) {
    const topic = createTutorTopic(parsed.chats.tutor.find((item) => item.role === "user")?.content || "");
    topic.messages = normalizeConversationMessages(parsed.chats.tutor);
    return { topics: [topic], activeTopicId: topic.id };
  }

  return deepClone(defaultState.tutor);
}

function migrateCodingSessions(parsed) {
  if (Array.isArray(parsed?.coding?.sessions) && parsed.coding.sessions.length) {
    return {
      sessions: parsed.coding.sessions.map((session) => ({
        id: session.id || makeId("session"),
        title: normalizeTitle(session.title, read("coding.untitled")),
        messages: normalizeConversationMessages(session.messages),
        lastCode: String(session.lastCode || ""),
        lastLanguage: String(session.lastLanguage || parsed.coding?.lastInput?.codeLanguage || "JavaScript"),
        updatedAt: Number(session.updatedAt) || Date.now()
      })),
      activeSessionId: parsed.coding.activeSessionId || parsed.coding.sessions[0]?.id || ""
    };
  }

  if (parsed?.coding?.result || parsed?.coding?.lastInput?.goal || parsed?.coding?.lastInput?.code) {
    const session = createCodingSession(parsed.coding.lastInput?.goal || "");
    session.lastLanguage = parsed.coding.lastInput?.codeLanguage || "JavaScript";
    if (parsed.coding.lastInput?.goal) {
      session.messages.push({ role: "user", content: String(parsed.coding.lastInput.goal) });
    }
    if (parsed.coding.result) {
      session.lastCode = String(parsed.coding.result.improved_code || parsed.coding.lastInput?.code || "");
      session.messages.push({
        role: "assistant",
        content: formatCodingResultText(parsed.coding.result, session.lastLanguage)
      });
    }
    return { sessions: [session], activeSessionId: session.id };
  }

  return deepClone(defaultState.coding);
}

function normalizeNoteRecord(record, index = 1) {
  const sourceText = String(record?.sourceText || "");
  const analysis = record?.analysis && typeof record.analysis === "object" ? record.analysis : null;
  const titleSource = record?.title || analysis?.title || record?.fileName || sourceText.split(/\r?\n/).find((line) => line.trim()) || "";
  return {
    id: String(record?.id || makeId("note")),
    title: normalizeTitle(titleSource, noteFallbackTitle(index)),
    sourceText,
    language: String(record?.language || "bilingual"),
    fileName: String(record?.fileName || ""),
    analysis,
    updatedAt: Number(record?.updatedAt) || Date.now()
  };
}

function normalizeExamRecord(record, index = 1) {
  const titleText = String(record?.titleText || record?.title || "");
  const titleSource = titleText || record?.subject || record?.fileName || String(record?.sourceText || "").split(/\r?\n/).find((line) => line.trim()) || "";
  return {
    id: String(record?.id || makeId("exam")),
    title: normalizeTitle(titleSource, examFallbackTitle(index)),
    titleText,
    sourceMode: String(record?.sourceMode || "text"),
    sourceText: String(record?.sourceText || ""),
    fileName: String(record?.fileName || ""),
    count: Number(record?.count) || 6,
    difficulty: String(record?.difficulty || "medium"),
    outputLanguage: String(record?.outputLanguage || "bilingual"),
    instructions: String(record?.instructions || ""),
    subject: String(record?.subject || ""),
    questions: Array.isArray(record?.questions) ? record.questions.map((question) => ({ ...question })) : [],
    score: record?.score && typeof record.score === "object" ? { ...record.score } : null,
    updatedAt: Number(record?.updatedAt) || Date.now()
  };
}

function migrateNotesState(parsed) {
  if (Array.isArray(parsed?.notes?.documents)) {
    const documents = parsed.notes.documents.map((record, index) => normalizeNoteRecord(record, index + 1));
    const activeDocumentId = String(parsed.notes.activeDocumentId || documents[0]?.id || "");
    const activeRecord = documents.find((record) => record.id === activeDocumentId) || documents[0] || null;
    return {
      documents,
      activeDocumentId: activeRecord?.id || "",
      sourceText: String(activeRecord?.sourceText || parsed.notes?.sourceText || ""),
      language: String(activeRecord?.language || parsed.notes?.language || "bilingual"),
      fileName: String(activeRecord?.fileName || parsed.notes?.fileName || ""),
      analysis: activeRecord?.analysis || null
    };
  }

  if (parsed?.notes?.analysis || parsed?.notes?.sourceText || parsed?.notes?.fileName) {
    const legacyRecord = normalizeNoteRecord(parsed.notes, 1);
    return {
      documents: [legacyRecord],
      activeDocumentId: legacyRecord.id,
      sourceText: legacyRecord.sourceText,
      language: legacyRecord.language,
      fileName: legacyRecord.fileName,
      analysis: legacyRecord.analysis
    };
  }

  const starter = createNoteRecord("", 1);
  return {
    documents: [starter],
    activeDocumentId: starter.id,
    sourceText: "",
    language: starter.language,
    fileName: "",
    analysis: null
  };
}

function migrateQuizState(parsed) {
  if (Array.isArray(parsed?.quiz?.exams)) {
    const exams = parsed.quiz.exams.map((record, index) => normalizeExamRecord(record, index + 1));
    const activeExamId = String(parsed.quiz.activeExamId || exams[0]?.id || "");
    const activeRecord = exams.find((record) => record.id === activeExamId) || exams[0] || null;
    return {
      exams,
      activeExamId: activeRecord?.id || "",
      sourceMode: String(activeRecord?.sourceMode || parsed.quiz?.sourceMode || "text"),
      sourceText: String(activeRecord?.sourceText || parsed.quiz?.sourceText || ""),
      fileName: String(activeRecord?.fileName || parsed.quiz?.fileName || ""),
      count: Number(activeRecord?.count || parsed.quiz?.count) || 6,
      difficulty: String(activeRecord?.difficulty || parsed.quiz?.difficulty || "medium"),
      outputLanguage: String(activeRecord?.outputLanguage || parsed.quiz?.outputLanguage || "bilingual"),
      title: String(activeRecord?.titleText || parsed.quiz?.title || ""),
      instructions: String(activeRecord?.instructions || parsed.quiz?.instructions || ""),
      subject: String(activeRecord?.subject || parsed.quiz?.subject || ""),
      questions: Array.isArray(activeRecord?.questions) ? activeRecord.questions.map((question) => ({ ...question })) : [],
      score: activeRecord?.score && typeof activeRecord.score === "object" ? { ...activeRecord.score } : null
    };
  }

  if (parsed?.quiz?.questions?.length || parsed?.quiz?.sourceText || parsed?.quiz?.fileName) {
    const legacyRecord = normalizeExamRecord(parsed.quiz, 1);
    return {
      exams: [legacyRecord],
      activeExamId: legacyRecord.id,
      sourceMode: legacyRecord.sourceMode,
      sourceText: legacyRecord.sourceText,
      fileName: legacyRecord.fileName,
      count: legacyRecord.count,
      difficulty: legacyRecord.difficulty,
      outputLanguage: legacyRecord.outputLanguage,
      title: legacyRecord.titleText,
      instructions: legacyRecord.instructions,
      subject: legacyRecord.subject,
      questions: legacyRecord.questions,
      score: legacyRecord.score
    };
  }

  const starter = createExamRecord("", 1);
  return {
    exams: [starter],
    activeExamId: starter.id,
    sourceMode: starter.sourceMode,
    sourceText: "",
    fileName: "",
    count: starter.count,
    difficulty: starter.difficulty,
    outputLanguage: starter.outputLanguage,
    title: "",
    instructions: "",
    subject: "",
    questions: [],
    score: null
  };
}

function normalizePlannerPlanRecord(plan, index = 1) {
  const subjectsText = String(
    plan?.lastInput?.subjectsText
    || (Array.isArray(plan?.subjects) ? plan.subjects.join(", ") : "")
    || ""
  );
  const goal = String(plan?.lastInput?.goal || plan?.goal || "");
  const titleSource = plan?.title || plan?.plan?.overview || subjectsText || goal;
  return {
    id: String(plan?.id || makeId("plan")),
    title: normalizeTitle(titleSource, plannerFallbackTitle(index)),
    plan: plan?.plan && typeof plan.plan === "object" ? plan.plan : null,
    editRequest: String(plan?.editRequest || ""),
    lastInput: {
      ...defaultPlannerInput(),
      ...(plan?.lastInput || {}),
      subjectsText,
      startDate: String(plan?.lastInput?.startDate || plan?.startDate || ""),
      endDate: String(plan?.lastInput?.endDate || plan?.examDate || plan?.endDate || ""),
      hoursPerDay: String(plan?.lastInput?.hoursPerDay || plan?.hoursPerDay || defaultPlannerInput().hoursPerDay),
      goal
    },
    updatedAt: Number(plan?.updatedAt) || Date.now()
  };
}

function migratePlannerState(parsed) {
  if (Array.isArray(parsed?.planner?.plans)) {
    const plans = parsed.planner.plans.map((plan, index) => normalizePlannerPlanRecord(plan, index + 1));
    const activePlanId = String(parsed.planner.activePlanId || plans[0]?.id || "");
    return {
      plans,
      activePlanId: plans.some((plan) => plan.id === activePlanId) ? activePlanId : plans[0]?.id || ""
    };
  }

  if (parsed?.planner?.plan || parsed?.planner?.lastInput) {
    const legacyPlan = normalizePlannerPlanRecord({
      title: parsed.planner?.plan?.overview || parsed.planner?.lastInput?.subjectsText || parsed.planner?.lastInput?.goal,
      plan: parsed.planner?.plan || null,
      editRequest: parsed.planner?.editRequest || "",
      lastInput: parsed.planner?.lastInput || {}
    }, 1);
    return {
      plans: [legacyPlan],
      activePlanId: legacyPlan.id
    };
  }

  const starterPlan = createPlannerPlan("", 1);
  return {
    plans: [starterPlan],
    activePlanId: starterPlan.id
  };
}

function createFreshState() {
  const freshState = deepClone(defaultState);
  const starterPlan = createPlannerPlan("", 1);
  const starterNote = createNoteRecord("", 1);
  const starterExam = createExamRecord("", 1);
  freshState.planner.plans = [starterPlan];
  freshState.planner.activePlanId = starterPlan.id;
  freshState.notes.documents = [starterNote];
  freshState.notes.activeDocumentId = starterNote.id;
  freshState.quiz.exams = [starterExam];
  freshState.quiz.activeExamId = starterExam.id;
  return freshState;
}

function loadState() {
  const parsed = loadStoredPayload();
  if (!parsed) {
    return createFreshState();
  }

  const tutor = migrateTutorTopics(parsed);
  const coding = migrateCodingSessions(parsed);
  const notes = migrateNotesState(parsed);
  const quiz = migrateQuizState(parsed);
  const planner = migratePlannerState(parsed);
  const cv = migrateCvStateSafe(parsed);
  const ieee = migrateIeeeStateSafe(parsed);

  return {
    ...deepClone(defaultState),
    ...parsed,
    ui: { ...deepClone(defaultState.ui), ...(parsed.ui || {}) },
    api: { ...deepClone(defaultState.api), ...(parsed.api || {}) },
    tutor: {
      ...deepClone(defaultState.tutor),
      ...tutor,
      draftText: String(parsed.tutor?.draftText || ""),
      attachmentName: String(parsed.tutor?.attachmentName || "")
    },
    coding: {
      ...deepClone(defaultState.coding),
      ...coding,
      composer: {
        ...deepClone(defaultState.coding.composer),
        ...(parsed.coding?.composer || {}),
        codeLanguage: String(parsed.coding?.composer?.codeLanguage || parsed.coding?.lastInput?.codeLanguage || defaultState.coding.composer.codeLanguage),
        prompt: String(parsed.coding?.composer?.prompt || ""),
        code: String(parsed.coding?.composer?.code || parsed.coding?.lastInput?.code || "")
      },
      attachmentName: String(parsed.coding?.attachmentName || parsed.coding?.lastInput?.fileName || "")
    },
    notes: {
      ...deepClone(defaultState.notes),
      ...notes
    },
    quiz: {
      ...deepClone(defaultState.quiz),
      ...quiz
    },
    planner: {
      ...deepClone(defaultState.planner),
      ...planner
    },
    images: {
      ...deepClone(defaultState.images),
      ...(parsed.images || {}),
      lastInput: { ...deepClone(defaultState.images.lastInput), ...(parsed.images?.lastInput || {}) }
    },
    cv: cv,
    ieee: ieee,
    analytics: {
      ...deepClone(defaultState.analytics),
      ...(parsed.analytics || {}),
      events: Array.isArray(parsed.analytics?.events) ? parsed.analytics.events.slice(-150) : []
    }
  };
}

let state = deepClone(defaultState);
state = loadState();

function persist() {
  try {
    localStorage.setItem(currentStorageKey(), JSON.stringify(state));
  } catch (error) {
    console.warn("Could not persist local state.", error);
  }
}

let pendingPersistTimer = 0;

function persistSoon(delayMs = 180) {
  if (pendingPersistTimer) {
    window.clearTimeout(pendingPersistTimer);
  }
  pendingPersistTimer = window.setTimeout(() => {
    pendingPersistTimer = 0;
    persist();
  }, delayMs);
}

function flushPendingPersist() {
  if (!pendingPersistTimer) {
    return;
  }
  window.clearTimeout(pendingPersistTimer);
  pendingPersistTimer = 0;
  persist();
}

function scrollToBottom(node) {
  if (!node) {
    return;
  }
  node.scrollTop = node.scrollHeight;
}

function autoResize(textarea) {
  if (!textarea) {
    return;
  }
  textarea.style.height = "0px";
  textarea.style.height = `${Math.min(textarea.scrollHeight, 320)}px`;
}

function bindAutoGrow() {
  document.querySelectorAll(".auto-grow").forEach((textarea) => {
    autoResize(textarea);
    textarea.addEventListener("input", () => autoResize(textarea));
  });
}

function renderRichText(text) {
  const source = String(text || "").replace(/\r/g, "").trim();
  if (!source) {
    return "";
  }

  const blocks = [];
  const codePattern = /```([\w.+-]*)\n([\s\S]*?)```/g;
  let lastIndex = 0;
  let match;

  while ((match = codePattern.exec(source))) {
    if (match.index > lastIndex) {
      blocks.push({ type: "text", value: source.slice(lastIndex, match.index) });
    }
    blocks.push({ type: "code", language: match[1], value: match[2].trimEnd() });
    lastIndex = codePattern.lastIndex;
  }

  if (lastIndex < source.length) {
    blocks.push({ type: "text", value: source.slice(lastIndex) });
  }

  return blocks.map((block) => {
    if (block.type === "code") {
      return `
        <section class="message-code-block">
          ${block.language ? `<span class="code-language">${escapeHtml(block.language)}</span>` : ""}
          <pre class="code-frame">${escapeHtml(block.value)}</pre>
        </section>
      `;
    }

    return block.value
      .split(/\n{2,}/)
      .map((chunk) => chunk.trim())
      .filter(Boolean)
      .map((chunk) => {
        const lines = chunk.split("\n").map((line) => line.trimEnd());
        const labelMatch = lines[0].match(/^(.+):$/);
        const listLines = lines.every((line) => line.trim().startsWith("- "));
        const labeledList = labelMatch && lines.slice(1).every((line) => line.trim().startsWith("- "));

        if (listLines) {
          return `<ul class="message-list">${lines.map((line) => `<li>${escapeHtml(line.trim().slice(2))}</li>`).join("")}</ul>`;
        }

        if (labeledList) {
          return `
            <section class="message-section">
              <p class="message-section-label">${escapeHtml(labelMatch[1])}</p>
              <ul class="message-list">${lines.slice(1).map((line) => `<li>${escapeHtml(line.trim().slice(2))}</li>`).join("")}</ul>
            </section>
          `;
        }

        return `<p>${lines.map((line) => escapeHtml(line)).join("<br>")}</p>`;
      })
      .join("");
  }).join("");
}

function renderMessage(role, content, options = {}) {
  const message = role && typeof role === "object"
    ? {
        role: role.role === "assistant" ? "assistant" : "user",
        content: String(role.content || ""),
        attachmentName: String(role.attachmentName || "")
      }
    : {
        role: role === "assistant" ? "assistant" : "user",
        content: String(content || ""),
        attachmentName: String(options.attachmentName || "")
      };
  role = message.role;
  content = message.content;
  options = { ...options, attachmentName: message.attachmentName };
  const label = options.label || (role === "assistant" ? read("brand") : (state.ui.lang === "ar" ? "أنت" : "You"));
  const roleClass = role === "assistant" ? "message--assistant" : "message--user";

  if (options.streaming) {
    return `
      <article class="message ${roleClass} message--streaming">
        <span class="message-role">${escapeHtml(label)}</span>
        <pre class="stream-frame" id="${options.streamingId}">${escapeHtml(options.text || "")}</pre>
      </article>
    `;
  }

  return `
    <article class="message ${roleClass}">
      <span class="message-role">${escapeHtml(label)}</span>
      <div class="message-body">
        ${options.attachmentName ? `<div class="message-attachments"><span class="file-chip file-chip--message">${escapeHtml(options.attachmentName)}</span></div>` : ""}
        ${content ? renderRichText(content) : ""}
      </div>
    </article>
  `;
}

function renderInlineEmpty(text) {
  return `<div class="inline-empty">${escapeHtml(text)}</div>`;
}

function renderStreamingPanel(stream, elementId) {
  const label = stream?.phase === "thinking"
    ? uiWord("Thinking", "جارٍ التفكير")
    : uiWord("Draft", "مسودة حيّة");
  return `
    <section class="content-block">
      <p class="section-label">${escapeHtml(label)}</p>
      <pre class="stream-frame" id="${elementId}">${escapeHtml(stream?.text || "")}</pre>
    </section>
  `;
}

function renderFooter() {
  return `
    <footer class="site-footer">
      <p><span class="copyright-mark">&copy;</span> ${escapeHtml(read("footerBrand"))}. ${escapeHtml(read("footerText"))}</p>
    </footer>
  `;
}

function renderNotifications() {
  if (!runtime.notifications.length) {
    return "";
  }
  return `
    <div class="notify-stack" aria-live="polite" aria-atomic="true">
      ${runtime.notifications.map((item) => `<div class="notify notify--${item.kind}" role="status">${escapeHtml(item.message)}</div>`).join("")}
    </div>
  `;
}

function uiWord(en, ar) {
  return state.ui.lang === "ar" ? ar : en;
}

function dismissSampleNotice(key) {
  if (!key || !runtime.sampleNotices || !runtime.sampleNotices[key]) {
    return;
  }
  runtime.sampleNotices[key] = false;
  renderApp();
}

function inferReplyLanguage(text, fallback = state.ui.lang === "ar" ? "ar" : "en") {
  const source = String(text || "");
  const hasArabic = /[\u0600-\u06FF]/.test(source);
  const hasLatin = /[A-Za-z]/.test(source);
  if (hasArabic && !hasLatin) {
    return "ar";
  }
  if (hasLatin && !hasArabic) {
    return "en";
  }
  return fallback;
}

function effectiveReducedMotion() {
  const systemPrefersReducedMotion = typeof window !== "undefined"
    && typeof window.matchMedia === "function"
    && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return Boolean(state.ui.reducedMotion || systemPrefersReducedMotion);
}

function renderSettingsPanel() {
  if (runtime.panel !== "settings") {
    return "";
  }

  return `
    <div class="modal-overlay" id="settingsOverlay" role="presentation">
      <button class="modal-backdrop" id="settingsBackdrop" type="button" aria-label="${escapeHtml(uiWord("Close settings", "إغلاق الإعدادات"))}"></button>
      <section class="surface settings-panel settings-modal" id="settingsPanel" role="dialog" aria-modal="true" aria-labelledby="settingsTitle">
        <div class="settings-head">
          <h2 class="panel-title" id="settingsTitle">${escapeHtml(uiWord("Settings", "الإعدادات"))}</h2>
          <button class="icon-button modal-close" id="settingsClose" type="button" aria-label="${escapeHtml(uiWord("Close settings", "إغلاق الإعدادات"))}">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <section class="settings-section" aria-labelledby="settingsAccessibilityTitle">
          <p class="section-label" id="settingsAccessibilityTitle">${escapeHtml(uiWord("Accessibility", "إمكانية الوصول"))}</p>
          <div class="setting-stack">
            <div class="setting-row">
              <span class="muted-line">${escapeHtml(uiWord("Text size", "حجم النص"))}</span>
              <div class="segmented">
                ${[100, 112, 125].map((scale) => `
                  <button class="chip-button ${Number(state.ui.textScale) === scale ? "is-active" : ""}" data-text-scale="${scale}" type="button" aria-pressed="${Number(state.ui.textScale) === scale}">
                    ${scale}%
                  </button>
                `).join("")}
              </div>
            </div>
            <div class="setting-row">
              <button class="chip-button ${state.ui.readingMode ? "is-active" : ""}" id="toggleReadingMode" type="button" aria-pressed="${state.ui.readingMode}">
                ${escapeHtml(uiWord("Reading support", "وضع القراءة"))}
              </button>
              <button class="chip-button ${effectiveReducedMotion() ? "is-active" : ""}" id="toggleReducedMotion" type="button" aria-pressed="${effectiveReducedMotion()}">
                ${escapeHtml(uiWord("Reduce motion", "تقليل الحركة"))}
              </button>
            </div>
            ${runtime.speech.supported ? `
              <div class="setting-row">
                <button class="button button--soft ${state.ui.selectionReadEnabled ? "is-active" : ""}" id="speakCurrentPage" type="button" aria-pressed="${state.ui.selectionReadEnabled}">${escapeHtml(uiWord("Read selection", "قراءة التحديد"))}</button>
                <button class="button button--soft" id="stopSpeech" type="button">${escapeHtml(uiWord("Stop audio", "إيقاف الصوت"))}</button>
              </div>
            ` : ""}
            <div class="settings-hints">
              <p class="muted-line">${escapeHtml(uiWord("Press / to focus the main prompt on this page.", "اضغط / للانتقال إلى حقل الإدخال الأساسي."))}</p>
              <p class="muted-line">${escapeHtml(uiWord("Press Esc to close this panel.", "اضغط Esc لإغلاق هذه اللوحة."))}</p>
            </div>
          </div>
        </section>
      </section>
    </div>
  `;
}

function renderProjectInfoPanel() {
  if (runtime.panel !== "projectInfo") {
    return "";
  }

  const infoTitle = uiWord("Demo Info", "معلومات النسخة التجريبية");
  const infoLead = uiWord(
    "The demo site itself works properly. The main limitation is the shared free-tier API keys used on the public demo.",
    "الموقع التجريبي نفسه يعمل بشكل ممتاز، لكن المشكلة الأساسية هي حدود مفاتيح API المجانية المشتركة في النسخة العامة."
  );
  const infoHost = uiWord(
    "You can host the project yourself by following the README steps in this repository.",
    "تقدر تستضيف المشروع بنفسك باتباع الخطوات الموجودة في README داخل هذا المستودع."
  );
  const infoKeys = uiWord(
    "Then add your own paid API keys for the smoothest experience with these providers:",
    "بعدها أضف مفاتيح API المدفوعة الخاصة بك لتحصل على أفضل تجربة مع هذه الخدمات:"
  );
  const repoLabel = uiWord("Open Repository", "افتح المستودع");
  const closeLabel = uiWord("Close", "إغلاق");

  return `
    <div class="modal-overlay" id="projectInfoOverlay" role="presentation">
      <button class="modal-backdrop" id="projectInfoBackdrop" type="button" aria-label="${escapeHtml(closeLabel)}"></button>
      <section class="surface settings-panel settings-modal info-modal" id="projectInfoPanel" role="dialog" aria-modal="true" aria-labelledby="projectInfoTitle">
        <div class="settings-head">
          <h2 class="panel-title" id="projectInfoTitle">${escapeHtml(infoTitle)}</h2>
          <button class="icon-button modal-close" id="projectInfoClose" type="button" aria-label="${escapeHtml(closeLabel)}">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="info-copy">
          <p class="muted-line">${escapeHtml(infoLead)}</p>
          <p class="muted-line">${escapeHtml(infoHost)}</p>
          <a class="button button--soft info-link" href="${REPOSITORY_URL}" target="_blank" rel="noreferrer noopener">${escapeHtml(repoLabel)}</a>
          <div class="rail-divider"></div>
          <p class="muted-line">${escapeHtml(infoKeys)}</p>
          <div class="info-provider-list">
            ${AI_PROVIDER_NAMES.map((provider) => `<span class="provider-pill">${escapeHtml(provider)}</span>`).join("")}
          </div>
        </div>
      </section>
    </div>
  `;
}

function renderConfirmModal() {
  if (!runtime.confirm) {
    return "";
  }

  return `
    <div class="modal-overlay" id="confirmOverlay" role="presentation">
      <button class="modal-backdrop" id="confirmBackdrop" type="button" aria-label="${escapeHtml(uiWord("Cancel", "إلغاء"))}"></button>
      <section class="surface settings-panel settings-modal confirm-modal" role="alertdialog" aria-modal="true" aria-labelledby="confirmTitle" aria-describedby="confirmMessage">
        <div class="settings-head">
          <h2 class="panel-title" id="confirmTitle">${escapeHtml(runtime.confirm.title || uiWord("Confirm deletion", "تأكيد الحذف"))}</h2>
          <button class="icon-button modal-close" id="confirmClose" type="button" aria-label="${escapeHtml(uiWord("Close", "إغلاق"))}">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <p class="muted-line" id="confirmMessage">${escapeHtml(runtime.confirm.message || "")}</p>
        <div class="form-row">
          <button class="button button--soft" id="confirmCancel" type="button">${escapeHtml(uiWord("Cancel", "إلغاء"))}</button>
          <button class="button button--primary" id="confirmAccept" type="button">${escapeHtml(runtime.confirm.confirmLabel || uiWord("Delete", "حذف"))}</button>
        </div>
      </section>
    </div>
  `;
}

function renderInsightsSection() {
  const analytics = computeAnalytics();
  if (!analytics.hasData) {
    return `
      <section class="hero glass insights-hero insights-hero--empty">
        <p class="eyebrow">${escapeHtml(read("nav.insights"))}</p>
        <h1 class="page-title">${escapeHtml(uiWord("A cleaner study dashboard starts here.", "لوحة متابعة أنظف تبدأ من هنا."))}</h1>
        <p class="page-subtitle">${escapeHtml(uiWord("Generate and grade a few exams to unlock mastery trends, recurring weak areas, and recent activity in one place.", "أنشئ وصحّح بعض الاختبارات لعرض التقدم ونقاط الضعف المتكررة والنشاط الأخير في مكان واحد."))}</p>
      </section>
      <section class="insights-layout insights-layout--empty">
        <article class="surface insights-card">
          <p class="section-label">${escapeHtml(uiWord("What will appear here", "ما الذي سيظهر هنا"))}</p>
          <ul class="message-list">
            <li>${escapeHtml(uiWord("Overall mastery across graded exams", "نسبة الإتقان العامة عبر الاختبارات المصححة"))}</li>
            <li>${escapeHtml(uiWord("Subject-by-subject performance and momentum", "أداء كل مادة واتجاهها"))}</li>
            <li>${escapeHtml(uiWord("Recurring weak areas worth revisiting", "نقاط الضعف المتكررة التي تحتاج مراجعة"))}</li>
          </ul>
        </article>
        <article class="surface insights-card">
          <p class="section-label">${escapeHtml(uiWord("Fastest way to fill it", "أسرع طريقة لملئها"))}</p>
          <ul class="message-list">
            <li>${escapeHtml(uiWord("Open Exams and generate a practice test from text or PDF", "افتح الاختبارات وأنشئ اختبارًا تدريبيًا من نص أو PDF"))}</li>
            <li>${escapeHtml(uiWord("Answer it and press Grade", "أجب عنه ثم اضغط تصحيح"))}</li>
            <li>${escapeHtml(uiWord("Come back here to review the dashboard", "ارجع إلى هنا لمراجعة اللوحة"))}</li>
          </ul>
        </article>
      </section>
    `;
  }

  return `
    <section class="hero glass insights-hero">
      <p class="eyebrow">${escapeHtml(read("nav.insights"))}</p>
      <h1 class="page-title">${escapeHtml(uiWord("Study progress without the clutter.", "متابعة دراسية واضحة بلا فوضى."))}</h1>
      <p class="page-subtitle">${escapeHtml(uiWord("Track mastery, repeated weak areas, and recent work in one cleaner dashboard.", "تابع الإتقان ونقاط الضعف المتكررة وآخر نشاطك داخل لوحة واحدة أنظف."))}</p>
      <div class="insights-kpis">
        <article class="metric-card metric-card--hero">
          <span class="metric-label">${escapeHtml(uiWord("Mastery", "الإتقان"))}</span>
          <strong class="metric-value">${analytics.overallMastery}%</strong>
          <span class="metric-meta">${escapeHtml(uiWord("Across graded exams", "عبر الاختبارات المصححة"))}</span>
        </article>
        <article class="metric-card metric-card--hero">
          <span class="metric-label">${escapeHtml(uiWord("Graded exams", "الاختبارات المصححة"))}</span>
          <strong class="metric-value">${analytics.totalAttempts}</strong>
          <span class="metric-meta">${escapeHtml(uiWord("Stored attempts", "محاولات محفوظة"))}</span>
        </article>
        <article class="metric-card metric-card--hero">
          <span class="metric-label">${escapeHtml(uiWord("Active subjects", "المواد النشطة"))}</span>
          <strong class="metric-value">${analytics.activeSubjects}</strong>
          <span class="metric-meta">${escapeHtml(uiWord("Subjects with exam activity", "مواد فيها نشاط اختبارات"))}</span>
        </article>
      </div>
    </section>
    <section class="insights-layout">
      <article class="surface insights-card insights-card--wide">
        <div class="panel-header">
          <div>
            <p class="section-label">${escapeHtml(uiWord("Subject mastery", "إتقان المواد"))}</p>
            <h2 class="panel-title">${escapeHtml(uiWord("How each subject is moving", "كيف يتحرك أداء كل مادة"))}</h2>
          </div>
        </div>
        <div class="insights-subject-list">
          ${analytics.subjects.map((item) => `
            <article class="insights-subject-row">
              <div class="insights-subject-copy">
                <strong>${escapeHtml(item.subject)}</strong>
                <span>${escapeHtml(`${item.attempts} ${uiWord("attempts", "محاولات")} | ${formatDateLabel(item.lastSeen)}`)}</span>
              </div>
              <div class="insights-progress" aria-hidden="true"><span style="width:${item.mastery}%"></span></div>
              <strong class="insights-percent">${item.mastery}%</strong>
            </article>
          `).join("")}
        </div>
      </article>
      <article class="surface insights-card">
        <div class="panel-header">
          <div>
            <p class="section-label">${escapeHtml(uiWord("Weak areas", "نقاط تحتاج مراجعة"))}</p>
            <h2 class="panel-title">${escapeHtml(uiWord("What keeps going wrong", "ما الذي يتكرر خطؤه"))}</h2>
          </div>
        </div>
        ${analytics.weakAreas.length ? `
          <div class="insights-stack">
            ${analytics.weakAreas.map((item) => `
              <article class="insights-issue">
                <strong>${escapeHtml(item.label)}</strong>
                <span>${escapeHtml(`${item.subject} | ${item.count} ${uiWord("misses", "مرات صعبة")}`)}</span>
              </article>
            `).join("")}
          </div>
        ` : `<p class="muted-line">${escapeHtml(uiWord("No repeated weak areas yet.", "لا توجد نقاط ضعف متكررة حتى الآن."))}</p>`}
      </article>
      <article class="surface insights-card">
        <div class="panel-header">
          <div>
            <p class="section-label">${escapeHtml(uiWord("Recent activity", "النشاط الأخير"))}</p>
            <h2 class="panel-title">${escapeHtml(uiWord("Latest stored work", "آخر ما تم حفظه"))}</h2>
          </div>
        </div>
        ${analytics.recentActivity.length ? `
          <div class="insights-timeline">
            ${analytics.recentActivity.map((item) => `
              <article class="insights-activity">
                <strong>${escapeHtml(item.title || item.subject || uiWord("Study activity", "نشاط دراسي"))}</strong>
                <span>${escapeHtml(`${item.subject || uiWord("Study", "دراسة")} | ${formatDateLabel(item.timestamp)}`)}</span>
              </article>
            `).join("")}
          </div>
        ` : `<p class="muted-line">${escapeHtml(uiWord("No recent activity yet.", "لا يوجد نشاط حديث حتى الآن."))}</p>`}
      </article>
    </section>
    `;
}

function renderShell() {
  document.documentElement.lang = state.ui.lang === "ar" ? "ar" : "en";
  document.documentElement.dir = state.ui.lang === "ar" ? "rtl" : "ltr";
  document.documentElement.dataset.theme = state.ui.theme;
  document.documentElement.dataset.readingMode = state.ui.readingMode ? "true" : "false";
  document.documentElement.dataset.reduceMotion = effectiveReducedMotion() ? "true" : "false";
  document.documentElement.style.setProperty("--font-scale", String((Number(state.ui.textScale) || 100) / 100));
  document.title = `${read("brand")} | ${read(`nav.${page}`)}`;

  const navLinks = pages.map((item) => `
    <a class="nav-link" href="${item.href}" ${item.key === page ? 'aria-current="page"' : ""}>${escapeHtml(read(`nav.${item.key}`))}</a>
  `).join("");

  const mobileLinks = pages.map((item) => `
    <a class="mobile-link" href="${item.href}" ${item.key === page ? 'aria-current="page"' : ""}>
      <span>${item.icon}</span>
      <strong>${escapeHtml(read(`nav.${item.key}`))}</strong>
    </a>
  `).join("");
  const nextLanguageFlag = state.ui.lang === "en"
    ? { src: "palestine.svg", label: uiWord("Switch to Arabic", "التبديل إلى العربية") }
    : { src: "us.svg", label: uiWord("Switch to English", "التبديل إلى الإنجليزية") };

  document.getElementById("app").innerHTML = `
    <div class="site-shell">
      <a class="skip-link" href="#pageRoot">${escapeHtml(uiWord("Skip to content", "انتقل إلى المحتوى"))}</a>
      <div class="ambient ambient--left"></div>
      <div class="ambient ambient--right"></div>
      ${renderNotifications()}
      <header class="app-header glass">
        <a class="brand" href="index.html">
          <span class="brand-mark" aria-hidden="true">
            <img class="brand-mark-image" src="favicon.svg" alt="">
          </span>
          <span class="brand-copy">
            <strong class="brand-title">${escapeHtml(read("brand"))}</strong>
            <span class="brand-subtitle">${escapeHtml(read("brandSub"))}</span>
          </span>
        </a>
        <nav class="main-nav" aria-label="Main navigation">${navLinks}</nav>
        <div class="header-actions">
          <span class="status-pill" data-status="${state.api.aiEnabled ? "online" : "offline"}">
            <span class="status-dot"></span>
            <span>${escapeHtml(state.api.aiEnabled ? read("online") : read("offline"))}</span>
          </span>
          <button class="toggle-button toggle-button--icon" id="projectInfoToggle" type="button" aria-haspopup="dialog" aria-expanded="${runtime.panel === "projectInfo"}" aria-label="${escapeHtml(uiWord("Open demo info", "افتح معلومات النسخة التجريبية"))}">
            <i class="fa-solid fa-circle-question" aria-hidden="true"></i>
            <span class="sr-only">${escapeHtml(uiWord("Demo info", "معلومات النسخة التجريبية"))}</span>
          </button>
          <button class="toggle-button toggle-button--icon" id="settingsToggle" type="button" aria-haspopup="dialog" aria-expanded="${runtime.panel === "settings"}" aria-label="${escapeHtml(uiWord("Open settings", "افتح الإعدادات"))}">
            <i class="fa-solid fa-gear" aria-hidden="true"></i>
            <span class="sr-only">${escapeHtml(uiWord("Settings", "الإعدادات"))}</span>
          </button>
          <button class="toggle-button toggle-button--emoji" id="themeToggle" type="button" aria-label="${escapeHtml(state.ui.theme === "dark" ? uiWord("Switch to light mode", "التبديل إلى الوضع الفاتح") : uiWord("Switch to dark mode", "التبديل إلى الوضع الداكن"))}">
            <span aria-hidden="true">${state.ui.theme === "dark" ? "&#9728;" : "&#127769;"}</span>
          </button>
          <button class="toggle-button toggle-button--flag" id="langToggle" type="button" aria-label="${escapeHtml(nextLanguageFlag.label)}">
            <img class="flag-icon-img" src="${nextLanguageFlag.src}" alt="" aria-hidden="true" />
          </button>
        </div>
      </header>
      ${renderSettingsPanel()}
      ${renderProjectInfoPanel()}
      ${renderConfirmModal()}
      <main class="page" id="pageRoot" tabindex="-1"></main>
      ${renderFooter()}
      <nav class="mobile-nav glass" aria-label="Mobile navigation">${mobileLinks}</nav>
    </div>
  `;
}

function renderPageHead(title) {
  return `
    <section class="page-head">
      <h1 class="page-head-title">${escapeHtml(title)}</h1>
    </section>
  `;
}

function renderHomePage() {
  const section = homeText[state.ui.lang];
  return `
    <section class="hero glass hero--home">
      ${section.eyebrow ? `<p class="eyebrow">${escapeHtml(section.eyebrow)}</p>` : ""}
      <h1 class="page-title">${escapeHtml(section.title)}</h1>
      <p class="page-subtitle">${escapeHtml(section.subtitle)}</p>
      <div class="hero-actions hero-actions--bottom">
        <a class="button button--primary" href="${pageLink("tutor")}">${escapeHtml(section.primary)}</a>
        <a class="button button--soft" href="${pageLink("coding")}">${escapeHtml(section.secondary)}</a>
      </div>
    </section>
    <section class="page-grid page-grid--three">
      ${section.cards.map((card) => `
        <a class="surface card-shell card-shell--link" href="${pageLink(card.key)}">
          <p class="eyebrow">${escapeHtml(read(`nav.${card.key}`))}</p>
          <h2 class="panel-title">${escapeHtml(card.title)}</h2>
          <p class="muted-line">${escapeHtml(card.text)}</p>
        </a>
      `).join("")}
    </section>
  `;
}

function renderInsightsPage() {
  return renderInsightsSection();
}

function renderTutorTopicList() {
  const topics = sortByUpdated(state.tutor.topics);
  if (!topics.length) {
    return renderInlineEmpty(read("emptyTutor"));
  }

  return `
    <div class="topic-list">
      ${topics.map((topic) => `
        <div class="list-row ${topic.id === state.tutor.activeTopicId ? "is-active" : ""}">
          <button class="list-item" data-topic-id="${topic.id}" type="button">
            <strong>${escapeHtml(topic.title)}</strong>
            <span>${escapeHtml(new Date(topic.updatedAt).toLocaleDateString(state.ui.lang === "ar" ? "ar" : "en"))}</span>
          </button>
          <button class="list-delete" data-delete-topic="${topic.id}" type="button" aria-label="${escapeHtml(read("deleteChat"))}">&#10005;</button>
        </div>
      `).join("")}
    </div>
  `;
}

function renderTutorMessages() {
  const topic = activeTutorTopic();
  const messages = topic?.messages || [];
  const stream = runtime.typing.tutor && runtime.typing.tutor.contextId === topic?.id ? runtime.typing.tutor : null;
  if (!messages.length && !stream) {
    return renderInlineEmpty(read("emptyTutor"));
  }

  const parts = messages.map((message) => renderMessage(message));
  if (stream) {
    parts.push(renderMessage("assistant", "", {
      streaming: true,
      streamingId: "tutorStreamingText",
      text: stream.text,
      label: stream.phase === "thinking" ? uiWord("Thinking", "جارٍ التفكير") : read("brand")
    }));
  }
  return parts.join("");
}

function renderTutorComposer() {
  return `
    <form class="composer" id="tutorForm">
      <div class="composer-frame">
        <div class="composer-field">
          <textarea class="composer-input auto-grow" id="tutorPrompt" rows="1" aria-label="${escapeHtml(uiWord("Tutor prompt", "سؤال المعلم"))}" placeholder="${escapeHtml(read("tutor.placeholder"))}">${escapeHtml(state.tutor.draftText)}</textarea>
          <label class="attach-button attach-button--inside" for="tutorFile" aria-label="${escapeHtml(read("attach"))}">
            <i class="fa-solid fa-paperclip" aria-hidden="true"></i>
            <span class="sr-only">${escapeHtml(read("attach"))}</span>
          </label>
          <button class="composer-send" id="tutorSubmit" type="submit" ${(!state.api.aiEnabled || runtime.busy.tutor) ? "disabled" : ""} aria-label="${escapeHtml(read("send"))}">
            <i class="fa-solid fa-arrow-up" aria-hidden="true"></i>
            <span class="sr-only">${escapeHtml(read("send"))}</span>
          </button>
        </div>
        ${state.tutor.attachmentName ? `
          <div class="composer-strip">
            <span class="file-chip">${escapeHtml(state.tutor.attachmentName)}</span>
            <button class="micro-button" id="tutorRemoveFile" type="button">${escapeHtml(read("removeFile"))}</button>
          </div>
        ` : ""}
        <input id="tutorFile" type="file" accept=".pdf,.txt,.md,.json,.csv" hidden>
      </div>
    </form>
  `;
}

function renderTutorPage() {
  return `
    <section class="tool-layout tool-layout--chat">
      <aside class="surface rail">
        <div class="rail-head">
          <h2 class="panel-title">${escapeHtml(read("topics"))}</h2>
          <button class="icon-button icon-button--plus" id="tutorNewTopic" type="button" aria-label="${escapeHtml(read("newTopic"))}">+</button>
        </div>
        <div class="rail-divider"></div>
        <div class="rail-body">${renderTutorTopicList()}</div>
      </aside>
      <section class="surface chat-panel" aria-busy="${runtime.busy.tutor}">
        <div class="chat-scroll" id="tutorChatScroll">${renderTutorMessages()}</div>
        ${renderTutorComposer()}
      </section>
    </section>
  `;
}

function renderCodingSessionList() {
  const sessions = sortByUpdated(state.coding.sessions);
  if (!sessions.length) {
    return renderInlineEmpty(read("emptyCoding"));
  }

  return `
    <div class="topic-list">
      ${sessions.map((session) => `
        <div class="list-row ${session.id === state.coding.activeSessionId ? "is-active" : ""}">
          <button class="list-item" data-session-id="${session.id}" type="button">
            <strong>${escapeHtml(session.title)}</strong>
            <span>${escapeHtml(session.lastLanguage || "Code")}</span>
          </button>
          <button class="list-delete" data-delete-session="${session.id}" type="button" aria-label="${escapeHtml(read("deleteChat"))}">&#10005;</button>
        </div>
      `).join("")}
    </div>
  `;
}

function renderCodingMessages() {
  const session = activeCodingSession();
  const messages = session?.messages || [];
  const stream = runtime.typing.coding && runtime.typing.coding.contextId === session?.id ? runtime.typing.coding : null;

  if (!messages.length && !stream) {
    return renderInlineEmpty(read("emptyCoding"));
  }

  const parts = messages.map((message) => renderMessage(message));
  if (stream) {
    parts.push(renderMessage("assistant", "", {
      streaming: true,
      streamingId: "codingStreamingText",
      text: stream.text,
      label: stream.phase === "thinking" ? uiWord("Thinking", "جارٍ التفكير") : read("brand")
    }));
  }

  return parts.join("");
}

function renderCodingModeButtons() {
  const modes = read("coding.modes");
  return `
    <div class="segmented">
      ${["write", "edit", "debug", "review"].map((mode) => `
        <button class="chip-button ${state.coding.composer.mode === mode ? "is-active" : ""}" data-coding-mode="${mode}" type="button" aria-pressed="${state.coding.composer.mode === mode}">${escapeHtml(modes[mode])}</button>
      `).join("")}
    </div>
  `;
}

function codingPromptPlaceholder(mode) {
  switch (mode) {
    case "edit":
      return uiWord("Describe what you want to be edited...", "اشرح ما الذي تريد تعديله...");
    case "debug":
      return uiWord("Describe the bug or what you want debugged...", "اشرح المشكلة أو ما الذي تريد تصحيحه...");
    case "review":
      return uiWord("Describe what you want reviewed...", "اشرح ما الذي تريد مراجعته...");
    default:
      return uiWord("Describe what you want to be built...", "اشرح ما الذي تريد بناءه...");
  }
}

function renderCodingComposer() {
  const mode = state.coding.composer.mode;
  const showCode = mode !== "write";
  return `
    <form class="composer composer--coding" id="codingForm">
      <div class="composer-frame">
        <div class="composer-topbar">
          ${renderCodingModeButtons()}
        </div>
        <div class="composer-field">
          <textarea class="composer-input auto-grow" id="codingPrompt" rows="1" aria-label="${escapeHtml(uiWord("Coding prompt", "طلب البرمجة"))}" placeholder="${escapeHtml(read("coding.placeholder"))}">${escapeHtml(state.coding.composer.prompt)}</textarea>
          <label class="attach-button attach-button--inside" for="codingFile" aria-label="${escapeHtml(read("attach"))}">
            <i class="fa-solid fa-paperclip" aria-hidden="true"></i>
            <span class="sr-only">${escapeHtml(read("attach"))}</span>
          </label>
          <button class="composer-send" id="codingSubmit" type="submit" ${(!state.api.aiEnabled || runtime.busy.coding) ? "disabled" : ""} aria-label="${escapeHtml(read("send"))}">
            <i class="fa-solid fa-arrow-up" aria-hidden="true"></i>
            <span class="sr-only">${escapeHtml(read("send"))}</span>
          </button>
        </div>
        ${showCode ? `<textarea class="composer-code auto-grow" id="codingCode" rows="10" aria-label="${escapeHtml(uiWord("Current code", "الكود الحالي"))}" placeholder="${escapeHtml(read("coding.codePlaceholder"))}">${escapeHtml(state.coding.composer.code)}</textarea>` : ""}
        ${state.coding.attachmentName ? `
          <div class="composer-strip">
            <span class="file-chip">${escapeHtml(state.coding.attachmentName)}</span>
            <button class="micro-button" id="codingRemoveFile" type="button">${escapeHtml(read("removeFile"))}</button>
          </div>
        ` : ""}
        <input id="codingFile" type="file" accept=".js,.ts,.tsx,.jsx,.py,.java,.cpp,.c,.cs,.php,.rb,.go,.rs,.html,.css,.json,.txt,.md" hidden>
      </div>
    </form>
  `;
}

function renderCodingPage() {
  return `
    <section class="tool-layout tool-layout--chat">
      <aside class="surface rail">
        <div class="rail-head">
          <h2 class="panel-title">${escapeHtml(read("sessions"))}</h2>
          <button class="icon-button icon-button--plus" id="codingNewSession" type="button" aria-label="${escapeHtml(read("newSession"))}">+</button>
        </div>
        <div class="rail-divider"></div>
        <div class="rail-body">${renderCodingSessionList()}</div>
      </aside>
      <section class="surface chat-panel" aria-busy="${runtime.busy.coding}">
        <div class="chat-scroll" id="codingChatScroll">${renderCodingMessages()}</div>
        ${renderCodingComposer()}
      </section>
    </section>
  `;
}

function renderNotesResult() {
  if (runtime.typing.notes) {
    return renderStreamingPanel(runtime.typing.notes, "notesStreamingText");
  }

  const analysis = state.notes.analysis;
  if (!analysis) {
    return renderInlineEmpty(read("emptyNotes"));
  }

  const subject = analysis.subject || detectSubject(state.notes.sourceText);
  const title = analysis.title || "";
  return `
    ${(subject || title) ? `
      <section class="content-block">
        ${subject ? `<p class="eyebrow">${escapeHtml(subject)}</p>` : ""}
        ${title ? `<h2 class="panel-title">${escapeHtml(title)}</h2>` : ""}
        <div class="text-flow">
          <p class="section-label">${escapeHtml(read("notes.summary"))}</p>
          <ul class="message-list">${(analysis.summary || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </div>
      </section>
    ` : ""}
    ${!(subject || title) ? `
      <section class="content-block">
        <div class="text-flow">
          <p class="section-label">${escapeHtml(read("notes.summary"))}</p>
          <ul class="message-list">${(analysis.summary || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </div>
      </section>
    ` : ""}
    ${(analysis.key_terms || []).length ? `
      <section class="content-block">
        <p class="section-label">${escapeHtml(read("notes.terms"))}</p>
        <div class="mini-grid">
          ${analysis.key_terms.map((item) => `
            <article class="mini-card">
              <strong>${escapeHtml(item.term)}</strong>
              <p>${escapeHtml(item.definition)}</p>
            </article>
          `).join("")}
        </div>
      </section>
    ` : ""}
    ${(analysis.quiz_prompts || []).length ? `
      <section class="content-block">
        <p class="section-label">${escapeHtml(read("notes.prompts"))}</p>
        <ul class="message-list">${analysis.quiz_prompts.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </section>
    ` : ""}
    ${(analysis.next_steps || []).length ? `
      <section class="content-block">
        <p class="section-label">${escapeHtml(read("notes.next"))}</p>
        <ul class="message-list">${analysis.next_steps.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </section>
    ` : ""}
  `;
}

function renderStoredTabs(items, activeId, options) {
  const ordered = sortByUpdated(items);
  return `
    <div class="rail-head">
      <h2 class="panel-title">${escapeHtml(options.label)}</h2>
      <button class="icon-button icon-button--plus" id="${options.newButtonId}" type="button" aria-label="${escapeHtml(options.newLabel)}">+</button>
    </div>
    <div class="rail-divider"></div>
    <div class="planner-plan-strip planner-plan-strip--compact" role="tablist" aria-label="${escapeHtml(options.label)}">
      ${ordered.map((item) => `
        <div class="planner-plan-card ${item.id === activeId ? "is-active" : ""}">
          <button class="planner-plan-main" ${options.selectAttr}="${item.id}" type="button" role="tab" aria-selected="${item.id === activeId}">
            <strong>${escapeHtml(item.title)}</strong>
            <span>${escapeHtml(options.meta(item))}</span>
          </button>
          <button class="planner-plan-delete" ${options.deleteAttr}="${item.id}" type="button" aria-label="${escapeHtml(options.deleteLabel)}">&times;</button>
        </div>
      `).join("")}
    </div>
  `;
}

function renderNotesTabs() {
  return renderStoredTabs(state.notes.documents, state.notes.activeDocumentId, {
    label: uiWord("Notes", "الملاحظات"),
    selectAttr: "data-note-id",
    deleteAttr: "data-delete-note",
    newButtonId: "notesNewDocument",
    newLabel: uiWord("New note", "ملاحظة جديدة"),
    deleteLabel: uiWord("Delete note", "حذف الملاحظة"),
    meta: (record) => record.analysis
      ? (formatDateLabel(record.updatedAt) || uiWord("Ready", "جاهزة"))
      : (record.fileName
        ? `${record.fileName.split(".").pop()?.toUpperCase() || uiWord("Draft", "مسودة")} | ${formatDateLabel(record.updatedAt) || uiWord("Draft", "مسودة")}`
        : uiWord("Draft", "مسودة"))
  });
}

function renderNotesPage() {
  return `
    <section class="tool-layout">
      <article class="surface editor-panel">
        ${renderNotesTabs()}
        <form class="stack-form" id="notesForm">
          <textarea class="editor-area" id="notesText" rows="18" aria-label="${escapeHtml(uiWord("Notes input", "نص الملاحظات"))}" placeholder="${escapeHtml(read("notes.placeholder"))}">${escapeHtml(state.notes.sourceText)}</textarea>
          <div class="form-row">
            <select id="notesLanguage" aria-label="${escapeHtml(uiWord("Notes response language", "لغة الرد في الملاحظات"))}">
              <option value="bilingual" ${state.notes.language === "bilingual" ? "selected" : ""}>Arabic + English</option>
              <option value="ar" ${state.notes.language === "ar" ? "selected" : ""}>العربية</option>
              <option value="en" ${state.notes.language === "en" ? "selected" : ""}>English</option>
            </select>
            <label class="attach-button" for="notesFile">${escapeHtml(read("upload"))}</label>
            <input id="notesFile" type="file" accept=".pdf,.txt,.md,.json,.csv" hidden>
            <button class="button button--primary" id="notesSubmit" type="submit" ${(!state.api.aiEnabled || runtime.busy.notes) ? "disabled" : ""}>${escapeHtml(read("analyze"))}</button>
          </div>
          <p class="muted-line">${escapeHtml(state.notes.fileName || read("notes.fileHint"))}</p>
        </form>
      </article>
      <article class="surface output-panel" aria-busy="${runtime.busy.notes}">
        ${renderNotesResult()}
      </article>
    </section>
  `;
}

function renderQuestionCards() {
  return state.quiz.questions.map((question, questionIndex) => `
    <article class="question-card">
      <h3 class="question-prompt">${questionIndex + 1}. ${escapeHtml(question.prompt)}</h3>
      <div class="option-list">
        ${(question.options || []).map((option, optionIndex) => {
          const correct = state.quiz.score && optionIndex === question.answer_index ? " option--correct" : "";
          const wrong = state.quiz.score && question.userAnswer === optionIndex && question.userAnswer !== question.answer_index ? " option--wrong" : "";
          return `
            <label class="option${correct}${wrong}">
              <input type="radio" name="quiz-${questionIndex}" value="${optionIndex}" ${question.userAnswer === optionIndex ? "checked" : ""}>
              <span>${escapeHtml(option)}</span>
            </label>
          `;
        }).join("")}
      </div>
      ${state.quiz.score ? `<p class="muted-line">${escapeHtml(question.explanation)}</p>` : ""}
    </article>
  `).join("");
}

function renderQuizResult() {
  if (!state.quiz.questions.length) {
    return renderInlineEmpty(read("emptyExams"));
  }

  const weakAreas = state.quiz.score
    ? [...new Set(
      state.quiz.questions
        .filter((question) => question.userAnswer !== null && question.userAnswer !== question.answer_index)
        .map((question) => deriveWeakAreaLabel(question, state.quiz.subject || detectSubject(state.quiz.sourceText)))
    )].slice(0, 4)
    : [];
  const subject = state.quiz.subject || detectSubject(state.quiz.sourceText);
  const title = state.quiz.title || "";

  return `
    ${(subject || title || state.quiz.instructions) ? `
      <section class="content-block">
        ${subject ? `<p class="eyebrow">${escapeHtml(subject)}</p>` : ""}
        ${title ? `<h2 class="panel-title">${escapeHtml(title)}</h2>` : ""}
        ${state.quiz.instructions ? `<p class="muted-line">${escapeHtml(state.quiz.instructions)}</p>` : ""}
      </section>
    ` : ""}
    <section class="content-block">
      <div class="question-stack">
        ${renderQuestionCards()}
      </div>
    </section>
    ${state.quiz.score ? `
      <section class="content-block">
        <div class="score-chip">${escapeHtml(`${state.ui.lang === "ar" ? "النتيجة" : "Score"}: ${state.quiz.score.score}/${state.quiz.score.total}`)}</div>
      </section>
    ` : ""}
    ${weakAreas.length ? `
      <section class="content-block">
        <p class="section-label">${escapeHtml(uiWord("Weak areas to revisit", "مناطق تحتاج مراجعة"))}</p>
        <ul class="message-list">${weakAreas.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </section>
    ` : ""}
  `;
}

function renderExamTabs() {
  return renderStoredTabs(state.quiz.exams, state.quiz.activeExamId, {
    label: uiWord("Exams", "الاختبارات"),
    selectAttr: "data-exam-id",
    deleteAttr: "data-delete-exam",
    newButtonId: "quizNewExam",
    newLabel: uiWord("New exam", "اختبار جديد"),
    deleteLabel: uiWord("Delete exam", "حذف الاختبار"),
    meta: (record) => {
      if (record.score) {
        return uiWord(`Score ${record.score.score}/${record.score.total}`, `النتيجة ${record.score.score}/${record.score.total}`);
      }
      if (record.questions?.length) {
        return `${record.questions.length} ${uiWord("questions", "أسئلة")} | ${formatDateLabel(record.updatedAt) || uiWord("Ready", "جاهزة")}`;
      }
      if (record.sourceText || record.fileName) {
        return formatDateLabel(record.updatedAt) || uiWord("Draft", "مسودة");
      }
      return uiWord("Draft", "مسودة");
    }
  });
}

function renderQuizPage() {
  return `
    <section class="tool-layout">
      <article class="surface editor-panel">
        ${renderExamTabs()}
        <form class="stack-form" id="quizForm">
          <div class="segmented">
            <button class="chip-button ${state.quiz.sourceMode === "text" ? "is-active" : ""}" data-source-mode="text" type="button" aria-pressed="${state.quiz.sourceMode === "text"}">${escapeHtml(read("quiz.text"))}</button>
            <button class="chip-button ${state.quiz.sourceMode === "pdf" ? "is-active" : ""}" data-source-mode="pdf" type="button" aria-pressed="${state.quiz.sourceMode === "pdf"}">${escapeHtml(read("quiz.pdf"))}</button>
          </div>
          <div class="form-row form-row--compact">
            <input id="quizCount" type="number" min="1" max="30" value="${escapeHtml(state.quiz.count)}" aria-label="${escapeHtml(uiWord("Question count", "عدد الأسئلة"))}" placeholder="${escapeHtml(read("count"))}">
            <select id="quizDifficulty" aria-label="${escapeHtml(uiWord("Exam difficulty", "مستوى الصعوبة"))}">
              <option value="easy" ${state.quiz.difficulty === "easy" ? "selected" : ""}>${state.ui.lang === "ar" ? "سهل" : "Easy"}</option>
              <option value="medium" ${state.quiz.difficulty === "medium" ? "selected" : ""}>${state.ui.lang === "ar" ? "متوسط" : "Medium"}</option>
              <option value="hard" ${state.quiz.difficulty === "hard" ? "selected" : ""}>${state.ui.lang === "ar" ? "صعب" : "Hard"}</option>
            </select>
            <select id="quizOutputLanguage" aria-label="${escapeHtml(uiWord("Exam output language", "لغة الاختبار"))}">
              <option value="bilingual" ${state.quiz.outputLanguage === "bilingual" ? "selected" : ""}>${escapeHtml(uiWord("Arabic + English", "العربية + الإنجليزية"))}</option>
              <option value="ar" ${state.quiz.outputLanguage === "ar" ? "selected" : ""}>${escapeHtml(uiWord("Arabic only", "العربية فقط"))}</option>
              <option value="en" ${state.quiz.outputLanguage === "en" ? "selected" : ""}>${escapeHtml(uiWord("English only", "الإنجليزية فقط"))}</option>
            </select>
          </div>
          ${state.quiz.sourceMode === "text" ? `
            <textarea class="editor-area" id="quizSource" rows="16" aria-label="${escapeHtml(uiWord("Exam source text", "نص مصدر الاختبار"))}" placeholder="${escapeHtml(read("quiz.textPlaceholder"))}">${escapeHtml(state.quiz.sourceText || state.notes.analysis?.summary?.join("\n") || "")}</textarea>
          ` : `
            <div class="upload-panel">
              <label class="attach-button" for="quizFile">${escapeHtml(read("upload"))}</label>
              <input id="quizFile" type="file" accept=".pdf" hidden>
              <p class="muted-line">${escapeHtml(state.quiz.fileName || read("quiz.fileHint"))}</p>
            </div>
          `}
          <div class="form-row">
            <button class="button button--primary" id="quizGenerate" type="submit" ${(!state.api.aiEnabled || runtime.busy.quiz) ? "disabled" : ""}>${escapeHtml(read("generate"))}</button>
            <button class="button button--soft" id="quizGrade" type="button" ${!state.quiz.questions.length || state.quiz.score ? "disabled" : ""}>${escapeHtml(read("grade"))}</button>
          </div>
        </form>
      </article>
      <article class="surface output-panel" aria-busy="${runtime.busy.quiz}">
        ${renderQuizResult()}
      </article>
    </section>
  `;
}

function plannerPlanMeta(plan) {
  if (!plan?.plan) {
    return uiWord("Draft", "مسودة");
  }
  return formatDateLabel(plan.updatedAt) || uiWord("Ready", "جاهزة");
}

function renderPlannerTabs() {
  const plans = sortByUpdated(state.planner.plans);
  return `
    <div class="rail-head">
      <h2 class="panel-title">${escapeHtml(uiWord("Plans", "الخطط"))}</h2>
      <button class="icon-button icon-button--plus" id="plannerNewPlan" type="button" aria-label="${escapeHtml(uiWord("New plan", "خطة جديدة"))}">+</button>
    </div>
    <div class="rail-divider"></div>
    <div class="planner-plan-strip" role="tablist" aria-label="${escapeHtml(uiWord("Plans", "الخطط"))}">
      ${plans.map((plan) => `
        <div class="planner-plan-card ${plan.id === state.planner.activePlanId ? "is-active" : ""}">
          <button class="planner-plan-main" data-plan-id="${plan.id}" type="button" role="tab" aria-selected="${plan.id === state.planner.activePlanId}">
            <strong>${escapeHtml(plan.title)}</strong>
            <span>${escapeHtml(plannerPlanMeta(plan))}</span>
          </button>
          <button class="planner-plan-delete" data-delete-plan="${plan.id}" type="button" aria-label="${escapeHtml(uiWord("Delete plan", "حذف الخطة"))}">&times;</button>
        </div>
      `).join("")}
    </div>
  `;
}

function renderPlannerResult() {
  const planRecord = activePlannerPlan();
  const stream = runtime.typing.planner && runtime.typing.planner.contextId === planRecord?.id ? runtime.typing.planner : null;

  if (stream) {
    return renderStreamingPanel(stream, "plannerStreamingText");
  }

  if (!planRecord?.plan) {
    return renderInlineEmpty(read("emptyPlanner"));
  }

  return `
    <section class="content-block">
      <p class="muted-line">${escapeHtml(planRecord.plan.overview)}</p>
    </section>
    ${(planRecord.plan.advice || []).length ? `
      <section class="content-block">
        <ul class="message-list">${planRecord.plan.advice.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </section>
    ` : ""}
    <section class="content-block planner-days">
      <div class="mini-grid">
        ${(planRecord.plan.days || []).map((day) => `
          <article class="mini-card mini-card--day">
            <strong>${escapeHtml(day.day_label)}</strong>
            <p class="mini-card-title">${escapeHtml(day.focus)}</p>
            <div class="block-list">
              ${(day.blocks || []).map((block) => `
                <div class="block-item">
                  <strong>${escapeHtml(block.label)}</strong>
                  <span>${escapeHtml(block.duration)}</span>
                  <p>${escapeHtml(block.goal)}</p>
                </div>
              `).join("")}
            </div>
          </article>
        `).join("")}
      </div>
    </section>
    <section class="content-block">
      <form class="stack-form" id="plannerEditForm">
        <textarea id="plannerEditRequest" rows="5" aria-label="${escapeHtml(uiWord("Plan edit request", "طلب تعديل الخطة"))}" placeholder="${escapeHtml(read("planner.editPlaceholder"))}">${escapeHtml(planRecord.editRequest)}</textarea>
        <div class="form-row">
          <button class="button button--soft" id="plannerEditSubmit" type="submit" ${(!state.api.aiEnabled || runtime.busy.planner) ? "disabled" : ""}>${escapeHtml(read("askEdit"))}</button>
        </div>
      </form>
    </section>
  `;
}

function renderPlannerPage() {
  const planRecord = activePlannerPlan() || state.planner.plans[0] || null;
  const lastInput = planRecord?.lastInput || defaultPlannerInput();
  return `
    <section class="tool-layout planner-layout">
      <article class="surface editor-panel planner-editor-panel">
        ${renderPlannerTabs()}
        <form class="stack-form" id="plannerForm">
          <input id="plannerSubjects" type="text" aria-label="${escapeHtml(uiWord("Subjects", "المواد"))}" value="${escapeHtml(lastInput.subjectsText)}" placeholder="${escapeHtml(read("planner.subjectsPlaceholder"))}">
          <div class="form-row form-row--compact">
            <input id="plannerStartDate" type="date" aria-label="${escapeHtml(uiWord("Start date", "تاريخ البداية"))}" value="${escapeHtml(lastInput.startDate)}">
            <input id="plannerEndDate" type="date" aria-label="${escapeHtml(uiWord("End date", "تاريخ النهاية"))}" value="${escapeHtml(lastInput.endDate)}">
            <input id="plannerHours" type="number" min="1" max="10" aria-label="${escapeHtml(uiWord("Hours per day", "الساعات اليومية"))}" value="${escapeHtml(lastInput.hoursPerDay)}" placeholder="${escapeHtml(read("hours"))}">
          </div>
          <textarea id="plannerGoal" rows="10" aria-label="${escapeHtml(uiWord("Study goal", "هدف الدراسة"))}" placeholder="${escapeHtml(read("planner.goalPlaceholder"))}">${escapeHtml(lastInput.goal)}</textarea>
          <div class="form-row">
            <button class="button button--primary" id="plannerGenerate" type="submit" ${(!state.api.aiEnabled || runtime.busy.planner) ? "disabled" : ""}>${escapeHtml(read("generate"))}</button>
          </div>
        </form>
      </article>
      <article class="surface output-panel planner-output-panel" aria-busy="${runtime.busy.planner}">
        <div class="planner-result-scroll">
          ${renderPlannerResult()}
        </div>
      </article>
    </section>
  `;
}

function renderImagesResult() {
  if (runtime.busy.images) {
    const progress = runtime.imagesProgress || {};
    const providerLabel = progress.currentProviderLabel || uiWord("AI provider", "مزود الذكاء");
    const providerAttempt = progress.currentProviderAttempt || "";
    const attempts = Array.isArray(progress.attempts) ? progress.attempts.slice(-3) : [];
    return `
      <section class="content-block">
        <p class="muted-line"><strong>${escapeHtml(uiWord("Generating image...", "جارٍ إنشاء الصورة..."))}</strong></p>
        <p class="muted-line">${escapeHtml(uiWord(`Trying ${providerLabel}.`, `تجربة ${providerLabel}.`))}</p>
        ${providerAttempt ? `<p class="muted-line">${escapeHtml(uiWord(`Current attempt: ${providerAttempt}`, `المحاولة الحالية: ${providerAttempt}`))}</p>` : ""}
        ${attempts.length ? `
          <p class="muted-line">${escapeHtml(uiWord("Recent provider updates:", "آخر تحديثات المزود:"))}</p>
          <div class="stack-form stack-form--compact">
            ${attempts.map((attempt) => {
              const attemptLabel = attempt.providerAttempt
                ? `${attempt.providerLabel || attempt.provider || "Provider"} (${attempt.providerAttempt})`
                : (attempt.providerLabel || attempt.provider || "Provider");
              return `<p class="muted-line">${escapeHtml(`${attemptLabel}${attempt.status ? ` [${attempt.status}]` : ""}: ${attempt.message || ""}`)}</p>`;
            }).join("")}
          </div>
        ` : ""}
      </section>
    `;
  }

  if (!state.images.result) {
    return renderInlineEmpty(read("emptyImages"));
  }

  const resultTitle = state.images.result.providerLabel
    ? uiWord(`Generated with ${state.images.result.providerLabel}`, `تم الإنشاء باستخدام ${state.images.result.providerLabel}`)
    : uiWord("Generated image", "الصورة المُنشأة");

  return `
    <section class="content-block">
      <div class="image-preview-frame">
        <div class="image-preview-head">
          <p class="section-label image-preview-title">${escapeHtml(resultTitle)}</p>
        </div>
        <div class="image-preview-media">
          <img class="image-preview" src="${state.images.result.imageDataUrl}" alt="Generated image">
        </div>
      </div>
    </section>
    <section class="content-block">
      <div class="form-row">
        <button class="button button--soft" id="imagesDownload" type="button">${escapeHtml(uiWord("Download", "تنزيل"))}</button>
      </div>
    </section>
    ${state.images.result.providerLabel ? `
      <section class="content-block">
        <p class="muted-line">${escapeHtml(uiWord(`Generated with ${state.images.result.providerLabel}.`, `تم الإنشاء باستخدام ${state.images.result.providerLabel}.`))}</p>
      </section>
    ` : ""}
    ${state.images.result.caption ? `
      <section class="content-block">
        <p class="muted-line">${escapeHtml(state.images.result.caption)}</p>
      </section>
    ` : ""}
  `;
}

function renderImagesPage() {
  const last = state.images.lastInput;
  return `
    <section class="tool-layout">
      <article class="surface editor-panel">
        <form class="stack-form" id="imagesForm">
          <textarea class="editor-area" id="imagesPrompt" rows="12" aria-label="${escapeHtml(uiWord("Image prompt", "طلب الصورة"))}" placeholder="${escapeHtml(read("images.placeholder"))}">${escapeHtml(last.prompt)}</textarea>
          <p class="muted-line">${escapeHtml(uiWord("Highest-quality route is selected automatically.", "يتم اختيار أفضل مسار جودة تلقائيًا."))}</p>
          <div class="form-row form-row--compact">
            <select id="imagesAspectRatio" aria-label="${escapeHtml(uiWord("Image aspect ratio", "نسبة أبعاد الصورة"))}">
              ${["1:1", "4:3", "3:4", "16:9", "9:16"].map((ratio) => `<option value="${ratio}" ${last.aspectRatio === ratio ? "selected" : ""}>${ratio}</option>`).join("")}
            </select>
          </div>
          <div class="form-row">
            <button class="button button--primary" id="imagesSubmit" type="submit" ${(!state.api.aiEnabled || runtime.busy.images) ? "disabled" : ""}>${escapeHtml(read("generate"))}</button>
            <button class="button button--soft" id="imagesClear" type="button">${escapeHtml(read("clear"))}</button>
            <button class="button button--soft" id="imagesDownloadToolbar" type="button" ${(!state.images.result?.imageDataUrl || runtime.busy.images) ? "disabled" : ""}>${escapeHtml(uiWord("Download", "تنزيل"))}</button>
          </div>
        </form>
      </article>
      <article class="surface output-panel" aria-busy="${runtime.busy.images}">
        ${renderImagesResult()}
      </article>
    </section>
  `;
}

function setPageContent() {
  const root = document.getElementById("pageRoot");
  switch (page) {
    case "home":
      root.innerHTML = renderHomePage();
      break;
    case "tutor":
      root.innerHTML = renderTutorPage();
      break;
    case "coding":
      root.innerHTML = renderCodingPage();
      break;
    case "notes":
      root.innerHTML = renderNotesPage();
      break;
    case "quiz":
      root.innerHTML = renderQuizPage();
      break;
    case "planner":
      root.innerHTML = renderPlannerPage();
      break;
    case "insights":
      root.innerHTML = renderInsightsPage();
      break;
    case "images":
      root.innerHTML = renderImagesPage();
      break;
    case "cv":
      root.innerHTML = renderCvPage();
      break;
    case "ieee":
      root.innerHTML = renderIeeePage();
      break;
    default:
      root.innerHTML = renderHomePage();
      break;
  }
}

async function fetchStatus() {
  const controller = typeof AbortController !== "undefined" ? new AbortController() : null;
  const timeoutId = controller ? setTimeout(() => controller.abort(), 3500) : null;
  try {
    const response = await fetch("/api/status", {
      cache: "no-store",
      ...(controller ? { signal: controller.signal } : {})
    });
    const data = await response.json();
    if (response.ok) {
      state.api.aiEnabled = Boolean(data.aiEnabled);
      state.api.defaultModel = data.defaultModel || state.api.defaultModel;
      state.api.codingModel = data.codingModel || state.api.codingModel;
      persist();
    }
  } catch {
    state.api.aiEnabled = false;
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
}

async function requestAI(task, payload) {
  const response = await fetch("/api/ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task, payload })
  });
  const data = await response.json();
  if (!response.ok || !data.ok) {
    throw new Error(data.error || "AI request failed.");
  }
  if (data.notificationCode) {
    notify(read(data.notificationCode), data.notificationKind || "info");
  } else if (data.notification) {
    notify(data.notification, data.notificationKind || "info");
  }
  return data.result;
}

async function createImageJob(payload) {
  const response = await fetch("/api/image-jobs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ payload })
  });
  const data = await response.json();
  if (!response.ok || !data.ok || !data.job?.id) {
    throw new Error(data.error || "Could not start image generation.");
  }
  return data.job;
}

async function fetchImageJob(jobId) {
  const response = await fetch(`/api/image-jobs/${encodeURIComponent(jobId)}`, {
    cache: "no-store"
  });
  const data = await response.json();
  if (!response.ok || !data.ok || !data.job) {
    throw new Error(data.error || "Could not read image generation status.");
  }
  return data.job;
}

async function waitForImageJob(jobId) {
  while (true) {
    const job = await fetchImageJob(jobId);
    runtime.imagesProgress = job;
    renderApp();
    if (job.status === "completed") {
      return job;
    }
    if (job.status === "failed") {
      throw new Error(job.error || "Image generation failed.");
    }
    await new Promise((resolve) => setTimeout(resolve, 900));
  }
}

function stripSpeechMarkup(text) {
  return String(text || "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[#>*_`-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getSelectedSpeechText() {
  const active = document.activeElement;
  if ((active instanceof HTMLTextAreaElement || active instanceof HTMLInputElement)
    && typeof active.selectionStart === "number"
    && typeof active.selectionEnd === "number"
    && active.selectionStart !== active.selectionEnd) {
    return normalizeSpeechSelectionText(active.value.slice(active.selectionStart, active.selectionEnd));
  }
  return normalizeSpeechSelectionText(window.getSelection?.().toString() || "");
}

function rememberSpeechSelection() {
  const text = getSelectedSpeechText();
  if (text) {
    if (text !== runtime.speech.selectionText) {
      runtime.speech.lastSpokenText = "";
    }
    runtime.speech.selectionText = text;
    scheduleSelectionSpeech(text);
  }
}

function inferSpeechLocale(text) {
  return /[\u0600-\u06FF]/.test(text) ? "ar" : "en-US";
}

function pickSpeechVoice(locale) {
  if (!runtime.speech.supported) {
    return null;
  }
  const wantedLanguage = String(locale || "en-US").toLowerCase();
  const primaryLanguage = wantedLanguage.split("-")[0];
  const voices = window.speechSynthesis.getVoices();
  return voices.find((voice) => String(voice.lang || "").toLowerCase() === wantedLanguage)
    || voices.find((voice) => String(voice.lang || "").toLowerCase().startsWith(`${primaryLanguage}-`))
    || voices.find((voice) => String(voice.lang || "").toLowerCase() === primaryLanguage)
    || voices.find((voice) => voice.default)
    || voices[0]
    || null;
}

function decodeTextFragmentSelection(value) {
  const source = String(value || "").trim();
  if (!source.includes("#:~:text=")) {
    return source;
  }
  try {
    const fragment = source.split("#:~:text=")[1]?.split("&")[0] || "";
    const decoded = decodeURIComponent(fragment.replace(/\+/g, "%20"));
    const cleaned = decoded
      .split(",")
      .map((item) => item.replace(/^-/, "").replace(/-$/, "").trim())
      .filter(Boolean)
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
    return cleaned || source;
  } catch {
    return source;
  }
}

function normalizeSpeechSelectionText(value) {
  const decoded = decodeTextFragmentSelection(value);
  const cleaned = stripSpeechMarkup(decoded);
  if (/^https?:\/\/\S+$/i.test(cleaned) && !cleaned.includes(" ")) {
    return "";
  }
  return cleaned;
}

function getPageSpeechText() {
  if (page === "tutor") {
    const topic = activeTutorTopic();
    const lastAssistant = [...(topic?.messages || [])].reverse().find((message) => message.role === "assistant");
    return stripSpeechMarkup(lastAssistant?.content || "");
  }
  if (page === "coding") {
    const session = activeCodingSession();
    const lastAssistant = [...(session?.messages || [])].reverse().find((message) => message.role === "assistant");
    return stripSpeechMarkup(lastAssistant?.content || "");
  }
  if (page === "notes") {
    const analysis = state.notes.analysis;
    if (!analysis) {
      return "";
    }
    return stripSpeechMarkup([
      analysis.title || "",
      ...(analysis.summary || []),
      ...(analysis.next_steps || [])
    ].join(". "));
  }
  if (page === "quiz") {
    return stripSpeechMarkup([
      state.quiz.title || "",
      state.quiz.instructions || "",
      state.quiz.score ? `${uiWord("Score", "النتيجة")} ${state.quiz.score.score} ${uiWord("out of", "من")} ${state.quiz.score.total}` : "",
      ...state.quiz.questions.map((question) => question.prompt)
    ].join(". "));
  }
  if (page === "planner") {
    const planRecord = activePlannerPlan();
    return stripSpeechMarkup([
      planRecord?.plan?.overview || "",
      ...(planRecord?.plan?.advice || []),
      ...(planRecord?.plan?.days || []).map((day) => `${day.day_label} ${day.focus}`)
    ].join(". "));
  }
  if (page === "images") {
    return stripSpeechMarkup(state.images.result?.caption || state.images.lastInput.prompt || "");
  }
  return stripSpeechMarkup(document.getElementById("pageRoot")?.innerText || "");
}

function clearSelectionSpeechTimer() {
  if (runtime.speech.selectionTimer) {
    clearTimeout(runtime.speech.selectionTimer);
    runtime.speech.selectionTimer = null;
  }
}

function stopSpeechPlayback(shouldRender = true) {
  if (!runtime.speech.supported) {
    return;
  }
  clearSelectionSpeechTimer();
  window.speechSynthesis.cancel();
  runtime.speech.speaking = false;
  if (shouldRender) {
    renderApp();
  }
}

function speakText(text, options = {}) {
  const { warnIfEmpty = true } = options;
  if (!runtime.speech.supported) {
    notify(uiWord("Speech playback is not supported in this browser.", "المتصفح الحالي لا يدعم القراءة الصوتية."), "warning");
    return;
  }
  const spokenText = stripSpeechMarkup(text);
  if (!spokenText) {
    if (warnIfEmpty) {
      notify(uiWord("Highlight the text you want Salah to read aloud.", "حدد النص الذي تريد من صلاح قراءته صوتيًا."), "warning");
    }
    return;
  }

  clearSelectionSpeechTimer();
  runtime.speech.selectionText = spokenText;
  runtime.speech.lastSpokenText = spokenText;

  const voice = pickSpeechVoice(inferSpeechLocale(spokenText));
  const utterance = new SpeechSynthesisUtterance(spokenText);
  utterance.lang = voice?.lang || inferSpeechLocale(spokenText);
  if (voice) {
    utterance.voice = voice;
  }
  utterance.rate = state.ui.readingMode ? 0.92 : 1;
  utterance.onend = () => {
    runtime.speech.speaking = false;
    renderApp();
  };
  utterance.onerror = () => {
    runtime.speech.speaking = false;
    renderApp();
    notify(uiWord("Audio playback failed for this page.", "تعذر تشغيل القراءة الصوتية لهذه الصفحة."), "error");
  };

  window.speechSynthesis.cancel();
  runtime.speech.speaking = true;
  renderApp();
  window.speechSynthesis.speak(utterance);
}

function scheduleSelectionSpeech(text) {
  if (!state.ui.selectionReadEnabled || !runtime.speech.supported) {
    return;
  }
  const nextText = stripSpeechMarkup(text);
  clearSelectionSpeechTimer();
  if (!nextText || nextText === runtime.speech.lastSpokenText) {
    return;
  }
  runtime.speech.selectionTimer = setTimeout(() => {
    runtime.speech.selectionTimer = null;
    if (!state.ui.selectionReadEnabled) {
      return;
    }
    speakText(nextText, { warnIfEmpty: false });
  }, 160);
}

function speakCurrentPage() {
  const text = getSelectedSpeechText() || runtime.speech.selectionText;
  if (!text) {
    notify(uiWord("Highlight the text you want Salah to read aloud.", "حدد النص الذي تريد من صلاح قراءته صوتيًا."), "warning");
    return;
  }
  speakText(text, { warnIfEmpty: false });
}

function toggleSelectionRead() {
  if (!runtime.speech.supported) {
    notify(uiWord("Speech playback is not supported in this browser.", "المتصفح الحالي لا يدعم القراءة الصوتية."), "warning");
    return;
  }
  state.ui.selectionReadEnabled = !state.ui.selectionReadEnabled;
  if (!state.ui.selectionReadEnabled) {
    runtime.speech.lastSpokenText = "";
    stopSpeechPlayback(false);
  } else {
    const text = getSelectedSpeechText() || runtime.speech.selectionText;
    if (text) {
      scheduleSelectionSpeech(text);
    }
  }
  persist();
  renderApp();
}

function resetRuntimeTransientState() {
  runtime.busy = { tutor: false, coding: false, notes: false, quiz: false, planner: false, images: false, cv: false, ieee: false };
  runtime.typing = { tutor: null, coding: null, notes: null, planner: null };
  runtime.files = { tutor: null, coding: null, notes: null, quiz: null, images: null };
  runtime.imagesProgress = null;
  runtime.panel = "";
  runtime.confirm = null;
  runtime.notifications = [];
  stopSpeechPlayback(false);
  runtime.speech.selectionText = "";
  runtime.speech.lastSpokenText = "";
}

function getPrimaryFocusTarget() {
  switch (page) {
    case "tutor":
      return document.getElementById("tutorPrompt");
    case "coding":
      return document.getElementById("codingPrompt");
    case "notes":
      return document.getElementById("notesText");
    case "quiz":
      return state.quiz.sourceMode === "text" ? document.getElementById("quizSource") : document.getElementById("quizGenerate");
    case "planner":
      return document.getElementById("plannerGoal");
    case "images":
      return document.getElementById("imagesPrompt");
    default:
      return document.getElementById("pageRoot");
  }
}

function cleanupEphemeralChats() {
  const removedTutor = pruneEmptyTutorTopics("");
  const removedCoding = pruneEmptyCodingSessions("");
  return removedTutor || removedCoding;
}

function closeConfirmModal(shouldRender = true) {
  runtime.confirm = null;
  if (shouldRender) {
    renderApp();
  }
}

function openDeleteConfirm(kindLabel, itemLabel, action) {
  runtime.confirm = {
    title: uiWord("Delete item", "حذف العنصر"),
    message: uiWord(`Are you sure you want to delete ${kindLabel} "${itemLabel}"?`, `هل أنت متأكد أنك تريد حذف ${kindLabel} "${itemLabel}"؟`),
    confirmLabel: uiWord("Delete", "حذف"),
    action
  };
  renderApp();
}

function handlePageHide() {
  if (cleanupEphemeralChats()) {
    persist();
  }
  flushPendingPersist();
}

function handleGlobalKeydown(event) {
  const target = event.target;
  const isTypingTarget = target instanceof HTMLElement && (target.matches("input, textarea, select") || target.isContentEditable);
  if (event.key === "Escape" && runtime.confirm) {
    closeConfirmModal();
    return;
  }
  if (event.key === "Escape" && runtime.panel) {
    runtime.panel = "";
    renderApp();
    return;
  }
  if (event.key === "/" && !event.ctrlKey && !event.metaKey && !event.altKey && !isTypingTarget) {
    event.preventDefault();
    getPrimaryFocusTarget()?.focus();
  }
}

function bindGlobalEventsOnce() {
  if (runtime.globalBound) {
    return;
  }
  if (runtime.speech.supported) {
    window.speechSynthesis.getVoices();
  }
  document.addEventListener("keydown", handleGlobalKeydown);
  document.addEventListener("selectionchange", rememberSpeechSelection);
  runtime.globalBound = true;
  if (!runtime.pageHideBound) {
    window.addEventListener("pagehide", handlePageHide);
    runtime.pageHideBound = true;
  }
}

function renderApp(options = {}) {
  const apply = () => {
    renderShell();
    setPageContent();
    bindEvents();
    bindGlobalEventsOnce();
    bindAutoGrow();
    requestAnimationFrame(() => {
      if (runtime.confirm) {
        document.getElementById("confirmCancel")?.focus();
        return;
      }
      if (runtime.panel === "settings") {
        document.getElementById("settingsClose")?.focus();
      }
      if (page === "tutor") {
        scrollToBottom(document.getElementById("tutorChatScroll"));
      }
      if (page === "coding") {
        scrollToBottom(document.getElementById("codingChatScroll"));
      }
    });
  };

  if (options.transition && !effectiveReducedMotion() && typeof document.startViewTransition === "function") {
    document.startViewTransition(apply);
    return;
  }

  apply();
}

function alertError(error) {
  const message = error instanceof Error ? error.message : String(error);
  if (/configured ai providers|all configured ai providers/i.test(message)) {
    notify(read("notifyAllFailed"), "error");
    return;
  }
  notify(message, "error");
}

function renderFatalError(error) {
  const root = document.getElementById("app");
  if (!root) {
    return;
  }
  const title = state.ui.lang === "ar" ? "حدث خطأ في الواجهة" : "A UI error occurred";
  const detail = error instanceof Error ? error.message : String(error);
  root.innerHTML = `
    <div class="site-shell">
      <section class="surface editor-panel">
        <h1 class="panel-title">${escapeHtml(title)}</h1>
        <p class="muted-line">${escapeHtml(detail || "Unknown error.")}</p>
      </section>
    </div>
  `;
}

function setBusy(button, busy) {
  if (!button) {
    return;
  }
  if (button.classList.contains("composer-send")) {
    if (!button.dataset.html) {
      button.dataset.html = button.innerHTML;
    }
    button.disabled = busy;
    button.innerHTML = busy
      ? `<span class="composer-send-busy" aria-hidden="true">...</span><span class="sr-only">${escapeHtml(read("working"))}</span>`
      : button.dataset.html;
    return;
  }
  if (!button.dataset.label) {
    button.dataset.label = button.textContent || "";
  }
  button.disabled = busy;
  button.textContent = busy ? read("working") : button.dataset.label;
}

function normalizePlannerSubjects(value) {
  return String(value || "").split(/[,،]/).map((item) => item.trim()).filter(Boolean);
}

function serializePlan(plan) {
  if (!plan) {
    return "";
  }
  return [
    `Overview: ${plan.overview || ""}`,
    ...(plan.days || []).map((day) => [
      `${day.day_label}: ${day.focus}`,
      ...(day.blocks || []).map((block) => `- ${block.label} | ${block.duration} | ${block.goal}`)
    ].join("\n"))
  ].join("\n\n");
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function playTypingBubble(elementId, text, updater) {
  let visible = "";
  updater("");
  renderApp();
  await new Promise((resolve) => requestAnimationFrame(resolve));
  const node = document.getElementById(elementId);
  if (!node) {
    updater("");
    return;
  }

  const step = text.length > 2600 ? 28 : text.length > 1400 ? 18 : 8;
  for (let index = 0; index < text.length; index += step) {
    visible = text.slice(0, index + step);
    updater(visible);
    node.textContent = visible;
    scrollToBottom(node.closest(".chat-scroll") || node.closest(".output-panel"));
    await new Promise((resolve) => setTimeout(resolve, 18));
  }
}

function syncTutorDraft() {
  const input = document.getElementById("tutorPrompt");
  if (!input) {
    return;
  }
  state.tutor.draftText = input.value;
  persistSoon();
}

function syncCodingDraft() {
  const prompt = document.getElementById("codingPrompt");
  const code = document.getElementById("codingCode");
  if (prompt) {
    state.coding.composer.prompt = prompt.value;
  }
  state.coding.composer.code = code ? code.value : "";
  persistSoon();
}

function syncCodingPromptPlaceholder() {
  const prompt = document.getElementById("codingPrompt");
  if (!prompt) {
    return;
  }
  prompt.placeholder = codingPromptPlaceholder(state.coding.composer.mode);
}

function inferCodingLanguage({ fileName = "", code = "", prompt = "", session = null }) {
  const lowerFile = String(fileName || "").toLowerCase();
  const extensionMap = {
    ".js": "JavaScript",
    ".ts": "TypeScript",
    ".jsx": "JSX",
    ".tsx": "TSX",
    ".py": "Python",
    ".java": "Java",
    ".cpp": "C++",
    ".c": "C",
    ".cs": "C#",
    ".php": "PHP",
    ".rb": "Ruby",
    ".go": "Go",
    ".rs": "Rust",
    ".html": "HTML",
    ".css": "CSS",
    ".json": "JSON",
    ".sql": "SQL"
  };
  const matchedExtension = Object.keys(extensionMap).find((ext) => lowerFile.endsWith(ext));
  if (matchedExtension) {
    return extensionMap[matchedExtension];
  }

  const source = `${prompt}\n${code}`.toLowerCase();
  if (source.includes("python") || /def\s+\w+\(/.test(code)) return "Python";
  if (source.includes("typescript") || /:\s*(string|number|boolean)/.test(code)) return "TypeScript";
  if (source.includes("javascript") || /function\s+\w+\(/.test(code) || code.includes("=>")) return "JavaScript";
  if (source.includes("html") || /<\w+/.test(code)) return "HTML";
  if (source.includes("css") || /{[\s\S]*}/.test(code) && code.includes(":")) return session?.lastLanguage || "Code";
  return session?.lastLanguage || "Code";
}

function bindComposerSubmitOnEnter(textareaId, formId) {
  const textarea = document.getElementById(textareaId);
  const form = document.getElementById(formId);
  if (!textarea || !form) {
    return;
  }
  textarea.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      form.requestSubmit();
    }
  });
}

async function handleTutorForm(event) {
  event.preventDefault();
  const submitButton = document.getElementById("tutorSubmit");
  const question = state.tutor.draftText.trim();
  const file = runtime.files.tutor;
  if (!question && !file) {
    return;
  }

  let userContent = question || (state.ui.lang === "ar" ? "ملف مرفق" : "Attached file");
  let attachment = null;
  let requestContent = userContent;
  const attachmentName = file?.name || "";

  if (file && !file.name.toLowerCase().endsWith(".pdf")) {
    const text = await file.text();
    requestContent = [userContent, `Attached file (${file.name}):\n${text}`].filter(Boolean).join("\n\n");
  } else if (file) {
    attachment = { fileName: file.name, fileData: await fileToDataUrl(file) };
    requestContent = [userContent, `[File: ${file.name}]`].filter(Boolean).join("\n\n");
  }

  const topic = ensureTutorTopic(question);
  if (!topic.messages.length) {
    topic.title = normalizeTitle(question, read("tutor.untitled"));
  }
  topic.messages.push(createConversationMessage("user", userContent, {
    requestContent,
    attachmentName
  }));
  topic.updatedAt = Date.now();
  state.tutor.activeTopicId = topic.id;
  state.tutor.draftText = "";
  state.tutor.attachmentName = "";
  runtime.files.tutor = null;
  persist();

  runtime.busy.tutor = true;
  renderApp();
  setBusy(submitButton, true);

  let stopThinking = () => {};
  try {
    stopThinking = startThinkingStream("tutor", topic.id);
    const subject = detectSubject(topic.messages.map((message) => conversationMessageForAI(message)).join("\n"));
    const result = await requestAI("tutor", {
      subject,
      language: inferReplyLanguage(question || requestContent),
      question: requestContent,
      messages: buildRequestHistory(topic.messages, TUTOR_REQUEST_HISTORY_LIMIT),
      ...(attachment || {})
    });

    stopThinking();
    runtime.typing.tutor = { contextId: topic.id, phase: "typing", text: "" };
    const formatted = formatTutorResultText(result);
    await playTypingBubble("tutorStreamingText", formatted, (value) => {
      runtime.typing.tutor = { contextId: topic.id, phase: "typing", text: value };
    });
    runtime.typing.tutor = null;

    topic.messages.push({ role: "assistant", content: formatted });
    topic.updatedAt = Date.now();
    recordAnalyticsEvent({
      type: "tutor_reply",
      subject,
      title: topic.title
    });
    persist();
    renderApp();
  } catch (error) {
    stopThinking();
    runtime.typing.tutor = null;
    topic.messages.pop();
    persist();
    renderApp();
    alertError(error);
  } finally {
    runtime.busy.tutor = false;
    renderApp();
    setBusy(submitButton, false);
  }
}

async function runCodingRequest(payload) {
  const submitButton = document.getElementById("codingSubmit");
  const session = ensureCodingSession(payload.goal || payload.displayPrompt || "");
  if (!session.messages.length) {
    session.title = normalizeTitle(payload.displayPrompt || payload.goal, read("coding.untitled"));
  }

  session.messages.push(createConversationMessage("user", payload.displayPrompt || payload.goal, {
    requestContent: payload.requestContent || payload.displayPrompt || payload.goal,
    attachmentName: payload.attachmentName || ""
  }));
  session.updatedAt = Date.now();
  state.coding.activeSessionId = session.id;
  state.coding.composer.prompt = "";
  if (payload.mode === "write") {
    state.coding.composer.code = "";
  }
  state.coding.attachmentName = "";
  runtime.files.coding = null;
  persist();

  runtime.busy.coding = true;
  renderApp();
  setBusy(submitButton, true);

  let stopThinking = () => {};
  try {
    stopThinking = startThinkingStream("coding", session.id);
    const result = await requestAI("coding", {
      mode: payload.mode,
      language: payload.language,
      codeLanguage: payload.codeLanguage,
      goal: payload.goal,
      code: payload.code,
      extra: payload.extra,
      messages: buildRequestHistory(session.messages, CODING_REQUEST_HISTORY_LIMIT)
    });

    const formatted = formatCodingResultText(result, payload.codeLanguage);
    stopThinking();
    runtime.typing.coding = { contextId: session.id, phase: "typing", text: "" };
    await playTypingBubble("codingStreamingText", formatted, (value) => {
      runtime.typing.coding = { contextId: session.id, phase: "typing", text: value };
    });
    runtime.typing.coding = null;

    session.messages.push({ role: "assistant", content: formatted });
    session.lastCode = result.improved_code || payload.code || session.lastCode;
    session.lastLanguage = payload.codeLanguage || session.lastLanguage;
    session.updatedAt = Date.now();
    persist();
    renderApp();
  } catch (error) {
    stopThinking();
    session.messages.pop();
    runtime.typing.coding = null;
    persist();
    renderApp();
    alertError(error);
  } finally {
    runtime.busy.coding = false;
    renderApp();
    setBusy(submitButton, false);
  }
}

async function handleCodingForm(event) {
  event.preventDefault();
  syncCodingDraft();

  const file = runtime.files.coding;
  const mode = state.coding.composer.mode;
  const prompt = state.coding.composer.prompt.trim();
  let code = mode === "write" ? "" : state.coding.composer.code;
  let extra = "";

  if (file) {
    const fileText = await file.text();
    if (mode === "write") {
      extra = `Reference file (${file.name}):\n${fileText}`;
    } else if (!code.trim()) {
      code = fileText;
    } else {
      extra = `Reference file (${file.name}):\n${fileText}`;
    }
  }

  const session = activeCodingSession();
  const history = session?.messages.slice(-6).map((message) => `${message.role === "assistant" ? read("brand") : (state.ui.lang === "ar" ? "أنت" : "You")}:\n${message.content}`).join("\n\n");
  if (history) {
    extra = [extra, `Conversation so far:\n${history}`].filter(Boolean).join("\n\n");
  }

  if (!prompt) {
    return;
  }

  if (mode !== "write" && !code.trim() && !(session?.lastCode || "").trim() && !file) {
    return;
  }

  const codeLanguage = inferCodingLanguage({
    fileName: file?.name || "",
    code: mode === "write" ? "" : (code.trim() || session?.lastCode || ""),
    prompt,
    session
  });

  await runCodingRequest({
    mode,
    codeLanguage,
    language: inferReplyLanguage(prompt),
    displayPrompt: prompt,
    requestContent: file?.name ? `${prompt}\n\n[Attached file: ${file.name}]` : prompt,
    attachmentName: file?.name || "",
    goal: prompt,
    code: mode === "write" ? "" : (code.trim() || session?.lastCode || ""),
    extra
  });
}

async function handleNotesForm(event) {
  event.preventDefault();
  const submitButton = document.getElementById("notesSubmit");
  const text = document.getElementById("notesText").value.trim();
  const language = document.getElementById("notesLanguage").value;
  const file = runtime.files.notes;
  if (!text && !file) {
    return;
  }

  ensureNoteRecord(text || file?.name || "");
  state.notes.sourceText = text;
  state.notes.language = language;
  syncActiveNoteRecord();
  persist();

  runtime.busy.notes = true;
  renderApp();
  setBusy(submitButton, true);

  let stopThinking = () => {};
  try {
    stopThinking = startThinkingStream("notes");
    let payload;
    if (file && file.name.toLowerCase().endsWith(".pdf")) {
      payload = { language, fileName: file.name, fileData: await fileToDataUrl(file) };
      state.notes.fileName = file.name;
    } else if (file) {
      const fileText = await file.text();
      payload = { language, text: fileText };
      state.notes.fileName = file.name;
      state.notes.sourceText = fileText;
    } else {
      payload = { language, text };
      state.notes.fileName = "";
    }

    const analysis = await requestAI("notes", payload);
    stopThinking();
    runtime.typing.notes = { phase: "typing", text: "" };
    const formatted = formatNotesResultText(analysis);
    await playTypingBubble("notesStreamingText", formatted, (value) => {
      runtime.typing.notes = { phase: "typing", text: value };
    });
    runtime.typing.notes = null;

    state.notes.analysis = analysis;
    syncActiveNoteRecord(true);
    recordAnalyticsEvent({
      type: "notes_review",
      subject: state.notes.analysis?.subject || detectSubject(state.notes.sourceText || text),
      title: state.notes.analysis?.title || read("nav.notes")
    });
    runtime.files.notes = null;
    persist();
    renderApp();
  } catch (error) {
    stopThinking();
    runtime.typing.notes = null;
    alertError(error);
  } finally {
    runtime.busy.notes = false;
    renderApp();
    setBusy(submitButton, false);
  }
}

function updateQuestionSelections() {
  state.quiz.questions.forEach((question, index) => {
    document.querySelectorAll(`input[name="quiz-${index}"]`).forEach((input) => {
      input.addEventListener("change", () => {
        question.userAnswer = Number(input.value);
        syncActiveExamRecord();
        persist();
      });
    });
  });
}

function gradeStoredQuestions() {
  if (!state.quiz.questions.length || state.quiz.score) {
    return;
  }
  const score = state.quiz.questions.reduce((sum, question) => sum + (question.userAnswer === question.answer_index ? 1 : 0), 0);
  state.quiz.score = { score, total: state.quiz.questions.length };
  syncActiveExamRecord(true);
  recordAnalyticsEvent({
    type: "quiz_attempt",
    subject: state.quiz.subject || detectSubject(state.quiz.sourceText || state.quiz.title),
    title: state.quiz.title || read("nav.quiz"),
    score,
    total: state.quiz.questions.length,
    weakAreas: state.quiz.questions
      .filter((question) => question.userAnswer !== null && question.userAnswer !== question.answer_index)
      .map((question) => deriveWeakAreaLabel(question, state.quiz.subject || detectSubject(state.quiz.sourceText || state.quiz.title)))
  });
  persist();
  renderApp();
}

async function handleQuizForm(event) {
  event.preventDefault();
  const submitButton = document.getElementById("quizGenerate");
  const count = Number(document.getElementById("quizCount").value || 6);
  const difficulty = document.getElementById("quizDifficulty").value;
  const outputLanguage = document.getElementById("quizOutputLanguage").value;
  const file = runtime.files.quiz;
  const textSource = state.quiz.sourceMode === "text" ? document.getElementById("quizSource").value.trim() : "";

  ensureExamRecord(file?.name || textSource || "");
  state.quiz.count = count;
  state.quiz.difficulty = difficulty;
  state.quiz.outputLanguage = outputLanguage;
  state.quiz.sourceText = textSource;
  syncActiveExamRecord();
  persist();

  runtime.busy.quiz = true;
  renderApp();
  setBusy(submitButton, true);

  try {
    if (state.quiz.sourceMode === "pdf") {
      if (!file) {
        return;
      }
      const result = await requestAI("exam", {
        fileName: file.name,
        fileData: await fileToDataUrl(file),
        difficulty,
        count,
        language: outputLanguage
      });

      state.quiz.sourceMode = "pdf";
      state.quiz.sourceText = "";
      state.quiz.fileName = file.name;
      state.quiz.count = count;
      state.quiz.difficulty = difficulty;
      state.quiz.outputLanguage = outputLanguage;
      state.quiz.title = String(result.title || "");
      state.quiz.instructions = String(result.instructions || "");
      state.quiz.subject = String(result.subject || "");
      state.quiz.questions = result.questions.map((question) => ({ ...question, userAnswer: null }));
      state.quiz.score = null;
      syncActiveExamRecord(true);
      runtime.files.quiz = null;
    } else {
      if (!textSource) {
        return;
      }

      const result = await requestAI("quiz", {
        sourceText: textSource,
        count,
        difficulty,
        language: outputLanguage
      });

      state.quiz.sourceMode = "text";
      state.quiz.sourceText = textSource;
      state.quiz.fileName = "";
      state.quiz.count = count;
      state.quiz.difficulty = difficulty;
      state.quiz.outputLanguage = outputLanguage;
      state.quiz.title = String(result.title || "");
      state.quiz.instructions = String(result.instructions || "");
      state.quiz.subject = String(result.subject || "");
      state.quiz.questions = result.questions.map((question) => ({ ...question, userAnswer: null }));
      state.quiz.score = null;
      syncActiveExamRecord(true);
    }

    persist();
    renderApp();
  } catch (error) {
    alertError(error);
  } finally {
    runtime.busy.quiz = false;
    renderApp();
    setBusy(submitButton, false);
  }
}

async function runPlannerRequest(payload, persistInput = true) {
  const submitButton = document.getElementById("plannerGenerate") || document.getElementById("plannerEditSubmit");
  const planRecord = activePlannerPlan() || ensurePlannerPlan(payload.subjects.join(", ") || payload.goal);
  const planIndex = Math.max(1, state.planner.plans.findIndex((plan) => plan.id === planRecord.id) + 1);
  if (persistInput) {
    planRecord.lastInput = {
      subjectsText: payload.subjects.join(", "),
      startDate: payload.startDate,
      endDate: payload.endDate,
      hoursPerDay: payload.hoursPerDay,
      goal: payload.goal
    };
    planRecord.title = normalizeTitle(planRecord.lastInput.subjectsText || payload.goal, plannerFallbackTitle(planIndex));
  }
  persist();

  runtime.busy.planner = true;
  renderApp();
  setBusy(submitButton, true);

  let stopThinking = () => {};
  try {
    stopThinking = startThinkingStream("planner", planRecord.id);
    const result = await requestAI("planner", payload);
    const text = [
      result.overview || "",
      ...(result.advice || []).map((item) => `- ${item}`),
      ...(result.days || []).map((day) => [
        `${day.day_label} - ${day.focus}`,
        ...(day.blocks || []).map((block) => `- ${block.label} | ${block.duration} | ${block.goal}`)
      ].join("\n"))
    ].filter(Boolean).join("\n\n");

    stopThinking();
    runtime.typing.planner = { contextId: planRecord.id, phase: "typing", text: "" };
    await playTypingBubble("plannerStreamingText", text, (value) => {
      runtime.typing.planner = { contextId: planRecord.id, phase: "typing", text: value };
    });
    runtime.typing.planner = null;

    planRecord.plan = result;
    planRecord.editRequest = "";
    planRecord.title = normalizeTitle(planRecord.lastInput.subjectsText || result.overview || payload.goal, plannerFallbackTitle(planIndex));
    planRecord.updatedAt = Date.now();
    state.planner.activePlanId = planRecord.id;
    recordAnalyticsEvent({
      type: "planner_plan",
      subject: (payload.subjects || []).join(", ") || detectSubject(payload.goal),
      title: result.overview || read("nav.planner")
    });
    persist();
    renderApp();
  } catch (error) {
    stopThinking();
    runtime.typing.planner = null;
    renderApp();
    alertError(error);
  } finally {
    runtime.busy.planner = false;
    renderApp();
    setBusy(submitButton, false);
  }
}

async function handlePlannerForm(event) {
  event.preventDefault();
  const weakAreas = topWeakAreas(4);
  await runPlannerRequest({
    subjects: normalizePlannerSubjects(document.getElementById("plannerSubjects").value),
    startDate: document.getElementById("plannerStartDate").value,
    endDate: document.getElementById("plannerEndDate").value,
    hoursPerDay: document.getElementById("plannerHours").value,
    goal: document.getElementById("plannerGoal").value.trim(),
    weakAreas,
    language: state.ui.lang === "ar" ? "ar" : "en"
  }, true);
}

async function handlePlannerEditForm(event) {
  event.preventDefault();
  const planRecord = activePlannerPlan();
  const request = document.getElementById("plannerEditRequest").value.trim();
  if (!request || !planRecord?.plan) {
    return;
  }
  planRecord.editRequest = request;
  planRecord.updatedAt = Date.now();
  persist();
  const weakAreas = topWeakAreas(4);
  await runPlannerRequest({
    subjects: normalizePlannerSubjects(planRecord.lastInput.subjectsText),
    startDate: planRecord.lastInput.startDate,
    endDate: planRecord.lastInput.endDate,
    hoursPerDay: planRecord.lastInput.hoursPerDay,
    goal: `${planRecord.lastInput.goal || "Revise the previous study plan."}\n\nRevise the previous plan with these changes:\n${request}\n\nCurrent plan:\n${serializePlan(planRecord.plan)}`,
    weakAreas,
    language: state.ui.lang === "ar" ? "ar" : "en"
  }, false);
}

function createFreshPlannerPlan() {
  const plan = createPlannerPlan("", state.planner.plans.length + 1);
  state.planner.plans.unshift(plan);
  state.planner.activePlanId = plan.id;
  persist();
  renderApp({ transition: true });
}

function deletePlannerPlan(planId) {
  if (!planId) {
    return;
  }
  state.planner.plans = state.planner.plans.filter((plan) => plan.id !== planId);
  if (state.planner.activePlanId === planId) {
    state.planner.activePlanId = state.planner.plans[0]?.id || "";
  }
  persist();
  renderApp({ transition: true });
}

async function runImageRequest(payload, persistInput = true) {
  const submitButton = document.getElementById("imagesSubmit");
  const requestToken = makeId("image-request");
  runtime.imagesRequestToken = requestToken;
  if (persistInput) {
    state.images.lastInput = { ...state.images.lastInput, ...payload };
  }
  state.images.result = null;
  persist();

  runtime.busy.images = true;
  runtime.imagesProgress = {
    status: "queued",
    currentProvider: "",
    currentProviderLabel: uiWord("AI provider", "مزود الذكاء"),
    attempts: []
  };
  renderApp();
  setBusy(submitButton, true);

  try {
    const job = await createImageJob(payload);
    if (runtime.imagesRequestToken !== requestToken) {
      return;
    }
    runtime.imagesProgress = job;
    renderApp();
    const completedJob = await waitForImageJob(job.id);
    if (runtime.imagesRequestToken !== requestToken) {
      return;
    }
    state.images.result = completedJob.result
      ? {
          ...completedJob.result,
          prompt: payload.prompt,
          aspectRatio: payload.aspectRatio,
          generatedAt: Date.now()
        }
      : null;
    persist();
    renderApp();
  } catch (error) {
    if (runtime.imagesRequestToken === requestToken) {
      alertError(error);
    }
  } finally {
    if (runtime.imagesRequestToken === requestToken) {
      runtime.imagesRequestToken = "";
      runtime.busy.images = false;
      runtime.imagesProgress = null;
      renderApp();
      setBusy(submitButton, false);
    }
  }
}

async function handleImagesForm(event) {
  event.preventDefault();
  const prompt = document.getElementById("imagesPrompt").value.trim();
  if (!prompt) {
    return;
  }

  await runImageRequest({
    mode: "generate",
    prompt,
    aspectRatio: document.getElementById("imagesAspectRatio").value
  }, true);
}

function bindSharedEvents() {
  document.getElementById("projectInfoToggle")?.addEventListener("click", () => {
    runtime.panel = runtime.panel === "projectInfo" ? "" : "projectInfo";
    renderApp();
  });
  document.getElementById("projectInfoClose")?.addEventListener("click", () => {
    runtime.panel = "";
    renderApp();
  });
  document.getElementById("projectInfoBackdrop")?.addEventListener("click", () => {
    runtime.panel = "";
    renderApp();
  });
  document.getElementById("settingsToggle")?.addEventListener("click", () => {
    runtime.panel = runtime.panel === "settings" ? "" : "settings";
    renderApp();
  });
  document.getElementById("settingsClose")?.addEventListener("click", () => {
    runtime.panel = "";
    renderApp();
  });
  document.getElementById("settingsBackdrop")?.addEventListener("click", () => {
    runtime.panel = "";
    renderApp();
  });
  document.getElementById("confirmBackdrop")?.addEventListener("click", () => closeConfirmModal());
  document.getElementById("confirmClose")?.addEventListener("click", () => closeConfirmModal());
  document.getElementById("confirmCancel")?.addEventListener("click", () => closeConfirmModal());
  document.getElementById("confirmAccept")?.addEventListener("click", () => {
    const action = runtime.confirm?.action;
    runtime.confirm = null;
    if (typeof action === "function") {
      action();
    } else {
      renderApp();
    }
  });
  document.getElementById("themeToggle")?.addEventListener("click", () => {
    state.ui.theme = state.ui.theme === "dark" ? "light" : "dark";
    persist();
    renderApp({ transition: true });
  });

  document.getElementById("langToggle")?.addEventListener("click", () => {
    state.ui.lang = state.ui.lang === "en" ? "ar" : "en";
    persist();
    renderApp({ transition: true });
  });
  document.querySelectorAll("[data-text-scale]").forEach((button) => {
    button.addEventListener("click", () => {
      state.ui.textScale = Number(button.getAttribute("data-text-scale")) || 100;
      persist();
      renderApp();
    });
  });
  document.getElementById("toggleReadingMode")?.addEventListener("click", () => {
    state.ui.readingMode = !state.ui.readingMode;
    persist();
    renderApp();
  });
  document.getElementById("toggleReducedMotion")?.addEventListener("click", () => {
    state.ui.reducedMotion = !state.ui.reducedMotion;
    persist();
    renderApp();
  });
  document.getElementById("speakCurrentPage")?.addEventListener("click", toggleSelectionRead);
  document.getElementById("stopSpeech")?.addEventListener("click", () => stopSpeechPlayback());
}

function bindTutorEvents() {
  document.getElementById("tutorForm")?.addEventListener("submit", handleTutorForm);
  document.getElementById("tutorPrompt")?.addEventListener("input", syncTutorDraft);
  bindComposerSubmitOnEnter("tutorPrompt", "tutorForm");
  document.getElementById("tutorNewTopic")?.addEventListener("click", () => {
    pruneEmptyTutorTopics("");
    const topic = createTutorTopic();
    state.tutor.topics.unshift(topic);
    state.tutor.activeTopicId = topic.id;
    state.tutor.draftText = "";
    state.tutor.attachmentName = "";
    runtime.files.tutor = null;
    persist();
    renderApp({ transition: true });
  });
  document.querySelectorAll("[data-topic-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const nextId = button.getAttribute("data-topic-id") || "";
      pruneEmptyTutorTopics(nextId);
      state.tutor.activeTopicId = nextId;
      persist();
      renderApp({ transition: true });
    });
  });
  document.querySelectorAll("[data-delete-topic]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const topicId = button.getAttribute("data-delete-topic") || "";
      const topic = state.tutor.topics.find((item) => item.id === topicId);
      openDeleteConfirm(uiWord("topic", "الموضوع"), topic?.title || uiWord("this topic", "هذا الموضوع"), () => {
        state.tutor.topics = state.tutor.topics.filter((item) => item.id !== topicId);
        if (state.tutor.activeTopicId === topicId) {
          state.tutor.activeTopicId = state.tutor.topics[0]?.id || "";
        }
        persist();
        renderApp({ transition: true });
      });
    });
  });
  document.getElementById("tutorFile")?.addEventListener("change", (event) => {
    try {
      const file = validateSelectedFile(event.target.files?.[0] || null, { allowPdf: true, allowText: true });
      runtime.files.tutor = file;
      state.tutor.attachmentName = file?.name || "";
      persist();
      renderApp();
    } catch (error) {
      event.target.value = "";
      runtime.files.tutor = null;
      state.tutor.attachmentName = "";
      renderApp();
      alertError(error);
    }
  });
  document.getElementById("tutorRemoveFile")?.addEventListener("click", () => {
    runtime.files.tutor = null;
    state.tutor.attachmentName = "";
    persist();
    renderApp();
  });
}

function bindCodingEvents() {
  document.getElementById("codingForm")?.addEventListener("submit", handleCodingForm);
  document.getElementById("codingPrompt")?.addEventListener("input", syncCodingDraft);
  document.getElementById("codingCode")?.addEventListener("input", syncCodingDraft);
  bindComposerSubmitOnEnter("codingPrompt", "codingForm");
  syncCodingPromptPlaceholder();
  document.getElementById("codingNewSession")?.addEventListener("click", () => {
    pruneEmptyCodingSessions("");
    const session = createCodingSession();
    state.coding.sessions.unshift(session);
    state.coding.activeSessionId = session.id;
    state.coding.composer.prompt = "";
    state.coding.composer.code = "";
    state.coding.attachmentName = "";
    runtime.files.coding = null;
    persist();
    renderApp({ transition: true });
  });
  document.querySelectorAll("[data-session-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const nextId = button.getAttribute("data-session-id") || "";
      pruneEmptyCodingSessions(nextId);
      state.coding.activeSessionId = nextId;
      persist();
      renderApp({ transition: true });
    });
  });
  document.querySelectorAll("[data-delete-session]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const sessionId = button.getAttribute("data-delete-session") || "";
      const session = state.coding.sessions.find((item) => item.id === sessionId);
      openDeleteConfirm(uiWord("session", "الجلسة"), session?.title || uiWord("this session", "هذه الجلسة"), () => {
        state.coding.sessions = state.coding.sessions.filter((item) => item.id !== sessionId);
        if (state.coding.activeSessionId === sessionId) {
          state.coding.activeSessionId = state.coding.sessions[0]?.id || "";
        }
        persist();
        renderApp({ transition: true });
      });
    });
  });
  document.querySelectorAll("[data-coding-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      state.coding.composer.mode = button.getAttribute("data-coding-mode") || "write";
      persist();
      renderApp({ transition: true });
    });
  });
  document.getElementById("codingFile")?.addEventListener("change", (event) => {
    try {
      const file = validateSelectedFile(event.target.files?.[0] || null, { allowText: true });
      runtime.files.coding = file;
      state.coding.attachmentName = file?.name || "";
      persist();
      renderApp();
    } catch (error) {
      event.target.value = "";
      runtime.files.coding = null;
      state.coding.attachmentName = "";
      renderApp();
      alertError(error);
    }
  });
  document.getElementById("codingRemoveFile")?.addEventListener("click", () => {
    runtime.files.coding = null;
    state.coding.attachmentName = "";
    persist();
    renderApp();
  });
}

function bindNotesEvents() {
  document.getElementById("notesForm")?.addEventListener("submit", handleNotesForm);
  document.getElementById("notesNewDocument")?.addEventListener("click", createFreshNoteRecord);
  document.querySelectorAll("[data-note-id]").forEach((button) => {
    button.addEventListener("click", () => {
      syncActiveNoteRecord();
      const recordId = button.getAttribute("data-note-id") || "";
      const record = state.notes.documents.find((item) => item.id === recordId) || null;
      runtime.files.notes = null;
      applyNoteRecordToState(record);
      persist();
      renderApp({ transition: true });
    });
  });
  document.querySelectorAll("[data-delete-note]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const recordId = button.getAttribute("data-delete-note") || "";
      const record = state.notes.documents.find((item) => item.id === recordId);
      openDeleteConfirm(uiWord("note", "الملاحظة"), record?.title || uiWord("this note", "هذه الملاحظة"), () => {
        deleteNoteRecord(recordId);
      });
    });
  });
  document.getElementById("notesText")?.addEventListener("input", (event) => {
    ensureNoteRecord(event.target.value);
    state.notes.sourceText = event.target.value;
    syncActiveNoteRecord();
    persistSoon();
  });
  document.getElementById("notesLanguage")?.addEventListener("change", (event) => {
    ensureNoteRecord();
    state.notes.language = event.target.value;
    syncActiveNoteRecord();
    persist();
  });
  document.getElementById("notesFile")?.addEventListener("change", (event) => {
    try {
      const file = validateSelectedFile(event.target.files?.[0] || null, { allowPdf: true, allowText: true });
      ensureNoteRecord(file?.name || "");
      runtime.files.notes = file;
      state.notes.fileName = file?.name || "";
      syncActiveNoteRecord();
      persist();
      renderApp();
    } catch (error) {
      event.target.value = "";
      runtime.files.notes = null;
      state.notes.fileName = "";
      renderApp();
      alertError(error);
    }
  });
}

function bindQuizEvents() {
  document.getElementById("quizForm")?.addEventListener("submit", handleQuizForm);
  document.getElementById("quizGrade")?.addEventListener("click", gradeStoredQuestions);
  document.getElementById("quizNewExam")?.addEventListener("click", createFreshExamRecord);
  document.querySelectorAll("[data-exam-id]").forEach((button) => {
    button.addEventListener("click", () => {
      syncActiveExamRecord();
      const recordId = button.getAttribute("data-exam-id") || "";
      const record = state.quiz.exams.find((item) => item.id === recordId) || null;
      runtime.files.quiz = null;
      applyExamRecordToState(record);
      persist();
      renderApp({ transition: true });
    });
  });
  document.querySelectorAll("[data-delete-exam]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const recordId = button.getAttribute("data-delete-exam") || "";
      const record = state.quiz.exams.find((item) => item.id === recordId);
      openDeleteConfirm(uiWord("exam", "الاختبار"), record?.title || uiWord("this exam", "هذا الاختبار"), () => {
        deleteExamRecord(recordId);
      });
    });
  });
  document.querySelectorAll("[data-source-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      ensureExamRecord();
      state.quiz.sourceMode = button.getAttribute("data-source-mode") || "text";
      state.quiz.fileName = state.quiz.sourceMode === "pdf" ? state.quiz.fileName : "";
      if (state.quiz.sourceMode !== "pdf") {
        runtime.files.quiz = null;
      }
      syncActiveExamRecord();
      persist();
      renderApp({ transition: true });
    });
  });
  document.getElementById("quizCount")?.addEventListener("input", (event) => {
    ensureExamRecord();
    state.quiz.count = Number(event.target.value) || 6;
    syncActiveExamRecord();
    persistSoon();
  });
  document.getElementById("quizDifficulty")?.addEventListener("change", (event) => {
    ensureExamRecord();
    state.quiz.difficulty = event.target.value;
    syncActiveExamRecord();
    persist();
  });
  document.getElementById("quizOutputLanguage")?.addEventListener("change", (event) => {
    ensureExamRecord();
    state.quiz.outputLanguage = event.target.value;
    syncActiveExamRecord();
    persist();
  });
  document.getElementById("quizSource")?.addEventListener("input", (event) => {
    ensureExamRecord(event.target.value);
    state.quiz.sourceText = event.target.value;
    syncActiveExamRecord();
    persistSoon();
  });
  document.getElementById("quizFile")?.addEventListener("change", (event) => {
    try {
      const file = validateSelectedFile(event.target.files?.[0] || null, { allowPdf: true });
      ensureExamRecord(file?.name || "");
      runtime.files.quiz = file;
      state.quiz.fileName = file?.name || "";
      syncActiveExamRecord();
      persist();
      renderApp();
    } catch (error) {
      event.target.value = "";
      runtime.files.quiz = null;
      state.quiz.fileName = "";
      renderApp();
      alertError(error);
    }
  });
  updateQuestionSelections();
}

function bindPlannerEvents() {
  document.getElementById("plannerForm")?.addEventListener("submit", handlePlannerForm);
  document.getElementById("plannerEditForm")?.addEventListener("submit", handlePlannerEditForm);
  document.getElementById("plannerNewPlan")?.addEventListener("click", createFreshPlannerPlan);
  document.querySelectorAll("[data-plan-id]").forEach((button) => {
    button.addEventListener("click", () => {
      state.planner.activePlanId = button.getAttribute("data-plan-id") || "";
      persist();
      renderApp({ transition: true });
    });
  });
  document.querySelectorAll("[data-delete-plan]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const planId = button.getAttribute("data-delete-plan") || "";
      const plan = state.planner.plans.find((item) => item.id === planId);
      openDeleteConfirm(uiWord("plan", "الخطة"), plan?.title || uiWord("this plan", "هذه الخطة"), () => {
        deletePlannerPlan(planId);
      });
    });
  });
}

function syncImagesResultLayout() {
  const toolbarDownloadButton = document.getElementById("imagesDownloadToolbar");
  if (toolbarDownloadButton) {
    toolbarDownloadButton.disabled = !state.images.result?.imageDataUrl || runtime.busy.images;
  }

  const legacyDownloadButton = document.getElementById("imagesDownload");
  legacyDownloadButton?.closest(".content-block")?.remove();

  const providerLabel = String(state.images.result?.providerLabel || "").trim();
  if (!providerLabel) {
    return;
  }

  document.querySelectorAll(".output-panel .content-block .muted-line").forEach((node) => {
    const text = String(node.textContent || "").trim();
    if (!text) {
      return;
    }
    if (text.includes(providerLabel) && (text.startsWith("Generated with") || text.startsWith("تم الإنشاء باستخدام"))) {
      node.closest(".content-block")?.remove();
    }
  });
}

function bindImagesEvents() {
  syncImagesResultLayout();
  document.getElementById("imagesForm")?.addEventListener("submit", handleImagesForm);
  document.getElementById("imagesPrompt")?.addEventListener("input", (event) => {
    const nextPrompt = String(event.target.value || "");
    state.images.lastInput.prompt = nextPrompt;
    if (!runtime.busy.images && state.images.result && nextPrompt.trim() !== String(state.images.result.prompt || "").trim()) {
      state.images.result = null;
      runtime.imagesProgress = null;
      renderApp();
    }
    persistSoon();
  });
  document.getElementById("imagesAspectRatio")?.addEventListener("change", (event) => {
    const nextAspectRatio = String(event.target.value || "1:1");
    state.images.lastInput.aspectRatio = nextAspectRatio;
    if (!runtime.busy.images && state.images.result && nextAspectRatio !== String(state.images.result.aspectRatio || "")) {
      state.images.result = null;
      runtime.imagesProgress = null;
      renderApp();
    }
    persist();
  });
  const handleImagesDownload = () => {
    if (!state.images.result?.imageDataUrl) {
      return;
    }
    downloadDataUrl(
      state.images.result.imageDataUrl,
      imageDownloadFileName(state.images.result, state.images.lastInput.prompt)
    );
  };
  document.getElementById("imagesDownload")?.addEventListener("click", handleImagesDownload);
  document.getElementById("imagesDownloadToolbar")?.addEventListener("click", handleImagesDownload);
  document.getElementById("imagesClear")?.addEventListener("click", () => {
    state.images = deepClone(defaultState.images);
    runtime.files.images = null;
    runtime.imagesProgress = null;
    runtime.imagesRequestToken = "";
    persist();
    renderApp();
  });
}

function bindEvents() {
  bindSharedEvents();
  if (page === "tutor") {
    bindTutorEvents();
  }
  if (page === "coding") {
    bindCodingEvents();
  }
  if (page === "notes") {
    bindNotesEvents();
  }
  if (page === "quiz") {
    bindQuizEvents();
  }
  if (page === "planner") {
    bindPlannerEvents();
  }
  if (page === "images") {
    bindImagesEvents();
  }
  if (page === "cv") {
    bindCvEvents();
  }
  if (page === "ieee") {
    bindIeeeEvents();
  }
}

async function boot() {
  try {
    renderApp();
    await fetchStatus();
    renderApp();
  } catch (error) {
    renderFatalError(error);
  }
}

boot();

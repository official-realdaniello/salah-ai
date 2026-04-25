function ieeeClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function createIeeeAuthorEntry() {
  return {
    fullName: "",
    department: "",
    institution: "",
    location: "",
    email: ""
  };
}

function createIeeeReferenceEntry() {
  return {
    text: ""
  };
}

function createIeeeForm() {
  return {
    title: "",
    version: "full",
    authors: [createIeeeAuthorEntry()],
    abstract: "",
    keywords: "",
    introduction: "",
    relatedWork: "",
    methodology: "",
    experiments: "",
    results: "",
    conclusion: "",
    references: [createIeeeReferenceEntry()],
    acknowledgments: "",
    supplementary: {
      repositoryUrl: "",
      datasetUrl: "",
      demoUrl: "",
      notes: ""
    }
  };
}

function createIeeeSampleForm() {
  return {
    title: "Salah's AI: One Bilingual Study Website for Palestinian Students",
    version: "full",
    authors: [
      {
        fullName: "Student Project Team",
        department: "Computer Science",
        institution: "Independent Student Research Project",
        location: "Palestine",
        email: "contact@salah-ai.local"
      }
    ],
    abstract: "This paper presents Salah's AI, a bilingual study website made for Palestinian students. Many students use separate tools for tutoring, coding help, notes, exams, planning, CV writing, and paper writing. This makes study slow and confusing. Our project joins these tasks in one web platform with a clean interface in Arabic and English. The platform includes AI tutor topics, coding sessions, notes analysis from text or files, exam generation and grading, a date-based planner, a learning insights dashboard, image generation, a CV creator, and an IEEE paper generator with full and anonymous export. The system stores work locally in the browser, supports selection-based read aloud, and exports formal documents as PDF. It also uses provider fallback so the platform can continue when one AI service fails. We tested the working prototype by running full user flows across the main tools and by checking bilingual output, saved history, anonymous review mode, and PDF export. The result is a practical student platform that supports learning, planning, and academic writing in one place.",
    keywords: "bilingual interface, educational AI, learning analytics, local storage, PDF export",
    introduction: "Students often move between many websites during one study session. They may ask a tutor question, write code, clean notes, build an exam, plan the week, and later prepare a CV or paper. This creates extra steps and broken context. Salah's AI was built to solve this problem for Palestinian students who need Arabic and English support in one simple system. The main contribution of this project is not one tool only. It is a full study workflow: tutor, coding, notes, exams, planner, insights, images, CV, and IEEE paper generation inside one local web platform with one navigation style and export support.",
    relatedWork: "Many AI tools only do one job. Chat assistants answer questions but do not store study progress in a structured way. Note tools summarize text but do not create exams or study plans. CV builders and paper tools are usually separate from daily learning tools. Salah's AI is different because it connects learning, assessment, planning, and formal document creation in one website. It also gives Arabic and English support, local browser storage, and anonymous paper export for student research work.",
    methodology: "The website uses separate pages for each main task. Tutor keeps topic-based chats. Coding keeps session-based work with write, edit, debug, and review modes. Notes can analyze typed text or uploaded files. Exams can be created from text or PDF and can be graded inside the same page. Planner builds multi-day plans with start date, end date, and hours per day. Insights uses stored exam attempts to show mastery, active subjects, weak areas, and recent activity. Images creates study visuals. CV Creator and IEEE Paper Generator build structured documents and export them as PDF. The system saves local data in the browser with one automatic device-based workspace and uses AI provider routing with fallback logic. The IEEE generator also scans for self-identifying text in anonymous mode.",
    experiments: "We tested the project as a working web prototype on a local Windows setup with a Node.js server and a browser client. We used Arabic and English study text, sample PDF files, coding prompts, and document forms as input data. We checked whether each tool could finish its main task from start to end. The main checks were page flow, saved local state, bilingual output, exam grading and insight updates, planner generation across a date range, image generation, CV PDF export, and IEEE full and anonymous PDF export. We also checked whether anonymous mode removed author details and acknowledgments and whether it showed warnings when the paper body used self-identifying phrases.",
    results: "The prototype completed the main student workflow inside one website. Tutor and coding kept separate histories. Notes produced structured summaries. Exams could be generated and graded, and these results were sent to the insights dashboard. Planner created date-based plans, and document generators exported readable PDFs. The IEEE generator produced both full and anonymous versions from the same form, removed identifying author data in anonymous mode, and warned about risky phrases inside the body text. These results show that the platform is already useful as a real student tool and not only as a concept.",
    conclusion: "Salah's AI shows that one simple website can support tutoring, planning, assessment, and formal writing for Palestinian students. The strongest value of the project is the joined workflow and the bilingual, student-friendly design. A clear next step is broader user testing with students, stronger evaluation metrics, and richer reference and citation support for academic writing.",
    references: [
      { text: "[1] D. Realdaniello, \"Salah AI,\" GitHub repository, 2026. [Online]. Available: https://github.com/official-realdaniello/salah-ai" },
      { text: "[2] Google AI for Developers, \"Gemini API documentation,\" 2026. [Online]. Available: https://ai.google.dev/gemini-api/docs" },
      { text: "[3] Mozilla Developer Network, \"Web Storage API,\" 2026. [Online]. Available: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API" },
      { text: "[4] Mozilla Developer Network, \"SpeechSynthesis,\" 2026. [Online]. Available: https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis" }
    ],
    acknowledgments: "We thank the student-centered review process that pushed the project toward a cleaner and more practical workflow.",
    supplementary: {
      repositoryUrl: "https://github.com/official-realdaniello/salah-ai",
      datasetUrl: "",
      demoUrl: "",
      notes: "The repository contains the working prototype with tutor, coding, notes, exams, planner, insights, image generation, CV creator, and IEEE paper generator."
    }
  };
}

function createIeeeState() {
  return {
    form: createIeeeForm(),
    generated: {
      full: null,
      anonymous: null
    },
    warnings: {},
    validation: {}
  };
}

function ieeeSafeString(value, limit) {
  return String(value || "").replace(/\u0000/g, "").trim().slice(0, limit || 5000);
}

function ieeeNormalizeMultiline(value, limit) {
  return String(value || "")
    .replace(/\u0000/g, "")
    .replace(/\r/g, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, limit || 12000);
}

function ieeeHasValue(value) {
  if (typeof value === "boolean") {
    return value;
  }
  if (Array.isArray(value)) {
    return value.some((item) => ieeeHasValue(item));
  }
  if (value && typeof value === "object") {
    return Object.values(value).some((item) => ieeeHasValue(item));
  }
  return String(value || "").trim() !== "";
}

function ieeeEntryHasContent(entry) {
  return ieeeHasValue(entry);
}

function ieeeNormalizeUrl(value) {
  const raw = ieeeSafeString(value, 500);
  if (!raw) {
    return { value: "", valid: true };
  }
  let candidate = raw;
  if (!/^[a-z][a-z0-9+.-]*:\/\//i.test(candidate)) {
    candidate = `https://${candidate.replace(/^\/+/, "")}`;
  }
  try {
    const parsed = new URL(candidate);
    if (!["http:", "https:"].includes(parsed.protocol)) {
      return { value: raw, valid: false };
    }
    if (!parsed.hostname || (!parsed.hostname.includes(".") && parsed.hostname !== "localhost")) {
      return { value: raw, valid: false };
    }
    return { value: parsed.toString().replace(/\/$/, ""), valid: true };
  } catch {
    return { value: raw, valid: false };
  }
}

function ieeeSlugifyFileName(value) {
  const clean = ieeeSafeString(value, 160)
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
  return clean || "ieee-paper";
}

function ieeeWordCount(value) {
  const words = ieeeNormalizeMultiline(value, 10000).match(/\S+/g);
  return words ? words.length : 0;
}

function ieeeSplitParagraphs(value) {
  return ieeeNormalizeMultiline(value, 12000)
    .split(/\n{2,}/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function ieeeSplitKeywords(value) {
  return ieeeSafeString(value, 2000)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function ieeeInferDirection(form) {
  const payload = JSON.stringify(form || {});
  const arabicCount = (payload.match(/[\u0600-\u06FF]/g) || []).length;
  const latinCount = (payload.match(/[A-Za-z]/g) || []).length;
  return arabicCount > latinCount ? "rtl" : "ltr";
}

function ieeeIsValidEmail(value) {
  const raw = ieeeSafeString(value, 240);
  if (!raw) {
    return true;
  }
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw);
}

function ieeeEscapeRegex(value) {
  return String(value || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function ieeeUnique(values) {
  return Array.from(new Set(values.filter(Boolean)));
}

function ieeeSectionLabels() {
  return {
    abstract: uiWord("Abstract", "الملخص"),
    keywords: uiWord("Keywords", "الكلمات المفتاحية"),
    introduction: uiWord("Introduction", "المقدمة"),
    relatedWork: uiWord("Related Works", "الأعمال السابقة"),
    methodology: uiWord("Methodology", "المنهجية"),
    experiments: uiWord("Experiments", "التجارب"),
    results: uiWord("Results", "النتائج"),
    conclusion: uiWord("Conclusion", "الخاتمة"),
    references: uiWord("References", "المراجع"),
    acknowledgments: uiWord("Acknowledgments", "الشكر والتقدير"),
    supplementary: uiWord("Supplementary Materials", "المواد التكميلية")
  };
}

function ieeeTextSectionConfig() {
  const labels = ieeeSectionLabels();
  return [
    {
      key: "abstract",
      title: labels.abstract,
      description: uiWord("Summarize the paper clearly and keep the core contribution readable.", "لخّص الورقة بوضوح مع إبقاء المساهمة الأساسية سهلة القراءة."),
      rows: 6
    },
    {
      key: "introduction",
      title: labels.introduction,
      description: uiWord("Explain the problem, motivation, and paper scope.", "اشرح المشكلة والدافع ونطاق الورقة."),
      rows: 7
    },
    {
      key: "relatedWork",
      title: labels.relatedWork,
      description: uiWord("Compare against prior systems, methods, or literature.", "قارن مع الأنظمة أو الأساليب أو الأدبيات السابقة."),
      rows: 6
    },
    {
      key: "methodology",
      title: labels.methodology,
      description: uiWord("Describe the system design, model, pipeline, or method.", "صف تصميم النظام أو النموذج أو المسار أو المنهج."),
      rows: 7
    },
    {
      key: "experiments",
      title: labels.experiments,
      description: uiWord("Explain the setup, evaluation process, and test conditions.", "اشرح الإعدادات وآلية التقييم وظروف الاختبار."),
      rows: 6
    },
    {
      key: "results",
      title: labels.results,
      description: uiWord("Present the main findings, measured outcomes, or observations.", "اعرض النتائج الأساسية أو المخرجات المقاسة أو الملاحظات."),
      rows: 6
    },
    {
      key: "conclusion",
      title: labels.conclusion,
      description: uiWord("Close with the key takeaway and next-step direction.", "اختم بأهم خلاصة واتجاه العمل القادم."),
      rows: 5
    }
  ];
}

function ieeeFormHasMeaningfulContent(form) {
  const authorCount = (form?.authors || []).filter(ieeeEntryHasContent).length;
  const referenceCount = (form?.references || []).filter((entry) => ieeeSafeString(entry?.text, 2000)).length;
  const supplementaryHasContent = ieeeHasValue(form?.supplementary || {});
  return Boolean(
    ieeeSafeString(form?.title, 300) ||
    authorCount ||
    ieeeNormalizeMultiline(form?.abstract, 4000) ||
    ieeeSplitKeywords(form?.keywords).length ||
    ieeeTextSectionConfig().some((section) => ieeeNormalizeMultiline(form?.[section.key], 12000)) ||
    referenceCount ||
    ieeeNormalizeMultiline(form?.acknowledgments, 2000) ||
    supplementaryHasContent
  );
}

function migrateIeeeState(parsed) {
  const source = parsed?.ieee || {};
  const nextState = createIeeeState();
  const form = source.form || {};
  return {
    form: {
      ...nextState.form,
      ...form,
      title: String(form.title || ""),
      version: form.version === "anonymous" ? "anonymous" : "full",
      authors: Array.isArray(form.authors) ? form.authors.map((entry) => ({ ...createIeeeAuthorEntry(), ...(entry || {}) })) : ieeeClone(nextState.form.authors),
      abstract: String(form.abstract || ""),
      keywords: String(form.keywords || ""),
      introduction: String(form.introduction || ""),
      relatedWork: String(form.relatedWork || ""),
      methodology: String(form.methodology || ""),
      experiments: String(form.experiments || ""),
      results: String(form.results || ""),
      conclusion: String(form.conclusion || ""),
      references: Array.isArray(form.references) ? form.references.map((entry) => ({ ...createIeeeReferenceEntry(), ...(entry || {}) })) : ieeeClone(nextState.form.references),
      acknowledgments: String(form.acknowledgments || ""),
      supplementary: { ...nextState.form.supplementary, ...(form.supplementary || {}) }
    },
    generated: {
      full: source.generated?.full && typeof source.generated.full === "object" ? source.generated.full : null,
      anonymous: source.generated?.anonymous && typeof source.generated.anonymous === "object" ? source.generated.anonymous : null
    },
    warnings: source.warnings && typeof source.warnings === "object" ? source.warnings : {},
    validation: source.validation && typeof source.validation === "object" ? source.validation : {}
  };
}

function validateIeeeForm(form) {
  const errors = {};
  (form.authors || []).forEach((author, index) => {
    if (!ieeeIsValidEmail(author.email)) {
      errors[`authors.${index}.email`] = uiWord("Enter a valid email address.", "أدخل بريدًا إلكترونيًا صحيحًا.");
    }
  });

  [
    ["supplementary.repositoryUrl", form.supplementary?.repositoryUrl],
    ["supplementary.datasetUrl", form.supplementary?.datasetUrl],
    ["supplementary.demoUrl", form.supplementary?.demoUrl]
  ].forEach(([key, value]) => {
    const normalized = ieeeNormalizeUrl(value);
    if (ieeeSafeString(value, 500) && !normalized.valid) {
      errors[key] = uiWord("Enter a valid URL.", "أدخل رابطًا صحيحًا.");
    }
  });

  return errors;
}

function scanIeeeAnonymousWarnings(form) {
  const authors = ieeeUnique((form.authors || []).map((author) => ieeeSafeString(author?.fullName, 160)));
  const institutions = ieeeUnique((form.authors || []).map((author) => ieeeSafeString(author?.institution, 200)));
  const phrases = [
    {
      pattern: /\bin our previous work\b/i,
      message: uiWord("Contains the phrase “in our previous work”, which can hint at authorship.", "يحتوي على عبارة قد تكشف هوية المؤلفين ضمنيًا.")
    },
    {
      pattern: /\bwe previously developed\b/i,
      message: uiWord("Contains the phrase “we previously developed”, which can reveal authorship.", "يحتوي على عبارة قد تشير إلى هوية المؤلفين.")
    },
    {
      pattern: /\bat our university\b/i,
      message: uiWord("Contains the phrase “at our university”, which can expose affiliation.", "يحتوي على عبارة قد تكشف الانتماء المؤسسي.")
    },
    {
      pattern: /\bour lab\b/i,
      message: uiWord("Contains the phrase “our lab”, which can expose affiliation.", "يحتوي على عبارة قد تكشف الانتماء.")
    },
    {
      pattern: /\bour department\b/i,
      message: uiWord("Contains the phrase “our department”, which can expose affiliation.", "يحتوي على عبارة قد تكشف الجهة الأكاديمية.")
    }
  ];

  const warnings = {};
  ieeeTextSectionConfig().forEach((section) => {
    const text = ieeeNormalizeMultiline(form?.[section.key], 12000);
    if (!text) {
      return;
    }
    const messages = [];
    phrases.forEach((entry) => {
      if (entry.pattern.test(text)) {
        messages.push(entry.message);
      }
    });

    authors.forEach((name) => {
      if (name && new RegExp(`\\b${ieeeEscapeRegex(name)}\\b`, "i").test(text)) {
        messages.push(uiWord(`Mentions author name "${name}" in the paper body.`, `يذكر اسم المؤلف "${name}" داخل متن الورقة.`));
      }
    });

    institutions.forEach((institution) => {
      if (institution && new RegExp(ieeeEscapeRegex(institution), "i").test(text)) {
        messages.push(uiWord(`Mentions institution "${institution}" in the paper body.`, `يذكر المؤسسة "${institution}" داخل متن الورقة.`));
      }
    });

    if (messages.length) {
      warnings[section.key] = ieeeUnique(messages);
    }
  });

  return warnings;
}

function buildIeeeDocument(form, mode) {
  if (!form || !ieeeFormHasMeaningfulContent(form)) {
    return null;
  }

  const labels = ieeeSectionLabels();
  const direction = ieeeInferDirection(form);
  const lang = direction === "rtl" ? "ar" : "en";
  const version = mode === "anonymous" ? "anonymous" : "full";
  const rawTitle = ieeeSafeString(form.title, 300);
  const title = rawTitle || uiWord("Untitled Paper", "ورقة بدون عنوان");
  const authors = version === "full"
    ? (form.authors || [])
      .filter(ieeeEntryHasContent)
      .map((author) => ({
        fullName: ieeeSafeString(author.fullName, 160),
        department: ieeeSafeString(author.department, 160),
        institution: ieeeSafeString(author.institution, 220),
        location: ieeeSafeString(author.location, 160),
        email: ieeeSafeString(author.email, 220)
      }))
      .filter((author) => ieeeHasValue(author))
    : [];

  const abstractParagraphs = ieeeSplitParagraphs(form.abstract);
  const sections = ieeeTextSectionConfig()
    .filter((section) => section.key !== "abstract")
    .map((section) => ({
      key: section.key,
      title: section.title,
      paragraphs: ieeeSplitParagraphs(form[section.key])
    }))
    .filter((section) => section.paragraphs.length);

  const references = (form.references || [])
    .map((entry) => ieeeNormalizeMultiline(entry?.text, 2500))
    .filter(Boolean);

  const acknowledgments = version === "full" ? ieeeSplitParagraphs(form.acknowledgments) : [];
  const supplementaryItems = [
    {
      label: uiWord("Repository", "المستودع"),
      value: ieeeNormalizeUrl(form.supplementary?.repositoryUrl).value
    },
    {
      label: uiWord("Dataset", "مجموعة البيانات"),
      value: ieeeNormalizeUrl(form.supplementary?.datasetUrl).value
    },
    {
      label: uiWord("Demo", "العرض"),
      value: ieeeNormalizeUrl(form.supplementary?.demoUrl).value
    },
    {
      label: uiWord("Additional Notes", "ملاحظات إضافية"),
      value: ieeeNormalizeMultiline(form.supplementary?.notes, 2500)
    }
  ].filter((item) => item.value);

  return {
    version,
    versionLabel: version === "anonymous" ? uiWord("Anonymous Version", "النسخة المجهولة") : uiWord("Full Version", "النسخة الكاملة"),
    lang,
    direction,
    rawTitle,
    title,
    fileName: `${ieeeSlugifyFileName(rawTitle || "ieee-paper")}-${version}.pdf`,
    anonymousLabel: version === "anonymous" ? uiWord("Anonymous submission", "إرسال مجهول الهوية") : "",
    authors,
    abstractTitle: labels.abstract,
    abstractParagraphs,
    keywordsTitle: labels.keywords,
    keywords: ieeeSplitKeywords(form.keywords),
    sections,
    referencesTitle: labels.references,
    references,
    acknowledgmentsTitle: labels.acknowledgments,
    acknowledgments,
    supplementaryTitle: labels.supplementary,
    supplementaryItems
  };
}

function ieeeRepeatableConfig() {
  return {
    authors: {
      title: uiWord("Authors", "المؤلفون"),
      addLabel: uiWord("Add author", "أضف مؤلفًا"),
      emptyLabel: uiWord("No author entries yet. Add one if you want the full version to show author details.", "لا توجد خانات مؤلفين بعد. أضف واحدة إذا أردت إظهار بيانات المؤلفين في النسخة الكاملة."),
      create: createIeeeAuthorEntry,
      itemLabel: (entry, index) => entry.fullName || entry.institution || `${uiWord("Author", "المؤلف")} ${index + 1}`,
      fields: [
        { field: "fullName", label: uiWord("Full Name", "الاسم الكامل"), type: "text" },
        { field: "department", label: uiWord("Department", "القسم"), type: "text" },
        { field: "institution", label: uiWord("Institution / University / Organization", "المؤسسة / الجامعة / الجهة"), type: "text" },
        { field: "location", label: uiWord("City / Country", "المدينة / الدولة"), type: "text" },
        { field: "email", label: uiWord("Email", "البريد الإلكتروني"), type: "email" }
      ]
    },
    references: {
      title: uiWord("References", "المراجع"),
      addLabel: uiWord("Add reference", "أضف مرجعًا"),
      emptyLabel: uiWord("No references yet. Add any citation text you want included at the end of the paper.", "لا توجد مراجع بعد. أضف نصوص المراجع التي تريد إظهارها في نهاية الورقة."),
      create: createIeeeReferenceEntry,
      itemLabel: (entry, index) => ieeeSafeString(entry.text, 90) || `${uiWord("Reference", "المرجع")} ${index + 1}`,
      fields: [
        { field: "text", label: uiWord("Full reference text", "نص المرجع الكامل"), type: "textarea", rows: 4 }
      ]
    }
  };
}

function ieeeValidationError(key) {
  return state.ieee.validation?.[key] || "";
}

function renderIeeeField(label, controlHtml, error, note) {
  return `
    <label class="cv-field">
      <span class="cv-label">${escapeHtml(label)}</span>
      ${controlHtml}
      ${note ? `<span class="muted-line ieee-field-note">${escapeHtml(note)}</span>` : ""}
      ${error ? `<span class="cv-error">${escapeHtml(error)}</span>` : ""}
    </label>
  `;
}

function renderIeeeInputControl(sectionKey, value, options) {
  const currentValue = String(value ?? "");
  const commonAttributes = sectionKey
    ? `data-ieee-repeat="${sectionKey}" data-index="${options.index}" data-field="${options.field}" dir="auto"`
    : `data-ieee-path="${options.path}" dir="auto"`;
  const errorKey = options.errorKey || options.path || `${sectionKey}.${options.index}.${options.field}`;

  if (options.type === "textarea") {
    return renderIeeeField(
      options.label,
      `<textarea class="editor-area auto-grow cv-textarea" rows="${options.rows || 4}" ${commonAttributes}>${escapeHtml(currentValue)}</textarea>`,
      ieeeValidationError(errorKey),
      options.note
    );
  }

  return renderIeeeField(
    options.label,
    `<input type="${options.type || "text"}" value="${escapeHtml(currentValue)}" ${commonAttributes}>`,
    ieeeValidationError(errorKey),
    options.note
  );
}

function renderIeeeWarningList(sectionKey) {
  const items = state.ieee.form.version === "anonymous" ? state.ieee.warnings?.[sectionKey] || [] : [];
  if (!items.length) {
    return "";
  }
  return `
    <div class="ieee-inline-warning" role="alert">
      <strong>${escapeHtml(uiWord("Anonymous review warning", "تنبيه للمراجعة المجهولة"))}</strong>
      <ul>
        ${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
      </ul>
    </div>
  `;
}

function renderIeeeMetadataSection() {
  const form = state.ieee.form;
  return `
    <section class="surface cv-section-card">
      <div class="panel-header">
        <div>
          <p class="section-label">${escapeHtml(uiWord("Paper Metadata", "بيانات الورقة"))}</p>
          <h2 class="panel-title">${escapeHtml(uiWord("Paper Metadata", "بيانات الورقة"))}</h2>
        </div>
      </div>
      <div class="cv-field-grid">
        ${renderIeeeInputControl("", form.title, {
          path: "title",
          label: uiWord("Paper Title", "عنوان الورقة"),
          type: "text",
          note: uiWord("Leave it empty if you want to draft first. The preview will use an untitled placeholder.", "اتركه فارغًا إذا أردت البدء بالمسودة أولًا. ستستخدم المعاينة عنوانًا افتراضيًا.")
        })}
      </div>
      <div class="ieee-version-card">
        <div>
          <span class="cv-label">${escapeHtml(uiWord("Version", "النسخة"))}</span>
          <p class="muted-line">${escapeHtml(uiWord("Anonymous mode hides authors and acknowledgments, and surfaces blind-review warnings.", "الوضع المجهول يخفي المؤلفين والشكر ويعرض تحذيرات المراجعة العمياء."))}</p>
        </div>
        <div class="ieee-version-toggle" role="tablist" aria-label="${escapeHtml(uiWord("Paper version", "نسخة الورقة"))}">
          <button class="button ${form.version === "full" ? "button--primary" : "button--soft"}" type="button" data-ieee-version="full" aria-pressed="${form.version === "full"}">${escapeHtml(uiWord("Full Version", "النسخة الكاملة"))}</button>
          <button class="button ${form.version === "anonymous" ? "button--primary" : "button--soft"}" type="button" data-ieee-version="anonymous" aria-pressed="${form.version === "anonymous"}">${escapeHtml(uiWord("Anonymous Version", "النسخة المجهولة"))}</button>
        </div>
      </div>
    </section>
  `;
}

function renderIeeeTextSection(section) {
  const isAbstract = section.key === "abstract";
  const wordHint = isAbstract
    ? uiWord(`Word count: ${ieeeWordCount(state.ieee.form.abstract)}. Recommended: 150-250 words.`, `عدد الكلمات: ${ieeeWordCount(state.ieee.form.abstract)}. الموصى به: 150-250 كلمة.`)
    : section.description;
  return `
    <section class="surface cv-section-card">
      <div class="panel-header">
        <div>
          <p class="section-label">${escapeHtml(section.title)}</p>
          <h2 class="panel-title">${escapeHtml(section.title)}</h2>
        </div>
      </div>
      ${renderIeeeInputControl("", state.ieee.form[section.key], {
        path: section.key,
        label: section.title,
        type: "textarea",
        rows: section.rows || 6,
        note: wordHint
      })}
      ${renderIeeeWarningList(section.key)}
    </section>
  `;
}

function renderIeeeKeywordsSection() {
  return `
    <section class="surface cv-section-card">
      <div class="panel-header">
        <div>
          <p class="section-label">${escapeHtml(uiWord("Keywords", "الكلمات المفتاحية"))}</p>
          <h2 class="panel-title">${escapeHtml(uiWord("Keywords", "الكلمات المفتاحية"))}</h2>
        </div>
      </div>
      <div class="cv-field-grid">
        ${renderIeeeInputControl("", state.ieee.form.keywords, {
          path: "keywords",
          label: uiWord("Keywords", "الكلمات المفتاحية"),
          type: "text",
          note: uiWord("Use commas to separate terms.", "استخدم الفواصل للفصل بين الكلمات.")
        })}
      </div>
    </section>
  `;
}

function renderIeeeRepeatableSection(key) {
  const config = ieeeRepeatableConfig()[key];
  const entries = state.ieee.form[key] || [];
  return `
    <section class="surface cv-section-card">
      <div class="panel-header">
        <div>
          <p class="section-label">${escapeHtml(config.title)}</p>
          <h2 class="panel-title">${escapeHtml(config.title)}</h2>
        </div>
        <button class="button button--soft" type="button" data-ieee-add="${key}">${escapeHtml(config.addLabel)}</button>
      </div>
      <div class="cv-repeat-stack">
        ${entries.length ? entries.map((entry, index) => `
          <article class="cv-repeat-card">
            <div class="cv-repeat-head">
              <strong>${escapeHtml(config.itemLabel(entry, index))}</strong>
              <button class="button button--soft cv-remove-button" type="button" data-ieee-remove="${key}" data-index="${index}">${escapeHtml(read("deleteChat"))}</button>
            </div>
            <div class="cv-field-grid cv-field-grid--repeat">
              ${config.fields.map((field) => renderIeeeInputControl(key, entry[field.field], {
                index,
                field: field.field,
                label: field.label,
                type: field.type,
                rows: field.rows,
                errorKey: `${key}.${index}.${field.field}`
              })).join("")}
            </div>
          </article>
        `).join("") : `
          <div class="cv-empty-slot">
            <p class="muted-line">${escapeHtml(config.emptyLabel)}</p>
          </div>
        `}
      </div>
    </section>
  `;
}

function renderIeeeAcknowledgmentsSection() {
  return `
    <section class="surface cv-section-card">
      <div class="panel-header">
        <div>
          <p class="section-label">${escapeHtml(uiWord("Acknowledgments", "الشكر والتقدير"))}</p>
          <h2 class="panel-title">${escapeHtml(uiWord("Acknowledgments", "الشكر والتقدير"))}</h2>
        </div>
      </div>
      ${renderIeeeInputControl("", state.ieee.form.acknowledgments, {
        path: "acknowledgments",
        label: uiWord("Acknowledgments", "الشكر والتقدير"),
        type: "textarea",
        rows: 4,
        note: uiWord("This section is hidden automatically in Anonymous Version.", "يتم إخفاء هذا القسم تلقائيًا في النسخة المجهولة.")
      })}
    </section>
  `;
}

function renderIeeeSupplementarySection() {
  const supplementary = state.ieee.form.supplementary || {};
  return `
    <section class="surface cv-section-card">
      <div class="panel-header">
        <div>
          <p class="section-label">${escapeHtml(uiWord("Supplementary Material", "المواد التكميلية"))}</p>
          <h2 class="panel-title">${escapeHtml(uiWord("Supplementary Material", "المواد التكميلية"))}</h2>
        </div>
      </div>
      <div class="cv-field-grid">
        ${renderIeeeInputControl("", supplementary.repositoryUrl, {
          path: "supplementary.repositoryUrl",
          label: uiWord("Repository URL", "رابط المستودع"),
          type: "url"
        })}
        ${renderIeeeInputControl("", supplementary.datasetUrl, {
          path: "supplementary.datasetUrl",
          label: uiWord("Dataset URL", "رابط مجموعة البيانات"),
          type: "url"
        })}
        ${renderIeeeInputControl("", supplementary.demoUrl, {
          path: "supplementary.demoUrl",
          label: uiWord("Demo URL", "رابط العرض"),
          type: "url"
        })}
        ${renderIeeeInputControl("", supplementary.notes, {
          path: "supplementary.notes",
          label: uiWord("Additional Notes", "ملاحظات إضافية"),
          type: "textarea",
          rows: 4
        })}
      </div>
    </section>
  `;
}

function renderIeeePreviewWarningPanel() {
  if (state.ieee.form.version !== "anonymous") {
    return "";
  }
  const entries = Object.entries(state.ieee.warnings || {}).filter(([, items]) => Array.isArray(items) && items.length);
  if (!entries.length) {
    return "";
  }
  const labelMap = Object.fromEntries(ieeeTextSectionConfig().map((section) => [section.key, section.title]));
  return `
    <section class="ieee-warning-panel" role="alert">
      <strong>${escapeHtml(uiWord("Blind-review warnings", "تحذيرات المراجعة العمياء"))}</strong>
      <p>${escapeHtml(uiWord("These phrases can reveal author identity in anonymous submissions. Review them before exporting the anonymous PDF.", "قد تكشف هذه العبارات هوية المؤلف في الإرسال المجهول. راجعها قبل تصدير PDF المجهول."))}</p>
      <ul>
        ${entries.map(([key, items]) => items.map((item) => `<li><strong>${escapeHtml(labelMap[key] || key)}:</strong> ${escapeHtml(item)}</li>`).join("")).join("")}
      </ul>
    </section>
  `;
}

function renderIeeePreviewSection(section) {
  return `
    <section class="ieee-paper-section">
      <h2>${escapeHtml(section.title)}</h2>
      ${section.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
    </section>
  `;
}

function renderIeeePreviewAuthors(documentModel) {
  if (documentModel.version === "anonymous") {
    return `<p class="ieee-paper-anonymous">${escapeHtml(documentModel.anonymousLabel)}</p>`;
  }
  if (!documentModel.authors.length) {
    return "";
  }
  return `
    <div class="ieee-paper-authors">
      ${documentModel.authors.map((author) => `
        <div class="ieee-paper-author">
          ${author.fullName ? `<p class="ieee-paper-author-name">${escapeHtml(author.fullName)}</p>` : ""}
          ${author.department ? `<p>${escapeHtml(author.department)}</p>` : ""}
          ${author.institution ? `<p>${escapeHtml(author.institution)}</p>` : ""}
          ${author.location ? `<p>${escapeHtml(author.location)}</p>` : ""}
          ${author.email ? `<p>${escapeHtml(author.email)}</p>` : ""}
        </div>
      `).join("")}
    </div>
  `;
}

function renderIeeePreview(documentModel) {
  if (!documentModel) {
    const hasDraft = ieeeFormHasMeaningfulContent(state.ieee.form);
    return `
      <div class="ieee-preview-box">
        <div class="ieee-preview-scroll" id="ieeePreviewScroll" role="region" tabindex="0" aria-label="${escapeHtml(uiWord("IEEE paper preview area", "معاينة ورقة IEEE"))}">
          <section class="cv-preview-empty">
            <p class="section-label">${escapeHtml(uiWord("IEEE Preview", "معاينة IEEE"))}</p>
            <h2 class="panel-title" id="ieeePreviewTitle" tabindex="-1">${escapeHtml(uiWord("Academic paper preview", "معاينة الورقة الأكاديمية"))}</h2>
            <p class="muted-line">${escapeHtml(hasDraft ? uiWord("Fill the sections you want, then click Preview Paper.", "املأ الأقسام التي تريدها ثم اضغط معاينة الورقة.") : uiWord("Add your paper details to generate an IEEE-style preview.", "أضف تفاصيل الورقة لإنشاء معاينة بأسلوب IEEE."))}</p>
          </section>
        </div>
      </div>
    `;
  }

  return `
    <div class="cv-preview-toolbar">
      <div>
        <p class="section-label">${escapeHtml(uiWord("Generated Paper", "الورقة المُنشأة"))}</p>
        <h2 class="panel-title" id="ieeePreviewTitle" tabindex="-1">${escapeHtml(documentModel.versionLabel)}</h2>
      </div>
      <div class="ieee-preview-actions">
        <button class="button button--soft" id="ieeeDownloadFull" type="button" ${runtime.busy.ieee ? "disabled" : ""}>${escapeHtml(uiWord("Print Full / Save PDF", "طباعة الكامل / حفظ PDF"))}</button>
        <button class="button button--soft" id="ieeeDownloadAnonymous" type="button" ${runtime.busy.ieee ? "disabled" : ""}>${escapeHtml(uiWord("Print Anonymous / Save PDF", "طباعة المجهول / حفظ PDF"))}</button>
        <button class="button button--primary" id="ieeeDownloadBoth" type="button" ${runtime.busy.ieee ? "disabled" : ""}>${escapeHtml(runtime.busy.ieee ? uiWord("Preparing print views...", "جارٍ تجهيز صفحات الطباعة...") : uiWord("Print Both / Save PDFs", "طباعة النسختين / حفظ PDF"))}</button>
      </div>
    </div>
    ${renderIeeePreviewWarningPanel()}
    <div class="ieee-preview-box">
      <div class="ieee-preview-scroll" id="ieeePreviewScroll" role="region" tabindex="0" aria-label="${escapeHtml(uiWord("IEEE paper preview area", "معاينة ورقة IEEE"))}">
        <article class="ieee-paper-preview" dir="${documentModel.direction}">
          <header class="ieee-paper-header">
            <h1 class="ieee-paper-title">${escapeHtml(documentModel.title)}</h1>
            ${renderIeeePreviewAuthors(documentModel)}
          </header>
          ${documentModel.abstractParagraphs.length ? `
            <section class="ieee-paper-top-section">
              <h2>${escapeHtml(documentModel.abstractTitle)}</h2>
              ${documentModel.abstractParagraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
            </section>
          ` : ""}
          ${documentModel.keywords.length ? `
            <section class="ieee-paper-top-section ieee-paper-keywords">
              <h2>${escapeHtml(documentModel.keywordsTitle)}</h2>
              <p>${escapeHtml(documentModel.keywords.join(", "))}</p>
            </section>
          ` : ""}
          <div class="ieee-paper-columns">
            ${documentModel.sections.map(renderIeeePreviewSection).join("")}
            ${documentModel.references.length ? `
              <section class="ieee-paper-section">
                <h2>${escapeHtml(documentModel.referencesTitle)}</h2>
                <ol class="ieee-paper-references">
                  ${documentModel.references.map((reference) => `<li>${escapeHtml(reference)}</li>`).join("")}
                </ol>
              </section>
            ` : ""}
            ${documentModel.acknowledgments.length ? `
              <section class="ieee-paper-section">
                <h2>${escapeHtml(documentModel.acknowledgmentsTitle)}</h2>
                ${documentModel.acknowledgments.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
              </section>
            ` : ""}
            ${documentModel.supplementaryItems.length ? `
              <section class="ieee-paper-section">
                <h2>${escapeHtml(documentModel.supplementaryTitle)}</h2>
                <ul class="ieee-paper-supplementary">
                  ${documentModel.supplementaryItems.map((item) => `<li><strong>${escapeHtml(item.label)}:</strong> ${escapeHtml(item.value)}</li>`).join("")}
                </ul>
              </section>
            ` : ""}
          </div>
        </article>
      </div>
    </div>
  `;
}

function renderIeeeSampleNotice() {
  if (!runtime.sampleNotices?.ieee) {
    return "";
  }
  return `
    <section class="sample-notice sample-notice--danger" role="alert" aria-live="polite">
      <strong>${escapeHtml(uiWord("Important notice", "تنبيه مهم"))}</strong>
      <p>${escapeHtml(uiWord(
        "The sample/example IEEE paper details are completely fake and only for demonstration. They do not belong to any real person, institution, paper, dataset, or project.",
        "بيانات نموذج ورقة IEEE تجريبية ووهمية بالكامل ومخصصة للعرض فقط. لا تعود إلى أي شخص أو مؤسسة أو ورقة أو مجموعة بيانات أو مشروع حقيقي."
      ))}</p>
      <button class="button button--soft button--danger" id="ieeeSampleNoticeDismiss" type="button">${escapeHtml(uiWord("Okay", "حسنًا"))}</button>
    </section>
  `;
}

function renderIeeePage() {
  const currentVersion = state.ieee.form.version === "anonymous" ? "anonymous" : "full";
  const currentDocument = state.ieee.generated?.[currentVersion] || null;
  return `
    <section class="hero glass cv-hero">
      <p class="eyebrow">${escapeHtml(uiWord("IEEE Paper Generator", "مولد ورقة IEEE"))}</p>
      <h1 class="page-title">${escapeHtml(uiWord("Prepare a clean, blind-review-ready IEEE-style paper.", "أنشئ ورقة بأسلوب IEEE بشكل نظيف وجاهز للمراجعة العمياء."))}</h1>
      <p class="page-subtitle">${escapeHtml(uiWord("Fill only what you need, preview the paper in a formal two-column layout, then open the browser print dialog to save the full version, anonymous version, or both as PDF.", "املأ فقط ما تحتاجه، ثم عاين الورقة بتنسيق ثنائي الأعمدة وافتح نافذة الطباعة لحفظ النسخة الكاملة أو المجهولة أو كلتيهما كملف PDF."))}</p>
    </section>
    <section class="ieee-layout">
      <article class="surface editor-panel ieee-form-panel">
        <form class="stack-form cv-form" id="ieeeBuilderForm">
          <div class="cv-actions">
            <button class="button button--primary" type="submit">${escapeHtml(uiWord("Preview Paper", "معاينة الورقة"))}</button>
            <button class="button button--soft" id="ieeeLoadSample" type="button">${escapeHtml(uiWord("Load project sample", "تحميل نموذج المشروع"))}</button>
            <button class="button button--soft" id="ieeeClear" type="button">${escapeHtml(read("clear"))}</button>
          </div>
          ${renderIeeeMetadataSection()}
          ${renderIeeeRepeatableSection("authors")}
          ${renderIeeeTextSection(ieeeTextSectionConfig()[0])}
          ${renderIeeeKeywordsSection()}
          ${ieeeTextSectionConfig().slice(1).map(renderIeeeTextSection).join("")}
          ${renderIeeeRepeatableSection("references")}
          ${renderIeeeAcknowledgmentsSection()}
          ${renderIeeeSupplementarySection()}
        </form>
      </article>
      <aside class="surface editor-panel ieee-preview-panel">
        ${renderIeeeSampleNotice()}
        ${renderIeeePreview(currentDocument)}
      </aside>
    </section>
  `;
}

function ieeeSetFieldByPath(path, value) {
  const parts = String(path || "").split(".");
  if (!parts.length) {
    return;
  }
  let cursor = state.ieee.form;
  for (let index = 0; index < parts.length - 1; index += 1) {
    cursor = cursor?.[parts[index]];
    if (!cursor) {
      return;
    }
  }
  cursor[parts[parts.length - 1]] = value;
}

function ieeeClearValidationForField(path) {
  if (path && state.ieee.validation?.[path]) {
    delete state.ieee.validation[path];
  }
}

function ieeeMarkDraftDirty() {
  state.ieee.generated = {
    full: null,
    anonymous: null
  };
}

function ieeeRefreshWarnings() {
  state.ieee.warnings = scanIeeeAnonymousWarnings(state.ieee.form);
}

function ieeeHandleInputChange(target) {
  if (!(target instanceof HTMLElement)) {
    return;
  }

  const path = target.getAttribute("data-ieee-path");
  if (path) {
    ieeeSetFieldByPath(path, target.value);
    ieeeClearValidationForField(path);
    ieeeMarkDraftDirty();
    ieeeRefreshWarnings();
    persist();
    return;
  }

  const repeatKey = target.getAttribute("data-ieee-repeat");
  const field = target.getAttribute("data-field");
  const index = Number(target.getAttribute("data-index"));
  if (repeatKey && field && !Number.isNaN(index) && Array.isArray(state.ieee.form[repeatKey]) && state.ieee.form[repeatKey][index]) {
    state.ieee.form[repeatKey][index][field] = target.value;
    ieeeClearValidationForField(`${repeatKey}.${index}.${field}`);
    ieeeMarkDraftDirty();
    ieeeRefreshWarnings();
    persist();
  }
}

function ieeeFocusPreview() {
  requestAnimationFrame(() => {
    document.getElementById("ieeePreviewTitle")?.focus();
    document.getElementById("ieeePreviewScroll")?.focus();
  });
}

function generateIeeeFromForm(options = {}) {
  const validation = validateIeeeForm(state.ieee.form);
  state.ieee.validation = validation;
  ieeeRefreshWarnings();

  if (Object.keys(validation).length) {
    persist();
    renderApp({ transition: true });
    return null;
  }

  const full = buildIeeeDocument(state.ieee.form, "full");
  const anonymous = buildIeeeDocument(state.ieee.form, "anonymous");
  state.ieee.generated = { full, anonymous };
  persist();
  renderApp({ transition: true });
  if (options.focus) {
    ieeeFocusPreview();
  }
  return state.ieee.generated;
}

async function fetchIeeePdfBlob(documentModel) {
  const response = await fetch("/api/ieee-pdf", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/pdf"
    },
    body: JSON.stringify({
      document: documentModel,
      fileName: documentModel.fileName
    })
  });

  if (!response.ok) {
    let errorMessage = "IEEE paper PDF export failed.";
    try {
      const payload = await response.json();
      errorMessage = payload.error || errorMessage;
    } catch {}
    throw new Error(errorMessage);
  }

  return response.blob();
}

async function handleIeeeDownload(mode) {
  const documents = state.ieee.generated?.full || state.ieee.generated?.anonymous
    ? state.ieee.generated
    : generateIeeeFromForm({ focus: false });
  if (!documents) {
    return;
  }

  const full = documents.full || buildIeeeDocument(state.ieee.form, "full");
  const anonymous = documents.anonymous || buildIeeeDocument(state.ieee.form, "anonymous");
  if (!full && !anonymous) {
    return;
  }

  runtime.busy.ieee = true;
  renderApp();
  try {
    if (mode === "full" && full) {
      downloadBlob(await fetchIeeePdfBlob(full), full.fileName);
      return;
    }
    if (mode === "anonymous" && anonymous) {
      downloadBlob(await fetchIeeePdfBlob(anonymous), anonymous.fileName);
      return;
    }
    if (full) {
      downloadBlob(await fetchIeeePdfBlob(full), full.fileName);
    }
    if (anonymous) {
      await new Promise((resolve) => setTimeout(resolve, 180));
      downloadBlob(await fetchIeeePdfBlob(anonymous), anonymous.fileName);
    }
  } catch (error) {
    alertError(error);
  } finally {
    runtime.busy.ieee = false;
    renderApp();
  }
}

function handleIeeeLoadSample() {
  state.ieee.form = createIeeeSampleForm();
  state.ieee.validation = {};
  ieeeRefreshWarnings();
  ieeeMarkDraftDirty();
  persist();
  generateIeeeFromForm({ focus: true });
}

function handleIeeeClear() {
  state.ieee = createIeeeState();
  persist();
  renderApp({ transition: true });
}

function handleIeeeVersionChange(version) {
  state.ieee.form.version = version === "anonymous" ? "anonymous" : "full";
  ieeeRefreshWarnings();
  persist();
  renderApp({ transition: true });
}

function bindIeeeEvents() {
  const form = document.getElementById("ieeeBuilderForm");
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    generateIeeeFromForm({ focus: true });
  });
  form?.addEventListener("input", (event) => ieeeHandleInputChange(event.target));
  form?.addEventListener("change", (event) => ieeeHandleInputChange(event.target));
  form?.addEventListener("click", (event) => {
    const target = event.target instanceof HTMLElement ? event.target.closest("[data-ieee-add],[data-ieee-remove],[data-ieee-version],#ieeeLoadSample,#ieeeClear") : null;
    if (!target) {
      return;
    }

    if (target.id === "ieeeLoadSample") {
      handleIeeeLoadSample();
      return;
    }

    if (target.id === "ieeeClear") {
      handleIeeeClear();
      return;
    }

    const addKey = target.getAttribute("data-ieee-add");
    if (addKey) {
      const config = ieeeRepeatableConfig()[addKey];
      if (config) {
        state.ieee.form[addKey].push(config.create());
        ieeeMarkDraftDirty();
        ieeeRefreshWarnings();
        persist();
        renderApp({ transition: true });
      }
      return;
    }

    const removeKey = target.getAttribute("data-ieee-remove");
    const removeIndex = Number(target.getAttribute("data-index"));
    if (removeKey && !Number.isNaN(removeIndex) && Array.isArray(state.ieee.form[removeKey])) {
      state.ieee.form[removeKey].splice(removeIndex, 1);
      ieeeMarkDraftDirty();
      ieeeRefreshWarnings();
      persist();
      renderApp({ transition: true });
      return;
    }

    const version = target.getAttribute("data-ieee-version");
    if (version) {
      handleIeeeVersionChange(version);
    }
  });

  document.getElementById("ieeeDownloadFull")?.addEventListener("click", () => handleIeeeDownload("full"));
  document.getElementById("ieeeDownloadAnonymous")?.addEventListener("click", () => handleIeeeDownload("anonymous"));
  document.getElementById("ieeeDownloadBoth")?.addEventListener("click", () => handleIeeeDownload("both"));
  document.getElementById("ieeeSampleNoticeDismiss")?.addEventListener("click", () => {
    dismissSampleNotice("ieee");
  });
  const previewScroll = document.getElementById("ieeePreviewScroll");
  ["mousedown", "mouseenter", "touchstart"].forEach((eventName) => {
    previewScroll?.addEventListener(eventName, (event) => {
      event.currentTarget?.focus?.({ preventScroll: true });
    }, eventName === "touchstart" ? { passive: true } : undefined);
  });
  previewScroll?.addEventListener("wheel", (event) => {
    const node = event.currentTarget;
    if (!(node instanceof HTMLElement)) {
      return;
    }
    node.focus?.({ preventScroll: true });
    if (node.scrollHeight <= node.clientHeight) {
      return;
    }
    event.preventDefault();
    node.scrollTop += event.deltaY;
  }, { passive: false });
}

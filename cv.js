function cvClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function createCvEducationEntry() {
  return {
    degree: "",
    institution: "",
    location: "",
    startDate: "",
    endDate: "",
    gpa: "",
    notes: ""
  };
}

function createCvExperienceEntry() {
  return {
    jobTitle: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
    achievements: ""
  };
}

function createCvProjectEntry() {
  return {
    projectName: "",
    projectLink: "",
    role: "",
    technologies: "",
    description: "",
    outcome: ""
  };
}

function createCvCertificationEntry() {
  return {
    certificationName: "",
    issuer: "",
    date: "",
    credentialUrl: ""
  };
}

function createCvLanguageEntry() {
  return {
    language: "",
    proficiency: ""
  };
}

function createCvAwardEntry() {
  return {
    title: "",
    issuer: "",
    date: "",
    description: ""
  };
}

function createCvVolunteerEntry() {
  return {
    role: "",
    organization: "",
    startDate: "",
    endDate: "",
    description: ""
  };
}

function createCvPublicationEntry() {
  return {
    title: "",
    publisher: "",
    date: "",
    link: ""
  };
}

function createCvForm() {
  return {
    personal: {
      fullName: "",
      professionalTitle: "",
      email: "",
      phone: "",
      location: "",
      linkedInUrl: "",
      githubUrl: "",
      portfolioUrl: ""
    },
    summary: "",
    education: [createCvEducationEntry()],
    experience: [createCvExperienceEntry()],
    projects: [createCvProjectEntry()],
    skills: {
      technical: "",
      soft: "",
      tools: ""
    },
    certifications: [createCvCertificationEntry()],
    languages: [createCvLanguageEntry()],
    awards: [createCvAwardEntry()],
    volunteer: [createCvVolunteerEntry()],
    publications: [createCvPublicationEntry()],
    references: {
      availableOnRequest: false,
      text: ""
    }
  };
}

function createCvSampleForm() {
  return {
    personal: {
      fullName: "Mariam Abu Salim",
      professionalTitle: "Computer Science Student",
      email: "mariam.abusalam@example.com",
      phone: "+970 59 123 4567",
      location: "Gaza, Palestine",
      linkedInUrl: "https://linkedin.com/in/mariam-abusalam",
      githubUrl: "https://github.com/mariamabusalam",
      portfolioUrl: "https://mariamabusalam.dev"
    },
    summary: "Final-year computer science student focused on frontend development, accessible interfaces, and practical student-facing products. Looking for an entry-level software role where I can contribute clean code, strong communication, and steady product thinking.",
    education: [
      {
        degree: "B.Sc. in Computer Science",
        institution: "Islamic University of Gaza",
        location: "Gaza",
        startDate: "2022-09",
        endDate: "2026-06",
        gpa: "3.7 / 4.0",
        notes: "Relevant coursework: Data Structures, Web Development, Databases, Software Engineering."
      }
    ],
    experience: [
      {
        jobTitle: "Frontend Intern",
        company: "Local EdTech Initiative",
        location: "Remote",
        startDate: "2025-06",
        endDate: "2025-09",
        current: false,
        description: "Built and refined student dashboard components using semantic HTML, CSS, and JavaScript.\nWorked with mentors to improve accessibility, responsiveness, and layout consistency across learning tools.",
        achievements: "Reduced layout issues on smaller screens by redesigning card spacing and responsive behavior.\nDocumented reusable UI patterns for future student projects."
      }
    ],
    projects: [
      {
        projectName: "Campus Study Planner",
        projectLink: "https://github.com/mariamabusalam/campus-study-planner",
        role: "Frontend Developer",
        technologies: "JavaScript, HTML, CSS, Local Storage",
        description: "Created a study planning web app that helps students organize subjects, deadlines, and revision goals in a clean weekly view.",
        outcome: "Used by classmates to coordinate revision sessions before exams."
      }
    ],
    skills: {
      technical: "JavaScript, HTML, CSS, Responsive Design, REST APIs",
      soft: "Communication, Teamwork, Time Management, Problem Solving",
      tools: "GitHub, VS Code, Figma, Postman"
    },
    certifications: [
      {
        certificationName: "Google UX Design Foundations",
        issuer: "Coursera",
        date: "2025-02",
        credentialUrl: "https://coursera.org/verify/example"
      }
    ],
    languages: [
      { language: "Arabic", proficiency: "Native" },
      { language: "English", proficiency: "Professional working proficiency" }
    ],
    awards: [
      {
        title: "Best Student Project",
        issuer: "University Tech Day",
        date: "2025-11",
        description: "Recognized for a practical academic tool designed to support exam preparation."
      }
    ],
    volunteer: [
      {
        role: "Coding Mentor",
        organization: "Community Youth Center",
        startDate: "2024-10",
        endDate: "2025-04",
        description: "Supported school students with introductory programming concepts and small web exercises."
      }
    ],
    publications: [
      {
        title: "Designing Simpler Study Tools for Students",
        publisher: "University Department Blog",
        date: "2025-03",
        link: "https://example.com/study-tools-article"
      }
    ],
    references: {
      availableOnRequest: true,
      text: ""
    }
  };
}

function createCvState() {
  return {
    form: createCvForm(),
    generated: null,
    validation: {}
  };
}

function cvSafeString(value, limit) {
  return String(value || "").replace(/\u0000/g, "").trim().slice(0, limit || 4000);
}

function cvNormalizeMultiline(value, limit) {
  return String(value || "")
    .replace(/\u0000/g, "")
    .replace(/\r/g, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, limit || 6000);
}

function cvHasValue(value) {
  if (typeof value === "boolean") {
    return value;
  }
  if (Array.isArray(value)) {
    return value.some((item) => cvHasValue(item));
  }
  if (value && typeof value === "object") {
    return Object.values(value).some((item) => cvHasValue(item));
  }
  return String(value || "").trim() !== "";
}

function cvEntryHasContent(entry) {
  return cvHasValue(entry);
}

function cvNormalizeUrl(value) {
  const raw = cvSafeString(value, 500);
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

function cvIsValidEmail(value) {
  const raw = cvSafeString(value, 240);
  if (!raw) {
    return true;
  }
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw);
}

function cvSlugifyFileName(value) {
  const clean = cvSafeString(value, 120)
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
  return clean || "resume";
}

function cvSplitParagraphs(value) {
  return cvNormalizeMultiline(value, 6000)
    .split(/\n{2,}/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function cvSplitBulletLines(value) {
  return cvNormalizeMultiline(value, 6000)
    .split("\n")
    .map((item) => item.replace(/^[-*•]\s*/, "").trim())
    .filter(Boolean);
}

function cvSplitCommaList(value) {
  return cvSafeString(value, 3000)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function cvFormatMonthLabel(value, lang) {
  const raw = cvSafeString(value, 20);
  if (!raw) {
    return "";
  }
  const parts = raw.split("-");
  if (parts.length < 2) {
    return raw;
  }
  const year = Number(parts[0]);
  const month = Number(parts[1]);
  if (!year || !month || month < 1 || month > 12) {
    return raw;
  }
  try {
    return new Intl.DateTimeFormat(lang === "ar" ? "ar" : "en", {
      month: "short",
      year: "numeric"
    }).format(new Date(Date.UTC(year, month - 1, 1)));
  } catch {
    return `${parts[0]}-${parts[1]}`;
  }
}

function cvFormatDateRange(startDate, endDate, isCurrent, lang) {
  const start = cvFormatMonthLabel(startDate, lang);
  const end = isCurrent
    ? (lang === "ar" ? "حتى الآن" : "Present")
    : cvFormatMonthLabel(endDate, lang);
  if (start && end) {
    return `${start} - ${end}`;
  }
  return start || end || "";
}

function cvSectionLabels() {
  return {
    summary: uiWord("Summary", "الملخص"),
    education: uiWord("Education", "التعليم"),
    experience: uiWord("Experience", "الخبرة"),
    projects: uiWord("Projects", "المشاريع"),
    skills: uiWord("Skills", "المهارات"),
    certifications: uiWord("Certifications", "الشهادات"),
    languages: uiWord("Languages", "اللغات"),
    awards: uiWord("Awards", "الجوائز"),
    volunteer: uiWord("Volunteer Experience", "الخبرة التطوعية"),
    publications: uiWord("Publications", "المنشورات"),
    references: uiWord("References", "المراجع")
  };
}

function cvInferDirection(form) {
  const payload = JSON.stringify(form || {});
  const arabicCount = (payload.match(/[\u0600-\u06FF]/g) || []).length;
  const latinCount = (payload.match(/[A-Za-z]/g) || []).length;
  return arabicCount > latinCount ? "rtl" : "ltr";
}

function cvBuildEntry(title, rightText, metaLine, body, bullets) {
  return {
    title: cvSafeString(title, 240),
    rightText: cvSafeString(rightText, 120),
    metaLine: cvSafeString(metaLine, 280),
    body: Array.isArray(body) ? body.map((item) => cvSafeString(item, 900)).filter(Boolean) : [],
    bullets: Array.isArray(bullets) ? bullets.map((item) => cvSafeString(item, 900)).filter(Boolean) : []
  };
}

function migrateCvState(parsed) {
  const source = parsed?.cv || {};
  const nextState = createCvState();
  const form = source.form || {};
  return {
    form: {
      personal: { ...nextState.form.personal, ...(form.personal || {}) },
      summary: String(form.summary || ""),
      education: Array.isArray(form.education) && form.education.length ? form.education.map((entry) => ({ ...createCvEducationEntry(), ...(entry || {}) })) : cvClone(nextState.form.education),
      experience: Array.isArray(form.experience) && form.experience.length ? form.experience.map((entry) => ({ ...createCvExperienceEntry(), ...(entry || {}) })) : cvClone(nextState.form.experience),
      projects: Array.isArray(form.projects) && form.projects.length ? form.projects.map((entry) => ({ ...createCvProjectEntry(), ...(entry || {}) })) : cvClone(nextState.form.projects),
      skills: { ...nextState.form.skills, ...(form.skills || {}) },
      certifications: Array.isArray(form.certifications) && form.certifications.length ? form.certifications.map((entry) => ({ ...createCvCertificationEntry(), ...(entry || {}) })) : cvClone(nextState.form.certifications),
      languages: Array.isArray(form.languages) && form.languages.length ? form.languages.map((entry) => ({ ...createCvLanguageEntry(), ...(entry || {}) })) : cvClone(nextState.form.languages),
      awards: Array.isArray(form.awards) && form.awards.length ? form.awards.map((entry) => ({ ...createCvAwardEntry(), ...(entry || {}) })) : cvClone(nextState.form.awards),
      volunteer: Array.isArray(form.volunteer) && form.volunteer.length ? form.volunteer.map((entry) => ({ ...createCvVolunteerEntry(), ...(entry || {}) })) : cvClone(nextState.form.volunteer),
      publications: Array.isArray(form.publications) && form.publications.length ? form.publications.map((entry) => ({ ...createCvPublicationEntry(), ...(entry || {}) })) : cvClone(nextState.form.publications),
      references: { ...nextState.form.references, ...(form.references || {}) }
    },
    generated: source.generated && typeof source.generated === "object" ? source.generated : null,
    validation: source.validation && typeof source.validation === "object" ? source.validation : {}
  };
}

function buildCvDocument(form) {
  if (!form || !cvHasValue(form)) {
    return null;
  }

  const labels = cvSectionLabels();
  const lang = state?.ui?.lang === "ar" ? "ar" : "en";
  const direction = cvInferDirection(form);
  const personal = form.personal || {};
  const linkedIn = cvNormalizeUrl(personal.linkedInUrl);
  const github = cvNormalizeUrl(personal.githubUrl);
  const portfolio = cvNormalizeUrl(personal.portfolioUrl);

  const contactLines = [
    cvSafeString(personal.email, 240),
    cvSafeString(personal.phone, 120),
    cvSafeString(personal.location, 120)
  ].filter(Boolean);

  const linkLines = [
    linkedIn.value ? `LinkedIn: ${linkedIn.value}` : "",
    github.value ? `GitHub: ${github.value}` : "",
    portfolio.value ? `Portfolio: ${portfolio.value}` : ""
  ].filter(Boolean);

  const sections = [];
  const summary = cvNormalizeMultiline(form.summary, 1800);
  if (summary) {
    sections.push({ key: "summary", title: labels.summary, summary });
  }

  const educationItems = (form.education || [])
    .filter(cvEntryHasContent)
    .map((entry) => cvBuildEntry(
      entry.degree || entry.institution,
      cvFormatDateRange(entry.startDate, entry.endDate, false, lang),
      [cvSafeString(entry.institution, 160), cvSafeString(entry.location, 120)].filter(Boolean).join(" | "),
      [
        entry.gpa ? `${uiWord("GPA", "المعدل")}: ${cvSafeString(entry.gpa, 60)}` : "",
        ...cvSplitParagraphs(entry.notes)
      ],
      []
    ))
    .filter((item) => cvHasValue(item));
  if (educationItems.length) {
    sections.push({ key: "education", title: labels.education, items: educationItems });
  }

  const experienceItems = (form.experience || [])
    .filter(cvEntryHasContent)
    .map((entry) => cvBuildEntry(
      entry.jobTitle || entry.company,
      cvFormatDateRange(entry.startDate, entry.endDate, Boolean(entry.current), lang),
      [cvSafeString(entry.company, 160), cvSafeString(entry.location, 120)].filter(Boolean).join(" | "),
      cvSplitParagraphs(entry.description),
      cvSplitBulletLines(entry.achievements)
    ))
    .filter((item) => cvHasValue(item));
  if (experienceItems.length) {
    sections.push({ key: "experience", title: labels.experience, items: experienceItems });
  }

  const projectItems = (form.projects || [])
    .filter(cvEntryHasContent)
    .map((entry) => {
      const normalizedProjectLink = cvNormalizeUrl(entry.projectLink);
      return cvBuildEntry(
        entry.projectName,
        cvSafeString(entry.role, 120),
        cvSafeString(entry.technologies, 240),
        [
          normalizedProjectLink.value ? normalizedProjectLink.value : "",
          ...cvSplitParagraphs(entry.description),
          entry.outcome ? `${uiWord("Impact", "الأثر")}: ${cvNormalizeMultiline(entry.outcome, 1200)}` : ""
        ],
        []
      );
    })
    .filter((item) => cvHasValue(item));
  if (projectItems.length) {
    sections.push({ key: "projects", title: labels.projects, items: projectItems });
  }

  const skillItems = [
    { label: uiWord("Technical Skills", "المهارات التقنية"), value: cvSplitCommaList(form.skills?.technical).join(", ") },
    { label: uiWord("Soft Skills", "المهارات الشخصية"), value: cvSplitCommaList(form.skills?.soft).join(", ") },
    { label: uiWord("Tools / Platforms", "الأدوات / المنصات"), value: cvSplitCommaList(form.skills?.tools).join(", ") }
  ]
    .filter((item) => item.value)
    .map((item) => cvBuildEntry(item.label, "", "", [item.value], []));
  if (skillItems.length) {
    sections.push({ key: "skills", title: labels.skills, items: skillItems });
  }

  const certificationItems = (form.certifications || [])
    .filter(cvEntryHasContent)
    .map((entry) => {
      const normalizedCredential = cvNormalizeUrl(entry.credentialUrl);
      return cvBuildEntry(
        entry.certificationName,
        cvFormatMonthLabel(entry.date, lang),
        cvSafeString(entry.issuer, 160),
        normalizedCredential.value ? [normalizedCredential.value] : [],
        []
      );
    })
    .filter((item) => cvHasValue(item));
  if (certificationItems.length) {
    sections.push({ key: "certifications", title: labels.certifications, items: certificationItems });
  }

  const languageItems = (form.languages || [])
    .filter(cvEntryHasContent)
    .map((entry) => cvBuildEntry(entry.language, cvSafeString(entry.proficiency, 120), "", [], []))
    .filter((item) => cvHasValue(item));
  if (languageItems.length) {
    sections.push({ key: "languages", title: labels.languages, items: languageItems });
  }

  const awardItems = (form.awards || [])
    .filter(cvEntryHasContent)
    .map((entry) => cvBuildEntry(
      entry.title,
      cvFormatMonthLabel(entry.date, lang),
      cvSafeString(entry.issuer, 160),
      cvSplitParagraphs(entry.description),
      []
    ))
    .filter((item) => cvHasValue(item));
  if (awardItems.length) {
    sections.push({ key: "awards", title: labels.awards, items: awardItems });
  }

  const volunteerItems = (form.volunteer || [])
    .filter(cvEntryHasContent)
    .map((entry) => cvBuildEntry(
      entry.role || entry.organization,
      cvFormatDateRange(entry.startDate, entry.endDate, false, lang),
      cvSafeString(entry.organization, 160),
      cvSplitParagraphs(entry.description),
      []
    ))
    .filter((item) => cvHasValue(item));
  if (volunteerItems.length) {
    sections.push({ key: "volunteer", title: labels.volunteer, items: volunteerItems });
  }

  const publicationItems = (form.publications || [])
    .filter(cvEntryHasContent)
    .map((entry) => {
      const normalizedLink = cvNormalizeUrl(entry.link);
      return cvBuildEntry(
        entry.title,
        cvFormatMonthLabel(entry.date, lang),
        cvSafeString(entry.publisher, 160),
        normalizedLink.value ? [normalizedLink.value] : [],
        []
      );
    })
    .filter((item) => cvHasValue(item));
  if (publicationItems.length) {
    sections.push({ key: "publications", title: labels.publications, items: publicationItems });
  }

  let referencesText = "";
  if (form.references?.text) {
    referencesText = cvNormalizeMultiline(form.references.text, 1400);
  } else if (form.references?.availableOnRequest) {
    referencesText = uiWord("Available upon request.", "متاحة عند الطلب.");
  }
  if (referencesText) {
    sections.push({ key: "references", title: labels.references, summary: referencesText });
  }

  const fullName = cvSafeString(personal.fullName, 140);
  return {
    lang,
    direction,
    fileName: `${cvSlugifyFileName(fullName)}-cv.pdf`,
    name: fullName,
    professionalTitle: cvSafeString(personal.professionalTitle, 180),
    contactLines,
    linkLines,
    sections
  };
}

function validateCvForm(form) {
  const errors = {};
  if (!cvIsValidEmail(form.personal?.email)) {
    errors["personal.email"] = uiWord("Enter a valid email address.", "أدخل بريدًا إلكترونيًا صحيحًا.");
  }

  [
    ["personal.linkedInUrl", form.personal?.linkedInUrl],
    ["personal.githubUrl", form.personal?.githubUrl],
    ["personal.portfolioUrl", form.personal?.portfolioUrl]
  ].forEach(([key, value]) => {
    const normalized = cvNormalizeUrl(value);
    if (cvSafeString(value, 500) && !normalized.valid) {
      errors[key] = uiWord("Enter a valid URL.", "أدخل رابطًا صحيحًا.");
    }
  });

  (form.projects || []).forEach((entry, index) => {
    const normalized = cvNormalizeUrl(entry.projectLink);
    if (cvSafeString(entry.projectLink, 500) && !normalized.valid) {
      errors[`projects.${index}.projectLink`] = uiWord("Enter a valid project URL.", "أدخل رابط مشروع صحيحًا.");
    }
  });

  (form.certifications || []).forEach((entry, index) => {
    const normalized = cvNormalizeUrl(entry.credentialUrl);
    if (cvSafeString(entry.credentialUrl, 500) && !normalized.valid) {
      errors[`certifications.${index}.credentialUrl`] = uiWord("Enter a valid credential URL.", "أدخل رابط اعتماد صحيحًا.");
    }
  });

  (form.publications || []).forEach((entry, index) => {
    const normalized = cvNormalizeUrl(entry.link);
    if (cvSafeString(entry.link, 500) && !normalized.valid) {
      errors[`publications.${index}.link`] = uiWord("Enter a valid publication URL.", "أدخل رابط منشور صحيحًا.");
    }
  });

  return errors;
}

function cvRepeatableConfig() {
  return {
    education: {
      title: uiWord("Education", "التعليم"),
      addLabel: uiWord("Add education", "أضف تعليمًا"),
      create: createCvEducationEntry,
      itemLabel: (entry, index) => entry.degree || entry.institution || `${uiWord("Education", "التعليم")} ${index + 1}`,
      fields: [
        { field: "degree", label: uiWord("Degree", "الدرجة"), type: "text" },
        { field: "institution", label: uiWord("Institution", "المؤسسة"), type: "text" },
        { field: "location", label: uiWord("Location", "الموقع"), type: "text" },
        { field: "startDate", label: uiWord("Start Date", "تاريخ البدء"), type: "month" },
        { field: "endDate", label: uiWord("End Date", "تاريخ الانتهاء"), type: "month" },
        { field: "gpa", label: uiWord("GPA", "المعدل"), type: "text" },
        { field: "notes", label: uiWord("Notes / Description", "ملاحظات / وصف"), type: "textarea" }
      ]
    },
    experience: {
      title: uiWord("Work Experience", "الخبرة العملية"),
      addLabel: uiWord("Add experience", "أضف خبرة"),
      create: createCvExperienceEntry,
      itemLabel: (entry, index) => entry.jobTitle || entry.company || `${uiWord("Experience", "الخبرة")} ${index + 1}`,
      fields: [
        { field: "jobTitle", label: uiWord("Job Title", "المسمى الوظيفي"), type: "text" },
        { field: "company", label: uiWord("Company / Organization", "الشركة / المؤسسة"), type: "text" },
        { field: "location", label: uiWord("Location", "الموقع"), type: "text" },
        { field: "startDate", label: uiWord("Start Date", "تاريخ البدء"), type: "month" },
        { field: "endDate", label: uiWord("End Date", "تاريخ الانتهاء"), type: "month", disabledWhen: "current" },
        { field: "current", label: uiWord("Currently Working Here", "أعمل هنا حاليًا"), type: "checkbox" },
        { field: "description", label: uiWord("Description / Responsibilities", "الوصف / المسؤوليات"), type: "textarea", improve: true },
        { field: "achievements", label: uiWord("Achievements", "الإنجازات"), type: "textarea" }
      ]
    },
    projects: {
      title: uiWord("Projects", "المشاريع"),
      addLabel: uiWord("Add project", "أضف مشروعًا"),
      create: createCvProjectEntry,
      itemLabel: (entry, index) => entry.projectName || `${uiWord("Project", "المشروع")} ${index + 1}`,
      fields: [
        { field: "projectName", label: uiWord("Project Name", "اسم المشروع"), type: "text" },
        { field: "projectLink", label: uiWord("Project Link", "رابط المشروع"), type: "url" },
        { field: "role", label: uiWord("Role", "الدور"), type: "text" },
        { field: "technologies", label: uiWord("Technologies Used", "التقنيات المستخدمة"), type: "text" },
        { field: "description", label: uiWord("Description", "الوصف"), type: "textarea", improve: true },
        { field: "outcome", label: uiWord("Outcome / Impact", "النتيجة / الأثر"), type: "textarea" }
      ]
    },
    certifications: {
      title: uiWord("Certifications", "الشهادات"),
      addLabel: uiWord("Add certification", "أضف شهادة"),
      create: createCvCertificationEntry,
      itemLabel: (entry, index) => entry.certificationName || `${uiWord("Certification", "الشهادة")} ${index + 1}`,
      fields: [
        { field: "certificationName", label: uiWord("Certification Name", "اسم الشهادة"), type: "text" },
        { field: "issuer", label: uiWord("Issuer", "الجهة المانحة"), type: "text" },
        { field: "date", label: uiWord("Date", "التاريخ"), type: "month" },
        { field: "credentialUrl", label: uiWord("Credential URL", "رابط الاعتماد"), type: "url" }
      ]
    },
    languages: {
      title: uiWord("Languages", "اللغات"),
      addLabel: uiWord("Add language", "أضف لغة"),
      create: createCvLanguageEntry,
      itemLabel: (entry, index) => entry.language || `${uiWord("Language", "اللغة")} ${index + 1}`,
      fields: [
        { field: "language", label: uiWord("Language", "اللغة"), type: "text" },
        { field: "proficiency", label: uiWord("Proficiency Level", "مستوى الإتقان"), type: "text" }
      ]
    },
    awards: {
      title: uiWord("Awards / Achievements", "الجوائز / الإنجازات"),
      addLabel: uiWord("Add award", "أضف جائزة"),
      create: createCvAwardEntry,
      itemLabel: (entry, index) => entry.title || `${uiWord("Award", "الجائزة")} ${index + 1}`,
      fields: [
        { field: "title", label: uiWord("Title", "العنوان"), type: "text" },
        { field: "issuer", label: uiWord("Issuer / Organization", "الجهة / المؤسسة"), type: "text" },
        { field: "date", label: uiWord("Date", "التاريخ"), type: "month" },
        { field: "description", label: uiWord("Description", "الوصف"), type: "textarea" }
      ]
    },
    volunteer: {
      title: uiWord("Volunteer Experience", "الخبرة التطوعية"),
      addLabel: uiWord("Add volunteer role", "أضف دورًا تطوعيًا"),
      create: createCvVolunteerEntry,
      itemLabel: (entry, index) => entry.role || entry.organization || `${uiWord("Volunteer Role", "الدور التطوعي")} ${index + 1}`,
      fields: [
        { field: "role", label: uiWord("Role", "الدور"), type: "text" },
        { field: "organization", label: uiWord("Organization", "المؤسسة"), type: "text" },
        { field: "startDate", label: uiWord("Start Date", "تاريخ البدء"), type: "month" },
        { field: "endDate", label: uiWord("End Date", "تاريخ الانتهاء"), type: "month" },
        { field: "description", label: uiWord("Description", "الوصف"), type: "textarea" }
      ]
    },
    publications: {
      title: uiWord("Publications", "المنشورات"),
      addLabel: uiWord("Add publication", "أضف منشورًا"),
      create: createCvPublicationEntry,
      itemLabel: (entry, index) => entry.title || `${uiWord("Publication", "المنشور")} ${index + 1}`,
      fields: [
        { field: "title", label: uiWord("Title", "العنوان"), type: "text" },
        { field: "publisher", label: uiWord("Publisher / Venue", "الناشر / الجهة"), type: "text" },
        { field: "date", label: uiWord("Date", "التاريخ"), type: "month" },
        { field: "link", label: uiWord("Link", "الرابط"), type: "url" }
      ]
    }
  };
}

function cvValidationError(key) {
  return state.cv.validation?.[key] || "";
}

function renderCvField(label, controlHtml, error) {
  return `
    <label class="cv-field">
      <span class="cv-label">${escapeHtml(label)}</span>
      ${controlHtml}
      ${error ? `<span class="cv-error">${escapeHtml(error)}</span>` : ""}
    </label>
  `;
}

function renderCvInputControl(sectionKey, value, options) {
  const currentValue = String(value ?? "");
  const commonAttributes = sectionKey
    ? `data-cv-repeat="${sectionKey}" data-index="${options.index}" data-field="${options.field}"`
    : `data-cv-path="${options.path}"`;
  const errorKey = options.errorKey || options.path;

  if (options.type === "textarea") {
    return renderCvField(
      options.label,
      `
        <textarea class="editor-area auto-grow cv-textarea" rows="${options.rows || 4}" ${commonAttributes} ${options.disabled ? "disabled" : ""}>${escapeHtml(currentValue)}</textarea>
        ${options.improve ? `<button class="button button--soft micro-button cv-improve-button" type="button" data-cv-improve="${escapeHtml(errorKey)}">${escapeHtml(uiWord("Improve with AI", "حسّنه بالذكاء الاصطناعي"))}</button>` : ""}
      `,
      cvValidationError(errorKey)
    );
  }

  if (options.type === "checkbox") {
    const checked = Boolean(value);
    return `
      <label class="cv-checkbox">
        <input type="checkbox" ${commonAttributes} ${checked ? "checked" : ""}>
        <span>${escapeHtml(options.label)}</span>
      </label>
    `;
  }

  return renderCvField(
    options.label,
    `<input type="${options.type || "text"}" value="${escapeHtml(currentValue)}" ${commonAttributes} ${options.disabled ? "disabled" : ""}>`,
    cvValidationError(errorKey)
  );
}

function renderCvRepeatableSection(key) {
  const config = cvRepeatableConfig()[key];
  const entries = state.cv.form[key] || [];
  return `
    <section class="surface cv-section-card">
      <div class="panel-header">
        <div>
          <p class="section-label">${escapeHtml(config.title)}</p>
          <h2 class="panel-title">${escapeHtml(config.title)}</h2>
        </div>
        <button class="button button--soft" type="button" data-cv-add="${key}">${escapeHtml(config.addLabel)}</button>
      </div>
      <div class="cv-repeat-stack">
        ${entries.length ? entries.map((entry, index) => `
          <article class="cv-repeat-card">
            <div class="cv-repeat-head">
              <strong>${escapeHtml(config.itemLabel(entry, index))}</strong>
              <button class="button button--soft cv-remove-button" type="button" data-cv-remove="${key}" data-index="${index}">${escapeHtml(uiWord("Remove", "إزالة"))}</button>
            </div>
            <div class="cv-field-grid cv-field-grid--repeat">
              ${config.fields.map((field) => renderCvInputControl(key, entry[field.field], {
                ...field,
                index,
                errorKey: `${key}.${index}.${field.field}`,
                disabled: field.disabledWhen ? Boolean(entry[field.disabledWhen]) : false
              })).join("")}
            </div>
          </article>
        `).join("") : `
          <div class="cv-empty-slot">
            <p class="muted-line">${escapeHtml(uiWord("Nothing added here yet.", "لا يوجد شيء مضاف هنا حتى الآن."))}</p>
          </div>
        `}
      </div>
    </section>
  `;
}

function renderCvPreviewEntry(entry) {
  return `
    <article class="cv-preview-entry">
      ${(entry.title || entry.rightText) ? `
        <div class="cv-preview-entry-head">
          ${entry.title ? `<h3 class="cv-preview-entry-title">${escapeHtml(entry.title)}</h3>` : `<span></span>`}
          ${entry.rightText ? `<span class="cv-preview-entry-date">${escapeHtml(entry.rightText)}</span>` : ""}
        </div>
      ` : ""}
      ${entry.metaLine ? `<p class="cv-preview-meta">${escapeHtml(entry.metaLine)}</p>` : ""}
      ${(entry.body || []).map((line) => `<p class="cv-preview-text">${escapeHtml(line)}</p>`).join("")}
      ${entry.bullets?.length ? `<ul class="cv-preview-list">${entry.bullets.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : ""}
    </article>
  `;
}

function renderCvPreviewSection(section) {
  if (section.summary) {
    return `
      <section class="cv-preview-section">
        <h2 class="cv-preview-heading">${escapeHtml(section.title)}</h2>
        <p class="cv-preview-text">${escapeHtml(section.summary)}</p>
      </section>
    `;
  }
  return `
    <section class="cv-preview-section">
      <h2 class="cv-preview-heading">${escapeHtml(section.title)}</h2>
      ${(section.items || []).map(renderCvPreviewEntry).join("")}
    </section>
  `;
}

function renderCvPreview() {
  const documentModel = state.cv.generated;
  if (!documentModel) {
    const hasDraft = cvHasValue(state.cv.form);
    return `
      <div class="cv-preview-box">
        <div class="cv-preview-scroll" id="cvPreviewScroll" role="region" tabindex="0" aria-label="${escapeHtml(uiWord("CV preview area", "معاينة السيرة الذاتية"))}">
          <section class="cv-preview-empty">
            <p class="section-label">${escapeHtml(uiWord("CV Preview", "معاينة السيرة الذاتية"))}</p>
            <h2 class="panel-title" id="cvPreviewTitle" tabindex="-1">${escapeHtml(uiWord("Clean ATS-friendly preview", "معاينة نظيفة ومتوافقة مع أنظمة التوظيف"))}</h2>
            <p class="muted-line">${escapeHtml(hasDraft ? uiWord("Fill what you want, then click Generate CV to build the preview.", "املأ ما تريد ثم اضغط إنشاء السيرة لبناء المعاينة.") : uiWord("Add some information to generate your CV.", "أضف بعض المعلومات لإنشاء سيرتك الذاتية."))}</p>
          </section>
        </div>
      </div>
    `;
  }

  return `
    <div class="cv-preview-toolbar">
      <div>
        <p class="section-label">${escapeHtml(uiWord("Generated CV", "السيرة الذاتية المُنشأة"))}</p>
        <h2 class="panel-title" id="cvPreviewTitle" tabindex="-1">${escapeHtml(uiWord("Preview", "المعاينة"))}</h2>
      </div>
      <button class="button button--primary" id="cvDownload" type="button" ${runtime.busy.cv ? "disabled" : ""}>${escapeHtml(runtime.busy.cv ? uiWord("Preparing PDF...", "جارٍ تجهيز PDF...") : uiWord("Download PDF", "تنزيل PDF"))}</button>
    </div>
    <div class="cv-preview-box">
      <div class="cv-preview-scroll" id="cvPreviewScroll" role="region" tabindex="0" aria-label="${escapeHtml(uiWord("CV preview area", "معاينة السيرة الذاتية"))}">
        <article class="cv-preview-paper" dir="${documentModel.direction}">
          <header class="cv-preview-header">
            ${documentModel.name ? `<h1 class="cv-preview-name">${escapeHtml(documentModel.name)}</h1>` : ""}
            ${documentModel.professionalTitle ? `<p class="cv-preview-role">${escapeHtml(documentModel.professionalTitle)}</p>` : ""}
            ${documentModel.contactLines.length ? `<p class="cv-preview-contact">${documentModel.contactLines.map((item) => escapeHtml(item)).join(" | ")}</p>` : ""}
            ${documentModel.linkLines.length ? `<p class="cv-preview-contact">${documentModel.linkLines.map((item) => escapeHtml(item)).join(" | ")}</p>` : ""}
          </header>
          ${documentModel.sections.map(renderCvPreviewSection).join("")}
        </article>
      </div>
    </div>
  `;
}

function renderCvSampleNotice() {
  if (!runtime.sampleNotices?.cv) {
    return "";
  }
  return `
    <section class="sample-notice sample-notice--danger" role="alert" aria-live="polite">
      <strong>${escapeHtml(uiWord("Important notice", "تنبيه مهم"))}</strong>
      <p>${escapeHtml(uiWord(
        "The sample/example CV details are completely fake and only for demonstration. They do not belong to any real person, company, institution, or account.",
        "بيانات نموذج السيرة الذاتية تجريبية ووهمية بالكامل ومخصصة للعرض فقط. لا تعود إلى أي شخص أو شركة أو مؤسسة أو حساب حقيقي."
      ))}</p>
      <button class="button button--soft button--danger" id="cvSampleNoticeDismiss" type="button">${escapeHtml(uiWord("Okay", "حسنًا"))}</button>
    </section>
  `;
}

function renderCvPage() {
  const personal = state.cv.form.personal;
  const skills = state.cv.form.skills;
  const references = state.cv.form.references;
  return `
    <section class="hero glass cv-hero">
      <p class="eyebrow">${escapeHtml(uiWord("CV Creator", "منشئ السيرة الذاتية"))}</p>
      <h1 class="page-title">${escapeHtml(uiWord("Build a cleaner, ATS-friendly CV.", "أنشئ سيرة ذاتية أنظف ومتوافقة مع أنظمة التوظيف."))}</h1>
      <p class="page-subtitle">${escapeHtml(uiWord("Every field is optional. Empty fields stay out of the final CV. Generate the preview, then download a polished PDF.", "كل الحقول اختيارية. الحقول الفارغة لا تظهر في السيرة النهائية. أنشئ المعاينة ثم نزّل PDF مصقولًا."))}</p>
    </section>
    <section class="cv-layout">
      <article class="surface editor-panel cv-form-panel">
        <form class="stack-form cv-form" id="cvBuilderForm">
          <div class="cv-actions">
            <button class="button button--primary" type="submit">${escapeHtml(uiWord("Generate CV", "إنشاء السيرة الذاتية"))}</button>
            <button class="button button--soft" id="cvLoadSample" type="button">${escapeHtml(uiWord("Load sample", "تحميل نموذج"))}</button>
            <button class="button button--soft" id="cvClear" type="button">${escapeHtml(read("clear"))}</button>
          </div>

          <section class="surface cv-section-card">
            <div class="panel-header">
              <div>
                <p class="section-label">${escapeHtml(uiWord("Personal Information", "المعلومات الشخصية"))}</p>
                <h2 class="panel-title">${escapeHtml(uiWord("Personal Information", "المعلومات الشخصية"))}</h2>
              </div>
            </div>
            <div class="cv-field-grid">
              ${renderCvInputControl("", personal.fullName, { path: "personal.fullName", label: uiWord("Full Name", "الاسم الكامل"), type: "text" })}
              ${renderCvInputControl("", personal.professionalTitle, { path: "personal.professionalTitle", label: uiWord("Professional Title", "المسمى المهني"), type: "text" })}
              ${renderCvInputControl("", personal.email, { path: "personal.email", label: uiWord("Email", "البريد الإلكتروني"), type: "email" })}
              ${renderCvInputControl("", personal.phone, { path: "personal.phone", label: uiWord("Phone", "الهاتف"), type: "text" })}
              ${renderCvInputControl("", personal.location, { path: "personal.location", label: uiWord("Location", "الموقع"), type: "text" })}
              ${renderCvInputControl("", personal.linkedInUrl, { path: "personal.linkedInUrl", label: uiWord("LinkedIn URL", "رابط لينكدإن"), type: "url" })}
              ${renderCvInputControl("", personal.githubUrl, { path: "personal.githubUrl", label: uiWord("GitHub URL", "رابط GitHub"), type: "url" })}
              ${renderCvInputControl("", personal.portfolioUrl, { path: "personal.portfolioUrl", label: uiWord("Portfolio / Personal Website URL", "رابط الموقع الشخصي / المعرض"), type: "url" })}
            </div>
          </section>

          <section class="surface cv-section-card">
            <div class="panel-header">
              <div>
                <p class="section-label">${escapeHtml(uiWord("Professional Summary", "الملخص المهني"))}</p>
                <h2 class="panel-title">${escapeHtml(uiWord("Professional Summary", "الملخص المهني"))}</h2>
              </div>
            </div>
            ${renderCvInputControl("", state.cv.form.summary, { path: "summary", label: uiWord("Short summary / objective", "ملخص قصير / هدف مهني"), type: "textarea", rows: 5, improve: true })}
          </section>

          ${renderCvRepeatableSection("education")}
          ${renderCvRepeatableSection("experience")}
          ${renderCvRepeatableSection("projects")}

          <section class="surface cv-section-card">
            <div class="panel-header">
              <div>
                <p class="section-label">${escapeHtml(uiWord("Skills", "المهارات"))}</p>
                <h2 class="panel-title">${escapeHtml(uiWord("Skills", "المهارات"))}</h2>
              </div>
            </div>
            <div class="cv-field-grid">
              ${renderCvInputControl("", skills.technical, { path: "skills.technical", label: uiWord("Technical Skills", "المهارات التقنية"), type: "textarea", rows: 3 })}
              ${renderCvInputControl("", skills.soft, { path: "skills.soft", label: uiWord("Soft Skills", "المهارات الشخصية"), type: "textarea", rows: 3 })}
              ${renderCvInputControl("", skills.tools, { path: "skills.tools", label: uiWord("Tools / Platforms", "الأدوات / المنصات"), type: "textarea", rows: 3 })}
            </div>
          </section>

          ${renderCvRepeatableSection("certifications")}
          ${renderCvRepeatableSection("languages")}
          ${renderCvRepeatableSection("awards")}
          ${renderCvRepeatableSection("volunteer")}
          ${renderCvRepeatableSection("publications")}

          <section class="surface cv-section-card">
            <div class="panel-header">
              <div>
                <p class="section-label">${escapeHtml(uiWord("References", "المراجع"))}</p>
                <h2 class="panel-title">${escapeHtml(uiWord("References", "المراجع"))}</h2>
              </div>
            </div>
            <div class="cv-field-grid">
              ${renderCvInputControl("", references.availableOnRequest, { path: "references.availableOnRequest", label: uiWord("Available upon request", "متاحة عند الطلب"), type: "checkbox" })}
              ${renderCvInputControl("", references.text, { path: "references.text", label: uiWord("Custom reference text", "نص مخصص للمراجع"), type: "textarea", rows: 3 })}
            </div>
          </section>
        </form>
      </article>

      <aside class="surface output-panel cv-preview-panel">
        ${renderCvSampleNotice()}
        ${renderCvPreview()}
      </aside>
    </section>
  `;
}

function cvSetFieldByPath(path, value) {
  const parts = String(path || "").split(".");
  if (parts.length < 2) {
    return;
  }
  let cursor = state.cv.form;
  for (let index = 0; index < parts.length - 1; index += 1) {
    cursor = cursor[parts[index]];
    if (!cursor) {
      return;
    }
  }
  cursor[parts[parts.length - 1]] = value;
}

function cvClearValidationForField(path) {
  if (state.cv.validation?.[path]) {
    delete state.cv.validation[path];
  }
}

function cvMarkDraftDirty() {
  state.cv.generated = null;
}

function improveCvTextPlaceholder(text, kind) {
  const source = cvNormalizeMultiline(text, 6000);
  if (!source) {
    notify(uiWord("Add some text first, then try the improvement button again.", "أضف نصًا أولًا ثم جرّب زر التحسين مرة أخرى."), "warning");
    return source;
  }

  // Placeholder local refinement until a dedicated AI assist flow is wired later.
  const polished = source
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.charAt(0).toUpperCase() + line.slice(1))
    .join("\n");

  notify(
    kind === "summary"
      ? uiWord("Applied a local placeholder polish to the summary. AI assistance can be wired here later.", "تم تطبيق تحسين محلي تجريبي على الملخص. يمكن ربط الذكاء الاصطناعي هنا لاحقًا.")
      : uiWord("Applied a local placeholder polish. AI assistance can be wired here later.", "تم تطبيق تحسين محلي تجريبي. يمكن ربط الذكاء الاصطناعي هنا لاحقًا."),
    "info"
  );
  return polished;
}

function cvHandleInputChange(target) {
  if (!(target instanceof HTMLElement)) {
    return;
  }

  const path = target.getAttribute("data-cv-path");
  if (path) {
    const value = target instanceof HTMLInputElement && target.type === "checkbox" ? target.checked : target.value;
    cvSetFieldByPath(path, value);
    cvClearValidationForField(path);
    cvMarkDraftDirty();
    persist();
    return;
  }

  const repeatKey = target.getAttribute("data-cv-repeat");
  const field = target.getAttribute("data-field");
  const index = Number(target.getAttribute("data-index"));
  if (!repeatKey || !field || Number.isNaN(index) || !Array.isArray(state.cv.form[repeatKey]) || !state.cv.form[repeatKey][index]) {
    return;
  }

  const value = target instanceof HTMLInputElement && target.type === "checkbox" ? target.checked : target.value;
  state.cv.form[repeatKey][index][field] = value;
  cvClearValidationForField(`${repeatKey}.${index}.${field}`);
  if (repeatKey === "experience" && field === "current" && value) {
    state.cv.form[repeatKey][index].endDate = "";
  }
  cvMarkDraftDirty();
  persist();
}

function cvFocusPreview() {
  requestAnimationFrame(() => {
    document.getElementById("cvPreviewScroll")?.focus();
  });
}

function generateCvFromForm(options) {
  const errors = validateCvForm(state.cv.form);
  state.cv.validation = errors;
  if (Object.keys(errors).length) {
    persist();
    renderApp();
    notify(uiWord("Fix the highlighted formatting fields, then generate again.", "أصلح الحقول ذات التنسيق غير الصحيح ثم أنشئ السيرة مرة أخرى."), "warning");
    return null;
  }

  const nextDocument = buildCvDocument(state.cv.form);
  state.cv.generated = nextDocument;
  persist();
  renderApp();

  if (!nextDocument) {
    notify(uiWord("Add some information to generate your CV.", "أضف بعض المعلومات لإنشاء سيرتك الذاتية."), "warning");
    return null;
  }

  if (options?.focus) {
    cvFocusPreview();
  }
  return nextDocument;
}

async function downloadCvPdf(documentModel) {
  const response = await fetch("/api/cv-pdf", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      document: documentModel,
      fileName: documentModel.fileName
    })
  });

  if (!response.ok) {
    let errorMessage = "CV PDF export failed.";
    try {
      const payload = await response.json();
      errorMessage = payload.error || errorMessage;
    } catch {
      errorMessage = await response.text() || errorMessage;
    }
    throw new Error(errorMessage);
  }

  const blob = await response.blob();
  const downloadUrl = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = downloadUrl;
  anchor.download = documentModel.fileName || "resume.pdf";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(downloadUrl);
}

async function handleCvDownload() {
  const documentModel = state.cv.generated || generateCvFromForm({ focus: false });
  if (!documentModel) {
    return;
  }

  runtime.busy.cv = true;
  renderApp();
  try {
    await downloadCvPdf(documentModel);
  } catch (error) {
    alertError(error);
  } finally {
    runtime.busy.cv = false;
    renderApp();
  }
}

function bindCvEvents() {
  const form = document.getElementById("cvBuilderForm");
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    generateCvFromForm({ focus: true });
  });
  form?.addEventListener("input", (event) => cvHandleInputChange(event.target));
  form?.addEventListener("change", (event) => cvHandleInputChange(event.target));
  form?.addEventListener("click", (event) => {
    const target = event.target instanceof HTMLElement ? event.target.closest("[data-cv-add],[data-cv-remove],[data-cv-improve]") : null;
    if (!target) {
      return;
    }

    const addKey = target.getAttribute("data-cv-add");
    if (addKey) {
      const config = cvRepeatableConfig()[addKey];
      if (config) {
        state.cv.form[addKey].push(config.create());
        cvMarkDraftDirty();
        persist();
        renderApp({ transition: true });
      }
      return;
    }

    const removeKey = target.getAttribute("data-cv-remove");
    const removeIndex = Number(target.getAttribute("data-index"));
    if (removeKey && !Number.isNaN(removeIndex) && Array.isArray(state.cv.form[removeKey])) {
      state.cv.form[removeKey].splice(removeIndex, 1);
      cvMarkDraftDirty();
      persist();
      renderApp({ transition: true });
      return;
    }

    const improveKey = target.getAttribute("data-cv-improve");
    if (improveKey === "summary") {
      state.cv.form.summary = improveCvTextPlaceholder(state.cv.form.summary, "summary");
      cvMarkDraftDirty();
      persist();
      renderApp();
      return;
    }

    const parts = String(improveKey || "").split(".");
    if (parts.length === 3) {
      const [sectionKey, rawIndex, field] = parts;
      const index = Number(rawIndex);
      if (Array.isArray(state.cv.form[sectionKey]) && state.cv.form[sectionKey][index]) {
        state.cv.form[sectionKey][index][field] = improveCvTextPlaceholder(state.cv.form[sectionKey][index][field], field);
        cvMarkDraftDirty();
        persist();
        renderApp();
      }
    }
  });

  document.getElementById("cvLoadSample")?.addEventListener("click", () => {
    state.cv.form = createCvSampleForm();
    state.cv.validation = {};
    persist();
    generateCvFromForm({ focus: true });
  });

  document.getElementById("cvClear")?.addEventListener("click", () => {
    state.cv = createCvState();
    persist();
    renderApp({ transition: true });
  });

  document.getElementById("cvSampleNoticeDismiss")?.addEventListener("click", () => {
    dismissSampleNotice("cv");
  });

  document.getElementById("cvDownload")?.addEventListener("click", handleCvDownload);
  const previewScroll = document.getElementById("cvPreviewScroll");
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

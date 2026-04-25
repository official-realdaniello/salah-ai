function renderPrintShellMessage(message) {
  document.title = "Printable document";
  document.documentElement.lang = "en";
  document.documentElement.dir = "ltr";
  document.body.innerHTML = `<main id="printShellStatus">${String(message || "Printable document could not be loaded.")}</main>`;
}

function buildStyleSheets(styleTexts) {
  if (
    !("adoptedStyleSheets" in document)
    || typeof CSSStyleSheet === "undefined"
    || !("replaceSync" in CSSStyleSheet.prototype)
  ) {
    return false;
  }

  try {
    document.adoptedStyleSheets = styleTexts.map((cssText) => {
      const sheet = new CSSStyleSheet();
      sheet.replaceSync(cssText);
      return sheet;
    });
    return true;
  } catch {
    return false;
  }
}

function openPrintableDocument() {
  const params = new URLSearchParams(window.location.search);
  const storageKey = String(params.get("key") || "").trim();
  if (!storageKey) {
    renderPrintShellMessage("Printable document was not found.");
    return;
  }

  let html = "";
  try {
    html = String(localStorage.getItem(storageKey) || "");
    localStorage.removeItem(storageKey);
  } catch {
    renderPrintShellMessage("This browser could not open the printable document.");
    return;
  }

  if (!html) {
    renderPrintShellMessage("Printable document has expired. Export it again.");
    return;
  }

  const parsed = new DOMParser().parseFromString(html, "text/html");
  const styleTexts = Array.from(parsed.querySelectorAll("style"))
    .map((node) => String(node.textContent || "").trim())
    .filter(Boolean);
  buildStyleSheets(styleTexts);

  document.title = parsed.title || "Printable document";
  document.documentElement.lang = parsed.documentElement.lang || "en";
  document.documentElement.dir = parsed.documentElement.dir === "rtl" ? "rtl" : "ltr";
  document.body.innerHTML = parsed.body?.innerHTML || "<main id=\"printShellStatus\">Printable document could not be rendered.</main>";

  window.setTimeout(() => {
    try {
      window.focus();
      window.print();
    } catch {}
  }, 160);
}

openPrintableDocument();

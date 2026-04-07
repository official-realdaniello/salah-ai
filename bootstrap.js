(function () {
  var timeoutMs = 2500;

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function renderFallback() {
    if (window.__SALAH_APP_READY__) {
      return;
    }

    var root = document.getElementById("app");
    if (!root || root.innerHTML.trim()) {
      return;
    }

    root.innerHTML =
      '<div class="site-shell">' +
        '<section class="surface editor-panel">' +
          '<h1 class="panel-title">Salah&apos;s AI could not finish loading</h1>' +
          '<p class="muted-line">Refresh the page once. If it still fails, your browser is blocking or failing to run the main script.</p>' +
        "</section>" +
      "</div>";
  }

  window.addEventListener("error", function (event) {
    var root = document.getElementById("app");
    if (!root) {
      return;
    }

    var message = event && event.message ? event.message : "Unknown script error.";
    root.innerHTML =
      '<div class="site-shell">' +
        '<section class="surface editor-panel">' +
          '<h1 class="panel-title">Salah&apos;s AI failed to load</h1>' +
          '<p class="muted-line">' + escapeHtml(message) + "</p>" +
        "</section>" +
      "</div>";
  });

  window.setTimeout(renderFallback, timeoutMs);
}());

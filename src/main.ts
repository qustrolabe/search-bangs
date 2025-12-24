import { getRedirectUrl } from "./logic"; // Import shared logic
import "./global.css";

function noSearchDefaultPageRender() {
  const app = document.querySelector<HTMLDivElement>("#app")!;
  app.innerHTML = `
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; ">
      <div class="content-container">
        <div class="url-container"> 
          <input 
            class="url-input"
            type="text" 
            value="${window.location.origin + window.location.pathname}?q=%s"
            readonly 
          />
          <button class="copy-button">
            copy
          </button>
        </div>
      </div>
    </div>
  `;

  const copyButton = app.querySelector<HTMLButtonElement>(".copy-button")!;
  const urlInput = app.querySelector<HTMLInputElement>(".url-input")!;

  copyButton.addEventListener("click", async () => {
    await navigator.clipboard.writeText(urlInput.value);
  });
}

function doRedirect() {
  const url = new URL(window.location.href);
  const query = url.searchParams.get("q")?.trim() ?? "";

  // Use shared logic
  const searchUrl = getRedirectUrl(query);

  if (!searchUrl) {
    noSearchDefaultPageRender();
    return;
  }

  window.location.replace(searchUrl);
}

doRedirect();

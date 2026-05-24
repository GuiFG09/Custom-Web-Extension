const STORAGE_KEY = 'customweb-extension-settings';
const STYLE_ID = 'customweb-extension-styles';

const DEFAULT_SETTINGS = {
  themeId: null,
  fontId: null,
  enabled: false,
};

const THEME_STYLES = {
  dark: {
    background: '#1A181C',
    text: '#E8DEF8',
    accent: '#5f4b91',
  },
  light: {
    background: '#F8FAF6',
    text: '#111827',
    accent: '#5f4b91',
  },
};

function normalizeSettings(settings) {
  return {
    ...DEFAULT_SETTINGS,
    ...(settings || {}),
  };
}

function removeStyle() {
  const style = document.getElementById(STYLE_ID);

  if (style) {
    style.remove();
  }
}

function getFontFamily(fontId) {
  if (fontId === 2) {
    return '"Merriweather", serif';
  }

  if (fontId === 3) {
    return '"Fira Code", monospace';
  }

  if (fontId === 4) {
    return '"OpenDyslexic", sans-serif';
  }

  if (fontId === 5) {
    return '"Comic Sans MS", "Comic Sans", cursive';
  }

  return '"Roboto", sans-serif';
}

function buildCss(settings) {
  const normalizedSettings = normalizeSettings(settings);
  const themeId = normalizedSettings.themeId;
  const fontId = normalizedSettings.fontId;

  let css = '';

  if (themeId !== null) {
    const theme = themeId === 1 ? THEME_STYLES.dark : THEME_STYLES.light;

    css += `
      html, body {
        background-color: ${theme.background} !important;
        color: ${theme.text} !important;
      }

      body {
        color: ${theme.text} !important;
      }

      body, body * {
        color: inherit !important;
      }

      a, a * {
        color: ${theme.accent} !important;
      }

      ::selection {
        background: ${theme.accent} !important;
        color: ${theme.background} !important;
      }
    `;
  }

  if (fontId !== null) {
    const fontFamily = getFontFamily(fontId);

    css += `
      html, body {
        font-family: ${fontFamily} !important;
      }

      body, body * {
        font-family: ${fontFamily} !important;
      }
    `;
  }

  return css;
}

function applySettings(settings) {
  const normalizedSettings = normalizeSettings(settings);

  if (normalizedSettings.enabled === false && normalizedSettings.themeId === null && normalizedSettings.fontId === null) {
    removeStyle();
    return;
  }

  const css = buildCss(normalizedSettings);

  if (!css) {
    removeStyle();
    return;
  }

  let style = document.getElementById(STYLE_ID);

  if (!style) {
    style = document.createElement('style');
    style.id = STYLE_ID;
    document.head.appendChild(style);
  }

  style.textContent = css;
}

function readSettings() {
  if (typeof chrome !== 'undefined' && chrome.storage?.local) {
    chrome.storage.local.get(STORAGE_KEY, (result) => {
      applySettings(result[STORAGE_KEY]);
    });
    return;
  }

  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    applySettings(DEFAULT_SETTINGS);
    return;
  }

  try {
    applySettings(JSON.parse(raw));
  } catch {
    applySettings(DEFAULT_SETTINGS);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', readSettings);
} else {
  readSettings();
}

if (typeof chrome !== 'undefined' && chrome.storage?.local) {
  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName !== 'local' || !changes[STORAGE_KEY]) {
      return;
    }

    applySettings(changes[STORAGE_KEY].newValue);
  });
}
const STORAGE_KEY = 'customweb-extension-settings';

export const DEFAULT_SETTINGS = {
  themeId: null,
  fontId: null,
  enabled: false,
};

function readFromLocalStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return DEFAULT_SETTINGS;
    }

    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_SETTINGS,
      ...parsed,
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

function writeToLocalStorage(settings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

export async function loadSettings() {
  if (typeof chrome !== 'undefined' && chrome.storage?.local) {
    return new Promise((resolve) => {
      chrome.storage.local.get(STORAGE_KEY, (result) => {
        const settings = result[STORAGE_KEY] || DEFAULT_SETTINGS;
        resolve({
          ...DEFAULT_SETTINGS,
          ...settings,
        });
      });
    });
  }

  return readFromLocalStorage();
}

export async function saveSettings(settings) {
  if (typeof chrome !== 'undefined' && chrome.storage?.local) {
    chrome.storage.local.set({ [STORAGE_KEY]: settings });
    return;
  }

  writeToLocalStorage(settings);
}

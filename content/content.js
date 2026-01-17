const SETTING_KEYS = [
  'hideHome',
  'hideExplore',
  'hideNotifications',
  'hideMessages',
  'hideGrok',
  'hideLists',
  'hideBookmarks',
  'hideCommunities',
  'hidePremium',
  'hideVerifiedOrgs',
  'hideProfile',
  'hideMore',
  'hideCreatorStudio',
  'hideSearch',
  'hideTrends',
  'hideWhoToFollow',
  'hideSubscribeToPremium',
  'hideFooter'
];

function applySettings(settings) {
  SETTING_KEYS.forEach(key => {
    if (settings[key]) {
      document.body.classList.add(`x-customizer-${key}`);
    } else {
      document.body.classList.remove(`x-customizer-${key}`);
    }
  });
}

async function loadAndApplySettings() {
  const defaultSettings = SETTING_KEYS.reduce((acc, key) => {
    acc[key] = false;
    return acc;
  }, {});

  const settings = await chrome.storage.sync.get(defaultSettings);
  applySettings(settings);
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'settingChanged') {
    const { key, value } = message;
    if (value) {
      document.body.classList.add(`x-customizer-${key}`);
    } else {
      document.body.classList.remove(`x-customizer-${key}`);
    }
  }
});

if (document.body) {
  loadAndApplySettings();
} else {
  document.addEventListener('DOMContentLoaded', loadAndApplySettings);
}

const observer = new MutationObserver(() => {
  loadAndApplySettings();
});

function startObserver() {
  observer.observe(document.body, {
    childList: true,
    subtree: false
  });
}

if (document.body) {
  startObserver();
} else {
  document.addEventListener('DOMContentLoaded', startObserver);
}

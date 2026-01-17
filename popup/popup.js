const DEFAULT_SETTINGS = {
  hideHome: false,
  hideExplore: false,
  hideNotifications: false,
  hideMessages: false,
  hideGrok: false,
  hideLists: false,
  hideBookmarks: false,
  hideCommunities: false,
  hidePremium: false,
  hideVerifiedOrgs: false,
  hideProfile: false,
  hideMore: false,
  hideCreatorStudio: false,
  hideSearch: false,
  hideTrends: false,
  hideWhoToFollow: false,
  hideSubscribeToPremium: false,
  hideFooter: false
};

async function loadSettings() {
  const storage = await chrome.storage.sync.get(DEFAULT_SETTINGS);

  document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    const key = checkbox.dataset.key;
    if (key && storage[key] !== undefined) {
      checkbox.checked = storage[key];
    }
  });
}

async function saveSetting(key, value) {
  await chrome.storage.sync.set({ [key]: value });

  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tabs[0]?.id) {
    chrome.tabs.sendMessage(tabs[0].id, {
      type: 'settingChanged',
      key,
      value
    }).catch(() => {});
  }
}

function initToggles() {
  document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
      const key = e.target.dataset.key;
      if (key) {
        saveSetting(key, e.target.checked);
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  loadSettings();
  initToggles();
});

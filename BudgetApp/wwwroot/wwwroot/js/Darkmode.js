import { isLocalStorageAvailable } from './Utilities/LocalStorageUtilities.js';
var DARK_MODE = "darkMode";
var ENABLED = "enabled";
var DISABLED = null;
var DARK_MODE_CLASS = "darkMode";
var darkMode = localStorage.getItem(DARK_MODE);
var fallbackDarkModeStorage;
function updateStorage(state) {
    if (isLocalStorageAvailable()) {
        localStorage.setItem(DARK_MODE, state);
    }
    else {
    }
}
function getStorageData() {
    if (isLocalStorageAvailable()) {
        return localStorage.getItem(DARK_MODE);
    }
    else {
    }
}
var darkModeToggle = document.querySelector('#dark-mode-toggle');
var darkModeIcon = darkModeToggle.querySelector('i');
var enableDarkMode = function () {
    document.body.classList.add(DARK_MODE_CLASS);
    darkModeIcon.classList.remove('bi-brightness-high-fill');
    darkModeIcon.classList.add('bi-moon-stars-fill');
    updateStorage(ENABLED);
};
var disableDarkMode = function () {
    document.body.classList.remove(DARK_MODE_CLASS);
    darkModeIcon.classList.remove('bi-moon-stars-fill');
    darkModeIcon.classList.add('bi-brightness-high-fill');
    updateStorage(DISABLED);
};
if (darkMode === 'enabled') {
    enableDarkMode();
}
else {
    disableDarkMode();
}
darkModeToggle.addEventListener('click', function () {
    darkMode = getStorageData();
    if (darkMode !== 'enabled') {
        enableDarkMode();
    }
    else {
        disableDarkMode();
    }
});
//# sourceMappingURL=Darkmode.js.map
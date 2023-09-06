import { isLocalStorageAvailable } from './Utilities/LocalStorageUtilities.js'

const DARK_MODE = "darkMode"
const ENABLED = "enabled"
const DISABLED = null
const DARK_MODE_CLASS = "darkMode"

let darkMode = localStorage.getItem(DARK_MODE)
let fallbackDarkModeStorage: Record<string, string>

function updateStorage(state) {
    if (isLocalStorageAvailable()) {
        localStorage.setItem(DARK_MODE, state)
    }
    else {

    }
}

function getStorageData() {
    if (isLocalStorageAvailable()) {
        return localStorage.getItem(DARK_MODE)
    }
    else {

    }
}

const darkModeToggle = document.querySelector('#dark-mode-toggle')
const darkModeIcon = darkModeToggle.querySelector('i')

const enableDarkMode = function () {

    document.body.classList.add(DARK_MODE_CLASS)

    darkModeIcon.classList.remove('bi-brightness-high-fill')
    darkModeIcon.classList.add('bi-moon-stars-fill')

    updateStorage(ENABLED)
}

const disableDarkMode = function () {

    document.body.classList.remove(DARK_MODE_CLASS)

    darkModeIcon.classList.remove('bi-moon-stars-fill')
    darkModeIcon.classList.add('bi-brightness-high-fill')

    updateStorage(DISABLED)
}

if (darkMode === 'enabled') {
    enableDarkMode()
}
else {
    disableDarkMode()
}

darkModeToggle.addEventListener('click', function () {
    darkMode = getStorageData()

    if (darkMode !== 'enabled') {
        enableDarkMode()

    }
    else {
        disableDarkMode()
    }

})
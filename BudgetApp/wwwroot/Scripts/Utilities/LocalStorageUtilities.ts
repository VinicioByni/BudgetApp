
export const clearLocalStorage = function () {
    localStorage.clear()
}

const testString = "test"
const enabledString = "enabled"

export const isLocalStorageAvailable = function () {
    if (typeof localStorage === 'undefined') {
        return false
    }

    localStorage.setItem(testString, enabledString)

    if (localStorage.getItem(testString) !== enabledString) {
        return false
    }

    return true
}
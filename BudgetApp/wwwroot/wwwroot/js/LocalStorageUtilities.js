export var clearLocalStorage = function () {
    localStorage.clear();
};
var testString = "test";
var enabledString = "enabled";
export var isLocalStorageAvaialable = function () {
    if (typeof localStorage === 'undefined') {
        return false;
    }
    localStorage.setItem(testString, enabledString);
    if (localStorage.getItem(testString) !== enabledString) {
        return false;
    }
    return true;
};
//# sourceMappingURL=LocalStorageUtilities.js.map
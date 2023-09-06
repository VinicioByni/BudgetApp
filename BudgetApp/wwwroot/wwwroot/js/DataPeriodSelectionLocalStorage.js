import { isLocalStorageAvailable } from './Utilities/LocalStorageUtilities.js';
var fallBackStorage = {};
export var isPeriodInitialDateSet = function () {
    var periodInitialDate;
    if (isLocalStorageAvailable()) {
        periodInitialDate = localStorage.getItem('periodInitialDate');
    }
    else {
        periodInitialDate = fallBackStorage['periodInitialDate'];
    }
    if (periodInitialDate === null || periodInitialDate === undefined) {
        return false;
    }
    return true;
};
export var setPeriodInitialDate = function (periodInitialDate) {
    if (isLocalStorageAvailable()) {
        localStorage.setItem('periodInitialDate', periodInitialDate);
    }
    else {
        fallBackStorage['periodInitialDate'] = periodInitialDate;
    }
};
export var getPeriodInitialDate = function () {
    if (isLocalStorageAvailable()) {
        return localStorage.getItem('periodInitialDate');
    }
    else {
        return fallBackStorage['periodInitialDate'];
    }
};
//# sourceMappingURL=DataPeriodSelectionLocalStorage.js.map
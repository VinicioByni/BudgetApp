export var safeParseInt = function (value, defaultValue) {
    if (value === null || value === undefined) {
        return defaultValue;
    }
    var parsedValue = parseInt(value);
    if (isNaN(parsedValue)) {
        Error('Error trying to parseInt value, not a number');
        return defaultValue;
    }
    else {
        return parsedValue;
    }
};
export var safeParseFloat = function (value, defaultValue) {
    if (value === null || value === undefined) {
        return defaultValue;
    }
    var parsedValue = parseFloat(value);
    if (isNaN(parsedValue)) {
        Error('Error trying to parseFloat value, not a number');
        return defaultValue;
    }
    else {
        return parsedValue;
    }
};
//# sourceMappingURL=ParseUtilities.js.map
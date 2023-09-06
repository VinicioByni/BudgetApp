export var titleCase = function (string) {
    string = string.slice(0, 1).toUpperCase() + string.slice(1);
    return string;
};
export var safeToString = function (value, defaultValue) {
    if (typeof value === 'string') {
        return value;
    }
    else if (value === null || value === undefined) {
        return '';
    }
    else {
        try {
            return value.toString();
        }
        catch (error) {
            console.error('Failed to convert value to a String');
            return '';
        }
    }
};
//# sourceMappingURL=StringUtilities.js.map
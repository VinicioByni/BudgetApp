export function parseToNullableFloat(value) {
    var parsedValue = parseFloat(value);
    if (isNaN(parsedValue))
        return null;
    else
        return parsedValue;
}
//# sourceMappingURL=parseUtils.js.map
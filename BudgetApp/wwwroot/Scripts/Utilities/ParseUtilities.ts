
export const safeParseInt = function (value, defaultValue) {
    if (value === null || value === undefined) {
        return defaultValue
    }
    
        
    const parsedValue = parseInt(value)
    if (isNaN(parsedValue)) {
        Error('Error trying to parseInt value, not a number')
        return defaultValue
    }
    else {
        return parsedValue
    }
}

export const safeParseFloat = function (value, defaultValue) {
    if (value === null || value === undefined) {
        return defaultValue
    }


    const parsedValue = parseFloat(value)
    if (isNaN(parsedValue)) {
        Error('Error trying to parseFloat value, not a number')
        return defaultValue
    }
    else {
        return parsedValue
    }
}
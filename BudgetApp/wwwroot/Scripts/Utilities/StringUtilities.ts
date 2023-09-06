
export const titleCase =function(string: string): string {
    string = string.slice(0, 1).toUpperCase() + string.slice(1)
    return string
}

export const safeToString = function (value, defaultValue: string):string {
    if (typeof value === 'string') {
        return value
    }
    else if (value === null || value === undefined) {
        return ''
    }
    else {
        try {
            return value.toString()
        }
        catch (error) {
            console.error('Failed to convert value to a String')
            return ''
        }
    }
}
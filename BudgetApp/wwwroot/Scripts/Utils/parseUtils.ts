export function parseToNullableFloat(value: string) {
    const parsedValue = parseFloat(value)

    if (isNaN(parsedValue)) return null
    else return parsedValue
} 

export function successMessage(message: string) {
    const fullMessage = 'Success: ' + message
    console.log(fullMessage)
}

export function failMessage(message: string) {
    const fullMessage = 'Unsuccessful: ' + message
    console.log(fullMessage)
}
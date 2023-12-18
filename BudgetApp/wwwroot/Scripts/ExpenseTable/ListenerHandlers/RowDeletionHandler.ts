export function handleRowDeletionRequest(form: HTMLFormElement) {
    const formData = new FormData(form)

    formData.forEach(function (value, key) {
        
        // * Add delete call
        console.log(key + ": " + value);
    });
}
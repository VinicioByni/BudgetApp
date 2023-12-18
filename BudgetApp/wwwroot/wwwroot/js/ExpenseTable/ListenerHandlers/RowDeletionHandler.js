export function handleRowDeletionRequest(form) {
    var formData = new FormData(form);
    formData.forEach(function (value, key) {
        // * Add delete call
        console.log(key + ": " + value);
    });
}
//# sourceMappingURL=RowDeletionHandler.js.map
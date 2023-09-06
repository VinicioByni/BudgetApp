import { getTableApiUrls } from '../CRUD/TableApiUrls.js';
import { fetchRead } from '../CRUD/ReadApi.js';
export var fetchDelete = function (id, tableVariant) {
    var tableApiUrls = getTableApiUrls(tableVariant);
    var deleteParametersUrl = deleteParametersToUrl(id);
    fetch(tableApiUrls.Delete + deleteParametersUrl, {
        method: "DELETE"
    })
        .then(function (response) {
        if (!response.ok) {
            throw new Error('Delete fetch network error');
        }
        return response.text();
    })
        .then(function (text) {
    })
        .catch(function (error) {
        console.error('Delete fetch table error', error);
    })
        .finally(function () {
        fetchRead(tableVariant);
    });
};
function deleteParametersToUrl(id) {
    return "Id=".concat(id);
}
//# sourceMappingURL=DeleteApi.js.map
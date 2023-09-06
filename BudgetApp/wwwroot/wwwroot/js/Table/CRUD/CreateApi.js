import { getTableApiUrls } from '../CRUD/TableApiUrls.js';
import { fetchRead } from '../CRUD/ReadApi.js';
export var fetchCreate = function (model, tableVariant) {
    var tableApiUrls = getTableApiUrls(tableVariant);
    var tableVariantModelParametersUrl = modelParametersToUrl(model, tableVariant);
    fetch(tableApiUrls.Create + tableVariantModelParametersUrl, {
        method: "POST"
    })
        .then(function (response) {
        if (!response.ok) {
            throw new Error('Create table row fetch error');
        }
        return response.text();
    })
        .then(function (text) {
    })
        .catch(function (error) {
        console.error('Create table row fetch error', error);
    })
        .finally(function () {
        fetchRead(tableVariant);
    });
};
function modelParametersToUrl(model, tableVariant) {
    if (tableVariant === "income") {
        return "Amount=".concat(model.Amount, "&Date=").concat(model.Date, "&Description=").concat(model.Description, "&IncomeCategoryId=").concat(model.CategoryId, "&AccountId=").concat(model.AccountId);
    }
    else {
        return "Amount=".concat(model.Amount, "&Date=").concat(model.Date, "&Description=").concat(model.Description, "&ExpenseCategoryId=").concat(model.CategoryId, "&AccountId=").concat(model.AccountId, "&CreditCardId=").concat(model.CreditCardId, "&DebtId=").concat(model.DebtId);
    }
}
//# sourceMappingURL=CreateApi.js.map
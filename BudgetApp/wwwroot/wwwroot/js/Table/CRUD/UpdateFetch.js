import { EXPENSES_UPDATE_ENDPOINT_URL } from '../ControllerEndpointUrls.js';
export var fetchUpdate = function (rowObject, tableSelectedString) {
    // get expense (or income) object ready
    console.log(rowObject);
    // Fetch
    // fetch()
    var rowObjectStringUrl = "Id=".concat(rowObject.Id, "&Amount=").concat(rowObject.Amount, "&Date=").concat(rowObject.Date, "&Description=").concat(rowObject.Description, "&ExpenseCategoryId=").concat(rowObject.ExpenseCategoryId, "&AccountId=&CreditCardId=23&DebtId=");
    fetch("".concat(EXPENSES_UPDATE_ENDPOINT_URL).concat(rowObjectStringUrl), {
        method: "POST"
    })
        .then(function (res) { return res.text(); })
        .then(function (text) {
    });
};
//# sourceMappingURL=UpdateFetch.js.map
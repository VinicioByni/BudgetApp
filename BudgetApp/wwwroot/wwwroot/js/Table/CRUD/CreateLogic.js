import { fetchCreate } from './CreateApi.js';
import { safeToString } from '../../Utilities/StringUtilities.js';
import { safeParseInt, safeParseFloat } from '../../Utilities/ParseUtilities.js';
export var createRow = function (tableVariant) {
    // Special select list case for expense table
    if (tableVariant === "expense") {
        changeSelectListName();
    }
    var form = document.querySelector("#".concat(tableVariant, "CreateForm"));
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        if (event.target instanceof HTMLFormElement) {
            var formData = new FormData(event.target);
            var formObjectModel = {
                Amount: safeParseFloat(safeToString(formData.get('Amount'), "0"), 0),
                Date: safeToString(formData.get('Date'), "2000-01-01"),
                CategoryId: safeParseInt(safeToString(formData.get("CategoryId"), ""), null),
                Description: safeToString(formData.get('Description'), ""),
                AccountId: safeParseInt(safeToString(formData.get('AccountId'), ""), null),
                CreditCardId: safeParseInt(safeToString(formData.get('CreditCardId'), ""), null),
                DebtId: safeParseInt(safeToString(formData.get('DebtId'), ""), null)
            };
            fetchCreate(formObjectModel, tableVariant);
        }
    });
};
var changeSelectListName = function () {
    var expenseSelectList = document.querySelector("#paymentSelectList");
    if (expenseSelectList instanceof HTMLSelectElement) {
        expenseSelectList.addEventListener('change', function () {
            var selectIndex = this.selectedIndex;
            var selectedOption = this.options[selectIndex];
            var selectedName = selectedOption.getAttribute('data-name');
            expenseSelectList.name = selectedName;
        });
    }
};
//# sourceMappingURL=CreateLogic.js.map
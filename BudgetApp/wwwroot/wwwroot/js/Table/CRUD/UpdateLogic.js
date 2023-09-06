import { fetchUpdate } from './UpdateApi.js';
import { safeToString } from '../../Utilities/StringUtilities.js';
import { safeParseInt, safeParseFloat } from '../../Utilities/ParseUtilities.js';
export var updateRow = function (tableVariant) {
    var editBtns = document.querySelectorAll(".".concat(tableVariant, "-edit-btn"));
    editBtns.forEach(function (editBtn) {
        editBtn.addEventListener('click', function () {
            var row = this.closest("tr");
            var rowId = row.dataset.id;
            showEditMode(tableVariant, row, editBtn);
            var cancelBtn = row.querySelector(".".concat(tableVariant, "-cancel-btn"));
            cancelBtn.addEventListener('click', function () { return hideEditMode(tableVariant, row); });
            // Special select list case for expense table
            if (tableVariant === "expense") {
                changeSelectListName(rowId);
            }
            var form = document.querySelector("#".concat(tableVariant, "Form-").concat(rowId));
            form.addEventListener('submit', function (event) {
                event.preventDefault();
                if (event.target instanceof HTMLFormElement) {
                    var formData = new FormData(event.target);
                    var formObjectModel = {
                        Id: rowId,
                        Amount: safeParseFloat(safeToString(formData.get('Amount'), "0"), 0),
                        Date: safeToString(formData.get('Date'), "2000-01-01"),
                        CategoryId: safeParseInt(safeToString(formData.get("CategoryId"), ""), null),
                        Description: safeToString(formData.get('Description'), ""),
                        AccountId: safeParseInt(safeToString(formData.get('AccountId'), ""), null),
                        CreditCardId: safeParseInt(safeToString(formData.get('CreditCardId'), ""), null),
                        DebtId: safeParseInt(safeToString(formData.get('DebtId'), ""), null)
                    };
                    fetchUpdate(formObjectModel, tableVariant);
                }
            });
        });
    });
};
var changeSelectListName = function (rowId) {
    var expenseSelectList = document.querySelector("#paymentSelectList-".concat(rowId));
    if (expenseSelectList instanceof HTMLSelectElement) {
        expenseSelectList.addEventListener('change', function () {
            var selectIndex = this.selectedIndex;
            var selectedOption = this.options[selectIndex];
            var selectedName = selectedOption.getAttribute('data-name');
            expenseSelectList.name = selectedName;
        });
    }
};
function showEditMode(tableVariant, row, editBtn) {
    var spans = row.querySelectorAll('span');
    var inputs = row.querySelectorAll('input');
    var selects = row.querySelectorAll('select');
    spans.forEach(function (span) {
        span.style.display = "none";
    });
    inputs.forEach(function (input) {
        input.style.display = "block";
    });
    selects.forEach(function (select) {
        select.style.display = "block";
    });
    var deleteBtn = row.querySelector(".".concat(tableVariant, "-delete-btn"));
    var cancelBtn = row.querySelector(".".concat(tableVariant, "-cancel-btn"));
    var updateBtn = row.querySelector(".".concat(tableVariant, "-update-btn"));
    if (editBtn instanceof HTMLButtonElement) {
        editBtn.style.display = "none";
    }
    if (deleteBtn instanceof HTMLButtonElement) {
        deleteBtn.style.display = "none";
    }
    if (cancelBtn instanceof HTMLButtonElement) {
        cancelBtn.style.display = "block";
    }
    if (updateBtn instanceof HTMLButtonElement) {
        updateBtn.style.display = "block";
    }
}
function hideEditMode(tableVariant, row) {
    var spans = row.querySelectorAll('span');
    var inputs = row.querySelectorAll('input');
    var selects = row.querySelectorAll('select');
    spans.forEach(function (span) {
        span.style.display = "block";
    });
    inputs.forEach(function (input) {
        input.style.display = "none";
    });
    selects.forEach(function (select) {
        select.style.display = "none";
    });
    var editBtn = row.querySelector(".".concat(tableVariant, "-edit-btn"));
    var deleteBtn = row.querySelector(".".concat(tableVariant, "-delete-btn"));
    var cancelBtn = row.querySelector(".".concat(tableVariant, "-cancel-btn"));
    var updateBtn = row.querySelector(".".concat(tableVariant, "-update-btn"));
    if (editBtn instanceof HTMLButtonElement) {
        editBtn.style.display = "block";
    }
    if (deleteBtn instanceof HTMLButtonElement) {
        deleteBtn.style.display = "block";
    }
    if (cancelBtn instanceof HTMLButtonElement) {
        cancelBtn.style.display = "none";
    }
    if (updateBtn instanceof HTMLButtonElement) {
        updateBtn.style.display = "none";
    }
}
//# sourceMappingURL=UpdateLogic.js.map
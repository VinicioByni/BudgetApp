import { fetchUpdate } from './UpdateFetch.js';
/* Subject to change: the architecture of the way crud functionality is going to be added to the get table partial view
    like maybe the btns will be managed separately and things like that */
export var updateRow = function (tableSelectedString) {
    var editBtns = document.querySelectorAll(".".concat(tableSelectedString, "-edit-btn"));
    editBtns.forEach(function (editBtn) {
        editBtn.addEventListener('click', function () {
            // EDITMODE FUNCTION 
            // Hide spans, show inputs 
            var row = this.closest("tr");
            var rowId = row.dataset.id;
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
            var deleteBtn = row.querySelector(".".concat(tableSelectedString, "-delete-btn"));
            var cancelBtn = row.querySelector(".".concat(tableSelectedString, "-cancel-btn"));
            var updateBtn = row.querySelector(".".concat(tableSelectedString, "-update-btn"));
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
            // Special select list case for expense table
            if (tableSelectedString === "expense") {
                ChangeSelectName(rowId);
            }
            //
            var form = document.querySelector("#".concat(tableSelectedString, "Form-").concat(rowId));
            form.addEventListener('submit', function (event) {
                event.preventDefault();
                if (event.target instanceof HTMLFormElement) {
                    var formData = new FormData(event.target);
                    var formDataEntries_1 = [];
                    formData.forEach(function (value, key) {
                        formDataEntries_1.push([key, value]);
                    });
                    formDataEntries_1.push(['Id', rowId]);
                    var fields = Object.fromEntries(formDataEntries_1);
                    fetchUpdate(fields, tableSelectedString);
                }
            });
        });
    });
};
var ChangeSelectName = function (rowId) {
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
//# sourceMappingURL=Update.js.map
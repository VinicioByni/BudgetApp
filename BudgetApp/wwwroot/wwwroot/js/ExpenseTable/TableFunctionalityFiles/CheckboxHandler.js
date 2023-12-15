var rowsCheckboxCounter = 0;
export function handleMasterCheckbox(masterCheckbox, rowsCheckbox) {
    if (masterCheckbox.checked) {
        rowsCheckbox.forEach(function (checkbox) {
            if (checkbox == null || !(checkbox instanceof HTMLInputElement))
                return;
            checkbox.checked = true;
        });
        rowsCheckboxCounter = rowsCheckbox.length;
        updateDeleteBtnAvailability();
    }
    else {
        rowsCheckbox.forEach(function (checkbox) {
            if (checkbox == null || !(checkbox instanceof HTMLInputElement))
                return;
            checkbox.checked = false;
            substractCheckboxCount();
        });
        rowsCheckboxCounter = 0;
        updateDeleteBtnAvailability();
    }
}
export function handleRowsCheckbox(masterCheckbox, rowsCheckbox, checkbox) {
    var isChecked = checkbox.checked;
    if (isChecked)
        addCheckboxCount(rowsCheckbox.length);
    else
        substractCheckboxCount();
    if (rowsCheckboxCounter === 0)
        masterCheckbox.checked = false;
}
export function updateDeleteBtnAvailability() {
    var deleteBtn = document.querySelector('.expense-table-section .search-bar-container .delete-btn');
    if (deleteBtn == null || !(deleteBtn instanceof HTMLButtonElement))
        return;
    if (rowsCheckboxCounter > 0)
        deleteBtn.disabled = false;
    else
        deleteBtn.disabled = true;
}
function addCheckboxCount(totalCheckboxes) {
    if (rowsCheckboxCounter != totalCheckboxes) {
        rowsCheckboxCounter++;
    }
    updateDeleteBtnAvailability();
}
function substractCheckboxCount() {
    if (rowsCheckboxCounter != 0) {
        rowsCheckboxCounter--;
    }
    updateDeleteBtnAvailability();
}
//# sourceMappingURL=CheckboxHandler.js.map
import { openEditing } from './ListenerHandlers/OpenEditingHandler.js';
import { openDetails } from './ListenerHandlers/OpenDetailsHandler.js';
import { parseExpenseFormData, fetchExpenseFormDataUpdate } from './ListenerHandlers/RowUpdateHandler.js';
import { cancelEditing } from './ListenerHandlers/CancelEditingHandler.js';
import { handleRowDeletionRequest } from './ListenerHandlers/RowDeletionHandler.js';
import { handleMasterCheckbox, handleRowsCheckbox, updateDeleteBtnAvailability } from './ListenerHandlers/CheckboxHandler.js';
expenseTableFunctionality();
function expenseTableFunctionality() {
    var table = document.querySelector('.expense-table');
    if (!(table instanceof HTMLTableElement) || table == null)
        return;
    setUpListeners(table);
}
function setUpListeners(table) {
    setUpOpenEditingListener(table);
    setUpOpenDetailsListener(table);
    setUpSaveEditingListener(table);
    setUpCancelEditingListener(table);
    setUpDeleteFormListener(table);
    setUpCheckboxListener(table);
    updateDeleteBtnAvailability();
}
function setUpOpenEditingListener(table) {
    var editBtns = table.querySelectorAll('.edit-btn');
    editBtns.forEach(function (editBtn) {
        if (editBtn == null || !(editBtn instanceof HTMLButtonElement))
            return;
        editBtn.addEventListener('click', function () {
            openEditing(editBtn);
        });
    });
}
function setUpOpenDetailsListener(table) {
    var detailsBtns = table.querySelectorAll('.details-btn');
    detailsBtns.forEach(function (detailBtn) {
        if (detailBtn == null || !(detailBtn instanceof HTMLButtonElement))
            return;
        detailBtn.addEventListener('click', function () {
            openDetails(detailBtn);
        });
    });
}
function setUpSaveEditingListener(table) {
    var saveBtns = table.querySelectorAll('.save-btn');
    saveBtns.forEach(function (saveBtn) {
        if (saveBtn == null || !(saveBtn instanceof HTMLButtonElement))
            return;
        var row = saveBtn.closest('tr');
        var editForm = row.querySelector('.edit-form');
        if (editForm == null || !(editForm instanceof HTMLFormElement))
            return;
        editForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var form = e.target;
            if (!(form instanceof HTMLFormElement))
                return;
            console.log(fetchExpenseFormDataUpdate(parseExpenseFormData(form)));
        });
    });
}
function setUpCancelEditingListener(table) {
    var cancelBtns = table.querySelectorAll('.cancel-btn');
    cancelBtns.forEach(function (cancelBtn) {
        if (cancelBtn == null || !(cancelBtn instanceof HTMLButtonElement))
            return;
        cancelBtn.addEventListener('click', function () {
            cancelEditing(cancelBtn);
        });
    });
}
function setUpDeleteFormListener(table) {
    var deleteForm = table.querySelector('#expense-delete-form');
    if (deleteForm == null || !(deleteForm instanceof HTMLFormElement))
        return;
    deleteForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var form = e.target;
        if (!(form instanceof HTMLFormElement))
            return;
        handleRowDeletionRequest(form);
    });
}
function setUpCheckboxListener(table) {
    var masterCheckbox = table.querySelector('#expense-master-checkbox');
    if (masterCheckbox == null || !(masterCheckbox instanceof HTMLInputElement))
        return;
    var rowsCheckbox = table.querySelectorAll('.row-checkbox');
    masterCheckbox.addEventListener('click', function () {
        handleMasterCheckbox(masterCheckbox, rowsCheckbox);
    });
    rowsCheckbox.forEach(function (checkbox) {
        if (checkbox == null || !(checkbox instanceof HTMLInputElement))
            return;
        checkbox.addEventListener('click', function () {
            handleRowsCheckbox(masterCheckbox, rowsCheckbox, checkbox);
        });
    });
}
//# sourceMappingURL=TableFunctionality.js.map
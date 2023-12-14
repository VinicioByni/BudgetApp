import { openEditing } from '../ExpenseTable/OpenEditing.js';
import { openDetails } from '../ExpenseTable/OpenRowDetails.js';
import { saveEditing } from '../ExpenseTable/SaveInlineEditing.js';
import { cancelEditing } from '../ExpenseTable/CancelInlineEditing.js';
inlineEditingListener();
function inlineEditingListener() {
    var table = document.querySelector('.expense-table');
    if (!(table instanceof HTMLTableElement) || table == null)
        return;
    setUpOpenEditingListener(table);
    setUpOpenDetailsListener(table);
    setUpSaveEditingListener(table);
    setUpCancelEditingListener(table);
    setUpDeleteRowListener(table);
    setUpMasterCheckboxListener(table);
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
        saveBtn.addEventListener('click', function () {
            saveEditing(saveBtn);
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
function setUpDeleteRowListener(table) {
    var deleteForm = table.querySelector('#expense-delete-form');
    if (deleteForm == null || !(deleteForm instanceof HTMLFormElement))
        return;
    deleteForm.addEventListener('submit', function (e) {
        /* ** Move logic to delete row file later */
        e.preventDefault();
        if (!(e.target instanceof HTMLFormElement))
            return;
        var formData = new FormData(e.target);
        formData.forEach(function (value, key) {
            console.log(key + ": " + value);
        });
    });
}
function setUpMasterCheckboxListener(table) {
    var masterCheckbox = table.querySelector('#expense-master-checkbox');
    if (masterCheckbox == null || !(masterCheckbox instanceof HTMLInputElement))
        return;
    var rowsCheckbox = table.querySelectorAll('.row-checkbox');
    masterCheckbox.addEventListener('click', function () {
        /* ** Move logic to a different file later */
        if (masterCheckbox.checked) {
            rowsCheckbox.forEach(function (checkbox) {
                if (checkbox == null || !(checkbox instanceof HTMLInputElement))
                    return;
                checkbox.checked = true;
            });
        }
        else {
            rowsCheckbox.forEach(function (checkbox) {
                if (checkbox == null || !(checkbox instanceof HTMLInputElement))
                    return;
                checkbox.checked = false;
            });
        }
    });
}
//# sourceMappingURL=TableFunctionality.js.map
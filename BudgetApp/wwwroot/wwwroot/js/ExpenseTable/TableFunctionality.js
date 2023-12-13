import { openEditing } from '../ExpenseTable/OpenEditing.js';
import { openDetails } from '../ExpenseTable/OpenDetails.js';
import { saveEditing } from '../ExpenseTable/SaveEditing.js';
import { cancelEditing } from '../ExpenseTable/CancelEditing.js';
inlineEditingListener();
function inlineEditingListener() {
    var table = document.querySelector('.expense-table');
    if (!(table instanceof HTMLTableElement) || table == null)
        return;
    setUpOpenEditingListener(table);
    setUpOpenDetailsListener(table);
    setUpSaveEditingListener(table);
    setUpCancelEditingListener(table);
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
//# sourceMappingURL=TableFunctionality.js.map
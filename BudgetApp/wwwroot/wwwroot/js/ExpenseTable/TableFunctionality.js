import { openDetails } from './ListenerHandlers/RowDetailsHandler.js';
import { handleExpenseRowUpdate, openEditing, cancelEditing } from './ListenerHandlers/RowUpdateHandler.js';
import { handleExpenseRowDeletion } from './ListenerHandlers/RowDeletionHandler.js';
import { handleMasterCheckbox, handleRowsCheckbox, resetCheckboxCounter, updateDeleteBtnAvailability } from './ListenerHandlers/CheckboxHandler.js';
import { handleExpenseAddRow, closeAddForm, openAddForm } from './ListenerHandlers/RowAddHandler.js';
import { getTableParameters, initializeTableParameters, updateTableParametersState } from './TableParameters/TableParameters.js';
import { getExpenseTable } from './ListenerHandlers/GetTableHandler.js';
initializeTableParameters();
getExpenseTable();
export function expenseTableFunctionality() {
    var table = document.querySelector('.expense-table');
    if (!(table instanceof HTMLTableElement) || table == null)
        return;
    setUpListeners(table);
    updateTableParametersState();
}
function setUpListeners(table) {
    setUpOpenEditingListener(table);
    setUpSaveEditingListener(table);
    setUpCancelEditingListener(table);
    setUpOpenDetailsListener(table);
    setUpDeleteFormListener(table);
    setUpCheckboxListener(table);
    updateDeleteBtnAvailability();
    setUpOpenAddFormBtnListener(table);
    setUpCancelAddFormBtnListener(table);
    setUpAddRowFormListener(table);
    setUpSearchFormListener(table);
    setUpClearTableParametersListener(table);
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
            handleExpenseRowUpdate(form);
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
/*
function setUpCloseDetailsListener(table: HTMLTableElement) {
    const closeDetailsBtns = table.querySelectorAll('.details-btn')
    closeDetailsBtns.forEach(detailBtn => {
        if (detailBtn == null || !(detailBtn instanceof HTMLButtonElement)) return

        detailBtn.addEventListener('click', () => {
            closeDetails(detailBtn)
        })
    })
}
*/
function setUpOpenAddFormBtnListener(table) {
    var expenseTableSection = table.closest("section.expense-table-section");
    if (expenseTableSection == null)
        return;
    var openAddFormBtn = expenseTableSection.querySelector('.table-actions-btns-container .add-btn');
    if (openAddFormBtn == null || !(openAddFormBtn instanceof HTMLButtonElement))
        return;
    openAddFormBtn.addEventListener('click', function () {
        openAddForm(table);
    });
}
function setUpCancelAddFormBtnListener(table) {
    var cancelAddFormBtn = table.querySelector('.expense-add-row .cancel-btn');
    if (cancelAddFormBtn == null || !(cancelAddFormBtn instanceof HTMLButtonElement))
        return;
    cancelAddFormBtn.addEventListener('click', function () {
        closeAddForm(table);
    });
}
function setUpAddRowFormListener(table) {
    var addForm = table.querySelector('#expense-add-form');
    if (addForm == null || !(addForm instanceof HTMLFormElement))
        return;
    addForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var form = e.target;
        if (!(form instanceof HTMLFormElement))
            return;
        handleExpenseAddRow(form);
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
        handleExpenseRowDeletion(form);
        resetCheckboxCounter();
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
function setUpSearchFormListener(table) {
    var searchForm = table.querySelector('#expense-search-form');
    if (searchForm == null || !(searchForm instanceof HTMLFormElement))
        return;
    searchForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var form = e.target;
        if (!(form instanceof HTMLFormElement))
            return;
        // Make file for the search form handler
        var formData = new FormData(form);
        var tableParameters = getTableParameters();
        var formDataMap = getFormDataMap(formData);
        var urlTableParameters = new URLSearchParams();
        /*  1 Have map of parameters and form data
            2 Update table parameters map with form data map data
            3 Use this to make url search params with append() and then transform it into a string url
            */
        function getFormDataMap(formData) {
            var map = new Map();
            formData.forEach(function (value, key) {
                if (typeof key === 'string') {
                    map.set(key, value);
                }
            });
            return map;
        }
        for (var key in tableParameters) {
            if (formDataMap.has(key)) {
                var formDataValue = formDataMap.get(key);
                tableParameters[key] = formDataValue;
            }
            urlTableParameters.append(key, tableParameters[key]);
        }
        getExpenseTable();
    });
}
function setUpClearTableParametersListener(table) {
    var clearBtn = table.querySelector('.clear-table-parameters-btn');
    if (clearBtn == null || !(clearBtn instanceof HTMLButtonElement))
        return;
    clearBtn.addEventListener('click', function () {
        initializeTableParameters();
        getExpenseTable();
    });
}
//# sourceMappingURL=TableFunctionality.js.map
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { openEditing } from './ListenerHandlers/OpenEditingHandler.js';
import { openDetails } from './ListenerHandlers/OpenDetailsHandler.js';
import { handleExpenseRowUpdate } from './ListenerHandlers/RowUpdateHandler.js';
import { cancelEditing } from './ListenerHandlers/CancelEditingHandler.js';
import { handleExpenseRowDeletion } from './ListenerHandlers/RowDeletionHandler.js';
import { handleMasterCheckbox, handleRowsCheckbox, updateDeleteBtnAvailability } from './ListenerHandlers/CheckboxHandler.js';
loadExpenseTable();
function loadExpenseTable() {
    return __awaiter(this, void 0, void 0, function () {
        var partialViewContainer, url, response, partialView;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    partialViewContainer = document.querySelector('#ExpensePartialViewContainer');
                    if (partialViewContainer == null)
                        return [2 /*return*/, Error('Expense partial view container not found')];
                    url = 'Expense/_ExpenseTablePartial';
                    return [4 /*yield*/, fetch(url, {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.text()];
                case 2:
                    partialView = _a.sent();
                    partialViewContainer.innerHTML = partialView;
                    expenseTableFunctionality();
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
export function expenseTableFunctionality() {
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
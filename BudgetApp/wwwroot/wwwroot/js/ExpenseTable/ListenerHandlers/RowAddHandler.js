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
import { failMessage, successMessage } from "../../Services/messageHanlder.js";
import { EXPENSE_MODEL_STRINGS, EXPENSE_MODEL_PAYMENT_STRINGS } from '../Models/ModelTypes.js';
import { parseToNullableFloat } from '../../Utils/parseUtils.js';
import { setAriaHiddenTrue, setAriaHiddenFalse } from "../../Utils/SetAttributeFunctions.js";
import { getExpenseTable } from "./GetTableHandler.js";
export function handleExpenseAddRow(form) {
    var formData = new FormData(form);
    var formDataObject = parseExpenseFormData(formData);
    var expenseDataModel = createExpenseModel(formDataObject);
    fetchExpenseAddFormData(expenseDataModel);
}
function parseExpenseFormData(formData) {
    var formDataObject = {};
    for (var key in EXPENSE_MODEL_STRINGS) {
        if (!(formData.has(key))) {
            formDataObject[key] = null;
            continue;
        }
        if (key === EXPENSE_MODEL_STRINGS.payment) {
            fillPaymentMethods(formDataObject, formData, key);
        }
        else {
            var value = formData.get(key);
            formDataObject[key] = value.toString();
        }
    }
    return formDataObject;
}
function fillPaymentMethods(formDataObject, formData, key) {
    var paymentMethod = formData.get(key).toString().split('-', 1).join();
    var paymentMethodId = formData.get(key).toString().split('-').slice(1, 2).join();
    for (var paymentKey in EXPENSE_MODEL_PAYMENT_STRINGS) {
        if (paymentMethod === paymentKey) {
            formDataObject[paymentKey] = paymentMethodId;
        }
        else {
            formDataObject[paymentKey] = null;
        }
    }
}
function createExpenseModel(formDataObject) {
    /* parseToNullableFloat is used to simplify the data sent to the api
        by either sending a string | number | null */
    var expenseDataModel = {
        id: parseFloat(formDataObject[EXPENSE_MODEL_STRINGS.id]) || 0,
        amount: parseFloat(formDataObject[EXPENSE_MODEL_STRINGS.amount]) || 0,
        date: formDataObject[EXPENSE_MODEL_STRINGS.date] || getFormattedCurrentDate(),
        expenseCategoryId: parseToNullableFloat(formDataObject[EXPENSE_MODEL_STRINGS.expenseCategoryId]),
        description: formDataObject[EXPENSE_MODEL_STRINGS.description] || '',
        accountId: parseToNullableFloat(formDataObject[EXPENSE_MODEL_PAYMENT_STRINGS.accountId]),
        creditCardId: parseToNullableFloat(formDataObject[EXPENSE_MODEL_PAYMENT_STRINGS.creditCardId]),
        debtId: parseToNullableFloat(formDataObject[EXPENSE_MODEL_PAYMENT_STRINGS.debtId])
    };
    return expenseDataModel;
}
function getFormattedCurrentDate() {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var currentDate = "".concat(year, "-").concat(month, "-").concat(day);
    return currentDate;
}
function fetchExpenseAddFormData(expenseData) {
    return __awaiter(this, void 0, void 0, function () {
        var url, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = 'Expense/AddExpense' // Separate later to endpoint url folder
                    ;
                    return [4 /*yield*/, fetch(url, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(expenseData)
                        })];
                case 1:
                    response = _a.sent();
                    if (response.ok) {
                        getExpenseTable();
                        successMessage('Expense added');
                    }
                    else {
                        failMessage('Expense was not added');
                    }
                    return [2 /*return*/];
            }
        });
    });
}
export function closeAddForm(table) {
    var addFormRow = table.querySelector('.expense-add-row');
    console.log(addFormRow);
    if (addFormRow == null || !(addFormRow instanceof HTMLTableRowElement))
        return;
    setAriaHiddenTrue(addFormRow);
}
export function openAddForm(table) {
    var addFormRow = table.querySelector('.expense-add-row');
    if (addFormRow == null || !(addFormRow instanceof HTMLTableRowElement))
        return;
    setAriaHiddenFalse(addFormRow);
}
//# sourceMappingURL=RowAddHandler.js.map
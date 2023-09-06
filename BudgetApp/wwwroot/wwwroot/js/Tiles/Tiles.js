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
import { ExpensesTotalAmountFetch, IncomesTotalAmountFetch } from '../ExpensesApi/FetchExpensesTotalAmount.js';
import { getBudget } from '../BudgetApi/FetchBudget.js';
import { updateBudgetAmountDisplay, updateBudgetAmountLeftDisplay } from '../Tiles/Budget Tile/BudgetTile.js';
import { FinancialState } from '../FinancialState/FinancialState.js';
var netTotalAmountDisplay = document.querySelector('.net-total-amount');
var expenseTotalAmountDisplay = document.querySelector('.expense-total-amount');
var incomeTotalAmountDisplay = document.querySelector('.income-total-amount');
export function updateAllTileAmounts() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, updateIncomeTileAmount()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, updateExpenseAndBudgetTileAmount()];
                case 2:
                    _a.sent();
                    updateNetTileAmount();
                    return [2 /*return*/];
            }
        });
    });
}
export function updateIncomeTileAmount() {
    return __awaiter(this, void 0, void 0, function () {
        var incomesTotalAmountResponse, incomesTotalAmount;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, IncomesTotalAmountFetch()];
                case 1:
                    incomesTotalAmountResponse = _a.sent();
                    FinancialState.updateTotalIncomes(incomesTotalAmountResponse);
                    incomesTotalAmount = FinancialState.getState().totalIncomes;
                    incomeTotalAmountDisplay.innerHTML = "$" + incomesTotalAmount.toFixed(1);
                    return [2 /*return*/];
            }
        });
    });
}
export function updateExpenseAndBudgetTileAmount() {
    return __awaiter(this, void 0, void 0, function () {
        var expensesTotalAmountResponse, budget, expensesTotalAmount;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ExpensesTotalAmountFetch()];
                case 1:
                    expensesTotalAmountResponse = _a.sent();
                    FinancialState.updateTotalExpenses(expensesTotalAmountResponse);
                    return [4 /*yield*/, getBudget()];
                case 2:
                    budget = _a.sent();
                    FinancialState.updateBudget(budget.amount);
                    expensesTotalAmount = FinancialState.getState().totalExpenses;
                    expenseTotalAmountDisplay.innerHTML = "$" + expensesTotalAmount.toFixed(1);
                    updateBudgetAmountDisplay();
                    updateBudgetAmountLeftDisplay();
                    return [2 /*return*/];
            }
        });
    });
}
export function updateNetTileAmount() {
    return __awaiter(this, void 0, void 0, function () {
        var incomesTotalAmount, expensesTotalAmount, netTotalAmount;
        return __generator(this, function (_a) {
            incomesTotalAmount = FinancialState.getState().totalIncomes;
            expensesTotalAmount = FinancialState.getState().totalExpenses;
            netTotalAmount = (incomesTotalAmount - expensesTotalAmount);
            netTotalAmountDisplay.innerHTML = "$" + netTotalAmount.toFixed(1);
            if (netTotalAmount <= 0) {
                netTotalAmountDisplay.classList.remove('text-success');
                netTotalAmountDisplay.classList.add('text-danger');
            }
            else {
                netTotalAmountDisplay.classList.remove('text-danger');
                netTotalAmountDisplay.classList.add('text-success');
            }
            return [2 /*return*/];
        });
    });
}
updateAllTileAmounts();
var tilesTimePeriod = document.querySelectorAll('.tile-time-period');
export function updateTilesTimePeriod(datePeriodSelectedText) {
    tilesTimePeriod.forEach(function (tileTimePeriod) {
        tileTimePeriod.innerHTML = datePeriodSelectedText;
    });
}
//# sourceMappingURL=Tiles.js.map
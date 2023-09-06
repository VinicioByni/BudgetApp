var getExpensesPartial = function (expenseParametersString) {
    fetch("".concat(EXPENSES_PARTIAL_URL).concat(expenseParametersString))
        .then(function (res) { return res.text(); })
        .then(function (text) {
        var container = document.getElementById('expensesPartial');
        container.innerHTML = text;
    });
};
getExpensesPartial(DEFAULT_EXPENSE_FILTER_PARAMETERS_STRING);
//# sourceMappingURL=LoadPartial.js.map
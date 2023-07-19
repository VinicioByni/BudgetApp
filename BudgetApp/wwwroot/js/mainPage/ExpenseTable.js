

function createExpenseForm(id) {


    var index = getExpenseIndex(expensesGlobal, id)

    hideExpenseTableRowData(id)

    createExpenseTableRowForm(index, expensesGlobal, id)

}

function getExpenseIndex(expensesGlobal, id) {

    var expensesCount = expensesGlobal.length

    var index
    for (var i = 0; i < expensesCount; i++) {
        if (expensesGlobal[i].id == id) {
            index = i
            break;
        }
    }
    return index
}

function hideExpenseTableRowData(id) {

    $(`#showEditExpenseBtn-${id}`).hide()
    $(`#deleteEditExpenseBtn-${id}`).hide()
    $(`#updateEditExpenseBtn-${id}`).show()
    $(`#cancelEditExpenseBtn-${id}`).show()

    $(`#expenseAmountSpan-${id}`).hide()
    $(`#expenseDateSpan-${id}`).hide()
    $(`#expenseCategorySpan-${id}`).hide()
    $(`#expenseMethodSpan-${id}`).hide()
    $(`#expenseAccountSpan-${id}`).hide()
    $(`#expenseCreditCardSpan-${id}`).hide()
    $(`#expenseDebtSpan-${id}`).hide()
    $(`#expenseDescriptionSpan-${id}`).hide()
}

function showExpenseTableRowData(id) {
    $(`#showEditExpenseBtn-${id}`).show()
    $(`#deleteEditExpenseBtn-${id}`).show()
    $(`#updateEditExpenseBtn-${id}`).hide()
    $(`#cancelEditExpenseBtn-${id}`).hide()

    $(`#expenseAmountSpan-${id}`).show()
    $(`#expenseDateSpan-${id}`).show()
    $(`#expenseCategorySpan-${id}`).show()
    $(`#expenseMethodSpan-${id}`).show()
    $(`#expenseAccountSpan-${id}`).show()
    $(`#expenseCreditCardSpan-${id}`).show()
    $(`#expenseDebtSpan-${id}`).show()
    $(`#expenseDescriptionSpan-${id}`).show()
}

function createExpenseTableRowForm(index, expenses, id) {

    var expenseCategories = expenseCategoriesGlobal
    var accounts = accountsGlobal
    var creditCards = creditCardsGlobal
    var debts = debtsGlobal

    // Expense Amount
    var amount = expenses[index].amount
    $(`#expenseAmountCol-${id}`).append(
        $('<input/>').attr("id", `expenseAmountInput-${id}`).attr("value", `${amount}`).attr("type", "number").attr("class", "form-control").attr("form", `expense_form-${id}`).prop("required", true)
    );

    // Expense Date
    var date = formatDate(expenses[index].date)
    $(`#expenseDateCol-${id}`).append(
        $('<input/>').attr("id", `expenseDateInput-${id}`).attr("value", `${date}`).attr("type", "date").attr("class", "form-control").attr("form", `expense_form-${id}`).prop("required", true)
    );

    // Expense Categories 
    var expenseCategoriesSelectList = $('<select/>').attr("id", `expenseCategoryInput-${id}`).attr("class", "form-select bg-blueform").attr("form", `expense_form-${id}`).prop("required", true).appendTo(`#expenseCategoryCol-${id}`)
    expenseCategoriesSelectList.append($('<option/>').attr("value", "").text("Select Category"))

    var expenseCategoriesOptions = []
    var expenseCategoriesCount = getNumberOfOptions(expenseCategories)

    for (var i = 0; i < expenseCategoriesCount; i++) {
        var val = expenseCategories[i].expenseCategoryId
        var text = expenseCategories[i].name
        expenseCategoriesOptions.push({ 'val': val, 'text': `${text}` })
    }

    var expenseCategoriesSelectedOption = expenses[index].expenseCategoryId

    createSelectOptions(expenseCategoriesOptions, expenseCategoriesSelectedOption, expenseCategoriesSelectList)

    // Expense Payment Method
    var expenseMethodSelectList = $('<select/>').attr("id", `expenseMethodInput-${id}`).attr("class", "form-select bg-blueform paymentMethodss").attr("form", `expense_form-${id}`).prop("required", true).appendTo(`#expenseMethodCol-${id}`)

    var methodSelectedOption = expenses[index].method

    var cashDebit = $('<option/>').attr("value", "Cash/Debit").text("Cash / Debit")
    var creditCard = $('<option/>').attr("value", "Credit Card").text("Credit Card")
    var debt = $('<option/>').attr("value", "Debt").text("Debt")

    if (methodSelectedOption == "Cash/Debit") {
        cashDebit.prop("selected", true)
    }
    else if (methodSelectedOption == "Credit Card") {
        creditCard.prop("selected", true)
    }
    else {
        debt.prop("selected", true)
    }

    expenseMethodSelectList.append(
        $('<option/>').attr("value", "").text("Select Payment Method")).append(
            cashDebit).append(
                creditCard).append(
                    debt)

    // Expense Account
    var accountSelectList = $('<select/>').attr("id", `expenseAccountInput-${id}`).attr("class", "form-select bg-blueform").appendTo(`#expensePaymentAccountCol-${id}`)
    accountSelectList.append($('<option/>').attr("value", "").text("Select Account"))

    var accountOptions = []
    var accountCount = getNumberOfOptions(accounts)

    for (var i = 0; i < accountCount; i++) {
        var val = accounts[i].accountId
        var text = accounts[i].name
        accountOptions.push({ 'val': val, 'text': `${text}` })
    }

    var accountSelectedOption = expenses[index].accountId

    createSelectOptions(accountOptions, accountSelectedOption, accountSelectList)

    // Expense Credit Card
    var creditCardSelectList = $('<select/>').attr("id", `expenseCreditCardInput-${id}`).attr("class", "form-select bg-blueform").appendTo(`#expensePaymentAccountCol-${id}`)
    creditCardSelectList.append($('<option/>').attr("value", "").text("Select Credit Card"))

    var creditCardOptions = []
    var creditCardCount = getNumberOfOptions(creditCards)

    for (var i = 0; i < creditCardCount; i++) {
        var val = creditCards[i].creditCardId
        var text = creditCards[i].name
        creditCardOptions.push({ 'val': val, 'text': `${text}` })
    }

    var creditCardSelectedOption = expenses[index].creditCardId

    createSelectOptions(creditCardOptions, creditCardSelectedOption, creditCardSelectList)

    // Expense Debt
    var debtSelectList = $('<select/>').attr("id", `expenseDebtInput-${id}`).attr("class", "form-select bg-blueform").appendTo(`#expensePaymentAccountCol-${id}`)
    debtSelectList.append($('<option/>').attr("value", "").text("Select Debt"))

    var debtOptions = []
    var debtCount = getNumberOfOptions(debts)

    for (var i = 0; i < debtCount; i++) {
        var val = debts[i].debtId
        var text = debts[i].entity
        debtOptions.push({ 'val': val, 'text': `${text}` })
    }

    var debtSelectedOption = expenses[index].debtId

    createSelectOptions(debtOptions, debtSelectedOption, debtSelectList)

    // Expense Description
    var description = expenses[index].description
    $(`#expenseDescriptionCol-${id}`).append(
        $('<input/>').attr("id", `expenseDescriptionInput-${id}`).attr("value", `${description}`).attr("type", "text").attr("class", "form-control").attr("form", `expense_form-${id}`)
    );
}


function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}


function getNumberOfOptions(optionsData) {
    var counter = 0;
    for (var item in optionsData) {
        counter++
    }
    return counter
}

function createSelectOptions(selectOptions, selectedOption, selectList) {
    // Create the options for the select list
    $(selectOptions).each(function () {
        if (this.val == selectedOption) {
            selectList.append($('<option/>').attr("value", this.val).text(this.text).prop("selected", true))
        }
        else {
            selectList.append($('<option/>').attr("value", "c" + this.val).text(this.text))
        }
    })
}

function updateExpenseForm(id) {

    // Detect the type of Account Selected
    var accountId = null
    var creditCardId = null
    var debtId = null
    /* Change the expenseCreditcard Input once i replace it for one single select list */
    var typeOfAccount = $(`#expenseCreditCardInput-${id}`).val().substr(0, 1)
    switch (typeOfAccount) {
        // Account
        case 'a':
            var accountId = null
            break;
        // CreditCard
        case 'c':
            var creditCardId = $(`#expenseCreditCardInput-${id}`).val().replace('c', '')
            break;
        // Debt
        case 'd':
            var debtId = null
            break;
    }
    alert(parseInt(creditCardId))
    var expense = {
        "id": id,
        "amount": $(`#expenseAmountInput-${id}`).val(),
        "date": $(`#expenseDateInput-${id}`).val(),
        "expenseCategoryId": $(`#expenseCategoryInput-${id}`).val(),
        "method": $(`#expenseMethodInput-${id}`).val(),
        "description": $(`#expenseDescriptionInput-${id}`).val(),
        "accountId": accountId,
        "creditCardId": parseInt(creditCardId),
        "debtId": debtId
    }


    $.ajax({
        url: '@Url.Action("EditExpense", "Expense")',
        data: { expense: expense },
        type: 'POST',
        dataType: 'json',
        success: function (result) {
            alert('succes')

        },
        error: function (errormessage) {
            alert(errormessage)
        }
    });


}

function deleteExpenseForm(id) {

    var expense = {
        id: id,
    }

    $.ajax({
        url: '/Expense/DeleteExpense',
        type: "DELETE",
        data: expense,
        dataType: "json",
        success: function (result) {
            window.location.reload(true)
        },
        error: function (result) {
            window.location.reload(true)
        }
    })

}

function cancelExpenseForm(id) {
    $(`#expenseAmountInput-${id}`).remove(),
        $(`#expenseDateInput-${id}`).remove(),
        $(`#expenseCategoryInput-${id}`).remove(),
        $(`#expenseMethodInput-${id}`).remove(),
        $(`#expenseDescriptionInput-${id}`).remove(),
        $(`#expenseAccountInput-${id}`).remove(),
        $(`#expenseCreditCardInput-${id}`).remove(),
        $(`#expenseDebtInput-${id}`).remove()

    showExpenseTableRowData(id)
}


// EDIT EXPENSES

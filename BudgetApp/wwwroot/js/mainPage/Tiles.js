
var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Current Month Values
$(document).ready(function () {

    var incomeCount = incomesGlobal.length
    var expenseCount = expensesGlobal.length
    
    var today = new Date()
    var currentMonth = today.getMonth()
    var currentYear = today.getFullYear()

    updateTotalIncome(incomeCount, currentMonth, currentYear)
    // Updates both update expenses and monthly balance
    updateTotalExpense(expenseCount, currentMonth, currentYear)   
})

function updateTotalIncome(incomeCount, month, year) {

    var monthIncomes = 0

    for (var i = 0; i < incomeCount; i++) {
        var date = new Date(incomesGlobal[i].date)
        var dateMonth = date.getMonth()
        var dateYear = date.getFullYear()

        if (month == dateMonth && year == dateYear) {
            monthIncomes += incomesGlobal[i].amount
        }
    }

    $('#incomes').html(`<strong>MXN $${monthIncomes}</strong>`)
    var monthSelected = monthNames[month]
    $('#incomeMonth').html(`${monthSelected} ${year}`)
}



// Income
$('#editIncomeMonthBtn').on('click', function () {
    $('#totalIncomeEditBtns').show()

    $('#totalIncomeMonthForm').toggle('fast')
    $('#incomeMonthDisplay').toggle('fast')
    
})

$('#saveIncomeMonth').on('click', function () {

    // Get input month
    var inputValue = $('#incomeMonthValue').val()
    var year = inputValue.substring(0, 4);
    var month = parseInt(inputValue.substring(5, 7)) - 1;

    $('#incomeMonthValue').val(inputValue)
    var incomeCount = incomesGlobal.length

    

    updateTotalIncome(incomeCount, month, year)

    $('#totalIncomeEditBtns').hide()
    $('#incomeMonthDisplay').toggle('fast')
    $('#totalIncomeMonthForm').toggle('fast')


})

// Expenses
$('#editExpenseMonthBtn').on('click', function () {
    $('#totalExpenseEditBtns').show()

    $('#totalExpenseMonthForm').toggle('fast')
    $('#expenseMonthDisplay').toggle('fast')
    
})

$('#saveExpenseMonth').on('click', function () {

    // Get input month
    var inputValue = $('#expenseMonthValue').val()
    var year = inputValue.substring(0, 4);
    var month = parseInt(inputValue.substring(5, 7)) - 1;

    $('#expenseMonthValue').val(inputValue)
    var expenseCount = expensesGlobal.length

    updateTotalExpense(expenseCount, month, year)

    $('#totalExpenseEditBtns').hide()
    $('#editExpenseMonthBtn').show()

    $('#totalExpenseMonthForm').toggle('fast')
    $('#expenseMonthDisplay').toggle('fast')
    
})

function updateTotalExpense(expenseCount, month, year) {

    var monthExpenses = 0

    for (var i = 0; i < expenseCount; i++) {

        var date = new Date(expensesGlobal[i].date)
        var dateMonth = date.getMonth()
        var dateYear = date.getFullYear()

        if (month == dateMonth && year == dateYear) {
            monthExpenses += expensesGlobal[i].amount
        }
    }

    // Update budget monthly balance

    var budgetBalance = budgetGlobal.amount - monthExpenses
    $('#budgetBalance').html(`<strong>MXN $${budgetBalance}</strong>`)

    // Update total expense
    $('#expenses').html(`<strong>MXN $${monthExpenses}</strong>`)
    var monthSelected = monthNames[month]
    $('#expenseMonth').html(`${monthSelected} ${year}`)
}

// Budget 
$('#editBudgetBtn').on('click', function () {

    $('#updateBudgetBtn').show()

    $('#budgetForm').toggle('fast')
    $('#budgetDisplay').toggle('fast')
    
  
})

function updateBudget(id) {

    var budget = {
        "id": id,
        "amount": $('#budgetValue').val()
    };

    $.ajax({
        url: '/Budget/Add',
        type: "POST",
        data: { budget: budget },
        dataType: "json",
        success: function (result) {
            alert('success')
        },
        error: function (result) {
            alert('error')
        }
    });

}
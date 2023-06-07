
var incomeForm = document.getElementById('income');
incomeForm.style.display = 'none';

var expenseForm = document.getElementById('expense');

var recurrentExpenseForm = document.getElementById('recurrent_expense');
recurrentExpenseForm.style.display = 'none';



function formchange(x) {

    // Show income
    if (x === 1) {
        incomeForm.style.display = 'block';
        expenseForm.style.display = 'none';
        recurrentExpenseForm.style.display = 'none';
    }
    // Show expense
    else if(x === 2)
    {
        incomeForm.style.display = 'none';
        expenseForm.style.display = 'block';
        recurrentExpenseForm.style.display = 'none';
    }
    // Show recurrent expense
    else if (x === 3) {
        incomeForm.style.display = 'none';
        expenseForm.style.display = 'none';
        recurrentExpenseForm.style.display = 'block';
    }
}


// Hide and show payment methods in the expense form subject to the user selection

var expenseAccount = document.getElementById('expenseAccount');
var expenseSelectAccount = document.getElementById('selectAccount');

var expenseCreditCard = document.getElementById('expenseCreditCard');
var expenseSelectCreditCard = document.getElementById('selectCreditCard');

var expenseDebt = document.getElementById('expenseDebt');
var expenseSelectDebt = document.getElementById('selectDebt');

expenseAccount.style.display = 'none';
expenseCreditCard.style.display = 'none';
expenseDebt.style.display = 'none';

document.getElementById("expenseMethod").onchange = expenseMethod;
function expenseMethod() {
    // Get selected method
    var method = document.getElementById('expenseMethod');
    var Value = method.value;

    // Show account & make it required
    if (Value == 1) {

        expenseAccount.style.display = 'block';
        expenseCreditCard.style.display = 'none';
        expenseDebt.style.display = 'none';

        expenseSelectAccount.setAttribute('required', true);
        expenseSelectCreditCard.removeAttribute('required');
        expenseSelectDebt.removeAttribute('required');
    }
    // Show credit card & make it required
    else if (Value == 2) {

        expenseAccount.style.display = 'none';
        expenseCreditCard.style.display = 'block';
        expenseDebt.style.display = 'none';


        expenseSelectAccount.removeAttribute('required');
        expenseSelectCreditCard.setAttribute('required', true);
        expenseSelectDebt.removeAttribute('required');
    }
    // Show debt & make it required
    else if (Value == 3) {

        expenseAccount.style.display = 'none';
        expenseCreditCard.style.display = 'none';
        expenseDebt.style.display = 'block';

        expenseSelectAccount.removeAttribute('required');
        expenseSelectCreditCard.removeAttribute('required');
        expenseSelectDebt.setAttribute('required', true);
    }
    // Reset
    else {
        expenseAccount.style.display = 'none';
        expenseCreditCard.style.display = 'none';
        expenseDebt.style.display = 'none';

        expenseSelectAccount.removeAttribute('required');
        expenseSelectCreditCard.removeAttribute('required');
        expenseSelectDebt.removeAttribute('required');
    }
}
// Hide and show payment methods in the recurrent expense form subject to the user selection

var recurrentExpenseAccount = document.getElementById('recurrentExpenseAccount');
var recurrentExpenseSelectAccount = document.getElementById('recurrentExpenseSelectAccount');

var recurrentExpenseCreditCard = document.getElementById('recurrentExpenseCreditCard');
var recurrentExpenseSelectCreditCard = document.getElementById('recurrentExpenseSelectCreditCard');

var recurrentExpenseDebt = document.getElementById('recurrentExpenseDebt');
var recurrentExpenseSelectDebt = document.getElementById('recurrentExpenseSelectDebt');

recurrentExpenseAccount.style.display = 'none';
recurrentExpenseCreditCard.style.display = 'none';
recurrentExpenseDebt.style.display = 'none';

document.getElementById("recurrentExpenseMethod").onchange = recurrentExpenseMethod;
function recurrentExpenseMethod() {
    
    // Get selected method
    var method = document.getElementById('recurrentExpenseMethod');
    var Value = method.value;

    // Show account & make it required
    if (Value == 1) {

        recurrentExpenseAccount.style.display = 'block';
        recurrentExpenseCreditCard.style.display = 'none';
        recurrentExpenseDebt.style.display = 'none';

        recurrentExpenseSelectAccount.setAttribute('required', true);
        recurrentExpenseSelectCreditCard.removeAttribute('required');
        recurrentExpenseSelectDebt.removeAttribute('required');
    }
    // Show credit card & make it required
    else if (Value == 2) {

        recurrentExpenseAccount.style.display = 'none';
        recurrentExpenseCreditCard.style.display = 'block';
        recurrentExpenseDebt.style.display = 'none';


        recurrentExpenseSelectAccount.removeAttribute('required');
        recurrentExpenseSelectCreditCard.setAttribute('required', true);
        recurrentExpenseSelectDebt.removeAttribute('required');
    }
    // Show debt & make it required
    else if (Value == 3) {

        recurrentExpenseAccount.style.display = 'none';
        recurrentExpenseCreditCard.style.display = 'none';
        recurrentExpenseDebt.style.display = 'block';

        recurrentExpenseSelectAccount.removeAttribute('required');
        recurrentExpenseSelectCreditCard.removeAttribute('required');
        recurrentExpenseSelectDebt.setAttribute('required', true);
    }
    // Reset
    else {
        recurrentExpenseAccount.style.display = 'none';
        recurrentExpenseCreditCard.style.display = 'none';
        recurrentExpenseDebt.style.display = 'none';

        recurrentExpenseSelectAccount.removeAttribute('required');
        recurrentExpenseSelectCreditCard.removeAttribute('required');
        recurrentExpenseSelectDebt.removeAttribute('required');
    }
}
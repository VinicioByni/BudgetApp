// Show & hide the selection of date of the month or day of the week subject to user selection
// in Recurrent Expense Form

var dateOfTheMonth = document.getElementById('dateOfTheMonth');

var dayOfTheWeek = document.getElementById('dayOfTheWeek');
dayOfTheWeek.style.display = 'none';

function periodChange(x) {

    // Show month selection
    if (x === 1) {
        dateOfTheMonth.style.display = 'block';
        dayOfTheWeek.style.display = 'none';
    }
    // Show week selection
    else if (x === 2) {
        dateOfTheMonth.style.display = 'none';
        dayOfTheWeek.style.display = 'block';
    }
    // Reset
    else if (x === 3) {
        dateOfTheMonth.style.display = 'none';
        dayOfTheWeek.style.display = 'none';
    }
}
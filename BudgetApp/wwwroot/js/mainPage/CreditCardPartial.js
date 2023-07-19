

const visibleCreditCards = 2

$('#creditCardsPartialView').load('/CreditCard/GetCreditCardsPartial', function () {

    $(() => updateCreditCardsAmount())

    $(() => creditCardsContainerSize())

    
});

$(window).on('resize', function () {

    var creditCardsSize = 0
    var id = 0
    for (var i = 0; i < visibleCreditCards; ++i) {
        id = creditCardsGlobal[i].creditCardId
        creditCardsSize += $(`#creditCardInfo-${id}`).height()
    }

    var padding = 2 * (visibleCreditCards) * parseInt($('html').css('font-size'), 10)
    $(`#creditCards`).css('height', (creditCardsSize + parseInt(padding)) + 'px');

})

function creditCardsContainerSize() {

    var creditCardsSize = 0
    var id = 0

    for (var i = 0; i < visibleCreditCards; ++i) {
        id = creditCardsGlobal[i].creditCardId
        creditCardsSize += $(`#creditCardInfo-${id}`).height()    
    }

    var padding = 2 * (visibleCreditCards) * parseInt($('html').css('font-size'), 10)
    $(`#creditCards`).css('height', (creditCardsSize + parseInt(padding)) + 'px');
}

// Amount 
/* PENDING, find way to use the controller to get a list of only the ones with current dates to help front end
    maybe I can make an expense named RecentExpenses or something like that, think about how much should the 
    controller do and how much should the backend do */
function updateCreditCardsAmount() {

    var creditCardsCounter = creditCardsGlobal.length;

    var expensesCounter = expensesGlobal.length;

    for (var i = 0; i < creditCardsCounter; i++) {

        var creditCardAmount = 0

        var currentCutOffDate = creditCardsGlobal[i].currentCutOffDate
        var lastCutOffDate = creditCardsGlobal[i].lastCutOffDate
        var creditCardId = creditCardsGlobal[i].creditCardId

        for (var j = 0; j < expensesCounter; j++)
        {   
            if (expensesGlobal[j].creditCardId != creditCardId) {
                continue
            }
            if (expensesGlobal[j].date <= currentCutOffDate && expensesGlobal[j].date > lastCutOffDate) {
                creditCardAmount += expensesGlobal[j].amount
            }
        }

        creditCardAmount -= creditCardsGlobal[i].amountPaid

        $(`#displayAmountOwed-${creditCardId}`).html(`<strong> MXN $ ${creditCardAmount}</strong>`);

        // Update in credit card payment form
        $(`#amountOwed-${creditCardId}`).html(`<strong> MXN $ ${creditCardAmount}</strong>`);

        // Display amount owed color, subject to the actual amount owed value
        if (creditCardAmount > 0) {
            $(`#amountOwed-${creditCardId}`).attr("class", "card-text fs-3 text-danger mb-1")
        }
        else {
            $(`#amountOwed-${creditCardId}`).attr("class", "card-text fs-3 text-success mb-1")
        }
         
        if (creditCardAmount > 0) {
            $(`#displayAmountOwed-${creditCardId}`).attr('class', 'text-danger fs-3 mb-0 pEditable');
        }
        else {
            $(`#displayAmountOwed-${creditCardId}`).attr('class', 'text-success fs-3  mb-0 pEditable');
        }
    }
    
}

// Update elements

function showCreditCardNameForm(id) {
    $(`#creditCardName-${id}`).toggle('fast');
    $(`#creditCardNameForm-${id}`).toggle('fast');

    // Credit Card Btns
    $(`#deleteCreditCardBtn-${id}`).hide();
    $(`#updateCreditCardBtns-${id}`).show();

}

function showCreditCardDatesForm(id) {
    $(`#creditCardCurrentCutOffDate-${id}`).toggle('fast');
    $(`#creditCardCurrentCutOffDateForm-${id}`).toggle('fast');
    $(`#creditCardDueDate-${id}`).toggle('fast');
    $(`#creditCardDueDateForm-${id}`).toggle('fast');
    $(`#creditCardLastCutOffDateForm-${id}`).toggle('fast');

    // Credit card Btns
    $(`#deleteCreditCardBtn-${id}`).hide();
    $(`#updateCreditCardBtns-${id}`).show();

}

function showCreditCardLimitForm(id) {
    $(`#creditCardLimit-${id}`).toggle('fast');
    $(`#creditCardLimitForm-${id}`).toggle('fast');

    // Credit Card Btns
    $(`#deleteCreditCardBtn-${id}`).hide();
    $(`#updateCreditCardBtns-${id}`).show();
}


function updateCreditCard(id) {

    var creditCard = {
        creditCardId: id,
        name: $(`#creditCardNameValue-${id}`).val(),
        creditLimit: $(`#creditCardLimitValue-${id}`).val(),
        currentCutOffDate: $(`#creditCardCurrentCutOffDateValue-${id}`).val(),
        lastCutOffDate: $(`#creditCardLastCutOffDateValue-${id}`).val(),
        dueDate: $(`#creditCardDueDateValue-${id}`).val()
    };

    $.ajax({
        url: '/CreditCard/EditCreditCard',
        type: "POST",
        data: creditCard,
        dataType: "json",
        success: function (result) {
            window.location.reload(true);
        },
        error: function (result) {
            window.location.reload(true);
        }
    });
}

function cancelCreditCardUpdate(id) {
    if ($(`#creditCardNameForm-${id}`).is(':visible')) {
        $(`#creditCardName-${id}`).toggle('fast')
        $(`#creditCardNameForm-${id}`).toggle('fast')
    }
    
    if ($(`#creditCardCurrentCutOffDateForm-${id}`).is(':visible')) {
        $(`#creditCardCurrentCutOffDate-${id}`).toggle('fast');
        $(`#creditCardCurrentCutOffDateForm-${id}`).toggle('fast');
        $(`#creditCardDueDate-${id}`).toggle('fast');
        $(`#creditCardDueDateForm-${id}`).toggle('fast');
        $(`#creditCardLastCutOffDateForm-${id}`).toggle('fast');
    }
    
    if ($(`#creditCardLimitForm-${id}`).is(':visible')) {
        $(`#creditCardLimit-${id}`).toggle('fast');
        $(`#creditCardLimitForm-${id}`).toggle('fast');
    }

    // Credit Card Btns
    $(`#deleteCreditCardBtn-${id}`).show();
    $(`#updateCreditCardBtns-${id}`).hide();

    
}

// CREATE CREDIT CARD
function showNewCreditCardForm() {
    console.log('entered add')
    $('#addCreditCardBtn').toggle('fast');
    $(`#newCreditCard`).toggle('fast')
};

function cancelCreditCard() {
    $('#addCreditCardBtn').toggle('fast');
    $(`#newCreditCard`).toggle('fast');

};

function addCreditCard() {
   
    var creditCard = {
        "name": $(`#creditCardNameValue`).val(),
        "creditLimit": $(`#creditCardLimitValue`).val(),
        "currentCutOffDate": $(`#creditCardCurrentCutOffDateValue`).val(),
        "lastCutOffDate": $(`#creditCardLastCutOffDateValue`).val(),
        "dueDate": $(`#creditCardDueDateValue`).val(),
        "autoPayment": false
    };
   
    $.ajax({
        url: '/CreditCard/AddCreditCard',
        type: "POST",
        data: {creditcard: creditCard},
        dataType: "json",
        success: function (result) {
            alert('creditCard success')
        },
        error: function (result) {
            alert(result.errorMessage)
        }
    });
}

// PAYMENT FORM
function showPaymentForm(id) {

    // Change card body class
    $(`#creditCard-${id}`).attr('class', 'card me-0 ms-0 mt-0 mb-3 pb-1 text-md-start text-light creditCardPayment');

    // Show payment form
    $(`#creditCardInfo-${id}`).toggle('fast');
    $(`#creditCardPayment-${id}`).toggle('slow');

}

function hidePaymentForm(id) {

    $(`#creditCard-${id}`).attr('class', 'card me-0 ms-0 mt-0 mb-3 pb-1 text-md-start text-light creditCardInfo');

    // Return to debtsBodyClass container attributes
    $(`#creditCards`).attr('class', 'card-body creditCardContainerBody')

    $(`#creditCardInfo-${id}`).toggle('slow');
    $(`#creditCardPayment-${id}`).toggle('fast');
}

function updatePaymentForm(id) {

    var amountPaid = $(`#payment-${id}`).val()
    
    var creditCard = {
        creditCardId: id,
        amountPaid: amountPaid
    };

    $.ajax({
        url: '/CreditCard/EditCreditCardAmountOwed',
        type: "POST",
        data: creditCard,
        dataType: "json",
        success: function (result) {
            window.location.reload(true);
        },
        error: function (result) {
            window.location.reload(true);
        }
    });
}


// DELETE CREDIT CARD
function showDeleteCreditCard(id) {
    $(`#creditCard-${id}`).attr('class', 'card me-0 ms-0 mt-0 mb-3 pb-1 text-md-start text-light creditCardDelete');
    $(`#creditCardInfo-${id}`).toggle('fast');
    $(`#creditCardDelete-${id}`).toggle('fast');
}

function hideDeleteCreditCard(id) {
    $(`#creditCard-${id}`).attr('class', 'card me-0 ms-0 mt-0 mb-3 pb-1 text-md-start text-light creditCardInfo');
    $(`#creditCardInfo-${id}`).toggle('fast');
    $(`#creditCardDelete-${id}`).toggle('fast');
}

function deleteCreditCard(id) {
    var creditCard = {
        creditCardId: id
    }
    
    $.ajax({
        url: '/CreditCard/DeleteCreditCard',
        type: "DELETE",
        data: creditCard,
        dataType: "json",
        success: function (result) {
            window.location.reload(true);
        },
        error: function (result) {
            window.location.reload(true);
        }
    });
}



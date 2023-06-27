$('#creditCard').hide();

// Load Partial View of Credit Cards
$('#creditCardsPartialView').load("/Home/GetCreditCardsPartial")

// Change attributes on the Partial View subject to every credit card data
$(document).ready(function GetCreditCards() {
    $.ajax({
        url: "/Home/GetCreditCards",
        dataType: "json",
        type: "GET",
        contentType: 'application/json; charset=utf-8',
        cache: false,

        success: function (data) {
            var creditCards = data
            for (var i = 0; i < creditCards.length; ++i) {

                var id = creditCards[i].creditCardId
                var autoPayment = creditCards[i].autoPayment

                $(`#creditCardEdit-${id}`).hide();    
                $(`#creditCardPayment-${id}`).hide();
                $(`#creditCardDelete-${id}`).hide();

                if (autoPayment == true) {
                    $(`#autoPayment-${id}`).prop('checked', true);
                    $(`#creditPaymentButton-${id}`).prop('disabled', true)
                    $(`#creditPaymentButton-${id}`).html(`Pay <i class="bi bi-arrow-repeat"></i>`)
                }
                else {
                    $(`#autoPayment-${id}`).prop('checked', false);
                    $(`#creditPaymentButton-${id}`).prop('disabled', false)
                }

                let AmountOwed = creditCards[i].amountOwed
                if (AmountOwed > 0) {
                    $(`#displayAmountOwed-${id}`).attr('class', 'card-text fs-3 text-danger mb-1');
                    
                }
                else {   
                    $(`#displayAmountOwed-${id}`).attr('class', 'card-text fs-3 text-success mb-1');
                }
           
            }
        },
        error: function (xhr) {
            alert('error');
        }
    })
})


// EDIT FORM
function showEditForm(id) {

    $(`#creditCard-${id}`).attr('class', 'card me-0 ms-0 mt-0 mb-3 pb-1 text-md-start text-light cardEditFormClass');
    // Expand to the exact height of the form, removes change of size on hover
    $(`#creditCards`).css('height', ($(`#creditCardEdit-${id}`).height() + 64) + 'px');

    // PENDING! Add automatic scroll to the edit form 

    $(`#creditCardInfo-${id}`).toggle('fast');
    $(`#creditCardEdit-${id}`).toggle('slow');
}

function hideEditForm(id) {

    $(`#creditCard-${id}`).attr('class', 'card me-0 ms-0 mt-0 mb-3 pb-1 text-md-start text-light cardInfoClass');
    // Return to debtsBodyClass attributes
    $(`#creditCards`).css('height', '');
    $(`#creditCards`).attr('class', 'card-body debtsBodyClass')

    $(`#creditCardInfo-${id}`).toggle('slow');
    $(`#creditCardEdit-${id}`).toggle('fast');
}

function updateForm(id) {

    var checked = false;
    if ($(`#autoPayment-${id}`).is(':checked')) {
        checked = true;
    }

    var creditCard = {
        creditCardId: id,
        name: $(`#name-${id}`).val(),
        creditLimit: $(`#creditLimit-${id}`).val(),
        autoPayment: checked,
        cutOffDate: $(`#cutOffDate-${id}`).val(),
        dueDate: $(`#dueDate-${id}`).val(),
        amountOwed: $(`#amountOwed-${id}`).val()
    };
    
    $.ajax({
        url: 'Home/EditCreditCard ',
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


// CREATE CREDIT CARD
function createCreditCard() {
    // Expand to the exact height of the form, removes change of size on hover
    $(`#creditCards`).css('height', ($(`#creditCard`).height() + 64) + 'px');
    $(`#creditCard`).toggle('fast');
    // PENDING! Add automatic scroll to the edit form 
}

function cancelCreditCard() {
    $(`#creditCards`).css('height', '');
    $(`#creditCards`).attr('class', 'card-body debtsBodyClass')
    $(`#creditCard`).hide();

}





// PAYMENT FORM
function showPaymentForm(id) {
    
    $(`#creditCard-${id}`).attr('class', 'card me-0 ms-0 mt-0 mb-3 pb-1 text-md-start text-light cardPaymentClass'); 

    // Adjust size of container
    $(`#creditCards`).css('height', ($(`#creditCardPayment-${id}`).height() + 64) + 'px');

    // Show payment form
    $(`#creditCardInfo-${id}`).toggle('fast');
    $(`#creditCardPayment-${id}`).toggle('slow');

    // PENDING! Add automatic scroll to the edit form 

    // Update Owed Amount color class
    var amountOwed = $(`#amountOwed-${id}`).val()
    if (amountOwed <= 0) {
        $(`#amountOwedDisplay-${id}`).attr('class', 'card-text fs-3 text-success mb-1');
        $(`#amountOwedDisplay-${id}`).html(`<strong>$ ${amountOwed}</strong>`)
    }
    else {
        $(`#amountOwedDisplay-${id}`).attr('class', 'card-text fs-3 text-danger mb-1');
        $(`#amountOwedDisplay-${id}`).html(`<strong>$ ${amountOwed}</strong>`)
    }

    // Update Owed Amount color class in real time
    function calculateAmountOwed() {
        var amountPaid = $(`#payment-${id}`).val()
        var updatedAmountOwed = (amountOwed - amountPaid).toFixed(2)
        
        if (updatedAmountOwed <= 0) {
            $(`#amountOwedDisplay-${id}`).attr('class', 'card-text fs-3 text-success mb-1');
            $(`#amountOwedDisplay-${id}`).html(`<strong>$ ${updatedAmountOwed}</strong>`)
        }
        else {
            $(`#amountOwedDisplay-${id}`).attr('class', 'card-text fs-3 text-danger mb-1');
            $(`#amountOwedDisplay-${id}`).html(`<strong>$ ${updatedAmountOwed}</strong>`)
        }
    }

    $(`#payment-${id}`).keyup(function () {
        calculateAmountOwed();

    })
}

function hidePaymentForm(id) {
    
    $(`#creditCard-${id}`).attr('class', 'card me-0 ms-0 mt-0 mb-3 pb-1 text-md-start text-light cardInfoClass'); 

    // Return to debtsBodyClass container attributes
    $(`#creditCards`).css('height', '');
    $(`#creditCards`).attr('class', 'card-body debtsBodyClass')

    $(`#creditCardInfo-${id}`).toggle('slow');
    $(`#creditCardPayment-${id}`).toggle('fast');
}

function updatePaymentForm(id) {
    var amountOwed = $(`#amountOwed-${id}`).val()
    var amountPaid = $(`#payment-${id}`).val()
    var updatedAmountOwed = amountOwed - amountPaid
    var creditCard = {
        creditCardId: id,
        amountOwed: updatedAmountOwed
    };

    $.ajax({
        url: 'Home/EditCreditCardAmountOwed',
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
    $(`#creditCard-${id}`).attr('class', 'card me-0 ms-0 mt-0 mb-3 pb-1 text-md-start text-light cardDeleteClass'); 
    $(`#creditCardInfo-${id}`).toggle('fast');
    $(`#creditCardDelete-${id}`).toggle('fast');
}

function hideDeleteCreditCard(id) {
    $(`#creditCard-${id}`).attr('class', 'card me-0 ms-0 mt-0 mb-3 pb-1 text-md-start text-light cardInfoClass'); 
    $(`#creditCardInfo-${id}`).toggle('fast');
    $(`#creditCardDelete-${id}`).toggle('fast');
}

function deleteCreditCard(id) {
    var creditCard = {
        creditCardId: id
    }

    $.ajax({
        url: 'Home/DeleteCreditCard',
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



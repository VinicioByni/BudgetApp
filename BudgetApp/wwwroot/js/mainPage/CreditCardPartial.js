
/* For future functionality for the user to be able to select visible cards and the order */ 
window.visibleCreditCards = 2

var order = ""

// Load Credit Card Partial
$(function () {

    creditCardsPartial(order)

})

function creditCardsPartial(order) {
    
    $.ajax({
        url: '/CreditCard/_CreditCardsPartial',
        dataType: 'html',
        contentType: 'application/html; charset=utf-8',
        type: 'GET',
        data: {
            order: order
        },
        success: function (data) {

            $('#creditCardsPartial').html(data).fadeIn('slow');

            creditCardsFunctions()
            
        },
        error: function () {
            alert('error creditCard partial');
        }
    })
}

function creditCardsFunctions() {

    CreditCardsAmountOwedJson()
    creditCardsContainerSize()

    addCreditCardBtns()

    GetCreditCardsColor()

    CreditCardsEdit()

    CreditCardsPayment()

    CreditCardsDelete()
}



// Visible amount of credit cards on resize of the page
$(window).on('resize', function () {

    creditCardsContainerSize()

})

// Visible amount of credit cards when partial view reloads
function creditCardsContainerSize() {

    var creditCardsSize = 0
    var id = 0
    var fontSize = parseInt($('html').css('font-size'), 10)

    // The + 2 on both creditCardsSize comes from the elements being inside a card
    for (var i = 0; i < visibleCreditCards; ++i) {
        id = creditCardsGlobal[i].creditCardId
        creditCardsSize += $(`#creditCard-${id}`).height() + 2
    }
    var addCreditCardBtn = (fontSize * 1.5) + 6
    // The + 1 on margin comes from the add credit card button above the credit cards
    var margin = fontSize * (visibleCreditCards + 1)
    

    // Credit Card Size counts the height of the credit cards including the padding
    $(`#creditCards`).css('height', (creditCardsSize + parseInt(margin)) + addCreditCardBtn + 'px');
}




// Amount Owed by Credit Cards
function CreditCardsAmountOwedJson() {

    $.ajax({
        url: '/CreditCard/CreditCardsAmountOwedJson',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        type: 'GET',
        data: {
            order: order
        },
        success: function (creditCards) {

            updateCreditCardsAmountOwed(creditCards)

        },
        error: function (data) {

            alert('error creditCard amount owed json');
        }
    })
}

function updateCreditCardsAmountOwed(creditCards) {

    var id
    var amountOwed

    Object.keys(creditCards).forEach(function (key) {
        id = key;
        amountOwed = creditCards[key]

        $(`#displayAmountOwed-${id}`).html(`<strong> MXN $ ${amountOwed}</strong>`);

        // Update in credit card payment form
        $(`#amountOwed-${id}`).html(`<strong> MXN $ ${amountOwed}</strong>`);

        // Display amount owed color, subject to the actual amount owed value
        if (amountOwed > 0) {
            $(`#amountOwed-${id}`).attr("class", "card-text fs-3 text-danger mb-1")
            $(`#displayAmountOwed-${id}`).attr('class', 'text-danger fs-3 mb-0 pEditable');
        }
        else {
            $(`#amountOwed-${id}`).attr("class", "card-text fs-3 text-success mb-1")
            $(`#displayAmountOwed-${id}`).attr('class', 'text-success fs-3  mb-0 pEditable');
        }
    })        
}



// Credit Cards color
var originalColor
    // originalColor saves the og value of the credit cards color in case the user
    // plays with the color of the credit card but ends up canceling the update of the card
function GetCreditCardsColor() {
    $.ajax({
        url: '/CreditCard/GetCreditCardColor',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        type: 'GET',
        success: function (creditCards) {

            updateCreditCardsColor(creditCards)

            originalColor = creditCards

        },
        error: function (data) {

            alert('error creditCard amount owed json');
        }
    })
}

function updateCreditCardsColor(creditCards) {

    const creditCardColors = new Map()

    for (var i = 0; i < creditCards.length; i++) {
        var id = creditCards[i].id
        var color = creditCards[i].color
        color = `#${color}`

        // transform to hsl
        var colorHSL = HexToHSL(color)

        // Make hsl lighter

        
        creditCardColors.set(id, { 'color': color, 'hoverColor': colorHSL })

       
        $(`creditCardColorValue-${id}`).val(color)
        $(`#creditCard-${id}`).css("background-color", color)

    }

    colorHover(creditCardColors)

}
    



// Credit Cards edit form
function CreditCardsEdit() {

    const creditCardBody = document.querySelectorAll('div.creditCardInfo')

    creditCardBody.forEach(creditCardBody => {
        creditCardBody.addEventListener('click', function (b) {

            showCreditCardEditForm(this.dataset.index)
        })
    })

    const updateBtn = document.querySelectorAll('button.creditCardUpdateBtn')

    updateBtn.forEach(button => {
        button.addEventListener('click', function (b) {

            updateCreditCard(this.dataset.index)
        })
    })

    const cancelBtn = document.querySelectorAll('button.creditCardCancelUpdateBtn')

    cancelBtn.forEach(button => {
        button.addEventListener('click', function (b) {
            b.stopPropagation()
            hideCreditCardEditForm(this.dataset.index)
        })
    })
}

function showCreditCardEditForm(id) {

    colorElement(`#creditCardColorValue-${id}`, `#creditCard-${id}`)

    $(`#creditCardName-${id}`).hide('fast');
    $(`#creditCardNameForm-${id}`).show('fast');

    $(`#creditCardLimit-${id}`).hide('fast');
    $(`#creditCardLimitForm-${id}`).show('fast');
    $(`#creditCardColorForm-${id}`).show('fast');

    $(`#creditCardCurrentCutOffDate-${id}`).hide('fast');
    $(`#creditCardCurrentCutOffDateForm-${id}`).show('fast');
    $(`#creditCardLastCutOffDateForm-${id}`).show('fast');

    $(`#creditCardDueDate-${id}`).hide('fast');
    $(`#creditCardDueDateForm-${id}`).show('fast');

    
    // Credit Card Btns
    $(`#deleteCreditCardBtn-${id}`).hide();
    $(`#updateCreditCardBtn-${id}`).show();
    $(`#cancelUpdateCreditCardBtn-${id}`).show();

}

function hideCreditCardEditForm(id) {

    for (var i = 0; i < originalColor.length; i++) {
        
        if (originalColor[i].id == id) {
            var color = `#${originalColor[i].color}`
            $(`#creditCard-${id}`).css("background-color", `${color}`)
            $(`#creditCardColorValue-${id}`).val(color)
            break
        }
    }
    

    $(`#creditCardName-${id}`).show('fast');
    $(`#creditCardNameForm-${id}`).hide('fast');

    $(`#creditCardLimit-${id}`).show('fast');
    $(`#creditCardLimitForm-${id}`).hide('fast');
    $(`#creditCardColorForm-${id}`).hide('fast');

    $(`#creditCardCurrentCutOffDate-${id}`).show('fast');
    $(`#creditCardCurrentCutOffDateForm-${id}`).hide('fast');
    $(`#creditCardLastCutOffDateForm-${id}`).hide('fast');

    $(`#creditCardDueDate-${id}`).show('fast');
    $(`#creditCardDueDateForm-${id}`).hide('fast');

    // Credit Card Btns
    $(`#deleteCreditCardBtn-${id}`).show();
    $(`#updateCreditCardBtn-${id}`).hide();
    $(`#cancelUpdateCreditCardBtn-${id}`).hide();
}

function updateCreditCard(id) {

    // get color with id
    
    var creditCard = {
        creditCardId: id,
        name: $(`#creditCardNameValue-${id}`).val(),
        creditLimit: $(`#creditCardLimitValue-${id}`).val(),
        currentCutOffDate: $(`#creditCardCurrentCutOffDateValue-${id}`).val(),
        lastCutOffDate: $(`#creditCardLastCutOffDateValue-${id}`).val(),
        dueDate: $(`#creditCardDueDateValue-${id}`).val(),
        color: $(`#creditCardColorValue-${id}`).val()
    };

    $.ajax({
        url: '/CreditCard/EditCreditCard',
        dataType: 'html',
        type: 'POST',
        cashe: false,
        data: {
            creditCard: creditCard
        },
        success: function (data) {
            $('#creditCardsPartial').fadeOut('fast').html(data).fadeIn('slow');

            creditCardsFunctions()
        },
        error: function (result) {
            alert('credit card update error')
        }
    });
}



// Add Credit Card form
function addCreditCardBtns() {
    $(`#newCreditCardBtn`).on('click', () => { showNewCreditCardForm() })
    $(`#addCreditCardBtn`).on('click', () => { addCreditCard() })
    $(`#cancelCreditCardBtn`).on('click', () => { cancelNewCreditCardForm() })

}

function showNewCreditCardForm() {

    colorElement(`#creditCardColorValue`, `#creditCard`)

    $('#newCreditCardBtn').hide('fast');
    $(`#newCreditCard`).show('fast')

};

function cancelNewCreditCardForm() {

    var cssVariables = getComputedStyle(document.body)


    $('#newCreditCardBtn').show('fast');
    $(`#newCreditCard`).hide('fast');

};

function addCreditCard() {
   
    var creditCard = {
        "name": $(`#creditCardNameValue`).val(),
        "amountPaid": 0,
        "creditLimit": $(`#creditCardLimitValue`).val(),
        "currentCutOffDate": $(`#creditCardCurrentCutOffDateValue`).val(),
        "lastCutOffDate": $(`#creditCardLastCutOffDateValue`).val(),
        "dueDate": $(`#creditCardDueDateValue`).val(),
        "color": $(`#creditCardColorValue`).val().substring(1)
    };

    $.ajax({
        url: '/CreditCard/AddCreditCard',
        dataType: 'html',
        type: 'POST',
        cashe: false,
        data: {
            creditCard: creditCard
        },
        success: function (data) {
            $('#creditCardsPartial').fadeOut('fast').html(data).fadeIn('slow');

            creditCardsFunctions()
        },
        error: function (result) {
            alert('credit card add error')
        }
    });
}



// Payment Form
function CreditCardsPayment() {

    const showButton = document.querySelectorAll('button.creditCardShowPaymentBtn')

    showButton.forEach(button => {
        button.addEventListener('click', function (b) {
            b.stopPropagation()
            showPaymentForm(this.dataset.index)
        })
    })

    const hideButton = document.querySelectorAll('button.creditCardCancelPaymentBtn')

    hideButton.forEach(button => {
        button.addEventListener('click', function (b) {
            b.stopPropagation()
            hidePaymentForm(this.dataset.index)
        })
    })

    const updateButton = document.querySelectorAll('button.creditCardUpdatePaymentBtn')

    updateButton.forEach(button => {
        button.addEventListener('click', function (b) {
            b.stopPropagation()
            updatePaymentForm(this.dataset.index)
        })
    })


}

function showPaymentForm(id) {

    // Change card body class
    $(`#creditCard-${id}`).attr('class', 'card me-0 ms-0 mt-0 mb-3 pb-1 text-md-start text-light creditCardPayment');

    // Show payment form
    $(`#creditCardInfo-${id}`).toggle('fast');
    $(`#creditCardPayment-${id}`).toggle('slow');

}

function hidePaymentForm(id) {
    
    $(`#creditCard-${id}`).attr('class', 'card me-0 ms-0 mt-0 mb-3 pb-1 text-md-start text-light creditCardInfo');

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
        dataType: 'html',
        type: 'POST',
        cashe: false,
        data: {
            creditCard: creditCard
        },
        success: function (data) {
            $('#creditCardsPartial').fadeOut('fast').html(data).fadeIn('slow');

            creditCardsFunctions()

        },
        error: function (result) {
            alert('credit card edit error')
        }
    });
}


// Delete Credit Card Confirmation
function CreditCardsDelete() {

    const showButtons = document.querySelectorAll('button.creditCardShowDeleteBtn')

    showButtons.forEach(button => {
        button.addEventListener('click', function (b) {
            console.log('entered show btn')
            b.stopPropagation()
            showDeleteCreditCard(this.dataset.index)
        })
    })

    const hideButtons = document.querySelectorAll('button.creditCardHideDeleteBtn')

    hideButtons.forEach(button => {
        button.addEventListener('click', function (b) {
            b.stopPropagation()
            hideDeleteCreditCard(this.dataset.index)
        })
    })

    const deleteButtons = document.querySelectorAll('button.creditCardDeleteBtn')

    deleteButtons.forEach(button => {
        button.addEventListener('click', function (b) {
            b.stopPropagation()
            deleteCreditCard(this.dataset.index)
        })
    })
}

function showDeleteCreditCard(id) {
    console.log('show delete creditCard')
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
        dataType: "html",
        data: { creditCard: creditCard },
        cashe: false,
        success: function (creditCards) {
            $('#creditCardsPartial').fadeOut('fast').html(creditCards).fadeIn('slow');

            creditCardsFunctions()
        },
        error: function (result) {
            alert('delete creditCard error')
        }
    });
}



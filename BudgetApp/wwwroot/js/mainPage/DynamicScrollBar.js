
var creditCards = document.getElementById('creditCards');
creditCards.style.overflowY = 'hidden'


creditCards.onmouseenter = function () {
    creditCards.style.overflowY = 'auto';
    creditCards.style.transitionDuration = '3s';

}
creditCards.onmouseleave = function () {
    creditCards.style.overflowY = 'hidden';
}



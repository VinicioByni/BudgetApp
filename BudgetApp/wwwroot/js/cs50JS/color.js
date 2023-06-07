

document.querySelector('select').onchange = function () {

    document.querySelector('#hello').style.color = this.value;

};

// On click does not work, need to find why


document.querySelectorAll('button').forEach = (button) => {
    button.onclick = function () {
        document.querySelector('#hello').style.color = button.dataset.color;
    }
}

// IN 1:12 of the cs50 js lesson, it teaches the createElement, in case i need it
// Also disables a button, that can also work

//document.querySelector('#submit').disabled = true;



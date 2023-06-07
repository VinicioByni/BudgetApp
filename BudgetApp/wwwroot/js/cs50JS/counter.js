
// Counter with query selector and innerHTML
let counter = 0;
function count() {

   counter++;

    const heading = document.querySelector('h1');
    heading.innerHTML = counter;

    if (counter % 10 === 0) {
        alert(`Counter has reached ${counter}`);
    }
  
}



    







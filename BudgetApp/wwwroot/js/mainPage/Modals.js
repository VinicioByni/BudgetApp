const OpenButton = document.querySelector("#modal_open");

const modal = document.querySelector("#modal");

OpenButton.addEventListener('click', () => {
    modal.showModal();
})

CloseButton.addEventListener('click', () => {
    modal.close();
})
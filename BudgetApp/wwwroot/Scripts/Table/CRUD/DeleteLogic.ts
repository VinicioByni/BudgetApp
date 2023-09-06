import { fetchDelete } from './DeleteApi.js'

export const deleteRow = function (tableVariant) {

    const deleteBtns = document.querySelectorAll(`.${tableVariant}-delete-btn`)

    deleteBtns.forEach(deleteBtn => {
        deleteBtn.addEventListener('click', function () {
            const row = this.closest("tr")
            const rowId = row.dataset.id

            fetchDelete(rowId, tableVariant)
        })
    })
    
}
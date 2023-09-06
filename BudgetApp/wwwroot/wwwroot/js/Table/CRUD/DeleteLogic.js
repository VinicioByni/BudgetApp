import { fetchDelete } from './DeleteApi.js';
export var deleteRow = function (tableVariant) {
    var deleteBtns = document.querySelectorAll(".".concat(tableVariant, "-delete-btn"));
    deleteBtns.forEach(function (deleteBtn) {
        deleteBtn.addEventListener('click', function () {
            var row = this.closest("tr");
            var rowId = row.dataset.id;
            fetchDelete(rowId, tableVariant);
        });
    });
};
//# sourceMappingURL=DeleteLogic.js.map
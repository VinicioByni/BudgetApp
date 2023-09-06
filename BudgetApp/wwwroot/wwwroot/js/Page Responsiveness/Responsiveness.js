var desktopMediaQuery = window.matchMedia('(max-width: 992px)');
// Tiles
var tileCols = document.querySelectorAll('.tile-col');
export function tilesWideScreenLayout() {
    tileCols.forEach(function (tile) {
        if (tile instanceof HTMLDivElement) {
            tile.classList.remove('col-sm-6');
            tile.classList.remove('col-12');
            tile.classList.add('col-3');
        }
    });
}
export function tilesSmallScreenLayout() {
    tileCols.forEach(function (tileCol) {
        if (tileCol instanceof HTMLDivElement) {
            tileCol.classList.remove('col-3');
            tileCol.classList.add('col-sm-6');
            tileCol.classList.add('col-12');
        }
    });
}
// Tables
var tableCols = document.querySelectorAll('.table-col');
export function tablesWideScreenLayout() {
    tableCols.forEach(function (tableCol) {
        if (tableCol instanceof HTMLDivElement) {
            tableCol.classList.remove('col-sm-6');
            tableCol.classList.add('col-12');
        }
    });
    var tableFilterForms = document.querySelectorAll('.table-filter-form');
    tableFilterForms.forEach(function (filter) {
        if (filter instanceof HTMLFormElement) {
            filter.classList.add('justify-content-end');
        }
    });
}
export function tablesSmallScreenLayout() {
    tableCols.forEach(function (tableCol) {
        if (tableCol instanceof HTMLDivElement) {
            tableCol.classList.remove('col-12');
            tableCol.classList.add('col-sm-6');
        }
    });
    var pageSizeForms = document.querySelectorAll('.table-page-size-form');
    pageSizeForms.forEach(function (pageSizeForm) {
        if (pageSizeForm instanceof HTMLFormElement) {
            pageSizeForm.classList.remove('justify-content-end');
        }
    });
}
desktopMediaQuery.addEventListener('change', function () {
    if (desktopMediaQuery.matches) {
        tilesSmallScreenLayout();
        tablesSmallScreenLayout();
    }
    else {
        tilesWideScreenLayout();
        tablesWideScreenLayout();
    }
});
//# sourceMappingURL=Responsiveness.js.map
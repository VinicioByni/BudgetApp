import { getTableSettingsParameters, setTableSettingsParameters } from '../TableSettingsParameters/TableSettingsParametersLocalStorage.js';
import { defaultTableSettingsParameters } from '../TableSettingsParameters/TableSettingsParameters.js';
import { safeParseInt } from '../../Utilities/ParseUtilities.js';
import { loadTable } from '../CRUD/ReadLogic.js';
import { pagination } from '../Paging/Pagination.js';
export var pagingTable = function (tableVariant) {
    var tableSettingsParameters = getTableSettingsParameters(tableVariant);
    // Page Size
    var pageSizeSelectInput = document.querySelector("#".concat(tableVariant, "PageSizeSelect"));
    var selectedValue = tableSettingsParameters.pagingParameters.pageSize;
    if (pageSizeSelectInput instanceof HTMLSelectElement) {
        var options = pageSizeSelectInput.options;
        for (var optionIndex = 0; optionIndex < options.length; optionIndex++) {
            var option = options[optionIndex];
            var optionValue = safeParseInt(option.value, 0);
            if (optionValue === selectedValue) {
                option.selected = true;
            }
            else {
                option.selected = false;
            }
        }
    }
    var pageSizeForm = document.querySelector("#".concat(tableVariant, "PageSizeForm"));
    pageSizeForm.addEventListener('submit', function (event) {
        event.preventDefault();
        if (event.target instanceof HTMLFormElement) {
            var formData = new FormData(event.target);
            var selectValue = parseInt(formData.get('pageSize').toString());
            var defaultPageNumber = defaultTableSettingsParameters.pagingParameters.pageNumber;
            tableSettingsParameters.pagingParameters.pageSize = selectValue;
            tableSettingsParameters.pagingParameters.pageNumber = defaultPageNumber;
            setTableSettingsParameters(tableVariant, tableSettingsParameters);
            loadTable(tableVariant);
        }
    });
    // First 4 btns elements
    var firstPageBtn = document.querySelector("#".concat(tableVariant, "FirstPageBtn"));
    var previousPageBtn = document.querySelector("#".concat(tableVariant, "PreviousPageBtn"));
    var nextPageBtn = document.querySelector("#".concat(tableVariant, "NextPageBtn"));
    var lastPageBtn = document.querySelector("#".concat(tableVariant, "LastPageBtn"));
    var totalFilteredItemsInput = document.querySelector("#".concat(tableVariant, "FilteredTotalInput"));
    var totalItemsValue = totalFilteredItemsValue();
    function totalFilteredItemsValue() {
        if (totalFilteredItemsInput instanceof HTMLInputElement) {
            return parseInt(totalFilteredItemsInput.value);
        }
    }
    var numberOfPages = Math.ceil(totalItemsValue / tableSettingsParameters.pagingParameters.pageSize);
    // Next, Previous, First and Last Btns
    if (tableSettingsParameters.pagingParameters.pageNumber === 1) {
        firstPageBtn.setAttribute('disabled', '');
        previousPageBtn.setAttribute('disabled', '');
    }
    if (tableSettingsParameters.pagingParameters.pageNumber === numberOfPages || numberOfPages === 0) {
        lastPageBtn.setAttribute('disabled', '');
        nextPageBtn.setAttribute('disabled', '');
    }
    firstPageBtn.addEventListener('click', function () {
        tableSettingsParameters.pagingParameters.pageNumber = 1;
        setTableSettingsParameters(tableVariant, tableSettingsParameters);
        loadTable(tableVariant);
    });
    lastPageBtn.addEventListener('click', function () {
        tableSettingsParameters.pagingParameters.pageNumber = numberOfPages;
        setTableSettingsParameters(tableVariant, tableSettingsParameters);
        loadTable(tableVariant);
    });
    previousPageBtn.addEventListener('click', function () {
        tableSettingsParameters.pagingParameters.pageNumber -= 1;
        setTableSettingsParameters(tableVariant, tableSettingsParameters);
        loadTable(tableVariant);
    });
    nextPageBtn.addEventListener('click', function () {
        tableSettingsParameters.pagingParameters.pageNumber += 1;
        setTableSettingsParameters(tableVariant, tableSettingsParameters);
        loadTable(tableVariant);
    });
    // Items showed text
    var itemsShowedText = document.querySelector("#".concat(tableVariant, "sShowedText"));
    var firstItemNumberShowedOnPage = ((tableSettingsParameters.pagingParameters.pageNumber - 1) * tableSettingsParameters.pagingParameters.pageSize) + 1;
    var lastItemShowedOnPage;
    if (totalItemsValue === 0) {
        firstItemNumberShowedOnPage = 0;
    }
    if (totalItemsValue === 1) {
        lastItemShowedOnPage = 1;
    }
    else if ((firstItemNumberShowedOnPage + tableSettingsParameters.pagingParameters.pageSize) > totalItemsValue) {
        lastItemShowedOnPage = totalItemsValue;
    }
    else {
        lastItemShowedOnPage = firstItemNumberShowedOnPage + tableSettingsParameters.pagingParameters.pageSize - 1;
    }
    itemsShowedText.innerHTML = "".concat(firstItemNumberShowedOnPage, "-").concat(lastItemShowedOnPage, " of ").concat(totalItemsValue);
    // Numbered Btns
    var pagingBtns = document.querySelectorAll(".btn-".concat(tableVariant, "-pagination"));
    var paginationResult = pagination(totalItemsValue, tableSettingsParameters.pagingParameters.pageSize, tableSettingsParameters.pagingParameters.pageNumber);
    var numberOfBtns = paginationResult.numberOfBtns;
    var btnsArray = paginationResult.array;
    pagingBtns.forEach(function (button) {
        if (button instanceof HTMLButtonElement) {
            var btnPosition_1 = parseInt(button.dataset.id);
            if (btnsArray[btnPosition_1 - 1] === tableSettingsParameters.pagingParameters.pageNumber) {
                button.classList.add('btn-selected');
            }
            if (numberOfBtns === 0) {
                button.classList.add('hiddenElement');
            }
            else if (btnPosition_1 > numberOfBtns) {
                button.classList.add('hiddenElement');
            }
            button.innerHTML = "".concat(btnsArray[btnPosition_1 - 1]);
            button.addEventListener('click', function () {
                tableSettingsParameters.pagingParameters.pageNumber = btnsArray[btnPosition_1 - 1];
                setTableSettingsParameters(tableVariant, tableSettingsParameters);
                loadTable(tableVariant);
            });
        }
    });
    // Empty Rows
    var pageNumber = tableSettingsParameters.pagingParameters.pageNumber;
    var pageSize = tableSettingsParameters.pagingParameters.pageSize;
    var itemsShowedOnLastPage;
    if (totalItemsValue === 0) {
        itemsShowedOnLastPage = totalItemsValue;
    }
    else {
        itemsShowedOnLastPage = totalItemsValue - firstItemNumberShowedOnPage + 1;
    }
    var numberOfEmptyRows = pageSize - itemsShowedOnLastPage;
    var tableBody = document.querySelector("#".concat(tableVariant, "Table tbody"));
    var numberOfColumns = document.querySelectorAll("#".concat(tableVariant, "Table thead th")).length;
    var rowWithMessage = document.createElement('tr');
    var emptyRow = document.createElement('tr');
    var dataCellWithMessage = document.createElement('td');
    var emptyDataCell = document.createElement('td');
    dataCellWithMessage.colSpan = numberOfColumns;
    emptyDataCell.colSpan = numberOfColumns;
    if (totalItemsValue <= 0) {
        dataCellWithMessage.textContent = "No data found!, try clearing filters and check the time period";
        addRows();
    }
    else if (pageNumber == numberOfPages && numberOfEmptyRows > 0) {
        dataCellWithMessage.textContent = "End of table data!, if data is missing, try clearing filters and check the time period";
        addRows();
    }
    function addRows() {
        var createFormRow = document.querySelector("#".concat(tableVariant, "CreateFormRow"));
        if (createFormRow instanceof HTMLTableRowElement) {
            var avrRowHeight = createFormRow.offsetHeight;
            dataCellWithMessage.style.height = avrRowHeight + "px";
            emptyDataCell.style.height = avrRowHeight + "px";
        }
        rowWithMessage.appendChild(dataCellWithMessage);
        emptyRow.appendChild(emptyDataCell);
        tableBody.appendChild(rowWithMessage);
        for (var rows = 1; rows < numberOfEmptyRows; rows++) {
            var cloneEmptyRow = emptyRow.cloneNode(true);
            tableBody.appendChild(cloneEmptyRow);
        }
    }
};
//# sourceMappingURL=PagingFunctions.js.map
import { getTableSettingsParameters, setTableSettingsParameters } from '../TableSettingsParameters/TableSettingsParametersLocalStorage.js'
import { defaultTableSettingsParameters } from '../TableSettingsParameters/TableSettingsParameters.js'
import { safeParseInt } from '../../Utilities/ParseUtilities.js'
import { loadTable } from '../CRUD/ReadLogic.js'
import { pagination } from '../Paging/Pagination.js'

export const pagingTable = function (tableVariant: string) {

    const tableSettingsParameters = getTableSettingsParameters(tableVariant)

    // Page Size
    const pageSizeSelectInput = document.querySelector(`#${tableVariant}PageSizeSelect`);
    const selectedValue = tableSettingsParameters.pagingParameters.pageSize

    if (pageSizeSelectInput instanceof HTMLSelectElement) {
        const options = pageSizeSelectInput.options

        for (let optionIndex = 0; optionIndex < options.length; optionIndex++) {
            let option = options[optionIndex]
            let optionValue = safeParseInt(option.value, 0)

            if (optionValue === selectedValue) {
                option.selected = true
            }
            else {
                option.selected = false
            }

        }
    }

    const pageSizeForm = document.querySelector(`#${tableVariant}PageSizeForm`)
    pageSizeForm.addEventListener('submit', function (event) {
        event.preventDefault()
        if (event.target instanceof HTMLFormElement) {
            const formData = new FormData(event.target)
            const selectValue = parseInt(formData.get('pageSize').toString())

            const defaultPageNumber = defaultTableSettingsParameters.pagingParameters.pageNumber
            tableSettingsParameters.pagingParameters.pageSize = selectValue
            tableSettingsParameters.pagingParameters.pageNumber = defaultPageNumber

            setTableSettingsParameters(tableVariant, tableSettingsParameters)

            loadTable(tableVariant)
        }
    })



    // First 4 btns elements
    const firstPageBtn = document.querySelector(`#${tableVariant}FirstPageBtn`)
    const previousPageBtn = document.querySelector(`#${tableVariant}PreviousPageBtn`)
    const nextPageBtn = document.querySelector(`#${tableVariant}NextPageBtn`)
    const lastPageBtn = document.querySelector(`#${tableVariant}LastPageBtn`)

    const totalFilteredItemsInput = document.querySelector(`#${tableVariant}FilteredTotalInput`)
    const totalItemsValue = totalFilteredItemsValue()

    function totalFilteredItemsValue() {
        if (totalFilteredItemsInput instanceof HTMLInputElement) {
            return parseInt(totalFilteredItemsInput.value)
        }
    }

    const numberOfPages = Math.ceil(totalItemsValue / tableSettingsParameters.pagingParameters.pageSize)




    // Next, Previous, First and Last Btns
    if (tableSettingsParameters.pagingParameters.pageNumber === 1) {
        (firstPageBtn as HTMLElement).setAttribute('disabled', '');
        (previousPageBtn as HTMLElement).setAttribute('disabled', '');
    }

    if (tableSettingsParameters.pagingParameters.pageNumber === numberOfPages || numberOfPages === 0) {
        (lastPageBtn as HTMLElement).setAttribute('disabled', '');
        (nextPageBtn as HTMLElement).setAttribute('disabled', '');
    }

    firstPageBtn.addEventListener('click', function () {
        tableSettingsParameters.pagingParameters.pageNumber = 1
        setTableSettingsParameters(tableVariant, tableSettingsParameters)

        loadTable(tableVariant)
    })

    lastPageBtn.addEventListener('click', function () {

        tableSettingsParameters.pagingParameters.pageNumber = numberOfPages
        setTableSettingsParameters(tableVariant, tableSettingsParameters)

        loadTable(tableVariant)

    })


    previousPageBtn.addEventListener('click', function () {

        tableSettingsParameters.pagingParameters.pageNumber -= 1
        setTableSettingsParameters(tableVariant, tableSettingsParameters)

        loadTable(tableVariant)

    })

    nextPageBtn.addEventListener('click', function () {

        tableSettingsParameters.pagingParameters.pageNumber += 1
        setTableSettingsParameters(tableVariant, tableSettingsParameters)

        loadTable(tableVariant)

    })





    // Items showed text
    const itemsShowedText = document.querySelector(`#${tableVariant}sShowedText`)
    let firstItemNumberShowedOnPage = ((tableSettingsParameters.pagingParameters.pageNumber - 1) * tableSettingsParameters.pagingParameters.pageSize) + 1
    let lastItemShowedOnPage: number

    if (totalItemsValue === 0) {
        firstItemNumberShowedOnPage = 0
    }

    if (totalItemsValue === 1) {
        lastItemShowedOnPage = 1
    }
    else if ((firstItemNumberShowedOnPage + tableSettingsParameters.pagingParameters.pageSize) > totalItemsValue) {
        lastItemShowedOnPage = totalItemsValue
    }
    else {
        lastItemShowedOnPage = firstItemNumberShowedOnPage + tableSettingsParameters.pagingParameters.pageSize - 1
    }

    itemsShowedText.innerHTML = `${firstItemNumberShowedOnPage}-${lastItemShowedOnPage} of ${totalItemsValue}`







    // Numbered Btns
    const pagingBtns = document.querySelectorAll(`.btn-${tableVariant}-pagination`)

    let paginationResult = pagination(totalItemsValue, tableSettingsParameters.pagingParameters.pageSize, tableSettingsParameters.pagingParameters.pageNumber)
    let numberOfBtns = paginationResult.numberOfBtns
    let btnsArray = paginationResult.array

    
    pagingBtns.forEach(button => {
        if (button instanceof HTMLButtonElement) {
            let btnPosition = parseInt(button.dataset.id)
            if (btnsArray[btnPosition - 1] === tableSettingsParameters.pagingParameters.pageNumber) {
                button.classList.add('btn-selected')
            }

            if (numberOfBtns === 0) {
                button.classList.add('hiddenElement')
            }
            else if (btnPosition > numberOfBtns) {
                button.classList.add('hiddenElement')
            }
         
            button.innerHTML = `${btnsArray[btnPosition - 1]}`

            button.addEventListener('click', function () {
                tableSettingsParameters.pagingParameters.pageNumber = btnsArray[btnPosition - 1]
                setTableSettingsParameters(tableVariant, tableSettingsParameters)

                loadTable(tableVariant)
            })
        }
    })




    // Empty Rows
    const pageNumber = tableSettingsParameters.pagingParameters.pageNumber
    const pageSize = tableSettingsParameters.pagingParameters.pageSize
    let itemsShowedOnLastPage: number

    if (totalItemsValue === 0) {
        itemsShowedOnLastPage = totalItemsValue
    }
    else {
        itemsShowedOnLastPage = totalItemsValue - firstItemNumberShowedOnPage + 1
    }
    
    const numberOfEmptyRows = pageSize - itemsShowedOnLastPage 

    const tableBody = document.querySelector(`#${tableVariant}Table tbody`)
    const numberOfColumns = document.querySelectorAll(`#${tableVariant}Table thead th`).length

    const rowWithMessage = document.createElement('tr')
    const emptyRow = document.createElement('tr')

    const dataCellWithMessage = document.createElement('td')
    const emptyDataCell = document.createElement('td')

    dataCellWithMessage.colSpan = numberOfColumns
    emptyDataCell.colSpan = numberOfColumns

    
    if (totalItemsValue <= 0) {
        dataCellWithMessage.textContent = "No data found!, try clearing filters and check the time period"
        addRows()
    }
    else if (pageNumber == numberOfPages && numberOfEmptyRows > 0) {

        dataCellWithMessage.textContent = "End of table data!, if data is missing, try clearing filters and check the time period"
        addRows()
        
              
    }

    function addRows() {
        const createFormRow = document.querySelector(`#${tableVariant}CreateFormRow`)
        if (createFormRow instanceof HTMLTableRowElement) {
            
            const avrRowHeight = createFormRow.offsetHeight

            dataCellWithMessage.style.height = avrRowHeight + "px"
            emptyDataCell.style.height = avrRowHeight + "px"
        }

        rowWithMessage.appendChild(dataCellWithMessage)
        emptyRow.appendChild(emptyDataCell)

        tableBody.appendChild(rowWithMessage)

        for (let rows = 1; rows < numberOfEmptyRows; rows++) {
            let cloneEmptyRow = emptyRow.cloneNode(true)
            tableBody.appendChild(cloneEmptyRow)
        }
    }

}


    



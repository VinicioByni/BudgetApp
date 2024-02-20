import { setPageNumber } from "../TableParameters/TableParameters.js";
import { getExpenseTable } from "./GetTableHandler.js";

export function handlePaging(btn: HTMLButtonElement) {
    const pageNumber = parseInt(btn.getAttribute('data-number'))
    setPageNumber(pageNumber)
    getExpenseTable()
}
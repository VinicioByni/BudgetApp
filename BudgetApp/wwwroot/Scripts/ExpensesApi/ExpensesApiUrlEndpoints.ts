import { getPeriodInitialDate, isPeriodInitialDateSet, setPeriodInitialDate } from "../DataPeriodSelectionLocalStorage.js"
import { defaultPeriodInitialDate } from '../DataPeriodSelection.js'



export function getExpensesTotalAmountUrlEndpoint() {
    if (!isPeriodInitialDateSet()) {
        setPeriodInitialDate(defaultPeriodInitialDate)
    }

    const periodInitialDateString = getPeriodInitialDate()

    const EXPENSES_TOTAL_AMOUNT_URL_ENDPOINT = `/Expense/ExpensesTotalAmount?periodInitialDateString=` + periodInitialDateString

    return EXPENSES_TOTAL_AMOUNT_URL_ENDPOINT
}

export function getIncomesTotalAmountUrlEndpoint() {
    if (!isPeriodInitialDateSet()) {
        setPeriodInitialDate(defaultPeriodInitialDate)
    }

    const periodInitialDateString = getPeriodInitialDate()

    const INCOMES_TOTAL_AMOUNT_URL_ENDPOINT = `/Income/IncomesTotalAmount?periodInitialDateString=` + periodInitialDateString

    return INCOMES_TOTAL_AMOUNT_URL_ENDPOINT
}

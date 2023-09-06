import { getExpensesTotalAmountUrlEndpoint, getIncomesTotalAmountUrlEndpoint } from './ExpensesApiUrlEndpoints.js'

export async function ExpensesTotalAmountFetch() {
    const response = await fetch(getExpensesTotalAmountUrlEndpoint())
    const totalAmount = await response.json();
    return totalAmount
}

export async function IncomesTotalAmountFetch() {
    const response = await fetch(getIncomesTotalAmountUrlEndpoint())
    const totalAmount = await response.json();
    return totalAmount
}




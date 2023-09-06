
import { fetchRead } from './ReadApi.js'

export const incomeTableVariant: string = "income"
export const expenseTableVariant: string = "expense"


export const loadTable = function (tableVariant:string) {

    fetchRead(tableVariant)
}

export const loadTables = function() {
    fetchRead(incomeTableVariant)
    fetchRead(expenseTableVariant)

}

loadTables()
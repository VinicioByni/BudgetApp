import { type TableParameters} from '../Models/TableParametersType.js'

export type CreateExpenseModel = {
    amount: number
    date: string
    expenseCategoryId: number
    description?: string
    accountId?: number
    creditCardId?: number
    debtId?: number
}

export type UpdateExpenseModel = {
    id: number
    amount: number
    date: string
    expenseCategoryId: number
    description?: string
    accountId?: number
    creditCardId?: number
    debtId?: number
}

export type DeleteExpenseModel = {
    id: number
}

export type CreateExpenseModelAction = {
    CreateExpenseModel: CreateExpenseModel,
    TableParameters?: TableParameters
}

export type UpdateExpenseModelAction = {
    UpdateExpenseModel: UpdateExpenseModel,
    TableParameters ?: TableParameters
}

export type DeleteExpenseModelAction = {
    DeleteExpenseModel: DeleteExpenseModel,
    TableParameters?: TableParameters
}





export const EXPENSE_MODEL_STRINGS = {
    id: 'id',
    amount: 'amount',
    date: 'date',
    description: 'description',
    expenseCategoryId: 'expenseCategoryId',
    payment: 'payment'
} as const
export const EXPENSE_MODEL_PAYMENT_STRINGS = {
    accountId: 'accountId',
    creditCardId: 'creditCardId',
    debtId: 'debtId'
} as const



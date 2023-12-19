export type ExpenseModel = {
    id: number
    amount: number
    date: string
    description?: string
    expenseCategoryId: number
    accountId?: number
    creditCardId?: number
    debtId?: number
}

export type ExpenseModelId = {
    id: number
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



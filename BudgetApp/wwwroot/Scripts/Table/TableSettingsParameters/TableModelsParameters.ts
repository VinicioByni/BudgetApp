

interface TableModel {
    Amount: string
    Date: string
    CategoryId: number
    Description: string
}


export interface TableModelCreate extends TableModel {
    AccountId?: number
    CreditCardId?: number
    DebtId?: number
}

export interface TableModelUpdate  extends TableModel{
    Id: number
    AccountId?: number
    CreditCardId?: number
    DebtId?: number

}


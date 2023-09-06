
type FinancialData = {
    budget: number;
    totalExpenses: number;
    totalIncomes: number;
}

const financialState: FinancialData = {
    budget: 0,
    totalExpenses: 0,
    totalIncomes: 0
}

export const FinancialState = {
    getState: () => financialState,
    updateBudget: (newBudget: number) => {
        financialState.budget = newBudget
    },
    updateTotalExpenses: (newTotalExpenses: number) => {
        financialState.totalExpenses = newTotalExpenses
    },
    updateTotalIncomes: (newTotalIncomes: number) => {
        financialState.totalIncomes= newTotalIncomes
    }
}


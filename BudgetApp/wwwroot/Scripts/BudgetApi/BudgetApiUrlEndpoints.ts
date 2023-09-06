
export const GET_BUDGET_URL_ENDPOINT = "/Budget/GetBudget"
export const UPDATE_BUDGET_URL_ENDPOINT = "/Budget/UpdateBudget?amount="

export function createUpdateBudgetUrlEndpoint(amount) {
    return UPDATE_BUDGET_URL_ENDPOINT + amount
}
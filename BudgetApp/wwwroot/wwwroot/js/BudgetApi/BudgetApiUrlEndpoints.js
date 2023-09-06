export var GET_BUDGET_URL_ENDPOINT = "/Budget/GetBudget";
export var UPDATE_BUDGET_URL_ENDPOINT = "/Budget/UpdateBudget?amount=";
export function createUpdateBudgetUrlEndpoint(amount) {
    return UPDATE_BUDGET_URL_ENDPOINT + amount;
}
//# sourceMappingURL=BudgetApiUrlEndpoints.js.map
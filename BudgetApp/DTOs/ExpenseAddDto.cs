namespace BudgetApp.DTOs
{
    public class ExpenseAddDto
    {
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; } = string.Empty;
        public int? ExpenseCategoryId { get; set; }
        public int? AccountId { get; set; }
        public int? CreditCardId { get; set; }
        public int? DebtId { get; set; }
    }
}

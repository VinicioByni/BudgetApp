using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BudgetApp.Migrations
{
    /// <inheritdoc />
    public partial class _1tomanyrelationshiopforCategoriesAccountsCreditCarddebt : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_RecurrentExpenses_AccountId",
                table: "RecurrentExpenses");

            migrationBuilder.DropIndex(
                name: "IX_RecurrentExpenses_CreditCardId",
                table: "RecurrentExpenses");

            migrationBuilder.DropIndex(
                name: "IX_RecurrentExpenses_DebtId",
                table: "RecurrentExpenses");

            migrationBuilder.DropIndex(
                name: "IX_RecurrentExpenses_ExpenseCategoryId",
                table: "RecurrentExpenses");

            migrationBuilder.DropIndex(
                name: "IX_Expenses_AccountId",
                table: "Expenses");

            migrationBuilder.DropIndex(
                name: "IX_Expenses_CreditCardId",
                table: "Expenses");

            migrationBuilder.DropIndex(
                name: "IX_Expenses_DebtId",
                table: "Expenses");

            migrationBuilder.DropIndex(
                name: "IX_Expenses_ExpenseCategoryId",
                table: "Expenses");

            migrationBuilder.CreateIndex(
                name: "IX_RecurrentExpenses_AccountId",
                table: "RecurrentExpenses",
                column: "AccountId");

            migrationBuilder.CreateIndex(
                name: "IX_RecurrentExpenses_CreditCardId",
                table: "RecurrentExpenses",
                column: "CreditCardId");

            migrationBuilder.CreateIndex(
                name: "IX_RecurrentExpenses_DebtId",
                table: "RecurrentExpenses",
                column: "DebtId");

            migrationBuilder.CreateIndex(
                name: "IX_RecurrentExpenses_ExpenseCategoryId",
                table: "RecurrentExpenses",
                column: "ExpenseCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Expenses_AccountId",
                table: "Expenses",
                column: "AccountId");

            migrationBuilder.CreateIndex(
                name: "IX_Expenses_CreditCardId",
                table: "Expenses",
                column: "CreditCardId");

            migrationBuilder.CreateIndex(
                name: "IX_Expenses_DebtId",
                table: "Expenses",
                column: "DebtId");

            migrationBuilder.CreateIndex(
                name: "IX_Expenses_ExpenseCategoryId",
                table: "Expenses",
                column: "ExpenseCategoryId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_RecurrentExpenses_AccountId",
                table: "RecurrentExpenses");

            migrationBuilder.DropIndex(
                name: "IX_RecurrentExpenses_CreditCardId",
                table: "RecurrentExpenses");

            migrationBuilder.DropIndex(
                name: "IX_RecurrentExpenses_DebtId",
                table: "RecurrentExpenses");

            migrationBuilder.DropIndex(
                name: "IX_RecurrentExpenses_ExpenseCategoryId",
                table: "RecurrentExpenses");

            migrationBuilder.DropIndex(
                name: "IX_Expenses_AccountId",
                table: "Expenses");

            migrationBuilder.DropIndex(
                name: "IX_Expenses_CreditCardId",
                table: "Expenses");

            migrationBuilder.DropIndex(
                name: "IX_Expenses_DebtId",
                table: "Expenses");

            migrationBuilder.DropIndex(
                name: "IX_Expenses_ExpenseCategoryId",
                table: "Expenses");

            migrationBuilder.CreateIndex(
                name: "IX_RecurrentExpenses_AccountId",
                table: "RecurrentExpenses",
                column: "AccountId",
                unique: true,
                filter: "[AccountId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_RecurrentExpenses_CreditCardId",
                table: "RecurrentExpenses",
                column: "CreditCardId",
                unique: true,
                filter: "[CreditCardId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_RecurrentExpenses_DebtId",
                table: "RecurrentExpenses",
                column: "DebtId",
                unique: true,
                filter: "[DebtId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_RecurrentExpenses_ExpenseCategoryId",
                table: "RecurrentExpenses",
                column: "ExpenseCategoryId",
                unique: true,
                filter: "[ExpenseCategoryId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Expenses_AccountId",
                table: "Expenses",
                column: "AccountId",
                unique: true,
                filter: "[AccountId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Expenses_CreditCardId",
                table: "Expenses",
                column: "CreditCardId",
                unique: true,
                filter: "[CreditCardId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Expenses_DebtId",
                table: "Expenses",
                column: "DebtId",
                unique: true,
                filter: "[DebtId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Expenses_ExpenseCategoryId",
                table: "Expenses",
                column: "ExpenseCategoryId",
                unique: true,
                filter: "[ExpenseCategoryId] IS NOT NULL");
        }
    }
}

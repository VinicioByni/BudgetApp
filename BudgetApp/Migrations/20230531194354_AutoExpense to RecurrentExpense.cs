using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BudgetApp.Migrations
{
    /// <inheritdoc />
    public partial class AutoExpensetoRecurrentExpense : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AutoExpenses");

            migrationBuilder.CreateTable(
                name: "RecurrentExpenses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Amount = table.Column<float>(type: "real", nullable: false),
                    Period = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DayOfTheMonth = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DayOfTheWeek = table.Column<int>(type: "int", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Method = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsAutomatic = table.Column<bool>(type: "bit", nullable: false),
                    ExpenseCategoryId = table.Column<int>(type: "int", nullable: true),
                    AccountVisible = table.Column<bool>(type: "bit", nullable: false),
                    AccountId = table.Column<int>(type: "int", nullable: true),
                    CreditCardVisible = table.Column<bool>(type: "bit", nullable: false),
                    CreditCardId = table.Column<int>(type: "int", nullable: true),
                    DebtVisible = table.Column<bool>(type: "bit", nullable: false),
                    DebtId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RecurrentExpenses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RecurrentExpenses_Accounts_AccountId",
                        column: x => x.AccountId,
                        principalTable: "Accounts",
                        principalColumn: "AccountId");
                    table.ForeignKey(
                        name: "FK_RecurrentExpenses_CreditCards_CreditCardId",
                        column: x => x.CreditCardId,
                        principalTable: "CreditCards",
                        principalColumn: "CreditCardId");
                    table.ForeignKey(
                        name: "FK_RecurrentExpenses_Debts_DebtId",
                        column: x => x.DebtId,
                        principalTable: "Debts",
                        principalColumn: "DebtId");
                    table.ForeignKey(
                        name: "FK_RecurrentExpenses_ExpenseCategories_ExpenseCategoryId",
                        column: x => x.ExpenseCategoryId,
                        principalTable: "ExpenseCategories",
                        principalColumn: "ExpenseCategoryId");
                });

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
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RecurrentExpenses");

            migrationBuilder.CreateTable(
                name: "AutoExpenses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AccountId = table.Column<int>(type: "int", nullable: true),
                    CreditCardId = table.Column<int>(type: "int", nullable: true),
                    DebtId = table.Column<int>(type: "int", nullable: true),
                    ExpenseCategoryId = table.Column<int>(type: "int", nullable: true),
                    AccountVisible = table.Column<bool>(type: "bit", nullable: false),
                    Amount = table.Column<float>(type: "real", nullable: false),
                    CreditCardVisible = table.Column<bool>(type: "bit", nullable: false),
                    DateOfTheMonth = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DebtVisible = table.Column<bool>(type: "bit", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    Method = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AutoExpenses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AutoExpenses_Accounts_AccountId",
                        column: x => x.AccountId,
                        principalTable: "Accounts",
                        principalColumn: "AccountId");
                    table.ForeignKey(
                        name: "FK_AutoExpenses_CreditCards_CreditCardId",
                        column: x => x.CreditCardId,
                        principalTable: "CreditCards",
                        principalColumn: "CreditCardId");
                    table.ForeignKey(
                        name: "FK_AutoExpenses_Debts_DebtId",
                        column: x => x.DebtId,
                        principalTable: "Debts",
                        principalColumn: "DebtId");
                    table.ForeignKey(
                        name: "FK_AutoExpenses_ExpenseCategories_ExpenseCategoryId",
                        column: x => x.ExpenseCategoryId,
                        principalTable: "ExpenseCategories",
                        principalColumn: "ExpenseCategoryId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_AutoExpenses_AccountId",
                table: "AutoExpenses",
                column: "AccountId",
                unique: true,
                filter: "[AccountId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AutoExpenses_CreditCardId",
                table: "AutoExpenses",
                column: "CreditCardId",
                unique: true,
                filter: "[CreditCardId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AutoExpenses_DebtId",
                table: "AutoExpenses",
                column: "DebtId",
                unique: true,
                filter: "[DebtId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AutoExpenses_ExpenseCategoryId",
                table: "AutoExpenses",
                column: "ExpenseCategoryId",
                unique: true,
                filter: "[ExpenseCategoryId] IS NOT NULL");
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BudgetApp.Migrations
{
    /// <inheritdoc />
    public partial class EliminatedVisibleboolsinExpenseandRecurrentExpense : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AccountVisible",
                table: "RecurrentExpenses");

            migrationBuilder.DropColumn(
                name: "CreditCardVisible",
                table: "RecurrentExpenses");

            migrationBuilder.DropColumn(
                name: "DebtVisible",
                table: "RecurrentExpenses");

            migrationBuilder.DropColumn(
                name: "AccountVisible",
                table: "Expenses");

            migrationBuilder.DropColumn(
                name: "CreditCardVisible",
                table: "Expenses");

            migrationBuilder.DropColumn(
                name: "DebtVisible",
                table: "Expenses");

            migrationBuilder.AlterColumn<float>(
                name: "AmountOwed",
                table: "CreditCards",
                type: "real",
                nullable: true,
                oldClrType: typeof(float),
                oldType: "real");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "AccountVisible",
                table: "RecurrentExpenses",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "CreditCardVisible",
                table: "RecurrentExpenses",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "DebtVisible",
                table: "RecurrentExpenses",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "AccountVisible",
                table: "Expenses",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "CreditCardVisible",
                table: "Expenses",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "DebtVisible",
                table: "Expenses",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AlterColumn<float>(
                name: "AmountOwed",
                table: "CreditCards",
                type: "real",
                nullable: false,
                defaultValue: 0f,
                oldClrType: typeof(float),
                oldType: "real",
                oldNullable: true);
        }
    }
}

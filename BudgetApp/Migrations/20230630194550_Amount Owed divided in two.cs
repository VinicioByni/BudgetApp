using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BudgetApp.Migrations
{
    /// <inheritdoc />
    public partial class AmountOweddividedintwo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FirstPeriodPayment",
                table: "CreditCards");

            migrationBuilder.DropColumn(
                name: "LastPeriodPayment",
                table: "CreditCards");

            migrationBuilder.RenameColumn(
                name: "AmountOwed",
                table: "CreditCards",
                newName: "AmountOwedLastPeriod");

            migrationBuilder.AddColumn<float>(
                name: "AmountOwedFirstPeriod",
                table: "CreditCards",
                type: "real",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AmountOwedFirstPeriod",
                table: "CreditCards");

            migrationBuilder.RenameColumn(
                name: "AmountOwedLastPeriod",
                table: "CreditCards",
                newName: "AmountOwed");

            migrationBuilder.AddColumn<bool>(
                name: "FirstPeriodPayment",
                table: "CreditCards",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "LastPeriodPayment",
                table: "CreditCards",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}

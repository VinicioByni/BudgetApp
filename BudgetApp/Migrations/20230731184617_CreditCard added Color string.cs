using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BudgetApp.Migrations
{
    /// <inheritdoc />
    public partial class CreditCardaddedColorstring : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AutoPayment",
                table: "CreditCards");

            migrationBuilder.AlterColumn<float>(
                name: "AmountPaid",
                table: "CreditCards",
                type: "real",
                nullable: false,
                defaultValue: 0f,
                oldClrType: typeof(float),
                oldType: "real",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Color",
                table: "CreditCards",
                type: "nvarchar(6)",
                maxLength: 6,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Color",
                table: "CreditCards");

            migrationBuilder.AlterColumn<float>(
                name: "AmountPaid",
                table: "CreditCards",
                type: "real",
                nullable: true,
                oldClrType: typeof(float),
                oldType: "real");

            migrationBuilder.AddColumn<bool>(
                name: "AutoPayment",
                table: "CreditCards",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}

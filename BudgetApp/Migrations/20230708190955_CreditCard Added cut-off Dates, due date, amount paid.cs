using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BudgetApp.Migrations
{
    /// <inheritdoc />
    public partial class CreditCardAddedcutoffDatesduedateamountpaid : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AmountOwedFirstPeriod",
                table: "CreditCards");

            migrationBuilder.DropColumn(
                name: "CutOffDateDay",
                table: "CreditCards");

            migrationBuilder.DropColumn(
                name: "DueDateDay",
                table: "CreditCards");

            migrationBuilder.RenameColumn(
                name: "AmountOwedLastPeriod",
                table: "CreditCards",
                newName: "AmountPaid");

            migrationBuilder.AddColumn<DateTime>(
                name: "CurrentCutOffDate",
                table: "CreditCards",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "DueDate",
                table: "CreditCards",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "LastCutOffDate",
                table: "CreditCards",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CurrentCutOffDate",
                table: "CreditCards");

            migrationBuilder.DropColumn(
                name: "DueDate",
                table: "CreditCards");

            migrationBuilder.DropColumn(
                name: "LastCutOffDate",
                table: "CreditCards");

            migrationBuilder.RenameColumn(
                name: "AmountPaid",
                table: "CreditCards",
                newName: "AmountOwedLastPeriod");

            migrationBuilder.AddColumn<float>(
                name: "AmountOwedFirstPeriod",
                table: "CreditCards",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CutOffDateDay",
                table: "CreditCards",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "DueDateDay",
                table: "CreditCards",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}

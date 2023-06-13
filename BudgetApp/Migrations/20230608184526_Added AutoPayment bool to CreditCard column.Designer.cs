﻿// <auto-generated />
using System;
using BudgetApp.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace BudgetApp.Migrations
{
    [DbContext(typeof(BudgetDbContext))]
    [Migration("20230608184526_Added AutoPayment bool to CreditCard column")]
    partial class AddedAutoPaymentbooltoCreditCardcolumn
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("BudgetApp.Models.Account", b =>
                {
                    b.Property<int>("AccountId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("AccountId"));

                    b.Property<float>("Amount")
                        .HasColumnType("real");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(25)
                        .HasColumnType("nvarchar(25)");

                    b.HasKey("AccountId");

                    b.ToTable("Accounts");
                });

            modelBuilder.Entity("BudgetApp.Models.Budget", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<float>("Amount")
                        .HasColumnType("real");

                    b.HasKey("Id");

                    b.ToTable("Budgets");
                });

            modelBuilder.Entity("BudgetApp.Models.CreditCard", b =>
                {
                    b.Property<int>("CreditCardId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("CreditCardId"));

                    b.Property<float>("AmountOwed")
                        .HasColumnType("real");

                    b.Property<bool>("AutoPayment")
                        .HasColumnType("bit");

                    b.Property<float>("CreditLimit")
                        .HasColumnType("real");

                    b.Property<DateTime>("CutOffDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DueDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(25)
                        .HasColumnType("nvarchar(25)");

                    b.HasKey("CreditCardId");

                    b.ToTable("CreditCards");
                });

            modelBuilder.Entity("BudgetApp.Models.Debt", b =>
                {
                    b.Property<int>("DebtId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("DebtId"));

                    b.Property<float>("Amount")
                        .HasColumnType("real");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(40)
                        .HasColumnType("nvarchar(40)");

                    b.Property<DateTime>("DueDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Entity")
                        .IsRequired()
                        .HasMaxLength(25)
                        .HasColumnType("nvarchar(25)");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("DebtId");

                    b.ToTable("Debts");
                });

            modelBuilder.Entity("BudgetApp.Models.Expense", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("AccountId")
                        .HasColumnType("int");

                    b.Property<bool>("AccountVisible")
                        .HasColumnType("bit");

                    b.Property<float>("Amount")
                        .HasColumnType("real");

                    b.Property<int?>("CreditCardId")
                        .HasColumnType("int");

                    b.Property<bool>("CreditCardVisible")
                        .HasColumnType("bit");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<int?>("DebtId")
                        .HasColumnType("int");

                    b.Property<bool>("DebtVisible")
                        .HasColumnType("bit");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(40)
                        .HasColumnType("nvarchar(40)");

                    b.Property<int?>("ExpenseCategoryId")
                        .HasColumnType("int");

                    b.Property<string>("Method")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("AccountId")
                        .IsUnique()
                        .HasFilter("[AccountId] IS NOT NULL");

                    b.HasIndex("CreditCardId")
                        .IsUnique()
                        .HasFilter("[CreditCardId] IS NOT NULL");

                    b.HasIndex("DebtId")
                        .IsUnique()
                        .HasFilter("[DebtId] IS NOT NULL");

                    b.HasIndex("ExpenseCategoryId")
                        .IsUnique()
                        .HasFilter("[ExpenseCategoryId] IS NOT NULL");

                    b.ToTable("Expenses");
                });

            modelBuilder.Entity("BudgetApp.Models.ExpenseCategory", b =>
                {
                    b.Property<int>("ExpenseCategoryId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ExpenseCategoryId"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(25)
                        .HasColumnType("nvarchar(25)");

                    b.HasKey("ExpenseCategoryId");

                    b.ToTable("ExpenseCategories");
                });

            modelBuilder.Entity("BudgetApp.Models.Income", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("AccountId")
                        .HasColumnType("int");

                    b.Property<float>("Amount")
                        .HasColumnType("real");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(40)
                        .HasColumnType("nvarchar(40)");

                    b.Property<int?>("IncomeCategoryId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("AccountId")
                        .IsUnique()
                        .HasFilter("[AccountId] IS NOT NULL");

                    b.HasIndex("IncomeCategoryId")
                        .IsUnique()
                        .HasFilter("[IncomeCategoryId] IS NOT NULL");

                    b.ToTable("Incomes");
                });

            modelBuilder.Entity("BudgetApp.Models.IncomeCategory", b =>
                {
                    b.Property<int>("IncomeCategoryId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IncomeCategoryId"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(25)
                        .HasColumnType("nvarchar(25)");

                    b.HasKey("IncomeCategoryId");

                    b.ToTable("IncomeCategories");
                });

            modelBuilder.Entity("BudgetApp.Models.RecurrentExpense", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("AccountId")
                        .HasColumnType("int");

                    b.Property<bool>("AccountVisible")
                        .HasColumnType("bit");

                    b.Property<float>("Amount")
                        .HasColumnType("real");

                    b.Property<int?>("CreditCardId")
                        .HasColumnType("int");

                    b.Property<bool>("CreditCardVisible")
                        .HasColumnType("bit");

                    b.Property<DateTime?>("DayOfTheMonth")
                        .HasColumnType("datetime2");

                    b.Property<int?>("DayOfTheWeek")
                        .HasColumnType("int");

                    b.Property<int?>("DebtId")
                        .HasColumnType("int");

                    b.Property<bool>("DebtVisible")
                        .HasColumnType("bit");

                    b.Property<int?>("ExpenseCategoryId")
                        .HasColumnType("int");

                    b.Property<bool>("IsAutomatic")
                        .HasColumnType("bit");

                    b.Property<string>("Method")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(40)
                        .HasColumnType("nvarchar(40)");

                    b.Property<string>("Period")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("AccountId")
                        .IsUnique()
                        .HasFilter("[AccountId] IS NOT NULL");

                    b.HasIndex("CreditCardId")
                        .IsUnique()
                        .HasFilter("[CreditCardId] IS NOT NULL");

                    b.HasIndex("DebtId")
                        .IsUnique()
                        .HasFilter("[DebtId] IS NOT NULL");

                    b.HasIndex("ExpenseCategoryId")
                        .IsUnique()
                        .HasFilter("[ExpenseCategoryId] IS NOT NULL");

                    b.ToTable("RecurrentExpenses");
                });

            modelBuilder.Entity("BudgetApp.Models.Expense", b =>
                {
                    b.HasOne("BudgetApp.Models.Account", "Account")
                        .WithOne("Expense")
                        .HasForeignKey("BudgetApp.Models.Expense", "AccountId");

                    b.HasOne("BudgetApp.Models.CreditCard", "CreditCard")
                        .WithOne("Expense")
                        .HasForeignKey("BudgetApp.Models.Expense", "CreditCardId");

                    b.HasOne("BudgetApp.Models.Debt", "Debt")
                        .WithOne("Expense")
                        .HasForeignKey("BudgetApp.Models.Expense", "DebtId");

                    b.HasOne("BudgetApp.Models.ExpenseCategory", "ExpenseCategory")
                        .WithOne("Expense")
                        .HasForeignKey("BudgetApp.Models.Expense", "ExpenseCategoryId");

                    b.Navigation("Account");

                    b.Navigation("CreditCard");

                    b.Navigation("Debt");

                    b.Navigation("ExpenseCategory");
                });

            modelBuilder.Entity("BudgetApp.Models.Income", b =>
                {
                    b.HasOne("BudgetApp.Models.Account", "Account")
                        .WithOne("Income")
                        .HasForeignKey("BudgetApp.Models.Income", "AccountId");

                    b.HasOne("BudgetApp.Models.IncomeCategory", "IncomeCategory")
                        .WithOne("Income")
                        .HasForeignKey("BudgetApp.Models.Income", "IncomeCategoryId");

                    b.Navigation("Account");

                    b.Navigation("IncomeCategory");
                });

            modelBuilder.Entity("BudgetApp.Models.RecurrentExpense", b =>
                {
                    b.HasOne("BudgetApp.Models.Account", "Account")
                        .WithOne("RecurrentExpense")
                        .HasForeignKey("BudgetApp.Models.RecurrentExpense", "AccountId");

                    b.HasOne("BudgetApp.Models.CreditCard", "CreditCard")
                        .WithOne("RecurrentExpense")
                        .HasForeignKey("BudgetApp.Models.RecurrentExpense", "CreditCardId");

                    b.HasOne("BudgetApp.Models.Debt", "Debt")
                        .WithOne("RecurrentExpense")
                        .HasForeignKey("BudgetApp.Models.RecurrentExpense", "DebtId");

                    b.HasOne("BudgetApp.Models.ExpenseCategory", "ExpenseCategory")
                        .WithOne("RecurrentExpense")
                        .HasForeignKey("BudgetApp.Models.RecurrentExpense", "ExpenseCategoryId");

                    b.Navigation("Account");

                    b.Navigation("CreditCard");

                    b.Navigation("Debt");

                    b.Navigation("ExpenseCategory");
                });

            modelBuilder.Entity("BudgetApp.Models.Account", b =>
                {
                    b.Navigation("Expense");

                    b.Navigation("Income");

                    b.Navigation("RecurrentExpense");
                });

            modelBuilder.Entity("BudgetApp.Models.CreditCard", b =>
                {
                    b.Navigation("Expense");

                    b.Navigation("RecurrentExpense");
                });

            modelBuilder.Entity("BudgetApp.Models.Debt", b =>
                {
                    b.Navigation("Expense");

                    b.Navigation("RecurrentExpense");
                });

            modelBuilder.Entity("BudgetApp.Models.ExpenseCategory", b =>
                {
                    b.Navigation("Expense");

                    b.Navigation("RecurrentExpense");
                });

            modelBuilder.Entity("BudgetApp.Models.IncomeCategory", b =>
                {
                    b.Navigation("Income");
                });
#pragma warning restore 612, 618
        }
    }
}
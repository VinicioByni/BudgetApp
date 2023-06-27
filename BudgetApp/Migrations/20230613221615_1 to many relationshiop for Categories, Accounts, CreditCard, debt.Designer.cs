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
    [Migration("20230613221615_1 to many relationshiop for Categories, Accounts, CreditCard, debt")]
    partial class _1tomanyrelationshiopforCategoriesAccountsCreditCarddebt
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

                    b.HasIndex("AccountId");

                    b.HasIndex("CreditCardId");

                    b.HasIndex("DebtId");

                    b.HasIndex("ExpenseCategoryId");

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

                    b.HasIndex("AccountId");

                    b.HasIndex("IncomeCategoryId");

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

                    b.HasIndex("AccountId");

                    b.HasIndex("CreditCardId");

                    b.HasIndex("DebtId");

                    b.HasIndex("ExpenseCategoryId");

                    b.ToTable("RecurrentExpenses");
                });

            modelBuilder.Entity("BudgetApp.Models.Expense", b =>
                {
                    b.HasOne("BudgetApp.Models.Account", "Account")
                        .WithMany("Expense")
                        .HasForeignKey("AccountId");

                    b.HasOne("BudgetApp.Models.CreditCard", "CreditCard")
                        .WithMany("Expense")
                        .HasForeignKey("CreditCardId");

                    b.HasOne("BudgetApp.Models.Debt", "Debt")
                        .WithMany("Expense")
                        .HasForeignKey("DebtId");

                    b.HasOne("BudgetApp.Models.ExpenseCategory", "ExpenseCategory")
                        .WithMany("Expense")
                        .HasForeignKey("ExpenseCategoryId");

                    b.Navigation("Account");

                    b.Navigation("CreditCard");

                    b.Navigation("Debt");

                    b.Navigation("ExpenseCategory");
                });

            modelBuilder.Entity("BudgetApp.Models.Income", b =>
                {
                    b.HasOne("BudgetApp.Models.Account", "Account")
                        .WithMany("Income")
                        .HasForeignKey("AccountId");

                    b.HasOne("BudgetApp.Models.IncomeCategory", "IncomeCategory")
                        .WithMany("Income")
                        .HasForeignKey("IncomeCategoryId");

                    b.Navigation("Account");

                    b.Navigation("IncomeCategory");
                });

            modelBuilder.Entity("BudgetApp.Models.RecurrentExpense", b =>
                {
                    b.HasOne("BudgetApp.Models.Account", "Account")
                        .WithMany("RecurrentExpense")
                        .HasForeignKey("AccountId");

                    b.HasOne("BudgetApp.Models.CreditCard", "CreditCard")
                        .WithMany("RecurrentExpense")
                        .HasForeignKey("CreditCardId");

                    b.HasOne("BudgetApp.Models.Debt", "Debt")
                        .WithMany("RecurrentExpense")
                        .HasForeignKey("DebtId");

                    b.HasOne("BudgetApp.Models.ExpenseCategory", "ExpenseCategory")
                        .WithMany("RecurrentExpense")
                        .HasForeignKey("ExpenseCategoryId");

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

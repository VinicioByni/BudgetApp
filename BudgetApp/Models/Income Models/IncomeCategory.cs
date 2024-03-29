﻿using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace BudgetApp.Models
{
    public class IncomeCategory
    {
        // User will be able to add his own income categorys
        [Key]
        public int IncomeCategoryId { get; set; }
        [Required]
        [StringLength(25)]
        public string Name { get; set; } = string.Empty;
        [JsonIgnore]
        public virtual List<Income>? Income { get; set; }
        // Add something if needed to be able to assign an icon
    }
}

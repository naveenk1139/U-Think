package com.example.uthink.model

data class JobRole(
    val id: String,
    val title: String,
    val sector: String,
    val averageSalary: String, // e.g. "₹6,00,000 - ₹12,00,000 / year"
    val growthPotential: String, // "Very High", "High", "Steady"
    val entryBarrier: String, // "Low", "Medium", "High"
    val recommendedPathways: List<String>,
    val keySkills: List<String>,
    val description: String
)

package com.example.uthink.model

data class DegreeInfo(
    val id: String,
    val name: String,
    val fullName: String,
    val field: String, // "Engineering", "Medical & Health", "Commerce & Management", "Pure Sciences", "Arts & Humanities", "Vocational"
    val duration: String,
    val eligibility: String,
    val topCareers: List<String>
)

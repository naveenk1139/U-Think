package com.example.uthink.model

data class CollegeInfo(
    val id: String,
    val name: String,
    val location: String,
    val type: String, // "Government", "Private", "Autonomous"
    val stream: String,
    val approxFeesPerYear: String,
    val rating: Double,
    val nirfRank: Int?,
    val featuredCourses: List<String>
)

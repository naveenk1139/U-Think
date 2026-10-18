package com.example.uthink.model

data class CourseCombination(
    val id: String,
    val name: String,
    val code: String,
    val duration: String,
    val eligibility: String,
    val description: String,
    val branches: List<String>,
    val careerProspects: List<String>,
    val category: String // "Science", "Commerce", "Arts", "Engineering", "Medical Support", etc.
)

data class StreamInfo(
    val id: String,
    val title: String,
    val shortDesc: String,
    val fullDesc: String,
    val durationRange: String,
    val pros: List<String>,
    val cons: List<String>,
    val courses: List<CourseCombination>
)

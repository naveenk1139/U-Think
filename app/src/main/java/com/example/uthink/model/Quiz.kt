package com.example.uthink.model

data class QuizOption(
    val text: String,
    val scores: Map<String, Int> // "science", "commerce", "arts", "diploma", "iti", "paramedical"
)

data class AptitudeQuestion(
    val id: Int,
    val question: String,
    val category: String, // "Logical & Analytical", "Creative & Design", "Scientific & Research", "Leadership & Business", "Practical Hands-on"
    val options: List<QuizOption>
)

data class AssessmentResult(
    val dominantTrack: String,
    val trackTitle: String,
    val scorePercentage: Int,
    val analysis: String,
    val topRecommendedStreams: List<String>,
    val topDegrees: List<String>,
    val topCareers: List<String>
)

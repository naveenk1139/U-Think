package com.example.uthink.model

data class EntranceExam(
    val id: String,
    val name: String,
    val conductingBody: String,
    val purpose: String,
    val category: String, // "Engineering", "Medical", "Defence", "Law", "Management", "Civil Services"
    val level: String, // "UG", "PG", "National", "State"
    val eligibility: String,
    val pattern: String,
    val applicationMonth: String,
    val website: String
)

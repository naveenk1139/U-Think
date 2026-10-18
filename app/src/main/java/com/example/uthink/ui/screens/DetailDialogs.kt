package com.example.uthink.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Close
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.uthink.model.*
import com.example.uthink.ui.theme.AccentAmber

@Composable
fun CourseDetailDialog(
    course: CourseCombination,
    onDismiss: () -> Unit
) {
    AlertDialog(
        onDismissRequest = onDismiss,
        title = {
            Column {
                Text(text = course.code, fontSize = 12.sp, color = MaterialTheme.colorScheme.primary, fontWeight = FontWeight.Bold)
                Text(text = course.name, style = MaterialTheme.typography.titleLarge)
            }
        },
        text = {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .verticalScroll(rememberScrollState()),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                Text(text = course.description, fontSize = 13.sp, lineHeight = 18.sp)

                HorizontalDivider()

                Text(text = "Eligibility Requirements", fontWeight = FontWeight.Bold, fontSize = 13.sp)
                Text(text = course.eligibility, fontSize = 12.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)

                Text(text = "Subject Branches Covered", fontWeight = FontWeight.Bold, fontSize = 13.sp)
                course.branches.forEach { branch ->
                    Text(text = "• $branch", fontSize = 12.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
                }

                Text(text = "Future Degree & Career Prospects", fontWeight = FontWeight.Bold, fontSize = 13.sp)
                course.careerProspects.forEach { prospect ->
                    Text(text = "✓ $prospect", fontSize = 12.sp, color = MaterialTheme.colorScheme.primary)
                }
            }
        },
        confirmButton = {
            Button(onClick = onDismiss, modifier = Modifier.testTag("close_course_dialog")) {
                Text("Close")
            }
        },
        shape = RoundedCornerShape(20.dp)
    )
}

@Composable
fun ExamDetailDialog(
    exam: EntranceExam,
    onDismiss: () -> Unit
) {
    AlertDialog(
        onDismissRequest = onDismiss,
        title = {
            Column {
                Text(text = "${exam.category} • ${exam.level} Level", fontSize = 12.sp, color = AccentAmber, fontWeight = FontWeight.Bold)
                Text(text = exam.name, style = MaterialTheme.typography.titleLarge)
            }
        },
        text = {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .verticalScroll(rememberScrollState()),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                Text(text = "Conducted by: ${exam.conductingBody}", fontWeight = FontWeight.SemiBold, fontSize = 13.sp)
                Text(text = exam.purpose, fontSize = 13.sp, lineHeight = 18.sp)

                HorizontalDivider()

                Text(text = "Eligibility Criteria", fontWeight = FontWeight.Bold, fontSize = 13.sp)
                Text(text = exam.eligibility, fontSize = 12.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)

                Text(text = "Examination Pattern & Format", fontWeight = FontWeight.Bold, fontSize = 13.sp)
                Text(text = exam.pattern, fontSize = 12.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)

                Text(text = "Typical Application Window", fontWeight = FontWeight.Bold, fontSize = 13.sp)
                Text(text = exam.applicationMonth, fontSize = 12.sp, color = MaterialTheme.colorScheme.primary, fontWeight = FontWeight.Bold)

                Text(text = "Official Portal", fontWeight = FontWeight.Bold, fontSize = 13.sp)
                Text(text = exam.website, fontSize = 12.sp, color = MaterialTheme.colorScheme.primary)
            }
        },
        confirmButton = {
            Button(onClick = onDismiss, modifier = Modifier.testTag("close_exam_dialog")) {
                Text("Close")
            }
        },
        shape = RoundedCornerShape(20.dp)
    )
}

@Composable
fun DegreeDetailDialog(
    degree: DegreeInfo,
    onDismiss: () -> Unit
) {
    AlertDialog(
        onDismissRequest = onDismiss,
        title = {
            Column {
                Text(text = degree.field, fontSize = 12.sp, color = MaterialTheme.colorScheme.primary, fontWeight = FontWeight.Bold)
                Text(text = degree.name, style = MaterialTheme.typography.titleLarge)
                Text(text = degree.fullName, fontSize = 13.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
            }
        },
        text = {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .verticalScroll(rememberScrollState()),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                Text(text = "Duration: ${degree.duration}", fontWeight = FontWeight.Bold, fontSize = 13.sp)
                Text(text = "Entry Requirements: ${degree.eligibility}", fontSize = 12.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)

                HorizontalDivider()

                Text(text = "Leading Career Outcomes", fontWeight = FontWeight.Bold, fontSize = 13.sp)
                degree.topCareers.forEach { career ->
                    Text(text = "💼 $career", fontSize = 12.sp, color = MaterialTheme.colorScheme.primary)
                }
            }
        },
        confirmButton = {
            Button(onClick = onDismiss, modifier = Modifier.testTag("close_degree_dialog")) {
                Text("Close")
            }
        },
        shape = RoundedCornerShape(20.dp)
    )
}

@Composable
fun JobDetailDialog(
    job: JobRole,
    onDismiss: () -> Unit
) {
    AlertDialog(
        onDismissRequest = onDismiss,
        title = {
            Column {
                Text(text = job.sector, fontSize = 12.sp, color = MaterialTheme.colorScheme.primary, fontWeight = FontWeight.Bold)
                Text(text = job.title, style = MaterialTheme.typography.titleLarge)
            }
        },
        text = {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .verticalScroll(rememberScrollState()),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                Text(text = job.description, fontSize = 13.sp, lineHeight = 18.sp)

                HorizontalDivider()

                Text(text = "Market Compensation", fontWeight = FontWeight.Bold, fontSize = 13.sp)
                Text(text = job.averageSalary, fontSize = 14.sp, color = AccentAmber, fontWeight = FontWeight.Bold)

                Text(text = "Growth Outlook: ${job.growthPotential}", fontWeight = FontWeight.Bold, fontSize = 13.sp)

                Text(text = "Required Core Skills", fontWeight = FontWeight.Bold, fontSize = 13.sp)
                job.keySkills.forEach { skill ->
                    Text(text = "• $skill", fontSize = 12.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
                }

                Text(text = "Suggested Educational Path", fontWeight = FontWeight.Bold, fontSize = 13.sp)
                job.recommendedPathways.forEach { step ->
                    Text(text = "→ $step", fontSize = 12.sp, color = MaterialTheme.colorScheme.primary)
                }
            }
        },
        confirmButton = {
            Button(onClick = onDismiss, modifier = Modifier.testTag("close_job_dialog")) {
                Text("Close")
            }
        },
        shape = RoundedCornerShape(20.dp)
    )
}

@Composable
fun CollegeDetailDialog(
    college: CollegeInfo,
    onDismiss: () -> Unit
) {
    AlertDialog(
        onDismissRequest = onDismiss,
        title = {
            Column {
                Text(text = college.type, fontSize = 12.sp, color = MaterialTheme.colorScheme.primary, fontWeight = FontWeight.Bold)
                Text(text = college.name, style = MaterialTheme.typography.titleLarge)
                Text(text = "📍 ${college.location}", fontSize = 12.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
            }
        },
        text = {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .verticalScroll(rememberScrollState()),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                college.nirfRank?.let {
                    Text(text = "National NIRF Rank: #$it", fontWeight = FontWeight.Bold, fontSize = 13.sp, color = AccentAmber)
                }
                Text(text = "Rating: ⭐ ${college.rating} / 5.0", fontSize = 13.sp)
                Text(text = "Stream Focus: ${college.stream}", fontSize = 13.sp)
                Text(text = "Approx Annual Tuition: ${college.approxFeesPerYear}", fontSize = 13.sp, fontWeight = FontWeight.SemiBold)

                HorizontalDivider()

                Text(text = "Prominent Programs Offered", fontWeight = FontWeight.Bold, fontSize = 13.sp)
                college.featuredCourses.forEach { course ->
                    Text(text = "🎓 $course", fontSize = 12.sp, color = MaterialTheme.colorScheme.primary)
                }
            }
        },
        confirmButton = {
            Button(onClick = onDismiss, modifier = Modifier.testTag("close_college_dialog")) {
                Text("Close")
            }
        },
        shape = RoundedCornerShape(20.dp)
    )
}

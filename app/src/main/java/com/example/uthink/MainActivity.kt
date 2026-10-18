package com.example.uthink

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.BackHandler
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.activity.viewModels
import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.uthink.data.DataRepository
import com.example.uthink.ui.screens.*
import com.example.uthink.ui.theme.UThinkTheme
import com.example.uthink.ui.viewmodel.AppTab
import com.example.uthink.ui.viewmodel.UThinkViewModel

class MainActivity : ComponentActivity() {

    private val viewModel: UThinkViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        setContent {
            UThinkTheme {
                MainAppContent(viewModel = viewModel)
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MainAppContent(viewModel: UThinkViewModel) {
    val uiState by viewModel.uiState.collectAsState()

    // Handle Android system back gesture cleanly
    BackHandler(enabled = uiState.currentTab != AppTab.HOME) {
        if (uiState.currentTab == AppTab.QUIZ && uiState.isQuizActive) {
            viewModel.resetQuiz()
        } else {
            viewModel.selectTab(AppTab.HOME)
        }
    }

    Scaffold(
        modifier = Modifier.fillMaxSize(),
        topBar = {
            TopAppBar(
                title = {
                    Column {
                        Text(
                            text = "U-Think",
                            style = MaterialTheme.typography.titleLarge,
                            fontWeight = FontWeight.Bold,
                            color = MaterialTheme.colorScheme.onSurface
                        )
                        Text(
                            text = "Career & Pathway Guidance",
                            fontSize = 11.sp,
                            color = MaterialTheme.colorScheme.primary,
                            fontWeight = FontWeight.Medium
                        )
                    }
                },
                actions = {
                    if (uiState.currentTab != AppTab.QUIZ) {
                        IconButton(
                            onClick = { viewModel.selectTab(AppTab.QUIZ) },
                            modifier = Modifier.testTag("top_bar_quiz_icon")
                        ) {
                            Icon(
                                Icons.Default.Psychology,
                                contentDescription = "Aptitude Quiz",
                                tint = MaterialTheme.colorScheme.primary
                            )
                        }
                    }
                    IconButton(
                        onClick = { viewModel.selectTab(AppTab.DASHBOARD) },
                        modifier = Modifier.testTag("top_bar_dashboard_icon")
                    ) {
                        Icon(
                            Icons.Default.Dashboard,
                            contentDescription = "Student Hub",
                            tint = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = MaterialTheme.colorScheme.surface
                )
            )
        },
        bottomBar = {
            NavigationBar(
                modifier = Modifier.testTag("bottom_nav_bar"),
                containerColor = MaterialTheme.colorScheme.surface,
                tonalElevation = 8.dp
            ) {
                val navItems = listOf(
                    Triple(AppTab.HOME, Icons.Default.Home, "Home"),
                    Triple(AppTab.PATHWAYS, Icons.Default.CompassCalibration, "Pathways"),
                    Triple(AppTab.EXAMS, Icons.Default.MenuBook, "Exams"),
                    Triple(AppTab.DEGREES, Icons.Default.School, "Degrees"),
                    Triple(AppTab.JOBS, Icons.Default.Work, "Careers"),
                    Triple(AppTab.DASHBOARD, Icons.Default.AccountCircle, "Hub")
                )

                navItems.forEach { (tab, icon, label) ->
                    val isSelected = uiState.currentTab == tab
                    NavigationBarItem(
                        selected = isSelected,
                        onClick = { viewModel.selectTab(tab) },
                        icon = {
                            Icon(
                                icon,
                                contentDescription = label,
                                modifier = Modifier.size(24.dp)
                            )
                        },
                        label = {
                            Text(
                                text = label,
                                fontSize = 11.sp,
                                fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Normal
                            )
                        },
                        colors = NavigationBarItemDefaults.colors(
                            selectedIconColor = MaterialTheme.colorScheme.primary,
                            selectedTextColor = MaterialTheme.colorScheme.primary,
                            unselectedIconColor = MaterialTheme.colorScheme.onSurfaceVariant,
                            unselectedTextColor = MaterialTheme.colorScheme.onSurfaceVariant,
                            indicatorColor = MaterialTheme.colorScheme.primaryContainer
                        ),
                        modifier = Modifier.testTag("nav_item_${tab.name.lowercase()}")
                    )
                }
            }
        }
    ) { innerPadding ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
        ) {
            when (uiState.currentTab) {
                AppTab.HOME -> HomeScreen(
                    uiState = uiState,
                    onNavigate = { tab -> viewModel.selectTab(tab) },
                    onStartQuiz = { viewModel.selectTab(AppTab.QUIZ) },
                    onInspectCourse = { courseId ->
                        val course = DataRepository.streams.flatMap { it.courses }.find { it.id == courseId }
                        viewModel.inspectCourse(course)
                    },
                    onInspectExam = { examId ->
                        val exam = DataRepository.entranceExams.find { it.id == examId }
                        viewModel.inspectExam(exam)
                    }
                )
                AppTab.PATHWAYS -> PathwaysScreen(
                    selectedStreamId = uiState.selectedStreamFilter,
                    onSelectStream = { viewModel.setStreamFilter(it) },
                    searchQuery = uiState.searchQuery,
                    onSearchChange = { viewModel.updateSearchQuery(it) },
                    savedCourseIds = uiState.savedCourseIds,
                    onToggleSaveCourse = { viewModel.toggleSaveCourse(it) },
                    onInspectCourse = { viewModel.inspectCourse(it) }
                )
                AppTab.EXAMS -> ExamsScreen(
                    selectedCategory = uiState.selectedExamCategory,
                    onSelectCategory = { viewModel.setExamCategory(it) },
                    searchQuery = uiState.searchQuery,
                    onSearchChange = { viewModel.updateSearchQuery(it) },
                    trackedExamIds = uiState.trackedExamIds,
                    onToggleTrackExam = { viewModel.toggleTrackExam(it) },
                    onInspectExam = { viewModel.inspectExam(it) }
                )
                AppTab.DEGREES -> DegreesScreen(
                    selectedField = uiState.selectedDegreeField,
                    onSelectField = { viewModel.setDegreeField(it) },
                    searchQuery = uiState.searchQuery,
                    onSearchChange = { viewModel.updateSearchQuery(it) },
                    savedDegreeIds = uiState.savedDegreeIds,
                    onToggleSaveDegree = { viewModel.toggleSaveDegree(it) },
                    onInspectDegree = { viewModel.inspectDegree(it) }
                )
                AppTab.COLLEGES -> CollegesScreen(
                    searchQuery = uiState.searchQuery,
                    onSearchChange = { viewModel.updateSearchQuery(it) },
                    onInspectCollege = { viewModel.inspectCollege(it) }
                )
                AppTab.JOBS -> JobsScreen(
                    searchQuery = uiState.searchQuery,
                    onSearchChange = { viewModel.updateSearchQuery(it) },
                    savedJobIds = uiState.savedJobIds,
                    onToggleSaveJob = { viewModel.toggleSaveJob(it) },
                    onInspectJob = { viewModel.inspectJob(it) }
                )
                AppTab.QUIZ -> QuizScreen(
                    isQuizActive = uiState.isQuizActive,
                    currentQuestionIndex = uiState.quizCurrentQuestionIndex,
                    educationLevel = uiState.quizEducationLevel,
                    quizResult = uiState.quizResult,
                    onStartQuiz = { level -> viewModel.startQuiz(level) },
                    onAnswerOption = { scores -> viewModel.answerQuizQuestion(scores) },
                    onResetQuiz = { viewModel.resetQuiz() },
                    onNavigateToPathways = { viewModel.selectTab(AppTab.PATHWAYS) }
                )
                AppTab.DASHBOARD -> DashboardScreen(
                    uiState = uiState,
                    onNavigate = { tab -> viewModel.selectTab(tab) },
                    onToggleSaveCourse = { viewModel.toggleSaveCourse(it) },
                    onToggleTrackExam = { viewModel.toggleTrackExam(it) },
                    onToggleSaveDegree = { viewModel.toggleSaveDegree(it) },
                    onToggleSaveJob = { viewModel.toggleSaveJob(it) },
                    onInspectCourse = { courseId ->
                        val course = DataRepository.streams.flatMap { it.courses }.find { it.id == courseId }
                        viewModel.inspectCourse(course)
                    },
                    onInspectExam = { examId ->
                        val exam = DataRepository.entranceExams.find { it.id == examId }
                        viewModel.inspectExam(exam)
                    }
                )
            }

            // Detail Dialogs
            uiState.inspectedCourse?.let { course ->
                CourseDetailDialog(course = course, onDismiss = { viewModel.inspectCourse(null) })
            }
            uiState.inspectedExam?.let { exam ->
                ExamDetailDialog(exam = exam, onDismiss = { viewModel.inspectExam(null) })
            }
            uiState.inspectedDegree?.let { degree ->
                DegreeDetailDialog(degree = degree, onDismiss = { viewModel.inspectDegree(null) })
            }
            uiState.inspectedJob?.let { job ->
                JobDetailDialog(job = job, onDismiss = { viewModel.inspectJob(null) })
            }
            uiState.inspectedCollege?.let { college ->
                CollegeDetailDialog(college = college, onDismiss = { viewModel.inspectCollege(null) })
            }
        }
    }
}

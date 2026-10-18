package com.example.uthink.ui.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.uthink.data.DataRepository
import com.example.uthink.model.*
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch

enum class AppTab(val title: String, val iconName: String) {
    HOME("Home", "home"),
    PATHWAYS("Pathways", "compass"),
    EXAMS("Exams", "book_open"),
    DEGREES("Degrees", "school"),
    COLLEGES("Colleges", "business"),
    JOBS("Careers", "work"),
    QUIZ("Assessment", "psychology"),
    DASHBOARD("Dashboard", "dashboard")
}

data class AppUiState(
    val currentTab: AppTab = AppTab.HOME,
    val searchQuery: String = "",
    val selectedStreamFilter: String = "12th_intermediate",
    val selectedExamCategory: String = "All",
    val selectedDegreeField: String = "All",
    val selectedCollegeStream: String = "All",
    val savedCourseIds: Set<String> = setOf("pcmc", "dip_cse"),
    val trackedExamIds: Set<String> = setOf("jee-main", "neet-ug"),
    val savedDegreeIds: Set<String> = setOf("btech-cse"),
    val savedJobIds: Set<String> = setOf("job-ai-engineer"),
    
    // Quiz State
    val quizEducationLevel: String = "Completed 10th",
    val quizCurrentQuestionIndex: Int = 0,
    val quizScores: Map<String, Int> = emptyMap(),
    val quizResult: AssessmentResult? = null,
    val isQuizActive: Boolean = false,
    
    // Modal Inspection
    val inspectedCourse: CourseCombination? = null,
    val inspectedExam: EntranceExam? = null,
    val inspectedDegree: DegreeInfo? = null,
    val inspectedJob: JobRole? = null,
    val inspectedCollege: CollegeInfo? = null
)

class UThinkViewModel : ViewModel() {

    private val _uiState = MutableStateFlow(AppUiState())
    val uiState: StateFlow<AppUiState> = _uiState.asStateFlow()

    fun selectTab(tab: AppTab) {
        _uiState.update { it.copy(currentTab = tab, searchQuery = "") }
    }

    fun updateSearchQuery(query: String) {
        _uiState.update { it.copy(searchQuery = query) }
    }

    fun setStreamFilter(filterId: String) {
        _uiState.update { it.copy(selectedStreamFilter = filterId) }
    }

    fun setExamCategory(category: String) {
        _uiState.update { it.copy(selectedExamCategory = category) }
    }

    fun setDegreeField(field: String) {
        _uiState.update { it.copy(selectedDegreeField = field) }
    }

    fun setCollegeStream(stream: String) {
        _uiState.update { it.copy(selectedCollegeStream = stream) }
    }

    fun toggleSaveCourse(courseId: String) {
        _uiState.update { state ->
            val updated = if (state.savedCourseIds.contains(courseId)) {
                state.savedCourseIds - courseId
            } else {
                state.savedCourseIds + courseId
            }
            state.copy(savedCourseIds = updated)
        }
    }

    fun toggleTrackExam(examId: String) {
        _uiState.update { state ->
            val updated = if (state.trackedExamIds.contains(examId)) {
                state.trackedExamIds - examId
            } else {
                state.trackedExamIds + examId
            }
            state.copy(trackedExamIds = updated)
        }
    }

    fun toggleSaveDegree(degreeId: String) {
        _uiState.update { state ->
            val updated = if (state.savedDegreeIds.contains(degreeId)) {
                state.savedDegreeIds - degreeId
            } else {
                state.savedDegreeIds + degreeId
            }
            state.copy(savedDegreeIds = updated)
        }
    }

    fun toggleSaveJob(jobId: String) {
        _uiState.update { state ->
            val updated = if (state.savedJobIds.contains(jobId)) {
                state.savedJobIds - jobId
            } else {
                state.savedJobIds + jobId
            }
            state.copy(savedJobIds = updated)
        }
    }

    // Detail inspections
    fun inspectCourse(course: CourseCombination?) {
        _uiState.update { it.copy(inspectedCourse = course) }
    }

    fun inspectExam(exam: EntranceExam?) {
        _uiState.update { it.copy(inspectedExam = exam) }
    }

    fun inspectDegree(degree: DegreeInfo?) {
        _uiState.update { it.copy(inspectedDegree = degree) }
    }

    fun inspectJob(job: JobRole?) {
        _uiState.update { it.copy(inspectedJob = job) }
    }

    fun inspectCollege(college: CollegeInfo?) {
        _uiState.update { it.copy(inspectedCollege = college) }
    }

    // Quiz Functions
    fun startQuiz(educationLevel: String) {
        _uiState.update {
            it.copy(
                isQuizActive = true,
                quizEducationLevel = educationLevel,
                quizCurrentQuestionIndex = 0,
                quizScores = emptyMap(),
                quizResult = null,
                currentTab = AppTab.QUIZ
            )
        }
    }

    fun answerQuizQuestion(selectedOptionScores: Map<String, Int>) {
        val currentScores = _uiState.value.quizScores.toMutableMap()
        selectedOptionScores.forEach { (track, points) ->
            currentScores[track] = (currentScores[track] ?: 0) + points
        }

        val nextIndex = _uiState.value.quizCurrentQuestionIndex + 1
        val questions = DataRepository.aptitudeQuestions

        if (nextIndex < questions.size) {
            _uiState.update {
                it.copy(
                    quizCurrentQuestionIndex = nextIndex,
                    quizScores = currentScores
                )
            }
        } else {
            val result = DataRepository.calculateResult(currentScores)
            _uiState.update {
                it.copy(
                    quizScores = currentScores,
                    quizResult = result
                )
            }
        }
    }

    fun resetQuiz() {
        _uiState.update {
            it.copy(
                quizCurrentQuestionIndex = 0,
                quizScores = emptyMap(),
                quizResult = null,
                isQuizActive = false
            )
        }
    }
}

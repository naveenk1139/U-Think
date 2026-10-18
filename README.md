# U-Think: Career & Education Pathway Guidance (Android) 🚀

U-Think is an Android career and education pathway guidance application built with modern Kotlin and Jetpack Compose. It empowers students post-10th grade to explore educational streams, competitive entrance examinations, undergraduate degrees, top universities, career market roles, and personalized aptitude assessment.

## 🌟 Key Features

*   **Comprehensive Pathways Explorer**: Complete catalog of 5 major educational tracks after Class 10:
    *   **12th / Intermediate**: Science (PCMC, PCMB, PCME, PCB), Commerce (CEBA, SEBA), and Arts/Humanities (HEPS, JPE)
    *   **Polytechnic Diploma**: 3-year applied engineering & technical programs with lateral B.Tech entry
    *   **ITI Vocational Trades**: 1-2 year technical craftsman programs (Electrician, Fitter, Solar Tech, COPA)
    *   **Paramedical Healthcare**: Hospital diagnostics and clinical technology (DMLT, Radiology, Dialysis)
    *   **Vocational & Design**: UI/UX, Culinary, and digital commerce tracks
*   **Entrance Examinations Directory**: Comprehensive tracker for national and state entrance exams (JEE Main, JEE Advanced, NEET-UG, KCET, BITSAT, NDA, CLAT, CUET-UG) with eligibility criteria, patterns, and application schedules.
*   **Degrees & Programs Directory**: Detailed profiles of undergraduate degrees across Engineering, Medicine, Commerce, Pure Sciences, Law, and Design.
*   **Premier Colleges Directory**: Top institutes (IITs, AIIMS, BITS, RVCE, NLSIU) with NIRF rankings, ratings, and course offerings.
*   **Career & Salary Insights**: In-demand career profiles mapped to education roadmaps, average market compensations, growth metrics, and required technical skills.
*   **Interactive Aptitude Assessment**: 5-minute scenario-based aptitude quiz that calculates personality-aligned streams, recommended degree programs, and career roadmaps.
*   **Student Dashboard**: Personal tracking hub to save subject combinations, monitor upcoming entrance exams, and review assessment outcomes.

## 🛠️ Architecture & Tech Stack

*   **Language**: Kotlin
*   **UI Toolkit**: Jetpack Compose with Material 3 (M3) Design System
*   **Architecture**: MVVM (Model-View-ViewModel) with StateFlow
*   **Launcher**: Custom Adaptive Vector & Mipmap Launcher Icon
*   **Navigation**: Edge-to-Edge `enableEdgeToEdge()` with Android `BackHandler`
*   **Build System**: Gradle Kotlin DSL (`build.gradle.kts`, `settings.gradle.kts`, `libs.versions.toml`)

## 📱 Project Structure

```text
app/
├── src/main/
│   ├── AndroidManifest.xml
│   ├── java/com/example/uthink/
│   │   ├── MainActivity.kt
│   │   ├── model/
│   │   │   ├── Pathway.kt
│   │   │   ├── Exam.kt
│   │   │   ├── Degree.kt
│   │   │   ├── College.kt
│   │   │   ├── Job.kt
│   │   │   └── Quiz.kt
│   │   ├── data/
│   │   │   └── DataRepository.kt
│   │   └── ui/
│   │       ├── theme/
│   │       │   ├── Color.kt
│   │       │   ├── Type.kt
│   │       │   └── Theme.kt
│   │       ├── viewmodel/
│   │       │   └── UThinkViewModel.kt
│   │       └── screens/
│   │           ├── HomeScreen.kt
│   │           ├── PathwaysScreen.kt
│   │           ├── ExamsScreen.kt
│   │           ├── DegreesScreen.kt
│   │           ├── CollegesScreen.kt
│   │           ├── JobsScreen.kt
│   │           ├── QuizScreen.kt
│   │           ├── DashboardScreen.kt
│   │           └── DetailDialogs.kt
│   └── res/
│       ├── drawable/
│       ├── mipmap-*/
│       └── values/
```

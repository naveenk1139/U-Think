# U-THINK Database Architecture (MongoDB + Mongoose)

This directory contains database connection logic, Mongoose schemas, seed scripts, data generator utilities, and output text datasets for U-THINK.

## Directory Layout

- **`models/`**:
  - `User.js`: User profile schema.
  - `QuizResult.js`: Aptitude test evaluation schema.
  - `SavedPathway.js`: Saved career specializations schema.
  - `TrackedExam.js`: Entrance exams tracked by user schema.
  - `Reminder.js`: Personalized exam deadline reminders schema.
- **`seeds/`**:
  - `seedExams.js`: Populates sample entrance exam records into MongoDB.
- **`scripts/`**: Contains 40+ utility, generator, and patch scripts (`.js`, `.cjs`, `.py`) for exam data processing.
- **`data/`**: Output data text files (`.txt`).
- **`connection.js`**: Shared Mongoose connection helper.

## Running Database Seeds

To populate sample entrance exams:
```bash
node database/seeds/seedExams.js
```

- **`models/`**:
  - `User.js`: User profile schema.
  - `QuizResult.js`: Aptitude test evaluation schema.
  - `SavedPathway.js`: Saved career specializations schema.
  - `TrackedExam.js`: Entrance exams tracked by user schema.
  - `Reminder.js`: Personalized exam deadline reminders schema.
- **`seeds/`**:
  - `seedExams.js`: Populates sample entrance exam records into MongoDB.
- **`scripts/`**: Contains 40+ utility, generator, and patch scripts (`.js`, `.cjs`, `.py`) for exam data processing.
- **`data/`**: Output data text files (`.txt`).
- **`connection.js`**: Shared Mongoose connection helper.

## Running Database Seeds

To populate sample entrance exams:
```bash
node database/seeds/seedExams.js
```

# Candidate Matcher & Resume Analyzer - Technical Documentation

## Description
The **Candidate Matcher & Resume Analyzer** is a client-side Single Page Application (SPA) designed to assist recruiters and hiring managers in screening candidates. It analyzes the overlap between a job description and candidate resumes/skills to calculate a match percentage. Data is persisted locally using the browser's `localStorage` for privacy and convenience.

## Technology Stack
-   **Core**: HTML5, Vanilla JavaScript (ES6+)
-   **Styling**: Vanilla CSS3 (Embedded)
-   **Storage**: `localStorage` API
-   **External Assets**:
    -   **Fonts**: Google Fonts (Outfit)
    -   **Icons**: Font Awesome 6.5.0 (CDN)

## UI/UX Design
The application features a **Premium Dark Mode** aesthetic designed to feel modern, professional, and immersive.

### Design Philosophy
-   **Glassmorphism**: Utilizes semi-transparent backgrounds with `backdrop-filter: blur(20px)` to create depth and hierarchy.
-   **Vibrant Accents**: Uses high-contrast gradients against a deep dark background to guide user attention to interactive elements.
-   **Micro-interactions**: Subtle hover effects, smooth transitions, and focus states enhance the tactile feel of the interface.
-   **Responsiveness**: Fully responsive layout that adapts gracefully from mobile to desktop viewports.

### Color Theme
-   **Background**: Deep Slate (`#0f172a`) with animated radial gradient blobs.
-   **Primary Gradient**: Indigo (`#6366f1`) to Pink (`#ec4899`).
-   **Card Background**: Translucent Slate (`rgba(30, 41, 59, 0.6)`).
-   **Text**:
    -   Main: Off-white (`#f1f5f9`)
    -   Muted: Slate Grey (`#94a3b8`)
-   **Match Score Colors**:
    -   **High (>60%)**: Emerald Green (`#34d399`)
    -   **Medium (>30%)**: Amber (`#fbbf24`)
    -   **Low (<30%)**: Red (`#f87171`)

## Key Features
1.  **Job Description Input**: Text area to input the target job requirements.
2.  **Candidate Entry**: Form to add candidate name and resume text.
3.  **Keyword Matching**: Algorithm to tokenize text and compute similarity scores based on keyword overlap (excluding stop words).
4.  **Visual Match Score**: Progress bar indicating the relevance of each candidate.
5.  **Persistence**: Automatic saving of job description and candidates to local storage.

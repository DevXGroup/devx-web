# Document Summarizer & Sentiment Analyzer - Technical Documentation

## Description
The **Document Summarizer & Sentiment Analyzer** is a client-side Single Page Application (SPA) that processes text input to generate a concise summary and analyze the overall sentiment. It uses frequency-based summarization and keyword-based sentiment scoring algorithms directly in the browser.

## Technology Stack
-   **Core**: HTML5, Vanilla JavaScript (ES6+)
-   **Styling**: Vanilla CSS3 (Embedded)
-   **External Assets**:
    -   **Fonts**: Google Fonts (Outfit)
    -   **Icons**: Font Awesome 6.5.0 (CDN)

## UI/UX Design
The application features a **Premium Dark Mode** aesthetic, consistent with the suite's design language.

### Design Philosophy
-   **Glassmorphism**: Utilizes semi-transparent backgrounds with `backdrop-filter: blur(20px)` to create depth.
-   **Data Visualization**: Uses a dynamic progress bar to visualize sentiment score (Positive/Neutral/Negative).
-   **Focus on Content**: Large, clean text areas and card-based results display to prioritize readability.
-   **Responsiveness**: Optimized for various screen sizes.

### Color Theme
-   **Background**: Deep Slate (`#0f172a`) with animated radial gradient blobs.
-   **Primary Gradient**: Indigo (`#6366f1`) to Pink (`#ec4899`).
-   **Card Background**: Translucent Slate (`rgba(30, 41, 59, 0.6)`).
-   **Text**:
    -   Main: Off-white (`#f1f5f9`)
    -   Muted: Slate Grey (`#94a3b8`)
-   **Sentiment Colors**:
    -   **Positive**: Emerald (`#10b981`)
    -   **Neutral**: Amber (`#f59e0b`)
    -   **Negative**: Rose (`#f43f5e`)

## Key Features
1.  **Text Summarization**: Extracts key sentences based on word frequency scoring.
2.  **Sentiment Analysis**: Calculates a sentiment score (-1 to 1) based on positive/negative keyword density.
3.  **Visual Feedback**: Color-coded bars and labels to indicate sentiment polarity.
4.  **Privacy**: All processing happens client-side; no data is sent to external servers.

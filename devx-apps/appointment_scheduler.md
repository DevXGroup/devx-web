# Appointment Scheduler - Technical Documentation

## Description
The **Appointment Scheduler** is a client-side Single Page Application (SPA) designed to help users manage their daily appointments. It allows users to create, view, complete, and delete appointments. Data is persisted locally using the browser's `localStorage`, ensuring data privacy and offline availability.

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
-   **Status Colors**:
    -   **Completed**: Emerald Green (`#34d399`)
    -   **Pending**: Amber (`#fbbf24`)

## Key Features
1.  **Event Creation**: Form to input title, date, time, and description.
2.  **Dashboard View**: List of upcoming and past appointments.
3.  **Status Toggling**: Mark appointments as completed or pending.
4.  **Persistence**: Automatic saving and loading from local storage.

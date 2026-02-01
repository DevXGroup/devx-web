# Project Kanban Board - Technical Documentation

## Description
The **Project Kanban Board** is a client-side Single Page Application (SPA) for task management. It utilizes a drag-and-drop interface to organize tasks across different stages of a workflow (Backlog, To Do, In Progress, Done).

## Technology Stack
-   **Core**: HTML5, Vanilla JavaScript (ES6+)
-   **Styling**: Vanilla CSS3 (Embedded)
-   **Storage**: `localStorage` API
-   **External Assets**:
    -   **Fonts**: Google Fonts (Outfit)
    -   **Icons**: Font Awesome 6.5.0 (CDN)

## UI/UX Design
The application features a **Premium Dark Mode** aesthetic, consistent with the suite's design language.

### Design Philosophy
-   **Glassmorphism**: Utilizes semi-transparent backgrounds with `backdrop-filter: blur(10px)` for columns and modals.
-   **Drag & Drop**: Native HTML5 Drag and Drop API for intuitive task management.
-   **Visual Hierarchy**: Distinct column styles and task card accents to differentiate statuses.
-   **Modal Interaction**: Clean, overlay-based modal for adding new tasks.

### Color Theme
-   **Background**: Deep Slate (`#0f172a`) with animated radial gradient blobs.
-   **Primary Gradient**: Indigo (`#6366f1`) to Pink (`#ec4899`).
-   **Column Background**: Translucent Slate (`rgba(15, 23, 42, 0.4)`).
-   **Text**:
    -   Main: Off-white (`#f1f5f9`)
    -   Muted: Slate Grey (`#94a3b8`)
-   **Status Accents**:
    -   **Backlog**: Grey (`#6c757d`)
    -   **To Do**: Amber (`#ffba08`)
    -   **In Progress**: Cyan (`#17a2b8`)
    -   **Done**: Green (`#28a745`)

## Key Features
1.  **Task Management**: Create tasks with title, description, and due date.
2.  **Workflow Organization**: Move tasks between four default columns: Backlog, To Do, In Progress, Done.
3.  **Drag and Drop**: Smooth drag-and-drop functionality for updating task status.
4.  **Persistence**: Automatically saves board state to `localStorage`.
5.  **Responsive Design**: Horizontally scrollable board for handling multiple columns on smaller screens.

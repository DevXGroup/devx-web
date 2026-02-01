# AI Customer Support Chat - Technical Documentation

## Description
The **AI Customer Support Chat** is a client-side Single Page Application (SPA) that simulates an automated customer service assistant. It allows users to interact with a virtual bot that provides instant responses based on keyword matching. The chat history is persisted locally using `localStorage`, allowing users to pick up conversations where they left off.

## Technology Stack
-   **Core**: HTML5, Vanilla JavaScript (ES6+)
-   **Styling**: Vanilla CSS3 (Embedded)
-   **Storage**: `localStorage` API
-   **External Assets**:
    -   **Fonts**: Google Fonts (Outfit)
    -   **Icons**: Font Awesome 6.5.0 (CDN)

## UI/UX Design
The application features a **Premium Dark Mode** aesthetic designed to provide a sleek and modern conversational experience.

### Design Philosophy
-   **Glassmorphism**: The chat container uses a semi-transparent background with `backdrop-filter: blur(20px)` to blend seamlessly with the animated background.
-   **Visual Hierarchy**: Distinct styles for user (gradient) and bot (translucent) messages ensure clear readability.
-   **Animations**: Smooth entry animations for messages (`fadeIn`) and hover effects on interactive elements create a dynamic feel.
-   **Immersive Background**: Deep slate background with floating, glowing orbs adds depth without distracting from the content.

### Color Theme
-   **Background**: Deep Slate (`#0f172a`) with animated radial gradient blobs.
-   **Primary Gradient**: Indigo (`#6366f1`) to Pink (`#ec4899`) for user messages and primary actions.
-   **Chat Bubble (Bot)**: Translucent White (`rgba(255, 255, 255, 0.05)`).
-   **Text**:
    -   Main: Off-white (`#f1f5f9`)
    -   Muted: Slate Grey (`#94a3b8`)

## Key Features
1.  **Real-time Interaction**: Users can type and send messages, receiving simulated "typing" delays and instant responses.
2.  **Keyword Recognition**: The bot analyzes user input for keywords (e.g., "price", "services", "contact") to provide relevant answers.
3.  **Message Persistence**: All chat history is saved to `localStorage` and restored upon page reload.
4.  **Auto-Scroll**: The chat window automatically scrolls to the latest message to keep the conversation in view.

# Invoice & Expense Tracker - Technical Documentation

## Description
The **Invoice & Expense Tracker** is a client-side Single Page Application (SPA) designed to create, manage, and print invoices. It allows users to add line items, calculate totals with tax, and persist invoice history locally.

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
-   **Glassmorphism**: Utilizes semi-transparent backgrounds with `backdrop-filter: blur(20px)` to create depth.
-   **Form Layout**: Clean, organized input fields for invoice details and line items.
-   **Real-time Calculations**: Instant updates to subtotals, tax, and grand totals as items are added or removed.
-   **Print-Friendly**: Includes specific CSS media queries (`@media print`) to ensure invoices look professional when printed.

### Color Theme
-   **Background**: Deep Slate (`#0f172a`) with animated radial gradient blobs.
-   **Primary Gradient**: Indigo (`#6366f1`) to Pink (`#ec4899`).
-   **Card Background**: Translucent Slate (`rgba(30, 41, 59, 0.6)`).
-   **Text**:
    -   Main: Off-white (`#f1f5f9`)
    -   Muted: Slate Grey (`#94a3b8`)

## Key Features
1.  **Invoice Creation**: Add customer details, invoice number, and date.
2.  **Line Item Management**: Add multiple items with description, quantity, and unit price.
3.  **Automatic Calculations**: Automatically computes line totals, subtotal, tax (fixed at 8%), and grand total.
4.  **Persistence**: Saves invoices to `localStorage` for future retrieval.
5.  **Print Functionality**: Generates a clean, printable version of the invoice.
6.  **History View**: View and reload previously saved invoices.

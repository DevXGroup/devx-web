# Inventory & Sales Dashboard - Technical Documentation

## Description
The **Inventory & Sales Dashboard** is a client-side Single Page Application (SPA) for managing product inventory and tracking sales. It provides a comprehensive view of stock levels, revenue, and transaction history, with data persisted locally.

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
-   **Dashboard Layout**: Card-based layout for key metrics and data tables.
-   **Data Visualization**: Custom CSS-based bar charts to visualize inventory levels without external libraries.
-   **Interactive Tables**: Clean, readable tables with hover effects and status indicators.

### Color Theme
-   **Background**: Deep Slate (`#0f172a`) with animated radial gradient blobs.
-   **Primary Gradient**: Indigo (`#6366f1`) to Pink (`#ec4899`).
-   **Card Background**: Translucent Slate (`rgba(30, 41, 59, 0.6)`).
-   **Text**:
    -   Main: Off-white (`#f1f5f9`)
    -   Muted: Slate Grey (`#94a3b8`)
-   **Status Colors**:
    -   **Low Stock**: Rose (`#f43f5e`)
    -   **In Stock**: Emerald (`#10b981`)

## Key Features
1.  **Product Management**: Add new products with price, category, and quantity.
2.  **Inventory Tracking**: Real-time view of stock levels with visual alerts for low stock.
3.  **Sales Recording**: Process sales transactions that automatically update inventory.
4.  **Revenue Analytics**: Track total revenue and transaction counts.
5.  **Visual Analytics**: Bar chart representation of current inventory distribution.

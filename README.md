# YovoTrip - Frontend Developer Assessment Solution

An intelligent, modern, and production-grade Flight Booking Experience built for **YovoTrip** using **React 18**, **TypeScript**, **Vite**, **Tailwind CSS**, and **Context API**.

This project delivers an elevated, premium version of the YovoTrip platform, preserving its distinct crimson brand identity while enhancing visual hierarchy, information density, micro-interactions, responsive form controls, and overall user experience.

---

## 🚀 Live Features

### 1. Flight Search Screen (`/`)
- **YovoTrip Crimson Hero**: Custom crimson header overlay with subtle aviation background patterns.
- **Interactive Trip Type Selector**: Switch between `One-way`, `Round Trip`, and `Multi City` with active tab styling and a "Best fares guaranteed" badge.
- **Smart Airport Selection**: Airport autocomplete selector for Origin and Destination with a one-click Swap button.
- **Date & Traveler Selector**: Flexible date selection and custom popover dropdown for Adults (12+), Children (2-11), Infants (<2), and Cabin Class (`Economy`, `Premium Economy`, `Business`).
- **Special Fare Discounts Bar**: Instant fare tag options (`Regular`, `Student`, `Armed Forces`, `Senior Citizen`) with live discount badges.
- **Yovo AI Travel Assistant**: Interactive AI prompt guide ("Hey, It's Yovo, your AI travel guide. How can I help you today?") with sample query chips.
- **Popular Routes**: Highlighting top domestic routes with live price indicators.

### 2. Flight Results Screen (`/results`)
- **Sticky Search Summary Header**: Allows users to inspect and modify search parameters without navigating back.
- **Interactive Day Price Carousel**: Scrollable date navigation bar showcasing daily price indicators (e.g. Wed 5th Aug ₹8.4k, Thu 6th Aug ₹7.9k).
- **Yovo AI "Help Me Choose" Chips**: One-tap smart filters (`Yovo's pick`, `Cheap but sensible`, `Is fastest worth it?`, `Avoid overnight`, `Non-stop`, `Free meals`).
- **Sticky Filter Sidebar**:
  - Price Range slider (up to ₹50,000).
  - Stops filter checkboxes (Non Stop, 1 Stop, 2+ Stops).
  - Airlines filter checkboxes (IndiGo, Air India, Vistara, Akasa Air, SpiceJet).
  - One-click filter reset.
- **Sort Controls**: Quick sort tabs (`Cheapest`, `Fastest`, `Relevance`, `Earliest Departure`).
- **Flight Card & Visual Timeline**: Clear timeline showing departure time/terminal, flight duration, stops, layover info, and arrival time/terminal.
- **Expandable Fare Tier Modal**: Compare Economy, Premium Economy, and Business tiers with detailed baggage rules and cancellation policies.

### 3. Passenger Details Screen (`/passenger`)
- **Protected Navigation**: Automatically redirects back to search if accessed without selecting a flight.
- **Dynamic Traveler Forms**: Dedicated forms for every passenger (Salutation, First & Last Name, DOB, Seat & Meal preferences).
- **Contact Details**: Email and phone validation.
- **Live Form Validation**: Accessible error states with real-time feedback.
- **Promo Coupon System**: Apply coupons like `YOVOAI` (12% off) or `WELCOME500` (₹500 off) with instant price breakdown updates.
- **Special Fare Notice**: Guidance on student/defense/senior ID verification.
- **Journey & Fare Breakdown Sidebar**: Base fare, taxes, promotional ₹0 convenience fee savings, special fare discounts, coupon savings, and total payable amount.

### 4. Booking Confirmation Screen (`/confirmation`)
- **Protected Navigation**: Redirects to search if no confirmed booking exists.
- **Confirmation Header**: Generated PNR reference (e.g. `YV-98A7F2`) with one-click copy and Booking ID.
- **Printable E-Ticket**: Premium boarding pass layout with barcode & QR code graphic, passenger manifest, seat assignments, terminal information, and baggage allowance.
- **Action Toolbar**: Print E-Ticket, Download PDF, Email Receipt, and Book Another Flight buttons.
- **LocalStorage Persistence**: Session data and confirmed bookings persist across page reloads.

---

## 🛠️ Tech Stack & Architecture

- **Core**: React 18 (Functional Components + Hooks)
- **Language**: TypeScript (Strict type checking, interfaces for all domain entities)
- **Build Tool**: Vite
- **Routing**: React Router v6 (Lazy loading & Protected Route flow)
- **Styling**: Tailwind CSS + Custom YovoTrip theme tokens (`#D81B43` primary crimson, sleek dark elements, soft neutral cards)
- **State Management**: React Context API (`FlightContext`, `BookingContext`) with LocalStorage sync
- **Icons**: Lucide React

---

## 📁 Project Structure

```
src/
├── assets/             # Static assets & images
├── components/
│   ├── common/         # Button, Input, Select, Modal, Badge, Skeleton, Toast
│   ├── layout/         # Header, Footer, Navbar
│   ├── search/         # SearchForm, TripTypeTabs, SpecialFareSelector, TravelerDropdown, AiTravelGuide, PopularRoutes
│   ├── results/        # FlightCard, FlightTimeline, DateCarousel, FilterSidebar, SortTabs, AiSmartFilters, FareDetailsModal, StickySearchHeader
│   ├── passenger/      # PassengerForm, ContactDetailsForm, CouponSection, PriceSummarySidebar, SpecialFareAlert
│   └── confirmation/   # TicketCard, BookingHeader, QrCodeGraphic, ConfirmationActions
├── context/            # FlightContext, BookingContext
├── hooks/              # useBooking, useFlightSearch, useDebounce, useLocalStorage, useToast
├── services/           # flightService, bookingService, storageService
├── utils/              # currency, dateUtils, validation, priceUtils
├── constants/          # airports, airlines, coupons, routes, fareRules
├── types/              # flight, search, passenger, booking, filter, coupon
├── data/               # airports.json, flights.json, coupons.json
├── pages/              # SearchPage, ResultsPage, PassengerPage, ConfirmationPage, NotFoundPage
├── routes/             # AppRoutes (React.lazy + Suspense code splitting)
└── styles/             # index.css (Tailwind directives & print styles)
```

---

## ⚡ Performance Optimizations

1. **Route Code Splitting**: All pages (`SearchPage`, `ResultsPage`, `PassengerPage`, `ConfirmationPage`) are lazy-loaded via `React.lazy()` and `Suspense` to minimize initial bundle size.
2. **Memoized Filtering & Calculations**: Flight search, filter evaluation, and fare breakdown calculations are memoized using `useMemo` and `useCallback`.
3. **Optimized LocalStorage Persistence**: Light state snapshots ensure state restoration without blocking main thread loopers.
4. **Clean Component Scoping**: All components strictly follow the <500 lines constraint for optimal readability and maintenance.

---

## 🎯 Design Decisions & UX Enhancements

- **Brand Consistency**: Preserved YovoTrip's signature crimson theme (`#D81B43`) and aviation motif.
- **Card Hierarchy**: High contrast cards with soft shadows (`shadow-yovo-card`), clear font weights (Outfit & Inter fonts), and distinct color accents.
- **Information Density**: Timelines present departure, duration, layover, and arrival times cleanly without cluttering the screen.
- **Accessibility**: Inputs feature descriptive labels, field errors, clear focus rings, and proper keyboard accessibility.

---

## 🚀 Setup & Execution

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

---

## 🔮 Future Improvements
- Multi-city flight booking itinerary builder.
- Seat map picker integration for interactive seat selection.
- Real-time flight tracking & status updates simulation.
- PDF generation library integration (e.g. `jspdf` / `html2pdf`).

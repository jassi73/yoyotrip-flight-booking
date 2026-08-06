# YovoTrip - Flight Booking Experience

An intelligent, modern, and production-grade 3-screen Flight Booking Web Application built for **YovoTrip** using **React 18**, **TypeScript**, **Vite**, **Tailwind CSS**, and **React Context API**.

This project implements a complete end-to-end flight booking flow with a strong focus on task-first UX, zero-fee transparency, custom popover controls (no native `<select>` menus), dynamic accordion traveler forms, and real-time form validation.

---

## 🌟 Key Highlights & Design Innovations

1. **Zero Native Select Dropdowns (100% Custom Popovers)**:
   - All dropdowns across Search, Results, and Passenger pages (airports, dates, passenger counts, cabin class, titles, seat preferences, meal choices, and sort options) use custom animated popover controls styled in YovoTrip's primary crimson theme.

2. **Connecting Flight Layover Tooltip**:
   - Anchored directly to 1-stop badge triggers with exact segment breakdown, airline emblem badges (`IX`, `6E`, `UK`, `AI`), layover durations, and transfer airports.

3. **Dynamic Accordion Passenger Forms & Live Add/Remove Travelers**:
   - Passenger 1 (Primary) is open by default, while secondary passengers start collapsed in expandable accordion cards.
   - Users can dynamically add adults/children (`+ Add Adult`, `+ Add Child`) or remove travelers (`Trash2` icon) with live fare breakdown updates.

4. **Flying Airplane Sky Loading Animation**:
   - Custom full-screen night sky loader (`bg-slate-950`) featuring an ascending Yovo Crimson airplane, thrust jet stream trail, passing clouds, and flight search progress bar.

5. **Instant Route Protection Guard (`<Navigate to="/" replace />`)**:
   - Directly opening `/passenger` or `/confirmation` without selecting a flight or completing booking instantly redirects back to `/` with zero screen flicker.

6. **Bonus LocalStorage Persistence**:
   - Selected search parameters, chosen flight, fare option, and confirmed booking state persist in `localStorage` across page refreshes.

---

## 🚀 Screen-by-Screen User Flow

### Screen 1: Flight Search (`/`)
- **Task-Oriented Hero Section**: Quick search form above the fold with 9 Indian airports (`DEL`, `BOM`, `BLR`, `MAA`, `HYD`, `CCU`, `GOI`, `PNQ`, `JDH`).
- **Interactive Trip Type Selector**: Switch between `One-way`, `Round Trip`, and `Multi City` with animated Yovo Crimson "Coming Soon" popovers.
- **Airport Autocomplete**: Custom input-triggered destination search with thumbnail cards (Mehrangarh Fort, Umaid Bhawan Palace, Jodhpur, etc.) and quick airport swap button (`⇄`).
- **Date & Traveler Selector**: Custom popover calendars preventing past dates (`minDate={today}`), and traveler counter for Adults, Children, and Infants.
- **Special Fare Discounts Bar**: Instant discount chips (`Regular`, `Student`, `Armed Forces`, `Senior Citizen`).
- **Yovo AI Travel Assistant**: Interactive AI prompt guide with sample query chips.

### Screen 2: Flight Results (`/results`)
- **Sticky Search Modification Header**: Sticky subheader bar (`top-16`) allowing instant search tweaking without leaving the page.
- **Date Price Carousel**: Daily fare navigation bar displaying lowest prices across adjacent travel dates.
- **Sticky Filter Sidebar**:
  - Price Range slider (up to ₹50,000).
  - Stops filter (Non Stop, 1 Stop, 2+ Stops).
  - Airlines filter (IndiGo, Air India, Vistara, Akasa Air, SpiceJet).
  - One-click filter reset.
- **Custom Sort Popover**: Quick sort options (`Cheapest`, `Fastest`, `Duration`, `Earliest Departure`, `Earliest Arrival`, `Yovo AI`).
- **Flight Card Timeline & Layover Tooltip**: Clear information hierarchy, airline emblem box, flight duration timeline, layover popovers, amenities pills, and ₹0 convenience fee notice.

### Screen 3a: Passenger Details (`/passenger`)
- **Top Navigation Bar**: Uncluttered subheader (`sticky top-16 z-40`) with `← Back to Flight Results` button and SSL security badge.
- **Accordion Passenger Forms**: First traveler open by default; secondary travelers collapsed in summary accordion cards with auto-expand error handling.
- **Contact Details**: Email and phone number validation with real-time and out-of-focus (`onBlur`) error clearance.
- **Coupon System**: Apply promotional coupons (e.g. `YOVOAI` for 12% off) with live price updates.
- **Sticky Price Breakdown Sidebar**: Sticky fare summary (`top-32`) detailing Base Fare, Taxes, ₹0 Convenience Fee savings, Coupon discounts, and total payable amount.

### Screen 3b: Booking Confirmation (`/confirmation`)
- **Generated Mock PNR**: Unique 6-character alphanumeric PNR reference (e.g. `YV7K8M`) with one-click copy.
- **Printable E-Ticket**: Boarding pass e-ticket card with barcode, QR code graphic, passenger manifest, seat assignments, terminal info, and baggage allowance.
- **Action Buttons**: Print E-Ticket, Download PDF, Email Receipt, and Book Another Flight buttons.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: React 18 (Functional Components + Hooks)
- **Language**: TypeScript (Strict typing for Flights, Airfares, Passengers, Bookings, & Filters)
- **Build Tool**: Vite
- **Routing**: React Router v6 (Lazy loading & `<Navigate />` route guards)
- **Styling**: Tailwind CSS + Custom YovoTrip brand tokens (`#D81B43` primary crimson, slate dark modes, HSL Hues)
- **Animation**: Framer Motion
- **State Management**: React Context API (`FlightContext`, `BookingContext`) with `localStorage` sync
- **Icons**: Lucide React

---

## 📁 Project Folder Structure

```text
YoyoTrip/
├── public/                       # Static assets & favicon
├── src/
│   ├── components/               # Modular UI Components
│   │   ├── common/               # Shared UI Controls (CustomSelectDropdown, PassengerDatePicker, Skeleton, Input, Modal, Badge)
│   │   ├── confirmation/         # Booking Header, TicketCard, QrCodeGraphic, ConfirmationActions
│   │   ├── layout/               # Header & Footer (Unmounted on workspace routes)
│   │   ├── passenger/            # PassengerForm, ContactDetailsForm, CouponSection, PriceSummarySidebar, SpecialFareAlert
│   │   ├── results/              # FlightCard, LayoverTooltip, FlightTimeline, DateCarousel, FilterSidebar, SortTabs, StickySearchHeader
│   │   └── search/               # SearchForm, AirportSelectDropdown, DatePickerDropdown, TravelerDropdown, TripTypeTabs, HeroSection
│   ├── constants/                # Default search parameters & constant config
│   ├── context/                  # FlightContext & BookingContext state providers
│   ├── data/                     # Mock JSON data (airports.json, flights.json, coupons.json)
│   ├── hooks/                    # Custom hooks (useDebounce, useToast)
│   ├── pages/                    # SearchPage, ResultsPage, PassengerPage, ConfirmationPage, NotFoundPage
│   ├── routes/                   # AppRoutes (React.lazy + Suspense code splitting)
│   ├── services/                 # flightService, bookingService, storageService
│   ├── styles/                   # index.css (Tailwind directives & custom scrollbars)
│   ├── types/                    # TypeScript domain interfaces (flight, booking, passenger, search, filter, coupon)
│   └── utils/                    # currency, dateUtils, priceUtils, validation
├── index.html                    # Root HTML document
├── package.json                  # Project dependencies & scripts
├── tailwind.config.js            # YovoTrip Crimson & Slate Theme Extensions
└── tsconfig.json                 # TypeScript configuration
```

---

## ⚡ Setup & Execution Instructions

### 1. Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### 2. Installation
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 4. Build for Production
```bash
npm run build
```

---

## 📬 Contact & Submissions
Developed for the **YovoTrip Frontend Developer Assessment**.

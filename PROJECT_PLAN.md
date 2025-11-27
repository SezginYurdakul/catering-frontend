# Catering Frontend - Project Planning and Todo List

## 🎯 Project Overview

This project is a modern React frontend application using the Catering API.

### Technology Stack
- **Framework:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **State Management:** React Context API + Hooks
- **HTTP Client:** Axios
- **Routing:** React Router v6
- **Form Management:** React Hook Form + Zod (validation)
- **UI Components:** Headless UI (dropdown, modal, etc.)
- **Icons:** Heroicons
- **Date Handling:** date-fns

---

## 📋 Detailed Todo List

### Phase 1: Project Setup and Basic Structure

#### 1.1 Project Initialization
- [x] Create Vite + React + TypeScript project
- [x] Tailwind CSS setup and configuration
- [x] ESLint and Prettier configuration
- [x] Create folder structure

#### 1.2 Folder Structure
```
src/
├── api/                    # API service layer
│   ├── client.ts          # Axios instance + interceptors
│   ├── auth.service.ts    # Authentication API calls
│   ├── facility.service.ts
│   ├── location.service.ts
│   ├── tag.service.ts
│   └── employee.service.ts
├── components/             # Reusable components
│   ├── common/            # Button, Input, Card, Modal, etc.
│   ├── layout/            # Layout, Navbar, Sidebar
│   └── forms/             # Form components
├── context/               # React Context
│   └── AuthContext.tsx   # Authentication state
├── hooks/                 # Custom hooks
│   ├── useAuth.ts
│   ├── useApi.ts
│   └── usePagination.ts
├── pages/                 # Page components
│   ├── auth/
│   │   └── Login.tsx
│   ├── dashboard/
│   │   └── Dashboard.tsx
│   ├── facilities/
│   │   ├── FacilityList.tsx
│   │   ├── FacilityDetail.tsx
│   │   └── FacilityForm.tsx
│   ├── locations/
│   │   ├── LocationList.tsx
│   │   └── LocationForm.tsx
│   ├── tags/
│   │   ├── TagList.tsx
│   │   └── TagForm.tsx
│   └── employees/
│       ├── EmployeeList.tsx
│       └── EmployeeForm.tsx
├── types/                 # TypeScript type definitions
│   ├── api.types.ts
│   ├── facility.types.ts
│   ├── location.types.ts
│   ├── tag.types.ts
│   └── employee.types.ts
├── utils/                 # Utility functions
│   ├── validators.ts
│   └── formatters.ts
├── routes/               # Route configuration
│   ├── AppRoutes.tsx
│   └── ProtectedRoute.tsx
├── App.tsx
├── main.tsx
└── index.css
```

---

### Phase 2: Core Structure and Authentication

#### 2.1 Environment Configuration
- [x] Create `.env.example` file
- [x] API base URL configuration
- [x] Environment variables setup

**Example .env:**
```env
VITE_API_BASE_URL=http://localhost:8080
```

#### 2.2 API Client Setup
- [x] Create Axios instance
- [x] Request interceptor (JWT token addition)
- [x] Response interceptor (error handling)
- [x] Token management (localStorage)

**Features:**
- Automatic JWT token addition
- Logout on 401 errors
- Global error handling
- Loading states

#### 2.3 Authentication
- [x] Create Auth Context
- [x] Login service
- [x] Token storage and retrieval
- [x] Protected routes
- [x] Auto logout on token expiry
- [x] Login page UI

**Auth Context Functions:**
- `login(username, password)`
- `logout()`
- `isAuthenticated`
- `user` state

---

### Phase 3: Type Definitions

#### 3.1 API Response Types
```typescript
interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

interface PaginationMeta {
  current_page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMeta;
}
```

#### 3.2 Resource Types
- [x] Facility types
- [x] Location types
- [x] Tag types
- [x] Employee types

**Facility Type Example:**
```typescript
interface Location {
  id: number;
  city: string;
  latitude: number;
  longitude: number;
}

interface Tag {
  id: number;
  name: string;
}

interface Facility {
  id: number;
  name: string;
  location: Location;
  tags: Tag[];
  created_at: string;
  updated_at: string;
}

interface FacilityFormData {
  name: string;
  location_id: number;
  tagIds?: number[];
  tagNames?: string[];
}
```

---

### Phase 4: API Services

#### 4.1 Auth Service
- [x] `login(username, password)` → JWT token
- [x] Token storage helpers

#### 4.2 Facility Service
- [x] `getFacilities(page?, per_page?)` → Paginated list
- [x] `getFacilityById(id)` → Single facility
- [x] `searchFacilities(query, filter, operator)` → Filtered list
- [x] `createFacility(data)` → New facility
- [x] `updateFacility(id, data)` → Updated facility
- [x] `deleteFacility(id)` → Success

#### 4.3 Location Service
- [x] `getLocations()` → All locations
- [x] `getLocationById(id)` → Single location
- [x] `createLocation(data)` → New location
- [x] `updateLocation(id, data)` → Updated location
- [x] `deleteLocation(id)` → Success

#### 4.4 Tag Service
- [x] `getTags()` → All tags
- [x] `getTagById(id)` → Single tag
- [x] `createTag(data)` → New tag
- [x] `updateTag(id, data)` → Updated tag
- [x] `deleteTag(id)` → Success

#### 4.5 Employee Service
- [x] `getEmployees()` → All employees
- [x] `getEmployeeById(id)` → Single employee
- [x] `getEmployeesByFacility(facilityId)` → Facility employees
- [x] `createEmployee(data)` → New employee
- [x] `updateEmployee(id, data)` → Updated employee
- [x] `deleteEmployee(id)` → Success

---

### Phase 5: Reusable UI Components

#### 5.1 Common Components
- [x] **Button** - Primary, secondary, danger variants
- [x] **Input** - Text, number, select
- [x] **Card** - Container component
- [x] **Modal** - Confirmation, forms
- [ ] **Alert** - Success, error, warning, info
- [x] **LoadingSpinner** - Global and local loading states
- [x] **Pagination** - Page navigation
- [ ] **SearchBar** - Input with search icon
- [ ] **Badge** - Colored badges for tags
- [x] **EmptyState** - No data message

#### 5.2 Layout Components
- [x] **Layout** - Main app layout
- [x] **Navbar** - Top navigation bar
- [x] **Sidebar** - Side navigation menu
- [ ] **Breadcrumb** - Navigation breadcrumb

#### 5.3 Form Components
- [ ] **FormField** - Label + Input + Error
- [ ] **MultiSelect** - For tag selection
- [ ] **LocationSelect** - Location dropdown
- [ ] **ValidationError** - Error message display

---

### Phase 6: Custom Hooks

#### 6.1 useAuth Hook
- [x] `user` state
- [x] `loading` state
- [x] `login` function
- [x] `logout` function
- [x] `isAuthenticated` boolean

#### 6.2 useApi Hook
- [ ] Generic API call wrapper
- [ ] Loading state management
- [ ] Error handling
- [ ] Success callbacks

**Usage:**
```typescript
const { data, loading, error, execute } = useApi(
  facilityService.getFacilities
);
```

#### 6.3 usePagination Hook
- [ ] Page state management
- [ ] Per page management
- [ ] Total pages calculation
- [ ] Next/prev handlers

#### 6.4 useDebounce Hook
- [ ] Debounce for search input

---

### Phase 7: Pages

#### 7.1 Authentication Pages
- [x] **Login Page**
  - Username/password form
  - JWT token storage
  - Error handling
  - Redirect to dashboard on success

#### 7.2 Dashboard
- [x] **Dashboard Page**
  - Total facility count
  - Total location count
  - Total tag count
  - Total employee count
  - Recent facilities list
  - Statistics cards

#### 7.3 Facility Pages
- [x] **Facility List Page**
  - Paginated table view
  - Search functionality (query, filter, operator)
  - Filter by city
  - Filter by tags (AND/OR operators)
  - Create button → Form modal
  - Edit button → Form modal
  - Delete button → Confirmation modal
  - View details button → Detail page

- [x] **Facility Detail Page**
  - Facility information
  - Location details
  - Tags list
  - Employee list (for this facility)
  - Edit and Delete buttons

- [x] **Facility Form Modal**
  - Name input (required)
  - Location select (required)
  - Tag multi-select (optional)
  - Tag name input (optional, create new tag)
  - Validation
  - Submit handling

#### 7.4 Location Pages
- [x] **Location List Page**
  - All locations list
  - Create button
  - Edit button
  - Delete button (if no facilities)
  - Usage count (how many facilities using)

- [x] **Location Form Modal**
  - City input (required)
  - Latitude input (required, number)
  - Longitude input (required, number)
  - Validation

#### 7.5 Tag Pages
- [x] **Tag List Page**
  - All tags list
  - Create button
  - Edit button
  - Delete button (if no facility relations)
  - Usage count

- [x] **Tag Form Modal**
  - Name input (required)
  - Validation

#### 7.6 Employee Pages
- [x] **Employee List Page**
  - All employees list
  - Filter by facility
  - Create button
  - Edit button
  - Delete button

- [x] **Employee Form Modal**
  - Name input (required)
  - Facility select (required)
  - Address fields (street, house number, postcode, city, country)
  - Other employee fields
  - Validation

---

### Phase 8: Routing

#### 8.1 Route Configuration
- [x] Public routes (Login)
- [x] Protected routes (Dashboard, etc.)
- [x] 404 Not Found page
- [x] Redirect logic

**Route Structure:**
```typescript
/ → Login (public)
/dashboard → Dashboard (protected)
/facilities → Facility List (protected)
/facilities/:id → Facility Detail (protected)
/locations → Location List (protected)
/tags → Tag List (protected)
/employees → Employee List (protected)
```

#### 8.2 Protected Route Component
- [x] Auth check
- [x] Redirect to login if not authenticated
- [x] Loading state

---

### Phase 9: State Management

#### 9.1 Global State
- [x] Authentication state (Context)
- [ ] Theme state (optional, dark mode)

#### 9.2 Local State
- [x] Component-level state (useState)
- [x] Form state (React Hook Form)
- [x] API call state (custom hooks)

---

### Phase 10: Form Handling & Validation

#### 10.1 Validation Library Setup
- [x] Zod schema definitions
- [x] React Hook Form integration

#### 10.2 Validation Rules
- [x] Facility form validation
  - Name: required, min 3 chars
  - Location: required

- [x] Location form validation
  - City: required, min 2 chars
  - Latitude: required, number, -90 to 90
  - Longitude: required, number, -180 to 180

- [x] Tag form validation
  - Name: required, min 2 chars

- [x] Employee form validation
  - Name: required
  - Facility: required

---

### Phase 11: Error Handling

#### 11.1 API Error Handling
- [x] Network errors
- [x] 401 Unauthorized → Logout
- [x] 404 Not Found → Show message
- [x] 409 Conflict → Show resource in use message
- [x] 422 Validation errors → Show field errors
- [x] 500 Server errors → Show generic message

#### 11.2 Error Display
- [x] Toast notifications (react-hot-toast)
- [x] Inline form errors
- [ ] Alert components

---

### Phase 12: UI/UX Improvements

#### 12.1 Loading States
- [ ] Global loading overlay
- [ ] Skeleton loaders
- [x] Button loading spinners
- [ ] Lazy loading

#### 12.2 Responsive Design
- [x] Mobile responsive navbar
- [x] Responsive tables
- [x] Mobile-friendly forms
- [x] Hamburger menu

#### 12.3 Accessibility
- [ ] Keyboard navigation
- [ ] ARIA labels
- [ ] Focus states
- [ ] Screen reader support

---

### Phase 13: Advanced Features

#### 13.1 Search & Filtering
- [x] Debounced search input
- [x] Multi-filter support
- [x] AND/OR operator toggle
- [x] Clear filters button

#### 13.2 Pagination
- [x] Page size selector (10, 25, 50, 100)
- [x] Page navigation
- [x] Total count display
- [ ] Jump to page

#### 13.3 Sorting (Optional)
- [ ] Table column sorting
- [ ] Sort direction indicator

---

### Phase 14: Testing (Optional)

#### 14.1 Unit Tests
- [ ] Component tests (React Testing Library)
- [ ] Hook tests
- [ ] Utility function tests

#### 14.2 Integration Tests
- [ ] API service tests
- [ ] Route tests
- [ ] Form submission tests

---

### Phase 15: Documentation & Deployment

#### 15.1 Documentation
- [x] README.md
- [x] Setup instructions
- [x] Environment variables guide
- [x] API integration notes
- [ ] Component documentation

#### 15.2 Build & Deploy
- [x] Production build configuration
- [x] Environment-specific configs
- [ ] Deployment guide (Vercel, Netlify, Docker)

---

## 🔧 Setup Instructions (When Project is Ready)

```bash
# 1. Install dependencies
npm install

# 2. Setup environment variables
cp .env.example .env
# Edit .env file

# 3. Start development server
npm run dev

# 4. Production build
npm run build

# 5. Preview production build
npm run preview
```

---

## 📦 Required NPM Packages

### Core
```bash
npm install react react-dom react-router-dom
npm install axios
npm install @headlessui/react @heroicons/react
npm install date-fns
```

### Form & Validation
```bash
npm install react-hook-form @hookform/resolvers zod
```

### UI & Styling
```bash
npm install -D tailwindcss postcss autoprefixer
npm install react-hot-toast
npm install clsx  # className utility
```

### Dev Dependencies
```bash
npm install -D @types/react @types/react-dom
npm install -D @typescript-eslint/eslint-plugin @typescript-eslint/parser
npm install -D eslint eslint-plugin-react-hooks eslint-plugin-react-refresh
npm install -D prettier prettier-plugin-tailwindcss
```

### Optional
```bash
npm install react-loading-skeleton  # Skeleton loaders
npm install react-icons  # Additional icons
```

---

## 🎨 Tailwind CSS Theme

### Colors
```js
// tailwind.config.js
colors: {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    // ... blue shades
    600: '#2563eb',
    700: '#1d4ed8',
  },
  secondary: { ... },
  success: { ... },
  danger: { ... },
  warning: { ... },
}
```

---

## 🔒 Security Notes

- JWT token stored in localStorage
- Token expiry control
- XSS protection (React auto-escapes)
- CORS policy (configured in Backend)
- Input sanitization
- API error messages sanitization

---

## 🚀 Performance Optimizations

- [ ] React.memo for expensive components
- [ ] useMemo for expensive calculations
- [ ] useCallback for callback functions
- [ ] Code splitting (lazy loading)
- [ ] Image optimization
- [ ] Bundle size analysis

---

## 📱 Responsive Breakpoints

```css
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
2xl: 1536px /* Extra large */
```

---

## 🎯 Priority Order

### High Priority (MVP)
1. Authentication (Login/Logout)
2. Facility CRUD
3. Location CRUD
4. Tag CRUD
5. Basic UI components
6. Routing

### Medium Priority
1. Employee CRUD
2. Advanced search & filtering
3. Pagination
4. Dashboard
5. Responsive design

### Low Priority
1. Dark mode
2. Testing
3. Performance optimizations
4. Advanced features

---

## 📝 Notes

- API Base URL: `http://localhost:8080` (development)
- All API requests require JWT token (except auth/login)
- API error responses are standardized
- Pagination: `?page=1&per_page=10`
- Search: `?query=...&filter=city,tag&operator=AND`

---

## 🤝 API Integration Notes

### Authentication
- Login endpoint: `POST /auth/login`
- Body: `{ "username": "admin", "password": "yourpass" }`
- Response: `{ "token": "jwt_token_here" }`
- Token usage: `Authorization: Bearer {token}` header

### Error Handling
- 400: Validation errors
- 401: Unauthorized (token invalid/missing)
- 404: Resource not found
- 409: Resource in use (during deletion)
- 422: Business rule violation
- 500: Server error

### Pagination Response Format
```json
{
  "data": [...],
  "pagination": {
    "current_page": 1,
    "per_page": 10,
    "total": 25,
    "total_pages": 3
  }
}
```

---

This planning document covers all phases of the project. Each phase can be marked as completed and new requirements can be added as needed.

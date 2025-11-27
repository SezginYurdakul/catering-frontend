# Catering Frontend - Proje Planlama ve Yapılacaklar Listesi

## 🎯 Proje Genel Bakış

Bu proje, Catering API'sini kullanan modern bir React frontend uygulamasıdır.

### Teknoloji Stack
- **Framework:** React 18
- **Dil:** TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **State Management:** React Context API + Hooks
- **HTTP Client:** Axios
- **Routing:** React Router v6
- **Form Yönetimi:** React Hook Form + Zod (validation)
- **UI Components:** Headless UI (dropdown, modal, vb.)
- **Icons:** Heroicons
- **Date Handling:** date-fns

---

## 📋 Detaylı Yapılacaklar Listesi

### Faz 1: Proje Kurulumu ve Temel Yapı

#### 1.1 Proje İnşası
- [ ] Vite + React + TypeScript projesi oluştur
- [ ] Tailwind CSS kurulumu ve yapılandırması
- [ ] ESLint ve Prettier yapılandırması
- [ ] Klasör yapısını oluştur

#### 1.2 Klasör Yapısı
```
src/
├── api/                    # API servis katmanı
│   ├── client.ts          # Axios instance + interceptors
│   ├── auth.service.ts    # Authentication API calls
│   ├── facility.service.ts
│   ├── location.service.ts
│   ├── tag.service.ts
│   └── employee.service.ts
├── components/             # Reusable components
│   ├── common/            # Button, Input, Card, Modal, vb.
│   ├── layout/            # Layout, Navbar, Sidebar
│   └── forms/             # Form components
├── context/               # React Context
│   └── AuthContext.tsx   # Authentication state
├── hooks/                 # Custom hooks
│   ├── useAuth.ts
│   ├── useApi.ts
│   └── usePagination.ts
├── pages/                 # Sayfa componentleri
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

### Faz 2: Core Yapı ve Authentication

#### 2.1 Environment Configuration
- [ ] `.env.example` dosyası oluştur
- [ ] API base URL yapılandırması
- [ ] Environment variables setup

**Örnek .env:**
```env
VITE_API_BASE_URL=http://localhost:8080
```

#### 2.2 API Client Setup
- [ ] Axios instance oluştur
- [ ] Request interceptor (JWT token ekleme)
- [ ] Response interceptor (error handling)
- [ ] Token yönetimi (localStorage)

**Özellikler:**
- Otomatik JWT token ekleme
- 401 hatalarında logout
- Global error handling
- Loading states

#### 2.3 Authentication
- [ ] Auth Context oluştur
- [ ] Login servisi
- [ ] Token storage ve retrieval
- [ ] Protected routes
- [ ] Auto logout on token expiry
- [ ] Login sayfası UI

**Auth Context Fonksiyonları:**
- `login(username, password)`
- `logout()`
- `isAuthenticated`
- `user` state

---

### Faz 3: Type Definitions

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
- [ ] Facility types
- [ ] Location types
- [ ] Tag types
- [ ] Employee types

**Facility Type Örneği:**
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

### Faz 4: API Services

#### 4.1 Auth Service
- [ ] `login(username, password)` → JWT token
- [ ] Token storage helpers

#### 4.2 Facility Service
- [ ] `getFacilities(page?, per_page?)` → Paginated list
- [ ] `getFacilityById(id)` → Single facility
- [ ] `searchFacilities(query, filter, operator)` → Filtered list
- [ ] `createFacility(data)` → New facility
- [ ] `updateFacility(id, data)` → Updated facility
- [ ] `deleteFacility(id)` → Success

#### 4.3 Location Service
- [ ] `getLocations()` → All locations
- [ ] `getLocationById(id)` → Single location
- [ ] `createLocation(data)` → New location
- [ ] `updateLocation(id, data)` → Updated location
- [ ] `deleteLocation(id)` → Success

#### 4.4 Tag Service
- [ ] `getTags()` → All tags
- [ ] `getTagById(id)` → Single tag
- [ ] `createTag(data)` → New tag
- [ ] `updateTag(id, data)` → Updated tag
- [ ] `deleteTag(id)` → Success

#### 4.5 Employee Service
- [ ] `getEmployees()` → All employees
- [ ] `getEmployeeById(id)` → Single employee
- [ ] `getEmployeesByFacility(facilityId)` → Facility employees
- [ ] `createEmployee(data)` → New employee
- [ ] `updateEmployee(id, data)` → Updated employee
- [ ] `deleteEmployee(id)` → Success

---

### Faz 5: Reusable UI Components

#### 5.1 Common Components
- [ ] **Button** - Primary, secondary, danger variants
- [ ] **Input** - Text, number, select
- [ ] **Card** - Container component
- [ ] **Modal** - Confirmation, forms
- [ ] **Alert** - Success, error, warning, info
- [ ] **LoadingSpinner** - Global ve local loading states
- [ ] **Pagination** - Page navigation
- [ ] **SearchBar** - Input with search icon
- [ ] **Badge** - Tags için renkli badges
- [ ] **EmptyState** - Data yok mesajı

#### 5.2 Layout Components
- [ ] **Layout** - Main app layout
- [ ] **Navbar** - Top navigation bar
- [ ] **Sidebar** - Side navigation menu
- [ ] **Breadcrumb** - Navigation breadcrumb

#### 5.3 Form Components
- [ ] **FormField** - Label + Input + Error
- [ ] **MultiSelect** - Tag selection için
- [ ] **LocationSelect** - Location dropdown
- [ ] **ValidationError** - Error message display

---

### Faz 6: Custom Hooks

#### 6.1 useAuth Hook
- [ ] `user` state
- [ ] `loading` state
- [ ] `login` function
- [ ] `logout` function
- [ ] `isAuthenticated` boolean

#### 6.2 useApi Hook
- [ ] Generic API call wrapper
- [ ] Loading state management
- [ ] Error handling
- [ ] Success callbacks

**Kullanım:**
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
- [ ] Search input için debounce

---

### Faz 7: Sayfalar (Pages)

#### 7.1 Authentication Pages
- [ ] **Login Page**
  - Username/password form
  - JWT token storage
  - Error handling
  - Redirect to dashboard on success

#### 7.2 Dashboard
- [ ] **Dashboard Page**
  - Toplam facility sayısı
  - Toplam location sayısı
  - Toplam tag sayısı
  - Toplam employee sayısı
  - Son eklenen facilities listesi
  - İstatistik kartları

#### 7.3 Facility Pages
- [ ] **Facility List Page**
  - Paginated table view
  - Search functionality (query, filter, operator)
  - Filter by city
  - Filter by tags (AND/OR operators)
  - Create button → Form modal
  - Edit button → Form modal
  - Delete button → Confirmation modal
  - View details button → Detail page

- [ ] **Facility Detail Page**
  - Facility bilgileri
  - Location detayı
  - Tags listesi
  - Employee listesi (bu facility'e ait)
  - Edit ve Delete butonları

- [ ] **Facility Form Modal**
  - Name input (required)
  - Location select (required)
  - Tag multi-select (optional)
  - Tag name input (optional, yeni tag oluştur)
  - Validation
  - Submit handling

#### 7.4 Location Pages
- [ ] **Location List Page**
  - Tüm locations listesi
  - Create button
  - Edit button
  - Delete button (facility yoksa)
  - Usage count (kaç facility kullanıyor)

- [ ] **Location Form Modal**
  - City input (required)
  - Latitude input (required, number)
  - Longitude input (required, number)
  - Validation

#### 7.5 Tag Pages
- [ ] **Tag List Page**
  - Tüm tags listesi
  - Create button
  - Edit button
  - Delete button (facility ilişkisi yoksa)
  - Usage count

- [ ] **Tag Form Modal**
  - Name input (required)
  - Validation

#### 7.6 Employee Pages
- [ ] **Employee List Page**
  - Tüm employees listesi
  - Filter by facility
  - Create button
  - Edit button
  - Delete button

- [ ] **Employee Form Modal**
  - Name input (required)
  - Facility select (required)
  - Position input
  - Other employee fields
  - Validation

---

### Faz 8: Routing

#### 8.1 Route Configuration
- [ ] Public routes (Login)
- [ ] Protected routes (Dashboard, vb.)
- [ ] 404 Not Found page
- [ ] Redirect logic

**Route Yapısı:**
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
- [ ] Auth check
- [ ] Redirect to login if not authenticated
- [ ] Loading state

---

### Faz 9: State Management

#### 9.1 Global State
- [ ] Authentication state (Context)
- [ ] Theme state (optional, dark mode)

#### 9.2 Local State
- [ ] Component-level state (useState)
- [ ] Form state (React Hook Form)
- [ ] API call state (custom hooks)

---

### Faz 10: Form Handling & Validation

#### 10.1 Validation Library Setup
- [ ] Zod schema definitions
- [ ] React Hook Form integration

#### 10.2 Validation Rules
- [ ] Facility form validation
  - Name: required, min 3 chars
  - Location: required

- [ ] Location form validation
  - City: required, min 2 chars
  - Latitude: required, number, -90 to 90
  - Longitude: required, number, -180 to 180

- [ ] Tag form validation
  - Name: required, min 2 chars

- [ ] Employee form validation
  - Name: required
  - Facility: required

---

### Faz 11: Error Handling

#### 11.1 API Error Handling
- [ ] Network errors
- [ ] 401 Unauthorized → Logout
- [ ] 404 Not Found → Show message
- [ ] 409 Conflict → Show resource in use message
- [ ] 422 Validation errors → Show field errors
- [ ] 500 Server errors → Show generic message

#### 11.2 Error Display
- [ ] Toast notifications (react-hot-toast veya react-toastify)
- [ ] Inline form errors
- [ ] Alert components

---

### Faz 12: UI/UX İyileştirmeleri

#### 12.1 Loading States
- [ ] Global loading overlay
- [ ] Skeleton loaders
- [ ] Button loading spinners
- [ ] Lazy loading

#### 12.2 Responsive Design
- [ ] Mobile responsive navbar
- [ ] Responsive tables
- [ ] Mobile-friendly forms
- [ ] Hamburger menu

#### 12.3 Accessibility
- [ ] Keyboard navigation
- [ ] ARIA labels
- [ ] Focus states
- [ ] Screen reader support

---

### Faz 13: Advanced Features

#### 13.1 Search & Filtering
- [ ] Debounced search input
- [ ] Multi-filter support
- [ ] AND/OR operator toggle
- [ ] Clear filters button

#### 13.2 Pagination
- [ ] Page size selector (10, 25, 50, 100)
- [ ] Page navigation
- [ ] Total count display
- [ ] Jump to page

#### 13.3 Sorting (Optional)
- [ ] Table column sorting
- [ ] Sort direction indicator

---

### Faz 14: Testing (Optional)

#### 14.1 Unit Tests
- [ ] Component tests (React Testing Library)
- [ ] Hook tests
- [ ] Utility function tests

#### 14.2 Integration Tests
- [ ] API service tests
- [ ] Route tests
- [ ] Form submission tests

---

### Faz 15: Documentation & Deployment

#### 15.1 Documentation
- [ ] README.md
- [ ] Setup instructions
- [ ] Environment variables guide
- [ ] API integration notes
- [ ] Component documentation

#### 15.2 Build & Deploy
- [ ] Production build configuration
- [ ] Environment-specific configs
- [ ] Deployment guide (Vercel, Netlify, Docker)

---

## 🔧 Kurulum Adımları (Proje Hazır Olduğunda)

```bash
# 1. Dependencies yükle
npm install

# 2. Environment variables ayarla
cp .env.example .env
# .env dosyasını düzenle

# 3. Development server başlat
npm run dev

# 4. Production build
npm run build

# 5. Preview production build
npm run preview
```

---

## 📦 Gerekli NPM Paketleri

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
npm install react-hot-toast  # veya react-toastify
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
npm install react-icons  # Ek iconlar
```

---

## 🎨 Tailwind CSS Teması

### Renkler
```js
// tailwind.config.js
colors: {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    // ... mavi tonları
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

## 🔒 Güvenlik Notları

- JWT token localStorage'da saklanacak
- Token expiry kontrolü
- XSS koruması (React otomatik escape eder)
- CORS politikası (Backend'de ayarlı)
- Input sanitization
- API error messages sanitization

---

## 🚀 Performans Optimizasyonları

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

## 🎯 Öncelik Sırası

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

## 📝 Notlar

- API Base URL: `http://localhost:8080` (development)
- Tüm API istekleri JWT token gerektirir (auth/login hariç)
- API error responses standardize edilmiş
- Pagination: `?page=1&per_page=10`
- Search: `?query=...&filter=city,tag&operator=AND`

---

## 🤝 API Entegrasyon Notları

### Authentication
- Login endpoint: `POST /auth/login`
- Body: `{ "username": "admin", "password": "yourpass" }`
- Response: `{ "token": "jwt_token_here" }`
- Token kullanımı: `Authorization: Bearer {token}` header'ı

### Error Handling
- 400: Validation errors
- 401: Unauthorized (token invalid/missing)
- 404: Resource not found
- 409: Resource in use (silme işleminde)
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

Bu planlama dokümanı projenin tüm aşamalarını kapsamaktadır. Her faz tamamlandıkça işaretlenebilir ve yeni gereksinimler eklenebilir.

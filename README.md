# Catering Frontend

Modern frontend application for Catering Management system built with React + TypeScript + Tailwind CSS.

## 🚀 Technologies

- **React 18** - UI Framework
- **TypeScript** - Type Safety
- **Vite** - Build Tool & Dev Server
- **Tailwind CSS** - Styling
- **React Router v6** - Routing
- **React Hook Form** - Form Management
- **Zod** - Validation
- **Axios** - HTTP Client
- **Headless UI** - UI Components
- **Heroicons** - Icons
- **React Hot Toast** - Notifications

## 📋 Features

- ✅ JWT Authentication
- ✅ CRUD Operations (Facilities, Locations, Tags, Employees)
- ✅ Pagination
- ✅ Search & Filtering
- ✅ Responsive Design
- ✅ Form Validation
- ✅ Error Handling
- ✅ Loading States
- ✅ Toast Notifications
- ✅ Modern UI/UX

## 🐳 Docker Installation (Recommended)

### Requirements
- Docker
- Docker Compose

### Installation Steps

```bash
# 1. Navigate to project directory
cd catering-frontend

# 2. Create environment file
cp .env.example .env

# 3. Edit .env file (if needed)
# VITE_API_BASE_URL=http://localhost:8080

# 4. Start Docker container
docker-compose up -d

# 5. Open application in browser
# http://localhost:5173
```

### Docker Commands

```bash
# Start container
docker-compose up -d

# View logs
docker-compose logs -f frontend

# Stop container
docker-compose down

# Connect to container shell
docker-compose exec frontend sh

# Install dependency (inside container)
docker-compose exec frontend npm install <package-name>
```

## 💻 Local Installation (Without Docker)

### Requirements
- Node.js 20+
- npm or yarn

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Create environment file
cp .env.example .env

# 3. Edit .env file
# VITE_API_BASE_URL=http://localhost:8080

# 4. Start development server
npm run dev

# Application will run at http://localhost:5173
```

## 🔧 Environment Variables

Configure the following variables in `.env` file:

```env
# API Base URL
VITE_API_BASE_URL=http://localhost:8080

# Environment
NODE_ENV=development
```

## 📝 Available Commands

```bash
# Start development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Linting
npm run lint
```

## 🔐 Login Credentials

Log in with user credentials defined in your Backend API:

```
Username: admin
Password: Defined as LOGIN_PASSWORD in Backend .env file
```

## 📱 Page Structure

### Authentication
- `/login` - Login page

### Main Page
- `/dashboard` - Dashboard (Statistics and recent facilities)

### Facilities
- `/facilities` - Facility list
- `/facilities/:id` - Facility detail

### Locations
- `/locations` - Location list

### Tags
- `/tags` - Tag list

### Employees
- `/employees` - Employee list

## 🏗️ Project Structure

```
src/
├── api/                    # API service layer
│   ├── client.ts          # Axios instance
│   ├── auth.service.ts    # Authentication API
│   ├── facility.service.ts
│   ├── location.service.ts
│   ├── tag.service.ts
│   └── employee.service.ts
├── components/             # React components
│   ├── common/            # Common components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── EmptyState.tsx
│   │   └── Pagination.tsx
│   └── layout/            # Layout components
│       ├── Layout.tsx
│       ├── Navbar.tsx
│       └── Sidebar.tsx
├── context/               # React Context
│   └── AuthContext.tsx
├── hooks/                 # Custom hooks
│   └── useAuth.ts
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
│   │   └── TagList.tsx
│   └── employees/
│       ├── EmployeeList.tsx
│       └── EmployeeForm.tsx
├── routes/                # Routing
│   ├── AppRoutes.tsx
│   └── ProtectedRoute.tsx
├── types/                 # TypeScript types
│   ├── api.types.ts
│   ├── facility.types.ts
│   ├── location.types.ts
│   ├── tag.types.ts
│   └── employee.types.ts
├── App.tsx
├── main.tsx
└── index.css
```

## 🎨 Tailwind CSS

The project uses customized Tailwind CSS configuration:

- **Primary Color:** Blue shades
- **Responsive Breakpoints:** sm, md, lg, xl, 2xl
- **Custom Utilities:** btn, input, card classes

## 🔗 API Integration

Application integrates with Catering API:

- **Base URL:** `http://localhost:8080` (default)
- **Authentication:** JWT Bearer Token
- **Headers:** Authorization header added automatically
- **Error Handling:** Auto logout on 401 errors

### API Requests

All API requests are made through services in `src/api/` directory:

```typescript
// Example usage
import facilityService from '@/api/facility.service'

const facilities = await facilityService.getFacilities(1, 10)
const facility = await facilityService.getFacilityById(1)
await facilityService.createFacility(data)
```

## 🚨 Error Handling

- API errors are displayed with toast notifications
- Form validation errors are displayed inline
- 401 errors trigger automatic logout
- Network errors are displayed with user-friendly messages

## 🎯 State Management

- **Global State:** React Context API (Authentication)
- **Local State:** useState hooks
- **Form State:** React Hook Form
- **Server State:** Direct management via API calls

## 📦 Build & Deploy

### Production Build

```bash
# With Docker
docker-compose exec frontend npm run build

# Local
npm run build
```

Build files are created in `dist/` directory.

### Deploy

Built files can be deployed to any static hosting service:

- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Nginx

## 🔄 Running with Backend

1. **Start Backend:**
```bash
cd /path/to/Catering-API
docker-compose up -d
```

2. **Start Frontend:**
```bash
cd /path/to/catering-frontend
docker-compose up -d
```

3. **Open in browser:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:8080
- phpMyAdmin: http://localhost:8081

## 🐛 Troubleshooting

### Port already in use
```bash
# Stop Docker container
docker-compose down

# Find process using the port
lsof -i :5173

# Use a different port (change in docker-compose.yml)
```

### API connection error
- Ensure Backend API is running
- Check `VITE_API_BASE_URL` value in `.env` file
- Check CORS settings in backend

### Dependencies installation fails
```bash
# Clean node modules
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [React Router](https://reactrouter.com)
- [React Hook Form](https://react-hook-form.com)

## 📄 License

This project is developed for educational purposes.

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push your branch (`git push origin feature/amazing-feature`)
5. Create a Pull Request

## 📞 Contact

Feel free to open an issue for any questions or suggestions.

---

**Development Notes:**

- All components are written in TypeScript
- Form validation is done with Zod schema
- API error handling is managed centrally
- Responsive design follows mobile-first approach
- ESLint is used for code style guide

**Happy Coding! 🚀**

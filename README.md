# Catering Frontend

Modern React + TypeScript + Tailwind CSS ile geliştirilmiş Catering Management sistemi için frontend uygulaması.

## 🚀 Teknolojiler

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

## 📋 Özellikler

- ✅ JWT Authentication
- ✅ CRUD İşlemleri (Tesisler, Lokasyonlar, Etiketler, Çalışanlar)
- ✅ Pagination
- ✅ Search & Filtering
- ✅ Responsive Design
- ✅ Form Validation
- ✅ Error Handling
- ✅ Loading States
- ✅ Toast Notifications
- ✅ Modern UI/UX

## 🐳 Docker ile Kurulum (Önerilen)

### Gereksinimler
- Docker
- Docker Compose

### Kurulum Adımları

```bash
# 1. Proje klasörüne gidin
cd catering-frontend

# 2. Environment dosyasını oluşturun
cp .env.example .env

# 3. .env dosyasını düzenleyin (gerekirse)
# VITE_API_BASE_URL=http://localhost:8080

# 4. Docker container'ı başlatın
docker-compose up -d

# 5. Uygulamayı tarayıcıda açın
# http://localhost:5173
```

### Docker Komutları

```bash
# Container'ı başlat
docker-compose up -d

# Logları görüntüle
docker-compose logs -f frontend

# Container'ı durdur
docker-compose down

# Container'a shell ile bağlan
docker-compose exec frontend sh

# Dependency yükle (container içinde)
docker-compose exec frontend npm install <package-name>
```

## 💻 Lokal Kurulum (Docker olmadan)

### Gereksinimler
- Node.js 20+
- npm veya yarn

### Kurulum

```bash
# 1. Dependencies yükle
npm install

# 2. Environment dosyası oluştur
cp .env.example .env

# 3. .env dosyasını düzenle
# VITE_API_BASE_URL=http://localhost:8080

# 4. Development server başlat
npm run dev

# Uygulama http://localhost:5173 adresinde çalışacak
```

## 🔧 Environment Variables

`.env` dosyasında aşağıdaki değişkenleri ayarlayın:

```env
# API Base URL
VITE_API_BASE_URL=http://localhost:8080

# Environment
NODE_ENV=development
```

## 📝 Kullanılabilir Komutlar

```bash
# Development server başlat
npm run dev

# Production build
npm run build

# Production build önizleme
npm run preview

# Linting
npm run lint
```

## 🔐 Giriş Bilgileri

Backend API'nizde tanımlı kullanıcı bilgileriyle giriş yapın:

```
Kullanıcı Adı: admin
Şifre: Backend .env dosyasında LOGIN_PASSWORD olarak tanımlı
```

## 📱 Sayfa Yapısı

### Authentication
- `/login` - Giriş sayfası

### Ana Sayfa
- `/dashboard` - Dashboard (İstatistikler ve son tesisler)

### Tesisler
- `/facilities` - Tesis listesi
- `/facilities/:id` - Tesis detayı

### Lokasyonlar
- `/locations` - Lokasyon listesi

### Etiketler
- `/tags` - Etiket listesi

### Çalışanlar
- `/employees` - Çalışan listesi

## 🏗️ Proje Yapısı

```
src/
├── api/                    # API servis katmanı
│   ├── client.ts          # Axios instance
│   ├── auth.service.ts    # Authentication API
│   ├── facility.service.ts
│   ├── location.service.ts
│   ├── tag.service.ts
│   └── employee.service.ts
├── components/             # React bileşenleri
│   ├── common/            # Genel bileşenler
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── EmptyState.tsx
│   │   └── Pagination.tsx
│   └── layout/            # Layout bileşenleri
│       ├── Layout.tsx
│       ├── Navbar.tsx
│       └── Sidebar.tsx
├── context/               # React Context
│   └── AuthContext.tsx
├── hooks/                 # Custom hooks
│   └── useAuth.ts
├── pages/                 # Sayfa bileşenleri
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

Proje, özelleştirilmiş Tailwind CSS yapılandırması kullanır:

- **Primary Color:** Mavi tonları
- **Responsive Breakpoints:** sm, md, lg, xl, 2xl
- **Custom Utilities:** btn, input, card sınıfları

## 🔗 API Entegrasyonu

Uygulama, Catering API ile entegre çalışır:

- **Base URL:** `http://localhost:8080` (varsayılan)
- **Authentication:** JWT Bearer Token
- **Headers:** Otomatik olarak Authorization header'ı eklenir
- **Error Handling:** 401 hatalarında otomatik logout

### API İstekleri

Tüm API istekleri `src/api/` klasöründeki servisler üzerinden yapılır:

```typescript
// Örnek kullanım
import facilityService from '@/api/facility.service'

const facilities = await facilityService.getFacilities(1, 10)
const facility = await facilityService.getFacilityById(1)
await facilityService.createFacility(data)
```

## 🚨 Error Handling

- API hataları toast notification ile gösterilir
- Form validation hataları inline gösterilir
- 401 hataları otomatik logout yapar
- Network hataları kullanıcı dostu mesajlarla gösterilir

## 🎯 State Management

- **Global State:** React Context API (Authentication)
- **Local State:** useState hooks
- **Form State:** React Hook Form
- **Server State:** API calls ile direkt yönetim

## 📦 Build & Deploy

### Production Build

```bash
# Docker ile
docker-compose exec frontend npm run build

# Lokal
npm run build
```

Build dosyaları `dist/` klasöründe oluşturulur.

### Deploy

Build edilen dosyalar herhangi bir static hosting servisine deploy edilebilir:

- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Nginx

## 🔄 Backend ile Birlikte Çalıştırma

1. **Backend'i başlatın:**
```bash
cd /path/to/Catering-API
docker-compose up -d
```

2. **Frontend'i başlatın:**
```bash
cd /path/to/catering-frontend
docker-compose up -d
```

3. **Tarayıcıda açın:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:8080
- phpMyAdmin: http://localhost:8081

## 🐛 Troubleshooting

### Port zaten kullanımda
```bash
# Docker container'ı durdurun
docker-compose down

# Portu kullanan process'i bulun
lsof -i :5173

# Farklı bir port kullanın (docker-compose.yml'de değiştirin)
```

### API bağlantı hatası
- Backend API'nin çalıştığından emin olun
- `.env` dosyasında `VITE_API_BASE_URL` değerini kontrol edin
- CORS ayarlarını backend'de kontrol edin

### Dependencies yüklenemiyor
```bash
# Node modules'ü temizle
rm -rf node_modules package-lock.json

# Yeniden yükle
npm install
```

## 📚 Ek Kaynaklar

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [React Router](https://reactrouter.com)
- [React Hook Form](https://react-hook-form.com)

## 📄 Lisans

Bu proje eğitim amaçlı geliştirilmiştir.

## 🤝 Katkıda Bulunma

1. Projeyi fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📞 İletişim

Herhangi bir sorunuz veya öneriniz varsa issue açabilirsiniz.

---

**Geliştirme Notları:**

- Tüm componentler TypeScript ile yazılmıştır
- Form validation Zod schema ile yapılır
- API error handling merkezi olarak yönetilir
- Responsive design mobile-first yaklaşımıyla yapılmıştır
- Kod style guide için ESLint kullanılır

**İyi Kodlamalar! 🚀**

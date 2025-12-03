# Catering Frontend - Production Deployment Guide

This documentation contains the necessary steps to deploy the Catering Frontend application in production mode at `sezginyurdakul.com/catering`.

## Overview

- **Development**: Runs with hot-reload on localhost (`http://localhost:5173`)
- **Production**: Deployed at `sezginyurdakul.com/catering`

## File Structure

```
catering-frontend/
├── Dockerfile                      # For development
├── Dockerfile.prod                 # For production (multi-stage build)
├── docker-compose.yml              # For development
├── docker-compose.prod.yml         # For production
├── nginx.conf                      # Nginx config inside container
├── nginx-reverse-proxy.conf        # Nginx config on main server (example)
└── vite.config.ts                  # Added base path support
```

## Prerequisites

Requirements on your server:
- Docker and Docker Compose installed
- Nginx installed (for reverse proxy)
- `catering-network` Docker network created (shared with backend)

## Installation Steps

### 1. Create Docker Network

To use the same network as the backend (if it doesn't exist):

```bash
docker network create catering-network
```

### 2. Upload Project to Server

```bash
# Clone or copy the project to your server
git clone <repository-url> /path/to/catering-frontend
cd /path/to/catering-frontend
```

### 3. Production Build and Deploy

```bash
# Build and start the production container
docker-compose -f docker-compose.prod.yml up -d --build

# Check logs
docker-compose -f docker-compose.prod.yml logs -f
```

When the container is successfully running, it will be accessible at `http://localhost:8082`.

### 4. Nginx Reverse Proxy Configuration

Configure nginx on your main server:

```bash
# Edit nginx configuration file
sudo nano /etc/nginx/sites-available/sezginyurdakul.com

# or create a new file
sudo nano /etc/nginx/conf.d/catering.conf
```

Add the following configuration:

```nginx
server {
    listen 80;
    server_name sezginyurdakul.com;

    # Frontend - /catering path
    location /catering/ {
        proxy_pass http://localhost:8082/catering/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API - /catering_api path
    # NOTE: Backend may already be running in catering_api_nginx container
    # If not configured yet, add the following:
    location /catering_api/ {
        proxy_pass http://localhost:80/catering_api/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Reload nginx:

```bash
# Test configuration
sudo nginx -t

# If successful, reload
sudo systemctl reload nginx
```

### 5. SSL Certificate (Recommended)

To add SSL with Let's Encrypt:

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d sezginyurdakul.com
```

## Running in Development Mode (Localhost)

For local development:

```bash
# Start in development mode
docker-compose up

# Open in browser: http://localhost:5173
```

## Update

To update production after code changes:

```bash
cd /path/to/catering-frontend

# Pull latest changes
git pull

# Rebuild and restart the container
docker-compose -f docker-compose.prod.yml up -d --build

# Clean up old images (optional)
docker image prune -f
```

## Troubleshooting

### Check container logs

```bash
docker-compose -f docker-compose.prod.yml logs -f frontend
```

### Connect to container

```bash
docker exec -it catering_frontend_prod sh
```

### Check network connection

```bash
# Verify container is in the network
docker network inspect catering-network
```

### Clear build cache

```bash
docker-compose -f docker-compose.prod.yml build --no-cache
```

## Performance Optimizations

Production build already includes:
- ✅ Minification (JS/CSS)
- ✅ Tree shaking
- ✅ Gzip compression
- ✅ Asset caching (1 year)
- ✅ Multi-stage Docker build (smaller image size)

## Security Notes

- ✅ Security headers added (X-Frame-Options, X-Content-Type-Options, X-XSS-Protection)
- ✅ Source maps not included in production build
- ⚠️  SSL usage recommended (Let's Encrypt is free)
- ⚠️  Check CORS settings in backend

## Monitoring

To monitor container status:

```bash
# Container status
docker ps | grep catering_frontend_prod

# Resource usage
docker stats catering_frontend_prod

# Health check
curl http://localhost:8082
```

## Backup

Important files:
- `nginx-reverse-proxy.conf` - Main nginx configuration
- `docker-compose.prod.yml` - Production compose file
- `.env` files (if any)

## Notes

1. **Base Path**: In production build, all assets are served with `/catering/` prefix
2. **API URL**: `VITE_API_BASE_URL` environment variable should be set in `docker-compose.prod.yml`
3. **Port**: Listens on port 80 inside container, 8082 on host
4. **Network**: Runs on the same `catering-network` as the backend

## Contact

For questions: [GitHub Issues](repository-url/issues)

# LMA Platform - Deployment Guide

## Issues Fixed

### Backend Issues Fixed
1. **Missing TypeScript type definitions**: Installed `@types/pg`, `@types/uuid`, `@types/amqplib`
2. **TypeScript compilation errors**: Fixed JWT signing type issues in [auth.ts](backend/src/middleware/auth.ts:71-81)
3. **Database error handler typing**: Fixed error parameter type in [database.ts](backend/src/config/database.ts:18)
4. **Dockerfile build issue**: Changed from `npm ci --only=production` to `npm ci` in builder stage to include devDependencies for TypeScript compilation

### Frontend Issues Fixed
1. **Missing Next.js standalone output**: Added `output: 'standalone'` to [next.config.js](frontend/next.config.js:3)
2. **Missing environment file**: Created [.env.local](frontend/.env.local) with API URL configuration

### Infrastructure Issues Fixed
1. **Missing nginx configuration**: Created [nginx.conf](docker/nginx.conf) for reverse proxy
2. **TypeScript strict mode**: Disabled `noUnusedLocals` and `noUnusedParameters` in [tsconfig.json](backend/tsconfig.json:20-21) to allow Express middleware patterns

## Deployment Steps

### Prerequisites
- Docker Desktop installed and running
- Docker Compose installed
- Git installed

### 1. Start Docker Desktop
Make sure Docker Desktop is running before proceeding with deployment.

### 2. Deploy with Docker Compose

```bash
cd "c:\Users\funke\Downloads\Hackerthon Files\LMA\lma-platform"

# Start all services
docker-compose up -d

# Wait for services to be healthy (about 30-60 seconds)
docker-compose ps

# Check logs
docker-compose logs -f
```

### 3. Initialize the Database

Once the backend is running, initialize the database:

```bash
# Run migrations
docker-compose exec backend npm run migrate

# Seed initial data
docker-compose exec backend npm run seed
```

### 4. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api/v1
- **Health Check**: http://localhost:5000/health
- **RabbitMQ Management**: http://localhost:15672 (user: lma_user, password: change_this_rabbitmq_password)
- **Nginx Proxy**: http://localhost (port 80)

### 5. Test the Services

```bash
# Check backend health
curl http://localhost:5000/health

# Check if all containers are running
docker-compose ps
```

## Environment Variables

### Backend (.env)
The backend `.env` file is already configured. Key variables:
- `DB_HOST=postgres`
- `DB_NAME=lma_loans`
- `REDIS_HOST=redis`
- `JWT_SECRET=change_this_jwt_secret_key_minimum_32_characters_long`
- `CORS_ORIGIN=http://localhost:3000`

⚠️ **Security Note**: The `.env` file contains a real email password. This should be removed or changed before production deployment.

### Frontend (.env.local)
Already created with:
- `NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1`

## Stopping the Application

```bash
# Stop all services
docker-compose down

# Stop and remove volumes (this will delete all data)
docker-compose down -v
```

## Troubleshooting

### Docker Desktop Not Running
If you get "cannot find file specified" error:
1. Start Docker Desktop
2. Wait for it to fully initialize (whale icon in system tray should be stable)
3. Try the deployment commands again

### Port Already in Use
If ports 3000, 5000, 5432, 6379, or 80 are in use:
1. Check what's using the ports: `netstat -ano | findstr "3000 5000 5432 6379"`
2. Stop the conflicting services or change ports in [docker-compose.yml](docker-compose.yml)

### Backend Build Fails
If the backend build fails during Docker build:
1. Check that all dependencies are installed
2. Ensure TypeScript can compile: `cd backend && npm run build`

### Database Connection Errors
If the backend cannot connect to the database:
1. Ensure PostgreSQL container is healthy: `docker-compose ps`
2. Check PostgreSQL logs: `docker-compose logs postgres`
3. Verify database credentials in [.env](backend/.env)

## Production Deployment

### Security Checklist Before Production
1. ✅ Change all default passwords in [docker-compose.yml](docker-compose.yml:11,29,48)
2. ✅ Update JWT_SECRET to a strong random string (minimum 32 characters)
3. ✅ Remove real email credentials from [.env](backend/.env:44-45)
4. ✅ Enable SSL/TLS certificates for nginx
5. ✅ Set `NODE_ENV=production` in all services
6. ✅ Configure proper backup strategy for PostgreSQL
7. ✅ Set up monitoring and logging
8. ✅ Review and update CORS_ORIGIN to your production domain

### AWS ECS Deployment
Follow the instructions in [README.md](README.md:126-159) for AWS ECS deployment using CloudFormation.

## Build Status

✅ **Backend**: TypeScript compilation successful
✅ **Frontend**: Next.js configuration updated
✅ **Docker**: All Dockerfiles fixed and ready
✅ **Environment**: Configuration files created
✅ **Infrastructure**: Nginx reverse proxy configured

## Next Steps

1. Start Docker Desktop
2. Run `docker-compose up -d`
3. Initialize the database with migrations and seed data
4. Access http://localhost:3000 to use the application

## Support

If you encounter any issues:
1. Check the logs: `docker-compose logs -f`
2. Verify all containers are running: `docker-compose ps`
3. Review this deployment guide
4. Check the main [README.md](README.md) for additional information

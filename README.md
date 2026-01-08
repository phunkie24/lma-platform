# LMA Edge - Loan Market Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-red.svg)](https://opensource.org/licenses/MIT)
[![Node](https://img.shields.io/badge/Node-20.x-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue.svg)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://www.docker.com/)

## 🏆 LMA Hackathon Submission

A production-ready, enterprise-grade loan management platform built for the Loan Market Association (LMA) Edge Hackathon. This platform revolutionizes loan origination, documentation, trading, and analytics with modern technology and exceptional user experience.

## ✨ Features

### 🎯 Core Capabilities
- **Digital Loan Origination**: Automated workflows with KYC, credit scoring, and risk assessment
- **Smart Documentation**: Template-based document generation with e-signature integration
- **Secondary Trading**: Real-time loan trading platform with order matching
- **ESG Analytics**: Environmental, Social, and Governance scoring for sustainable lending
- **Compliance**: Built-in regulatory compliance and audit trail

### 🛡️ Security & Performance
- **Enterprise Security**: JWT authentication, role-based access control, encrypted data
- **High Performance**: Redis caching, connection pooling, optimized queries
- **Scalable Architecture**: Microservices-ready, containerized, cloud-native
- **Production-Ready**: Health checks, monitoring, logging, error handling

### 🎨 Modern UI/UX
- **Distinctive Design**: Bold red and white color scheme inspired by financial power and precision
- **Responsive**: Mobile-first design with fluid layouts
- **Accessible**: WCAG 2.1 compliant with semantic HTML
- **Performant**: Optimized assets, lazy loading, code splitting

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Load Balancer (Nginx)                   │
└─────────────────────────────────────────────────────────────┘
                    │                      │
       ┌────────────┴───────┐   ┌─────────┴──────────┐
       │   Frontend          │   │   Backend API      │
       │   Next.js/React     │   │   Node.js/Express  │
       │   Port: 3000        │   │   Port: 5000       │
       └─────────────────────┘   └────────────────────┘
                                          │
              ┌───────────────────────────┼──────────────┐
              │                           │              │
    ┌─────────┴────────┐   ┌─────────────┴───┐   ┌──────┴──────┐
    │   PostgreSQL     │   │   Redis Cache   │   │  RabbitMQ   │
    │   (Primary DB)   │   │   (Session)     │   │  (Queue)    │
    └──────────────────┘   └─────────────────┘   └─────────────┘
```

## 🚀 Quick Start

### Prerequisites
- Node.js 20.x or higher
- Docker & Docker Compose
- PostgreSQL 16+ (or use Docker)
- Redis 7+ (or use Docker)

### Local Development (Docker)

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/lma-platform.git
cd lma-platform
```

2. **Set up environment variables**
```bash
# Backend
cp backend/.env.example backend/.env
# Edit backend/.env with your configurations

# Frontend
cp frontend/.env.example frontend/.env
# Edit frontend/.env with your configurations
```

3. **Start all services with Docker Compose**
```bash
docker-compose up -d
```

4. **Initialize the database**
```bash
docker-compose exec backend npm run migrate
docker-compose exec backend npm run seed
```

5. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- API Health: http://localhost:5000/health
- RabbitMQ Management: http://localhost:15672

### Manual Development Setup

#### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials
npm run dev
```

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 📦 Deployment

### Docker Deployment

Build and run with Docker Compose:
```bash
docker-compose -f docker-compose.yml up --build -d
```

### AWS ECS Deployment

1. **Build and push Docker images**
```bash
# Build backend
cd backend
docker build -t your-ecr-repo/lma-backend:latest .
docker push your-ecr-repo/lma-backend:latest

# Build frontend
cd frontend
docker build -t your-ecr-repo/lma-frontend:latest .
docker push your-ecr-repo/lma-frontend:latest
```

2. **Deploy with CloudFormation**
```bash
aws cloudformation create-stack \
  --stack-name lma-platform-production \
  --template-body file://k8s/aws-ecs-cloudformation.yaml \
  --parameters \
    ParameterKey=BackendImage,ParameterValue=your-ecr-repo/lma-backend:latest \
    ParameterKey=FrontendImage,ParameterValue=your-ecr-repo/lma-frontend:latest \
    ParameterKey=DBPassword,ParameterValue=your-secure-password \
    ParameterKey=JWTSecret,ParameterValue=your-jwt-secret \
  --capabilities CAPABILITY_IAM
```

3. **Monitor deployment**
```bash
aws cloudformation describe-stacks \
  --stack-name lma-platform-production \
  --query 'Stacks[0].StackStatus'
```

## 🗄️ Database Schema

The platform uses PostgreSQL with the following main tables:
- **users**: User accounts and authentication
- **loans**: Loan applications and details
- **documents**: Loan documentation and e-signatures
- **trades**: Secondary market trading records
- **payments**: Payment schedules and history
- **analytics**: ESG scores and risk metrics
- **audit_logs**: Complete audit trail

See `database/schema.sql` for the complete schema.

## 🔑 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/auth/me` - Get current user
- `PUT /api/v1/auth/me` - Update profile

### Loans
- `POST /api/v1/loans` - Create loan
- `GET /api/v1/loans` - List loans (with filters)
- `GET /api/v1/loans/:id` - Get loan details
- `PUT /api/v1/loans/:id` - Update loan
- `PATCH /api/v1/loans/:id/status` - Update loan status
- `POST /api/v1/loans/:id/esg-score` - Calculate ESG score
- `POST /api/v1/loans/:id/risk-assessment` - Assess risk

### Documents
- `GET /api/v1/documents` - List documents
- `GET /api/v1/documents/loan/:loanId` - Get loan documents
- `POST /api/v1/documents/generate` - Generate document

### Trades
- `GET /api/v1/trades` - List trades
- `POST /api/v1/trades` - Create trade listing

### Analytics
- `GET /api/v1/analytics/dashboard` - Analytics dashboard
- `GET /api/v1/analytics/portfolio` - Portfolio analytics

## 🧪 Testing

### Run tests
```bash
# Backend tests
cd backend
npm test
npm run test:coverage

# Frontend tests
cd frontend
npm test
```

## 📊 Sample Data

Training data for loans is provided in `docs/training-data-loans.csv` with 50 realistic loan records covering various industries, amounts, and credit profiles.

## 🔒 Security

- **Authentication**: JWT-based with secure token management
- **Authorization**: Role-based access control (RBAC)
- **Encryption**: Data at rest (AES-256) and in transit (TLS 1.3)
- **SQL Injection**: Parameterized queries with prepared statements
- **XSS Prevention**: Input sanitization and output encoding
- **CSRF Protection**: CSRF tokens for state-changing operations
- **Rate Limiting**: API rate limiting to prevent abuse
- **Security Headers**: Helmet.js for HTTP security headers

## 🌍 Environment Variables

### Backend (.env)
```env
NODE_ENV=production
PORT=5000
DB_HOST=postgres
DB_PORT=5432
DB_NAME=lma_loans
DB_USER=lma_user
DB_PASSWORD=your_secure_password
REDIS_HOST=redis
REDIS_PORT=6379
JWT_SECRET=your_jwt_secret_minimum_32_chars
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

## 📈 Monitoring & Observability

- **Health Checks**: `/health` endpoint for service monitoring
- **Logging**: Structured logging with Winston
- **Metrics**: Application and business metrics
- **Error Tracking**: Comprehensive error logging and reporting
- **Audit Trail**: Complete audit log of all operations

## 🤝 Contributing

This is a hackathon submission, but contributions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏆 Hackathon Details

**Event**: LMA Edge Hackathon 2024  
**Category**: Full Platform - Digital Loans, Documentation, Trading, Analytics  
**Tech Stack**: TypeScript, Node.js, React, Next.js, PostgreSQL, Redis, Docker  
**Deployment**: AWS ECS Fargate with CloudFormation  

## 📞 Support

For questions or support, please contact:
- Email: support@lmaedge.com
- Documentation: https://docs.lmaedge.com
- Issues: https://github.com/yourusername/lma-platform/issues

## 🎉 Acknowledgments

- Loan Market Association for organizing the hackathon
- Open source community for the amazing tools and libraries
- All contributors and testers

---

**Built with ❤️ and ☕ for the LMA Edge Hackathon**

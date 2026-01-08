# 🚀 LMA Edge Platform - Quick Start Guide

## What You Have

A complete, production-ready loan management platform with:

✅ **Full Backend API** (Node.js/TypeScript/Express)
✅ **Modern Frontend** (Next.js/React/TypeScript)  
✅ **PostgreSQL Database** with complete schema
✅ **Redis Caching** for performance
✅ **Docker Configuration** for easy deployment
✅ **AWS ECS Deployment** with CloudFormation
✅ **Comprehensive Documentation**
✅ **Sample Training Data** (50 realistic loans)

## 🎯 Core Features

### 1. Digital Loan Origination
- Complete loan application workflow
- KYC & credit verification integration
- Automated risk assessment
- Approval workflows

### 2. Document Management
- Template-based generation
- E-signature integration ready
- Version control & audit trail

### 3. Secondary Trading
- Real-time loan marketplace
- Order matching engine
- Trade settlement tracking

### 4. ESG & Analytics
- Environmental, Social, Governance scoring
- Risk rating algorithms
- Portfolio analytics dashboard

## 🎨 Design

**Bold Red & White Theme**
- Professional financial aesthetic
- High contrast for clarity
- Responsive & mobile-ready
- WCAG 2.1 accessible

## 📦 Project Structure

```
lma-platform/
├── backend/                 # Node.js/Express API
│   ├── src/
│   │   ├── server.ts       # Main server
│   │   ├── config/         # Database, Redis configs
│   │   ├── middleware/     # Auth, validation
│   │   ├── routes/         # API endpoints
│   │   ├── services/       # Business logic
│   │   └── ...
│   ├── Dockerfile
│   └── package.json
│
├── frontend/               # Next.js/React app
│   ├── src/
│   │   ├── app/           # Pages (Next.js 14)
│   │   ├── lib/           # API client
│   │   ├── store/         # State management
│   │   ├── styles/        # Global CSS
│   │   └── ...
│   ├── Dockerfile
│   └── package.json
│
├── database/              # PostgreSQL schema
│   └── schema.sql        # Complete DB structure
│
├── docker-compose.yml    # All services
├── deploy.sh            # One-command deploy
├── README.md            # Full documentation
│
├── docs/
│   ├── SUBMISSION.md              # Hackathon submission
│   ├── training-data-loans.csv    # Sample data
│   └── ...
│
└── k8s/
    └── aws-ecs-cloudformation.yaml  # AWS deployment
```

## ⚡ Quick Start (3 Commands)

### Option 1: Docker (Recommended)
```bash
cd lma-platform
chmod +x deploy.sh
./deploy.sh
```

**That's it!** The script will:
- Check prerequisites
- Set up environment files
- Build and start all services
- Initialize the database
- Show you access URLs

### Option 2: Manual Setup
```bash
# 1. Start services
cd lma-platform
docker-compose up -d

# 2. Wait for services
sleep 10

# 3. Initialize database
docker-compose exec backend npm run migrate
docker-compose exec backend npm run seed
```

## 🌐 Access Your Platform

After deployment:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/health
- **RabbitMQ UI**: http://localhost:15672

## 🔐 Demo Credentials

```
Email:    admin@lmaplatform.com
Password: admin123
```

## 📊 API Endpoints

### Authentication
```
POST /api/v1/auth/register  # Register user
POST /api/v1/auth/login     # Login
GET  /api/v1/auth/me        # Get profile
```

### Loans
```
POST   /api/v1/loans              # Create loan
GET    /api/v1/loans              # List loans
GET    /api/v1/loans/:id          # Get loan
PUT    /api/v1/loans/:id          # Update loan
PATCH  /api/v1/loans/:id/status   # Update status
POST   /api/v1/loans/:id/esg-score    # Calculate ESG
POST   /api/v1/loans/:id/risk-assessment  # Assess risk
```

### Documents, Trades, Analytics
```
GET /api/v1/documents
GET /api/v1/trades
GET /api/v1/analytics/dashboard
```

## 🔧 Environment Variables

### Backend (.env)
```env
NODE_ENV=production
PORT=5000
DB_HOST=postgres
DB_NAME=lma_loans
DB_USER=lma_user
DB_PASSWORD=your_secure_password
REDIS_HOST=redis
JWT_SECRET=your_jwt_secret_min_32_chars
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

## 🚀 AWS Deployment

```bash
# 1. Build and push Docker images
docker build -t your-repo/lma-backend:latest ./backend
docker push your-repo/lma-backend:latest

docker build -t your-repo/lma-frontend:latest ./frontend
docker push your-repo/lma-frontend:latest

# 2. Deploy with CloudFormation
aws cloudformation create-stack \
  --stack-name lma-platform \
  --template-body file://k8s/aws-ecs-cloudformation.yaml \
  --parameters \
    ParameterKey=BackendImage,ParameterValue=your-repo/lma-backend:latest \
    ParameterKey=FrontendImage,ParameterValue=your-repo/lma-frontend:latest \
    ParameterKey=DBPassword,ParameterValue=secure-password \
    ParameterKey=JWTSecret,ParameterValue=your-jwt-secret \
  --capabilities CAPABILITY_IAM
```

## 📚 Key Files to Review

1. **README.md** - Complete documentation
2. **docs/SUBMISSION.md** - Hackathon submission details
3. **database/schema.sql** - Database structure
4. **docs/training-data-loans.csv** - Sample data
5. **backend/src/server.ts** - Backend entry point
6. **frontend/src/app/page.tsx** - Frontend home page

## 🎯 Testing the Platform

### 1. Register a New User
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!",
    "first_name": "Test",
    "last_name": "User",
    "role": "lender"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!"
  }'
```

### 3. Create a Loan
```bash
curl -X POST http://localhost:5000/api/v1/loans \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "borrower_id": "USER_ID",
    "loan_type": "term",
    "amount": 1000000,
    "interest_rate": 0.045,
    "term_months": 60,
    "purpose": "Business expansion"
  }'
```

## 🛠️ Development

### Backend Development
```bash
cd backend
npm install
npm run dev  # Starts on port 5000
```

### Frontend Development
```bash
cd frontend
npm install
npm run dev  # Starts on port 3000
```

## 📈 Monitoring

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Health Checks
```bash
# Backend health
curl http://localhost:5000/health

# Database check
docker-compose exec postgres psql -U lma_user -d lma_loans -c "SELECT COUNT(*) FROM loans;"
```

## 🛑 Stopping the Platform

```bash
# Stop all services
docker-compose down

# Stop and remove volumes (clean slate)
docker-compose down -v
```

## ❓ Troubleshooting

### Services won't start
```bash
# Check Docker is running
docker ps

# Check logs
docker-compose logs

# Rebuild from scratch
docker-compose down -v
docker-compose up --build -d
```

### Database connection errors
```bash
# Check PostgreSQL is running
docker-compose ps postgres

# Check database exists
docker-compose exec postgres psql -U lma_user -l
```

### Port already in use
```bash
# Find process using port
lsof -i :3000  # or :5000
# Kill the process or change ports in docker-compose.yml
```

## 🎓 Learning Resources

- **Backend**: Express.js, TypeScript, PostgreSQL
- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **DevOps**: Docker, AWS ECS, CloudFormation
- **Security**: JWT, bcrypt, OWASP best practices

## 💡 Next Steps

1. ✅ Deploy locally with Docker
2. ✅ Explore the frontend UI
3. ✅ Test API endpoints
4. ✅ Review the code structure
5. ✅ Customize for your needs
6. ✅ Deploy to AWS (optional)
7. ✅ Submit to hackathon!

## 🏆 Hackathon Submission

All files needed for the hackathon are included:
- ✅ Working code
- ✅ Documentation
- ✅ Architecture diagrams
- ✅ Deployment scripts
- ✅ Sample data
- ✅ Demo ready

## 📞 Support

Questions? Issues? Check:
1. README.md for detailed docs
2. docs/SUBMISSION.md for hackathon details
3. GitHub Issues (when published)

---

**Built with ❤️ for the LMA Edge Hackathon 2024**

*Transform Your Loan Operations Today!*

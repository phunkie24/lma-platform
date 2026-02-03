# LMA Platform - User Credentials & Access Guide

## ✅ Application Successfully Deployed!

All services are running and healthy. You can now access the full LMA Platform.

---

## 🌐 Access URLs

- **Frontend Application**: http://localhost:3000
- **Backend API**: http://localhost:5000/api/v1
- **API Health Check**: http://localhost:5000/health
- **RabbitMQ Management**: http://localhost:15672
- **Nginx Proxy**: http://localhost (port 80)

---

## 👥 Demo User Accounts

The following test accounts have been created for you:

### 1. Administrator Account
```
Email:    admin@lma.com
Password: admin123456
Role:     admin
```
**Capabilities:**
- Full system access
- User management
- System configuration
- All loan operations
- Analytics and reporting

### 2. Lender Account
```
Email:    lender@lma.com
Password: lender123456
Role:     lender
Organization: Capital Bank
```
**Capabilities:**
- Create and manage loan offerings
- Review loan applications
- Approve/reject loans
- Secondary market trading
- Portfolio analytics

### 3. Borrower Account
```
Email:    borrower@lma.com
Password: borrower123456
Role:     borrower
Organization: Tech Startup Inc
```
**Capabilities:**
- Apply for loans
- Upload documents
- Track application status
- View loan terms
- Make payments

---

## 🚀 Getting Started

### Option 1: Login with Existing Account
1. Go to http://localhost:3000
2. Click "Login" in the navigation bar
3. Use any of the credentials above
4. You'll be redirected to the dashboard

### Option 2: Create New Account
1. Go to http://localhost:3000
2. Click "Sign up for free" or "Get Started"
3. Fill in the registration form:
   - Email address
   - Password (minimum 8 characters)
   - First name and Last name
   - Account type (Borrower, Lender, Arranger, Trader, Compliance, Admin)
   - Organization (optional)
   - Phone number (optional)
4. Click "Create Account"
5. You'll be automatically logged in and redirected to the dashboard

---

## 🔑 Available Account Roles

When creating a new account, you can choose from these roles:

1. **Borrower** - For individuals or businesses seeking loans
2. **Lender** - For financial institutions providing loans
3. **Arranger** - For loan arrangers and brokers
4. **Trader** - For secondary market trading
5. **Compliance Officer** - For regulatory compliance and monitoring
6. **Administrator** - For system administration and full access

---

## 📊 Features Available

Once logged in, you can access:

- **Digital Loan Origination**
  - Create loan applications
  - Automated KYC verification
  - Credit scoring
  - Real-time decision engines

- **Smart Documentation**
  - Generate compliant documents
  - E-signature integration
  - Version control
  - Audit trails

- **Secondary Market Trading**
  - Real-time pricing
  - Automated matching
  - Instant settlement

- **ESG & Compliance**
  - ESG scoring
  - Risk assessment
  - Regulatory reporting
  - Automated alerts

---

## 🔐 Security Notes

### Current Setup (Development)
- Passwords are hashed using bcrypt
- JWT tokens for authentication
- 7-day token expiration
- 30-day refresh token expiration

### For Production Deployment
Before deploying to production, ensure you:
1. Change all default passwords
2. Update JWT secrets to strong random strings (32+ characters)
3. Enable HTTPS/SSL
4. Configure proper CORS origins
5. Set up database SSL connections
6. Review and update security headers
7. Enable rate limiting
8. Set up proper logging and monitoring

---

## 📱 API Access

All demo accounts can also access the API directly:

### Login via API
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@lma.com",
    "password": "admin123456"
  }'
```

### Register via API
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "securepassword",
    "first_name": "John",
    "last_name": "Doe",
    "role": "borrower",
    "organization": "My Company",
    "phone": "+1234567890"
  }'
```

### Use API with Token
```bash
# Get your token from login response
TOKEN="your_jwt_token_here"

# Make authenticated requests
curl -X GET http://localhost:5000/api/v1/loans \
  -H "Authorization: Bearer $TOKEN"
```

---

## 🛠️ Troubleshooting

### Cannot Login
1. Verify the services are running: `docker-compose ps`
2. Check backend logs: `docker-compose logs backend`
3. Ensure you're using the correct credentials from this document
4. Clear browser cache and cookies

### Register Page Shows 404
- This issue has been fixed!
- The register page is now available at: http://localhost:3000/register

### Email Already Exists Error
- Try using a different email address
- Or login with the existing account

### Password Too Short Error
- Passwords must be at least 8 characters long
- Demo accounts use passwords like "admin123456"

---

## 📞 Support

For issues or questions:
1. Check the [DEPLOYMENT.md](DEPLOYMENT.md) file for deployment troubleshooting
2. Review application logs: `docker-compose logs -f`
3. Check service health: `curl http://localhost:5000/health`

---

## 🎯 Next Steps

Now that you're logged in, you can:

1. **Explore the Dashboard** - View key metrics and analytics
2. **Create a Loan Application** - Test the loan origination flow
3. **Upload Documents** - Try the document management system
4. **Browse the Trading Platform** - Explore secondary market features
5. **Review ESG Scores** - Check out the ESG analytics
6. **Test Different Roles** - Login with different accounts to see role-based access

---

**Happy Testing! 🚀**

Your LMA Platform is fully operational and ready for use!

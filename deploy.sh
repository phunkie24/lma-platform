#!/bin/bash

# LMA Platform Deployment Script
# This script sets up and deploys the LMA Loan Platform

set -e

echo "🚀 LMA Platform Deployment Script"
echo "=================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ $1${NC}"
}

# Check prerequisites
check_prerequisites() {
    print_info "Checking prerequisites..."
    
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed. Please install Docker first."
        exit 1
    fi
    print_success "Docker is installed"
    
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi
    print_success "Docker Compose is installed"
    
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 20+ first."
        exit 1
    fi
    print_success "Node.js is installed"
}

# Setup environment files
setup_env_files() {
    print_info "Setting up environment files..."
    
    if [ ! -f backend/.env ]; then
        cp backend/.env.example backend/.env
        print_success "Created backend/.env"
    else
        print_info "backend/.env already exists"
    fi
    
    if [ ! -f frontend/.env.local ]; then
        echo "NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1" > frontend/.env.local
        print_success "Created frontend/.env.local"
    else
        print_info "frontend/.env.local already exists"
    fi
}

# Build and start services
start_services() {
    print_info "Building and starting services..."
    
    docker-compose down -v
    docker-compose up -d --build
    
    print_success "Services started"
    
    # Wait for services to be healthy
    print_info "Waiting for services to be healthy..."
    sleep 10
    
    # Check health
    if curl -f http://localhost:5000/health > /dev/null 2>&1; then
        print_success "Backend is healthy"
    else
        print_error "Backend health check failed"
    fi
}

# Initialize database
init_database() {
    print_info "Initializing database..."
    
    # Wait for postgres to be ready
    print_info "Waiting for PostgreSQL..."
    sleep 5
    
    # Run migrations
    docker-compose exec -T backend npm run migrate || true
    print_success "Database schema created"
    
    # Run seed
    docker-compose exec -T backend npm run seed || true
    print_success "Seed data loaded"
}

# Display access information
display_info() {
    echo ""
    echo "=================================="
    print_success "LMA Platform is now running!"
    echo "=================================="
    echo ""
    echo "🌐 Application URLs:"
    echo "   Frontend:    http://localhost:3000"
    echo "   Backend API: http://localhost:5000"
    echo "   API Health:  http://localhost:5000/health"
    echo "   RabbitMQ:    http://localhost:15672"
    echo ""
    echo "📊 Default Credentials:"
    echo "   Email:    admin@lmaplatform.com"
    echo "   Password: admin123"
    echo ""
    echo "📚 Documentation:"
    echo "   See README.md for full documentation"
    echo ""
    echo "🛑 To stop: docker-compose down"
    echo "📝 To view logs: docker-compose logs -f"
    echo ""
}

# Main deployment flow
main() {
    echo "Starting deployment..."
    echo ""
    
    check_prerequisites
    setup_env_files
    start_services
    init_database
    display_info
    
    print_success "Deployment completed successfully!"
}

# Run main function
main

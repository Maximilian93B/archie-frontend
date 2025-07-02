#!/bin/bash

# Setup script for Stripe CLI in WSL
echo "🚀 Setting up Stripe CLI for WSL..."

# Download and install Stripe CLI for Linux
echo "📦 Downloading Stripe CLI..."
curl -s https://packages.stripe.dev/api/security/keypair/stripe-cli-gpg/public | gpg --dearmor | sudo tee /usr/share/keyrings/stripe.gpg
echo "deb [signed-by=/usr/share/keyrings/stripe.gpg] https://packages.stripe.dev/stripe-cli-debian-local stable main" | sudo tee -a /etc/apt/sources.list.d/stripe.list
sudo apt update
sudo apt install stripe -y

echo "✅ Stripe CLI installed!"

# Login to Stripe
echo "🔐 Logging into Stripe..."
stripe login

# Create a local test script
cat > test-stripe-webhooks.sh << 'EOF'
#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🎯 Starting Stripe webhook forwarding...${NC}"
echo -e "${YELLOW}Make sure your backend is running on port 8080${NC}"

# Start webhook forwarding
stripe listen --forward-to localhost:8080/api/v1/webhook/stripe --print-json

EOF

chmod +x test-stripe-webhooks.sh

echo "✅ Created test-stripe-webhooks.sh"
echo ""
echo "📋 Next steps:"
echo "1. Run your backend: cd ../archivus-backend && go run main.go"
echo "2. In another terminal: ./test-stripe-webhooks.sh"
echo "3. Copy the webhook secret (whsec_xxxx) to your backend .env"
echo "4. Run your frontend: npm run dev"
echo "5. Test the checkout flow!"
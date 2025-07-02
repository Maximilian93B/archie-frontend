#!/bin/bash

# Quick start script for Stripe testing
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🚀 Starting Stripe Test Environment${NC}"
echo ""

# Check if stripe CLI is installed
if ! command -v stripe &> /dev/null; then
    echo -e "${YELLOW}⚠️  Stripe CLI not found. Installing...${NC}"
    ./scripts/setup-stripe-cli-wsl.sh
fi

# Start webhook forwarding in background
echo -e "${GREEN}📡 Starting webhook forwarding...${NC}"
echo -e "${YELLOW}Copy the webhook secret (whsec_xxx) to your backend .env${NC}"
echo ""

# Function to cleanup on exit
cleanup() {
    echo -e "\n${YELLOW}Stopping webhook forwarding...${NC}"
    kill $WEBHOOK_PID 2>/dev/null
    exit 0
}

trap cleanup EXIT INT TERM

# Start stripe listen in background and capture PID
stripe listen --forward-to localhost:8080/api/v1/webhook/stripe --print-json &
WEBHOOK_PID=$!

echo ""
echo -e "${GREEN}✅ Webhook forwarding started (PID: $WEBHOOK_PID)${NC}"
echo ""
echo -e "${BLUE}📋 Test Steps:${NC}"
echo "1. Make sure your backend is running on port 8080"
echo "2. In another terminal: npm run dev"
echo "3. Open http://localhost:3000/pricing"
echo "4. Use test card: 4242 4242 4242 4242"
echo ""
echo -e "${YELLOW}Press Ctrl+C to stop webhook forwarding${NC}"

# Keep script running
wait $WEBHOOK_PID
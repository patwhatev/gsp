#!/bin/bash

# Deploy script for gay-sexy-penis blog
# Combines build, git operations, and Vercel deployment

set -e  # Exit on any error

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Starting deployment process...${NC}"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: Not in project root directory${NC}"
    exit 1
fi

# Check Node version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
    echo -e "${YELLOW}⚠️  Warning: Using Node $NODE_VERSION, but Node 20+ is recommended${NC}"
fi

# Check for uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo -e "${YELLOW}📝 Found uncommitted changes...${NC}"
    git status --short
    echo ""
    read -p "Continue with deployment? (y/N): " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${YELLOW}🛑 Deployment cancelled${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✅ Git working directory clean${NC}"
fi

# Build the project
echo -e "${GREEN}🔨 Building project...${NC}"
if npm run build; then
    echo -e "${GREEN}✅ Build completed successfully${NC}"
else
    echo -e "${RED}❌ Build failed${NC}"
    exit 1
fi

# Git operations
echo -e "${GREEN}📦 Committing changes...${NC}"
git add .
COMMIT_MSG="Deploy: $(date '+%Y-%m-%d %H:%M:%S')"
git commit -m "$COMMIT_MSG" || echo -e "${YELLOW}⚠️  No changes to commit${NC}"

echo -e "${GREEN}⬆️  Pushing to repository...${NC}"
git push

# Deploy to Vercel
echo -e "${GREEN}🌐 Deploying to Vercel...${NC}"
if command -v vercel &> /dev/null; then
    vercel --prod
    echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
    echo -e "${GREEN}Your site should be live at: https://gaysexypenis.com${NC}"
else
    echo -e "${RED}❌ Vercel CLI not found. Please install with: npm i -g vercel${NC}"
    exit 1
fi

echo -e "${GREEN}✨ All done!${NC}"
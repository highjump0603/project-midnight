#!/bin/bash
# ─────────────────────────────────────────────────────────────
# Project Midnight — Auto Deploy Script
# 서버에서 실행: bash /var/www/project-midnight/deploy.sh
# GitHub Actions에서도 이 스크립트를 호출함
# ─────────────────────────────────────────────────────────────
set -e

PROJECT_DIR="/var/www/project-midnight"
FRONTEND_DIR="$PROJECT_DIR/frontend"
BACKEND_DIR="$PROJECT_DIR/backend"

echo "🌙 [$(date '+%Y-%m-%d %H:%M:%S')] Deploying Project Midnight..."

# ── 1. 최신 코드 pull ────────────────────────────────────────
cd "$PROJECT_DIR"
git pull origin main
echo "✓ Git pull complete"

# ── 2. 백엔드 업데이트 ──────────────────────────────────────
cd "$BACKEND_DIR"
source venv/bin/activate
pip install -r requirements.txt --quiet
alembic upgrade head
echo "✓ Backend dependencies & migrations done"

# 백엔드 재시작 (systemd)
sudo systemctl restart midnight-backend
echo "✓ Backend restarted"

# ── 3. 프론트엔드 업데이트 ──────────────────────────────────
cd "$FRONTEND_DIR"
npm install --silent
npm run build
echo "✓ Frontend built"

# 프론트엔드 재시작 (PM2)
pm2 restart midnight-frontend
pm2 save
echo "✓ Frontend restarted"

echo ""
echo "✅ Deploy complete! → https://project-midnight.dev"

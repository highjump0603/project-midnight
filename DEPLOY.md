# Ubuntu 서버 배포 가이드

## 1. 서버 패키지 설치

```bash
# Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Python 3.11
sudo apt install -y python3.11 python3.11-venv python3-pip

# PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Nginx + Certbot
sudo apt install -y nginx certbot python3-certbot-nginx

# PM2
sudo npm install -g pm2
```

## 2. PostgreSQL 설정

```bash
sudo -u postgres psql
```
```sql
CREATE USER midnight_user WITH PASSWORD 'your_strong_password';
CREATE DATABASE midnight_db OWNER midnight_user;
GRANT ALL PRIVILEGES ON DATABASE midnight_db TO midnight_user;
\q
```

## 3. 프로젝트 배포

```bash
sudo mkdir -p /var/www/project-midnight
sudo chown $USER:$USER /var/www/project-midnight
cd /var/www/project-midnight

# 파일 복사 (또는 git clone)
cp -r /path/to/Project-Midnight/* .
```

## 4. 백엔드 설정

```bash
cd /var/www/project-midnight/backend

# 가상환경
python3.11 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# 환경 변수
cp .env.example .env
# .env 파일 편집 (nano .env)

# 어드민 비밀번호 해시 생성
python scripts/generate_admin_hash.py
# → 출력된 해시를 .env의 ADMIN_PASSWORD_HASH에 입력

# DB 마이그레이션
alembic upgrade head

# Materialized View (view_counts) 수동 생성
psql -U midnight_user -d midnight_db -c "
CREATE MATERIALIZED VIEW IF NOT EXISTS view_counts AS
    SELECT page_path, slug, COUNT(*) AS total_views
    FROM page_views
    GROUP BY page_path, slug;
CREATE UNIQUE INDEX IF NOT EXISTS idx_view_counts_path ON view_counts(page_path);
"
```

## 5. 백엔드 systemd 서비스

```bash
sudo nano /etc/systemd/system/midnight-backend.service
```
```ini
[Unit]
Description=Project Midnight FastAPI Backend
After=network.target postgresql.service

[Service]
Type=simple
User=www-data
Group=www-data
WorkingDirectory=/var/www/project-midnight/backend
Environment="PATH=/var/www/project-midnight/backend/venv/bin"
EnvironmentFile=/var/www/project-midnight/backend/.env
ExecStart=/var/www/project-midnight/backend/venv/bin/uvicorn \
    app.main:app \
    --host 127.0.0.1 \
    --port 8000 \
    --workers 2 \
    --log-level info
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```
```bash
sudo systemctl daemon-reload
sudo systemctl enable midnight-backend
sudo systemctl start midnight-backend
sudo systemctl status midnight-backend
```

## 6. 프론트엔드 설정

```bash
cd /var/www/project-midnight/frontend
cp .env.example .env.local
# .env.local 편집

npm install
npm run build

# PM2 시작
pm2 start ecosystem.config.js
pm2 startup systemd
# → 출력된 명령어 실행
pm2 save
```

## 7. Nginx 설정

```bash
# 설정 파일 복사
sudo cp /var/www/project-midnight/nginx/sites-available/project-midnight.conf \
    /etc/nginx/sites-available/project-midnight

# nginx.conf의 http 블록에 rate limit 추가
sudo nano /etc/nginx/nginx.conf
# http { ... } 블록 안에 추가:
# limit_req_zone $binary_remote_addr zone=api_limit:10m rate=30r/m;

# 사이트 활성화
sudo ln -s /etc/nginx/sites-available/project-midnight \
    /etc/nginx/sites-enabled/

sudo nginx -t
sudo systemctl reload nginx
```

## 8. SSL 인증서

```bash
# DNS가 서버 IP를 가리키고 있어야 함
sudo certbot --nginx -d project-midnight.dev -d www.project-midnight.dev

# 자동 갱신 확인
sudo certbot renew --dry-run
```

## 9. view_counts 15분 주기 갱신 cron

```bash
crontab -e
# 추가:
# */15 * * * * psql -U midnight_user -d midnight_db -c "REFRESH MATERIALIZED VIEW CONCURRENTLY view_counts;" > /dev/null 2>&1
```

## 검증

```bash
# 백엔드 health check
curl https://project-midnight.dev/api/health

# Swagger UI (개발 환경에서만)
# http://localhost:8000/docs

# 프론트엔드
curl -I https://project-midnight.dev
```

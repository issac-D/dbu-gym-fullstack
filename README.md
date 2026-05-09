DBU Gym System
================

Overview
--------
Full‑stack gym management application (backend: Laravel PHP; frontend: React + Vite). Includes user/member/admin models, payment transactions, equipment, schedules and system settings. Database schema is included in schema.txt.

Tech stack
----------
- Backend: PHP (Laravel)
- Frontend: React (Vite)
- Styling: Tailwind CSS
- DB: MySQL (migrations inferred)
- Auth/API: Laravel Sanctum (configured via .env)
- Tooling: Node.js, npm, Vite

Quick start (development)
-------------------------
Prereqs: PHP (8+), Composer, MySQL (or SQLite), Node.js (18+), npm.

1. Backend
   - cd backend
   - cp .env.example .env
   - composer install
   - npm install
   - php artisan key:generate
   - Configure DB in .env (DB_CONNECTION, DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD)
   - php artisan migrate --seed
   - npm run dev
   - php artisan serve --host=127.0.0.1 --port=8000

2. Frontend (optional local SPA)
   - cd client
   - npm install
   - npm run dev
   - Open the Vite dev server (default port 5173)

Notes
-----
- FRONTEND_URL and SANCTUM_STATEFUL_DOMAINS are present in backend/.env.example — set them if using the SPA with Sanctum.
- schema.txt contains the inferred MySQL schema if you want to create the database manually.

Useful scripts
--------------
- backend: npm run dev (build frontend assets with Vite), php artisan migrate
- client: npm run dev, npm run build

Contributing
------------
Open an issue or PR describing changes. Run tests (if added) and keep migrations in sync.

License
-------
No license specified.

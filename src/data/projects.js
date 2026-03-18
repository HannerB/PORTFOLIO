const PROFILE = "https://github.com/HannerB"

export const projects = [
    // ─────────────────────────────────────────────────────────────────
    // FULL-STACK PLATFORMS
    // ─────────────────────────────────────────────────────────────────
    {
        slug: "wedoitweb",
        category: "platform",
        year: "Dec 2025 – Jan 2026",
        title: "WeDoItBranding",
        tagline: "AI branding SaaS — full frontend built from a client brief with zero designs provided",
        image: "https://picsum.photos/seed/wedoitweb/1200/600",
        screenshots: [],
        github: PROFILE,
        githubPrivate: true,
        link: "https://wedoitweb.hanner.dev",
        tags: ["React", "TypeScript", "Three.js", "Framer Motion", "Vite", "CSS Modules", "Lottie"],
        overview:
            "Freelance Fiverr project to build the entire frontend of WeDoItBranding — an AI-powered SaaS that generates complete brand identities from a 13-question brief. The client provided no designs: only two reference sites (ClickUp, Mobbin) and a detailed written vision. After the first delivery the client was dissatisfied — 'it looks like a template.' I went back, rebuilt the hero with custom Three.js WebGL, added scroll-driven interactions and per-question visual panels, and delivered a production-grade React SPA spanning 8 fully-routed pages (landing, questionnaire, pricing, contact, help center, terms, privacy, 404) — all lazy-loaded — with a live Google Cloud Run integration that downloads generated logos and brand books directly to the user's browser. Final verdict: 'the result was excellent.'",
        problem:
            "After the first delivery the client said: 'it looks like a template — not the dynamic, interactive page I asked for.' I went back, redesigned the hero with a custom WebGL scene built from scratch, added floating brand logo animations, rebuilt the scroll section, and added per-question visual panels to the questionnaire. The final verdict: 'the result was excellent' — and an open invitation for future projects.",
        role: "Sole frontend developer. Interpreted a vague brief with no wireframes or mockups, sourced all visual assets independently (Pexels, Unsplash, Pixabay, Lottie), and delivered a complete SPA: custom Three.js 3D scene, split-screen AI questionnaire with 13 contextual visual panels, scroll-driven step animations built with native browser APIs, and a live AI pipeline that downloads real generated brand assets.",
        features: [
            { title: "Custom Three.js hero (no library wrapper)", description: "The hero has two independent visual layers. First, HeroBackground: mouse-tracking CSS gradient orbs that shift position in real time behind the headline text. Second, Hero3D: a WebGL scene built from scratch with an OctahedronGeometry crystal using MeshPhysicalMaterial (transmission + clearcoat for a glass effect), wireframe overlay, 5 independently animated floating elements (tori, boxes, icosahedron), 500-particle buffer geometry with AdditiveBlending, and 3 purple point lights that orbit dynamically. Mouse position also rotates the 3D group in real time. Pixel ratio capped at 1.5. Lazy-loaded with Suspense so the landing renders immediately while WebGL initializes in the background." },
            { title: "Live AI pipeline integration", description: "On questionnaire submission, a structured 13-field payload is POSTed to a live Google Cloud Run endpoint. The response includes a base64-encoded logo and a branding JSON. The client decodes the base64, creates a Blob URL, and triggers browser downloads for both files — no server proxy, no extra round trip." },
            { title: "Split-screen immersive questionnaire", description: "Each of the 13 questions occupies the full viewport with a dual-panel layout: left for the question input, right for a tailored contextual visual. Archetype SVGs update on selection, color atmosphere images render with dynamic gradient overlays matching each palette, logo examples auto-rotate every 5 seconds, and dedicated video loops play per question. Three Lottie loading screens appear between question blocks, cycling through AI status messages to simulate a real processing pipeline." },
            { title: "Scroll-driven 'How It Works' — no GSAP", description: "A RAF-throttled passive scroll listener calculates the user's progress through the section (0–1) and drives a filling vertical progress line, active step switching at 33%/66% thresholds, sticky content visibility, and a background of 20 repeating AutoScrollBanner rows flowing in alternating directions. All with native browser APIs — no animation library dependency." },
            { title: "Tabbed infinite carousel (24 videos)", description: "4 tabs (Color Systems, Brand Books, Vector Logos, Mockups) × 6 video items each. Tab transitions use Framer Motion AnimatePresence. The carousel is CSS-only infinite scroll — items duplicated 2× in the DOM, looped with a CSS animation. Videos load lazily via a custom LazyVideo component that observes the viewport before setting the src." },
            { title: "FinalCTA scroll-stacked logo explosion", description: "19 real brand logos (Spotify, Nike, Apple, Google, Adobe, Figma, Stripe, etc.) animate outward from center on scroll entry using per-logo CSS custom property offsets (--offset-x, --offset-y), then enter a continuous float cycle with staggered delays. Six content elements reveal progressively as the user scrolls through the pinned section — no JavaScript animation libraries used." },
        ],
        stack: {
            frontend: ["React 19", "TypeScript", "Vite 7 + SWC", "React Router 6"],
            styling: ["Tailwind CSS 3", "CSS Modules", "PostCSS", "Autoprefixer"],
            animation: ["Framer Motion 12", "Lottie React", "CSS keyframes"],
            "3d": ["Three.js 0.128"],
            ui: ["Radix UI", "Lucide React", "Magic UI components", "clsx + tailwind-merge"],
            infra: ["Vite manual chunk splitting", "esbuild minifier", "Vercel + _headers caching rules"],
        },
        highlights: [
            "No GSAP anywhere in the codebase — all scroll animations are native: IntersectionObserver for section reveals, RAF-throttled passive listeners for the step tracker, CSS keyframes for carousels. Cuts a 30KB+ dependency for behaviors achievable without it.",
            "Three.js uses MeshPhysicalMaterial with transmission and clearcoat — not the typical Lambert/Phong. Combined with ACESFilmic tone mapping and dynamic orbiting lights, it produces a convincing glass-crystal effect that justifies the WebGL overhead.",
            "Pixel ratio capped at 1.5, not the default device value. On a 4K screen this prevents rendering ~9M pixels unnecessarily. The scene stays perceptually sharp and the GPU frame budget stays under control.",
            "Five isolated vendor chunks (react, framer-motion, three, lottie, catch-all). A style change to the questionnaire CSS doesn't bust the Three.js cache — each chunk invalidates independently via content hashing.",
        ],
    },
    {
        slug: "1tomilion",
        category: "platform",
        year: "2025",
        title: "1TOMILION",
        tagline: "Online learning platform with payments, courses and digital library",
        image: "https://picsum.photos/seed/1tomilion/1200/600",
        screenshots: [],
        github: PROFILE,
        githubPrivate: true,
        link: "",
        tags: ["React", "NestJS", "Supabase", "Stripe", "TypeScript", "Vite"],
        overview:
            "1TOMILION is a complete SaaS learning platform built from scratch. Users can browse a course catalog, purchase memberships with Stripe, track their progress lesson by lesson, access a digital book library, and receive real-time notifications. Admins manage users, courses, books, categories and subscriptions from a dedicated panel.",
        problem:
            "Building a monetized e-learning platform that handles authentication, payments, content access control and progress tracking — all working reliably in production.",
        role: "Full-stack developer. Designed the system architecture, built the entire frontend and backend, configured Supabase tables with RLS policies, integrated Stripe webhooks, and deployed the application to a VPS using PM2 with automated CI/CD pipelines.",
        features: [
            { title: "Course catalog & progress tracking", description: "Students browse courses by category, preview content before purchasing, and track completion per lesson with progress bars." },
            { title: "Stripe payment integration", description: "Subscription and one-time payments via Stripe. Webhooks handle payment confirmation, access granting and subscription lifecycle." },
            { title: "Digital book library", description: "PDF reader with bookmark support, filters by category and a public preview mode for unauthenticated visitors." },
            { title: "Admin management panel", description: "Full CRUD for users, courses, books, categories and notifications. Includes user role management and subscription oversight." },
            { title: "Real-time notifications", description: "In-app notification center with read/unread state, filtering and settings panel." },
            { title: "CI/CD to VPS", description: "GitHub Actions workflows for staging and production deployments. Application managed with PM2 for process persistence and restarts." },
        ],
        stack: {
            frontend: ["React 18", "Vite", "Tailwind CSS", "shadcn/ui", "React Router"],
            backend: ["NestJS", "TypeScript", "class-validator", "Multer"],
            database: ["Supabase (PostgreSQL)", "RLS Policies", "SQL Migrations"],
            payments: ["Stripe", "Stripe Webhooks"],
            infra: ["VPS", "PM2", "GitHub Actions", "pnpm"],
        },
        highlights: [
            "Supabase RLS policies enforce row-level access so users only see their own data without server-side filtering on every query.",
            "Stripe webhook handler validates signatures and idempotently updates subscription state to handle retries safely.",
            "Split deployment: frontend served as static build, NestJS backend as a persistent PM2 process — both updated independently via separate CI workflows.",
            "SQL migration scripts tracked in repo for reproducible database state across environments.",
        ],
    },
    {
        slug: "sistema-contable-pr",
        category: "platform",
        year: "2025",
        title: "Sistema Contable PR",
        tagline: "Tax and accounting management platform for Puerto Rico",
        image: "https://picsum.photos/seed/sistemacontable/1200/600",
        screenshots: [],
        github: PROFILE,
        githubPrivate: true,
        link: "",
        tags: ["Next.js 15", "TypeScript", "Docker", "Playwright", "Zod", "Recharts"],
        overview:
            "A full-stack SaaS accounting platform built for tax professionals in Puerto Rico. Manages clients, their fiscal obligations and generates structured cotejos for over 15 different tax forms — including IVU, planillas corporativas, estimadas, informativas and more. Includes a dashboard with KPIs, an agenda, a service catalog and a team invitation system.",
        problem:
            "Tax accountants in Puerto Rico deal with dozens of form types per client with different deadlines. The platform centralizes client management and automates the tracking of pending obligations per tax type.",
        role: "Full-stack developer. Architected the Next.js App Router structure, built the backend API layer, modeled all cotejo types with TypeScript, wrote the full E2E test suite with Playwright and configured Docker + Render for deployment.",
        features: [
            { title: "15+ fiscal cotejo types", description: "Structured forms for IVU, planilla corporativa, planilla federal, estimadas individuo/corporativa, informativas, derecho anual, trimestral, and more — each with their own validation rules." },
            { title: "Client management", description: "Full CRUD for clients with detail pages, edit flows and cotejo history per client." },
            { title: "Service catalog", description: "Configurable catalog of accounting services linked to clients and billing." },
            { title: "Dashboard with KPIs", description: "Overview metrics built with Recharts — pending obligations, client count, upcoming deadlines." },
            { title: "Agenda", description: "Calendar view for scheduling client meetings and fiscal deadlines." },
            { title: "E2E test suite", description: "Playwright tests covering auth flows, client CRUD, cotejo creation and dashboard — runnable locally and in CI." },
            { title: "Team invitations", description: "Invite team members via tokenized email links with role assignment." },
        ],
        stack: {
            frontend: ["Next.js 15", "TypeScript", "Tailwind CSS", "shadcn/ui", "Recharts", "React Hook Form"],
            backend: ["Next.js API Routes", "Zod validation", "date-fns"],
            database: ["PostgreSQL", "Prisma ORM"],
            infra: ["Docker", "Render", "GitHub Actions", "Husky", "Playwright"],
        },
        highlights: [
            "Cotejo factory pattern: a single API factory function dispatches to the correct cotejo handler based on type, keeping 15+ form types consistent and testable.",
            "Zod schemas shared between frontend forms and API validation — one source of truth for data shape.",
            "Husky pre-commit hooks enforce linting and type checks before every commit, keeping the codebase clean across contributors.",
            "render.yaml defines the full deployment spec — services, environment variables and build commands — enabling one-click deploys.",
        ],
    },
    {
        slug: "proveify-back",
        category: "platform",
        year: "2025",
        title: "Proveify",
        tagline: "Backend for a B2B service-provider marketplace",
        image: "https://picsum.photos/seed/proveify/1200/600",
        screenshots: [],
        github: "https://github.com/proveify/proveify-back",
        githubPrivate: false,
        link: "",
        tags: ["NestJS", "Prisma", "WebSockets", "TypeScript", "PostgreSQL", "Google Cloud"],
        overview:
            "Proveify is the backend of a B2B marketplace where companies post service requests and providers submit quotes. Built with NestJS using a clean, modular architecture: each domain (auth, users, providers, items, categories, quotes, public requests, files) lives in its own module with controllers, services, repositories, DTOs, entities, mappers and factories.",
        problem:
            "A marketplace needs real-time communication between request posters and providers, secure file handling, strict role-based access and a codebase that stays maintainable as the domain grows.",
        role: "Backend developer. Designed the domain model with Prisma (split schema per entity), implemented all modules following repository pattern, integrated WebSockets for real-time quotes, set up Google Cloud Storage for file uploads and wrote unit tests for every module.",
        features: [
            { title: "JWT auth with refresh tokens", description: "Passport.js with local, JWT and optional-JWT strategies. Refresh token rotation with separate guard and strategy for secure session management." },
            { title: "WebSockets (Socket.io)", description: "Real-time channel for quote submissions and status updates. Socket auth middleware validates JWT on connection." },
            { title: "Google Cloud Storage", description: "File upload pipeline using nestjs-form-data. Files stored in GCS buckets with structured paths per entity type." },
            { title: "Prisma split schema", description: "Database schema divided into one .prisma file per entity (users, providers, items, categories, quotes, plans, files) for maintainability." },
            { title: "Repository pattern", description: "Each module has an abstract repository interface implemented by a Prisma-specific class — making the data layer swappable and fully testable." },
            { title: "Complete unit test suite", description: "Jest unit tests for controllers and services across all modules: auth, user, category, subcategory, item, provider, public-request, quote." },
            { title: "Swagger documentation", description: "All endpoints documented with custom decorators keeping controllers clean. Swagger UI served at /api." },
        ],
        stack: {
            backend: ["NestJS 11", "TypeScript", "Passport.js", "JWT", "WebSockets (Socket.io)"],
            database: ["PostgreSQL", "Prisma ORM 6", "Prisma Seeding"],
            storage: ["Google Cloud Storage", "nestjs-form-data"],
            infra: ["Docker", "docker-compose", "Husky", "Prettier", "Jest", "Supertest"],
        },
        highlights: [
            "Abstract repository interfaces decouple business logic from Prisma — services depend on an interface, Prisma implementation is injected via DI.",
            "Optional JWT guard allows public endpoints to optionally enrich responses with user context when a token is present, without blocking unauthenticated requests.",
            "Socket auth middleware intercepts WebSocket handshakes, validates the JWT and attaches the user to the socket — same auth model as HTTP.",
            "Prisma schema split across files using the multi-file schema feature, keeping each domain isolated without a 500-line monolithic schema.",
        ],
    },

    // ─────────────────────────────────────────────────────────────────
    // WEB APPLICATIONS
    // ─────────────────────────────────────────────────────────────────
    {
        slug: "school-management-app",
        category: "webapp",
        year: "20 Jul – 24 Aug 2025",
        title: "School Management App",
        tagline: "React ERP scaffold with role-based routing for admin, teacher, student, parent and support",
        image: "https://picsum.photos/seed/schoolmgmt/1200/600",
        screenshots: [],
        github: PROFILE,
        githubPrivate: true,
        link: "",
        tags: ["React 19", "TypeScript", "Redux Toolkit", "Ant Design", "PrimeReact", "FullCalendar"],
        overview:
            "A client delivered a raw React UI template and needed it transformed into a structured, production-ready school management system. The work involved stripping all demo boilerplate, designing a role-based folder architecture, and building complete placeholder pages and components across five user roles — Admin, Teacher, Student, Parent and Support — so a backend team could connect a real API without touching the UI structure.\n\nThe result is a front-end shell covering 262 named routes: each role gets its own dashboard, filtered sidebar navigation, and dedicated modules for attendance, grades, homework, schedules, messaging, document requests, HR, fees and more. Every data-bound component includes clear API integration markers, providing a clean handoff layer between frontend and backend.",
        problem:
            "The client had purchased a generic React template full of demo pages, mixed assets and no domain structure. They needed a developer to audit and clean the codebase, establish a clear separation between user roles, and scaffold every feature module with placeholder components and API hooks — so the product was immediately usable by a backend developer without requiring frontend rework.",
        role: "Frontend developer and architect. Audited the raw template and removed all unused demo pages and assets. Designed the role-based folder structure (admin/, teacher/, student/, parent/, support/). Built every placeholder page and component per role, implemented role-filtered sidebar navigation with Redux, configured the full 262-route system with protected route wrappers, and added TODO markers on every form and button that will connect to a future API.",
        features: [
            { title: "5-role architecture", description: "Separate folder trees and dashboards for Admin, Teacher, Student, Parent and Support — each with their own navigation and accessible feature set." },
            { title: "Role-based sidebar", description: "Sidebar dynamically filters menu items by detecting the active user role from the URL, showing only routes relevant to that role." },
            { title: "262-route system", description: "Full React Router 7 setup with named route constants, protected route wrappers and clean URL paths covering every module across all five roles." },
            { title: "API placeholder layer", description: "Every data-bound component, form and action button contains TODO comments marking exact integration points, giving backend developers clear targets without layout changes." },
            { title: "Academic modules", description: "Scaffold pages for class management, timetable, syllabus, exam scheduling, grade entry and attendance — all with structured component layouts ready for data binding." },
            { title: "Operations & HR modules", description: "Placeholder pages for payroll, library, hostel, transport and fee collection — complete with data table scaffolds and modal action skeletons." },
        ],
        stack: {
            frontend: ["React 19", "TypeScript", "React Router 7", "Redux Toolkit"],
            ui: ["Ant Design 5", "PrimeReact 10", "Bootstrap 5", "React Bootstrap", "SASS"],
            components: ["FullCalendar 6", "ApexCharts", "react-beautiful-dnd", "Dragula", "SweetAlert2", "Quill Editor"],
            icons: ["FontAwesome", "Tabler Icons", "Feather Icons"],
        },
        highlights: [
            "Role detection via URL pathname — sidebar and quick-access menus update automatically as the router switches between /admin/*, /teacher/*, /student/*, /parent/* with no extra auth layer in the scaffold.",
            "Redux Toolkit drives two global slices (theme settings and sidebar state) consumed by every module — dark mode, mini sidebar and layout changes apply instantly across all 262 routes.",
            "Template cleanup removed 40+ generic demo pages and unused assets, reducing the component tree to domain-relevant modules only and establishing a clear baseline for the backend integration phase.",
            "SASS modules scope styles per feature folder — no global class collisions across the large multi-role component tree.",
        ],
    },
    {
        slug: "vivu",
        category: "platform",
        year: "Jun 27 – Dec 20, 2025",
        title: "VIVU",
        tagline: "Course management platform for SENA — full-stack LMS handling vulnerable population enrollment rules and institutional agreements",
        image: "https://picsum.photos/seed/vivu/1200/600",
        screenshots: [],
        github: PROFILE,
        githubPrivate: true,
        liveLinks: [
            { label: "Live · Public", url: "https://vivu.hanner.dev/VIVU/index.php" },
            { label: "Live · Admin", url: "https://vivu.hanner.dev/login.php" },
        ],
        tags: ["PHP 8.2", "MySQL", "Tailwind CSS", "jQuery", "PHPRunner", "SweetAlert2", "AJAX", "FPDF"],
        demoNote: {
            status: "Live demo with pre-loaded data — 80 users across 5 population types, 25 courses, 334 enrollments, and institutional agreements with ICBF, INPEC, and Armed Forces. Login field is 'documento' (national ID).",
            steps: [
                { label: "Administrator", detail: "documento: 1075289634 · password: Admin2025 — full access: courses, users, agreements, news, CMS, and conflict victim dashboards", link: "https://vivu.hanner.dev/login.php" },
                { label: "Student", detail: "documento: 1075301102 · password: Aprendiz2025 — public view: course catalog and enrollment", link: "https://vivu.hanner.dev/VIVU/index.php" },
            ],
        },
        overview:
            "Full-stack platform built for SENA (Colombia's national vocational training institution) to manage the complete lifecycle of complementary courses across multiple municipalities. VIVU covers course creation and scheduling, instructor assignment, student enrollment, institutional agreement tracking, certification generation, and a database-driven public homepage — all under a multi-role authentication system. Deployed to production on a Ubuntu 24.04 VPS running Nginx and PHP 8.2.\n\nThe system handles non-standard enrollment business rules required by the institution: a 20% cap on conflict-victim slots per course checked via a MySQL stored function called from the service layer, conditional document verification per population type (Displaced, Disabled, Indigenous, INPEC inmates, ICBF beneficiaries), and per-entity branching for institutional partners.\n\nBuilt on a PHPRunner RAD base with 8+ custom modules following a strict five-layer MVC architecture (service / controller / process / page / JS), VIVU replaced manual spreadsheet-based processes and gave staff a unified admin interface for courses, agreements, users, news, and dynamic content management.",
        problem:
            "SENA's regional training center tracked dozens of complementary courses across multiple municipalities with no unified system. Enrollment was handled manually, institutional agreements with ICBF, INPEC, and the Armed Forces had no shared management layer, and producing demographic reports on vulnerable population coverage required significant manual effort.\n\nThe institution also needed to enforce enrollment rules that off-the-shelf LMS platforms don't support: skipping document verification for INPEC-linked courses, applying different requirements for ICBF beneficiaries, and hard-capping conflict victim enrollment at 20% per course — a legal compliance requirement.",
        role: "Sole developer on a greenfield internal platform. Designed the database schema, built all PHP service classes, implemented the frontend with Tailwind CSS and jQuery, and integrated custom modules with the PHPRunner-generated base layer.\n\nDelivered 8+ domain modules from scratch, implemented the vulnerable population verification service with per-type branching, built the institutional agreements module, enforced the 20% cap via stored function, added image upload for the CMS modules, and managed all SQL migrations and git workflow.",
        features: [
            {
                title: "Course lifecycle management",
                description: "Full CRUD for complementary courses with fields for course code, schedule, intensity, municipality, capacity, assigned instructor, execution status (Planning / In Execution / Finalized), and finalization date. Browsable with municipality filter and keyword search, server-side paginated.",
            },
            {
                title: "Institutional agreements",
                description: "Module to manage partnerships with state entities (child welfare, prison system, Armed Forces, and others). Tracks agreement status (Active / Inactive / Expired), lists courses linked to each agreement, and shows beneficiary population counts. Full CRUD via modal UI without page reloads.",
            },
            {
                title: "Vulnerable population enrollment rules",
                description: "Enrollment branches by population type — Displaced, Disabled, Indigenous, INPEC, ICBF, Conflict Victim, and others. Each type carries specific document verification requirements. INPEC and ICBF enrollments bypass standard verification; conflict victims are subject to the 20% per-course cap.",
            },
            {
                title: "20% conflict victim cap via stored function",
                description: "The enrollment limit for conflict victims is enforced through a MySQL stored function `verificar_limite_victimas()` that reads the current victim count and course capacity. The service layer calls the function before every enrollment and blocks it if the ratio would exceed 20%. The check also powers a real-time ALERTA / LÍMITE ALCANZADO status visible in the admin dashboard.",
            },
            {
                title: "Database-driven homepage CMS",
                description: "Carousel slides and service cards are fully managed through an admin panel with image upload support. Staff update hero banners, service descriptions, and highlighted programs without touching code. Uploaded files are stored in a module-scoped directory and served as static assets.",
            },
            {
                title: "Multi-role access control",
                description: "Four roles — Admin, Super Admin, Orientator, and Student — each with scoped module access. Built on PHPRunner's security layer with a shared auth_utils.php helper that standardizes session checks across all custom modules.",
            },
            {
                title: "AJAX-first interactions",
                description: "All form submissions, modal operations, and table updates communicate through dedicated AJAX endpoints in each module's handlers directory. SweetAlert2 handles user confirmations and success/error feedback throughout the platform.",
            },
            {
                title: "Certificate generation (FPDF)",
                description: "CertificationController generates official course completion certificates as formatted PDF documents using FPDF — student data and course details merged into the institutional layout and ready for download.",
            },
        ],
        stack: {
            backend: ["PHP 8.2", "PHPRunner (RAD base)", "Custom service-layer MVC"],
            database: ["MySQL 8.0", "Stored functions", "SQL migration scripts"],
            frontend: ["Tailwind CSS (CDN)", "jQuery 3.6", "Vanilla JavaScript"],
            ui: ["SweetAlert2", "Font Awesome 6"],
            exports: ["FPDF (PDF certificate generation)"],
            tooling: ["Nginx", "PHP-FPM", "Ubuntu 24.04 VPS", "Git"],
        },
        highlights: [
            "The 20% conflict victim enrollment cap is enforced through a MySQL stored function called from the service layer on every enrollment attempt. The function reads the live victim count and course capacity, returns an 'excedido' status if the threshold is breached, and the service blocks the INSERT — keeping the rule centralised and callable from any entry point.",
            "Each of the 8+ custom modules follows a strict five-layer separation (services / controllers / handlers / pages / js) that keeps all business logic decoupled from the PHPRunner-generated base, making it safe to regenerate the scaffolded output without overwriting custom code.",
            "The enrollment verification service uses per-entity branching through a single EnrollmentVerificationService::verify() call — prison-program courses skip the document check, child-welfare courses require it, and conflict victim enrollments additionally trigger the 20% ratio check — no scattered conditionals across controllers.",
            "Schema evolution is tracked through named SQL migration scripts rather than ad-hoc ALTER TABLE statements, giving a clear audit trail of every structural change made to the production database.",
        ],
    },
    {
        slug: "app-akadem-ia",
        category: "webapp",
        year: "Nov 28, 2024 – Nov 10, 2025",
        title: "Akadem-ía — Sistema de Gestión Académica",
        tagline: "Automated schedule generation engine for Colombian higher-ed associations with constraint-aware conflict detection",
        image: "https://picsum.photos/seed/akademia/1200/600",
        screenshots: [],
        github: PROFILE,
        githubPrivate: true,
        link: "",
        tags: ["Laravel", "Livewire", "PHP", "MySQL", "Excel", "Spatie"],
        overview:
            "Akadem-ía is a full-featured academic management platform built for a Colombian higher education association (ASOJAC). The system covers the entire academic planning cycle: program and curriculum setup, professor (docente) registry, course projection per period, resource and classroom management, professor availability tracking, and the core feature — an automated schedule generation engine that resolves the multi-constraint scheduling problem across classrooms, docents, groups and time slots. Generated schedules export directly to formatted Excel workbooks for administrative use. The platform integrates with Academusoft, the client's legacy academic system, for data synchronization.",
        problem:
            "Building conflict-free class schedules manually across multiple programs, shifts, classrooms and professors is extremely error-prone and takes days of coordination. The institution needed a system that could enforce all constraints simultaneously — professor availability windows, classroom capacity, hour quotas per module, and resource requirements — and surface conflicts clearly when they arise, rather than discovering them after the schedule is published.",
        role: "Full-stack developer. Designed the 48-table relational schema, built 58 Livewire reactive components covering every management module, implemented the constraint-based schedule generation algorithm in HorarioGeneratorController, developed dedicated services for conflict detection (DisponibilidadVerificacionService), classroom availability (AulaDisponibilidadService), Excel report generation (ExcelHorarioService), and Academusoft legacy sync (AcademusoftHorarioService). Set up role-based access control with Spatie Permissions and implemented Excel import/export pipelines with Maatwebsite.",
        features: [
            {
                title: "Constraint-aware schedule generation",
                description: "HorarioGeneratorController runs a multi-constraint algorithm that simultaneously evaluates professor availability windows, per-module hour requirements (theoretical vs. practical), classroom capacity and location, group time conflicts and resource availability. When constraints cannot be fully satisfied, the engine surfaces specific conflict records rather than silently producing an invalid schedule.",
            },
            {
                title: "Professor availability management",
                description: "Docentes enter their weekly availability through a dedicated Livewire interface. The DisponibilidadVerificacionService cross-references these entries against already-assigned slots to prevent double-booking before the schedule generator runs.",
            },
            {
                title: "Course projection workflow",
                description: "Administrators project which courses will run each period — defining quantity, level and shift — then faculty coordinators accept assignments through an approval flow. This projection data feeds directly into the schedule generation step.",
            },
            {
                title: "Physical resource and classroom management",
                description: "The platform tracks every physical resource across all campuses (Sedes): classrooms with capacity and block assignment, and an inventory of furniture (chairs, desks), audiovisual equipment (TVs, videobeams) and technology (laptops, computers). Resources are assigned to courses as prerequisites for schedule generation.",
            },
            {
                title: "Excel import and formatted export",
                description: "Academic data can be imported from Excel with row-level validation. Generated schedules are exported as multi-sheet formatted workbooks via ExcelHorarioService, using Maatwebsite's WithHeadings, WithMapping and WithStyles concerns for presentation-ready output.",
            },
            {
                title: "Academusoft legacy system integration",
                description: "AcademusoftHorarioService synchronizes schedule and academic data with the client's existing Academusoft platform, providing continuity with their institutional records without requiring a full migration.",
            },
            {
                title: "Role-based access control",
                description: "Spatie Permissions drives a layered permission system with role hierarchy (Super Administrator, Academic Admin, Docente) and fine-grained permission categories — ensuring each user type sees only the operations relevant to their role.",
            },
        ],
        stack: {
            frontend: ["Laravel Blade", "Livewire 2.10", "Bootstrap 5", "MDB UI Kit 4"],
            backend: ["Laravel 8", "PHP 7.4", "Eloquent ORM"],
            database: ["MySQL / MariaDB"],
            packages: ["Maatwebsite Excel 3.1", "Spatie Permission 5.5", "PhpSpreadsheet 1.29", "Guzzle HTTP 7"],
            tooling: ["Laravel Mix", "Webpack", "Sass"],
        },
        highlights: [
            "Schedule generation is modeled as a multi-constraint satisfaction problem: the algorithm must hold professor availability, module hour quotas, classroom capacity, resource requirements and group time windows simultaneously — a problem that grows combinatorially with institution size.",
            "58 Livewire components provide server-driven reactivity across all modules without a separate JavaScript framework — state syncs to the server on each interaction, keeping validation logic out of the frontend entirely.",
            "Six dedicated service classes (ScheduleAlertService, AcademusoftHorarioService, ExcelHorarioService, HorarioPreviewService, AulaDisponibilidadService, DisponibilidadVerificacionService) isolate each domain concern from the controllers, keeping business logic testable and replaceable.",
            "Dual-database architecture: MySQL for the application's 48-table schema and Oracle (via Yajra OCI8) for read access to the client's legacy Academusoft system — no data migration required.",
        ],
    },
    {
        slug: "ecpl",
        category: "webapp",
        year: "19 Oct 2025 – 23 Dec 2025",
        title: "ECPL — Certificación de Competencias Laborales",
        tagline: "SENA labor-competency certification platform: full candidate lifecycle, NCL mapping and signed document generation",
        image: "https://picsum.photos/seed/ecpl/1200/600",
        screenshots: [],
        github: PROFILE,
        githubPrivate: true,
        link: "https://ecpl.hanner.dev",
        tags: ["PHP", "MySQL", "PHPRunner", "PhpSpreadsheet", "FPDF", "jQuery", "Tailwind CSS"],
        demoNote: {
            status: "Live demo with pre-loaded test data — 28 candidates across 4 projects, 24 labor competency norms and full Colombia geography. Two roles available to explore. Login field is 'documento' (national ID).",
            steps: [
                { label: "Administrator", detail: "documento: admin · password: admin2024 — full access: candidates, projects, NCL catalog, users, audit trail and dashboards" },
                { label: "Formulador", detail: "documento: formulador · password: formulador2024 — restricted view: own assigned candidates and projects only" },
            ],
        },
        overview:
            "ECPL (Evaluación por Competencias en el Proceso Laboral) is an internal management platform built for SENA — Colombia's national vocational training service — to run the complete certification lifecycle for labor competency evaluations (NCL). The system covers candidate registration with 30+ personal and demographic fields, an organizational hierarchy (Regionales → Centros → Proyectos), a catalog of labor competency norms with function categorization, many-to-many candidate–norm assignments, signed-document generation (Excel with digital signature + PDF), role-based access for Administrators and Formuladores, a full audit trail, and role-specific dashboards — all built as five custom MVC modules layered on a PHPRunner scaffold with a 15-table relational database.",
        problem:
            "SENA's ECPL process required tracking hundreds of candidates across multiple regional offices, each assigned to specific labor competency norms, carrying precise demographic data (employment status, population category, LGBTIQ community flag, SENA-employee type), and receiving official signed documents. The existing workflow was entirely manual: data lived in spreadsheets, documents were built by hand, and there was no visibility into candidate status across projects and regions — producing inconsistencies, errors in issued certificates, and no audit trail.",
        role: "Full-stack developer. Designed the 15-table relational schema, built five custom MVC modules (candidates, normas, projects, dashboard, assets) on top of the PHPRunner admin scaffold, implemented the Excel generation pipeline with dynamic digital-signature cell insertion via PhpSpreadsheet, built the PDF generation service, created AJAX endpoints for cascading geographic lookups across all of Colombia, and configured all PHPRunner views, filters and export columns for each entity.",
        features: [
            {
                title: "30-field candidate registration with transactional saves",
                description: "The registration form captures personal identity, birth data with full Colombian geography, demographic markers (LGBTIQ community, blood type, gender, civil status, education level, employment condition, SENA-employee type), labor experience, emergency contact and information classification (Pública / Pública Clasificada / Pública Reservada). All inserts — the candidate record, population-type associations and NCL enrollments — execute inside a single database transaction, so a partial failure never leaves orphaned data.",
            },
            {
                title: "Excel generation with digital signature cell insertion",
                description: "A dedicated ExcelGeneratorService reads a pre-formatted official template and maps every candidate field to its exact cell using a centralized ExcelMapper — including SENA-employee flags, LGBTIQ markers and classification values. After populating data, the service locates the signature cell and inserts the candidate's uploaded digital-signature image at the correct coordinates before streaming the workbook as a download. Template layout changes require editing only the mapper, not the generation logic.",
            },
            {
                title: "PDF document generation pipeline",
                description: "A PdfGeneratorService builds official ECPL forms by resolving all relational fields (project name, NCL title, regional, centro) before rendering them into the document layout. A standalone diagnostic script can print the full field-to-position mapping without producing a document — letting developers audit template drift against updated SENA layouts without touching production data.",
            },
            {
                title: "NCL catalog with function categorization",
                description: "The normas module provides full CRUD for labor competency norms — each uniquely identified by a código NCL, versioned, and linked to a function category from a separate catalog. Soft-delete prevents removing norms with active candidates or projects. Admin-only write access; Formuladores have read-only visibility. All create, update and delete actions fire via AJAX modal forms without full-page reload.",
            },
            {
                title: "Many-to-many: candidates ↔ norms and candidates ↔ projects",
                description: "Junction tables allow a single candidate to be enrolled in multiple NCLs and assigned to multiple projects simultaneously — a requirement surfaced mid-project when real operations revealed that candidates routinely participate in more than one certification process at once. The modal assignment workflow was retrofitted cleanly without restructuring the existing registration flow.",
            },
            {
                title: "Population type and demographic tracking",
                description: "Each candidate is linked to one or more tipos de población — armed-conflict victims, ethnic minorities, people with disabilities, LGBTIQ community — via a junction table. These flags drive both report filters and document output, ensuring issued certificates carry the exact population classification required by SENA's program regulations.",
            },
            {
                title: "Cascading geographic lookups — all of Colombia",
                description: "A UbicacionService exposes AJAX endpoints returning departments, municipalities per department, regionales and centros per regional — seeded from a database of 1,100+ Colombian municipalities. Candidate and project forms cascade in real time: selecting a department fetches its municipalities; selecting a regional loads its training centers. No hard-coded lists anywhere in the forms.",
            },
            {
                title: "Role-based dashboards and full audit trail",
                description: "Formuladores see dashboards filtered to their own candidates and projects. Administrators see system-wide metrics across all regions. Every create, edit, delete, export, view and login action is recorded in an audit log with the user, affected table, record ID, description and user-agent — providing complete traceability required for institutional accountability.",
            },
        ],
        stack: {
            base: ["PHPRunner (admin scaffold)", "Custom MVC modules (Controller → Service → Page)"],
            backend: ["PHP 7.4", "MySQL / MariaDB"],
            frontend: ["jQuery", "Tailwind CSS", "AJAX (JSON endpoints)"],
            exports: ["PhpSpreadsheet (Excel + digital signature)", "FPDF (PDF generation)"],
            database: ["15-table schema", "Transactional inserts", "1,100+ municipality seed dataset"],
        },
        highlights: [
            "Digital signature insertion is resolved at the cell level: ExcelMapper holds the exact coordinate for the signature field and the generator places the uploaded image there before streaming — swapping signature positions when SENA updates official templates means editing one constant, not the generation logic.",
            "The standalone diagnostic script prints the full database-field → document-position mapping without producing a file — a zero-risk audit tool that let the team verify template compliance against updated SENA forms without a production deployment.",
            "Many-to-many candidate–project assignment was discovered as a real operational need mid-project. The junction table and modal workflow were added without touching the registration form, demonstrating that the modular MVC structure could absorb schema changes without regression.",
            "All controller responses follow a uniform contract — success flag, optional error message, optional redirect — so every view is decoupled from SQL results and the rendering layer never branches on raw database output.",
        ],
    },
    {
        slug: "greythium",
        category: "platform",
        year: "Nov 3 – Dec 2, 2025",
        title: "GREYTHIUM",
        tagline: "B2B/B2C global trade platform — retail, wholesale, export and import under one PHP backend",
        image: "https://picsum.photos/seed/greythium/1200/600",
        screenshots: [],
        github: PROFILE,
        githubPrivate: true,
        link: "https://greythium.com",
        tags: ["PHP", "MariaDB", "JavaScript", "PayPal API", "Stripe", "Apache", "CSS Custom Properties"],
        overview:
            "GREYTHIUM is a full-stack international trade platform built from scratch in PHP and vanilla JavaScript. It handles four distinct business models in a single system: a B2C retail store, a B2B wholesale module with approval-based access, and dedicated export and import service portals. The platform supports multi-tier pricing, PayPal and Stripe payment processing, wholesale partner verification, international trade documentation (HS codes, incoterms, customs tracking), and a full admin backend — all without any PHP framework or CSS library.",
        problem:
            "The client needed a single platform to unify retail sales, B2B wholesale operations, and international trade services — with different pricing tiers, access controls, and workflows per customer type. Off-the-shelf solutions couldn't handle the combination of wholesale approval workflows and trade-specific documentation (incoterms, HS codes, deposit-vs-final-payment tracking). The entire system had to be built from scratch.",
        role: "Sole full-stack developer. Designed the database schema (22 tables), built the complete backend with a service-class architecture (OrderService, ProductService, WholesaleService, ExportService, ImportService), integrated PayPal OAuth2 and Stripe payment flows, and implemented the frontend with vanilla JavaScript and a custom CSS design system — no framework on either side.",
        features: [
            { title: "Four-model commerce architecture", description: "A single platform serves retail customers (B2C), approved wholesale partners (B2B), export clients, and import clients — each with their own pricing tier, product visibility rules, minimum quantity enforcement, checkout flow, and order type. User context is resolved on every request and drives all conditional rendering, price display, and catalog filtering." },
            { title: "PayPal OAuth2 payment integration", description: "Full PayPal v2 Checkout API integration: client credentials OAuth2 token fetch, order creation via /v2/checkout/orders, and payment capture on return. SSL verification switches dynamically between localhost (disabled) and production (enabled). Handles success and cancellation URL flows with order status updates." },
            { title: "Wholesale approval workflow", description: "Wholesale applicants submit a business verification form (company name, tax ID, business type: distributor/retailer/reseller). A WholesaleService class manages the approval pipeline — admins review, approve with access grant or reject with a written reason. Only approved wholesale users see B2B pricing and the wholesale catalog. Status checks (isWholesaleApproved, hasWholesaleApplication) run on every product and checkout request." },
            { title: "Export & Import service portals", description: "Dedicated modules for international trade requests. Export: HS codes, incoterms (EXW, FOB, CIF, DDP), shipping method (Air/Sea/Land/Express), destination tracking, auto-generated request numbers (EXP-YYYYMM-XXXX). Import: origin country, supplier details, quality inspection flags, sample request handling. Both track deposit-vs-final payment and map through a status workflow (pending → reviewing → quoted → approved → in_transit → customs → completed)." },
            { title: "Multi-tier pricing with quantity ranges", description: "A product_prices table stores tiered prices per customer type (retail, wholesale, export) and per quantity range (min/max units). Cart validation enforces minimum wholesale quantities before checkout. Product display adapts dynamically based on the authenticated user's account type." },
            { title: "Transactional order creation", description: "Orders are created inside START TRANSACTION / COMMIT / ROLLBACK blocks: one insert for the order header, one per line item in order_items, and one in payments — all or nothing. This prevents orphaned order records if a payment insert fails mid-checkout." },
            { title: "Custom PHP service architecture", description: "No framework. The backend is organized into single-responsibility service classes (OrderService, ProductService, WholesaleService, ExportService, ImportService, UserService) with a shared bootstrap, helper library, and layout system. Apache .htaccess rewrites strip .php extensions for clean URLs throughout." },
            { title: "Admin backend", description: "Full admin panel for product catalog management, order fulfillment, wholesale application review, export/import request processing, blog and legal document management, user document verification, and contact message handling — all role-protected via admin middleware." },
        ],
        stack: {
            backend: ["PHP 7.4", "Custom service architecture", "MySQLi", "cURL"],
            database: ["MariaDB 10.4", "22-table schema", "Transactional inserts"],
            frontend: ["Vanilla JavaScript", "Custom CSS design system", "CSS Custom Properties", "Font Awesome 6"],
            payments: ["PayPal v2 Checkout API (OAuth2)", "Stripe PHP SDK"],
            infra: ["Apache", ".htaccess URL rewriting", "XAMPP"],
        },
        highlights: [
            "No PHP framework, no CSS library. The service layer is hand-built: each domain (orders, products, wholesale, export, import) has its own service class with a clean interface. This keeps the codebase explicit and avoids framework overhead for a project where routing and middleware are minimal.",
            "PayPal integration uses OAuth2 client credentials — not the legacy NVP API. The token endpoint, order creation, and capture calls are all raw cURL requests, giving full control over headers and error handling. SSL verification is toggled at runtime based on the server host, not a config flag.",
            "The wholesale approval gate is enforced at three levels: database (user account_type + wholesale_applications status), service class (WholesaleService::isWholesaleApproved()), and frontend (product cards and checkout buttons conditioned on user context). No single bypass point can leak B2B pricing to retail users.",
            "Order creation uses an explicit transaction with three separate inserts. If the payment record fails to insert (duplicate transaction ID, constraint violation), the entire order rolls back — no partial orders reach the database.",
        ],
    },

    // ─────────────────────────────────────────────────────────────────
    // LANDINGS & WEBSITES
    // ─────────────────────────────────────────────────────────────────
    {
        slug: "alerta-roja",
        category: "landing",
        year: "Sep 14 – Sep 19, 2024",
        title: "Alerta Roja",
        tagline: "Promotional landing page for a citizen security Android app in Puerto Colombia",
        image: "https://picsum.photos/seed/alertaroja/1200/600",
        screenshots: [],
        github: "https://github.com/HannerB/ALERTA-ROJA",
        githubPrivate: false,
        link: "https://alerta-roja.hanner.dev",
        tags: ["HTML5", "CSS3", "Bootstrap", "jQuery", "PHP", "SweetAlert2"],
        overview:
            "Promotional landing page built for Alerta Roja — an Android app that allows residents of Puerto Colombia to report security incidents in real time, alerting local police and neighborhood watch groups with geolocation data. The page covers the app's value proposition, highlights key features, shows user activity metrics (2K downloads, 1.5K satisfied users), embeds a demo video, and provides a direct APK download. Built and deployed independently as a freelance contribution to the project team.",
        problem:
            "The Alerta Roja mobile app had no public-facing presence. The team needed a page where citizens could understand what the app does, watch it in action, and download the APK — without relying on the Play Store.",
        role: "Sole landing page developer. Designed and built the entire promotional site from scratch: layout, sections, contact form with PHP mail handler, video popup integration, pie chart stats, and GitHub Pages deployment with a custom domain.",
        features: [
            { title: "Hero with direct APK download", description: "Hero section with app mockup and a direct APK download button, bypassing Play Store dependency for distribution." },
            { title: "Feature highlights section", description: "Four-card section covering the app's core pillars: geolocation, real-time reporting, virtual security fronts, and SENA Atlántico institutional backing." },
            { title: "App overview with dual-column layout", description: "Eight feature items arranged on either side of a central phone mockup, covering notifications, resource efficiency, UI design and cross-platform compatibility." },
            { title: "User activity stats with pie charts", description: "Animated EasyPieChart gauges displaying 2K total downloads, 1.5K satisfied users and 1K regular users — drawn from real deployment metrics." },
            { title: "Video demo popup", description: "Magnific Popup integration plays the app demo video in a lightbox overlay without leaving the page." },
            { title: "Contact form with PHP backend", description: "Form submits via PHP mail handler. SweetAlert2 provides success/error feedback to the user after submission." },
        ],
        stack: {
            frontend: ["HTML5", "Bootstrap 3", "CSS3", "jQuery 2.1.1"],
            plugins: ["OWL Carousel", "Magnific Popup", "EasyPieChart", "WOW.js", "SweetAlert2"],
            backend: ["PHP (mail handler)"],
            infra: ["GitHub Pages", "Custom domain (CNAME)"],
        },
        highlights: [
            "APK served as a direct file download from the repo — no Play Store listing required, which was the primary distribution channel for a municipally-backed community app.",
            "Contact form backed by a PHP mail handler with SweetAlert2 feedback — no JS framework, no external form service, just the minimum stack needed for a static-hosted page.",
            "EasyPieChart stats pulled from real deployment data: 2K downloads and 1.5K satisfied users reported after the app launched in Puerto Colombia.",
        ],
    },
    {
        slug: "tvd",
        category: "landing",
        year: "Apr 9 – Apr 25, 2024",
        title: "Tu Vale Digital",
        tagline: "Landing page for a Colombian fintech startup that digitizes the credit slip system for small shopkeepers.",
        image: "https://picsum.photos/seed/tuvale/1200/600",
        screenshots: [],
        github: PROFILE,
        githubPrivate: true,
        link: "https://tvd.hanner.dev",
        tags: ["HTML5", "CSS3", "Bootstrap 4", "JavaScript", "jQuery", "AOS", "Font Awesome"],
        overview:
            "Landing page built for Tu Vale Digital, a Colombian fintech startup that replaces physical credit slips with a mobile app. The site communicates the platform's value proposition, guides users through registration and app download, and highlights impact metrics: 55,000+ satisfied customers and $249M+ in processed transactions.\n\nDesigned for Colombian small shopkeepers with clear, accessible language. Includes vision/mission cards, a 4-step how-it-works flow, pricing table, FAQ accordion and a testimonial carousel.",
        problem:
            "Tu Vale Digital needed a web presence that could explain their product to a non-technical audience (small retail merchants), build trust as a financial platform, and drive Google Play app downloads. No site existed that clearly articulated the difference between the old physical vale system and the digital solution.",
        role: "Built the full landing from scratch: multi-page responsive layout with Bootstrap, scroll animations with AOS, animated statistics counter, FAQ accordion, testimonial carousel, pricing table, and registration and login forms.",
        features: [
            {
                title: "Multi-page responsive design",
                description: "10 interconnected pages (home, about, services, pricing, FAQ, contact, team, login, sign-up, coming soon) with consistent navigation and styling.",
            },
            {
                title: "Scroll animations (AOS)",
                description: "fade-up, fade-right and fade-down effects triggered on scroll, improving content readability as users move through the page.",
            },
            {
                title: "Animated metrics counter",
                description: "jQuery counter that animates impact numbers (55,000+ customers, $249M+ in transactions) when they enter the viewport.",
            },
            {
                title: "FAQ accordion",
                description: "Frequently asked questions organized by category (payment methods, loan methodology, partnerships) using Bootstrap's collapse component.",
            },
            {
                title: "Pricing table",
                description: "Dedicated pricing page listing all available payment methods and their fees in a clear, scannable layout.",
            },
            {
                title: "Google Play CTA",
                description: "Direct call-to-action linking to the app download on Google Play Store — the primary conversion goal of the site.",
            },
        ],
        stack: {
            base: ["HTML5", "CSS3"],
            styling: ["Bootstrap 4.5", "CSS Variables", "Google Fonts (Barlow, Jost, Oxygen)"],
            animation: ["AOS 2.3.1", "Magnific Popup 1.1.0"],
            scripts: ["jQuery 3.6.0", "Bootstrap JS"],
            ui: ["Font Awesome 6.1.1"],
        },
        highlights: [
            "Multi-page architecture with shared assets across all views — consistent branding without a component framework.",
            "Color palette defined with CSS custom properties, enforcing brand consistency across all 10 pages from a single source.",
            "jQuery counter activates only when elements enter the viewport, preventing the animation from firing unnoticed on page load.",
        ],
    },
    {
        slug: "conteb",
        category: "landing",
        year: "May 2 – 3, 2024",
        title: "ContebSolutions",
        tagline: "Corporate landing page for a digital transformation and tech consulting agency in Barranquilla, Colombia",
        image: "https://picsum.photos/seed/contebweb/1200/600",
        screenshots: [],
        github: "https://github.com/HannerB/CONTEB",
        githubPrivate: false,
        link: "https://conteb.hanner.dev",
        tags: ["HTML5", "CSS3", "Bootstrap", "jQuery", "Swiper.js", "WOW.js", "Font Awesome"],
        overview:
            "ContebSolutions is a digital transformation and technology consulting agency based in Barranquilla, Colombia, offering 6 service lines — Design & Digital Marketing, Digital Transformation, Consulting, Custom Development, Web Development, and Mobile Development. They had no web presence. The landing page was built in 2024 to give them a professional identity online: a single-page responsive site that communicates their value proposition, showcases their 6 services, displays social proof metrics (300+ clients, 70+ projects, 5,000+ consulting hours), presents the expert team, and funnels prospects directly to WhatsApp. Built by a 3-person team: Joseph Avila, Orlando Julio and Hanner Barros.",
        problem:
            "ContebSolutions was operating without a website — no digital presence to validate the brand for potential clients. The team needed a page that could clearly explain their 6 service categories to Colombian SMBs struggling with low productivity and inefficient digital processes, and make it as frictionless as possible for those prospects to reach them via WhatsApp — the dominant contact channel in the local market.",
        role: "One of 3 developers on the project alongside Joseph Avila and Orlando Julio. Responsible for adapting a multi-purpose HTML/Bootstrap template to the client's brand and content: stripped out irrelevant template sections (shop, blog, portfolio, pricing), rebuilt the 6-service card grid in Spanish, wired up WhatsApp API deep links in the contact section, and configured the animated statistics counter block with the company's real metrics.",
        features: [
            { title: "Hero with dual CTA", description: "Opening section with the headline 'Expertos en Transformación Digital' and two action buttons: 'Diagnóstico' (primary — anchors to the free diagnostic offer) and 'Servicios' (secondary — scrolls to the service grid), giving visitors two distinct entry points based on intent." },
            { title: "6-service card grid", description: "Responsive 3×2 Bootstrap grid covering the full service catalog: Diseño y Marketing Digital, Transformación Digital, Consultorías, Desarrollo a Medida, Desarrollo Web and Desarrollo Móvil — each with a description of the specific deliverables included." },
            { title: "Animated social proof counters", description: "jQuery CounterUp + Waypoints block that counts up to 300+ Happy Clients, 70+ Projects and 5,000+ Advisory Hours once the section enters the viewport — communicating scale before the user reads a word." },
            { title: "Expert team section", description: "Profile cards for Santiago Campbell (Innovation Expert), Alexander Donado (Digital Transformation Expert) and David Alvarez (Marketing Expert), each with links to their individual LinkedIn profiles." },
            { title: "WhatsApp API contact section", description: "Direct WhatsApp deep links for two company numbers (+57 301 755 7782 and +57 300 818 3155), each pre-filled with a contact message — so a prospect taps and lands directly in a conversation, with zero friction." },
            { title: "Mobile-first responsive navigation", description: "Custom hamburger menu with a full-height mobile drawer for smaller screens, replicating all desktop nav anchors (Servicios, Testimonios, Acompañamiento, Cursos)." },
        ],
        stack: {
            base: ["HTML5", "CSS3", "Bootstrap 4"],
            ui: ["Font Awesome", "Google Fonts (Roboto)"],
            animation: ["WOW.js", "Animate.css"],
            components: ["Swiper.js", "jQuery CounterUp", "jQuery Waypoints", "Lightcase.js", "Isotope.js"],
            tooling: ["jQuery"],
        },
        highlights: [
            "WhatsApp deep links pre-fill a branded message with the company name — prospects arrive in a conversation already primed, rather than opening a blank chat window that most people abandon.",
            "jQuery CounterUp fires only when the stats section enters the viewport via Waypoints — the 300+/70+/5,000+ figures animate in front of the user rather than running unnoticed on page load.",
            "Template pruned from a 15+ page multi-purpose framework down to a focused single-page site: blog, shop, portfolio, pricing and additional home variants were all stripped out, concentrating every visitor interaction on services and contact.",
        ],
    },
    {
        slug: "agrosena",
        category: "landing",
        year: "2024",
        title: "AgroJam 2024",
        tagline: "Event landing page for SENA's agricultural open innovation hackathon, with SMTP email integration and GitHub Pages CI/CD",
        image: "https://picsum.photos/seed/agrosena/1200/600",
        screenshots: [],
        github: "https://github.com/HannerB/Agrosena",
        githubPrivate: false,
        link: "https://hannerb.github.io/Agrosena/",
        tags: ["HTML5", "Tailwind CSS", "PHP", "PHPMailer", "jQuery", "AOS", "Owl Carousel", "SweetAlert2", "GitHub Actions"],
        overview:
            "AgroJam 2024 is SENA Regional Atlántico's annual open innovation event — a 2-day hackathon-style competition held at Universidad de la Costa, Barranquilla (Oct 30–31), bringing together students, researchers and agricultural professionals to solve real challenges in agro, renewable energy and popular economy. I built and maintained the public event landing page: a fully responsive single-page site deployed automatically to GitHub Pages, covering the event agenda, registrations, congress information, downloadable documents and a working contact system backed by PHPMailer.",
        problem:
            "SENA needed a public digital presence for their innovation event that could attract participants, communicate a detailed 2-day agenda, offer downloadable documents (convocatoria, author guidelines, T&Cs), route users to four different registration tracks, and receive contact inquiries reliably — all deployable without a server.",
        role: "Landing page developer. Built and iterated on the responsive layout using HTML and Tailwind CSS, wired up all interactive sections (countdown timer, two-day agenda timeline, congress modal, document downloads, sponsor carousel, Google Maps embed), implemented the dual-path PHPMailer contact system, and set up the GitHub Actions workflow for automatic deployment to GitHub Pages on every push.",
        features: [
            { title: "Live countdown timer", description: "Hero section displays a real-time countdown to Oct 30, 2024 — built with vanilla JavaScript updating days, hours, minutes and seconds every second." },
            { title: "Two-day agenda timeline", description: "Side-by-side layout for Oct 30 and Oct 31 with a vertical timeline UI covering every scheduled activity: registration, opening remarks, international conferences, creativity workshops, challenge development, evaluation and closing ceremony." },
            { title: "Multi-track registration links", description: "Navigation routes users to four separate registration flows (challenge competitors, paper presenters, poster presenters, general attendees) — each pointing to its corresponding form." },
            { title: "Congress section with document downloads", description: "Modal with the official event ficha (research lines, participating SENA centers), and JS-driven downloads for author guidelines PDF, originality declaration DOCX and terms & conditions PDF." },
            { title: "Dual-path PHPMailer contact system", description: "Contact form submits via AJAX with SweetAlert2 feedback. PHPMailer sends two emails per submission: a notification to the organization via Hostinger SMTP (STARTTLS, port 587) and a styled HTML auto-confirmation back to the user." },
            { title: "GitHub Actions CI/CD", description: "Configured the static.yml workflow so every push to master automatically deploys the full repository to GitHub Pages — no manual upload required." },
        ],
        stack: {
            frontend: ["HTML5", "Tailwind CSS", "AOS", "Owl Carousel", "jQuery FancyBox", "SweetAlert2"],
            backend: ["PHP", "PHPMailer (Composer)"],
            ui: ["Font Awesome 4/6", "Boxicons", "Montserrat (self-hosted)"],
            infra: ["GitHub Actions", "GitHub Pages"],
        },
        highlights: [
            "Dual-email flow in a single PHP try/catch: PHPMailer sends to the organization, then clearAddresses() + a second send() dispatch the confirmation to the user — JSON responses drive SweetAlert2 feedback with no page reload.",
            "Document downloads implemented with a JS object mapping keys to file paths — a single downloadFile() function handles all three documents (PDF, DOCX) without duplicating logic.",
            "GitHub Actions CI/CD on push to master deploys the full repository as a static site to GitHub Pages automatically — any content or style update goes live with a single commit.",
        ],
    },
    {
        slug: "crystalberylmedia",
        category: "landing",
        year: "Apr 16 – 21, 2025",
        title: "CrystalBeryl Media",
        tagline: "Multi-page website for a Nairobi digital agency — services, portfolio and process showcase with rich animations",
        image: "https://picsum.photos/seed/crystalberyl/1200/600",
        screenshots: [],
        github: PROFILE,
        githubPrivate: true,
        link: "https://crystalberylmedia.hanner.dev",
        tags: ["React 18", "TypeScript", "Vite", "Bootstrap", "Jarallax", "SASS", "Vercel"],
        overview:
            "Full website for CrystalBeryl Media, a digital agency based in Nairobi, Kenya with 7+ years of experience and 100+ clients. The site covers their complete service offering — web design, development, SEO, UI/UX, digital marketing and mobile apps — and is designed to convert visitors into leads. Built with React + TypeScript and deployed on Vercel, it features animated statistics, Jarallax parallax sections, Swiper carousels for services/portfolio/testimonials, WOW.js scroll reveals, a video modal, a 3-step process visualization, a floating WhatsApp button and a full contact page with Google Maps.",
        problem:
            "CrystalBeryl Media needed a site that could act as their own proof of work — a Nairobi agency competing in the digital services market had to demonstrate design quality and technical capability through the site itself, while also giving potential clients a clear path to contact them directly.",
        role: "Frontend developer. Built the full React + TypeScript component architecture, integrated all animation and carousel libraries, implemented the multi-page routing structure and delivered the complete site in under a week.",
        features: [
            { title: "Animated hero with customer counter", description: "Hero section with a three-colored counter displaying 100+ clients — animated on load to immediately communicate scale and credibility." },
            { title: "Service carousel", description: "Swiper-powered carousel showcasing core services (Web Design, Web Development, SEO, UI/UX, Digital Marketing, Mobile Apps) with autoplay and hover states." },
            { title: "3-step process visualization", description: "Visual breakdown of the agency workflow: Design Strategy → Sketch Visual → Development — with icons and descriptions to set client expectations." },
            { title: "Portfolio slider with live links", description: "Swiper slider displaying completed client projects (Betting Bonus Kenya, Auspicious Consultants) with direct links to live sites." },
            { title: "Animated statistics (react-countup + circular progressbar)", description: "Agency KPIs animate into view using react-countup triggered by react-intersection-observer — numbers count up only when the section enters the viewport." },
            { title: "Video modal popup", description: "react-modal-video integration allows embedded video playback in a fullscreen modal without leaving the page." },
            { title: "WOW.js + Animate.css scroll reveals", description: "Section elements reveal on scroll using WOW.js coordinated with Animate.css classes — staggered delays give each content block a distinct entrance." },
            { title: "WhatsApp direct contact", description: "Floating WhatsApp button linked to the agency's business number — provides instant contact from any page without a form." },
            { title: "Contact page with Google Maps", description: "Full contact form alongside an embedded Google Map pointing to the office at Westpark Towers, Nairobi." },
        ],
        stack: {
            frontend: ["React 18", "TypeScript", "Vite", "React Router 6"],
            styling: ["Bootstrap 5", "SASS", "Animate.css"],
            animation: ["Jarallax", "WOW.js", "react-fast-marquee"],
            components: ["react-countup", "react-circular-progressbar", "Swiper", "react-modal-video", "react-intersection-observer"],
            infra: ["Vercel", "Vercel Speed Insights"],
        },
        highlights: [
            "react-intersection-observer triggers countup animations only when the statistics section enters the viewport — counters never run off-screen, preserving their impact on first view.",
            "Jarallax initialized as a side effect in useEffect with proper cleanup — no scroll listener leaks when navigating between pages via React Router.",
            "Full multi-page site (home, about, services, portfolio, blog, contact) delivered in 6 days from first commit to last.",
        ],
    },
    {
        slug: "cafe-mekaddesh",
        category: "landing",
        year: "Apr – Aug 2024",
        title: "Café Mekaddesh",
        tagline: "Website for a Colombian specialty coffee brand — built to give them a digital presence, a self-managed product catalog and a direct order channel, all without a CMS or eCommerce platform",
        image: "https://picsum.photos/seed/cafemekaddesh/1200/600",
        screenshots: [],
        github: "https://github.com/HannerB",
        githubPrivate: true,
        link: "https://cafe-mekaddesh.hanner.dev",
        tags: ["HTML", "CSS", "JavaScript", "jQuery", "PHP", "RevSlider", "WooCommerce CSS"],
        overview:
            "Café Mekaddesh is a Colombian specialty coffee brand with a strong social and environmental mission: organic coffee from the Sierra Nevada de Santa Marta, compostable packaging certified by the FDA and the EU, and artisan products handmade by women heads of household, people with functional diversity and drug rehabilitation communities across three departments. They had no digital presence. The goal was to build a complete website that communicated their story, let them show and manage 16+ products, and gave customers a clear path to order — without the cost or technical overhead of a CMS or eCommerce platform.",
        problem:
            "The brand had a compelling story and a catalog of products (coffee + handicrafts), but no website to show them — and no technical team to maintain one. A CMS like WordPress or a paid eCommerce solution was out of scope. They needed something they could keep alive without developers every time a product changed.",
        role: "Sole developer. Defined the page architecture, adapted and customized the HTML theme for the brand, built the dynamic product system, integrated the PHP contact form and set up deployment to GitHub Pages under a custom domain.",
        features: [
            { title: "Dynamic product catalog with no backend", description: "All 16 products live in a single JS data file. A generic single-product.html reads ?id= from the URL and renders the correct product at runtime — so adding or editing a product means updating one file, nothing more." },
            { title: "WhatsApp as order channel", description: "Since there was no checkout system, wa.me deep-link CTAs were placed at key moments across the site — turning browsers into direct conversations with the brand without requiring payment infrastructure." },
            { title: "Brand storytelling sections", description: "Structured content sections translated their social mission into visual proof: 300+ coffee growers supported, compostable packaging, EPA Barranquilla green business certification, and a food critic endorsement — giving credibility to first-time visitors." },
            { title: "Coffee profile slide", description: "An animated RevSlider section shows the SCAA-rated cup profile (aroma, flavor, roast level, acidity, body — 84.0 score) with separate desktop and mobile layouts, communicating specialty-grade quality to informed buyers." },
            { title: "Tabbed product menu with popups", description: "Products organized into tabs (All / Coffee / Handicrafts) with modal popups per item — giving visitors a clear browse experience without navigating away from the page." },
            { title: "PHP contact form", description: "Backend form handler for formal inquiries — so the team receives messages directly to their business email without relying on third-party form services." },
        ],
        stack: {
            frontend: ["HTML5", "CSS3", "JavaScript", "jQuery", "RevSlider"],
            backend: ["PHP"],
            ui: ["FontAwesome", "WooCommerce CSS", "Google Fonts"],
            infra: ["GitHub Pages", "Custom Domain (CNAME)"],
        },
        highlights: [
            "The dynamic product system solves a real maintenance problem: the client edits products in one JS array and every product page updates automatically — no CMS, no database, no redeployment.",
            "WhatsApp CTAs placed at the exact moment of purchase intent (product page, about page hero, header) replace a checkout flow entirely — appropriate for a brand that operates through direct sales.",
            "RevSlider's coffee profile slide adapts layout per breakpoint using CSS class toggles (show-on-mobile / hide-on-mobile) without duplicating slide logic — the same data renders correctly on any screen.",
        ],
    },
    {
        slug: "plataforma-50",
        category: "landing",
        year: "Jul 10 – Jul 12, 2024",
        title: "Plataforma50",
        tagline: "Bilingual ES/EN corporate landing page for a Colombian custom software development and IT consulting firm",
        image: "https://picsum.photos/seed/plataforma50/1200/600",
        screenshots: [],
        github: "https://github.com/HannerB/plataforma-50",
        githubPrivate: false,
        link: "https://plataforma-50.hanner.dev",
        tags: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "GSAP", "Swiper.js", "jQuery", "Bilingual"],
        overview:
            "Plataforma50 is a Colombian software development and IT consulting company that had no web presence. In three days I built their complete corporate landing page — dark-themed with orange accents — covering six service lines, an interactive technology showcase with category filters, a team section, a client logo slider and animated stat counters. The site ships in two fully parallel versions: Spanish (index.html) and English (index-e.html), with no CMS or i18n library involved. Clients showcased include Gobernación de Atlántico, Universidad Libre and Tu Vale Digital.",
        problem:
            "Plataforma50 needed to establish credibility with corporate clients fast. The site had to clearly communicate six service lines, demonstrate technical breadth across Frontend, Backend, Databases, Mobile, CMS and Cloud, and work in both Spanish and English — all without a framework or build pipeline.",
        role: "Frontend developer. Designed and built the full site from scratch: HTML/CSS layout, Bootstrap grid, GSAP scroll animations, Swiper.js client carousel, Odometer.js counters, the tabbed technology showcase in vanilla JS, and the bilingual duplicate.",
        features: [
            { title: "Six-service listing", description: "Hover-image cards for each service line: Custom Software Development, IT Consulting, System Integration, Cloud Solutions, Mobile App Development and IP/Copyright advisory." },
            { title: "Interactive technology showcase", description: "Tab navigation filters 30+ technology logos across six categories (Front-End, Back-End, Databases, Mobile, CMS, Cloud) — built in vanilla JS with no external dependency." },
            { title: "Client logo carousel", description: "Swiper.js slider displaying logos of key clients: Cemeder, Gobernación de Atlántico, Universidad Libre, Siar and Tu Vale Digital." },
            { title: "Animated stat counters", description: "Odometer.js counters reveal 80+ clients, 50+ success cases and 50+ reviews on scroll entry." },
            { title: "GSAP scroll animations", description: "Section elements animate in via GSAP ScrollTrigger — fade and translate effects on service cards, team cards and stat blocks." },
            { title: "Full bilingual site", description: "Complete Spanish and English versions maintained as parallel files (index.html / index-e.html) with identical structure, a language toggle in the nav and consistent design across both." },
        ],
        stack: {
            frontend: ["HTML5", "CSS3", "JavaScript"],
            styling: ["Bootstrap 5", "Custom CSS"],
            animation: ["GSAP ScrollTrigger", "Swiper.js", "Odometer.js"],
            ui: ["Boxicons", "Bootstrap Icons", "Magnific Popup", "Meanmenu"],
        },
        highlights: [
            "Parallel file naming convention (index.html / index-e.html) handles full bilingual parity without a CMS, i18n library or build step.",
            "Technology showcase tab system built in ~30 lines of vanilla JS — filters 30+ logos across 6 categories with zero dependencies.",
            "Full site delivered in 3 days including both language versions, animations and responsive layout.",
        ],
    },
    {
        slug: "lab-sensorial-sena",
        category: "webapp",
        year: "Jul 8 – Dec 3, 2024",
        title: "Lab Sensorial SENA",
        tagline: "Laravel web app that digitalizes sensory food evaluation panels at SENA Cedagro, replacing paper forms with a multi-booth scoring system and institutional Excel reporting.",
        image: "https://picsum.photos/seed/labsensorial/1200/600",
        screenshots: [],
        github: "https://github.com/HannerB/LAB-SENSORIAL-SENA",
        githubPrivate: false,
        link: "https://lab-sensorial-sena.hanner.dev",
        tags: ["Laravel 10", "PHP 8.2", "MySQL", "Tailwind CSS", "Excel Export"],
        demoNote: {
            status: "Currently in active use at SENA Cedagro, Centro de Valor Agregado.",
            steps: [
                { label: "Evaluation form", detail: "Visit / — enter any name, select booth 1, date 2024-11-16. \"Arepa de Choclo\" is pre-loaded as the active product." },
                { label: "Results panel", detail: "Visit /admin/resultados — select date 2024-11-16, any booth or all, click Generate Results." },
                { label: "Admin panel", detail: "Visit /login — password: 123. Configure products, samples, and booth settings." },
            ],
        },
        overview:
            "A specialized web application built for SENA Cedagro's sensory evaluation laboratory (Centro de Valor Agregado), serving food technology programs. Currently in active use at the institution.\n\nIt digitalizes the full workflow of a sensory panel session: an admin configures the test (active product, blind-coded samples, scoring attributes), panelists log in from individual evaluation booths (cabinas) to score each sample, and the system generates multi-sheet Excel reports ready for institutional review.\n\nThe system implements three standard sensory science methodologies: Triangular Test (identify the odd sample among three), Duo-Trio Test (identify which sample matches a reference), and Ordering/Ranking Test (score samples on up to five attributes — taste, smell, color, texture, appearance — with numeric values). Each test type has its own data capture flow and result aggregation logic.\n\nThe multi-booth architecture supports up to three parallel evaluation stations, each producing independent results that can be viewed individually or consolidated into a single aggregated report.",
        problem:
            "Sensory panel evaluations at SENA were conducted entirely on paper forms. After each session, staff had to manually transcribe scores, compute averages and rankings by hand, and format the final report — a process that could take several hours and was prone to transcription errors. Coordinating multiple simultaneous tasting booths without a centralized system made cross-booth data collection inconsistent and difficult to audit.",
        role: "Full-stack developer. Designed the Laravel data model (panelistas, productos, muestras, calificaciones, resultados, configuracion), built the admin panel and the per-booth evaluation interface, implemented the result aggregation logic for all three test types, developed the multi-sheet Excel export with Laravel Excel, and wrote the JavaScript handling real-time scoring interactivity and navigation safeguards during evaluation sessions.",
        features: [
            {
                title: "Three sensory evaluation methodologies",
                description: "Implements Triangular, Duo-Trio, and Ordering tests — each with its own capture flow, validation rules, and result calculation. ResultadosController branches logic by test type (prueba 1, 2, or 3), generating type-specific data structures without duplicating the underlying database schema.",
            },
            {
                title: "Multi-booth evaluation interface",
                description: "Panelists access the system from individual stations and score each blind-coded sample step by step. The UI enforces a linear progression, blocks accidental navigation with a beforeunload warning, and requires explicit submission confirmation — reducing incomplete evaluations that would skew results.",
            },
            {
                title: "Session configuration panel",
                description: "Admins set the active product, create blind-coded samples, enable per-sample scoring attributes, and control booth access. A one-product-at-a-time constraint enforced via the producto_habilitado flag prevents data contamination between concurrent test sessions.",
            },
            {
                title: "Institutional multi-sheet Excel export",
                description: "ResultadosExport dynamically generates a workbook with one sheet per active booth, a formatted sensory evaluation sheet, and a consolidated summary sheet. The output replicates the exact institutional reporting format required by SENA — no manual reformatting needed after export.",
            },
            {
                title: "Multi-booth result aggregation",
                description: "Results can be viewed per individual booth or aggregated across all stations. procesarTodasLasCabinas() intelligently combines per-booth data, handling variable panelist counts across stations and producing correct weighted totals for the consolidated report.",
            },
            {
                title: "Panelist and product management",
                description: "Full CRUD for panelists (name, ID, session history) and products. For Ordering tests, each product has individually toggled attribute flags (tiene_sabor, tiene_olor, tiene_color, tiene_textura, tiene_apariencia), ensuring only the relevant sensory dimensions appear on the evaluation form.",
            },
        ],
        stack: {
            backend: ["Laravel 10", "PHP 8.2", "Eloquent ORM"],
            frontend: ["Laravel Blade", "Tailwind CSS", "JavaScript (vanilla)"],
            database: ["MySQL", "Laravel Migrations"],
            exports: ["Maatwebsite Laravel Excel 3.1", "PhpSpreadsheet", "Multi-sheet XLSX"],
            tooling: ["Vite", "NPM", "Laravel Artisan"],
        },
        highlights: [
            "Three fundamentally different test types share the same database schema but diverge in capture and aggregation logic — handled via specialized methods in ResultadosController that branch by prueba type, keeping the data model clean without per-test-type tables.",
            "The Excel export dynamically builds the sheet array at runtime based on available data: 3 active booths produce 3 individual sheets + a summary; a single booth produces one clean sheet. The final format meets the SENA institutional standard with no post-processing.",
            "The multi-booth architecture adds a cabina integer field to calificaciones and resultados, enabling both per-station filtering and full aggregation — without duplicating panelist or sample records across booths.",
            "Ordering test attribute configuration bulk-updates all samples of a product in a single operation via MuestraController::actualizarAtributo(), keeping attribute sets consistent across all samples of the same product.",
        ],
    },
]

export const getProjectBySlug = (slug) => projects.find((p) => p.slug === slug)
export const getProjectsByCategory = (category) =>
    category === "all" ? projects : projects.filter((p) => p.category === category)

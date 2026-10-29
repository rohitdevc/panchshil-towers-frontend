# Panchshil Towers — Frontend

The frontend application for the **Panchshil Towers** residential development in Kharadi, Pune. The website presents the project's residences, configurations, amenities, galleries, location, and enquiry options.

- **Live Website:** https://panchshiltowers.netlify.app/
- **Repository:** https://github.com/rohitdevc/panchshil-towers-frontend

## Overview

Panchshil Towers is a premium residential development in Pune's eastern IT corridor. This website provides prospective homebuyers with information about the development, apartment configurations, lifestyle amenities, interiors, and surrounding neighbourhood.

The application uses Next.js App Router and retrieves its homepage content through API service modules, including project introductions, sliders, floor-plan configurations, amenities, galleries, and SEO metadata.

## Features

- **Project Overview** — Introduction to Panchshil Towers and its residential offering.
- **Residential Configurations** — Information about 3.5 BHK, 4.5 BHK, penthouse, and podium-villa options.
- **Floor Plans and Pricing** — Links to configuration-specific plans and pricing information.
- **Amenities** — Displays recreational, fitness, leisure, and community facilities.
- **Project Gallery** — Visual presentation of the development, interiors, landscaping, and amenities.
- **Location Information** — Highlights the project's proximity to Pune's eastern IT corridor and nearby commercial hubs.
- **Enquiry Forms** — Collects prospective customer details through contact forms.
- **Interactive Sliders** — Carousel-based presentation of project images and content.
- **Image Lightbox** — Supports an enhanced image-viewing experience.
- **Dynamic Content** — Retrieves project data through API service modules.
- **SEO Metadata** — Generates page metadata from the configured content service.
- **Responsive Design** — Tailwind CSS-based layouts for desktop and mobile devices.

## Technology Stack

| Technology | Purpose |
|---|---|
| Next.js 16 | Application framework and routing |
| React 19 | User interface |
| TypeScript | Type-safe development |
| Tailwind CSS 4 | Styling |
| GSAP | Animations |
| `@gsap/react` | GSAP integration with React |
| Swiper | Sliders and carousels |
| `yet-another-react-lightbox` | Image lightbox |
| `html-react-parser` | HTML content parsing |
| `libphonenumber-js` | Phone-number utilities |
| Validator | Input validation |
| React Icons | Interface icons |
| ESLint | Code quality |
| npm | Dependency management |
| Docker | Containerized deployment |
| Netlify | Hosting |

## Getting Started

### Prerequisites

- Node.js 22 or a compatible version
- npm
- Git

### 1. Clone the repository

```bash
git clone https://github.com/rohitdevc/panchshil-towers-frontend.git
cd panchshil-towers-frontend
```

### 2. Install dependencies

```bash
npm ci
```

### 3. Configure environment variables

Create a `.env` file in the project root with the values required by the application.

```dotenv
NEXT_PUBLIC_PATH=
BASEPATH_PREFIX=
ASSET_PREFIX=
API_DOMAIN_NAME=
REDIS_URL=
```

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_PATH` | Public asset path configuration |
| `BASEPATH_PREFIX` | Optional application base-path configuration |
| `ASSET_PREFIX` | Optional static asset prefix |
| `API_DOMAIN_NAME` | API domain used by the application |
| `REDIS_URL` | Redis URL used by the application. |

Use the correct values for your local, staging, or production environment. Verify the API service modules for any additional requirements.

**Security:** Never commit real credentials or private tokens. Review whether `FRONTEND_TOKEN_KEY` is exposed to browser-side code, and do not use it to protect sensitive operations if it is client-accessible.

### 4. Start the development server

```bash
npm run dev
```

Open the application in your browser:

http://localhost:2984

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the development server on port `2984` |
| `npm run build` | Builds the application for production |
| `npm run start` | Starts the production server on port `2984` |
| `npm run lint` | Runs ESLint |

## Project Structure

```text
panchshil-towers-frontend/
├── .github/
│   └── workflows/       # Deployment workflow
├── app/                 # Next.js routes, layouts, and global styles
├── components/          # Reusable UI and page components
├── lib/                 # API services and shared utilities
├── public/              # Static assets
├── types/               # TypeScript definitions
├── Dockerfile            # Multi-stage production image
├── docker-compose.yml    # Docker Compose configuration
├── next.config.ts        # Next.js and deployment configuration
├── package.json          # Dependencies and scripts
├── package-lock.json     # Locked npm dependency versions
├── eslint.config.mjs     # ESLint configuration
├── postcss.config.mjs    # PostCSS configuration
└── tsconfig.json         # TypeScript configuration
```

## Production Build

To build and run the application locally:

```bash
npm run build
npm run start
```

The production server listens on port `2984` by default.

## Docker Deployment

The repository includes a multi-stage Dockerfile using Node.js 22 Alpine and Next.js standalone output.

### Build and start

After configuring the required variables in `.env`, run:

```bash
docker compose up -d --build
```

### View logs

```bash
docker compose logs -f pt-web
```

### Stop the application

```bash
docker compose down
```

The Docker Compose service is named `pt-web`, and the container is named `panchshiltowers-frontend`. Port `2984` is mapped from the host to the container.

The Docker build receives the application configuration through build arguments. Rebuild the image after changing build-time values.

## Netlify Deployment

The live website is hosted on Netlify.

To deploy the project:

1. Connect the GitHub repository to Netlify.
2. Configure the required environment variables in the Netlify site settings.
3. Select a compatible Node.js version.
4. Configure the build command as `npm run build`.
5. Verify the API endpoint, project images, floor-plan links, and enquiry form integration.
6. Deploy and test the main page on desktop and mobile.

### Search engine indexing

The current Next.js configuration applies an `X-Robots-Tag: noindex, nofollow` header when the deployment domain contains `netlify.app`.

This is suitable for a preview deployment if the intention is to keep it out of search results. If the website should be indexed publicly, review and adjust the condition for the intended production domain.

## Development Guidelines

- Keep API integration logic within the appropriate modules under `lib/`.
- Use TypeScript for component props and API data.
- Follow the existing component structure and styling conventions.
- Run `npm run lint` before submitting changes.
- Run `npm run build` to verify production compilation.
- Test image galleries, configuration links, and enquiry forms after changes.
- Keep environment-specific configuration and secrets out of committed files.

## Deployment Workflow

The repository includes a GitHub Actions workflow triggered by pushes to `main`. It uses a self-hosted runner to pull the latest code into the production checkout.

For secure deployment:

- Protect the `main` branch.
- Restrict access to the self-hosted runner.
- Use a dedicated, appropriately restricted SSH key.
- Keep private keys and credentials outside the repository.
- Ensure the production server's build and restart process is managed appropriately.

## License

No explicit open-source license is documented in this README. Contact the repository owner for permission before redistributing or reusing the source code.

---

**Project:** Panchshil Towers Residential Development  
**Framework:** Next.js · React · TypeScript · Tailwind CSS  
**Hosting:** Netlify  
**Repository:** https://github.com/rohitdevc/panchshil-towers-frontend
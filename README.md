# Korea Health Guide

A comprehensive web application providing healthcare information and resources for foreigners in Korea. This project aims to bridge the language and cultural gap in accessing healthcare services by providing an easy-to-use platform with relevant information, facility directories, and community support.

## Project Overview

Korea Health Guide is built to help non-Korean speakers navigate the Korean healthcare system with confidence. The application provides:

- Detailed articles about healthcare topics specific to Korea
- Hospital and pharmacy directories with English-speaking staff information
- Interactive maps for locating medical facilities
- Community bulletin board for questions and discussions
- Step-by-step guides for common healthcare procedures

## Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Sanity.io (Headless CMS)
- **Maps**: NAVER Maps API
- **Build Tools**: Vite
- **Deployment**: Netlify/Vercel

## Features

### Articles Section
- Curated blog posts about healthcare topics
- Categories for easy navigation
- Search functionality

### Healthcare Facility Directory
- Interactive map showing hospitals and pharmacies
- Filtering by facility type, language support, and services
- Detailed information pages for each facility

### Healthcare Guide
- Step-by-step instructions for navigating healthcare scenarios
- Information about health insurance for foreigners
- Emergency medical information

### Bulletin Board
- Community discussions organized by topics
- Q&A section for healthcare questions

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or pnpm or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/korea-health-guide.git
cd korea-health-guide

# Install dependencies
npm install
# or
pnpm install
# or
bun install

# Start the development server
npm run dev
# or
pnpm dev
# or
bun dev
```

### Environment Setup

Create a `.env` file in the root directory with the following variables:
```
VITE_SANITY_PROJECT_ID=your_sanity_project_id
VITE_SANITY_DATASET=your_sanity_dataset
VITE_NAVER_MAPS_CLIENT_ID=your_naver_maps_client_id
```

## Project Structure

```
korea-health-guide/
├── src/                  # Application source code
│   ├── components/       # Reusable UI components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions and configurations
│   ├── pages/            # Page components
│   └── services/         # API service integrations
├── public/               # Static assets
├── sanity-backend/       # Sanity CMS configuration
└── [configuration files] # Various config files
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- NAVER Maps for providing the mapping API
- Sanity.io for the headless CMS platform
- All contributors who have helped with content and development

# SheLearns Backend

A Node.js/Express API that powers the SheLearns platform - empowering women in tech by providing structured career roadmaps, resources, and learning paths.

## 🚀 Project Overview

SheLearns aims to help women navigate career paths in technology by providing curated roadmaps, video resources, and learning guides for various tech roles. The API serves as the backend for the SheLearns platform, offering endpoints to search and retrieve career paths and generate personalized roadmap PDFs.

## ✨ Features

- **Career Path Database**: Access to 14 different tech career paths
- **Comprehensive Roadmaps**: Each career includes links to roadmap.sh, tutorial videos, and learning guides
- **PDF Generation**: Create downloadable career roadmap PDFs
- **Search Functionality**: Find specific career paths by keyword

## 🛠️ Tech Stack

- **Node.js & Express**: Server framework
- **MongoDB & Mongoose**: Database and ODM
- **Puppeteer**: PDF generation
- **Mustache**: HTML templating
- **Dotenv**: Environment configuration
- **CORS**: Cross-Origin Resource Sharing support

## 📋 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/careers` | Get all available career paths |
| GET | `/api/careers/search?keyword=value` | Search careers by keyword |
| GET | `/api/careers/:id` | Get specific career with roadmap details |
| GET | `/api/careers/:id/roadmap` | Generate and get roadmap PDF for a career |

## 🏁 Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB database
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Berko-Adepa-Agnes/shelearns-backend.git
   cd shelearns-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/shelearns
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. The server will start running at `http://localhost:3000`

### Available Scripts

- `yarn build` - Prepares dependencies
- `yarn start` - Starts the production server
- `yarn dev` - Starts the development server with hot reload

## 🗂️ Project Structure

```
shelearns-backend/
│
├── index.js                  # Application entry point
├── package.json              # Dependencies and scripts
│
└── src/
    ├── app.js                # Express application setup
    ├── config/
    │   └── database.js       # MongoDB connection and initial data
    │
    ├── controllers/
    │   └── career.js         # API route handlers
    │
    ├── models/
    │   ├── career.js         # Career schema
    │   └── roadmap.js        # Roadmap schema
    │
    ├── templates/
    │   └── roadmap.html      # PDF template for roadmaps
    │
    └── utilities/
        └── puppeteer.js      # PDF generation service
```

## 📑 Career Paths

The platform currently supports the following tech career paths:

- Frontend Engineer
- Backend Engineer
- Fullstack Developer
- Data Scientist
- DevOps Engineer
- UX Designer
- AI Engineer
- Technical Writer
- Product Manager
- Cyber Security
- Blockchain Developer
- Data Analyst
- Android Developer
- iOS Developer

## 🚀 Deployment

The application is designed to be deployed to any Node.js hosting platform. Make sure to set the appropriate environment variables on your hosting platform.

## 👩‍💻 Author

- **Agnes Berko** - [GitHub](https://github.com/Berko-Adepa-Agnes)

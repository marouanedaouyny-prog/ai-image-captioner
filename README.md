# AI Image Captioner

A utility tool that uses AI to analyze images and generate descriptive alt-text, captions, and tags for improved accessibility and SEO.

## Features
- **AI-Driven Image Analysis:** Automatically generate descriptive alt-text for each image.
- **Social Media Captions:** Create engaging captions for various platforms.
- **Accessibility Focus:** Generates detailed descriptions for visually impaired users.

## Setup

### Backend (Python)
1. Go to `backend/`
2. Install dependencies: `pip install fastapi uvicorn google-generativeai pillow python-dotenv`
3. Create a `.env` file based on `.env.example` and add your `GEMINI_API_KEY`.
4. Run the server: `python main.py`

### Frontend (Next.js)
1. Go to `frontend/`
2. Run `npm install`
3. Run `npm run dev`

## Tech Stack
- **Backend:** Python, FastAPI, Gemini 1.5 Flash, PIL
- **Frontend:** Next.js, Tailwind CSS, Lucide React

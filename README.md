# AI Image Captioner

A utility tool that uses AI to analyze images and generate descriptive alt-text, captions, and tags for improved accessibility and SEO.

![AI Image Captioner Demo](./demo.png)

## ✨ Features

- **AI-Driven Image Analysis:** Automatically generate descriptive alt-text for each image using Google's Gemini 1.5 Flash
- **Social Media Captions:** Create engaging captions with hashtags for various platforms
- **Accessibility Focus:** Generates detailed descriptions for visually impaired users
- **FastAPI Backend:** High-performance API with automatic validation and error handling
- **Modern Frontend:** Built with Next.js 14, Tailwind CSS, and TypeScript

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Python 3.9+
- [Google Gemini API Key](https://aistudio.google.com/app/apikey)

### Backend Setup (Python)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   # Windows
   venv\Scripts\activate
   # Mac/Linux
   source venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

5. Add your Gemini API key to `.env`:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```

6. Run the server:
   ```bash
   python main.py
   ```

   The API will be available at `http://localhost:8003`

### Frontend Setup (Next.js)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📡 API Documentation

### POST /analyze-image

Analyzes an uploaded image and returns AI-generated captions and alt-text.

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: `file` (image file, max 10MB)

**Response:**
```json
{
  "filename": "example.jpg",
  "analysis": "1. Alt-text: ...\n2. Caption: ...\n3. Description: ...",
  "status": "success"
}
```

**Error Response:**
```json
{
  "detail": "File must be an image"
}
```

### Example with cURL

```bash
curl -X POST http://localhost:8003/analyze-image \
  -F "file=@path/to/your/image.jpg"
```

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **Google Gemini API** - AI image analysis
- **Pillow (PIL)** - Image processing
- **Pydantic** - Data validation

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Modern icon library

## 📁 Project Structure

```
ai-image-captioner/
├── backend/
│   ├── main.py           # FastAPI application
│   ├── requirements.txt  # Python dependencies
│   └── .env.example      # Environment variables template
├── frontend/
│   ├── app/             # Next.js App Router pages
│   ├── components/      # Reusable React components
│   └── package.json
├── LICENSE
└── README.md
```

## 🔒 Security Notes

- API key validation is performed on startup
- File type validation prevents non-image uploads
- File size limit: 10MB
- CORS is restricted to specific origins in production

## 🤝 Contributing

This is a portfolio project. Feel free to fork and customize for your needs.

## 📄 License

MIT License - See [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Google Gemini API](https://ai.google.dev/)
- UI components from [Lucide Icons](https://lucide.dev/)

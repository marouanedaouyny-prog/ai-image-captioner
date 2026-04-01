from fastapi import FastAPI, HTTPException, UploadFile, File, status
from pydantic import BaseModel, Field
import google.generativeai as genai
import os
from dotenv import load_dotenv
import io
from PIL import Image

load_dotenv()

# Validate API key on startup
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY environment variable is required. Please set it in your .env file.")

app = FastAPI(title="AI Image Captioner API")

# Configure Gemini for Vision
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-1.5-flash')

@app.post("/analyze-image")
async def analyze_image(file: UploadFile = File(...)):
    """Analyze uploaded image and return AI-generated captions and alt-text."""
    try:
        # Validate file type
        if not file.content_type or not file.content_type.startswith('image/'):
            raise HTTPException(status_code=400, detail="File must be an image")
        
        # Read and validate image
        image_bytes = await file.read()
        if len(image_bytes) > 10 * 1024 * 1024:  # 10MB limit
            raise HTTPException(status_code=400, detail="Image size must be less than 10MB")
        
        image = Image.open(io.BytesIO(image_bytes))
        
        # Verify image can be opened
        try:
            image.verify()
            image = Image.open(io.BytesIO(image_bytes))  # Reopen after verify
        except Exception:
            raise HTTPException(status_code=400, detail="Invalid or corrupted image file")

        prompt = """
        Analyze this image and provide:
        1. A high-quality SEO Alt-text (concise and descriptive).
        2. A social media caption (engaging and includes 3 hashtags).
        3. A detailed accessibility description for visually impaired users.

        Format the output clearly.
        """

        # Generate content with image
        response = model.generate_content([prompt, image])

        return {
            "filename": file.filename,
            "analysis": response.text,
            "status": "success"
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to analyze image: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8003)

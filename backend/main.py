from fastapi import FastAPI, HTTPException, UploadFile, File
import google.generativeai as genai
import os
from dotenv import load_dotenv
import io
from PIL import Image

load_dotenv()

app = FastAPI(title="AI Image Captioner API")

# Configure Gemini for Vision
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel('gemini-1.5-flash')

@app.post("/analyze-image")
async def analyze_image(file: UploadFile = File(...)):
    """Analyze uploaded image and return AI-generated captions and alt-text."""
    try:
        # Read and validate image
        image_bytes = await file.read()
        image = Image.open(io.BytesIO(image_bytes))
        
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
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8003)

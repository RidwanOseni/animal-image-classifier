# Animal Image Classifier 🐾

This application lets you upload an image of an animal to classify it, fetch a description from Wikipedia, and determine if it is dangerous—all using mock data for quick testing.

---

## Features ✨

- **Image Upload**: Upload an image of an animal directly from your browser.
- **Mock Classification**: Simulates image classification to identify the animal.
  - You can enable actual image classification by uncommenting the provided code, which uses a **zero-shot-image-classification pipeline** from Hugging Face's `transformers` library.

AI AGENT FOR:
- **Wikipedia Integration**: fetch a brief description of the classified animal directly from Wikipedia using its public API. This ensures that users receive accurate and contextual information about the animal.
- **Safety Analysis**: determine whether the animal is dangerous based on its description. This is achieved using OpenAI's GPT model, which analyzes the description and provides an intelligent response. In the mock setup, the logic is simulated for demonstration purposes.

---

## How It Works 🛠️

1. **Front-end**: Built with Next.js, allows users to upload an image and displays the result.
2. **API Route**: 
   - Processes the uploaded image.
   - Mocks the image classification process by using a hardcoded result:  
     `"The image is classified as 'Cat' with a confidence of 95.00%"`
   - Fetches a description from Wikipedia based on the classification.
   - Analyzes the danger level using OpenAI GPT.
3. **Python Script**:
   - Provided as a reference for real image classification using the `openai/clip-vit-large-patch14` model.
   - Currently unused due to the mock implementation.
   - Users can enable the real logic by uncommenting the relevant sections.

---

## Prerequisites 🖥️

### Local Development

1. **Node.js**: Ensure Node.js (version 16 or higher) is installed.
2. **Environment Variables**:
   - Add your OpenAI API key in a `.env` file:
     ```
     OPENAI_API_KEY=your_openai_api_key_here
     ```
3. **Dependencies**: Install project dependencies:
   ```bash
   npm install
Getting Started 🚀
Run the Application
Start the development server:
bash
Copy code
npm run dev
Open your browser and go to http://localhost:3000.
Uploading an Image
Upload an image of an animal.
Click "Upload and Analyze Image".
The app will display:
The classification (mocked as "Cat" with 95% confidence).
A description retrieved from Wikipedia.
Whether the animal is dangerous (mock logic).
Mock Implementation 🐾
This project uses mock data to bypass real image processing due to environment constraints. Here's how it works:

Mock Result:
The classification result is hardcoded as:

javascript
Copy code
const mockResult = "The image is classified as 'Cat' with a confidence of 95.00%";
Switching to Real Classification:
The API and Python script include commented sections for real image classification using a zero-shot-image-classification pipeline. Uncomment the following sections to enable real functionality:

In the Next.js API Route:

javascript
Copy code
const command = `python ${pythonScriptPath} ${tempPath} ${labels.join(" ")}`;
In the Python Script:

python
Copy code
predictions = detector(image, candidate_labels=labels)
Once the local Python environment is properly set up, the application will:

Use the openai/clip-vit-large-patch14 model to classify the uploaded image.
Generate dynamic results based on the actual image content.
Reference: Python Image Classification Script 🐍
For real image classification, a Python script is provided in ImageClassification.py. This script uses the Hugging Face transformers library and the openai/clip-vit-large-patch14 model for zero-shot image classification.

Real Classification Workflow:
The uploaded image is saved temporarily by the API.
The API invokes the Python script, passing the image path and candidate labels.
The script runs the Hugging Face pipeline to classify the image.
The classification results are returned to the API, which processes and displays them.
Notes 📝
The mock setup is ideal for environments where Python dependencies or models cannot be run locally.
Switching to real classification may require:
A Python runtime.
Installation of dependencies like transformers and Pillow.
Enjoy building your Animal Image Classifier! 🐾

vbnet
Copy code

This **README.md** explains everything about the project, including the mock implementation, how users can enable real functionality, and the role of the AI agents for Wikipedia integration and safety analysis. Let me know if you'd like to customize it further!






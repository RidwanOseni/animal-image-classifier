import { NextResponse } from "next/server";
import fetch from "node-fetch";
import OpenAI from "openai";

export const runtime = "nodejs";

// Initialize OpenAI API client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure your API key is in the environment variables
});

interface WikipediaResponse {
  extract?: string;
  title?: string;
  description?: string;
  [key: string]: any;
}

export async function POST(req: Request) {
  const contentType = req.headers.get("content-type") || "";
  if (!contentType.includes("multipart/form-data")) {
    return NextResponse.json(
      { error: "Content-Type must be multipart/form-data" },
      { status: 400 }
    );
  }

  const formData = await req.formData();
  const file = formData.get("file");

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "Invalid file upload" }, { status: 400 });
  }

  try {
    // Mock classification result for testing purposes
    const mockResult =
      "The image is classified as 'Cat' with a confidence of 95.00%";

    // Uncomment the following code to integrate real image classification logic
    /*
    const fs = require("fs");
    const { exec } = require("child_process");
    const path = require("path");

    // Save the uploaded image temporarily
    const tempPath = path.join("/tmp", file.name);
    fs.writeFileSync(tempPath, await file.arrayBuffer());

    // Run the Python script for real classification
    const labels = ["Cat", "Dog", "Horse", "Bird"];
    const pythonScriptPath = "/path/to/ImageClassification.py"; // Update this to your script path
    const command = `python ${pythonScriptPath} ${tempPath} ${labels.join(" ")}`;

    const execPromise = new Promise<string>((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) return reject(stderr || error.message);
        resolve(stdout.trim());
      });
    });

    const actualResult = await execPromise;
    */

    const regex = /'([^']+)'/;
    const match = mockResult.match(regex);
    const animalName = match ? match[1] : "Unknown";

    const wikiResponse = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
        animalName
      )}`
    );

    if (!wikiResponse.ok) {
      return NextResponse.json(
        { error: "Failed to fetch Wikipedia data" },
        { status: 500 }
      );
    }

    const wikiData = (await wikiResponse.json()) as WikipediaResponse;
    const description = wikiData.extract || "No description available.";

    // Use OpenAI to analyze if the animal is dangerous
    const aiResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert in animal safety analysis.",
        },
        {
          role: "user",
          content: `
            Analyze the following animal description and determine if it is dangerous. 
            Respond with "Yes, it is dangerous" or "No, it is not dangerous."
            Description: "${description}"
          `,
        },
      ],
      max_tokens: 50,
      temperature: 0.7,
    });

    const aiResult = aiResponse.choices[0].message?.content?.trim();
    const isDangerous = aiResult?.toLowerCase().includes("yes");

    const response = {
      classification: mockResult, // Replace with `actualResult` when using real classification
      description,
      isDangerous,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Error processing request" },
      { status: 500 }
    );
  }
}

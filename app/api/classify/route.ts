// animal-image-classifier/app/api/classify/route.ts
import { NextResponse } from 'next/server';
import formidable from 'formidable';
import { exec } from 'child_process';
import util from 'util';
import path from 'path';
import { NextApiRequest } from 'next';

// Define the expected structure of the files object
interface FormidableFiles {
  file: Array<{
    filepath: string;
    originalFilename: string;
    mimetype: string;
    size: number;
  }>;
}

const execPromise = util.promisify(exec);

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextApiRequest) {
  const form = new formidable.IncomingForm();
  return new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return reject(new NextResponse('Error parsing the file', { status: 500 }));
      }

      const uploadedFiles = files.file; // Access the files using the correct key
      if (!uploadedFiles || uploadedFiles.length === 0) {
        return reject(new NextResponse('No files uploaded', { status: 400 }));
      }

      const imagePath = uploadedFiles[0].filepath; // Now TypeScript should recognize this
      const labels = 'cat dog lion tiger elephant rabbit bear fox wolf giraffe zebra'; // Example labels
      const scriptPath = path.join(process.cwd(), 'ImageClassification.py'); // Adjust path if necessary

      try {
        const { stdout, stderr } = await execPromise(`python3 ${scriptPath} ${imagePath} <<< "${labels}"`);
        if (stderr) {
          throw new Error(stderr);
        }
        resolve(NextResponse.json({ result: stdout }));
      } catch (error) {
        console.error('Error classifying image:', error);
        reject(new NextResponse('Error classifying the image', { status: 500 }));
      }
    });
  });
}
import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises"; // Use async fs operations

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Disable Next.js body parsing for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const form = new formidable.Formidable();

  try {
    const [fields, files] = await form.parse(req);

    // Ensure a file was uploaded
    if (!files.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Convert single file to array if necessary
    const uploadedFiles = Array.isArray(files.file) ? files.file : [files.file];

    // Upload to Cloudinary
    const uploadedUrls = await Promise.all(
      uploadedFiles?.map(async (file) => {
        const fileBuffer = await fs.readFile(file.filepath);
        const uploadResponse = await cloudinary.uploader.upload_stream(
          { resource_type: "image" },
          (error, result) => {
            if (error) {
              throw new Error("Cloudinary upload failed");
            }
            return result?.secure_url;
          }
        );

        return uploadResponse;
      })
    );

    return res.status(200).json({ message: "Upload successful", urls: uploadedUrls });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ error: "File upload failed" });
  }
}

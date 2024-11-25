import { defineEventHandler, readMultipartFormData } from "h3";
import { randomUUID } from "crypto";
import { join } from "path";
import { promises as fs } from "fs";

const UPLOAD_DIR = join(process.cwd(), "public", "uploads");

export default defineEventHandler(async (event) => {
  try {
    const files = await readMultipartFormData(event);
    if (!files?.length) {
      throw new Error("No file uploaded");
    }

    const file = files[0];
    const fileExt = file.filename.split(".").pop();
    const fileName = `${randomUUID()}.${fileExt}`;
    const filePath = join(UPLOAD_DIR, fileName);

    // Ensure upload directory exists
    await fs.mkdir(UPLOAD_DIR, { recursive: true });

    // Write file
    await fs.writeFile(filePath, file.data);

    return {
      url: `/uploads/${fileName}`,
    };
  } catch (error) {
    console.error("Upload error:", error);
    throw createError({
      statusCode: 500,
      message: "Upload failed",
    });
  }
});

import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { isAuthenticated } from "@/lib/auth";

const getFilePath = () => path.join(process.cwd(), "src", "data", "gallery-images.json");

const readGallery = (): any[] => {
  try {
    const filePath = getFilePath();
    if (!fs.existsSync(filePath)) return [];
    const fileContent = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Error reading gallery images:", error);
    return [];
  }
};

const writeGallery = (images: any[]): boolean => {
  try {
    const filePath = getFilePath();
    fs.writeFileSync(filePath, JSON.stringify(images, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Error writing gallery images:", error);
    return false;
  }
};

export async function GET(request: NextRequest) {
  const images = readGallery();
  return NextResponse.json(images);
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { src, alt, category } = body;

    if (!src || !alt || !category) {
      return NextResponse.json(
        { success: false, message: "src, alt, and category are required fields" },
        { status: 400 }
      );
    }

    const images = readGallery();
    const newId = images.length > 0 ? Math.max(...images.map((img) => img.id)) + 1 : 1;

    const newImage = { id: newId, src, alt, category };
    images.push(newImage);
    writeGallery(images);

    return NextResponse.json({ success: true, image: newImage });
  } catch (error) {
    console.error("Error adding gallery image:", error);
    return NextResponse.json(
      { success: false, message: "Failed to add image" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const idParam = searchParams.get("id");

    if (!idParam) {
      return NextResponse.json({ success: false, message: "Image ID is required" }, { status: 400 });
    }

    const id = parseInt(idParam, 10);
    const images = readGallery();
    const imageToDelete = images.find((img) => img.id === id);

    if (!imageToDelete) {
      return NextResponse.json({ success: false, message: "Image not found" }, { status: 404 });
    }

    // Filter out image
    const filtered = images.filter((img) => img.id !== id);
    writeGallery(filtered);

    // Delete physical file if it starts with /uploads/
    if (imageToDelete.src.startsWith("/uploads/")) {
      try {
        const filePath = path.join(process.cwd(), "public", imageToDelete.src);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      } catch (err) {
        console.error("Failed to delete physical file:", err);
      }
    }

    return NextResponse.json({ success: true, message: "Image deleted successfully" });
  } catch (error) {
    console.error("Error deleting gallery image:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete image" },
      { status: 500 }
    );
  }
}

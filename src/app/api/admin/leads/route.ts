import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { isAuthenticated } from "@/lib/auth";

const getFilePath = () => path.join(process.cwd(), "src", "data", "leads.json");

const readLeads = (): any[] => {
  try {
    const filePath = getFilePath();
    if (!fs.existsSync(filePath)) return [];
    const fileContent = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Error reading leads:", error);
    return [];
  }
};

const writeLeads = (leads: any[]): boolean => {
  try {
    const filePath = getFilePath();
    fs.writeFileSync(filePath, JSON.stringify(leads, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Error writing leads:", error);
    return false;
  }
};

export async function GET(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const leads = readLeads();
  return NextResponse.json(leads);
}

export async function PATCH(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, message: "Lead ID and status are required" },
        { status: 400 }
      );
    }

    const leads = readLeads();
    const index = leads.findIndex((l) => l.id === id);

    if (index === -1) {
      return NextResponse.json({ success: false, message: "Lead not found" }, { status: 404 });
    }

    leads[index].status = status;
    writeLeads(leads);

    return NextResponse.json({ success: true, lead: leads[index] });
  } catch (error) {
    console.error("Error updating lead:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update lead" },
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
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, message: "Lead ID is required" }, { status: 400 });
    }

    const leads = readLeads();
    const filtered = leads.filter((l) => l.id !== id);

    if (leads.length === filtered.length) {
      return NextResponse.json({ success: false, message: "Lead not found" }, { status: 404 });
    }

    writeLeads(filtered);
    return NextResponse.json({ success: true, message: "Lead deleted successfully" });
  } catch (error) {
    console.error("Error deleting lead:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete lead" },
      { status: 500 }
    );
  }
}

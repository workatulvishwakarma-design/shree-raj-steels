"use server";

import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";

// Helper to save lead to JSON file
function saveLead(leadData: {
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  products: string;
  message: string;
}) {
  try {
    const dir = path.join(process.cwd(), "src", "data");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const filePath = path.join(dir, "leads.json");
    let leads: any[] = [];
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      leads = JSON.parse(fileContent);
    }
    
    const newLead = {
      id: `lead-${randomUUID()}`,
      name: leadData.name,
      company: leadData.company,
      email: leadData.email,
      phone: leadData.phone,
      country: leadData.country,
      products: leadData.products,
      message: leadData.message,
      date: new Date().toISOString(),
      status: "new",
    };

    leads.push(newLead);
    fs.writeFileSync(filePath, JSON.stringify(leads, null, 2), "utf-8");
  } catch (error) {
    console.error("Failed to save lead in actions:", error);
  }
}

export async function submitContactForm(formData: FormData) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const data = {
    name: String(formData.get("name") || ""),
    company: String(formData.get("company") || ""),
    email: String(formData.get("email") || ""),
    phone: String(formData.get("phone") || ""),
    country: String(formData.get("country") || ""),
    products: formData.getAll("productInterest").join(", ") || "General Inquiry",
    message: String(formData.get("message") || ""),
  };

  // Save to database
  saveLead(data);

  console.log("Saved New Contact Lead:", data);

  return { success: true, message: "Thank you for your enquiry. We will contact you shortly." };
}

export async function submitQuoteForm(data: any) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Extract values from quote request safely
  const contact = data.contactDetails || {};
  const itemsSummary = Array.isArray(data.items)
    ? data.items.map((item: any) => `${item.category || ""} ${item.type || ""}`.trim()).join(", ")
    : "Quote Request";

  const messageSummary = `Quote request items: ${
    Array.isArray(data.items)
      ? data.items
          .map((item: any) => {
            return `[Category: ${item.category || ""}, Grade: ${item.grade || ""}, Size: ${item.size || ""}, Qty: ${item.quantity || ""}]`;
          })
          .join(" | ")
      : ""
  }. Additional Notes: ${data.notes || ""}`;

  const leadData = {
    name: contact.name || data.name || "Anonymous Requester",
    company: contact.company || data.company || "",
    email: contact.email || data.email || "",
    phone: contact.phone || data.phone || "",
    country: contact.country || data.country || "",
    products: itemsSummary || "Steel Products",
    message: messageSummary,
  };

  // Save to database
  saveLead(leadData);

  console.log("Saved New Quote Request Lead:", leadData);

  return { success: true, message: "Quote request received successfully." };
}

"use server";

export async function submitContactForm(formData: FormData) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const data = {
    name: formData.get("name"),
    company: formData.get("company"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    country: formData.get("country"),
    productInterest: formData.getAll("productInterest"),
    message: formData.get("message"),
  };

  console.log("New Contact Form Submission:", data);

  // In a real application, you would integrate with an email service (e.g., Resend, SendGrid)
  // or insert this data into a database.

  return { success: true, message: "Thank you for your enquiry. We will contact you shortly." };
}

export async function submitQuoteForm(data: any) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  console.log("New Quote Request:", JSON.stringify(data, null, 2));

  // In a real application, you would send this to your CRM or via email.

  return { success: true, message: "Quote request received successfully." };
}

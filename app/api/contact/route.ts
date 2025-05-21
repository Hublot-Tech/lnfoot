import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import ContactResponseEmail from "@/components/email-templates/contact-response";
import AdminNotificationEmail from "@/components/email-templates/admin-notification";

// Initialiser Resend avec votre clé API
const resend = new Resend(process.env.RESEND_API_KEY! as string);

// Adresse email de l'administrateur
const ADMIN_EMAIL = "hublotslnfoot@gmail.com";

export async function POST(req: NextRequest) {
  try {
    // Extraire les données du formulaire
    const { name, email, message } = await req.json();
    
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Tous les champs sont obligatoires" },
        { status: 400 }
      );
    }

    // Valider l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Adresse email invalide" },
        { status: 400 }
      );
    }

    // Envoyer l'email à l'administrateur
    await resend.emails.send({
      from: "LN FOOT <onboarding@resend.dev>",
      to: ADMIN_EMAIL,
      subject: `Nouveau message de contact - ${name}`,
      react: AdminNotificationEmail({ name, email, message }),
    });

    // Envoyer l'email de confirmation au client
    await resend.emails.send({
      from: "LN FOOT <onboarding@resend.dev>",
      to: email,
      subject: "Merci pour votre message - LN FOOT",
      react: ContactResponseEmail({ name, email, message, subject: "Demande via le site web" }),
    });

    return NextResponse.json(
      { success: true, message: "Message envoyé avec succès" }
    );
  } catch (error: any) {
    console.error("Erreur d'envoi d'email:", error);
    return NextResponse.json(
      { error: `Une erreur s'est produite: ${error.message}` },
      { status: 500 }
    );
  }
}

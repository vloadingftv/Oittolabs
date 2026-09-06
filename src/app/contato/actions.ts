"use server";

import { site } from "@/content/site";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  /** Erros por campo. */
  fields?: Partial<Record<"name" | "email" | "message", string>>;
};

const MAX = { name: 120, company: 160, phone: 40, message: 4000 };

function clean(value: FormDataEntryValue | null, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

/**
 * Envio do formulário de contato.
 *
 * Usa a API HTTP do Resend quando RESEND_API_KEY está configurada nas variáveis
 * de ambiente da Vercel (nenhuma dependência extra é necessária). Sem a chave,
 * a ação não finge ter enviado: devolve erro e a interface mostra o e-mail e o
 * WhatsApp diretos.
 *
 * Para ativar:
 *   1. Crie a conta em resend.com e verifique o domínio targetadvisor.com.br.
 *   2. Na Vercel, defina RESEND_API_KEY e CONTACT_TO (destinatário).
 */
export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot: campo invisível que só um robô preenche.
  if (clean(formData.get("website"), 100)) {
    return { status: "success" };
  }

  const name = clean(formData.get("name"), MAX.name);
  const email = clean(formData.get("email"), MAX.name);
  const company = clean(formData.get("company"), MAX.company);
  const phone = clean(formData.get("phone"), MAX.phone);
  const subject = clean(formData.get("subject"), MAX.name);
  const message = clean(formData.get("message"), MAX.message);

  const fields: ContactState["fields"] = {};
  if (name.length < 2) fields.name = "Informe seu nome.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
    fields.email = "Informe um e-mail válido.";
  if (message.length < 20)
    fields.message = "Conte um pouco mais — pelo menos 20 caracteres.";

  if (Object.keys(fields).length > 0) {
    return {
      status: "error",
      message: "Revise os campos destacados.",
      fields,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO ?? site.contact.email;
  const from = process.env.CONTACT_FROM ?? "site@targetadvisor.com.br";

  if (!apiKey) {
    return {
      status: "error",
      message:
        "O envio automático ainda não está configurado. Escreva para " +
        `${site.contact.email} — respondemos no mesmo dia útil.`,
    };
  }

  const lines = [
    ["Nome", name],
    ["E-mail", email],
    ["Empresa", company || "—"],
    ["Telefone", phone || "—"],
    ["Assunto", subject || "—"],
    ["", ""],
    ["Mensagem", message],
  ]
    .map(([label, value]) => (label ? `${label}: ${value}` : ""))
    .join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Site Target Advisor <${from}>`,
        to: [to],
        reply_to: email,
        subject: `[Site] ${subject || "Novo contato"} — ${name}`,
        text: lines,
      }),
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) throw new Error(`Resend HTTP ${response.status}`);

    return {
      status: "success",
      message:
        "Mensagem recebida. Um sócio responde em até um dia útil — sempre sob sigilo.",
    };
  } catch {
    return {
      status: "error",
      message:
        "Não conseguimos enviar agora. Escreva para " +
        `${site.contact.email} ou chame no WhatsApp.`,
    };
  }
}

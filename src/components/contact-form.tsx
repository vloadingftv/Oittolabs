"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { submitContact, type ContactState } from "@/app/contato/actions";
import { cx } from "@/lib/utils";

const initial: ContactState = { status: "idle" };

export function ContactForm() {
  const [state, action] = useActionState(submitContact, initial);

  if (state.status === "success") {
    return (
      <div className="border border-signal-500/40 bg-signal-500/5 p-10">
        <p className="font-display text-2xl">Mensagem enviada.</p>
        <p className="mt-3 leading-relaxed text-sand-500">
          {state.message ??
            "Um sócio responde em até um dia útil — sempre sob sigilo."}
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-6" noValidate>
      {state.status === "error" && state.message ? (
        <p
          role="alert"
          className="border border-brass-400/60 bg-brass-300/10 px-5 py-4 text-sm leading-relaxed text-ink-800"
        >
          {state.message}
        </p>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          name="name"
          label="Nome"
          required
          autoComplete="name"
          error={state.fields?.name}
        />
        <Field
          name="email"
          label="E-mail"
          type="email"
          required
          autoComplete="email"
          error={state.fields?.email}
        />
        <Field name="company" label="Empresa" autoComplete="organization" />
        <Field name="phone" label="Telefone" type="tel" autoComplete="tel" />
      </div>

      <Field name="subject" label="Assunto" />

      <label className="block">
        <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-sand-400">
          Como podemos ajudar
        </span>
        <textarea
          name="message"
          rows={6}
          required
          aria-invalid={Boolean(state.fields?.message)}
          className={cx(
            "mt-2 w-full resize-y border-0 border-b bg-transparent py-3 text-base outline-none transition-colors placeholder:text-sand-400",
            state.fields?.message
              ? "border-brass-500"
              : "border-sand-300 focus:border-ink-900",
          )}
          placeholder="Setor, faturamento aproximado e o que você está avaliando."
        />
        {state.fields?.message ? (
          <span className="mt-2 block text-xs text-brass-600">
            {state.fields.message}
          </span>
        ) : null}
      </label>

      {/* Honeypot anti-spam — invisível para pessoas */}
      <div aria-hidden className="absolute left-[-9999px]">
        <label>
          Não preencha
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <p className="text-xs leading-relaxed text-sand-500">
        Suas informações são tratadas com confidencialidade e usadas apenas para
        responder a este contato.
      </p>

      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center rounded-xs bg-ink-900 px-8 py-4 text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-sand-50 transition-colors hover:bg-ink-700 disabled:opacity-60 sm:w-auto"
    >
      {pending ? "Enviando…" : "Enviar mensagem"}
    </button>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  autoComplete,
  error,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  error?: string;
}) {
  return (
    <label className="block">
      <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-sand-400">
        {label}
        {required ? <span className="text-brass-500"> *</span> : null}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        className={cx(
          "mt-2 w-full border-0 border-b bg-transparent py-3 text-base outline-none transition-colors",
          error ? "border-brass-500" : "border-sand-300 focus:border-ink-900",
        )}
      />
      {error ? (
        <span className="mt-2 block text-xs text-brass-600">{error}</span>
      ) : null}
    </label>
  );
}

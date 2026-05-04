import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import {
  CASE_TYPES,
  CONTACT_REQUEST_STATUS,
  FORM_STATUS,
  INITIAL_CONTACT_FORM,
} from "../constants/contactForm";
import { validateContactForm } from "../utils/contactFormValidation";
import "../styles/contactForm.css";

/**
 * Formulario real de contacto para Estudio Jurídico Lachat.
 *
 * Fase 1:
 * - Guarda consultas en Supabase.
 * - No maneja archivos todavía.
 * - Incluye honeypot anti-spam.
 *
 * Fase 2:
 * - Agregaremos carga de archivos a Supabase Storage.
 */

export default function ContactForm() {
  const [form, setForm] = useState(INITIAL_CONTACT_FORM);
  const [status, setStatus] = useState(FORM_STATUS.IDLE);
  const [feedback, setFeedback] = useState("");

  /**
   * Actualiza cualquier campo del formulario usando su atributo name.
   */

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  };

  /**
   * Construye el objeto que se enviará a Supabase.
   *
   * Nota:
   * - submission_id se genera en frontend para que en Fase 2 podamos usarlo
   *   también como carpeta de Storage.
   * - No usamos .select() después del insert porque no hay policy pública de SELECT.
   */

  const buildPayload = () => {
    return {
      submission_id: crypto.randomUUID(),
      full_name: form.fullName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      case_type: form.caseType,
      message: form.message.trim(),
      has_files: false,
      file_paths: [],
      status: CONTACT_REQUEST_STATUS.NEW,
    };
  };

  /**
   * Envía la consulta a Supabase.
   */

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationError = validateContactForm(form);

    /**
     * Si el honeypot detecta spam, fingimos éxito.
     * No conviene mostrar "detectamos spam", porque le das pistas al bot.
     */

    if (validationError === "spam") {
      setStatus(FORM_STATUS.SUCCESS);
      setFeedback("Consulta enviada correctamente.");
      setForm(INITIAL_CONTACT_FORM);
      return;
    }

    if (validationError) {
      setStatus(FORM_STATUS.ERROR);
      setFeedback(validationError);
      return;
    }

    setStatus(FORM_STATUS.LOADING);
    setFeedback("");

    const payload = buildPayload();

    const { error } = await supabase.from("contact_requests").insert(payload);

    if (error) {
      console.error("Supabase insert error:", error);

      setStatus(FORM_STATUS.ERROR);
      setFeedback(
        "No pudimos enviar la consulta. Probá nuevamente o escribinos por WhatsApp."
      );

      return;
    }

    setStatus(FORM_STATUS.SUCCESS);
    setFeedback(
      "Consulta enviada correctamente. El estudio recibió tu información y se comunicará con vos."
    );
    setForm(INITIAL_CONTACT_FORM);
  };

  const isSubmitting = status === FORM_STATUS.LOADING;

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      {/* 
        Honeypot anti-spam.
        Está oculto visualmente mediante CSS.
        Los usuarios reales no deberían completarlo.
      */}
      <div className="contact-form__trap" aria-hidden="true">
        <label htmlFor="company">Empresa</label>
        <input
          id="company"
          name="company"
          type="text"
          value={form.company}
          onChange={handleChange}
          tabIndex="-1"
          autoComplete="off"
        />
      </div>

      <div className="contact-form__header">
        <p className="contact-form__eyebrow">Consulta online</p>

        <h2 className="contact-form__title">
          Dejanos tu consulta y el estudio se comunicará con vos.
        </h2>

        <p className="contact-form__description">
          Completá tus datos y contanos brevemente qué necesitás resolver.
        </p>
      </div>

      <div className="contact-form__grid">
        <label className="contact-form__field">
          <span>Nombre y apellido</span>
          <input
            name="fullName"
            type="text"
            value={form.fullName}
            onChange={handleChange}
            placeholder="Ej: María González"
            autoComplete="name"
            required
          />
        </label>

        <label className="contact-form__field">
          <span>Email</span>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="tuemail@email.com"
            autoComplete="email"
            required
          />
        </label>

        <label className="contact-form__field">
          <span>Teléfono / WhatsApp</span>
          <input
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="Ej: +54 9 2983..."
            autoComplete="tel"
            required
          />
        </label>

        <label className="contact-form__field">
          <span>Tipo de consulta</span>
          <select
            name="caseType"
            value={form.caseType}
            onChange={handleChange}
            required
          >
            {CASE_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="contact-form__field">
        <span>Consulta</span>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Contanos brevemente qué necesitás resolver."
          rows="5"
          required
        />
      </label>

      <p className="contact-form__legal">
        Al enviar este formulario aceptás ser contactado/a por el estudio para
        evaluar tu consulta. No compartas información extremadamente sensible si
        todavía no fue solicitada.
      </p>

      <button
        className="contact-form__submit"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Enviando consulta..." : "Enviar consulta"}
      </button>

      {feedback && (
        <p
          className={`contact-form__feedback ${
            status === FORM_STATUS.SUCCESS
              ? "contact-form__feedback--success"
              : "contact-form__feedback--error"
          }`}
          role="status"
        >
          {feedback}
        </p>
      )}
    </form>
  );
}
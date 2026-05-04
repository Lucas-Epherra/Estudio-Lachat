import { useRef, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import {
  ATTACHMENTS_CONFIG,
  CASE_TYPES,
  CONTACT_REQUEST_STATUS,
  FORM_STATUS,
  INITIAL_CONTACT_FORM,
} from "../constants/contactForm";
import { validateContactForm } from "../utils/contactFormValidation";
import { buildStoragePath } from "../utils/fileHelpers";
import "../styles/contactForm.css";

/**
 * Formulario real de contacto para Estudio Jurídico Lachat.
 *
 * Fase 2:
 * - Guarda consultas en Supabase Database.
 * - Sube adjuntos a Supabase Storage.
 * - Guarda las rutas de archivos en contact_requests.file_paths.
 * - Mantiene honeypot anti-spam.
 */

export default function ContactForm() {
  const fileInputRef = useRef(null);

  const [form, setForm] = useState(INITIAL_CONTACT_FORM);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [status, setStatus] = useState(FORM_STATUS.IDLE);
  const [feedback, setFeedback] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  };

  /**
   * Convierte FileList en array real.
   */

  const handleFilesChange = (event) => {
    const files = Array.from(event.target.files || []);

    setSelectedFiles(files);
  };

  /**
   * Limpia formulario y input file.
   */

  const resetForm = () => {
    setForm(INITIAL_CONTACT_FORM);
    setSelectedFiles([]);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  /**
   * Sube archivos a Supabase Storage.
   *
   * Retorna un array con las rutas subidas.
   */

  const uploadAttachments = async (submissionId) => {
    const uploadedPaths = [];

    for (const [index, file] of selectedFiles.entries()) {
      const filePath = buildStoragePath({
        submissionId,
        fileName: file.name,
        index,
      });

      const { error } = await supabase.storage
        .from(ATTACHMENTS_CONFIG.BUCKET_NAME)
        .upload(filePath, file, {
          cacheControl: "3600",
          contentType: file.type || "application/octet-stream",
          upsert: false,
        });

      if (error) {
        throw error;
      }

      uploadedPaths.push(filePath);
    }

    return uploadedPaths;
  };

  /**
   * Construye el payload final para la tabla contact_requests.
   */

  const buildPayload = ({ submissionId, filePaths }) => {
    return {
      submission_id: submissionId,
      full_name: form.fullName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      case_type: form.caseType,
      message: form.message.trim(),
      has_files: filePaths.length > 0,
      file_paths: filePaths,
      status: CONTACT_REQUEST_STATUS.NEW,
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationError = validateContactForm(form, selectedFiles);

    /**
     * Honeypot:
     * fingimos éxito para no darle pistas al bot.
     */

    if (validationError === "spam") {
      setStatus(FORM_STATUS.SUCCESS);
      setFeedback("Consulta enviada correctamente.");
      resetForm();
      return;
    }

    if (validationError) {
      setStatus(FORM_STATUS.ERROR);
      setFeedback(validationError);
      return;
    }

    setStatus(FORM_STATUS.LOADING);
    setFeedback("");

    const submissionId = crypto.randomUUID();

    try {
      /**
       * Orden elegido:
       * 1. Subimos archivos.
       * 2. Si suben bien, insertamos la consulta.
       *
       * Esto evita guardar leads incompletos en la base.
       */

      const filePaths = await uploadAttachments(submissionId);

      const payload = buildPayload({
        submissionId,
        filePaths,
      });

      const { error } = await supabase.from("contact_requests").insert(payload);

      if (error) {
        throw error;
      }

      setStatus(FORM_STATUS.SUCCESS);
      setFeedback(
        filePaths.length > 0
          ? "Consulta enviada correctamente. El estudio recibió tu información y documentación."
          : "Consulta enviada correctamente. El estudio recibió tu información."
      );

      resetForm();
    } catch (error) {
      console.error("Contact form submit error:", error);

      setStatus(FORM_STATUS.ERROR);
      setFeedback(
        "No pudimos enviar la consulta. Revisá los archivos o probá nuevamente."
      );
    }
  };

  const isSubmitting = status === FORM_STATUS.LOADING;

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      {/* Honeypot anti-spam */}
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
          Completá tus datos, contanos brevemente qué necesitás resolver y
          adjuntá documentación si ya la tenés disponible.
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

      <label className="contact-form__field">
        <span>Documentación adjunta</span>

        <input
          ref={fileInputRef}
          className="contact-form__file-input"
          type="file"
          multiple
          accept={ATTACHMENTS_CONFIG.ACCEPTED_EXTENSIONS.join(",")}
          onChange={handleFilesChange}
        />

        <small className="contact-form__help">
          Podés adjuntar hasta {ATTACHMENTS_CONFIG.MAX_FILES} archivos PDF, JPG,
          PNG, DOC o DOCX. Máximo {ATTACHMENTS_CONFIG.MAX_FILE_SIZE_MB} MB por
          archivo.
        </small>
      </label>

      {selectedFiles.length > 0 && (
        <div className="contact-form__attachments">
          <p>Archivos seleccionados:</p>

          <ul>
            {selectedFiles.map((file) => (
              <li key={`${file.name}-${file.size}-${file.lastModified}`}>
                {file.name} · {(file.size / 1024 / 1024).toFixed(2)} MB
              </li>
            ))}
          </ul>
        </div>
      )}

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
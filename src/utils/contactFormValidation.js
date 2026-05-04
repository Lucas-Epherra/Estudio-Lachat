import { ATTACHMENTS_CONFIG } from "../constants/contactForm";
import { getFileExtension } from "./fileHelpers";

/**
 * Valida formato básico de email.
 */

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

/**
 * Limpia strings antes de validar o enviar.
 */

const normalizeText = (value) => {
  return value.trim();
};

/**
 * Valida archivos adjuntos.
 *
 * Validamos:
 * - cantidad máxima
 * - extensión
 * - tipo MIME cuando el navegador lo informa
 * - peso máximo
 */

export const validateAttachments = (files) => {
  if (!files.length) {
    return null;
  }

  if (files.length > ATTACHMENTS_CONFIG.MAX_FILES) {
    return `Podés adjuntar hasta ${ATTACHMENTS_CONFIG.MAX_FILES} archivos.`;
  }

  for (const file of files) {
    const extension = getFileExtension(file.name);

    const hasValidExtension =
      ATTACHMENTS_CONFIG.ACCEPTED_EXTENSIONS.includes(extension);

    /**
     * Algunos navegadores o sistemas pueden devolver file.type vacío.
     * En ese caso no bloqueamos solo por MIME, pero sí exigimos extensión válida.
     */

    const hasValidMimeType =
      !file.type || ATTACHMENTS_CONFIG.ACCEPTED_MIME_TYPES.includes(file.type);

    if (!hasValidExtension || !hasValidMimeType) {
      return "Solo se permiten archivos PDF, JPG, PNG, DOC o DOCX.";
    }

    if (file.size > ATTACHMENTS_CONFIG.MAX_FILE_SIZE_BYTES) {
      return `Cada archivo debe pesar menos de ${ATTACHMENTS_CONFIG.MAX_FILE_SIZE_MB} MB.`;
    }
  }

  return null;
};

/**
 * Valida los campos del formulario de contacto.
 *
 * Retorna:
 * - null si está todo OK.
 * - "spam" si cayó en el honeypot.
 * - string con mensaje de error si hay un problema visible para el usuario.
 */

export const validateContactForm = (form, files = []) => {
  const fullName = normalizeText(form.fullName);
  const email = normalizeText(form.email);
  const phone = normalizeText(form.phone);
  const message = normalizeText(form.message);

  if (normalizeText(form.company) !== "") {
    return "spam";
  }

  if (fullName.length < 2) {
    return "Ingresá tu nombre y apellido.";
  }

  if (!isValidEmail(email)) {
    return "Ingresá un email válido.";
  }

  if (phone.length < 6) {
    return "Ingresá un teléfono o WhatsApp válido.";
  }

  if (message.length < 10) {
    return "Contanos brevemente el motivo de la consulta.";
  }

  if (message.length > 2000) {
    return "La consulta es demasiado extensa. Resumila un poco para poder enviarla.";
  }

  const attachmentsError = validateAttachments(files);

  if (attachmentsError) {
    return attachmentsError;
  }

  return null;
};
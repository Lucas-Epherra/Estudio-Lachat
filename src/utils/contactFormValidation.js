/**
 * Valida formato básico de email.
 *
 * No buscamos una validación perfecta, porque los emails tienen muchos casos raros.
 * Esto alcanza para evitar errores obvios en frontend.
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
 * Valida los campos del formulario de contacto.
 *
 * Retorna:
 * - null si está todo OK.
 * - "spam" si cayó en el honeypot.
 * - string con mensaje de error si hay un problema visible para el usuario.
 */

export const validateContactForm = (form) => {
  const fullName = normalizeText(form.fullName);
  const email = normalizeText(form.email);
  const phone = normalizeText(form.phone);
  const message = normalizeText(form.message);

  /**
   * Honeypot anti-spam.
   *
   * Este campo está oculto para usuarios reales.
   * Si llega con contenido, lo más probable es que sea un bot.
   */

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

  return null;
};
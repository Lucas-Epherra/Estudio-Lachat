/**
 * Tipos de consulta disponibles en el formulario.
 *
 * Estos valores deben coincidir exactamente con el CHECK constraint
 * definido en Supabase para la columna case_type.
 */

export const CASE_TYPES = [
  "Contratos",
  "Locaciones",
  "Carta documento",
  "Arrendamientos rurales",
  "Reclamo / intimación",
  "Otra consulta",
];

/**
 * Estado inicial del formulario.
 *
 * company es un honeypot anti-spam:
 * - Los usuarios reales no lo ven.
 * - Muchos bots lo completan automáticamente.
 */

export const INITIAL_CONTACT_FORM = {
  fullName: "",
  email: "",
  phone: "",
  caseType: CASE_TYPES[0],
  message: "",
  company: "",
};

/**
 * Estados posibles del envío en el frontend.
 */

export const FORM_STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};

/**
 * Estados internos de una consulta en Supabase.
 */

export const CONTACT_REQUEST_STATUS = {
  NEW: "new",
  CONTACTED: "contacted",
  CLOSED: "closed",
};

/**
 * Configuración de adjuntos.
 *
 * Límites conservadores para MVP:
 * - máximo 3 archivos
 * - máximo 5 MB por archivo
 */

export const ATTACHMENTS_CONFIG = {
  BUCKET_NAME: "legal-documents",
  MAX_FILES: 3,
  MAX_FILE_SIZE_MB: 5,
  MAX_FILE_SIZE_BYTES: 5 * 1024 * 1024,
  ACCEPTED_EXTENSIONS: [".pdf", ".jpg", ".jpeg", ".png", ".doc", ".docx"],
  ACCEPTED_MIME_TYPES: [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
};
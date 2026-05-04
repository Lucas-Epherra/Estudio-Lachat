/**
 * Devuelve la extensión de un archivo en minúsculas.
 *
 * Ejemplo:
 * contrato.PDF → .pdf
 */

export const getFileExtension = (fileName) => {
  const extension = fileName.split(".").pop();

  return extension ? `.${extension.toLowerCase()}` : "";
};

/**
 * Limpia el nombre del archivo antes de subirlo a Storage.
 *
 * Evita espacios, acentos y caracteres problemáticos.
 *
 * Ejemplo:
 * "Contrato Locación Nº 2.pdf"
 * →
 * "contrato-locacion-n-2.pdf"
 */

export const sanitizeFileName = (fileName) => {
  return fileName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9._-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
};

/**
 * Construye la ruta final dentro de Supabase Storage.
 *
 * Usamos submissionId para agrupar todos los archivos de una misma consulta.
 */

export const buildStoragePath = ({ submissionId, fileName, index }) => {
  const safeFileName = sanitizeFileName(fileName);
  const timestamp = Date.now();

  return `consultas/${submissionId}/${timestamp}-${index + 1}-${safeFileName}`;
};
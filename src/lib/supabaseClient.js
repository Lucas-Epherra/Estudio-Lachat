import { createClient } from "@supabase/supabase-js";

/**
 * Cliente de Supabase para conectar el frontend con la base de datos.
 *
 * Importante:
 * - Estas variables vienen del archivo .env.
 * - En Vite deben empezar con VITE_ para estar disponibles en el frontend.
 * - Nunca usar la SERVICE_ROLE_KEY en el frontend.
 */

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * Validación defensiva.
 * Si faltan las variables, frenamos la app con un error claro.
 * Esto evita perder tiempo debuggeando errores raros de conexión.
 */

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY."
  );
}

/**
 * Cliente exportado para reutilizar en componentes, servicios o helpers.
 */

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
import ContactForm from "../components/ContactForm";

/**
 * Sección de contacto comercial.
 *
 * Esta sección mantiene separado:
 * - El layout visual de la landing.
 * - La lógica del formulario, que vive en ContactForm.
 */

export default function ContactSection() {
  return (
    <section
      id="consulta"
      className="relative mx-auto max-w-5xl px-6 py-20 lg:py-28"
    >
      <ContactForm />
    </section>
  );
}
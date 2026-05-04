import Header from "../sections/Header";
import ContactForm from "../components/ContactForm";
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import Footer from "../sections/Footer";

/**
 * Página de consulta formal.
 *
 * Esta ruta queda separada de la home para alojar el formulario real.
 * Más adelante acá sumaremos:
 * - adjuntos
 * - consentimiento
 * - validación anti-spam más fuerte
 * - notificaciones automáticas
 */

export default function ConsultationPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#FFF9EF] text-[#082E3A]">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(215,181,109,0.14),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(8,46,58,0.05),transparent_25%)]" />

      <Header />

      <section className="mx-auto max-w-4xl px-6 pb-8 pt-24 text-center lg:pt-32">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B89B5E]">
          Consulta formal
        </p>

        <h1 className="mt-4 font-serif text-4xl font-semibold leading-none tracking-[-0.04em] md:text-6xl">
          Iniciá tu consulta con el estudio.
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#082E3A]/70">
          Completá el formulario con tus datos y el motivo de la consulta. El
          estudio revisará la información y se comunicará con vos.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24">
        <ContactForm />
      </section>

      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
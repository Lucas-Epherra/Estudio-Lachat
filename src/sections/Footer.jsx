import Label from "../components/Label";
import LeafSprig from "../components/LeafSprig";
import Logo from "../components/Logo";
import { contact, whatsappUrl, emailUrl } from "../config/contact";

/**
 * Footer institucional con CTA integrado.
 *
 * Reemplaza la antigua sección Contact + Footer simple.
 * Todo el cierre del sitio vive dentro de un único bloque visual.
 */

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="contacto"
      className="relative mt-16 bg-[#082E3A] text-[#FFF9EF]"
    >
      <LeafSprig className="pointer-events-none absolute right-8 top-8 h-48 w-28 text-[#D7B56D]/10" />

      <div className="mx-auto max-w-7xl px-6 py-10 md:py-12">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          {/* CTA final */}
          <div className="relative">
            <Label dark>Contacto</Label>

            <h2 className="mt-5 max-w-2xl font-serif text-3xl leading-tight tracking-[-0.03em] md:text-4xl">
              ¿Tenés un contrato para revisar o necesitás intimar?
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-[#FFF9EF]/72">
              Escribí con una breve descripción del caso y, si ya existe
              documentación, preparala para una primera revisión.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-[#FFF9EF] px-5 py-2.5 text-xs font-bold text-[#082E3A] transition hover:-translate-y-0.5 hover:bg-[#F5ECDD]"
              >
                Consultar por WhatsApp
              </a>

              <a
                href={emailUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-[#D7B56D]/45 px-5 py-2.5 text-xs font-bold text-[#FFF9EF] transition hover:bg-[#FFF9EF]/10"
              >
                Enviar email
              </a>
            </div>
          </div>

          {/* Datos institucionales */}
          <div className="relative border-t border-[#FFF9EF]/10 pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
            <Logo light />

            <div className="mt-7 space-y-3 text-sm text-[#FFF9EF]/75">
              <p>✉ {contact.email}</p>
              <p>☏ WhatsApp directo</p>
              <p>⌂ Atención online y presencial</p>
            </div>

            <a
              href={contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block text-sm font-bold text-[#D7B56D] transition hover:text-[#FFF9EF]"
            >
              Ver Instagram →
            </a>
          </div>
        </div>

        {/* Línea inferior integrada */}
        <div className="mt-9 border-t border-[#FFF9EF]/10 pt-5">
          <div className="flex flex-col gap-3 pr-0 text-xs text-[#FFF9EF]/55 md:flex-row md:items-center md:justify-between md:pr-40 lg:pr-44">
            <p className="font-medium leading-6">
              © {currentYear} Estudio Jurídico Lachat. Todos los derechos
              reservados.
            </p>

            <p className="font-medium leading-6">
              Desarrollado por{" "}
              <a
                href="https://lucas-epherra.github.io/Portfolio/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 transition-colors hover:text-[#D7B56D]"
              >
                Lucas Epherra
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

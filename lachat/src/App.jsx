const WHATSAPP_NUMBER = "542983406416"; // Cambiar por el real
const EMAIL = "rominalachat@gmail.com"; // Cambiar por el real
const INSTAGRAM = "https://www.instagram.com/lachatyasoc/"; // Cambiar por el real

const whatsappText = encodeURIComponent(
  "Hola, quisiera consultar por asesoramiento en contratos, locaciones, arrendamientos o intimaciones."
);

const services = [
  {
    icon: "⌂",
    title: "Locaciones urbanas",
    text: "Redacción y revisión de contratos de vivienda, locales, consultorios, oficinas y galpones.",
  },
  {
    icon: "◈",
    title: "Contratos comerciales",
    text: "Cláusulas claras sobre precio, actualización, garantías, destino, mora, daños y restitución.",
  },
  {
    icon: "✦",
    title: "Arrendamientos rurales",
    text: "Contratos para campo, uso de parcelas, pastoreo, agricultura, mejoras y conservación.",
  },
  {
    icon: "✉",
    title: "Intimaciones",
    text: "Cartas documento por falta de pago, incumplimientos, daños o falta de restitución.",
  },
];

const faqs = [
  {
    q: "¿Puedo revisar un contrato antes de firmar?",
    a: "Sí. La revisión previa permite detectar cláusulas riesgosas, omisiones y puntos que conviene negociar antes de asumir obligaciones.",
  },
  {
    q: "¿También se redactan cartas documento?",
    a: "Sí. Se pueden preparar intimaciones por falta de pago, incumplimientos, daños, uso indebido o falta de restitución del inmueble.",
  },
  {
    q: "¿La consulta puede ser online?",
    a: "Sí. La consulta y el intercambio de documentación pueden realizarse de forma online.",
  },
];

function Logo({ light = false }) {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-12 w-12 place-items-center rounded-full border border-[#C7A96B]/50 bg-[#FFF9EF] shadow-sm">
        <span className="font-serif text-3xl text-[#0E2A36]">L</span>
      </div>

      <div>
        <p
          className={`text-xs uppercase tracking-[0.28em] ${
            light ? "text-[#FFF9EF]/70" : "text-[#0E2A36]/60"
          }`}
        >
          Estudio Jurídico
        </p>
        <p
          className={`font-serif text-2xl tracking-[0.16em] ${
            light ? "text-[#FFF9EF]" : "text-[#0E2A36]"
          }`}
        >
          LACHAT
        </p>
      </div>
    </div>
  );
}

function Button({ href, children, variant = "primary" }) {
  const styles =
    variant === "primary"
      ? "bg-[#0E2A36] text-[#FFF9EF] hover:bg-[#123847]"
      : "border border-[#C7A96B]/50 bg-white/50 text-[#0E2A36] hover:bg-[#F6EFE3]";

  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition ${styles}`}
    >
      {children}
    </a>
  );
}

function Eyebrow({ children }) {
  return (
    <p className="mb-4 inline-flex rounded-full border border-[#C7A96B]/30 bg-white/50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#0E2A36]/70">
      {children}
    </p>
  );
}

export default function App() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#FFF9EF] text-[#0E2A36]">
      <header className="sticky top-0 z-50 border-b border-[#C7A96B]/20 bg-[#FFF9EF]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Logo />

          <nav className="hidden gap-8 text-sm font-medium text-[#0E2A36]/70 md:flex">
            <a href="#servicios" className="hover:text-[#0E2A36]">
              Servicios
            </a>
            <a href="#metodo" className="hover:text-[#0E2A36]">
              Método
            </a>
            <a href="#faq" className="hover:text-[#0E2A36]">
              Preguntas
            </a>
            <a href="#contacto" className="hover:text-[#0E2A36]">
              Contacto
            </a>
          </nav>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`}
            className="rounded-full bg-[#0E2A36] px-5 py-2 text-sm font-semibold text-[#FFF9EF] transition hover:bg-[#123847]"
          >
            Consultar
          </a>
        </div>
      </header>

      <section className="relative mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
        <div className="flex flex-col justify-center">
          <Eyebrow>Contratos claros. Reclamos firmes.</Eyebrow>

          <h1 className="max-w-4xl font-serif text-5xl font-semibold leading-[0.98] tracking-[-0.04em] md:text-7xl">
            Asesoramiento legal para alquilar, arrendar o intimar con respaldo.
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#0E2A36]/70">
            Redacción y revisión de contratos de locación, arrendamientos
            rurales e intimaciones por carta documento, con un enfoque
            preventivo, claro y estratégico.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`}>
              Consultar por WhatsApp
            </Button>

            <Button
              href={`mailto:${EMAIL}?subject=Consulta legal - Estudio Lachat`}
              variant="secondary"
            >
              Enviar email
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 text-sm text-[#0E2A36]/65">
            <span className="rounded-full border border-[#C7A96B]/25 bg-white/50 px-4 py-2">
              Atención online y presencial
            </span>
            <span className="rounded-full border border-[#C7A96B]/25 bg-white/50 px-4 py-2">
              Respuesta clara y ordenada
            </span>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full border border-[#C7A96B]/30" />

          <div className="relative rounded-[2.5rem] border border-[#C7A96B]/25 bg-[#0E2A36] p-8 text-[#FFF9EF] shadow-2xl shadow-[#0E2A36]/25">
            <p className="text-sm uppercase tracking-[0.26em] text-[#C7A96B]">
              Servicio express
            </p>

            <h2 className="mt-8 max-w-sm font-serif text-4xl leading-tight">
              Antes de firmar, asesorate. Antes de reclamar, intimá correctamente.
            </h2>

            <div className="mt-10 space-y-4">
              {[
                "Contratos personalizados",
                "Revisión preventiva",
                "Locaciones y garantías",
                "Cartas documento",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-[#FFF9EF]/10 bg-white/5 p-4"
                >
                  <span className="text-[#C7A96B]">✦</span>{" "}
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="servicios" className="mx-auto max-w-7xl px-5 py-16">
        <div className="max-w-2xl">
          <Eyebrow>Servicios</Eyebrow>
          <h2 className="font-serif text-4xl leading-tight md:text-5xl">
            Soluciones legales concretas para situaciones frecuentes.
          </h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <article
              key={service.title}
              className="rounded-[2rem] border border-[#C7A96B]/20 bg-white/60 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-6 grid h-12 w-12 place-items-center rounded-2xl bg-[#F6EFE3] text-2xl text-[#0E2A36]">
                {service.icon}
              </div>

              <h3 className="font-serif text-2xl">{service.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#0E2A36]/68">
                {service.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#0E2A36] px-5 py-16 text-[#FFF9EF]">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.26em] text-[#C7A96B]">
              Enfoque
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">
              Prevención jurídica con lenguaje claro.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              "Evitar modelos genéricos que no contemplan riesgos reales.",
              "Ordenar obligaciones, plazos, pagos, garantías y consecuencias.",
              "Actuar rápido frente a incumplimientos para proteger tu posición.",
            ].map((item, index) => (
              <div
                key={item}
                className="rounded-[1.75rem] border border-[#FFF9EF]/10 bg-white/5 p-6"
              >
                <span className="font-serif text-4xl text-[#C7A96B]">
                  0{index + 1}
                </span>
                <p className="mt-5 leading-7 text-[#FFF9EF]/78">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="metodo" className="mx-auto max-w-7xl px-5 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>Cómo trabajamos</Eyebrow>
          <h2 className="font-serif text-4xl leading-tight md:text-5xl">
            Un proceso simple para resolver sin vueltas.
          </h2>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-3">
          {[
            "Contás tu situación y enviás la documentación disponible.",
            "Se analiza el caso y se define el camino más conveniente.",
            "Recibís el contrato, revisión o intimación lista para avanzar.",
          ].map((step, index) => (
            <div
              key={step}
              className="rounded-[2rem] border border-[#C7A96B]/20 bg-white/60 p-7 text-center shadow-sm"
            >
              <div className="mx-auto mb-5 grid h-12 w-12 place-items-center rounded-full bg-[#0E2A36] font-serif text-xl text-[#FFF9EF]">
                {index + 1}
              </div>
              <p className="leading-7 text-[#0E2A36]/72">{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-7xl px-5 py-16">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <Eyebrow>Preguntas frecuentes</Eyebrow>
            <h2 className="font-serif text-4xl leading-tight md:text-5xl">
              Dudas comunes antes de contratar.
            </h2>
            <p className="mt-5 leading-8 text-[#0E2A36]/68">
              La idea es que la persona llegue con menos incertidumbre y se
              anime a consultar. El derecho también puede ser claro.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-[1.5rem] border border-[#C7A96B]/20 bg-white/60 p-6 shadow-sm open:bg-[#F6EFE3]/70"
              >
                <summary className="cursor-pointer list-none font-serif text-2xl">
                  <span className="flex items-center justify-between gap-4">
                    {faq.q}
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[#C7A96B]/35 text-[#C7A96B] transition group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-4 leading-7 text-[#0E2A36]/70">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="contacto" className="px-5 py-16">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2.5rem] bg-[#0E2A36] text-[#FFF9EF] shadow-2xl shadow-[#0E2A36]/20 lg:grid-cols-[1fr_0.9fr]">
          <div className="p-8 md:p-12">
            <p className="text-sm uppercase tracking-[0.26em] text-[#C7A96B]">
              Contacto
            </p>

            <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-tight md:text-5xl">
              ¿Tenés un contrato para revisar o necesitás intimar?
            </h2>

            <p className="mt-5 max-w-xl leading-8 text-[#FFF9EF]/76">
              Escribí con una breve descripción del caso y, si ya existe
              documentación, preparala para una revisión inicial.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`}>
                WhatsApp
              </Button>

              <a
                href={`mailto:${EMAIL}?subject=Consulta legal - Estudio Lachat`}
                className="inline-flex items-center justify-center rounded-full border border-[#C7A96B]/45 px-6 py-3 text-sm font-semibold text-[#FFF9EF] transition hover:bg-white/10"
              >
                Email
              </a>
            </div>
          </div>

          <div className="border-t border-white/10 bg-white/5 p-8 md:p-12 lg:border-l lg:border-t-0">
            <Logo light />

            <div className="mt-8 space-y-5 text-[#FFF9EF]/78">
              <p>✉ {EMAIL}</p>
              <p>☏ WhatsApp directo</p>
              <p>⌂ Atención online y presencial</p>
            </div>

            <a
              href={INSTAGRAM}
              className="mt-8 inline-block text-sm font-semibold text-[#C7A96B] hover:text-[#F6EFE3]"
            >
              Ver Instagram →
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#C7A96B]/15 px-5 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-[#0E2A36]/60 md:flex-row">
          <p>
            © {new Date().getFullYear()} Estudio Jurídico Lachat. Todos los
            derechos reservados.
          </p>
          <p>Diseño web con identidad clara, elegante y sin humo legal.</p>
        </div>
      </footer>
    </main>
  );
}
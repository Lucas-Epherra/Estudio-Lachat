import { Link } from "react-router-dom";

/**
 * Header principal del sitio.
 *
 * - El logo funciona como link a Home.
 * - Los links internos vuelven a la Home y apuntan a sus secciones.
 * - El botón "Consultar" lleva a la página formal /consulta.
 */

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#D7B56D]/20 bg-[#FFF9EF]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo como link a Home */}
        <Link
          to="/"
          aria-label="Ir al inicio"
          className="group flex items-center gap-3"
        >
          <img
            src="/logo-lachat.jpeg"
            alt="Estudio Jurídico Lachat"
            className="h-10 w-10 rounded-full object-cover ring-1 ring-[#D7B56D]/40 transition duration-200 group-hover:scale-105 md:h-11 md:w-11"
          />

          <div className="leading-none">
            <p className="text-[0.58rem] font-medium uppercase tracking-[0.34em] text-[#7F9698]">
              Estudio Jurídico
            </p>

            <p className="mt-1 font-serif text-lg font-medium tracking-[0.32em] text-[#082E3A] md:text-xl">
              LACHAT
            </p>
          </div>
        </Link>

        {/* Navegación desktop */}
        <nav className="hidden items-center gap-10 text-sm font-bold text-[#355966]/80 md:flex">
          <a href="/#servicios" className="transition hover:text-[#082E3A]">
            Servicios
          </a>

          <a href="/#metodo" className="transition hover:text-[#082E3A]">
            Método
          </a>

          <a href="/#preguntas" className="transition hover:text-[#082E3A]">
            Preguntas
          </a>

          <a href="/#contacto" className="transition hover:text-[#082E3A]">
            Contacto
          </a>
        </nav>

        {/* CTA principal */}
        <Link
          to="/consulta"
          className="inline-flex items-center justify-center rounded-full bg-[#082E3A] px-5 py-2.5 text-sm font-semibold text-[#FFF9EF] transition hover:-translate-y-0.5 hover:bg-[#0B3A48]"
        >
          Consultar
        </Link>
      </div>
    </header>
  );
}

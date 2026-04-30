// Footer simple.
// Mantiene cierre institucional y año dinámico.

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#D7B56D]/20 px-6 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-xs text-[#355966]/70 md:flex-row">
        <p>
          © {currentYear} Estudio Jurídico Lachat. Todos los derechos
          reservados.
        </p>
        <p>Diseño web con identidad clara, elegante y profesional.</p>
      </div>
    </footer>
  );
}
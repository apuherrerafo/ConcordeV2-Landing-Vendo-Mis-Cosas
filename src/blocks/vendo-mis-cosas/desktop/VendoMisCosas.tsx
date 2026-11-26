"use client";

/**
 * Bloque Vendo Mis Cosas: landing de venta de artículos (v1, 17/11/2026, de mi-garaje-lab · models/vendo-mis-cosas, 9a0fa2b).
 * Misma estructura que Valoriza: LandingShell (marco del Index), Button, GlassButton (GLASS_CSS) y Vidrio de Concorde.
 * Solo cambia el contenido de la columna principal y el prefijo CSS (.vm-).
 * Contenido: deck de campaña LFP + prototipo del formulario multicategoría + propuesta v4 (fuentes en VENDO-MIS-COSAS.md del lab).
 * Regla de color: naranjas SOLO de --vmc-color-orange-* (600 sobre claro, 400 sobre oscuro).
 * Sin backend ni cifras: costo de publicar, modalidad y plazos siguen sin confirmar y no se muestran.
 * Los vehículos siguen su propio recorrido (Valorizar → Publicar); esta landing es para artículos.
 */
import { useEffect, useRef, useState } from "react";
import type { JSX } from "react";
import { useRouter } from "next/navigation";

import Button from "@/src/components/Button";
import { GLASS_CSS } from "@/src/components/GlassButton";
import { Vidrio, type Sec } from "@/src/components/Vidrio";
import LandingShell from "@/src/blocks/landing-shell/desktop/LandingShell";
export { VENDO_MIS_COSAS_WIDTH, VENDO_MIS_COSAS_HEIGHT, VENDO_MIS_COSAS_MOBILE_WIDTH, VENDO_MIS_COSAS_MOBILE_HEIGHT } from "./dimensions";

// PENDIENTE: el flujo «Publicar un artículo» aún no está en Concorde; mientras tanto el CTA lleva a Mi Garaje,
// donde la propuesta v4 ubica «Publicar». Cambiar esta constante cuando exista la ruta.
const PUBLICAR = "/blocks/mi-garaje/m/vmc";
const VALUAR = "/blocks/mi-garaje/m/vmc-valuar";
const IMG = "/vendo-mis-cosas";

// Copy con la lógica de Valoriza: cada paso es algo que hace la persona; el texto vende el beneficio y explica el problema
// una sola vez (bloque central). Nada de repetir «VMC revisa» ni «identidad real» en cada bloque.
const STEPS: { icon: Sec; label: string }[] = [
  { icon: "auto", label: "Elige el artículo" },
  { icon: "publicaciones", label: "Muéstralo como es" },
  { icon: "valorizaciones", label: "Defines tu expectativa" },
  { icon: "publicar", label: "Lo envías a revisión" },
];

const PERKS: { icon: Sec; title: string; text: string }[] = [
  { icon: "articulos", title: "Artículos", text: "Tecnología, hogar y más" },
  { icon: "publicaciones", title: "Tu expectativa", text: "Tú defines desde dónde negociar" },
  { icon: "texto", title: "Publicación clara", text: "Fotos, detalles y categoría" },
];

// Dos accesos (Julio 26/11): uno lleva a publicar artículos; el otro rescata a quien llegó buscando vender su carro
// (recorrido propio: Valorizar → Publicar).
const USES = [
  { img: `${IMG}/publica.jpg`, href: PUBLICAR, title: "¿Algo que ya no usas?", text: "Publícalo en VMC y recibe propuestas.", cta: "Publicar", variant: "primary" as const },
  { img: `${IMG}/vende-carro.jpg`, href: VALUAR, title: "¿O lo que buscabas era vender tu carro?", text: "Valorízalo y publícalo en VMC.", cta: "Valorizar", variant: "secondary" as const },
];

// Lo que se ve en el banner gráfico (departamentos del prototipo v4, taxonomía demostrativa).
const SURTIDO = ["Tecnología", "Electrodomésticos", "Hogar y muebles", "Herramientas", "Instrumentos musicales"];

// «Lo que debes saber»: lo que pide el formulario (prototipo v4), en lenguaje llano.
const KNOW = [
  "¿Hay una tele, laptop o consola que ya cumplió su función contigo? Publicarla puede abrir una opción de venta.",
  "¿Necesitas dinero para otra compra, un plan o una decisión personal? Empieza revisando ese artículo que ya tienes.",
  "¿Ese mueble ocupa un espacio que hoy quieres usar de otra manera? Muéstralo en VMC y abre una nueva conversación.",
  "¿Terminaste un proyecto y guardaste las herramientas? Define tu expectativa de venta y decide si quieres negociar.",
];

const FAQ: [string, string][] = [
  ["¿Qué es Vendo Mis Cosas?", "Es la forma de publicar artículos en VMC, definir una expectativa de venta y recibir propuestas tras la aprobación."],
  ["¿Qué puedo vender?", "Tecnología, electrodomésticos, muebles, herramientas, instrumentos musicales y más."],
  ["¿Cómo publico un artículo?", "Preparas fotos, título, descripción, categoría y expectativa de venta. Luego lo envías a revisión."],
  // Costo dado por Julio (26/11): 10 SubasCoins, un solo pago. Pendiente reflejarlo en T&C / Centro de Ayuda.
  ["¿Cuánto cuesta publicar?", "Publicar un artículo cuesta 10 SubasCoins. Es un solo pago hasta que lo vendas."],
  ["¿Quién define la expectativa de venta?", "Tú. También decides si negocias las propuestas que recibas."],
  ["¿Cómo se coordina la entrega?", "Entre las partes, durante la negociación que acuerden."],
  ["¿Y si quiero vender mi carro?", "Los carros tienen su propio recorrido: primero lo valorizas y luego lo publicas."],
  ["¿Dónde veo mis publicaciones?", "En Mi Garaje, en Mis publicaciones."],
];

// Contenido: un solo componente para escritorio y móvil (el shell lo monta en ambos lienzos).
function VendoBody({ id }: { id: "d" | "m" }): JSX.Element {
  const router = useRouter();
  const publicar = () => router.push(PUBLICAR);
  const hero = useRef<HTMLElement>(null);
  const close = useRef<HTMLElement>(null);
  const [pastHero, setPastHero] = useState(false);
  // CTA fijo del móvil: visible entre el hero y el banner final (un observer, sin scroll handler).
  useEffect(() => {
    const el = hero.current, end = close.current;
    if (!el || !end) return;
    const seen = new Map<Element, IntersectionObserverEntry>();
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => seen.set(e.target, e));
      const h = seen.get(el), c = seen.get(end);
      setPastHero(!!h && !h.isIntersecting && h.boundingClientRect.top < 0 && !(c?.isIntersecting));
    });
    io.observe(el); io.observe(end);
    return () => io.disconnect();
  }, []);
  return (
    <div className="vm">
      {/* ── Hero ── */}
      <section className="vm-hero" ref={hero} aria-label="Vendo Mis Cosas">
        <div className="vm-hero__photo"><img src={`${IMG}/hero.jpg`} alt="" fetchPriority="high" /></div>
        <div className="vm-hero__copy">
          <h1>¡Llegó el momento<br /><em>de dejar ir y vender!</em></h1>
          <p>¡Todo cambia y VMC también lo hace! Ahora también puedes<br />publicar todo eso que ya no usas o que necesitas vender</p>
          <div className="vm-hero__actions">
            <Button variant="primary" className="vm-hero__cta" onClick={publicar}>¡Publica ahora!</Button>
          </div>
        </div>
      </section>
      <div className="vm-proof">
        <p className="vm-proof__brand"><strong>Vendo Mis Cosas</strong><span>Tus artículos, tu expectativa, tu decisión</span></p>
        <ul aria-label="Cómo vendes en VMC">
          {PERKS.map((p) => (
            <li key={p.title}><Vidrio s={p.icon} size={32} /><div><strong>{p.title}</strong><span>{p.text}</span></div></li>
          ))}
        </ul>
      </div>

      {/* ── ¿Cómo funciona? (fila de pasos como en Subascars) ── */}
      <section className="vm-card vm-steps" data-vm="pasos" aria-label="Cómo funciona">
        <p className="vm-label">¿Cómo funciona?</p>
        <ol>
          {STEPS.map((s, i) => (
            <li key={s.label}><Vidrio s={s.icon} size={36} /><span><small>Paso {i + 1}</small>{s.label}</span></li>
          ))}
        </ol>
      </section>

      {/* ── Beneficio (idea central del deck: VMC = Vendo Mis Cosas) ── */}
      <section className="vm-card vm-center" aria-label="Por qué vender en VMC">
        <p className="vm-pill"><span>VMC crece contigo</span></p>
        <h2 className="vm-title">Ahora tus cosas también <span>tienen un lugar en VMC</span></h2>
        <p className="vm-lead">Una publicación clara empieza por fotos honestas, un buen título y una expectativa de venta definida.</p>
        <dl className="vm-stats">
          <div><Vidrio s="auto" size={34} /><dt>Antes</dt><dd>Vendo mi Carro</dd></div>
          <div><Vidrio s="articulos" size={34} /><dt>Ahora</dt><dd>Vendo mis cosas</dd></div>
        </dl>

        {/* ── Lo que debes saber: el bloque equivalente de Valoriza combina la guía con un video. ── */}
        <p className="vm-pill"><span>Lo nuevo de VMC</span></p>
        <h2 className="vm-title">Eso que ya dejaste de usar podría ser justo lo que alguien quiere encontrar</h2>
        <p className="vm-lead">La tele, laptop, mesa o herramienta que tienes guardada puede convertirse en una gran opción de venta</p>
        <div className="vm-know">
          <article className="vm-know__card">
            <header><small>¿Qué esperas para</small>publicar en VMC?</header>
            <div>
              <p className="vm-label">Puede ser el momento si…</p>
              <ul>{KNOW.map((k) => <li key={k}>{k}</li>)}</ul>
            </div>
          </article>
          <div className="vm-video" aria-label="Video explicativo de Vendo Mis Cosas (próximamente)">
            <img src={`${IMG}/video-mock-9x16.png`} alt="" loading="lazy" />
            <span className="vm-video__play" aria-hidden>
              <svg width="22" height="22" viewBox="0 0 24 24"><path d="M8 5.5v13l10-6.5z" fill="currentColor" /></svg>
            </span>
            <span className="vm-video__controls" aria-hidden><i /><b /><b /><b /></span>
          </div>
        </div>
        <Button variant="primary" onClick={publicar}>¡Publica tus cosas aquí!</Button>

        {/* ── Ventaja + siguiente paso: misma secuencia de la sección de resultados de Valoriza. ── */}
        <p className="vm-pill"><span>¿Qué puedes vender?</span></p>
        <h2 className="vm-title vm-categories-title">Tecnología, hogar, herramientas y más<br /><span>Elige, publica y recibe propuestas</span></h2>
        <section className="vm-use" aria-label="Vende en VMC">
          {/* Banner gráfico, sin botón (Julio 26/11): responde al título de arriba mostrando todo lo que se puede publicar.
              Imagen de campaña de Fernando (obligatoria). Los accesos van en las dos tarjetas de abajo. */}
          <figure className="vm-sell">
            <img className="vm-sell__photo" src={`${IMG}/surtido.jpg`} alt="Sala llena de artículos: laptops, televisor, refrigeradora, lavadora y teléfonos" loading="lazy" />
            <figcaption>
              <h2>De la tele a la lavadora, <span>todo puede tener otro dueño</span></h2>
              <ul aria-label="Qué puedes publicar">{SURTIDO.map((c) => <li key={c}>{c}</li>)}</ul>
            </figcaption>
          </figure>
          <ul className="vm-use__opts">
            {USES.map((u) => (
              <li key={u.title}>
                <div>
                  <img src={u.img} alt="" loading="lazy" />
                  <span><strong>{u.title}</strong>{u.text}</span>
                  {/* CTA con el Button de Concorde (primary = camino principal, secondary = recorrido del carro). */}
                  <Button variant={u.variant} onClick={() => router.push(u.href)}>{u.cta}</Button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </section>

      {/* ── Canal de WhatsApp: misma franja de próximas ofertas de Valoriza. ── */}
      <section className="vm-whatsapp" aria-label="Canal oficial de WhatsApp">
        <i className="vm-whatsapp__glow vm-whatsapp__glow--left" aria-hidden />
        <i className="vm-whatsapp__glow vm-whatsapp__glow--right" aria-hidden />
        <i className="vm-whatsapp__glow vm-whatsapp__glow--orange" aria-hidden />
        <h2>¡Entérate primero de las <span>próximas ofertas!</span></h2>
        <a
          className="vm-whatsapp__cta"
          href="https://www.whatsapp.com/channel/0029Vb7eNWVBfxo0fKQeEa0y"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="¡Únete a nuestro canal oficial de WhatsApp!"
        >
          ¡Únete a nuestro canal oficial de WhatsApp!
        </a>
        {/* Escena de Flow con Tino y Tina (hojas de Prisma) e ícono de vidrio esmerilado; receta en Prisma/recetas/vendo-mis-cosas-carro/. */}
        {/* EXCEPCIÓN A LA REGLA DE LOGOS (26/11, pedido de Abraham): logo de WhatsApp recreado en vidrio esmerilado con IA.
            Pendiente de aprobación de Julio/Edge antes de publicar; si no se aprueba, cambiar por un ícono propio (burbuja + campana). */}
        <img className="vm-whatsapp__icon" src={`${IMG}/whatsapp-esmerilado.png`} alt="" aria-hidden width={416} height={440} loading="lazy" />
        <img src={`${IMG}/whatsapp-tino-tina.jpg`} alt="Tino y Tina revisando una alerta de nuevas ofertas en el celular" loading="lazy" />
      </section>

      {/* ── Preguntas frecuentes ── */}
      <section className="vm-card vm-faq" aria-label="Preguntas frecuentes">
        <h2 className="vm-title">Preguntas frecuentes</h2>
        {/* name compartido: acordeón exclusivo nativo; un grupo por copia escritorio/móvil. */}
        <div className="vm-faq__list">
          {FAQ.map(([q, a], i) => (
            <details key={q} name={`vm-faq-${id}`}>
              <summary><span>{i + 1}. {q}</span><i aria-hidden /></summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
        {/* Datos estructurados FAQPage: ayudan a buscadores y respuestas de IA a citar el contenido. */}
        {id === "d" ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "FAQPage",
          mainEntity: FAQ.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
        }) }} /> : null}
      </section>

      {/* ── Centro de Ayuda (banner final, como en Subascars) ── */}
      <section className="vm-help" ref={close} aria-label="Centro de Ayuda">
        <div><h2>Centro de Ayuda</h2><p>Respuestas para publicar tus artículos</p></div>
        <a className="hib-glass" href="https://www.vmcsubastas.com/centro-de-ayuda">Ir al Centro de Ayuda</a>
      </section>

      {/* CTA fijo inferior (solo móvil). */}
      <div className="vm-dock" data-on={pastHero || undefined} aria-hidden={!pastHero}>
        <Button variant="primary" onClick={publicar} tabIndex={pastHero ? 0 : -1}>Publicar mi artículo</Button>
      </div>
      <style>{GLASS_CSS + VM_CSS}</style>
    </div>
  );
}

const VM_CSS = `
.vm { --ink: #191C1C; --muted: #6B6878; --v900: #1C0B4F; --v800: #2E0F70; --v700: #3B1782; --v500: #8460E5; --lav: #F5F0FF; --line: #ECE6FB; --peach: var(--vmc-color-orange-600, #ED8936); --orange: var(--vmc-color-orange-600, #ED8936);
  --ease: cubic-bezier(0.16, 1, 0.3, 1);
  width: 100%; padding: 16px 16px 64px; box-sizing: border-box; display: grid; gap: 16px; background: #fff; font-family: var(--vmc-font-display); color: var(--ink); }
.vm *, .vm *::before, .vm *::after { box-sizing: border-box; }
.vm ::selection { background: #E8DDFF; color: #22005C; }
.vm h1, .vm h2, .vm h3 { text-wrap: balance; }
.vm em { font-style: normal; }

/* Hero: anatomía .hp del Index, bajo (como el banner de Subascars, un poco más alto por la franja). */
.vm-hero { position: relative; isolation: isolate; height: 320px; overflow: hidden; border-radius: 20px; color: #fff; background: var(--v800);
  box-shadow: 0 24px 48px -28px rgba(34,0,92,0.55); }
.vm-hero__photo { position: absolute; top: 0; right: 0; bottom: 0; width: 62%;
  -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 34%); mask-image: linear-gradient(90deg, transparent 0%, #000 34%); }
.vm-hero__photo img { width: 100%; height: 100%; object-fit: cover; object-position: 30% 40%; display: block; }
.vm-hero::after { content: ""; position: absolute; inset: 0; z-index: -1; pointer-events: none;
  background: radial-gradient(60% 80% at 0% 100%, rgba(237,137,54,0.28), transparent 60%); }
.vm-hero__copy { position: absolute; top: 0; bottom: 36px; left: 36px; width: 57%; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; gap: 14px; }
.vm-hero h1 { margin: 0; max-width: 17ch; font-size: clamp(34px, 4.2vw, 44px); line-height: 1.04; font-weight: 800; letter-spacing: -0.035em; }
.vm-hero h1 em { color: var(--orange); text-shadow: 0 2px 10px rgba(28, 11, 79, 0.72); }
.vm-hero p { width: 112%; margin: 0; max-width: 52ch; font-size: 14px; line-height: 21px; font-weight: 500; color: #E8DDFF; text-shadow: 0 1px 8px rgba(28, 11, 79, 0.84); }
.vm-hero__actions { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
.vm-hero__actions .vm-hero__cta { height: 44px; padding: 0 28px; font-size: 14px; line-height: 20px; }

/* Franja de vidrio montada sobre el borde del hero (como «Formato de publicación» en Subascars). */
.vm-proof { position: relative; z-index: 2; display: grid; grid-template-columns: auto minmax(0, 1fr); align-items: center; gap: 8px; margin: -52px 28px 0; padding: 12px 8px 12px 20px;
  border-radius: 16px; border: 1px solid rgba(255,255,255,0.9); background: rgba(255,255,255,0.82);
  -webkit-backdrop-filter: blur(16px) saturate(150%); backdrop-filter: blur(16px) saturate(150%); box-shadow: 0 16px 32px -18px rgba(59,23,130,0.4); }
.vm-proof__brand { margin: 0; padding-right: 20px; border-right: 1px solid #E4DCF8; }
.vm-proof__brand strong { display: block; font-size: 17px; line-height: 22px; font-weight: 800; letter-spacing: -0.02em; color: var(--v700); }
.vm-proof__brand span { display: block; font-size: 12px; line-height: 16px; font-weight: 600; color: var(--orange); }
.vm-proof ul { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); margin: 0; padding: 0; list-style: none; }
.vm-proof li { display: flex; align-items: center; gap: 12px; padding: 0 16px; min-width: 0; }
.vm-proof li + li { border-left: 1px solid #E4DCF8; }
.vm-proof strong { display: block; font-size: 15px; line-height: 20px; font-weight: 800; color: var(--v700); }
.vm-proof span { display: block; font-size: 12px; line-height: 16px; color: var(--muted); }

/* Tarjetas blancas del cuerpo (mismo lenguaje de Subascars: bloques blancos sobre el lienzo). */
.vm-card { border-radius: 20px; background: #fff; border: 1px solid var(--line); box-shadow: 0 12px 28px -24px rgba(59,23,130,0.35); padding: 24px; }
.vm-label { margin: 0; font-size: 12px; line-height: 16px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; color: var(--v700); }

/* ¿Cómo funciona? */
.vm-steps { width: 100%; display: grid; gap: 18px; padding: 26px 24px 22px; scroll-margin-top: 80px; }
.vm-steps .vm-label { position: relative; width: max-content; padding: 8px 12px; font-size: 12px; line-height: 16px; font-weight: 600; color: var(--v700); }
.vm-steps .vm-label::before, .vm-steps .vm-label::after { content: ""; position: absolute; width: 10px; height: 10px; background: center / contain no-repeat; }
.vm-steps .vm-label::before { top: 0; left: 0; background-image: url("https://www.vmcsubastas.com/producto/valoriza/icons/corner-bracket-top-left.svg"); }
.vm-steps .vm-label::after { right: 0; bottom: 0; background-image: url("https://www.vmcsubastas.com/producto/valoriza/icons/corner-bracket-bottom-right.svg"); }
.vm-steps ol { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; margin: 0; padding: 0; list-style: none; counter-reset: none; }
.vm-steps li { display: grid; grid-template-rows: 36px minmax(0, 52px); place-items: center; min-height: 132px; gap: 10px; padding: 16px 12px; border: 1px solid #DED4F2; border-radius: 14px; text-align: center; background: #fff; box-shadow: 0 10px 18px -16px rgba(53,19,117,0.6); }
.vm-steps li span { display: grid; gap: 2px; font-size: 14px; line-height: 18px; font-weight: 800; color: var(--v700); }
.vm-steps li small { font-size: 11px; line-height: 14px; font-weight: 700; color: var(--muted); }

/* Bloques centrados: píldora, titular, bajada, cifras. */
.vm-center { display: grid; justify-items: center; text-align: center; gap: 16px; padding: 68px 32px 56px; border: 1px solid var(--line); border-radius: 20px; box-shadow: none; background: #fff; }
.vm-pill { margin: 0; padding: 5px 16px; border: 1px solid transparent; border-radius: 999px; font-size: 12px; line-height: 18px; font-weight: 700; background: linear-gradient(#fff, #fff) padding-box, linear-gradient(100deg, #F2A25C 0%, #DE858C 42%, #8C70E3 100%) border-box; }
.vm-pill span { background: linear-gradient(100deg, #DB8B52 0%, #C77E9A 48%, #8065D2 100%); -webkit-background-clip: text; background-clip: text; color: transparent; }
.vm-center .vm-pill:not(:first-child) { margin-top: 48px; }
.vm-title { margin: 0; max-width: 22ch; font-size: 36px; line-height: 1.15; font-weight: 800; letter-spacing: -0.035em; color: var(--v700); }
.vm-title span { color: var(--v500); }
.vm-categories-title { max-width: none; margin-bottom: 16px; text-align: center; white-space: nowrap; }
.vm-center .vm-title { max-width: 26ch; background: linear-gradient(100deg, #6E4BD7 0%, #735BE3 50%, #3AB7D1 100%); -webkit-background-clip: text; background-clip: text; color: transparent; }
.vm-center .vm-title span { color: inherit; }
.vm-lead { margin: 0; max-width: 68ch; font-size: 15px; line-height: 23px; color: var(--v700); }
.vm-lead b { color: var(--v700); }
.vm-stats { display: flex; align-items: start; gap: 88px; margin: 18px 0 10px; }
.vm-stats div { position: relative; display: grid; justify-items: center; gap: 5px; min-width: 150px; }
.vm-stats div:first-child::after { content: "+"; position: absolute; top: 22px; right: -62px; display: grid; place-items: center; width: 36px; height: 36px; border-radius: 12px; border: 1px solid #DDCFF7; background: #fff; box-shadow: 0 8px 18px -14px rgba(59,23,130,0.55); font-size: 20px; color: var(--v500); }
.vm-stats dt { font-size: 30px; line-height: 36px; font-weight: 800; letter-spacing: -0.03em; color: #7655DB; }
.vm-stats dd { margin: 0; font-size: 13px; font-weight: 700; color: var(--v700); }

/* Lo que debes saber: tarjeta con checklist + pantalla real (en lugar del video de Subascars). */
.vm-know { display: grid; grid-template-columns: 400px 216px; align-items: stretch; gap: 24px; width: 100%; max-width: 640px; margin: 16px 0 8px; text-align: left; }
.vm-know__card { display: flex; flex-direction: column; overflow: hidden; border: 0; border-radius: 16px; background: #fff; box-shadow: 0 0 16px 4px rgba(0,0,0,0.1); }
.vm-know__card header { padding: 16px; color: #fff; font-size: 20px; line-height: 28px; font-weight: 800; letter-spacing: -0.02em;
  background: linear-gradient(174deg, #8460E5 0%, #3B1782 100%); }
.vm-know__card header small { display: block; font-size: 12px; line-height: 16px; font-weight: 400; color: #fff; letter-spacing: 0; }
.vm-know__card > div { display: grid; flex: 1; gap: 12px; padding: 16px; }
.vm-know__card .vm-label { color: #99A1AF; font-size: 10px; line-height: 15px; font-weight: 700; }
.vm-know__card ul { display: grid; gap: 12px; margin: 0; padding: 0; list-style: none; }
.vm-know__card li { display: grid; grid-template-columns: 24px minmax(0, 1fr); align-items: center; gap: 6px; padding: 8px 16px; border: 1px solid transparent; border-radius: 999px; font-size: 12px; line-height: 16px; font-weight: 600; color: var(--v700); }
.vm-know__card li::before { content: ""; width: 24px; height: 24px; border-radius: 50%;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='12' r='10' fill='white'/%3E%3Cpath d='m7.5 12 3 3 6-7' fill='none' stroke='%23ED8936' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center / 16px auto no-repeat, linear-gradient(135deg, #ED8936 0%, #ED8936 40%, #8460E5 100%); }
/* Reserva visual para el video explicativo: conserva la posición de Valoriza sin fingir que ya existe un video reproducible. */
.vm-video { position: relative; justify-self: center; width: 216px; aspect-ratio: 9 / 16; overflow: hidden; border-radius: 18px; border: 1px solid #CDBDF5; background: #111; box-shadow: none; }
.vm-video::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(28,11,79,0.04) 45%, rgba(0,0,0,0.52)); }
.vm-video img { width: 100%; height: 100%; object-fit: cover; display: block; }
.vm-video__play { position: absolute; z-index: 1; top: 50%; left: 50%; display: grid; place-items: center; width: 58px; height: 58px; margin: -29px; border-radius: 50%; color: var(--v700); background: rgba(255,255,255,0.94); box-shadow: 0 12px 28px rgba(28,11,79,0.38); }
.vm-video__play svg { margin-left: 3px; }
.vm-video__controls { position: absolute; z-index: 1; right: 14px; bottom: 14px; left: 14px; display: grid; grid-template-columns: 1fr auto auto auto; align-items: center; gap: 10px; }
.vm-video__controls i { height: 4px; border-radius: 99px; background: linear-gradient(90deg, #fff 42%, rgba(255,255,255,0.45) 42%); }
.vm-video__controls b { display: block; width: 14px; height: 14px; border: 2px solid #fff; border-radius: 2px; opacity: 0.9; }
.vm-video__controls b:nth-of-type(2) { border-radius: 50%; }
.vm-video__controls b:nth-of-type(3) { width: 3px; height: 14px; border: 0; border-radius: 99px; background: #fff; box-shadow: 6px 0 #fff; }


/* Trío de decisión: bloque principal + dos recorridos, con la composición de señales de Valoriza. */
.vm-use { display: grid; gap: 12px; width: 100%; }
/* Banner gráfico: la foto de campaña ocupa todo el bloque y el violeta de la marca entra desde la izquierda para el texto. */
.vm-sell { position: relative; overflow: hidden; isolation: isolate; display: grid; align-items: center; min-height: 288px; margin: 0; padding: 40px 44px; border-radius: 20px; color: #fff; background: var(--v800); text-align: left; }
.vm-sell__photo { position: absolute; z-index: -2; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: 60% 45%; display: block; }
.vm-sell::before { content: ""; position: absolute; z-index: -1; inset: 0; pointer-events: none;
  background: radial-gradient(70% 110% at -5% 115%, rgba(237,137,54,0.55) 0%, transparent 55%), linear-gradient(90deg, rgba(46,15,112,0.96) 0%, rgba(59,23,130,0.86) 34%, rgba(59,23,130,0.25) 62%, transparent 80%); }
.vm-sell figcaption { display: grid; justify-items: start; gap: 18px; max-width: 58%; }
.vm-sell h2 { margin: 0; font-size: 32px; line-height: 1.08; font-weight: 800; letter-spacing: -0.03em; }
.vm-sell h2 span { display: block; color: var(--peach); }
.vm-sell ul { display: flex; flex-wrap: wrap; gap: 8px; max-width: 520px; margin: 0; padding: 0; list-style: none; }
.vm-sell li { padding: 6px 12px; border-radius: 999px; font-size: 12px; line-height: 16px; font-weight: 700; color: #fff;
  background: rgba(255,255,255,0.14); border: 1px solid rgba(255,255,255,0.35); -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px); }
/* Dos accesos con la misma anatomía clara: texto a la izquierda, foto de campaña a la derecha fundida con el lavanda. */
.vm-use__opts { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr); grid-auto-rows: 184px; gap: 12px; margin: 0; padding: 0; list-style: none; text-align: left; }
.vm-use__opts li { position: relative; isolation: isolate; overflow: hidden; border: 1px solid #DDCFF7; border-radius: 18px; background: linear-gradient(120deg, #FFFFFF 0%, var(--lav) 60%, #EFE7FF 100%);
  box-shadow: 0 12px 20px -18px rgba(59,23,130,0.45); transition: border-color 200ms var(--ease), box-shadow 200ms var(--ease), transform 200ms var(--ease); }
/* Retícula común a las dos tarjetas: título en caja de 2 líneas alineado abajo, subtítulo a la misma altura, botón al pie. */
.vm-use__opts li > div { display: grid; grid-template-rows: auto 1fr; justify-items: start; height: 100%; padding: 22px 24px; color: var(--muted); font-size: 14px; line-height: 20px; }
.vm-use__opts span { display: grid; grid-template-rows: 46px auto; row-gap: 6px; max-width: 52%; }
.vm-use__opts .pvbtn, .vm-use__opts .psec { align-self: end; margin: 0; }
.vm-use__opts li:nth-child(2) span { max-width: 54%; }
.vm-center .vm-use__opts .pvbtn { width: auto; }
.vm-use__opts strong { align-self: end; font-size: 18px; line-height: 23px; font-weight: 800; letter-spacing: -0.02em; color: var(--v700); }
/* Botones de Concorde a escala de tarjeta (misma pieza, alto y aire compactos). */
.vm-use__opts .pvbtn, .vm-use__opts .psec { height: 40px; padding: 0 28px; font-size: 14px; }
.vm-use__opts img { position: absolute; z-index: -1; top: 0; right: 0; width: 56%; height: 100%; object-fit: cover; display: block;
  -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 34%); mask-image: linear-gradient(90deg, transparent 0%, #000 34%); }
/* La escena del carro ya viene en blanco a la izquierda: se ancla a la derecha sin máscara. */
/* Las dos escenas de Flow ya vienen en blanco a la izquierda: foto completa anclada a la derecha, sin máscara. */
.vm-use__opts li img { width: 100%; object-position: 100% 30%; -webkit-mask-image: none; mask-image: none; }

/* Franja del canal: composición y medidas del banner de próximas ofertas de Valoriza. */
.vm-whatsapp { position: relative; isolation: isolate; justify-self: stretch; width: 100%; height: 160px; overflow: hidden; border-radius: 16px;
  background: linear-gradient(141deg, #340091 33%, #8460E5 92%, #ED8936 100%); }
.vm-whatsapp__glow { position: absolute; z-index: 0; display: block; border-radius: 999px; pointer-events: none; }
.vm-whatsapp__glow--left { left: -140px; top: -160px; width: 320px; height: 320px; background: rgba(95,62,216,0.55); filter: blur(35px); }
.vm-whatsapp__glow--right { right: -94px; top: -120px; width: 320px; height: 320px; background: rgba(132,96,229,0.5); filter: blur(40px); }
.vm-whatsapp__glow--orange { left: -171px; top: -88px; width: 320px; height: 320px; background: rgba(237,137,54,0.3); filter: blur(60px); }
.vm-whatsapp h2 { position: absolute; z-index: 2; top: 40px; left: 32px; width: 429px; margin: 0; color: #fff; font-size: 20px; line-height: 24px; font-weight: 800; letter-spacing: -0.025em; }
.vm-whatsapp h2 span { background: linear-gradient(166deg, #ED8936 0%, #ED8936 25%, #8460E5 100%); -webkit-background-clip: text; background-clip: text; color: transparent; }
.vm-whatsapp__cta { position: absolute; z-index: 2; top: 82px; left: 32px; display: inline-flex; align-items: center; justify-content: center; width: 306px; height: 40px; padding: 0; border-radius: 999px;
  color: #fff; font-size: 13px; line-height: 18px; font-weight: 600; text-decoration: none; white-space: nowrap; border: 1.5px solid transparent;
  background: linear-gradient(180deg, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.08) 45%, rgba(43,13,111,0.24) 100%) padding-box, linear-gradient(#4E22A9, #4E22A9) padding-box, linear-gradient(104deg, #F4AC59 0%, #FFFFFF 17%, #8460E5 100%) border-box;
  box-shadow: 0 8px 24px rgba(0,0,0,0.1), inset 0 1px 6px rgba(255,255,255,0.42); }
.vm-whatsapp__cta:hover { opacity: 0.92; }
.vm-whatsapp__cta:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
/* La escena se funde con el degradado: anclada a la derecha, a todo el alto, con máscara hacia la izquierda. */
/* Ícono de vidrio en el hueco entre el CTA y la escena: sombra con desplazamiento y flotación lenta. */
.vm-whatsapp__icon { position: absolute; z-index: 2; top: 50%; left: 52.5%; width: 112px; height: auto; transform: translateY(-50%) rotate(-8deg);
  filter: drop-shadow(0 14px 18px rgba(20,0,60,0.45)); pointer-events: none; }
@media (prefers-reduced-motion: no-preference) {
  .vm-whatsapp__icon { animation: vm-float 5.5s cubic-bezier(0.45, 0, 0.55, 1) infinite alternate; }
  @keyframes vm-float { to { transform: translateY(calc(-50% - 8px)) rotate(-4deg); } }
}
.vm-whatsapp > img:not(.vm-whatsapp__icon) { position: absolute; z-index: 1; top: 0; right: 0; height: 100%; width: auto; aspect-ratio: 800 / 418; object-fit: cover;
  -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 28%); mask-image: linear-gradient(90deg, transparent 0%, #000 28%); }

/* Preguntas frecuentes: título centrado y tarjetas numeradas (como Subascars), <details> nativo. */
.vm-faq { display: grid; gap: 20px; padding: 32px 24px; }
.vm-faq .vm-title { justify-self: center; text-align: center; background: linear-gradient(100deg, #7B52DF 0%, #7557DC 38%, #5F91DB 68%, #45B7CE 100%); -webkit-background-clip: text; background-clip: text; color: transparent; }
.vm-faq__list { display: grid; gap: 8px; }
.vm-faq details { border-radius: 14px; background: #fff; border: 1px solid var(--line); box-shadow: 0 6px 16px -14px rgba(59,23,130,0.4); transition: background-color 240ms var(--ease), border-color 240ms var(--ease); }
.vm-faq details:hover { border-color: #CDBDF5; }
.vm-faq details[open] { background: var(--lav); border-color: #CDBDF5; }
.vm-faq summary { display: flex; align-items: center; justify-content: space-between; gap: 12px; min-height: 56px; padding: 0 14px 0 20px;
  cursor: pointer; list-style: none; font-size: 15px; line-height: 21px; font-weight: 700; color: var(--v700); border-radius: 14px; }
.vm-faq summary::-webkit-details-marker { display: none; }
.vm-faq summary:focus-visible { outline: 2px solid var(--v500); outline-offset: 2px; }
.vm-faq summary i { position: relative; flex: none; width: 26px; height: 26px; border-radius: 50%; background: #fff; border: 1px solid var(--line); transition: background-color 240ms var(--ease); }
.vm-faq summary i::before, .vm-faq summary i::after { content: ""; position: absolute; top: 50%; left: 50%; width: 10px; height: 2px; margin: -1px 0 0 -5px; border-radius: 2px; background: var(--v500); transition: transform 280ms var(--ease), background-color 240ms; }
.vm-faq summary i::after { transform: rotate(90deg); }
.vm-faq details[open] summary i { background: var(--v700); border-color: var(--v700); }
.vm-faq details[open] summary i::before, .vm-faq details[open] summary i::after { background: #fff; }
.vm-faq details[open] summary i::after { transform: rotate(0deg); }
.vm-faq details p { margin: 0; padding: 0 20px 18px; max-width: 70ch; font-size: 14px; line-height: 22px; color: var(--muted); }
@supports (interpolate-size: allow-keywords) {
  @media (prefers-reduced-motion: no-preference) {
    .vm-faq { interpolate-size: allow-keywords; }
    .vm-faq details::details-content { block-size: 0; overflow: clip; opacity: 0;
      transition: block-size 320ms var(--ease), opacity 240ms ease, content-visibility 320ms allow-discrete; }
    .vm-faq details[open]::details-content { block-size: auto; opacity: 1; }
  }
}

/* Centro de Ayuda: banner final con el degradado de la marca. */
.vm-help { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 24px 28px; border-radius: 20px; color: #fff;
  background: linear-gradient(90deg, #B4602A 0%, #5B2AB8 45%, #2E0F70 100%); }
.vm-help h2 { margin: 0; font-size: 20px; line-height: 26px; font-weight: 800; }
.vm-help p { margin: 2px 0 0; font-size: 13px; line-height: 18px; color: #E8DDFF; }
.vm-help .hib-glass { height: 40px; padding-inline: 20px; white-space: nowrap; }

.vm-dock { display: none; }

@media (max-width: 1023px) {
  .vm { padding: 14px 14px 104px; gap: 12px; }
  .vm-hero { height: auto; display: flex; flex-direction: column; border-radius: 18px; }
  .vm-hero__photo { position: relative; width: 100%; height: 200px; -webkit-mask-image: linear-gradient(180deg, #000 60%, transparent 100%); mask-image: linear-gradient(180deg, #000 60%, transparent 100%); }
  .vm-hero__photo img { object-position: 62% 35%; }
  .vm-hero__copy { position: relative; left: 0; bottom: 0; width: 100%; padding: 0 20px 64px; margin-top: -28px; gap: 12px; }
  .vm-hero h1 { font-size: 34px; }
  .vm-hero__actions { width: 100%; }
  .vm-hero__actions > * { flex: 1 1 100%; }
  .vm-hero__actions .pvbtn { white-space: nowrap; padding-inline: 16px; }
  .vm-proof { grid-template-columns: minmax(0, 1fr); margin: -52px 12px 0; padding: 14px 4px 6px; }
  .vm-proof__brand { padding: 0 12px 10px; border-right: 0; border-bottom: 1px solid #E4DCF8; }
  .vm-proof ul { grid-template-columns: minmax(0, 1fr); }
  .vm-proof li { padding: 10px 12px; }
  .vm-proof li + li { border-left: 0; border-top: 1px solid #E4DCF8; }
  .vm-card { padding: 20px 16px; }
  .vm-steps ol { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
  .vm-steps { gap: 16px; padding: 22px 16px 18px; }
  .vm-steps li { min-height: 126px; gap: 8px; padding: 12px; }
  .vm-center { padding: 48px 16px 40px; }
  .vm-title { font-size: 26px; }
  .vm-categories-title { white-space: normal; }
  .vm-stats { gap: 42px; }
  .vm-stats div { min-width: 112px; }
  .vm-stats div:first-child::after { right: -39px; width: 30px; height: 30px; font-size: 17px; }
  .vm-stats dt { font-size: 26px; }
  .vm-know { grid-template-columns: minmax(0, 1fr); }
  .vm-video { width: min(100%, 244px); }
  .vm-center .pvbtn { width: 100%; }
  .vm-sell { min-height: 420px; align-items: end; padding: 20px; }
  .vm-sell::before { background: linear-gradient(0deg, rgba(46,15,112,0.96) 0%, rgba(59,23,130,0.8) 45%, transparent 75%); }
  .vm-sell figcaption { max-width: none; }
  .vm-sell h2 { font-size: 24px; }
  .vm-use__opts { grid-template-columns: minmax(0, 1fr); grid-auto-rows: 150px; gap: 10px; }
  .vm-use__opts li > div { padding: 16px; }
  .vm-use__opts span { max-width: 54%; }
  .vm-use__opts strong { font-size: 16px; line-height: 21px; }
  .vm-whatsapp { width: min(100%, 388px); height: auto; aspect-ratio: 388 / 120; }
  .vm-whatsapp__glow--left { left: -18%; top: -67%; width: 41%; height: auto; aspect-ratio: 1; filter: blur(35px); }
  .vm-whatsapp__glow--right { display: none; }
  .vm-whatsapp__glow--orange { left: -22%; top: -37%; width: 41%; height: auto; aspect-ratio: 1; filter: blur(60px); }
  .vm-whatsapp h2 { top: 4%; left: 3%; width: 46%; font-size: clamp(14px, 4.6vw, 18px); line-height: 1.15; }
  .vm-whatsapp__cta { top: 66%; right: 3%; left: auto; width: 75%; height: 34%; padding: 0 8px; font-size: clamp(11px, 3.2vw, 14px); }
  .vm-whatsapp__icon { left: auto; right: 54%; top: 72%; width: 44px; }
  .vm-whatsapp > img:not(.vm-whatsapp__icon) { top: 0; left: auto; right: 0; width: 62%; height: 100%; }
  .vm-faq { padding: 24px 12px; }
  .vm-faq summary { padding: 0 12px 0 16px; }
  .vm-faq details p { padding: 0 16px 16px; }
  .vm-help { flex-direction: column; align-items: flex-start; padding: 20px; }
  .vm-help .hib-glass { width: 100%; justify-content: center; }
  .vm-dock { display: block; position: fixed; left: 12px; right: 12px; bottom: max(12px, env(safe-area-inset-bottom)); z-index: 40; padding: 8px; border-radius: 999px;
    background: rgba(255,255,255,0.86); border: 1px solid rgba(255,255,255,0.9); box-shadow: 0 18px 36px -16px rgba(34,0,92,0.45);
    -webkit-backdrop-filter: blur(14px); backdrop-filter: blur(14px);
    transform: translateY(calc(100% + 24px)); opacity: 0; transition: transform 420ms var(--ease), opacity 240ms ease; }
  .vm-dock[data-on] { transform: none; opacity: 1; }
  .vm-dock .pvbtn { width: 100%; white-space: nowrap; }
}
@media (min-width: 900px) {
  .vm-title.vm-categories-title { max-width: none !important; font-size: 36px !important; white-space: nowrap !important; }
}
@media (prefers-reduced-motion: reduce) {
  .vm-dock { transition: none; }
}
`;

// Marco = LandingShell (el del Index: Header, Sidebar y drawer en celular).
export default function VendoMisCosas(): JSX.Element {
  return <LandingShell body={(id) => <VendoBody id={id} />} />;
}

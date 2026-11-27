import type { JSX } from "react";

import { LANDING_FONT_CLASS } from "@/app/blocks/_components/landingFonts";
import VendoMisCosas2 from "@/src/blocks/vendo-mis-cosas-2/desktop/VendoMisCosas2";

export const metadata = { title: "Vendo Mis Cosas 2 · VMC Subastas" };

/**
 * Ruta de trabajo para la siguiente versión de la landing.
 * La landing vigente permanece en /blocks/vendo-mis-cosas/embed.
 */
export default function VendoMisCosas2EmbedPage(): JSX.Element {
  return <div className={LANDING_FONT_CLASS}><VendoMisCosas2 /></div>;
}

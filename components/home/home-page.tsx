"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Image, { type StaticImageData } from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Info, Phone } from "lucide-react";

import { getOpenStatus, getParisDate, type OpenStatus } from "@/data/hours";
import {
  PIZZAS_CREME,
  PIZZAS_TOMATE,
  type MenuTab,
  type PizzaItem,
} from "@/data/menu";
import { HERO_SLIDES } from "@/config/hero-slides";
import {
  menuToggleActive,
  menuToggleInactive,
  menuToggleInactiveHover,
  restoButtonBase,
  restoButtonClass,
} from "@/lib/resto-button";
import { logoScript, sans } from "@/lib/fonts";
import { PAGE_SHELL } from "@/lib/page-shell";
import { PizzaAllergenPanel } from "@/components/pizza-allergen-panel";
import { HeaderBotaniqueBandeau, HerbPair } from "@/components/decor-ornament";
import { getAddressLines, siteConfig } from "@/config/site";
import { C } from "@/lib/colors";
import { cn } from "@/lib/utils";

const PHONE_DISPLAY = siteConfig.phone.display;
const PHONE_HREF = siteConfig.phone.href;
const FACEBOOK_HREF = siteConfig.facebook.href;
const [ADDRESS_LINE_1, ADDRESS_LINE_2] = getAddressLines();
const MAP_EMBED = siteConfig.map.embedUrl;

function formatPrice(value: number) {
  return `${value.toFixed(2).replace(".", ",")}\u00A0€`;
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={className}
      fill="currentColor"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function PaperTexture({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 opacity-[0.55]", className)}
      style={{
        backgroundImage: `
          linear-gradient(90deg, ${C.ink}06 1px, transparent 1px),
          linear-gradient(${C.ink}05 1px, transparent 1px),
          radial-gradient(ellipse at 30% 20%, ${C.sage}12, transparent 50%)
        `,
        backgroundSize: "48px 48px, 48px 48px, 100% 100%",
      }}
    />
  );
}

const pillTypography =
  "rounded-full px-10 py-3.5 text-center text-base font-extrabold uppercase tracking-[0.14em] sm:text-lg lg:px-12 lg:py-4 lg:text-xl";

const sectionTitleTypography =
  "text-center text-xl font-extrabold uppercase tracking-[0.12em] text-[#20543B] sm:text-2xl lg:text-3xl xl:text-[2rem] xl:leading-tight";

/** Titre de section (texte seul, non cliquable) */
function Ribbon({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex justify-center", className)}>
      <h2 className={sectionTitleTypography}>{children}</h2>
    </div>
  );
}

/** Bouton de navigation carte (cliquable) */
function MenuCategoryRibbon({
  active,
  tone,
  onClick,
  children,
}: {
  active: boolean;
  tone: "forest" | "sage";
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        pillTypography,
        restoButtonBase,
        "cursor-pointer",
        active
          ? menuToggleActive
          : cn(menuToggleInactive, menuToggleInactiveHover[tone])
      )}
    >
      {children}
    </button>
  );
}

function LogoLockup({
  size = "lg",
  onDark = false,
  showTagline = false,
}: {
  size?: "lg" | "sm";
  onDark?: boolean;
  showTagline?: boolean;
}) {
  const ink = onDark ? "text-[#FDFCF8]" : "text-[#20543B]";
  const bar = onDark ? "bg-[#FDFCF8]" : "bg-[#20543B]";
  return (
    <div className="text-center">
      <p
        className={cn(
          "font-extrabold uppercase tracking-[0.18em]",
          ink,
          size === "lg"
            ? "text-xl sm:text-2xl md:text-[1.65rem]"
            : "text-sm sm:text-base"
        )}
      >
        {siteConfig.pickupLabel}
      </p>
      <h1
        className={cn(
          logoScript.className,
          "mt-2 leading-none drop-shadow-md",
          ink,
          size === "lg"
            ? "text-6xl sm:text-7xl md:text-8xl lg:text-[6.25rem] xl:text-[7rem]"
            : "text-4xl"
        )}
      >
        {siteConfig.name}
      </h1>
      <div
        className={cn(
          "mx-auto mt-4 rounded-full",
          bar,
          size === "lg" ? "h-2 w-40 sm:w-52 md:w-60" : "h-1 w-24"
        )}
      />
      {showTagline && (
        <p className="mx-auto mt-6 max-w-2xl text-xl font-bold leading-snug text-white drop-shadow-md sm:mt-8 sm:text-2xl md:text-[1.75rem] md:leading-snug">
          {siteConfig.heroTagline}
        </p>
      )}
    </div>
  );
}

const HERO_CROSSFADE_S = 0.68;
const HERO_HOLD_MS = 5500;
const HERO_EASE = [0.4, 0, 0.2, 1] as const;

function HeroSlider({
  slides,
}: {
  slides: { src: StaticImageData; alt: string }[];
}) {
  const slideCount = slides.length;
  const [baseIndex, setBaseIndex] = useState(0);
  const [overlayIndex, setOverlayIndex] = useState(slideCount > 1 ? 1 : 0);
  /** true uniquement pendant le fondu ; reset instantané évite un 2e fondu (flash sombre) */
  const [isCrossfading, setIsCrossfading] = useState(false);
  const baseIndexRef = useRef(0);
  const crossfadingRef = useRef(false);

  useEffect(() => {
    baseIndexRef.current = baseIndex;
  }, [baseIndex]);

  useEffect(() => {
    if (slideCount <= 1) return;

    const timer = window.setInterval(() => {
      if (crossfadingRef.current) return;
      crossfadingRef.current = true;
      const next = (baseIndexRef.current + 1) % slideCount;
      setOverlayIndex(next);
      setIsCrossfading(true);
    }, HERO_HOLD_MS);

    return () => window.clearInterval(timer);
  }, [slideCount]);

  useEffect(() => {
    if (!isCrossfading) return;
    const done = window.setTimeout(() => {
      setBaseIndex(overlayIndex);
      setIsCrossfading(false);
      crossfadingRef.current = false;
    }, HERO_CROSSFADE_S * 1000 + 50);
    return () => window.clearTimeout(done);
  }, [isCrossfading, overlayIndex]);

  const opacityTransition = {
    duration: isCrossfading ? HERO_CROSSFADE_S : 0,
    ease: HERO_EASE,
  };

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#27251F]">
      {slides.map((slide, i) => (
        <div
          key={`preload-${slide.src.src}`}
          className="pointer-events-none absolute inset-0 opacity-0"
          aria-hidden
        >
          <Image
            src={slide.src}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
      ))}

      <motion.div
        className="absolute inset-0 z-0"
        initial={false}
        animate={{ opacity: isCrossfading ? 0 : 1 }}
        transition={opacityTransition}
      >
        <Image
          src={slides[baseIndex].src}
          alt={slides[baseIndex].alt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      {slideCount > 1 && (
        <motion.div
          className="absolute inset-0 z-[1]"
          initial={false}
          animate={{ opacity: isCrossfading ? 1 : 0 }}
          transition={opacityTransition}
        >
          <Image
            src={slides[overlayIndex].src}
            alt={slides[overlayIndex].alt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
      )}

      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-[#27251F]/65 via-[#27251F]/35 to-[#27251F]/55" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28 bg-gradient-to-t from-[#F1EFE5] to-transparent sm:h-36" />
    </div>
  );
}

function SpecialNoticeBanner({ message }: { message: string }) {
  return (
    <div
      role="note"
      className="relative z-30 border-b border-[#20543B]/20 bg-[#20543B] px-4 py-3 text-center text-sm font-semibold leading-snug text-[#FDFCF8] sm:text-base"
    >
      {message}
    </div>
  );
}

function HeroStatusCompact({
  mounted,
  isOpen,
  subline,
  headline,
  emphasizeSubline,
  className,
}: {
  mounted: boolean;
  isOpen: boolean;
  subline: string;
  headline?: string;
  /** Congés / travaux : sous-ligne sur 2 lignes, sans truncate */
  emphasizeSubline?: boolean;
  className?: string;
}) {
  const label = !mounted
    ? "…"
    : headline ?? (isOpen ? "Ouvert" : "Fermé");
  const ariaSummary =
    mounted && subline ? `${label}, ${subline}` : label;

  return (
    <motion.div
      layout
      role="status"
      aria-live="polite"
      aria-label={ariaSummary}
      className={cn(
        "relative flex min-w-0 max-w-full items-center gap-2 rounded-full py-1.5 pl-2.5 pr-4 shadow-md sm:gap-2.5 sm:py-2 sm:pl-3.5 sm:pr-5",
        isOpen
          ? "bg-[#20543B] text-white"
          : "bg-[#E8E6E0] text-[#27251F]/60 ring-1 ring-[#27251F]/10",
        className
      )}
    >
      <span className="relative flex h-2.5 w-2.5 shrink-0 sm:h-3 sm:w-3">
        {mounted && isOpen && (
          <span
            className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-80"
            style={{ backgroundColor: C.sage }}
          />
        )}
        <span
          className={cn(
            "relative inline-flex h-full w-full rounded-full ring-2",
            !mounted && "bg-[#27251F]/20 ring-transparent",
            mounted &&
              isOpen &&
              "ring-[#20543B]/40 shadow-[0_0_8px_rgba(113,154,118,0.85)]",
            mounted &&
              !isOpen &&
              "bg-[#27251F]/30 ring-transparent"
          )}
          style={mounted && isOpen ? { backgroundColor: C.sage } : undefined}
        />
      </span>
      <div className="relative min-w-0 text-left leading-tight">
        <AnimatePresence mode="wait">
          <motion.p
            key={label}
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -3 }}
            className="text-xs font-extrabold tracking-tight sm:text-sm"
          >
            {label}
          </motion.p>
        </AnimatePresence>
        {mounted && subline && (
          <p
            className={cn(
              "mt-0.5 text-[10px] font-semibold sm:text-xs",
              emphasizeSubline
                ? "line-clamp-2 whitespace-normal sm:max-w-[14rem]"
                : "truncate sm:max-w-none sm:whitespace-normal",
              isOpen ? "text-white/90" : "text-[#27251F]/55"
            )}
            title={subline}
          >
            {subline}
          </p>
        )}
      </div>
    </motion.div>
  );
}

function PriceCell({ value }: { value: number | null }) {
  return (
    <span className="whitespace-nowrap tabular-nums text-lg font-extrabold text-[#27251F] sm:text-xl lg:text-2xl">
      {value === null ? "Ø" : formatPrice(value)}
    </span>
  );
}

const priceLabelClass =
  "text-right text-xs font-extrabold uppercase tracking-wide text-[#27251F]/60 sm:text-sm";

/** Aligné sur la grille prix de PizzaRow — Petite puis Grande */
const MENU_PRICE_GRID =
  "grid grid-cols-1 gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(4.75rem,auto)_minmax(4.75rem,auto)] sm:items-start sm:gap-x-6 lg:grid-cols-[minmax(0,1fr)_minmax(5.25rem,auto)_minmax(5.25rem,auto)] lg:gap-x-8";

function MenuPriceHeader({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        MENU_PRICE_GRID,
        "mb-4 hidden border-b border-[#27251F]/20 pb-3 sm:grid",
        className
      )}
    >
      <span className="hidden sm:block" />
      <span className={priceLabelClass}>Petite</span>
      <span className={priceLabelClass}>Grande</span>
    </div>
  );
}

function MenuPriceHeaderMobile() {
  return (
    <div className="mb-4 flex justify-end gap-8 border-b border-[#27251F]/20 pb-3 sm:hidden">
      <span className={priceLabelClass}>Petite</span>
      <span className={priceLabelClass}>Grande</span>
    </div>
  );
}

function PizzaRow({
  pizza,
  onAllergenClick,
}: {
  pizza: PizzaItem;
  onAllergenClick: (pizza: PizzaItem) => void;
}) {
  return (
    <article className="border-b border-[#27251F]/12 py-5 last:border-b-0 sm:py-6 lg:py-8">
      <div className={MENU_PRICE_GRID}>
        <div className="min-w-0 space-y-2 lg:space-y-2.5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="min-w-0 text-xl font-extrabold leading-snug text-[#27251F] sm:text-2xl lg:text-[1.75rem]">
              {pizza.name}
            </h3>
            <button
              type="button"
              onClick={() => onAllergenClick(pizza)}
              aria-label={`Allergènes — ${pizza.name}`}
              className="mt-0.5 shrink-0 rounded-full p-1.5 text-[#20543B] transition hover:bg-[#20543B]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#20543B]/45"
            >
              <Info className="h-5 w-5 sm:h-[1.35rem] sm:w-[1.35rem]" strokeWidth={2.25} />
            </button>
          </div>
          <p className="text-lg font-medium leading-relaxed text-[#27251F]/90 sm:text-xl lg:text-[1.2rem] lg:leading-relaxed">
            {pizza.ingredients}
          </p>
        </div>
        <div className="col-span-1 flex justify-end gap-8 sm:contents">
          <PriceCell value={pizza.petite} />
          <PriceCell value={pizza.grande} />
        </div>
      </div>
    </article>
  );
}

function MenuPizzaColumn({
  pizzas,
  onAllergenClick,
  showDesktopHeader = true,
}: {
  pizzas: PizzaItem[];
  onAllergenClick: (pizza: PizzaItem) => void;
  showDesktopHeader?: boolean;
}) {
  return (
    <div>
      {showDesktopHeader && <MenuPriceHeader />}
      {pizzas.map((pizza) => (
        <PizzaRow
          key={pizza.name}
          pizza={pizza}
          onAllergenClick={onAllergenClick}
        />
      ))}
    </div>
  );
}

export default function HomePage() {
  const [menuTab, setMenuTab] = useState<MenuTab>("tomate");
  const [allergenPizza, setAllergenPizza] = useState<PizzaItem | null>(null);
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState<OpenStatus>({
    isOpen: false,
    subline: "",
    source: "normal",
  });

  useEffect(() => {
    setMounted(true);
    const refresh = () => setStatus(getOpenStatus(getParisDate()));
    refresh();
    const interval = window.setInterval(refresh, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  const activePizzas = useMemo(
    () => (menuTab === "tomate" ? PIZZAS_TOMATE : PIZZAS_CREME),
    [menuTab]
  );

  const menuColumnSplit = useMemo(() => {
    const mid = Math.ceil(activePizzas.length / 2);
    return [activePizzas.slice(0, mid), activePizzas.slice(mid)] as const;
  }, [activePizzas]);

  return (
    <main
      className={cn(
        sans.variable,
        sans.className,
        "relative min-h-screen pb-28 text-base font-medium text-[#27251F] sm:text-lg lg:text-xl md:pb-16"
      )}
      style={{ backgroundColor: C.paper }}
    >
      <PaperTexture />

      {mounted && status.banner ? (
        <SpecialNoticeBanner message={status.banner} />
      ) : null}

      <PizzaAllergenPanel
        pizza={allergenPizza}
        onClose={() => setAllergenPizza(null)}
      />

      {/* ——— Hero + slider ——— */}
      <section className="relative min-h-[88vh]">
        <HeroSlider slides={HERO_SLIDES} />

        <div
          className={cn(
            PAGE_SHELL,
            "pointer-events-none absolute inset-x-0 top-0 z-20 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2 pt-3 sm:gap-3 sm:pt-5"
          )}
        >
          <HeroStatusCompact
            mounted={mounted}
            isOpen={status.isOpen}
            subline={mounted ? status.subline : ""}
            headline={status.headline}
            emphasizeSubline={status.source === "special"}
            className="pointer-events-auto w-fit max-w-full justify-self-start"
          />
          <a
            href={PHONE_HREF}
            aria-label={`Appeler ${siteConfig.name} au ${PHONE_DISPLAY}`}
            className={restoButtonClass(
              "secondary",
              "heroPhone",
              "pointer-events-auto justify-self-end focus-visible:ring-white/60 focus-visible:ring-offset-transparent [&_svg]:h-4 [&_svg]:w-4 sm:[&_svg]:h-5 sm:[&_svg]:w-5"
            )}
          >
            <Phone className="shrink-0" aria-hidden />
            <span className="hidden min-[420px]:inline">{PHONE_DISPLAY}</span>
          </a>
        </div>

        <div
          className={cn(
            PAGE_SHELL,
            "relative z-10 flex min-h-[88vh] flex-col items-center justify-center px-2 pb-10 pt-14 text-center sm:pb-12 sm:pt-16"
          )}
        >
          <LogoLockup onDark showTagline />
          <a
            href="#menu"
            className={cn("mt-8 sm:mt-10", restoButtonClass("primary", "md"))}
          >
            Voir la carte
          </a>
          <a
            href="#infos"
            className={cn(
              "group relative mt-4 inline-block origin-center text-sm font-semibold text-white no-underline",
              "drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)]",
              "transition-transform duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-105",
              "sm:mt-5"
            )}
          >
            Adresse & horaires
            <span
              aria-hidden
              className="absolute -bottom-0.5 left-0 h-0.5 w-full origin-left scale-x-0 bg-[#719A76] transition-transform duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-x-100"
            />
          </a>
        </div>
      </section>

      <HeaderBotaniqueBandeau />

      {/* ——— Menu complet ——— */}
      <section id="menu" className="relative py-16 sm:py-20 lg:py-24">
        <div className={PAGE_SHELL}>
          <div className="mb-10 text-center lg:mb-14">
            <Ribbon>Carte complète</Ribbon>
            <p className="mx-auto mt-8 max-w-3xl text-lg font-medium leading-relaxed text-[#27251F]/90 sm:text-xl lg:mt-10 lg:text-[1.35rem]">
              Retranscription fidèle de la carte : format{" "}
              <strong className="font-bold">Petite</strong> et{" "}
              <strong className="font-bold">Grande</strong>. Le symbole{" "}
              <strong className="font-bold">Ø</strong> indique l&apos;absence de
              prix petit format sur l&apos;imprimé (six dernières pizzas
              tomate). L&apos;icône{" "}
              <Info
                className="inline h-[1.1em] w-[1.1em] align-[-0.15em] text-[#20543B]"
                strokeWidth={2.25}
                aria-hidden
              />{" "}
              ouvre la fiche allergènes de la pizza.
            </p>
          </div>

          <div
            id={menuTab === "tomate" ? "menu-tomate" : "menu-creme"}
            className="rounded-[2rem] border border-[#27251F]/10 bg-[#FDFCF8]/95 p-6 shadow-sm sm:p-10 lg:rounded-[2.5rem] lg:p-12 xl:p-14"
          >
            <div className="mb-10 flex flex-wrap items-center justify-center gap-4 lg:mb-12 lg:gap-6">
              <MenuCategoryRibbon
                active={menuTab === "tomate"}
                tone="forest"
                onClick={() => setMenuTab("tomate")}
              >
                Pizzas base tomate
              </MenuCategoryRibbon>
              <MenuCategoryRibbon
                active={menuTab === "creme"}
                tone="sage"
                onClick={() => setMenuTab("creme")}
              >
                Pizzas base crème
              </MenuCategoryRibbon>
            </div>
            {/* Mobile : une colonne, en-tête prix une fois */}
            <div
              className={cn(
                menuTab === "tomate" ? "md:hidden" : "lg:hidden"
              )}
            >
              <MenuPriceHeaderMobile />
              {activePizzas.map((pizza) => (
                <PizzaRow
                  key={pizza.name}
                  pizza={pizza}
                  onAllergenClick={setAllergenPizza}
                />
              ))}
            </div>

            {/* Desktop 2 colonnes : en-tête Petite / Grande au-dessus de chaque colonne */}
            <div
              className={cn(
                "hidden gap-x-10 lg:gap-x-14",
                menuTab === "tomate"
                  ? "md:grid md:grid-cols-2"
                  : "lg:grid lg:grid-cols-2"
              )}
            >
              <MenuPizzaColumn
                pizzas={menuColumnSplit[0]}
                onAllergenClick={setAllergenPizza}
              />
              <MenuPizzaColumn
                pizzas={menuColumnSplit[1]}
                onAllergenClick={setAllergenPizza}
              />
            </div>
          </div>

          {/* Suppléments & Facebook (repise volet 2) */}
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:mt-16 lg:gap-10">
            <div className="rounded-[2rem] border border-[#27251F]/10 bg-[#FDFCF8]/95 p-8 shadow-sm lg:p-10">
              <Ribbon className="mb-5">Suppléments</Ribbon>
              <table className="w-full text-lg font-semibold sm:text-xl">
                <tbody>
                  <tr className="border-b border-[#27251F]/10">
                    <td className="py-4">Ingrédient supplémentaire</td>
                    <td className="py-4 text-right tabular-nums font-extrabold">
                      1,00 €
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4">Mozzarella di Bufala</td>
                    <td className="py-4 text-right tabular-nums font-extrabold">
                      2,50 €
                    </td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-6 text-lg font-medium text-[#27251F]/85 sm:text-xl">
                Allergènes : informations à consulter sur place (tableau
                affiché en boutique).
              </p>
            </div>
            <div className="flex flex-col justify-between rounded-[2rem] border border-[#27251F]/10 bg-[#FDFCF8]/95 p-8 shadow-sm lg:p-10">
              <div>
                <Ribbon className="mb-5">Pizza du mois</Ribbon>
                <p className="text-lg leading-relaxed text-[#27251F]/85 sm:text-xl">
                  Rejoignez-nous sur Facebook pour découvrir la création du
                  moment. Sur la carte imprimée :{" "}
                  <strong className="font-bold">15,30 €</strong> (Grande) —{" "}
                  <strong className="font-bold">Ø</strong> en Petite.
                </p>
              </div>
              <a
                href={FACEBOOK_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className={cn("mt-8", restoButtonClass("social", "social"))}
              >
                <FacebookIcon className="h-4 w-4" />
                {siteConfig.facebook.label} {siteConfig.name}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ——— Adresse & horaires ——— */}
      <section
        id="infos"
        className="relative py-16 sm:py-20 lg:py-24"
        style={{ backgroundColor: `${C.paper}` }}
      >
        <div className={PAGE_SHELL}>
          <Ribbon className="mb-10 lg:mb-14">Adresse & horaires</Ribbon>

          <div className="grid gap-10 rounded-[2rem] border border-[#27251F]/10 bg-[#FDFCF8]/95 p-8 shadow-sm sm:p-10 lg:grid-cols-2 lg:gap-12 lg:p-12">
            <div className="space-y-8">
              <LogoLockup size="sm" />
              <div className="space-y-2 text-lg sm:text-xl">
                <p className="font-bold uppercase tracking-[0.12em] text-[#20543B]">
                  {siteConfig.name} — {siteConfig.footerLine}
                </p>
                <p>{ADDRESS_LINE_1}</p>
                <p>{ADDRESS_LINE_2}</p>
              </div>
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-2 text-xl font-extrabold text-[#20543B] sm:text-2xl"
              >
                <Phone className="h-5 w-5" />
                {PHONE_DISPLAY}
              </a>
              <div className="border-t border-[#27251F]/12 pt-6 text-lg sm:text-xl">
                <p className="mb-2 font-bold text-[#20543B]">
                  Horaires affichés sur la carte
                </p>
                <ul className="space-y-2 text-[#27251F]/90">
                  <li>Mardi — 11 h à 14 h</li>
                  <li>
                    Du mercredi au samedi — 11 h à 14 h et 18 h à 21 h 45
                  </li>
                  <li className="text-[#27251F]/65">Lundi & dimanche : fermé</li>
                </ul>
              </div>
            </div>

            <div className="overflow-hidden rounded-[1.75rem]">
              <iframe
                title={`${siteConfig.name} — ${siteConfig.address.addressLocality}`}
                src={MAP_EMBED}
                className="min-h-[16rem] h-full w-full bg-[#F1EFE5] sm:min-h-[20rem]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      <footer
        className="relative py-10 pb-28 sm:py-12 md:pb-12"
        style={{ backgroundColor: C.paper }}
      >
        <div className={PAGE_SHELL}>
          <HerbPair size="sm" className="mb-8 sm:mb-10" />
          <div className="text-center text-sm font-medium text-[#27251F]/85 sm:text-base">
            <p className="font-extrabold uppercase tracking-[0.14em] text-[#20543B]">
              {siteConfig.name} — {siteConfig.footerLine}
            </p>
            <p className="mt-2">{ADDRESS_LINE_2}</p>
            <nav
              aria-label="Pied de page"
              className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
            >
              <a
                href="#menu"
                className="font-semibold text-[#20543B] underline-offset-4 hover:underline"
              >
                Carte
              </a>
              <a
                href="#infos"
                className="font-semibold text-[#20543B] underline-offset-4 hover:underline"
              >
                Adresse & horaires
              </a>
              <a
                href={PHONE_HREF}
                className="font-semibold text-[#20543B] underline-offset-4 hover:underline"
              >
                {PHONE_DISPLAY}
              </a>
              <a
                href={FACEBOOK_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#20543B] underline-offset-4 hover:underline"
              >
                Facebook
              </a>
              <a
                href="/mentions-legales"
                className="font-semibold text-[#20543B] underline-offset-4 hover:underline"
              >
                Mentions légales
              </a>
              <a
                href="/politique-de-confidentialite"
                className="font-semibold text-[#20543B] underline-offset-4 hover:underline"
              >
                Confidentialité
              </a>
            </nav>
            <p className="mt-6 text-xs text-[#27251F]/55 sm:text-sm">
              © 2026 {siteConfig.name}
            </p>
          </div>
        </div>
      </footer>

      <a
        href={PHONE_HREF}
        className={cn(
          "fixed inset-x-4 bottom-4 z-50 md:hidden",
          restoButtonClass("command", "fab", "w-auto max-w-none shrink")
        )}
      >
        <Phone className="h-5 w-5" />
        Commander — {PHONE_DISPLAY}
      </a>
    </main>
  );
}

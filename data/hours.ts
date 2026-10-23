import {
  findActiveSpecialPeriod,
  type SpecialPeriod,
} from "@/data/special-hours";

export type DaySlot = { start: number; end: number };

/** Minutes depuis minuit, fuseau Europe/Paris — aligné carte imprimée */
export const WEEK_SLOTS: Record<number, DaySlot[]> = {
  0: [],
  1: [],
  2: [{ start: 11 * 60, end: 14 * 60 }],
  3: [
    { start: 11 * 60, end: 14 * 60 },
    { start: 18 * 60, end: 21 * 60 + 45 },
  ],
  4: [
    { start: 11 * 60, end: 14 * 60 },
    { start: 18 * 60, end: 21 * 60 + 45 },
  ],
  5: [
    { start: 11 * 60, end: 14 * 60 },
    { start: 18 * 60, end: 21 * 60 + 45 },
  ],
  6: [
    { start: 11 * 60, end: 14 * 60 },
    { start: 18 * 60, end: 21 * 60 + 45 },
  ],
};

export function getParisDate() {
  return new Date(
    new Date().toLocaleString("en-US", { timeZone: "Europe/Paris" })
  );
}

function minutesFromMidnight(date: Date) {
  return date.getHours() * 60 + date.getMinutes();
}

function formatMinutes(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h} h${m === 0 ? "" : ` ${m.toString().padStart(2, "0")}`}`;
}

export type OpenStatus = {
  isOpen: boolean;
  subline: string;
  /** Remplace « Ouvert » / « Fermé » (congés, travaux…) */
  headline?: string;
  /** Message long affiché en bandeau */
  banner?: string;
  source: "normal" | "special";
};

function getNormalOpenStatus(now: Date): Omit<OpenStatus, "source"> {
  const day = now.getDay();
  const nowMinutes = minutesFromMidnight(now);
  const slots = WEEK_SLOTS[day] ?? [];

  for (const slot of slots) {
    if (nowMinutes >= slot.start && nowMinutes < slot.end) {
      return {
        isOpen: true,
        subline: `Jusqu'à ${formatMinutes(slot.end)}`,
      };
    }
  }

  for (const slot of slots) {
    if (nowMinutes < slot.start) {
      return {
        isOpen: false,
        subline: `Ouvre à ${formatMinutes(slot.start)}`,
      };
    }
  }

  const next = findNextOpening(now);
  return {
    isOpen: false,
    subline: next ?? "Hors horaires d'ouverture",
  };
}

function statusFromSpecialClosed(special: SpecialPeriod): OpenStatus {
  return {
    isOpen: false,
    subline: special.badgeLine,
    headline: special.headline ?? "Congés",
    banner: special.banner,
    source: "special",
  };
}

function getOpenStatusWithOverrideSlots(
  now: Date,
  slots: DaySlot[],
  special: SpecialPeriod
): OpenStatus {
  const nowMinutes = minutesFromMidnight(now);

  for (const slot of slots) {
    if (nowMinutes >= slot.start && nowMinutes < slot.end) {
      return {
        isOpen: true,
        subline: special.badgeLine || `Jusqu'à ${formatMinutes(slot.end)}`,
        headline: special.headline,
        banner: special.banner,
        source: "special",
      };
    }
  }

  for (const slot of slots) {
    if (nowMinutes < slot.start) {
      return {
        isOpen: false,
        subline: special.badgeLine || `Ouvre à ${formatMinutes(slot.start)}`,
        headline: special.headline,
        banner: special.banner,
        source: "special",
      };
    }
  }

  return {
    isOpen: false,
    subline: special.badgeLine || "Hors horaires ce jour",
    headline: special.headline,
    banner: special.banner,
    source: "special",
  };
}

export function getOpenStatus(now: Date): OpenStatus {
  const special = findActiveSpecialPeriod(now);

  if (special) {
    if (special.kind === "closed" || special.forceClosed) {
      return statusFromSpecialClosed(special);
    }

    if (special.kind === "hours_override" && special.daySlots?.length) {
      return getOpenStatusWithOverrideSlots(now, special.daySlots, special);
    }

    if (special.kind === "info") {
      const normal = getNormalOpenStatus(now);
      return {
        ...normal,
        subline: special.badgeLine || normal.subline,
        headline: special.headline,
        banner: special.banner,
        source: "special",
      };
    }
  }

  return { ...getNormalOpenStatus(now), source: "normal" };
}

const DAY_LABELS = [
  "dimanche",
  "lundi",
  "mardi",
  "mercredi",
  "jeudi",
  "vendredi",
  "samedi",
] as const;

function findNextOpening(from: Date): string | null {
  const startDay = from.getDay();

  for (let offset = 1; offset <= 7; offset++) {
    const day = (startDay + offset) % 7;
    const slots = WEEK_SLOTS[day] ?? [];
    if (slots.length === 0) continue;
    const first = slots[0]!;
    const dayLabel =
      offset === 1 ? "demain" : `${DAY_LABELS[day]!.slice(0, 3)}.`;
    return `Ouvre ${dayLabel} à ${formatMinutes(first.start)}`;
  }
  return null;
}

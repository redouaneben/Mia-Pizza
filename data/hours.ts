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

/** Lundi → dimanche, pour le texte affiché. */
const MONDAY_FIRST = [1, 2, 3, 4, 5, 6, 0] as const;

const SCHEMA_DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

function slotsKey(slots: DaySlot[]) {
  return slots.map((slot) => `${slot.start}-${slot.end}`).join("|");
}

function formatSlotRange(slots: DaySlot[]) {
  return slots
    .map((slot) => `${formatMinutes(slot.start)} à ${formatMinutes(slot.end)}`)
    .join(" et ");
}

function formatSchemaTime(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
}

function capitalize(label: string) {
  return label.charAt(0).toUpperCase() + label.slice(1);
}

function isConsecutiveInWeek(days: number[]) {
  const positions = days.map((day) => MONDAY_FIRST.indexOf(day as (typeof MONDAY_FIRST)[number]));
  return positions.every((position, index) => index === 0 || position === positions[index - 1]! + 1);
}

function formatDaySpan(days: number[]) {
  const names = days.map((day) => DAY_LABELS[day]!);
  if (names.length === 1) return capitalize(names[0]!);
  if (names.length === 2 || !isConsecutiveInWeek(days)) {
    const head = names.slice(0, -1).join(", ");
    return `${capitalize(head)} & ${names[names.length - 1]}`;
  }
  return `Du ${names[0]} au ${names[names.length - 1]}`;
}

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

export type HoursDisplayLine = { text: string; muted?: boolean };

/** Texte de la section « Adresse & horaires », déduit de WEEK_SLOTS. */
function buildHoursDisplay(
  slotsByDay: Record<number, DaySlot[]> = WEEK_SLOTS
): HoursDisplayLine[] {
  const lines: HoursDisplayLine[] = [];
  let index = 0;

  while (index < MONDAY_FIRST.length) {
    const day = MONDAY_FIRST[index]!;
    const slots = slotsByDay[day] ?? [];
    if (slots.length === 0) {
      index += 1;
      continue;
    }

    const key = slotsKey(slots);
    const days = [day];
    let next = index + 1;
    while (next < MONDAY_FIRST.length) {
      const nextDay = MONDAY_FIRST[next]!;
      const nextSlots = slotsByDay[nextDay] ?? [];
      if (slotsKey(nextSlots) !== key) break;
      days.push(nextDay);
      next += 1;
    }

    lines.push({
      text: `${formatDaySpan(days)} — ${formatSlotRange(slots)}`,
    });
    index = next;
  }

  const closed = MONDAY_FIRST.filter((day) => (slotsByDay[day] ?? []).length === 0);
  if (closed.length > 0) {
    lines.push({ text: `${formatDaySpan([...closed])} : fermé`, muted: true });
  }

  return lines;
}

export const HOURS_DISPLAY: HoursDisplayLine[] = buildHoursDisplay();

/** Horaires schema.org, déduits de la même liste que l'affichage. */
export function buildOpeningHoursSpecification(
  slotsByDay: Record<number, DaySlot[]> = WEEK_SLOTS
) {
  const bySlot = new Map<string, { start: number; end: number; days: string[] }>();

  for (let day = 0; day < 7; day++) {
    for (const slot of slotsByDay[day] ?? []) {
      const key = `${slot.start}-${slot.end}`;
      const existing = bySlot.get(key);
      const name = SCHEMA_DAYS[day]!;
      if (existing) existing.days.push(name);
      else bySlot.set(key, { start: slot.start, end: slot.end, days: [name] });
    }
  }

  return [...bySlot.values()].map((slot) => ({
    "@type": "OpeningHoursSpecification" as const,
    dayOfWeek: slot.days.length === 1 ? slot.days[0]! : slot.days,
    opens: formatSchemaTime(slot.start),
    closes: formatSchemaTime(slot.end),
  }));
}

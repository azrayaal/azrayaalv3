const MONTH_YEAR = new Intl.DateTimeFormat('en-GB', { month: 'short', year: 'numeric' });
const FULL_DATE = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});

export const formatMonthYear = (iso: string | null, fallback = 'Present') =>
  iso ? MONTH_YEAR.format(new Date(iso)) : fallback;

export const formatDate = (iso: string) => FULL_DATE.format(new Date(iso));

export const formatYear = (iso: string) => String(new Date(iso).getFullYear());

/** "Apr 2024 — Present · 2 yrs 3 mos" */
export const formatDateRange = (start: string, end: string | null) =>
  `${formatMonthYear(start)} — ${formatMonthYear(end)}`;

export const formatDuration = (start: string, end: string | null) => {
  const from = new Date(start);
  const to = end ? new Date(end) : new Date();
  const months = Math.max(
    1,
    (to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth()),
  );
  const years = Math.floor(months / 12);
  const remainder = months % 12;

  return [years > 0 && `${years} yr${years > 1 ? 's' : ''}`, remainder > 0 && `${remainder} mo`]
    .filter(Boolean)
    .join(' ');
};

/** Zero-pads an index for the monospaced list numerals used across the site. */
export const formatIndex = (index: number) => String(index + 1).padStart(2, '0');

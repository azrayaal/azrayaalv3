import { cn } from '@/utils/cn';

interface FilterBarProps<T extends string> {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
  counts?: Partial<Record<T, number>>;
  className?: string;
}

/** Radio-group semantics on a horizontally scrollable chip row. */
export function FilterBar<T extends string>({
  label,
  options,
  value,
  onChange,
  counts,
  className,
}: FilterBarProps<T>) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cn('scrollbar-none -mx-3 flex gap-2 overflow-x-auto px-3 sm:mx-0 sm:px-0', className)}
    >
      {options.map((option) => {
        const selected = option === value;

        return (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(option)}
            className={cn(
              'inline-flex min-h-11 shrink-0 items-center gap-2 rounded-md border px-4 text-[13px] font-semibold transition-colors duration-200',
              selected
                ? 'border-fg bg-fg text-bg'
                : 'border-line bg-surface text-fg-muted hover:border-line-strong hover:text-fg',
            )}
          >
            {option}
            {counts?.[option] !== undefined && (
              <span
                className={cn(
                  'font-mono text-[11px] font-normal',
                  selected ? 'text-bg/60' : 'text-fg-subtle',
                )}
              >
                {counts[option]}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

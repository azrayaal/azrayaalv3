import { ChevronDown } from 'lucide-react';
import { useId } from 'react';
import { cn } from '@/utils/cn';

interface SelectOption<T extends string> {
  value: T;
  label: string;
}

interface SelectProps<T extends string> {
  label: string;
  options: SelectOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

export function Select<T extends string>({
  label,
  options,
  value,
  onChange,
  className,
}: SelectProps<T>) {
  const id = useId();

  return (
    <div className={cn('relative', className)}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>

      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value as T)}
        className="h-11 w-full cursor-pointer appearance-none rounded-md border border-line bg-surface pl-4 pr-10 text-[13px] font-semibold text-fg outline-none transition-colors hover:border-line-strong"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-surface text-fg">
            {option.label}
          </option>
        ))}
      </select>

      <ChevronDown
        aria-hidden
        size={16}
        strokeWidth={1.5}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-fg-muted"
      />
    </div>
  );
}

import { Search, X } from 'lucide-react';
import { useId } from 'react';
import { cn } from '@/utils/cn';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder?: string;
  resultCount?: number;
  className?: string;
}

export function SearchInput({
  value,
  onChange,
  label,
  placeholder,
  resultCount,
  className,
}: SearchInputProps) {
  const id = useId();

  return (
    <div className={cn('relative', className)}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>

      <Search
        aria-hidden
        size={16}
        strokeWidth={1.5}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-fg-muted"
      />

      <input
        id={id}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        className="h-11 w-full rounded-md border border-fg-subtle bg-surface-2 pl-11 pr-11 text-sm text-fg shadow-[inset_0_0_0_1px_rgba(255,255,255,0.145)] outline-none transition-colors placeholder:text-fg-muted hover:border-fg-muted [&::-webkit-search-cancel-button]:hidden"
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute right-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-xs text-fg-muted transition-colors hover:bg-fg/10 hover:text-fg-strong"
        >
          <X aria-hidden size={16} strokeWidth={1.5} />
        </button>
      )}

      {resultCount !== undefined && (
        <p aria-live="polite" className="sr-only">
          {resultCount} results
        </p>
      )}
    </div>
  );
}

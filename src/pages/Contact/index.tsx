import { ArrowUpRight, Send } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { PageHeader, Seo, SocialLinks } from '@/components/common';
import { Button, Icon, Reveal, Section } from '@/components/ui';
import { contactChannels, profile, socialLinks } from '@/data';
import { cn } from '@/utils/cn';

type Field = 'name' | 'email' | 'message';

const fields: { id: Field; label: string; type: 'text' | 'email' | 'textarea'; placeholder: string }[] = [
  { id: 'name', label: 'Name', type: 'text', placeholder: 'Ada Lovelace' },
  { id: 'email', label: 'Email', type: 'email', placeholder: 'ada@example.com' },
  {
    id: 'message',
    label: 'Message',
    type: 'textarea',
    placeholder: 'What are you building, and what is in the way?',
  },
];

const inputClass =
  'w-full rounded-md border bg-surface-2 px-4 py-3 text-base text-fg shadow-[inset_0_0_0_1px_rgba(255,255,255,0.145)] outline-none transition-colors placeholder:text-fg-muted';

const validate = (values: Record<Field, string>) => {
  const errors: Partial<Record<Field, string>> = {};

  if (!values.name.trim()) errors.name = 'Please tell me who you are.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'That email does not look right.';
  if (values.message.trim().length < 12) errors.message = 'A sentence or two would help.';

  return errors;
};

export default function Contact() {
  const [values, setValues] = useState<Record<Field, string>>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});

  /**
   * There is no backend behind this portfolio, so a valid submission hands the
   * message to the user's mail client rather than pretending to send it.
   */
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    const subject = encodeURIComponent(`Project enquiry from ${values.name}`);
    const body = encodeURIComponent(`${values.message}\n\n— ${values.name} (${values.email})`);

    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <Seo
        title="Contact"
        description={`Get in touch with ${profile.name} — ${profile.availability}.`}
        path="/contact"
      />

      <PageHeader
        // eyebrow={profile.availability}
        title="Say hello"
        description="Tell me what you are building and where it is stuck. I read everything and reply within two working days."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_360px] lg:gap-20">
          <Reveal>
            <form onSubmit={onSubmit} noValidate className="flex max-w-[560px] flex-col gap-6">
              {fields.map((field) => {
                const error = errors[field.id];
                const describedBy = error ? `${field.id}-error` : undefined;

                return (
                  <div key={field.id} className="flex flex-col">
                    <label
                      htmlFor={field.id}
                      className="mb-2 text-sm font-semibold leading-5 text-fg"
                    >
                      {field.label}
                    </label>

                    {field.type === 'textarea' ? (
                      <textarea
                        id={field.id}
                        rows={6}
                        value={values[field.id]}
                        onChange={(event) =>
                          setValues((current) => ({ ...current, [field.id]: event.target.value }))
                        }
                        placeholder={field.placeholder}
                        aria-invalid={Boolean(error)}
                        aria-describedby={describedBy}
                        className={cn(
                          inputClass,
                          'resize-y',
                          error ? 'border-danger' : 'border-fg-subtle hover:border-fg-muted',
                        )}
                      />
                    ) : (
                      <input
                        id={field.id}
                        type={field.type}
                        value={values[field.id]}
                        onChange={(event) =>
                          setValues((current) => ({ ...current, [field.id]: event.target.value }))
                        }
                        placeholder={field.placeholder}
                        aria-invalid={Boolean(error)}
                        aria-describedby={describedBy}
                        className={cn(
                          inputClass,
                          'h-11 py-0',
                          error ? 'border-danger' : 'border-fg-subtle hover:border-fg-muted',
                        )}
                      />
                    )}

                    {error && (
                      <p id={describedBy} role="alert" className="mt-2 text-sm text-danger">
                        {error}
                      </p>
                    )}
                  </div>
                );
              })}

              <Button type="submit" className="w-fit" variant="white">
                <Send aria-hidden size={16} strokeWidth={1.5} />
                Send message
              </Button>

              <p className="font-mono text-[11px] text-fg-subtle">
                Opens in your mail client — nothing is stored here.
              </p>
            </form>
          </Reveal>

          <Reveal variant="fadeLeft" className="flex flex-col gap-10">
            <div>
              <h2 className="mb-4 font-mono text-[11px] uppercase tracking-[1.2px] text-fg-muted">
                Direct
              </h2>

              <ul className="flex flex-col gap-px overflow-hidden rounded-md border border-line bg-line">
                {contactChannels.map((channel) => (
                  <li key={channel.id}>
                    <a
                      href={channel.href}
                      target={channel.href.startsWith('http') ? '_blank' : undefined}
                      rel={channel.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                      className="group flex min-h-16 items-center gap-4 bg-bg px-5 py-4 transition-colors hover:bg-surface"
                    >
                      <Icon
                        name={channel.icon}
                        size={16}
                        className="text-fg-subtle transition-colors group-hover:text-fg"
                      />

                      <span className="flex flex-1 flex-col">
                        <span className="font-mono text-[11px] uppercase tracking-[1.2px] text-fg-subtle">
                          {channel.label}
                        </span>
                        <span className="text-sm text-fg">{channel.value}</span>
                      </span>

                      <ArrowUpRight
                        aria-hidden
                        size={16}
                        strokeWidth={1.5}
                        className="text-fg-subtle opacity-0 transition-opacity group-hover:opacity-100"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="mb-4 font-mono text-[11px] uppercase tracking-[1.2px] text-fg-muted">
                Elsewhere
              </h2>

              <SocialLinks links={socialLinks} variant="list" />
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}

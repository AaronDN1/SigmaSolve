type Props = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: Props) {
  return (
    <div className="max-w-3xl space-y-5">
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-500">{eyebrow}</p>
      <h2 className="font-serif text-4xl leading-[1.05] text-ink dark:text-white md:text-5xl">{title}</h2>
      {description ? <p className="max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">{description}</p> : null}
    </div>
  );
}

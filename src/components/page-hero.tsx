type PageHeroProps = {
  eyebrow: string;
  title: string;
  text: string;
};

export function PageHero({ eyebrow, title, text }: PageHeroProps) {
  return (
    <section className="container-shell py-16 md:py-24">
      <div className="max-w-4xl">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--mint)]">
          {eyebrow}
        </p>
        <h1 className="text-balance text-4xl font-semibold tracking-tight text-white md:text-6xl">
          {title}
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">{text}</p>
      </div>
    </section>
  );
}

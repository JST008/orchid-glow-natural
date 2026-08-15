import type { ReactNode } from "react";

export function LegalPage({
  title,
  intro,
  sections,
}: {
  title: string;
  intro: string;
  sections: { heading: string; body: ReactNode }[];
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="text-4xl">{title}</h1>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{intro}</p>
      <div className="mt-10 space-y-8">
        {sections.map((s) => (
          <section key={s.heading}>
            <h2 className="text-xl">{s.heading}</h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
              {s.body}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
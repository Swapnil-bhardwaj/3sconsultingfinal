import PageHero from "../components/ui/PageHero";
import Container from "../components/ui/Container";

interface Section {
  heading: string;
  body: string;
}

export default function LegalPage({
  eyebrow,
  title,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  sections: Section[];
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} description={intro} />
      <section className="py-20 lg:py-24">
        <Container>
          <div className="mx-auto max-w-2xl space-y-10">
            {sections.map((s) => (
              <div key={s.heading}>
                <h2 className="text-xl font-bold text-ink-950">{s.heading}</h2>
                <p className="mt-3 text-[15.5px] leading-relaxed text-ink-600">{s.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

import profileImage from "@/assets/profile.jpg";
import { Fact, Reveal } from "@/components/editorial";
import { ProfileLinks } from "@/components/Header";
import { useT } from "@/i18n/context";

/**
 * Hero: the name as the headline, then a rule and three columns —
 * portrait (uncropped), introduction and a compact facts column.
 */
const About = () => {
  const t = useT();
  return (
    <section id="top" aria-label={t.hero.sectionLabel} className="page pt-8 sm:pt-14">
      <Reveal>
        <h1 className="type-name">
          Lirije
          <br />
          Shabani<span className="text-primary">.</span>
        </h1>
      </Reveal>

      <Reveal delay={0.1} className="mt-10 grid gap-10 border-t border-foreground pt-6 sm:mt-16 md:grid-cols-12 md:gap-x-6">
        {/* Introduction first in source order: on a phone it is read before the photo. */}
        <div className="space-y-6 md:col-span-7 md:col-start-6 lg:col-span-4 lg:col-start-5">
          <p className="type-statement">
            {t.hero.statementBefore}
            <em className="text-primary">{t.hero.statementEmphasis}</em>
            {t.hero.statementAfter}
          </p>
          <p className="max-w-xl leading-relaxed text-ink-soft">{t.hero.intro}</p>
        </div>

        <img
          src={profileImage}
          alt={t.hero.portraitAlt}
          width={904}
          height={1294}
          className="block h-auto w-3/5 max-w-[340px] sm:w-2/5 md:col-span-4 md:col-start-1 md:row-start-1 md:w-full lg:col-span-3"
        />

        <dl className="grid gap-5 sm:grid-cols-2 md:col-span-7 md:col-start-6 lg:col-span-3 lg:col-start-10 lg:row-start-1 lg:grid-cols-1">
          <Fact term={t.hero.based}>{t.hero.basedValue}</Fact>
          <Fact term={t.hero.focus}>{t.hero.focusValue}</Fact>
          <Fact term={t.hero.now}>{t.hero.nowValue}</Fact>
          <Fact term={t.hero.links}>
            <ProfileLinks />
          </Fact>
        </dl>
      </Reveal>
    </section>
  );
};

export default About;

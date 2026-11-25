import profileImage from "@/assets/profile.jpg";
import { Reveal } from "@/components/editorial";
import { ProfileLinks } from "@/components/Header";
import { useT } from "@/i18n/context";

/**
 * Hero: a short greeting, two sentences about me and the profile links. The
 * uncropped portrait sits beside the text on desktop and after it on phones,
 * so the greeting is always the first thing you read.
 */
const About = () => {
  const t = useT();
  return (
    <section id="top" aria-label={t.hero.sectionLabel} className="page pt-12 sm:pt-24">
      <Reveal className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between md:gap-16">
        <div className="max-w-2xl">
          <h1 className="font-display text-[clamp(2.75rem,6.4vw,4.75rem)] leading-none tracking-[-0.045em]">
            {t.hero.greetingBefore}
            <span className="text-primary">{t.hero.greetingName}</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-soft">{t.hero.intro}</p>
          <ProfileLinks className="mt-7 text-sm" />
        </div>

        <img
          src={profileImage}
          alt={t.hero.portraitAlt}
          width={904}
          height={1294}
          className="block h-auto w-[180px] shrink-0 sm:w-[200px] md:w-[230px]"
        />
      </Reveal>
    </section>
  );
};

export default About;

import profileImage from "@/assets/profile.jpg";
import { Fact, Reveal } from "@/components/editorial";
import { ProfileLinks } from "@/components/Header";

/**
 * Hero: the name as the headline, then a rule and three columns —
 * portrait (uncropped), introduction and a compact facts column.
 */
const About = () => (
  <section id="top" aria-label="Introduction" className="page pt-8 sm:pt-14">
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
          Full-stack developer. Most of my work happens <em className="text-primary">behind the API</em> — data
          models, access rules and the systems that keep data correct.
        </p>
        <p className="max-w-xl leading-relaxed text-ink-soft">
          I've worked on e-commerce platforms, CMS integrations and large volumes of product data. Right now I'm
          building Nodia, a .NET platform for working with company data using AI.
        </p>
      </div>

      <img
        src={profileImage}
        alt="Portrait of Lirije Shabani"
        width={904}
        height={1294}
        className="block h-auto w-3/5 max-w-[340px] sm:w-2/5 md:col-span-4 md:col-start-1 md:row-start-1 md:w-full lg:col-span-3"
      />

      <dl className="grid gap-5 sm:grid-cols-2 md:col-span-7 md:col-start-6 lg:col-span-3 lg:col-start-10 lg:row-start-1 lg:grid-cols-1">
        <Fact term="Based">Skene, Sweden</Fact>
        <Fact term="Focus">Backend, APIs, data and AI integration</Fact>
        <Fact term="Now">Building Nodia · studying DevSecOps · open to new roles</Fact>
        <Fact term="Links">
          <ProfileLinks />
        </Fact>
      </dl>
    </Reveal>
  </section>
);

export default About;

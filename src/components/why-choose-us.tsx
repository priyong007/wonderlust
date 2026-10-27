import { Headphones, Map, ShieldCheck, type LucideIcon } from "lucide-react";

const features: {
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
    icon: ShieldCheck,
  },
  {
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
    icon: Map,
  },
  {
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
    icon: Headphones,
  },
];

export function WhyChooseUs() {
  return (
    <section
      id="why-choose-us"
      aria-labelledby="why-choose-us-heading"
      className="bg-blue-100 px-4 py-16 sm:px-6"
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <header className="flex flex-col items-center gap-2 text-center">
          <h2
            id="why-choose-us-heading"
            className="font-heading text-[clamp(2rem,4vw,2.75rem)] leading-tight font-normal tracking-tight text-foreground"
          >
            Why Choose Wanderlust
          </h2>
          <p className="text-[13px] leading-relaxed text-muted-foreground">
            Your trusted partner for exceptional travel experiences
          </p>
        </header>

        <ul className="grid gap-6 md:grid-cols-3">
          {features.map(({ title, description, icon: Icon }) => (
            <li
              key={title}
              className="flex flex-col border border-black/5 bg-white p-6 text-left"
            >
              <Icon
                className="size-7 text-brand"
                strokeWidth={1.75}
                aria-hidden="true"
              />
              <h3 className="mt-6 font-heading text-2xl leading-snug font-normal text-foreground">
                {title}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                {description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

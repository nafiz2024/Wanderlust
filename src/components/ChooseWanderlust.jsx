
import { FiHeadphones, FiMap, FiShield } from "react-icons/fi";

const chooseHighlights = [
  {
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
    icon: FiShield,
  },
  {
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
    icon: FiMap,
  },
  {
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
    icon: FiHeadphones,
  },
];

const ChooseWanderlust = () => {
  return (
    <section className="px-4 py-18 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1220px]">
        <header className="text-center">
          <h2 className="text-[34px] leading-none font-semibold tracking-[-0.045em] text-[#112733] sm:text-[50px]">
            Why Choose Wanderlust
          </h2>
          <p className="mt-3 text-[13px] text-[#7d8b91] sm:text-[14px]">
            Your trusted partner for exceptional travel experiences
          </p>
        </header>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {chooseHighlights.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="card-glow relative rounded-3xl border border-[#d8f0fb] bg-white px-5 py-7 shadow-[0_10px_24px_rgba(5,30,52,0.08)] sm:px-6 sm:py-8"
              >
                <span className="inline-flex text-[#19a7c9]">
                  <Icon className="h-7 w-7" />
                </span>

                <h3 className="mt-5 text-[22px] leading-none font-light tracking-[-0.03em] text-[#1a1a1a]">
                  {item.title}
                </h3>

                <p className="mt-4 max-w-[290px] text-[12px] leading-5 text-[#8b8b8b]">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ChooseWanderlust;

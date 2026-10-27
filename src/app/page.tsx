import { Banner } from "@/components/banner";
import { Testimonials } from "@/components/testimonials";
import { WhyChooseUs } from "@/components/why-choose-us";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      
      <Banner />
      <WhyChooseUs />
      <Testimonials />
    </div>
  );
}

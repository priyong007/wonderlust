import { Banner } from "@/components/banner";
import { Testimonials } from "@/components/testimonials";
import { WhyChooseUs } from "@/components/why-choose-us";
import Featured from "@/components/featured";
import ReadySection from "@/components/ready";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      
      <Banner />
      <Featured/>
      <WhyChooseUs />
      <Testimonials />
      <ReadySection/>
    </div>
  );
}

import FeatureCard from "../components/FeatureCard";
import { ShieldAlert, Brain, MessageSquareMore } from "lucide-react";

export default function Features() {
  return (
    <section className="max-w-7xl mx-auto mt-12 md:mt-15 lg:mt-20 grid grid-cols-1 sm:grid-cols-2 pb-5
        lg:grid-cols-3 gap-6 lg:gap-8 px-4 sm:px-6 lg:px-10">
      <FeatureCard
        icon={<ShieldAlert size={32} className="lg:size-[38px]" />}
        title="Binary Detection"
        description="Quickly Detect whether a message is Safe or Harmful."
      />
      <FeatureCard
        icon={<Brain size={32} className="lg:size-[38px]" />}
        title="Multi-label Analysis"
        description="Identify harmful categories such as Abuse, Hate, Threat, Toxicity and Harassment."
      />
      <FeatureCard
        icon={<MessageSquareMore size={32} className="lg:size-[38px]" />}
        title="Smart Suggestions"
        description="Alternative Respectful wording that encourages healthier conversations."
      />
    </section>
  );
}
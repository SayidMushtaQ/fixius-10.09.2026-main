import { CraftManData } from "@/constants/landingPage";
import { CraftsmanCard } from "./CraftsmanCard";
import Reveal from "./Reveal";

export default function Craftsman() {
  return (
    <section className="py-24 bg-main-background relative overflow-hidden">
       {/* Background accent - subtle sky blue glow */}
      <div className="absolute -bottom-24 -right-24 w-150 h-150 bg-accent-cyan/5 rounded-full blur-[120px] -z-10" />

      <div className="Container">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <Reveal
            as="h2"
            className="text-3xl md:text-4xl font-bold text-secondary tracking-tight leading-tight"
          >
            Unsere bestbewerteten <span className="text-primary italic">Handwerker</span>
          </Reveal>
          <Reveal
            as="p"
            delay={0.1}
            className="text-secondary-light text-lg font-medium"
          >
            Vertrauen Sie auf geprüfte Qualität von den erfahrensten Profis in unserem Netzwerk.
          </Reveal>
        </div>

        <div className="flex justify-center items-stretch flex-wrap gap-10 lg:gap-16">
          {CraftManData.map((craftsman, index) => (
            <CraftsmanCard 
              key={craftsman.id} 
              name={craftsman.name} 
              job={craftsman.job} 
              img={craftsman.img} 
              index={index}
            />
          ))}
        </div>


      </div>
    </section>
  );
}

import { StepsCardsData } from "@/constants/landingPage";
import Image from "next/image";

const Step = ({ step, img, title, paragraph }: StepsDataType) => {
  return (
    <div className="sm:max-w-[20rem] max-w-[18rem] h-[25rem] p-5 shadow bg-white rounded-2xl m-2">
      <div className="flex justify-center items-center relative">
        <div className="flex justify-center items-center w-[20rem] h-[15rem]">
          {/* Try to improve this code tomorrow */}
          <div className="w-[180px] h-[120px] absolute bg-gray-100 rounded-3xl before:content-[''] before:w-full before:rounded-3xl before:h-full before:absolute before:top-0 before:left-0 before:bg-gray-100 before:transform before:rotate-[60deg] afdssdf after:content-[''] after:rounded-3xl after:w-full after:h-full after:absolute after:top-0 after:left-0 after:bg-gray-100 after:transform after:rotate-[-60deg]" />
          <div className="w-[150px] h-[95px] absolute shadow-xl before:shadow-xl after:shadow-xl bg-white rounded-xl before:rounded-xl after:rounded-xl before:content-[''] before:w-full before:h-full before:absolute before:top-0 before:left-0 before:bg-white before:transform before:rotate-[60deg] afdssdf after:content-[''] after:w-full after:h-full after:absolute after:top-0 after:left-0 after:bg-white after:transform after:rotate-[-60deg]" />
          <div className="z-10 w-[150px] h-[95px] bg-white rounded-xl flex justify-center items-center absolute before:rounded-xl after:rounded-xl before:content-[''] before:w-full before:h-full before:absolute before:top-0 before:left-0 before:bg-white before:transform before:rotate-[60deg] afdssdf after:content-[''] after:w-full after:h-full after:absolute after:top-0 after:left-0 after:bg-white after:transform after:rotate-[-60deg]">
            <Image
              className="rounded-t-2xl z-10 w-auto h-auto object-contain"
              src={img}
              alt={title}
              width={100}
              height={100}
            />
          </div>
        </div>
        <span className="absolute top-0 left-0 font-semibold text-orange text-xl">
          Schritt {step}
        </span>
      </div>
      <section className="space-y-2">
        <h2 className="font-bold text-xl">{title}</h2>
        <p className="text-gray-600 pr-9">{paragraph}</p>
      </section>
    </div>
  );
};

export default function Steps({
  isShowHeadingText,
}: {
  isShowHeadingText: boolean;
}) {
  return (
    <div>
      <div className="pt-1">
        {isShowHeadingText && (
          <section className="text-center flex justify-center flex-col items-center my-8">
            <h1 className="font-bold text-4xl text-Heading">
              <span className="text-orange font-bold">
                Verleihen Sie Ihrem Zuhause neuen Glanz{" "}
              </span>
              – finden Sie den passenden Handwerker mit professioneller
              Unterstützung.
            </h1>
          </section>
        )}
        <div className="mt-16">
          <div className="flex justify-center lg:gap-32 items-center flex-wrap">
            {StepsCardsData.map(({ id, step, img, title, paragraph }) => (
              <Step
                key={id}
                step={step}
                img={img}
                title={title}
                paragraph={paragraph}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

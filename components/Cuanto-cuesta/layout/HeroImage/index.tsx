import React from "react";
import Image from "next/image";

const HeroImage = () => {
  return (
    <div className="pt-12">
      <div className="pt-20 bg-gradient-radial from-[#f87b37df] via-[#f87b37ab]  w-full flex justify-center items-center py-10 px-3 flex-col">
        <Image
          src={"/Handwerker-finden/hero.svg"}
          alt="Buscar Artesano"
          width={800}
          height={800}
        />
      </div>
    </div>
  );
};

export default HeroImage;

import { RegisterNow } from '@/constants/landingPage';
import Image from "next/image";
import Link from "next/link";

export default function RegisterNowForFree() {
  return (
    <div className="bg-orange bg-opacity-10 py-11 mb-9">
      <div className="flex justify-center lg:justify-between items-center Container flex-wrap w-full gap-10 lg:gap-0">
        <section className="lg:w-1/2 w-full flex justify-center flex-col items-center gap-6">
          <h1 className="text-4xl font-semibold">{RegisterNow.title}</h1>
          <p className="lg:text-center text-left text-gray-600">
            {RegisterNow.paragraph}
          </p>
          <div className="mt-5">
            <Link href={"/registrieren"} title="Ver más trabajos" className="outline-none">
              <button type="button" className="bg-orange sm:px-6 sm:py-3 px-3 py-2 text-white rounded-lg sm:text-lg text-sm outline-none">
                Jetzt kostenlos registrieren
              </button>
            </Link>
          </div>
        </section>
        <div>
          <Image
            src="/FormularioDeRegistro/regístrateaahoragratuito.svg"
            className="mx-auto w-auto h-auto"
            alt="¡Regístrate Ahora, Llega a Clientes Locales!"
            width={150}
            height={100}
          />
        </div>
      </div>
    </div>
  );
}

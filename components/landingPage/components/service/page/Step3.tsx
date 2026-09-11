import React from "react";

export default function Page3({
  setTextAreaPageData,
  textAreaPageData,
}: {
  setTextAreaPageData: React.Dispatch<React.SetStateAction<string>>;
  textAreaPageData: string;
}) {
  return (
    <div className="space-y-4 ">
      <div className="space-y-1">
        <h2 className="text-lg md:text-xl font-bold text-secondary tracking-tight">
          Beschreiben Sie Ihr <span className="text-primary italic">Vorhaben</span>
        </h2>
        <p className="text-gray-500 text-xs">Geben Sie so viele Details wie möglich an, damit Handwerker ein genaues Angebot erstellen können.</p>
      </div>

      <div className="group space-y-3">
        <label 
          htmlFor="servicePOPup_page2__text_area" 
          className="block text-sm font-semibold text-secondary group-focus-within:text-primary transition-colors ml-1"
        >
          Weitere Details zum Auftrag
        </label>
        <div className="relative">
          <textarea
            id="servicePOPup_page2__text_area"
            className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl outline-none transition-all text-secondary placeholder:text-gray-400 font-semibold min-h-[140px] shadow-xs text-sm"
            onChange={(e) => setTextAreaPageData(e.target.value)}
            value={textAreaPageData}
            placeholder="Beschreiben Sie hier, was genau getan werden soll (z.B. Materialwünsche, Besonderheiten)..."
            rows={5}
          ></textarea>
          <div className="absolute bottom-4 right-5 text-[10px] font-semibold uppercase tracking-widest text-secondary/30 bg-white/50 px-2 py-1 rounded-full backdrop-blur-sm pointer-events-none">
            {textAreaPageData.length} Zeichen
          </div>
        </div>
      </div>
    </div>
  );
}

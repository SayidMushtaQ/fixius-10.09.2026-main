import React, { useEffect, useState } from "react";
import Image from "next/image";
import useOnChangeUploadImages from "@/hooks/useUploadImage";
import { Plus, Image as ImageIcon, Info, XCircle } from "lucide-react";

export default function Page4({
  setImagePageData,
  imageDataPageData,
}: {
  setImagePageData: React.Dispatch<React.SetStateAction<string[]>>;
  imageDataPageData: string[];
}) {
  const { isImgUploading, imagesData, handleImageUpload, setImagePageData: setLocalImageData } =
    useOnChangeUploadImages();
    
  const [previews, setPreviews] = useState<{ id: string; url: string; status: 'uploading' | 'done' }[]>([]);

  useEffect(() => {
    setImagePageData(imagesData);
  }, [setImagePageData, imagesData]);

  // Sync previews with actual uploaded data
  useEffect(() => {
    const updatedPreviews = imageDataPageData.map(url => ({
      id: url,
      url,
      status: 'done' as const
    }));
    setPreviews(updatedPreviews);
  }, [imageDataPageData]);

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // Show optimistic previews
    const newPreviews = Array.from(files).map(file => ({
      id: Math.random().toString(36).substring(7),
      url: URL.createObjectURL(file),
      status: 'uploading' as const
    }));
    
    setPreviews(prev => [...prev, ...newPreviews]);
    await handleImageUpload(e);
  };

  const removeImage = (urlToRemove: string) => {
    const newImages = imageDataPageData.filter(url => url !== urlToRemove);
    setImagePageData(newImages);
    setLocalImageData(newImages);
  };

  return (
    <div className="space-y-8 ">
      <div className="space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight font-inter">
          Aussagekräftige <span className="text-primary italic">Fotos</span> hochladen
        </h2>
        <p className="text-slate-500 text-base font-medium">Bilder helfen Handwerkern, sich ein besseres Bild von der Situation vor Ort zu machen.</p>
      </div>

      <div className="flex flex-wrap gap-4 md:gap-6">
        <label
          htmlFor="dropzone-file"
          className={`flex flex-col items-center justify-center w-32 h-32 md:w-40 md:h-40 border-2 border-dashed rounded-[2rem] cursor-pointer transition-all duration-300 group ${
            isImgUploading 
              ? "border-primary/30 bg-primary/5" 
              : "border-slate-200 bg-slate-50 hover:border-primary/50 hover:bg-white hover:shadow-premium"
          }`}
        >
          <div className="flex flex-col items-center justify-center p-4 text-center">
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center mb-3 transition-all duration-300 ${
              isImgUploading ? "bg-primary/20 scale-90" : "bg-primary/10 group-hover:bg-primary group-hover:text-white text-primary"
            }`}>
              {isImgUploading ? (
                <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              ) : (
                <Plus size={24} strokeWidth={2.5} />
              )}
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
              Hinzufügen
            </span>
          </div>
          <input
            type="file"
            onChange={onFileChange}
            id="dropzone-file"
            name="myFile"
            accept="image/*"
            className="hidden"
            multiple
          />
        </label>

        {previews.map((preview) => (
          <div 
            key={preview.id}
            className="group relative w-32 h-32 md:w-40 md:h-40 rounded-[2rem] overflow-hidden border-2 border-slate-50 shadow-sm transition-all "
          >
            <Image
              src={preview.url}
              alt="Uploaded image"
              fill
              className={`object-cover transition-transform duration-500 ${
                preview.status === 'uploading' ? 'opacity-40 grayscale blur-[2px]' : 'opacity-100'
              }`}
            />
            
            {preview.status === 'uploading' && (
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin shadow-lg" />
              </div>
            )}

            {preview.status === 'done' && (
              <button 
                onClick={() => removeImage(preview.url)}
                className="absolute top-3 right-3 p-1 bg-white/90 backdrop-blur-md rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-all hover:scale-110 hover:bg-white shadow-sm"
              >
                <XCircle size={20} />
              </button>
            )}
            
            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </div>
        ))}
        
        {previews.length === 0 && !isImgUploading && (
          <div className="flex flex-col items-center justify-center w-32 h-32 md:w-40 md:h-40 rounded-[2rem] bg-slate-50 border-2 border-transparent text-slate-200">
            <ImageIcon size={48} strokeWidth={1} />
          </div>
        )}
      </div>

      <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl flex items-start gap-4">
        <div className="mt-0.5 shrink-0 w-8 h-8 bg-white rounded-xl flex items-center justify-center shadow-sm">
          <Info className="w-4 h-4 text-primary" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-bold text-slate-900">Profi-Tipp</p>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            Laden Sie Fotos aus verschiedenen Winkeln hoch. Das hilft Handwerkern, ein präzises Angebot abzugeben. Sie können bis zu 10 Fotos gleichzeitig auswählen.
          </p>
        </div>
      </div>
    </div>
  );
}

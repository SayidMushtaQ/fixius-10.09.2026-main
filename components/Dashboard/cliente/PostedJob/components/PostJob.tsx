"use client";
import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import {TableTestDataType} from '../index'

export default function PostJob({tabelData,setTableData}:{tabelData: TableTestDataType[]; setTableData: React.Dispatch<React.SetStateAction<TableTestDataType[]>>}) {
  const [editTitle, setEditTitle] = useState<{job_title: string;listingID: string;}>({ job_title: "", listingID: "" });
  const handleRemove = (listingID: string) => {
    const removeItemFromTable_data = tabelData.filter((item) => item.listingID !== listingID);
    setTableData(removeItemFromTable_data);
  };
  const handleEdit = (job_title: string, listingID: string) => {
    const itemForEditTitle = tabelData.filter((item) => item.listingID === listingID);
    if (itemForEditTitle.length !== 0) {
      if (itemForEditTitle[0].listingID === listingID) {
        setEditTitle({ job_title, listingID });
      }
    }
  };
  const handleSubmitEdit = (listingID: string) => {
    const updatedItems = tabelData.map((item) =>item.listingID === listingID ? { ...item, job_title: editTitle.job_title }: item);
    setTableData(updatedItems);
    setEditTitle({ job_title: "", listingID: "" });
  };
  
  return (
    <div className="lg:w-[90%] mx-auto bg-white border border-slate-100 flex justify-center items-center rounded-2xl shadow-premium overflow-hidden mb-12">
      <div className="w-full overflow-x-auto">
        <div className="flex justify-between items-center bg-slate-50/50 border-b border-slate-100 px-8 py-6 min-w-240 md:min-w-full">
          <div className="flex justify-start items-center w-80">
            <span className="font-bold font-outfit text-[11px] uppercase tracking-[0.15em] text-slate-400">Berufsbezeichnung</span>
          </div>
          <span className="font-bold w-60 font-outfit text-[11px] uppercase tracking-[0.15em] text-slate-400">Anzeigen-ID</span>
          <span className="font-bold w-60 font-outfit text-[11px] uppercase tracking-[0.15em] text-slate-400">Veröffentlichungsdatum</span>
          <span className="font-bold w-40 font-outfit text-[11px] uppercase tracking-[0.15em] text-slate-400 text-center">Aktionen</span>
        </div>
        
        <div className="bg-white min-w-240 md:min-w-full divide-y divide-slate-50">
          {tabelData.length !== 0 ? (
            tabelData.map((item) => (
              <div key={item.id} className="flex justify-between items-center px-8 py-5 hover:bg-slate-50/30 transition-colors">
                <div className="flex justify-start items-center w-80 gap-2">
                  {editTitle.listingID == item.listingID ? (
                    <div className="flex items-center gap-2">
                      <input 
                        type="text" 
                        name="job_title" 
                        id="job_title" 
                        className="h-11 bg-white border border-primary/20 outline-none px-4 rounded-xl font-inter text-sm shadow-sm focus:ring-2 focus:ring-primary/10 transition-all" 
                        value={editTitle.job_title} 
                        onChange={(e) => setEditTitle((pre) => ({...pre, job_title: e.target.value})) }
                        autoFocus
                      />
                      <button className="bg-primary py-2.5 px-5 rounded-xl text-white font-bold font-inter text-xs shadow-soft hover:bg-black transition-all active:scale-95" onClick={() => handleSubmitEdit(item.listingID)}>
                        Speichern
                      </button>
                    </div> 
                  ) : (
                    <div className="flex flex-col">
                      <span className="font-outfit font-bold text-slate-900 text-base">{item.job_title}</span>
                      <span className="text-[10px] text-primary font-bold uppercase tracking-wider mt-0.5">Aktiv</span>
                    </div>
                  )}
                </div>
                
                <div className="w-60">
                  <span className="font-inter text-slate-600 font-semibold bg-slate-50 px-3 py-1 rounded-lg text-xs border border-slate-100">
                    #{item.listingID}
                  </span>
                </div>
                
                <div className="w-60">
                  <span className="font-inter text-slate-500 font-medium text-sm">
                    {item.date_of_post}
                  </span>
                </div>
                
                <div className="w-40 flex justify-center items-center gap-2">
                  <button 
                    onClick={() => handleEdit(item.job_title, item.listingID)}
                    className="p-2.5 rounded-xl bg-white text-slate-400 hover:bg-primary hover:text-white shadow-sm border border-slate-100 transition-all duration-300"
                    title="Bearbeiten"
                  >
                    <BiEdit className="text-lg" />
                  </button>
                  <button 
                    onClick={() => handleRemove(item.listingID)}
                    className="p-2.5 rounded-xl bg-white text-slate-400 hover:bg-red-500 hover:text-white shadow-sm border border-slate-100 transition-all duration-300"
                    title="Löschen"
                  >
                    <MdDelete className="text-lg" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center w-full flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-300">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <span className="font-inter font-medium text-slate-400">Es gibt keine von dir veröffentlichten Jobanzeigen.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

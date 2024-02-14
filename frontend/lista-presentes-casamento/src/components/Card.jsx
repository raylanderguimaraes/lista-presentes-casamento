import React from "react";

export default function Card({
  name,
  description,
  imageUrl,
  onChoose,
  onCancel,
}) {
  return (
    <div className="w-64 max-w-sm rounded-xl bg-slate-100 overflow-hidden shadow-lg flex flex-col">
      <div className="h-64">
        <img className="w-full h-full object-cover" src={imageUrl} alt={name} />
      </div>
      <div className="flex-grow flex flex-col justify-between">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{name}</div>
          <p className="text-gray-700 text-base">{description}</p>
        </div>
        <div className="px-6 mx-auto pt-4 pb-2 flex gap-2">
          <button
            onClick={onChoose}
            className="bg-customBlue px-4 py-1 rounded-full 
            font-semibold text-lg border text-white hover:bg-slate-100
          hover:border-customBlue hover:text-customBlue transition-all
           duration-300 ease-in-out pointer cursor-pointer">
            Escolher
          </button>
          {/* <button
            onClick={onCancel}
            className="bg-red-600 text-slate-100 border border-slate-100 px-4 py-1 rounded-full font-semibold text-lg hover:border-red-600  hover:bg-slate-100 hover:text-red-600 transition-all duration-300 ease-in-out pointer cursor-pointer">
            Cancelar
          </button> */}
        </div>
      </div>
    </div>
  );
}

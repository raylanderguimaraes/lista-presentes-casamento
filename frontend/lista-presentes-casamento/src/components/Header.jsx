export default function Header() {
  return (
    <div className="flex justify-between  px-10  items-center">
      <h1 className="text-3xl font-semibold mx-auto">Lista de Presentes</h1>
      <div className="flex gap-2">
        <button className="bg-customBlue px-4 py-1 rounded-full font-semibold text-lg border text-white hover:bg-slate-100 hover:border-customBlue hover:text-customBlue transition-all duration-300 ease-in-out pointer cursor-pointer">
          Entrar
        </button>
        <button className="bg-slate-100 text-customBlue border border-customBlue px-4 py-1 rounded-full font-semibold text-lg hover:border-slate-100  hover:bg-customBlue hover:text-white transition-all duration-300 ease-in-out pointer cursor-pointer ">
          Cadastrar
        </button>
      </div>
    </div>
  );
}

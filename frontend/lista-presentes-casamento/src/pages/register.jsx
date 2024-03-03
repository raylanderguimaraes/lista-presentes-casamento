import FormRegister from "@/components/FormRegister";
import MainLayout from "@/layouts/MainLayout";

export default function Register() {
  return (
    <MainLayout>
      <div
        className="bg-cover bg-center flex flex-col
                  justify-center items-center  h-screen min-h-screen
                   font-sans box-border ">
        <FormRegister />
      </div>
    </MainLayout>
  );
}

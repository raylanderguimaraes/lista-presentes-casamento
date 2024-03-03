import FormLogin from "@/components/FormLogin";
import MainLayout from "@/layouts/MainLayout";

export default function Login() {
  return (
    <MainLayout>
      <div
        className="bg-cover bg-center flex flex-col
                  justify-center items-center  h-screen min-h-screen
                   font-sans box-border ">
        <FormLogin />
      </div>
    </MainLayout>
  );
}

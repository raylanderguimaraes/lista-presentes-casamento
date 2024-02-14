import MainLayout from "@/layouts/MainLayout";
import BackGround from "@/assets/BackGround.jpg";

export default function Home() {
  return (
    <MainLayout>
      <div
        className="bg-cover bg-center flex flex-col
                  justify-center items-center  h-screen min-h-screen
                  p-4 font-sans box-border "
        style={{ backgroundImage: `url(${BackGround})` }}>
        <div className="text-center w-1/2 mx-auto items-center font-italianno">
          <h1 className="text-7xl"> Marina e Josther </h1>
          <h2 className=" text-4xl">00.00.2024</h2>
          <p className=" text-4xl">Sejam bem vindos ao nosso site!</p>
        </div>
      </div>
    </MainLayout>
  );
}

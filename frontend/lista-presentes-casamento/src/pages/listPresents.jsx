import { useEffect, useState } from "react";
import Card from "@/components/Card";
import api from "@/service/api";
import MainLayout from "@/layouts/MainLayout";

export default function ListPresents() {
  const [presents, setPresent] = useState();
  const [logged, setLogged] = useState(false);

  function onChoose() {
    if (!logged) {
      alert("Você precisa estar logado para escolher um presente!");
    }
  }

  const URL = "http://localhost:3000/";
  useEffect(() => {
    api
      .get("/presentes")
      .then((res) => setPresent(res.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);
  return (
    <MainLayout>
      {
        <div className="font-playFair min-h-screen">
          <div className="container mx-auto p-10 ">
            <h1 className=" text-3xl text-center mb-5 font-semibol text-zinc-700">
              Lista de Presentes
            </h1>
            <p className="text-center text-xl text-zinc-700">
              Queridos familiares e amigos, para nós, a presença de vocês neste
              dia tão especial é o maior presente que poderíamos receber. Mas,
              se vocês também quiserem nos presentear, ficaremos muito
              agradecidos. Com amor, Marina e Josther
            </p>
          </div>
          <div className=" container flex flex-wrap gap-4 pb-5 justify-center mx-auto">
            {presents &&
              presents.map((present, _id) => (
                <Card
                  key={present._id}
                  name={present.name}
                  description={present.description}
                  imageUrl={`${URL}${present.imageUrl}`}
                  onChoose={() => onChoose()}
                />
              ))}
          </div>
        </div>
      }
    </MainLayout>
  );
}

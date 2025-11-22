import { useState } from "react";
import FiltersContainer from "../components/FiltersContainer";
import Header from "../components/header";
import Map from "../components/map";
import Footer from "../components/Footer";


type DisabilityType =
  | "FISICA"
  | "VISUAL"
  | "AUDITIVA"
  | "INTELECTUAL"
  | "MULTIPLA"
  | "all";

type Dados = {
   minAge: number,
    maxAge: number, 
    gender: string
    disability: String
    city: String
    neighborhood:String

  }



export default function Home() {

  const [dados, setdados] = useState<Dados>({ minAge: 0, maxAge: 0, gender: "", disability: "", city: "", neighborhood: ""});

  const receberDados = ({minAge, maxAge, gender, disability, city, neighborhood}: Dados) =>{
        console.log(dados);
        setdados({minAge, maxAge, gender, disability, city,neighborhood});

    };
 
  return (
    <div className="flex flex-col  w-full">
      <Header />
      <main className="flex flex-1 flex-col md:flex-row overflow-hidden">
        <section className="flex-1 h-[400px] md:h-auto">
          <Map />
        </section>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

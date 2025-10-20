import FiltersContainer from "../components/FiltersContainer";
import Footer from "../components/Footer";
import Header from "../components/header";
import Map from "../components/map";

export default function Home() {
  return (
    <div className="flex flex-col h-screen w-full">
      {/* Cabeçalho fixo */}
      <Header />

      {/* Conteúdo principal (form + mapa lado a lado) */}
      <main className="flex flex-1 flex-col md:flex-row overflow-hidden">
        
        {/* Lado esquerdo — Formulário */}
        <aside className="w-full md:w-[380px] bg-white shadow-md p-4 overflow-y-auto">
          <FiltersContainer />
        </aside>

        {/* Lado direito — Mapa */}
        <section className="flex-1 h-[400px] md:h-auto">
          <Map />
        </section>
      </main>
      <div className="footer">
        <Footer/>
      </div>
    </div>
  );
}

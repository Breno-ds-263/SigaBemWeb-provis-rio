import Header from "../components/header";
import Footer from "../components/Footer";
import AnaliseMap from "../components/MapHome";

export default function Home() {
  return (
    <div className="flex flex-col  w-full">
      <Header />
      <main className="flex flex-1 flex-col md:flex-row overflow-hidden">
        <section className="flex-1 h-[400px] md:h-auto">
          <AnaliseMap/>
        </section>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

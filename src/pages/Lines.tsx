import Footer from "../components/Footer";
import Header from "../components/header";
import MapLine from "../components/MapLine";


export default function Line() {
  return (
    <div className="flex flex-col h-screen w-full">
      <Header />
      <main className="flex flex-1 flex-col md:flex-row overflow-hidden">
        <section className="flex-1 h-[400px] md:h-auto">
          <MapLine />
        </section>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

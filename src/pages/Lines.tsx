import Footer from "../components/Footer";
import Header from "../components/header";
import MapHome from "../components/MapHome";

export default function Line() {
  return (
    <div className="flex flex-col h-screen w-full">
      <Header />
      <main className="flex flex-1 flex-col md:flex-row overflow-hidden">
        <aside className="w-full md:w-[380px] bg-white shadow-md p-4 overflow-y-auto"></aside>

        <section className="flex-1 h-[400px] md:h-auto">
          <MapHome />
        </section>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

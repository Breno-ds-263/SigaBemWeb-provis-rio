import { useState } from "react";
import FiltersContainer from "../components/FiltersContainer";
import Header from "../components/header";
import Map from "../components/map";
import Footer from "../components/Footer";

export default function Home() {
 
  return (
    <div className="flex flex-col h-screen w-full">
      <Header />
      <main className="flex flex-1 flex-col md:flex-row overflow-hidden">
        <aside className="w-full md:w-[380px] bg-white shadow-md p-4 overflow-y-auto">
          <FiltersContainer/>
          
        </aside>

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

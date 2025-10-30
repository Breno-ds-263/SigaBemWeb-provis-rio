import { useState } from "react";
import FiltersContainer from "../components/FiltersContainer";
import Header from "../components/header";
import Map from "../components/map";
import Footer from "../components/Footer";

export default function Home() {
  const [peopleFilters, setPeopleFilters] = useState({
    minAge: 0, maxAge: 100, gender: "all", disability: "all", city: "Recife", neigh: ""
  });

  const [stopFilters, setStopFilters] = useState({ city: "Recife", neigh: "" });

  return (
    <div className="flex flex-col h-screen w-full">
      <Header />
      <main className="flex flex-1 flex-col md:flex-row overflow-hidden">
        <aside className="w-full md:w-[380px] bg-white shadow-md p-4 overflow-y-auto">
          <FiltersContainer 
          onSearchPeople={setPeopleFilters} 
          onSearchStops={setStopFilters} />
        </aside>

        <section className="flex-1 h-[400px] md:h-auto">
          <Map 
          peopleFilters={peopleFilters} 
          stopFilters={stopFilters} />
        </section>
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
  );
}

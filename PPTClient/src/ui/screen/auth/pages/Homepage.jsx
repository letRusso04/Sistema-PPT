import React from "react";
import Organism_Home from "../Organism/Organism_Home";
import Molecules_Navbar from "../Molecules/Molecules_Navbar";
import Templates_Home from "../templates/Templates_Home";
function Homepage() {
  return (
    <Templates_Home>
      <Molecules_Navbar />
      <Organism_Home />
    </Templates_Home>
  );
}

export default Homepage;

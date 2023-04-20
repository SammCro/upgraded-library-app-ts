import React from "react";
import { ExploreTopBooks } from "../Components/ExploreTopBooks";
import { Carousel } from "../Components/Carousel";
import { Heros } from "../Components/Heros";
import { LibraryServices } from "../Components/LibraryServices";

export const HomePage = () => {
  return (
    <>
      <ExploreTopBooks></ExploreTopBooks>
      <Carousel></Carousel>
      <Heros></Heros>
      <LibraryServices></LibraryServices>
    </>
  );
};

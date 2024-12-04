import React, { useEffect, useState } from "react";
import Header from "../../components/headers/Header";
import PropertyCard from "../../components/cards/PropertyCard";
import HorizontalCard from "../../components/cards/HorizontalCard";
import { getAllPublications } from "../../services/api";

function Home() {
  const [publications, setPublications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const fetchedPublications = await getAllPublications();
        setPublications(fetchedPublications);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchPublications();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-background-color w-full h-screen flex justify-center items-center">
        <p>Loading publications...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-background-color w-full h-screen flex justify-center items-center">
        <p>Error fetching publications: {error.message}</p>
      </div>
    );
  }

  // Separate publications into featured (today's picks) and all publications
  const featuredPublications = publications.slice(0, 5);
  const allPublications = publications;

  return (
    <div className="bg-background-color w-full h-screen p-5">
      <Header />
      <div className="lg:p-4 p-0 flex flex-col justify-center items-center w-full mt-12">
        <div className="flex justify-between mt-12 w-full lg:w-3/4">
          <h2 className="font-bold text-lg text-text-color">Today's picks</h2>
          <p className="font-light text-primary-color cursor-pointer hover:underline">See more</p>
        </div>
        <div className="flex flex-wrap gap-6 overflow-x-scroll w-full lg:w-3/4 mt-7 rounded-lg">
          <div className="flex flex-row flex-nowrap gap-6">
            {featuredPublications.map((publication) => (
              <PropertyCard 
                key={publication._id}
                publication={publication}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-between mt-14 w-full lg:w-3/4">
          <h2 className="font-bold text-lg text-text-color">All</h2>
          <p className="font-light text-primary-color cursor-pointer hover:underline">See more</p>
        </div>
        <div className="w-full lg:w-3/4 mt-7">
          {allPublications.map((publication) => (
            <HorizontalCard 
              key={publication._id}
              publication={publication}
            />
          ))}
        </div>
      </div>
    </div> 
  );
}

export default Home;
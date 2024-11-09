import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../components/headers/Header";
import PropertyCard from "../../components/cards/PropertyCard";
import HorizontalCard from "../../components/cards/HorizontalCard";

function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3000/api/auth/user", { withCredentials: true })
  //     .then((response) => {
  //       setUser(response.data);
  //     })
  //     .catch(() => {
  //       navigate("/"); // Si no está autenticado, redirige al inicio
  //     });
  // }, [navigate]);

  // const handleLogout = () => {
  //   axios
  //     .get("http://localhost:3000/api/auth/logout", { withCredentials: true })
  //     .then(() => {
  //       navigate("/");
  //     });
  // };

  return (
    <div className="bg-background-color w-full h-screen p-5">
      < Header />
      <div className="lg:p-4 p-0 flex flex-col justify-center items-center w-full mt-12">
        <div className="flex justify-between mt-12 w-full lg:w-3/4">
          <h2 className="font-bold text-lg text-text-color">Today's picks</h2>
          <p className="font-light text-primary-color cursor-pointer hover:underline">See more</p>
        </div>
        <div className="flex flex-wrap gap-6 overflow-x-scroll w-full lg:w-3/4 mt-7 rounded-lg">
          <div className="flex flex-row flex-nowrap gap-6">
            < PropertyCard />
            < PropertyCard />
            < PropertyCard />
            < PropertyCard />
            < PropertyCard />
          </div>
        </div>
        <div className="flex justify-between mt-14 w-full lg:w-3/4">
          <h2 className="font-bold text-lg text-text-color">All</h2>
          <p className="font-light text-primary-color cursor-pointer hover:underline">See more</p>
        </div>
        <div className="w-full lg:w-3/4 mt-7">
          < HorizontalCard />
          < HorizontalCard />
          < HorizontalCard />
          < HorizontalCard />
          < HorizontalCard />
        </div>
      </div>
    </div> 
  );
}

export default Home;

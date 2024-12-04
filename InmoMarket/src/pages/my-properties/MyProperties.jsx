import React, { useEffect, useState } from "react";
import { getUserPublications } from "../../services/api";
import PropertyCard from "../../components/cards/PropertyCard";
import GoBackButton from "../../components/buttons/GoBackButton";
import { useAuth } from "../../contexts/AuthContext"; 

function MyPublications() {
  const { user, isLoading: authLoading } = useAuth(); // Obtén el usuario autenticado
  const [publications, setPublications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserPublications = async () => {
      if (authLoading) return; // Espera a que la autenticación termine
      if (!user || !user.id) {
        setError(new Error("User not authenticated"));
        setIsLoading(false);
        return;
      }

      try {
        const fetchedPublications = await getUserPublications(user.id); // Usa el ID del usuario autenticado
        setPublications(fetchedPublications);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserPublications();
  }, [user, authLoading]);

  if (authLoading || isLoading) {
    return (
      <div className="bg-background-color w-full h-screen flex justify-center items-center">
        <div className="absolute top-8 left-8 z-10">
          <GoBackButton />
        </div>
        <p>Loading publications...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-background-color w-full h-screen flex justify-center items-center">
        <div className="absolute top-8 left-8 z-10">
          <GoBackButton />
        </div>
        <p>Error fetching publications: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="bg-background-color w-full min-h-screen p-5">
      <div className="absolute top-8 left-8 z-10">
        <GoBackButton />
      </div>
      <div className="lg:p-4 p-0 flex flex-col justify-center items-center w-full mt-12">
        <div className="flex justify-between mt-12 w-full lg:w-3/4">
          <h2 className="font-bold text-lg text-text-color">My Publications</h2>
        </div>

        {publications.length > 0 ? (
          <div className="w-full lg:w-3/4 mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publications.map((publication) => (
              <PropertyCard key={publication._id} publication={publication} />
            ))}
          </div>
        ) : (
          <div className="w-full lg:w-3/4 mt-7 text-center text-gray-500">
            You haven't made any publications yet.
          </div>
        )}
      </div>
    </div>
  );
}

export default MyPublications;

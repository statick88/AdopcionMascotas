// App.jsx
import { useState, useEffect } from 'react';
import AdoptionForm from './components/AdoptionForm';
import AdoptionList from './components/AdoptionList';
import AvailableList from './components/AvailableList';
import AddDogForm from './components/AddDogForm';
import AddAdopterForm from './components/AddAdopterForm';

const App = () => {
  const [dogs, setDogs] = useState([]);
  const [adopters, setAdopters] = useState([]);
  const [adoptions, setAdoptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dogsResponse = await fetch('http://localhost:3001/dogs');
        const dogsData = await dogsResponse.json();
        setDogs(dogsData);

        const adoptersResponse = await fetch('http://localhost:3001/adopters');
        const adoptersData = await adoptersResponse.json();
        setAdopters(adoptersData);

        const adoptionsResponse = await fetch('http://localhost:3001/adoptions');
        const adoptionsData = await adoptionsResponse.json();
        console.log('Adopciones:', adoptionsData);
        setAdoptions(adoptionsData);
      } catch (error) {
        console.error('Error al cargar datos:', error.message);
      }
    };

    fetchData();
  }, []);

  const handleAdoptionSubmit = async (dogId, adopterId) => {
    try {
      const response = await fetch('http://localhost:3001/adoptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dogId,
          adopterId,
        }),
      });

      if (response.ok) {
        const newAdoption = await response.json();
        setAdoptions((prevAdoptions) => [...prevAdoptions, newAdoption]);

        // Mostrar una alerta con los datos de la nueva adopción
        alert(`¡Adopción realizada con éxito!\nID: ${newAdoption.id}\nPerro: ${newAdoption.dogId}\nAdoptante: ${newAdoption.adopterId}`);
      } else {
        throw new Error('Error al enviar la solicitud de adopción.');
      }
    } catch (error) {
      console.error('Error en la solicitud de adopción:', error.message);
      throw error;
    }
  };

  const handleDogSubmit = async (dogName, dogBreed) => {
    try {
      const response = await fetch('http://localhost:3001/dogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: dogName,
          breed: dogBreed
        }),
      });

      if (response.ok) {
        const newDog = await response.json();
        setDogs((prevDogs) => [...prevDogs, newDog]);
        alert(`¡Nuevo perro agregado con éxito!\nID: ${newDog.id}\nNombre: ${newDog.name}\nRaza: ${newDog.breed}`);
      } else {
        throw new Error('Error al enviar la solicitud de nuevo Perrito');
      }
    } catch (error) {
      console.log('Error en la solicitud de nuevo perrito:', error.message);
      throw error;
    }
  };

  const handleAdopterSubmit = async (adopterName, adopterAddress, province, city, district, neighborhood) => {
      try {
        const response = await fetch('http://localhost:3001/adopters', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            name: adopterName, 
            address: adopterAddress,
            province,
            city,
            district,
            neighborhood
          }),
        });

        if (response.ok) {
          const newAdopter = await response.json();

          // Imprime newAdopter para ver qué propiedades tiene
          console.log(newAdopter);

          if (!newAdopter.id || !newAdopter.name || !newAdopter.address) {
            throw new Error('El nuevo adoptante no tiene ID o nombre o dirección');
          }

          setAdopters((prevAdopters) => [...prevAdopters, newAdopter]);

          // Mostrar una alerta con los datos del nuevo adoptante
          alert(`¡Nuevo adoptante creado con éxito!\nID: ${newAdopter.id}\nNombre: ${newAdopter.name}\nDirección: ${newAdopter.address}\nProvincia: ${newAdopter.province}\nCiudad: ${newAdopter.city}\nDistrito: ${newAdopter.district}\nBarrio: ${newAdopter.neighborhood}`);
        } else {
          throw new Error('Error al crear el nuevo adoptante');
        }
      } catch (error) {
        console.error('Error en la solicitud de nuevo adoptante:', error.message);
        throw error;
      }
    };

  return (
    <div className="App">
      <h1>Lista de Adopciones</h1>
      <AdoptionList adoptions={adoptions} dogs={dogs} adopters={adopters} />
      <h1>Disponibles para adopción</h1>
      <AvailableList dogs={dogs} adopters={adopters} />
      <h1>Nuevo perro</h1>
      <AddDogForm dogs={dogs} onDogSubmit={handleDogSubmit} />
      <h1>Nuevo adoptante</h1>
      <AddAdopterForm adopters={adopters} onAdopterSubmit={handleAdopterSubmit} />
      <h1>Nueva Adopción</h1>
      <AdoptionForm dogs={dogs} adopters={adopters} onAdoptionSubmit={handleAdoptionSubmit} />
    </div>
  );
};

export default App;

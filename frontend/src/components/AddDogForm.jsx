// AddDogForm.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';

const dogBreeds = [
    'Mestizo',
    'Labrador',
    'Golden Retriever',
    'Pug',
    'Bulldog',
    'Chihuahua',
    'Beagle',
    'Pastor Alemán',
    'Poodle',
    'Rottweiler',
    'Boxer',
    'Yorkshire Terrier',
    'Dachshund',
    'Bulldog Francés',
    'Border Collie',
    'Schnauzer',
    'Husky Siberiano',
    'Shih Tzu',
    'Doberman',
    'Basset Hound',
    'Bichón Frisé',
    'Gran Danés',
    'Pomerania',
    'Cocker Spaniel',
    'Chow Chow',
    'Bull Terrier',
    'Pitbull',
    'Dogo Argentino',
    'San Bernardo',
    'Dogo de Burdeos',
    'Akita Inu',
];

const AddDogForm = ({ onDogSubmit }) => {
    const [dogName, setDogName] = useState('');
    const [dogBreed, setDogBreed] = useState(dogBreeds[0]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (dogName && dogBreed) {
            onDogSubmit(dogName, dogBreed);
            setDogName('');
            setDogBreed('');
        } else {
            console.error('Debe ingresar un nombre y una raza para el perro.');
        }
    };

    return (
        <div className='card'>

            <form onSubmit={handleSubmit}>
                <label>
                    Nombre del perro:
                    <input type="text" value={dogName} onChange={(e) => setDogName(e.target.value)} />
                </label>
                <label>
                    Raza del perro:
                    <select value={dogBreed} onChange={(event) => setDogBreed(event.target.value)} required>
                        {dogBreeds.map((breed) => (
                            <option key={breed} value={breed}>
                                {breed}
                            </option>
                        ))}
                    </select>
                </label>
                <button type="submit">Agregar perro</button>
            </form>
        </div>
    );
};

export default AddDogForm;

AddDogForm.propTypes = {
    onDogSubmit: PropTypes.func.isRequired,
};
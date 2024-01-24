// AddDogForm.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';

const AddDogForm = ({ onDogSubmit }) => {
    const [dogName, setDogName] = useState('');
    const [dogBreed, setDogBreed] = useState('');

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
        <form onSubmit={handleSubmit}>
            <label>
                Nombre del perro:
                <input type="text" value={dogName} onChange={(e) => setDogName(e.target.value)} />
            </label>
            <label>
                Raza del perro:
                <input type="text" value={dogBreed} onChange={(e) => setDogBreed(e.target.value)} />
            </label>
            <button type="submit">Agregar perro</button>
        </form>
    );
};

export default AddDogForm;

AddDogForm.propTypes = {
    onDogSubmit: PropTypes.func.isRequired,
};
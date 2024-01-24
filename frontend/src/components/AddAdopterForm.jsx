// AddAdopterForm.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';

const AddAdopterForm = ({ onAdopterSubmit }) => {
    const [adopterName, setAdopterName] = useState('');
    const [adopterAddress, setAdopterAddress] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (adopterName && adopterAddress) {
            onAdopterSubmit(adopterName, adopterAddress);
            setAdopterName('');
            setAdopterAddress('');
        } else {
            console.error('Debe ingresar un nombre y una dirección para el adoptante.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Nombre:
                <input type="text" value={adopterName} onChange={(e) => setAdopterName(e.target.value)} required />
            </label>
            <label>
                Dirección:
                <input type="text" value={adopterAddress} onChange={(e) => setAdopterAddress(e.target.value)} required />
            </label>
            <button type="submit">Agregar adoptante</button>
        </form>
    );
};

AddAdopterForm.propTypes = {
    onAdopterSubmit: PropTypes.func.isRequired,
};

export default AddAdopterForm;
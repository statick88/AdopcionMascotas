// AddAdopterForm.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';


const provinces = {
    'Loja': {
        'Loja': {
            'Sucre': ['La Aborada'],
            'San Sebastian': ['San Sebastian']
        }
    },

    'Pinchincha': {
        'Quito': {
            'Cumbaya': ['Cumbaya']
        }
    }
};
const AddAdopterForm = ({ onAdopterSubmit }) => {
    const [adopterName, setAdopterName] = useState('');
    const [adopterAddress, setAdopterAddress] = useState('');
    const [province, setProvince] = useState('');
    const [city, setCity] = useState(''); // Cambiado de 'canton' a 'city'
    const [district, setDistrict] = useState(''); // Cambiado de 'parish' a 'district'
    const [neighborhood, setNeighborhood] = useState('');

    const handleProvinceChange = (event) => {
        setProvince(event.target.value);
        setCity('');
        setDistrict('');
        setNeighborhood('');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (adopterName && adopterAddress && province && city && district && neighborhood) {
            onAdopterSubmit(adopterName, adopterAddress, province, city, district, neighborhood);
            setAdopterName('');
            setAdopterAddress('');
            setProvince('');
            setCity('');
            setDistrict('');
            setNeighborhood('');
        } else {
            console.error('Debe ingresar todos los campos.');
        }
    };

    return (
        <div className='card'>

            <form onSubmit={handleSubmit}>
                <label>
                    Nombre:
                    <input type="text" value={adopterName} onChange={(e) => setAdopterName(e.target.value)} required />
                </label>
                <label>
                    Provincia:
                    <select value={province} onChange={handleProvinceChange} required>
                        <option value="">Seleccione una provincia</option>
                        {Object.keys(provinces).map((province) => (
                            <option key={province} value={province}>
                                {province}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Ciudad:
                    <select value={city} onChange={(e) => setCity(e.target.value)} required>
                        <option value="">Seleccione una ciudad</option>
                        {province &&
                            Object.keys(provinces[province]).map((city) => (
                                <option key={city} value={city}>
                                    {city}
                                </option>
                            ))}
                    </select>
                </label>
                <label>
                    Distrito:
                    <select value={district} onChange={(e) => setDistrict(e.target.value)} required>
                        <option value="">Seleccione un distrito</option>
                        {city &&
                            Object.keys(provinces[province][city]).map((district) => (
                                <option key={district} value={district}>
                                    {district}
                                </option>
                            ))}
                    </select>
                </label>
                <label>
                    Barrio:
                    <select value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} required>
                        <option value="">Seleccione un barrio</option>
                        {district &&
                            provinces[province][city][district].map((neighborhood) => (
                                <option key={neighborhood} value={neighborhood}>
                                    {neighborhood}
                                </option>
                            ))}
                    </select>
                </label>
                <label>
                    Dirección:
                    <input type="text" value={adopterAddress} onChange={(e) => setAdopterAddress(e.target.value)} required />
                </label>
                <input type="submit" value="Agregar Adoptante" />
            </form>
        </div>
    );
};

AddAdopterForm.propTypes = {
    onAdopterSubmit: PropTypes.func.isRequired,
};

export default AddAdopterForm;
// backend/server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3001;

// Middleware para manejar CORS
const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173', 'http://example.com'];

app.use(cors({
        origin: function(origin, callback){
            // allow requests with no origin 
            // (like mobile apps or curl requests)
            if(!origin) return callback(null, true);
            if(allowedOrigins.indexOf(origin) === -1){
                var msg = 'The CORS policy for this site does not ' +
                                    'allow access from the specified Origin.';
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        }
}));

app.use(express.json());

// Rutas
const databasePath = path.resolve(__dirname, '../database');

// Inicializar archivos de datos si no existen
const initializeDataFile = (fileName) => {
    const filePath = path.join(databasePath, `${fileName}.js`);
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, `module.exports = [];`);
    }
};

initializeDataFile('dogs');
initializeDataFile('adopters');
initializeDataFile('adoptions');

// Cargar datos al inicio del servidor
let dogsData = require('../database/dogs');
let adoptersData = require('../database/adopters');
let adoptionsData = require('../database/adoptions');

app.get('/dogs', (req, res) => {
    try {
        res.json(dogsData);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
});

app.post('/dogs', (req, res) => {
    try {
        const { name, breed } = req.body;
        if (!name || !breed) {
            return res.status(400).json({ error: 'El nombre y la raza del perro son requeridos' });
        }
        const newDog = {
            id: dogsData.length + 1,
            name,
            breed,
        };
        dogsData.push(newDog);
        fs.writeFileSync(path.join(databasePath, 'dogs.js'), `module.exports = ${JSON.stringify(dogsData, null, 2)};`);

        res.status(201).json(newDog);
    }
    catch (error) {
        console.error('Error en POST /dogs:', error.message);
        res.status(500).json({ error: error.message });
    }
});

app.get('/adopters', (req, res) => {
    try {
        res.json(adoptersData);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
});

app.post('/adopters', (req, res) => {
    try {
        const newAdopter = {
            id: adoptersData.length + 1,
            name: req.body.name,
            address: req.body.address,
            province: req.body.province,
            city: req.body.city,
            district: req.body.district,
            neighborhood: req.body.neighborhood,
        };

        console.log('Nuevo adoptante:', newAdopter);

        adoptersData.push(newAdopter);
        fs.writeFileSync(path.join(databasePath, 'adopters.js'), `module.exports = ${JSON.stringify(adoptersData, null, 2)};`);

        res.json(newAdopter);
    } catch (error) {
        console.error('Error en POST /adopters:', error.message);
        res.status(500).json({ error: error.message });
    }
});

app.get('/adoptions', (req, res) => {
    try {
        res.json(adoptionsData);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
});

app.post('/adoptions', (req, res) => {
    try {
        const newAdoption = {
            id: adoptionsData.length + 1,
            dogId: req.body.dogId,
            adopterId: req.body.adopterId,
            dogname: req.body.dogname,
            adoptername: req.body.adoptername,
        };

        console.log('Nueva adopcion:', newAdoption);

        adoptionsData.push(newAdoption);
        fs.writeFileSync(path.join(databasePath, 'adoptions.js'), `module.exports = ${JSON.stringify(adoptionsData, null, 2)};`);

        res.json(newAdoption);
    } catch (error) {
        console.error('Error en POST /adoptions:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor backend en ejecución en http://localhost:${PORT}`);
});

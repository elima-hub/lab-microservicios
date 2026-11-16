import express from 'express';

const PORT = process.env.PORT ?? 5000;

const estudiantes = [
    {id: 1, nombre: 'Alex', carrera: 'Arquitectura'},
    {id: 2, nombre: 'Carla', carrera: 'Medicina'},
    {id: 3, nombre: 'Roberto', carrera: 'Negocios Internacionales'},
    {id: 4, nombre: 'Eddy', carrera: 'Ingeniería en computación'}
];

const app = express();

app.get('/', (_req, res) => res.json({ servicio: 'estudiantes', estado: 'ok'}));

app.get('/estudiantes', (_req, res) => res.json(estudiantes));

app.listen(PORT, () => console.log(`Servicio estudiantes escuchando el puerto ${PORT}`));
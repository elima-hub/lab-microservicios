import express from 'express';

const PORT = process.env.PORT ?? 4000;
const CURSOS_URL = process.env.CURSOS_URL ?? 'http://localhost:3000';
const ESTUDIANTES_URL = process.env.ESTUDIANTES_URL ?? 'http://localhost:5000';

const app = express();

app.get('/', (_req, res) => res.json({ servicio: 'reportes', estado: 'ok' }));

app.get('/resumen', async (_req, res) => {
  try {
    const [resCursos, resEstudiantes] = await Promise.all([
      fetch(`${CURSOS_URL}/cursos`),
      fetch(`${ESTUDIANTES_URL}/estudiantes`),
    ]);
    const cursos = await resCursos.json();
    const estudiantes = await resEstudiantes.json();
    const totalCreditos = cursos.reduce((suma, c) => suma + c.creditos, 0);
    res.json({
      totalCursos: cursos.length,
      totalCreditos,
      totalEstudiantes: estudiantes.length,
      generado: new Date().toISOString(),
    });
  } catch {
    res.status(503).json({ error: 'Problema con el servicio' });
  }
});

app.listen(PORT, () => console.log(`Servicio reportes escuchando en el puerto ${PORT}`));

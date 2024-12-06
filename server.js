const express = require("express");
const app = express();
const port = process.env.PORT || 3000; // Render asigna el puerto automáticamente

// Middleware para procesar JSON
app.use(express.json());

// Rutas
app.get("/", (req, res) => {
    res.send("¡Bienvenido a mi backend en Render!");
});

// Ruta para guardar texto asociado a un día
app.post("/save-text", (req, res) => {
    const { date, text } = req.body;
    if (!date || !text) {
        return res.status(400).json({ error: "Fecha y texto son requeridos" });
    }
    res.status(200).json({ message: "Texto guardado correctamente", data: { date, text } });
});

// Servidor en escucha
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

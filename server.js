const express = require("express");
const pool = require("./db"); // Importa el pool para conectarte a PostgreSQL
const app = express();
const port = process.env.PORT || 3000; // Render asigna el puerto automáticamente

// Middleware para procesar JSON
app.use(express.json());

// Ruta de inicio
app.get("/", (req, res) => {
    res.send("¡Bienvenido a mi backend en Render!");
});

// Ruta para guardar texto asociado a un día
app.post("/save-text", async (req, res) => {
    const { date, text } = req.body;

    // Verificar que se haya enviado la fecha y el texto
    if (!date || !text) {
        return res.status(400).json({ error: "Fecha y texto son requeridos" });
    }

    try {
        // Realizar la inserción en la base de datos
        const query = "INSERT INTO texts (date, text) VALUES ($1, $2) RETURNING *";
        const values = [date, text];
        const result = await pool.query(query, values); // Ejecutar la consulta
        // Devolver una respuesta con los datos guardados
        res.status(200).json({
            message: "Texto guardado correctamente",
            data: result.rows[0], // El primer registro insertado
        });
    } catch (error) {
        console.error("Error al guardar el texto:", error);
        res.status(500).json({ error: "Error al guardar el texto" });
    }
});

// Servidor en escucha
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

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
// Ruta para guardar el nombre asociado a una fecha y hora
app.post("/save-text", async (req, res) => {
    const { date, hora, text } = req.body;

    // Verificar que se haya enviado la fecha, la hora y el nombre
    if (!date || !hora || !text) {
        return res.status(400).json({ error: "Fecha, hora y nombre son requeridos" });
    }

    try {
        // Realizar la inserción en la base de datos
        const query = "INSERT INTO texts (date, hora, text) VALUES ($1, $2, $3) RETURNING *";
        const values = [date, hora, text];
        const result = await pool.query(query, values); // Ejecutar la consulta

        // Devolver una respuesta con los datos guardados
        res.status(200).json({
            message: "Nombre registrado correctamente",
            data: result.rows[0], // El primer registro insertado
        });
    } catch (error) {
        console.error("Error al guardar el nombre:", error);
        res.status(500).json({ error: "Error al guardar el nombre" });
    }
});

// Servidor en escucha
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

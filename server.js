import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;
const usersFile = path.join(__dirname, 'data', 'users.json');

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

async function loadUsers() {
    const data = await fs.readFile(usersFile, 'utf-8');
    return JSON.parse(data);
}

app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body ?? {};

        if (!username || !password) {
            return res.status(400).json({ message: 'BENUTZERNAME UND PASSWORT BENÖTIGT.' });
        }

        const users = await loadUsers();
        const match = users.find((user) => user.username === username && user.password === password);

        if (!match) {
            return res.status(401).json({ message: 'FALSCHE LOGIN-DATEN.' });
        }

        return res.json({ message: `WILLKOMMEN ZURÜCK, ${match.username.toUpperCase()}!` });
    } catch (error) {
        console.error('Login-Fehler:', error);
        return res.status(500).json({ message: 'INTERNER SERVERFEHLER.' });
    }
});

app.use((req, res, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/api/')) {
        return res.sendFile(path.join(__dirname, 'index.html'));
    }
    return next();
});

app.listen(port, () => {
    console.log(`Redevix Login läuft unter http://localhost:${port}`);
});

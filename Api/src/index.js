import 'dotenv/config';

import controle from'./controller/usuarioController.js';

import express from 'express';
import cors from 'cors';

const server = express();
server.use(cors());
server.use(express.json());


server.use(controle);


server.listen(process.env.PORT, () => console.log(`API ESTA ONLINE NA PORTA ${process.env.PORT} `));
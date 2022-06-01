import 'dotenv/config';

import controle from'./controller/usuarioController.js';
import filme from './controller/filmeController.js';

import express from 'express';
import cors from 'cors';

const server = express();
server.use(cors());
server.use(express.json());

server.use('/storage/capaFilme', express.static('storege/'));


server.use(controle);
server.use(filme);


server.listen(process.env.PORT, () => console.log(`API ESTA ONLINE NA PORTA ${process.env.PORT} `));
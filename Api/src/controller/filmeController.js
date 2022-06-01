import { inserirFilmes,alterarImagem,removerFilme } from '../repository/filmeRepository.js'

import multer from 'multer';
import { Router } from 'express'
const server = Router();
const upload = multer({dest:'storege/capaFilme'});

server.post('/filme', async (req,resp)=>{
    try{
    const filme = req.body;
    const resposta = await inserirFilmes(filme);
    resp.send({x:resposta})
    }
    catch(err){
        console.log(err);
        resp.status(404).send({
            problema:"ocorreu um erro"
        })
    }
})

server.put('/filme/:id/imagem', upload.single('capa'), async (req,resp) =>{
    try{
        let { id } = req.params;
        let imagem = req.file.path;

        let resposta = await alterarImagem(imagem,id);
        if(resposta =! 1)
            throw new Error('A imagem não pode ser salva');
        
        resp.status(204).send();
    
    }
    catch(err){
        resp.status(400).send({
            problema:err.message
        })
    }

})

server.delete('/filme/:id', async (req,resp)=>{
    try{
        let { id } = req.params;
        let resposta= await removerFilme(id);
        if(resposta =! 1)
            throw new Error('Filme não pode ser removido');
        
    resp.status(204).send();
    }
    catch(err){
        resp.status(404).send({
            problema: err.message
        })
    }
})



export default server;
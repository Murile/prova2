import { inserirFilmes,alterarImagem,removerFilme,listarTodosFilmes,buscarPorId,buscarPorNome,alterarFilme } from '../repository/filmeRepository.js'

import multer from 'multer';
import { Router } from 'express'
const server = Router();
const upload = multer({dest:'storege/capaFilme'});

server.post('/filme', async (req,resp) => {
    try {
            const filmeParaInsereir= req.body;

            if(!filmeParaInsereir.nome) throw new Error ('Nome do filme é OBRIGATÓRIO!')
            if(!filmeParaInsereir.sinopse) throw new Error ('Sinopse do filme é OBRIGATÓRIO!')
            if(filmeParaInsereir.avaliacao == undefined || filmeParaInsereir.avaliacao < 0) throw new Error ('Avaliacao do filme é OBRIGATÓRIO!')
            if(!filmeParaInsereir.lancamento) throw new Error ('Lançamento do filme é OBRIGATÓRIO!')
            if(!filmeParaInsereir.disponivel) throw new Error ('A disponibilidade do filme é OBRIGATÓRIO!')
            if(!filmeParaInsereir.usuario) throw new Error ('Usuário não logado!')
            const filme = await inserirFilmes (filmeParaInsereir);

            resp.send(filme)

    } catch (err) {
        resp.status(400).send({
            erro:err.message
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


server.get('/filme', async (req,resp) =>{
    try {
        
        const resposta = await listarTodosFilmes();
        resp.send(resposta);

    } catch (err) {
        resp.status(400).send({
            erro:err.message
        })
    }
})

server.get('/filme/:id', async (req,resp) =>{
    try {
        const {id} = req.params;
        const resposta = await buscarPorId(id);

        if(!resposta)
            throw new Error("Filme não encontrado!")

        resp.send(resposta);

    } catch (err) {
        resp.status(400).send({
            erro:err.message
        })
    }
})

server.get('/filme/busca', async (req,resp) =>{
    try {
        const {nome} = req.params;
        const resposta = await buscarPorNome(nome);

        if(!resposta)
            throw new Error("Filme não encontrado!")

        resp.send(resposta);

    } catch (err) {
        resp.status(400).send({
            erro:err.message
        })
    }
})

server.put('/filme/:id', async (req,resp) => {
    try{
       const {id} = req.params;
       const filme = req.body;
       if(!filme.nome) throw new Error ('Nome do filme é OBRIGATÓRIO!')
       if(!filme.sinopse) throw new Error ('Sinopse do filme é OBRIGATÓRIO!')
       if(filme.avaliacao == undefined || filme.avaliacao < 0) throw new Error ('Avaliacao do filme é OBRIGATÓRIO!')
       if(!filme.lancamento) throw new Error ('Lançamento do filme é OBRIGATÓRIO!')
       if(filme.disponivel == undefined) throw new Error ('A disponibilidade do filme é OBRIGATÓRIO!')
       if(!filme.usuario) throw new Error ('Usuário não logado!')

       const resposta = await alterarFilme(id, filme);
       if(resposta != 1)
           throw new Error ("Filme não pode ser alterado!")
       
       else
       resp.status(204).send();

     } catch (err) {
       resp.status(400).send({
           erro:err.message
       })
   }
})

export default server;
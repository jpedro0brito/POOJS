import {HttpService} from './HttpService';
import {Negociacao} from '../models/Negociacao';
import {ConnectionFactory} from './ConnectionFactory';
import {NegociacaoDao} from '../dao/NegociacaoDao';

export class NegociacaoService{
    constructor(){
        this._http = new HttpService();
    }

    obterNegociacoes(){
        return Promise.all([
            this.obterNegociacaoDaSemana(),
            this.obterNegociacaoDaSemanaAnterior(),
            this.obterNegociacaoDaSemanaRetrasada()
        ]).then(negociacoes =>
            negociacoes.reduce((novoArray, array) => novoArray.concat(array), [])
        ).catch(erro => {
            throw new Error(erro)
        });
    }

    obterNegociacaoDaSemana(){
        return new Promise((resolve, reject) => {
            this._http.get('negociacoes/semana')
            .then(negociacoes =>
                resolve(negociacoes.map(obj => 
                    new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)))
            ).catch(erro => {
                console.log(erro);
                reject('Não foi possivel obter as negociações');
            });
        });
    }

    obterNegociacaoDaSemanaAnterior(){
        return new Promise((resolve, reject) => {
            this._http.get('negociacoes/anterior')
            .then(negociacoes =>
                resolve(negociacoes.map(obj => 
                    new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)))
            ).catch(erro => {
                console.log(erro);
                reject('Não foi possivel obter as negociações anteriores');
            });
        });
    }

    obterNegociacaoDaSemanaRetrasada(){
        return new Promise((resolve, reject) => {
            this._http.get('negociacoes/retrasada')
            .then(negociacoes =>
                resolve(negociacoes.map(obj => 
                    new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)))
            ).catch(erro => {
                console.log(erro);
                reject('Não foi possivel obter as negociações retrasadas');
            });
        });
    }

    cadastra(negociacao){
        return ConnectionFactory
                    .getConnection()
                    .then(connection => new NegociacaoDao(connection))
                    .then(dao => dao.adiciona(negociacao))
                    .then(() => 'Negociação adicionada com sucesso')
                    .catch(erro => {
                        console.log(erro);
                        throw new Error('Não foi possivel adicionar a negociação')
                    });
    }

    lista(){
        return ConnectionFactory
                    .getConnection()
                    .then(connection => new NegociacaoDao(connection))
                    .then(dao => dao.listaTodos())
                    .catch(erro => {
                        console.log(erro);
                        throw new Error('Não foi possivel carregar a lista de negociações');
                    });
    }

    apaga(){
        return ConnectionFactory
                    .getConnection()
                    .then(connection => new NegociacaoDao(connection))
                    .then(dao => dao.apagarTodos())
                    .then(() => 'Lista de Negociações apagadas com sucesso')
                    .catch(erro => {
                        console.log(erro);
                        throw new Error('Não foi possivel apagar a lista de negociações');
                    });
    }

    importa(listaAtual){
        return this.obterNegociacoes()
                    .then(negociacoes => 
                        negociacoes.filter(negociacao => 
                            !listaAtual.some(negociacaoExistente =>
                                JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente))))
                    .catch(erro => {
                        console.log(erro);
                        throw new Error('Não foi possivel buscar a lista de negociações importadas');
                    });
    }

    isEquals(outraNegociacao){
        return JSON.stringify(this) == JSON.stringify(outraNegociacao);
    }
}

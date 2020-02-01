class NegociacaoService{
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
}

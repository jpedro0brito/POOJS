'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoService = function () {
    function NegociacaoService() {
        _classCallCheck(this, NegociacaoService);

        this._http = new HttpService();
    }

    _createClass(NegociacaoService, [{
        key: 'obterNegociacoes',
        value: function obterNegociacoes() {
            return Promise.all([this.obterNegociacaoDaSemana(), this.obterNegociacaoDaSemanaAnterior(), this.obterNegociacaoDaSemanaRetrasada()]).then(function (negociacoes) {
                return negociacoes.reduce(function (novoArray, array) {
                    return novoArray.concat(array);
                }, []);
            }).catch(function (erro) {
                throw new Error(erro);
            });
        }
    }, {
        key: 'obterNegociacaoDaSemana',
        value: function obterNegociacaoDaSemana() {
            var _this = this;

            return new Promise(function (resolve, reject) {
                _this._http.get('negociacoes/semana').then(function (negociacoes) {
                    return resolve(negociacoes.map(function (obj) {
                        return new Negociacao(new Date(obj.data), obj.quantidade, obj.valor);
                    }));
                }).catch(function (erro) {
                    console.log(erro);
                    reject('Não foi possivel obter as negociações');
                });
            });
        }
    }, {
        key: 'obterNegociacaoDaSemanaAnterior',
        value: function obterNegociacaoDaSemanaAnterior() {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                _this2._http.get('negociacoes/anterior').then(function (negociacoes) {
                    return resolve(negociacoes.map(function (obj) {
                        return new Negociacao(new Date(obj.data), obj.quantidade, obj.valor);
                    }));
                }).catch(function (erro) {
                    console.log(erro);
                    reject('Não foi possivel obter as negociações anteriores');
                });
            });
        }
    }, {
        key: 'obterNegociacaoDaSemanaRetrasada',
        value: function obterNegociacaoDaSemanaRetrasada() {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                _this3._http.get('negociacoes/retrasada').then(function (negociacoes) {
                    return resolve(negociacoes.map(function (obj) {
                        return new Negociacao(new Date(obj.data), obj.quantidade, obj.valor);
                    }));
                }).catch(function (erro) {
                    console.log(erro);
                    reject('Não foi possivel obter as negociações retrasadas');
                });
            });
        }
    }, {
        key: 'cadastra',
        value: function cadastra(negociacao) {
            return ConnectionFactory.getConnection().then(function (connection) {
                return new NegociacaoDao(connection);
            }).then(function (dao) {
                return dao.adiciona(negociacao);
            }).then(function () {
                return 'Negociação adicionada com sucesso';
            }).catch(function (erro) {
                console.log(erro);
                throw new Error('Não foi possivel adicionar a negociação');
            });
        }
    }, {
        key: 'lista',
        value: function lista() {
            return ConnectionFactory.getConnection().then(function (connection) {
                return new NegociacaoDao(connection);
            }).then(function (dao) {
                return dao.listaTodos();
            }).catch(function (erro) {
                console.log(erro);
                throw new Error('Não foi possivel carregar a lista de negociações');
            });
        }
    }, {
        key: 'apaga',
        value: function apaga() {
            return ConnectionFactory.getConnection().then(function (connection) {
                return new NegociacaoDao(connection);
            }).then(function (dao) {
                return dao.apagarTodos();
            }).then(function () {
                return 'Lista de Negociações apagadas com sucesso';
            }).catch(function (erro) {
                console.log(erro);
                throw new Error('Não foi possivel apagar a lista de negociações');
            });
        }
    }, {
        key: 'importa',
        value: function importa(listaAtual) {
            return this.obterNegociacoes().then(function (negociacoes) {
                return negociacoes.filter(function (negociacao) {
                    return !listaAtual.some(function (negociacaoExistente) {
                        return negociacao.equal(negociacaoExistente);
                    });
                });
            }).catch(function (erro) {
                console.log(erro);
                throw new Error('Não foi possivel buscar a lista de negociações importadas');
            });
        }
    }, {
        key: 'equal',
        value: function equal(negociacaoExtena) {
            return JSON.stringify(this) == JSON.stringify(negociacaoExtena);
        }
    }]);

    return NegociacaoService;
}();
//# sourceMappingURL=NegociacaoService.js.map
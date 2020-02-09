/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Negociacao = exports.Negociacao = function () {
    function Negociacao(data, quantidade, valor) {
        _classCallCheck(this, Negociacao);

        this._data = new Date(data.getTime());
        this._quantidade = quantidade;
        this._valor = valor;

        Object.freeze(this);
    }

    _createClass(Negociacao, [{
        key: "volume",
        get: function get() {
            return this._quantidade * this._valor;
        }
    }, {
        key: "data",
        get: function get() {
            return new Date(this._data.getTime());
        }
    }, {
        key: "quantidade",
        get: function get() {
            return this._quantidade;
        }
    }, {
        key: "valor",
        get: function get() {
            return this._valor;
        }
    }]);

    return Negociacao;
}();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.currentInstance = currentInstance;

var _Mensagem = __webpack_require__(5);

var _Negociacao = __webpack_require__(0);

var _ListaNegociacoes = __webpack_require__(6);

var _NegociacoesView = __webpack_require__(7);

var _MensagemView = __webpack_require__(8);

var _NegociacaoService = __webpack_require__(9);

var _DateHelper = __webpack_require__(3);

var _Bind = __webpack_require__(13);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoController = function () {
    function NegociacaoController() {
        _classCallCheck(this, NegociacaoController);

        var $ = document.querySelector.bind(document);
        this._inputQuantidade = $('#quantidade');
        this._inputData = $('#data');
        this._inputValor = $('#valor');
        this._ordemAtual = '';

        this._service = new _NegociacaoService.NegociacaoService();

        this._listaNegociacoes = new _Bind.Bind(new _ListaNegociacoes.ListaNegociacoes(), new _NegociacoesView.NegociacoesView($('#negociacoesView')), 'adiciona', 'esvazia', 'ordena', 'inverteOrdem');

        this._mensagem = new _Bind.Bind(new _Mensagem.Mensagem(), new _MensagemView.MensagemView($('#mensagemView')), 'texto');

        this._init();
    }

    _createClass(NegociacaoController, [{
        key: '_init',
        value: function _init() {
            var _this = this;

            this._service.lista().then(function (negociacoes) {
                return negociacoes.forEach(function (negociacao) {
                    return _this._listaNegociacoes.adiciona(negociacao);
                });
            }).catch(function (erro) {
                return _this._mensagem.texto = erro;
            });

            setInterval(function () {
                _this.importaNegociacoes();
            }, 3000);
        }
    }, {
        key: 'adiciona',
        value: function adiciona(event) {
            var _this2 = this;

            event.preventDefault();
            var negociacao = this._criarNegociacao();

            this._service.cadastra(negociacao).then(function (mensagem) {
                _this2._listaNegociacoes.adiciona(negociacao);
                _this2._mensagem.texto = mensagem;
                _this2._limpaFormulario();
            }).catch(function (erro) {
                return _this2._mensagem.texto = erro;
            });
        }
    }, {
        key: 'importaNegociacoes',
        value: function importaNegociacoes() {
            var _this3 = this;

            this._service.importa(this._listaNegociacoes.negociacoes).then(function (negociacoes) {
                return negociacoes.forEach(function (negociacao) {
                    _this3._listaNegociacoes.adiciona(negociacao);
                    _this3._mensagem.texto = 'Negociações importadas com sucesso.';
                });
            }).catch(function (erro) {
                return _this3._mensagem.texto = erro;
            });
        }
    }, {
        key: 'ordena',
        value: function ordena(coluna) {
            if (this._ordemAtual == coluna) {
                this._listaNegociacoes.inverteOrdem();
            } else {
                this._listaNegociacoes.ordena(function (a, b) {
                    return a[coluna] - b[coluna];
                });
            }
            this._ordemAtual = coluna;
        }
    }, {
        key: 'apaga',
        value: function apaga() {
            var _this4 = this;

            this._service.apaga().then(function (mensagem) {
                _this4._mensagem.texto = mensagem;
                _this4._listaNegociacoes.esvazia();
            }).catch(function (erro) {
                return _this4._mensagem.texto = erro;
            });
        }
    }, {
        key: '_criarNegociacao',
        value: function _criarNegociacao() {
            return new _Negociacao.Negociacao(_DateHelper.DateHelper.textoParaData(this._inputData.value), parseInt(this._inputQuantidade.value), parseFloat(this._inputValor.value));
        }
    }, {
        key: '_limpaFormulario',
        value: function _limpaFormulario() {
            this._inputData.value = '';
            this._inputQuantidade.value = 1;
            this._inputValor.value = 0.0;

            this._inputData.focus();
        }
    }]);

    return NegociacaoController;
}();

var negociacaoController = new NegociacaoController();

function currentInstance() {
    return negociacaoController;
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var View = exports.View = function () {
    function View(elemento) {
        _classCallCheck(this, View);

        this._elemento = elemento;
    }

    _createClass(View, [{
        key: 'update',
        value: function update(model) {
            this._elemento.innerHTML = this.template(model);
        }
    }, {
        key: 'template',
        value: function template() {
            throw new Error('O método template deve ser implementado');
        }
    }]);

    return View;
}();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DateHelper = exports.DateHelper = function () {
    function DateHelper() {
        _classCallCheck(this, DateHelper);

        throw new Error('Esta classe não pode sert instanciada');
    }

    _createClass(DateHelper, null, [{
        key: 'textoParaData',
        value: function textoParaData(texto) {
            if (!/\d{4}-\d{2}-\d{2}/.test(texto)) throw new Error('Deve estar no formato aaaa-mm-dd');

            return new (Function.prototype.bind.apply(Date, [null].concat(_toConsumableArray(texto.split('-').map(function (item, index) {
                return item - index % 2;
            })))))();
        }
    }, {
        key: 'dataParaTexto',
        value: function dataParaTexto(data) {
            return data.getDate() + '/' + (data.getMonth() + 1) + '/' + data.getFullYear();
        }
    }]);

    return DateHelper;
}();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _NegociacaoController = __webpack_require__(1);

__webpack_require__(15);

var negociacaoController = (0, _NegociacaoController.currentInstance)();

document.querySelector('.form').onsubmit = negociacaoController.adiciona.bind(negociacaoController);
document.querySelector('button[type=button]').onclick = negociacaoController.apaga.bind(negociacaoController);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Mensagem = exports.Mensagem = function () {
    function Mensagem() {
        var texto = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        _classCallCheck(this, Mensagem);

        this._texto = texto;
    }

    _createClass(Mensagem, [{
        key: 'texto',
        get: function get() {
            return this._texto;
        },
        set: function set(texto) {
            this._texto = texto;
        }
    }]);

    return Mensagem;
}();

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ListaNegociacoes = exports.ListaNegociacoes = function () {
    function ListaNegociacoes() {
        _classCallCheck(this, ListaNegociacoes);

        this._negociacoes = [];
    }

    _createClass(ListaNegociacoes, [{
        key: "adiciona",
        value: function adiciona(negociacao) {
            this._negociacoes.push(negociacao);
        }
    }, {
        key: "esvazia",
        value: function esvazia() {
            this._negociacoes = [];
        }
    }, {
        key: "ordena",
        value: function ordena(criterio) {
            this._negociacoes.sort(criterio);
        }
    }, {
        key: "inverteOrdem",
        value: function inverteOrdem() {
            this._negociacoes.reverse();
        }
    }, {
        key: "negociacoes",
        get: function get() {
            return [].concat(this._negociacoes);
        }
    }]);

    return ListaNegociacoes;
}();

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NegociacoesView = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _View2 = __webpack_require__(2);

var _DateHelper = __webpack_require__(3);

var _NegociacaoController = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NegociacoesView = exports.NegociacoesView = function (_View) {
    _inherits(NegociacoesView, _View);

    function NegociacoesView(elemento) {
        _classCallCheck(this, NegociacoesView);

        var _this = _possibleConstructorReturn(this, (NegociacoesView.__proto__ || Object.getPrototypeOf(NegociacoesView)).call(this, elemento));

        elemento.addEventListener('click', function (event) {

            if (event.target.nodeName == 'TH') {

                (0, _NegociacaoController.currentInstance)().ordena(event.target.textContent.toLowerCase());
            }
        });
        return _this;
    }

    _createClass(NegociacoesView, [{
        key: 'template',
        value: function template(model) {
            return '\n            <table class="table table-hover table-bordered">\n                <thead>\n                    <tr>\n                        <th>DATA</th>\n                        <th>QUANTIDADE</th>\n                        <th>VALOR</th>\n                        <th>VOLUME</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    ' + model.negociacoes.map(function (item) {
                return '<tr>\n                           <td>' + _DateHelper.DateHelper.dataParaTexto(item.data) + '</td>\n                           <td>' + item.quantidade + '</td>\n                           <td>' + item.valor + '</td>\n                           <td>' + item.volume + '</td>\n                        </tr>';
            }).join('') + '\n                </tbody>\n                <tfoot>\n                        <td colspan="3"></td>\n                        <td>\n                            ' + model.negociacoes.reduce(function (total, item) {
                return total + item.volume;
            }, 0.0) + '\n                        </td>\n                </tfoot>\n            </table>\n        ';
        }
    }]);

    return NegociacoesView;
}(_View2.View);

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MensagemView = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _View2 = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MensagemView = exports.MensagemView = function (_View) {
    _inherits(MensagemView, _View);

    function MensagemView(elemento) {
        _classCallCheck(this, MensagemView);

        return _possibleConstructorReturn(this, (MensagemView.__proto__ || Object.getPrototypeOf(MensagemView)).call(this, elemento));
    }

    _createClass(MensagemView, [{
        key: 'template',
        value: function template(model) {
            return model.texto ? '\n            <p class="alert alert-info">' + model.texto + '</p>' : '<p></p>';
        }
    }]);

    return MensagemView;
}(_View2.View);

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NegociacaoService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _HttpService = __webpack_require__(10);

var _Negociacao = __webpack_require__(0);

var _ConnectionFactory = __webpack_require__(11);

var _NegociacaoDao = __webpack_require__(12);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoService = exports.NegociacaoService = function () {
    function NegociacaoService() {
        _classCallCheck(this, NegociacaoService);

        this._http = new _HttpService.HttpService();
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
                        return new _Negociacao.Negociacao(new Date(obj.data), obj.quantidade, obj.valor);
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
                        return new _Negociacao.Negociacao(new Date(obj.data), obj.quantidade, obj.valor);
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
                        return new _Negociacao.Negociacao(new Date(obj.data), obj.quantidade, obj.valor);
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
            return _ConnectionFactory.ConnectionFactory.getConnection().then(function (connection) {
                return new _NegociacaoDao.NegociacaoDao(connection);
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
            return _ConnectionFactory.ConnectionFactory.getConnection().then(function (connection) {
                return new _NegociacaoDao.NegociacaoDao(connection);
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
            return _ConnectionFactory.ConnectionFactory.getConnection().then(function (connection) {
                return new _NegociacaoDao.NegociacaoDao(connection);
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
                        return JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente);
                    });
                });
            }).catch(function (erro) {
                console.log(erro);
                throw new Error('Não foi possivel buscar a lista de negociações importadas');
            });
        }
    }, {
        key: 'isEquals',
        value: function isEquals(outraNegociacao) {
            return JSON.stringify(this) == JSON.stringify(outraNegociacao);
        }
    }]);

    return NegociacaoService;
}();

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HttpService = exports.HttpService = function () {
    function HttpService() {
        _classCallCheck(this, HttpService);
    }

    _createClass(HttpService, [{
        key: '_handleErrors',
        value: function _handleErrors(res) {
            if (!res.ok) throw new Error(res.statusText);
            return res;
        }
    }, {
        key: 'get',
        value: function get(url) {
            var _this = this;

            return fetch(url).then(function (res) {
                return _this._handleErrors(res);
            }).then(function (res) {
                return res.json();
            });
        }
    }, {
        key: 'post',
        value: function post(url, dado) {
            var _this2 = this;

            return fetch(url, {
                headers: { 'Content-type': 'application/json' },
                method: 'POST',
                body: JSON.stringify(dado)
            }).then(function (res) {
                return _this2._handleErrors(res);
            });
        }
    }]);

    return HttpService;
}();

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var stores = ['negociacoes'];
var version = 1;
var dbName = 'aluraframe';
var connection = null;
var close = null;

var ConnectionFactory = exports.ConnectionFactory = function () {
    function ConnectionFactory() {
        _classCallCheck(this, ConnectionFactory);

        throw new Error('Não é possivel criar instancias de connnerctionFactory');
    }

    _createClass(ConnectionFactory, null, [{
        key: 'getConnection',
        value: function getConnection() {
            return new Promise(function (resolve, reject) {
                var openRequest = window.indexedDB.open(dbName, version);
                openRequest.onupgradeneeded = function (e) {
                    ConnectionFactory._createStores(e.target.result);
                };
                openRequest.onsuccess = function (e) {
                    if (!connection) {
                        connection = e.target.result;
                        close = connection.close.bind(connection);
                        connection.close = function () {
                            throw new Error('Você não fechar diretamnete a conexão');
                        };
                    }
                    resolve(connection);
                };
                openRequest.onerror = function (e) {
                    console.log(e.target.error);
                    reject(e.target.error.name);
                };
            });
        }
    }, {
        key: '_createStores',
        value: function _createStores(connection) {
            stores.forEach(function (store) {
                if (connection.objectStoreNames.contains(store)) {
                    connection.deleteObjectStore(store);
                }
                connection.createObjectStore(store, { autoIncrement: true });
            });
        }
    }, {
        key: 'closeConnection',
        value: function closeConnection() {
            if (connection) {
                close();
                connection = [];
            }
        }
    }]);

    return ConnectionFactory;
}();

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NegociacaoDao = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Negociacao = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoDao = exports.NegociacaoDao = function () {
    function NegociacaoDao(connection) {
        _classCallCheck(this, NegociacaoDao);

        this._connection = connection;
        this._store = 'negociacoes';
    }

    _createClass(NegociacaoDao, [{
        key: 'adiciona',
        value: function adiciona(negociacao) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                var request = _this._connection.transaction([_this._store], 'readwrite').objectStore(_this._store).add(negociacao);

                request.onsuccess = function (e) {
                    resolve();
                };
                request.onerror = function (e) {
                    console.log(e.target.error);
                    reject('Não foi possivel adicionar a negociação');
                };
            });
        }
    }, {
        key: 'listaTodos',
        value: function listaTodos() {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                var cursor = _this2._connection.transaction([_this2._store], 'readwrite').objectStore(_this2._store).openCursor();

                var negociacoes = [];

                cursor.onsuccess = function (e) {
                    var atual = e.target.result;
                    if (atual) {
                        var dado = atual.value;
                        negociacoes.push(new _Negociacao.Negociacao(dado._data, dado._quantidade, dado._valor));

                        atual.continue();
                    } else {
                        resolve(negociacoes);
                    }
                };
                cursor.onerror = function (e) {
                    console.log(e.target.error);
                    reject('Não foi possivel lista as negociações');
                };
            });
        }
    }, {
        key: 'apagarTodos',
        value: function apagarTodos() {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                var request = _this3._connection.transaction([_this3._store], 'readwrite').objectStore(_this3._store).clear();

                request.onsuccess = function (e) {
                    return resolve('Negociações apagadas com sucesso');
                };
                request.onerror = function (e) {
                    console.log(e.target.error);
                    reject('Não foi possivel remover as negociações');
                };
            });
        }
    }]);

    return NegociacaoDao;
}();

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Bind = undefined;

var _ProxyFactory = __webpack_require__(14);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bind = exports.Bind = function Bind(model, view) {
    _classCallCheck(this, Bind);

    for (var _len = arguments.length, props = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        props[_key - 2] = arguments[_key];
    }

    var proxy = _ProxyFactory.ProxyFactory.create(model, props, function (model) {
        return view.update(model);
    });

    view.update(model);

    return proxy;
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProxyFactory = exports.ProxyFactory = function () {
    function ProxyFactory() {
        _classCallCheck(this, ProxyFactory);
    }

    _createClass(ProxyFactory, null, [{
        key: "create",
        value: function create(objeto, props, acao) {

            return new Proxy(objeto, {
                get: function get(target, prop, receiver) {

                    if (props.includes(prop) && ProxyFactory._ehFuncao(target[prop])) {

                        return function () {

                            console.log("a propriedade \"" + prop + "\" foi interceptada");
                            Reflect.apply(target[prop], target, arguments);
                            return acao(target);
                        };
                    }
                    return Reflect.get(target, prop, receiver);
                },
                set: function set(target, prop, value, receiver) {
                    if (props.includes(prop)) {
                        target[prop] = value;
                        acao(target);
                    }
                    return Reflect.set(target, prop, value, receiver);
                }
            });
        }
    }, {
        key: "_ehFuncao",
        value: function _ehFuncao(func) {

            return (typeof func === "undefined" ? "undefined" : _typeof(func)) == (typeof Function === "undefined" ? "undefined" : _typeof(Function));
        }
    }]);

    return ProxyFactory;
}();

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Headers = Headers;
exports.Request = Request;
exports.Response = Response;
exports.fetch = fetch;
var support = {
  searchParams: 'URLSearchParams' in self,
  iterable: 'Symbol' in self && 'iterator' in Symbol,
  blob: 'FileReader' in self && 'Blob' in self && function () {
    try {
      new Blob();
      return true;
    } catch (e) {
      return false;
    }
  }(),
  formData: 'FormData' in self,
  arrayBuffer: 'ArrayBuffer' in self
};

function isDataView(obj) {
  return obj && DataView.prototype.isPrototypeOf(obj);
}

if (support.arrayBuffer) {
  var viewClasses = ['[object Int8Array]', '[object Uint8Array]', '[object Uint8ClampedArray]', '[object Int16Array]', '[object Uint16Array]', '[object Int32Array]', '[object Uint32Array]', '[object Float32Array]', '[object Float64Array]'];

  var isArrayBufferView = ArrayBuffer.isView || function (obj) {
    return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
  };
}

function normalizeName(name) {
  if (typeof name !== 'string') {
    name = String(name);
  }
  if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name) || name === '') {
    throw new TypeError('Invalid character in header field name');
  }
  return name.toLowerCase();
}

function normalizeValue(value) {
  if (typeof value !== 'string') {
    value = String(value);
  }
  return value;
}

// Build a destructive iterator for the value list
function iteratorFor(items) {
  var iterator = {
    next: function next() {
      var value = items.shift();
      return { done: value === undefined, value: value };
    }
  };

  if (support.iterable) {
    iterator[Symbol.iterator] = function () {
      return iterator;
    };
  }

  return iterator;
}

function Headers(headers) {
  this.map = {};

  if (headers instanceof Headers) {
    headers.forEach(function (value, name) {
      this.append(name, value);
    }, this);
  } else if (Array.isArray(headers)) {
    headers.forEach(function (header) {
      this.append(header[0], header[1]);
    }, this);
  } else if (headers) {
    Object.getOwnPropertyNames(headers).forEach(function (name) {
      this.append(name, headers[name]);
    }, this);
  }
}

Headers.prototype.append = function (name, value) {
  name = normalizeName(name);
  value = normalizeValue(value);
  var oldValue = this.map[name];
  this.map[name] = oldValue ? oldValue + ', ' + value : value;
};

Headers.prototype['delete'] = function (name) {
  delete this.map[normalizeName(name)];
};

Headers.prototype.get = function (name) {
  name = normalizeName(name);
  return this.has(name) ? this.map[name] : null;
};

Headers.prototype.has = function (name) {
  return this.map.hasOwnProperty(normalizeName(name));
};

Headers.prototype.set = function (name, value) {
  this.map[normalizeName(name)] = normalizeValue(value);
};

Headers.prototype.forEach = function (callback, thisArg) {
  for (var name in this.map) {
    if (this.map.hasOwnProperty(name)) {
      callback.call(thisArg, this.map[name], name, this);
    }
  }
};

Headers.prototype.keys = function () {
  var items = [];
  this.forEach(function (value, name) {
    items.push(name);
  });
  return iteratorFor(items);
};

Headers.prototype.values = function () {
  var items = [];
  this.forEach(function (value) {
    items.push(value);
  });
  return iteratorFor(items);
};

Headers.prototype.entries = function () {
  var items = [];
  this.forEach(function (value, name) {
    items.push([name, value]);
  });
  return iteratorFor(items);
};

if (support.iterable) {
  Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
}

function consumed(body) {
  if (body.bodyUsed) {
    return Promise.reject(new TypeError('Already read'));
  }
  body.bodyUsed = true;
}

function fileReaderReady(reader) {
  return new Promise(function (resolve, reject) {
    reader.onload = function () {
      resolve(reader.result);
    };
    reader.onerror = function () {
      reject(reader.error);
    };
  });
}

function readBlobAsArrayBuffer(blob) {
  var reader = new FileReader();
  var promise = fileReaderReady(reader);
  reader.readAsArrayBuffer(blob);
  return promise;
}

function readBlobAsText(blob) {
  var reader = new FileReader();
  var promise = fileReaderReady(reader);
  reader.readAsText(blob);
  return promise;
}

function readArrayBufferAsText(buf) {
  var view = new Uint8Array(buf);
  var chars = new Array(view.length);

  for (var i = 0; i < view.length; i++) {
    chars[i] = String.fromCharCode(view[i]);
  }
  return chars.join('');
}

function bufferClone(buf) {
  if (buf.slice) {
    return buf.slice(0);
  } else {
    var view = new Uint8Array(buf.byteLength);
    view.set(new Uint8Array(buf));
    return view.buffer;
  }
}

function Body() {
  this.bodyUsed = false;

  this._initBody = function (body) {
    this._bodyInit = body;
    if (!body) {
      this._bodyText = '';
    } else if (typeof body === 'string') {
      this._bodyText = body;
    } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
      this._bodyBlob = body;
    } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
      this._bodyFormData = body;
    } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
      this._bodyText = body.toString();
    } else if (support.arrayBuffer && support.blob && isDataView(body)) {
      this._bodyArrayBuffer = bufferClone(body.buffer);
      // IE 10-11 can't handle a DataView body.
      this._bodyInit = new Blob([this._bodyArrayBuffer]);
    } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
      this._bodyArrayBuffer = bufferClone(body);
    } else {
      this._bodyText = body = Object.prototype.toString.call(body);
    }

    if (!this.headers.get('content-type')) {
      if (typeof body === 'string') {
        this.headers.set('content-type', 'text/plain;charset=UTF-8');
      } else if (this._bodyBlob && this._bodyBlob.type) {
        this.headers.set('content-type', this._bodyBlob.type);
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
      }
    }
  };

  if (support.blob) {
    this.blob = function () {
      var rejected = consumed(this);
      if (rejected) {
        return rejected;
      }

      if (this._bodyBlob) {
        return Promise.resolve(this._bodyBlob);
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(new Blob([this._bodyArrayBuffer]));
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as blob');
      } else {
        return Promise.resolve(new Blob([this._bodyText]));
      }
    };

    this.arrayBuffer = function () {
      if (this._bodyArrayBuffer) {
        return consumed(this) || Promise.resolve(this._bodyArrayBuffer);
      } else {
        return this.blob().then(readBlobAsArrayBuffer);
      }
    };
  }

  this.text = function () {
    var rejected = consumed(this);
    if (rejected) {
      return rejected;
    }

    if (this._bodyBlob) {
      return readBlobAsText(this._bodyBlob);
    } else if (this._bodyArrayBuffer) {
      return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
    } else if (this._bodyFormData) {
      throw new Error('could not read FormData body as text');
    } else {
      return Promise.resolve(this._bodyText);
    }
  };

  if (support.formData) {
    this.formData = function () {
      return this.text().then(decode);
    };
  }

  this.json = function () {
    return this.text().then(JSON.parse);
  };

  return this;
}

// HTTP methods whose capitalization should be normalized
var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

function normalizeMethod(method) {
  var upcased = method.toUpperCase();
  return methods.indexOf(upcased) > -1 ? upcased : method;
}

function Request(input, options) {
  options = options || {};
  var body = options.body;

  if (input instanceof Request) {
    if (input.bodyUsed) {
      throw new TypeError('Already read');
    }
    this.url = input.url;
    this.credentials = input.credentials;
    if (!options.headers) {
      this.headers = new Headers(input.headers);
    }
    this.method = input.method;
    this.mode = input.mode;
    this.signal = input.signal;
    if (!body && input._bodyInit != null) {
      body = input._bodyInit;
      input.bodyUsed = true;
    }
  } else {
    this.url = String(input);
  }

  this.credentials = options.credentials || this.credentials || 'same-origin';
  if (options.headers || !this.headers) {
    this.headers = new Headers(options.headers);
  }
  this.method = normalizeMethod(options.method || this.method || 'GET');
  this.mode = options.mode || this.mode || null;
  this.signal = options.signal || this.signal;
  this.referrer = null;

  if ((this.method === 'GET' || this.method === 'HEAD') && body) {
    throw new TypeError('Body not allowed for GET or HEAD requests');
  }
  this._initBody(body);
}

Request.prototype.clone = function () {
  return new Request(this, { body: this._bodyInit });
};

function decode(body) {
  var form = new FormData();
  body.trim().split('&').forEach(function (bytes) {
    if (bytes) {
      var split = bytes.split('=');
      var name = split.shift().replace(/\+/g, ' ');
      var value = split.join('=').replace(/\+/g, ' ');
      form.append(decodeURIComponent(name), decodeURIComponent(value));
    }
  });
  return form;
}

function parseHeaders(rawHeaders) {
  var headers = new Headers();
  // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
  // https://tools.ietf.org/html/rfc7230#section-3.2
  var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ');
  preProcessedHeaders.split(/\r?\n/).forEach(function (line) {
    var parts = line.split(':');
    var key = parts.shift().trim();
    if (key) {
      var value = parts.join(':').trim();
      headers.append(key, value);
    }
  });
  return headers;
}

Body.call(Request.prototype);

function Response(bodyInit, options) {
  if (!options) {
    options = {};
  }

  this.type = 'default';
  this.status = options.status === undefined ? 200 : options.status;
  this.ok = this.status >= 200 && this.status < 300;
  this.statusText = 'statusText' in options ? options.statusText : 'OK';
  this.headers = new Headers(options.headers);
  this.url = options.url || '';
  this._initBody(bodyInit);
}

Body.call(Response.prototype);

Response.prototype.clone = function () {
  return new Response(this._bodyInit, {
    status: this.status,
    statusText: this.statusText,
    headers: new Headers(this.headers),
    url: this.url
  });
};

Response.error = function () {
  var response = new Response(null, { status: 0, statusText: '' });
  response.type = 'error';
  return response;
};

var redirectStatuses = [301, 302, 303, 307, 308];

Response.redirect = function (url, status) {
  if (redirectStatuses.indexOf(status) === -1) {
    throw new RangeError('Invalid status code');
  }

  return new Response(null, { status: status, headers: { location: url } });
};

var DOMException = exports.DOMException = self.DOMException;
try {
  new DOMException();
} catch (err) {
  exports.DOMException = DOMException = function DOMException(message, name) {
    this.message = message;
    this.name = name;
    var error = Error(message);
    this.stack = error.stack;
  };
  DOMException.prototype = Object.create(Error.prototype);
  DOMException.prototype.constructor = DOMException;
}

function fetch(input, init) {
  return new Promise(function (resolve, reject) {
    var request = new Request(input, init);

    if (request.signal && request.signal.aborted) {
      return reject(new DOMException('Aborted', 'AbortError'));
    }

    var xhr = new XMLHttpRequest();

    function abortXhr() {
      xhr.abort();
    }

    xhr.onload = function () {
      var options = {
        status: xhr.status,
        statusText: xhr.statusText,
        headers: parseHeaders(xhr.getAllResponseHeaders() || '')
      };
      options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
      var body = 'response' in xhr ? xhr.response : xhr.responseText;
      resolve(new Response(body, options));
    };

    xhr.onerror = function () {
      reject(new TypeError('Network request failed'));
    };

    xhr.ontimeout = function () {
      reject(new TypeError('Network request failed'));
    };

    xhr.onabort = function () {
      reject(new DOMException('Aborted', 'AbortError'));
    };

    xhr.open(request.method, request.url, true);

    if (request.credentials === 'include') {
      xhr.withCredentials = true;
    } else if (request.credentials === 'omit') {
      xhr.withCredentials = false;
    }

    if ('responseType' in xhr && support.blob) {
      xhr.responseType = 'blob';
    }

    request.headers.forEach(function (value, name) {
      xhr.setRequestHeader(name, value);
    });

    if (request.signal) {
      request.signal.addEventListener('abort', abortXhr);

      xhr.onreadystatechange = function () {
        // DONE (success or failure)
        if (xhr.readyState === 4) {
          request.signal.removeEventListener('abort', abortXhr);
        }
      };
    }

    xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
  });
}

fetch.polyfill = true;

if (!self.fetch) {
  self.fetch = fetch;
  self.Headers = Headers;
  self.Request = Request;
  self.Response = Response;
}

/***/ })
/******/ ]);
class NegociacaoController{

    constructor(){
        let $ = document.querySelector.bind(document);
        this._inputQuantidade = $('#quantidade');
        this._inputData = $('#data');
        this._inputValor = $('#valor');

        this._listaNegociacoes = new ListaNegociacoes();
        this._negociacaoView = new NegociacaoView($('#negociacoesView'));
        this._negociacaoView.update(this._listaNegociacoes);

        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView($('#mensagemView'));
        this._mensagemView.update(this._mensagem);
    }

    adiciona(event){
        event.preventDefault();

        this._listaNegociacoes.adiciona(this._criarNegociacao());
        this._negociacaoView.update(this._listaNegociacoes);

        this._mensagem.texto = 'Negociação adicionada com sucesso';
        this._mensagemView.update(this._mensagem);
        this._limpaFormulario();
    }

    apaga(){
        this.ListaNegociacoes.esvazia();
        this._negociacaoView.update(this._listaNegociacoes);
        
        this._mensagem.texto = 'Negociações apagadas com sucesso';
        this.MensagemView.update(this._mensagem);
    }

    _criarNegociacao(){
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );
    }
    _limpaFormulario(){
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;

        this._inputData.focus();
    }

}
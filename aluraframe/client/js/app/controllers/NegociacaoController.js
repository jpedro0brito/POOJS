class NegociacaoController{

    constructor(){
        let $ = document.querySelector.bind(document);
        this.inputQuantidade = $('#quantidade');
        this.inputData = $('#data');
        this.inputValor = $('#valor');
    }

    adiciona(event){
        event.preventDefault();

        console.log(this.inputData.value);
        console.log(this.inputQuantidade.value);
        console.log(this.inputValor.value);

    }

}
$(document).ready(function () {
  var $formWell = $('#form-well');
  var $formGroups = $('div.form-group');
  var $helpBlocks = $('span.help-block');
  var $nomeInput = $('#nome-input');
  var $tabelaItens = $('#tabela-itens')

  $formWell.hide();
  $('#botao-novo-item').click(function () {
    $formWell.slideToggle();
  });

  function limparErros() {
    $formGroups.removeClass('has-error');
    $helpBlocks.text('');
  }

  function adicionarItem(item) {
    var linha = '<tr>';
    linha += '<td>' + item.id + '</td>';
    linha += '<td>' + item.creation + '</td>';
    linha += '<td>' + item.nome + '</td>';
    linha += '<td>';
    linha += '<button class="btn btn-danger btn-sm"><i class="glyphicon glyphicon-trash"></i></button>';
    linha += '</td ></tr>';

    var $linhaObjeto=$(linha);
    var $botao = $linhaObjeto.find('button').click(function(){
      console.log(item.id);
      $linhaObjeto.remove();
    });

    $tabelaItens.append($linhaObjeto);

  }

  function listarItens(listaItens){
    $.each(listaItens, function(i, item){
      adicionarItem(item);
    })
  }

  function mostrarErros(erros) {
    var helpBlockPrefixo = '#help-block-';
    var formGroupPrefixo = '#form-group-';
    $.each(erros, function(propriedade, valorDaPropriedade){
      $(helpBlockPrefixo + propriedade).text(valorDaPropriedade);
      $(formGroupPrefixo + propriedade).addClass('has-error');
    });
  }

  $('#form-novo-item').submit(function (evento) {
    evento.preventDefault();
    limparErros();
    var nome = $nomeInput.val();
    if (nome === '') {
      mostrarErros({'nome': 'Campo Obrigatorio'});
    } else {
      adicionarItem({
        "id": 5910974510923776,
        "nome": nome,
        "creation": "09/08/2015 16:44:20"});
      $nomeInput.val('');
    }

  });

  var listaFake=[{"id": 5910974510923776, "nome": "Headphone", "creation": "09/08/2015 16:44:20"}, {"id": 6473924464345088, "nome": "Livro", "creation": "09/08/2015 17:29:42"}, {"id": 5275456790069248, "nome": "Celular", "creation": "09/09/2015 09:12:05"}];
  listarItens(listaFake);

});

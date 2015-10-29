$(document).ready(function () {
  var $formWell = $('#form-well');
  var $formGroups = $('div.form-group');
  var $helpBlocks = $('span.help-block');
  var $nomeInput = $('#nome-input');
  var $tabelaItens = $('#tabela-itens');
  var $listarAjaxLoaderAdicionar = $('#listar-ajax-loader-adicionar');
  var $listarAjaxLoaderTabela = $('#listar-ajax-loader-tabela');

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
    linha += '<img src="images/ajax-loader.gif" hidden="hidden"/>';
    linha += '</td ></tr>';

    var $linhaObjeto=$(linha);
    var $botao = $linhaObjeto.find('button.btn');
    var $ajaxLoader = $linhaObjeto.find('img');
    $botao.click(function () {
      $botao.hide();
      $ajaxLoader.fadeIn();
      $.post('http://localhost:8080/mywishlist/delete',
        {'id': item.id}).success(function () {
          $linhaObjeto.remove();
        }).error(function (erros) {
          alert('Não é possível apagar no momento')
          $ajaxLoader.hide();
          $botao.fadeIn();
        });
    });

    $tabelaItens.append($linhaObjeto);

  }

  function listarItens(lista){
    $.each(lista, function(i, item){
      adicionarItem(item);
    });
  }

  $listarAjaxLoaderTabela.show()
  $.get('http://localhost:8080/mywishlist/restore').success(
    listarItens
  ).error(function () {
    alert('Não foi possível carregar a lista.');
  }).always(function () {
    $listarAjaxLoaderTabela.fadeOut();
  });

  function mostrarErros(erros) {
    var helpBlockPrefixo = '#help-block-';
    var formGroupPrefixo = '#form-group-';
    $.each(erros, function(propriedade, valorDaPropriedade){
      $(helpBlockPrefixo + propriedade).text(valorDaPropriedade);
      $(formGroupPrefixo + propriedade).addClass('has-error');
    });
  }

  $('#form-categoria').submit(function (evento) {
  evento.preventDefault();
  $listarAjaxLoaderAdicionar.show();
  limparErros();
  var nome = $nomeInput.val();
  $.post('http://localhost:8080/mywishlist/new',
    {'nome': nome}).success(function (item) {
      adicionarCategoria(item);
      $nomeInput.val('');
    }).error(function(erros) {
      mostrarErros(erros.responseJSON);
    }).always(function() {
        $listarAjaxLoaderAdicionar.fadeOut;
      });
  });

  //$('#form-novo-item').submit(function (evento) {
  //  evento.preventDefault();
  //  limparErros();
  //  var nome = $nomeInput.val();
  //  if (nome === '') {
  //    mostrarErros({'nome': 'Campo Obrigatorio'});
  //  } else {
  //    adicionarItem({
  //      "id": 5910974510923776,
  //      "nome": nome,
  //      "creation": "09/08/2015 16:44:20"});
  //    $nomeInput.val('');
  //  }
  //
  //});

});
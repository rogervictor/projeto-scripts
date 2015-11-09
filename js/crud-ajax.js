$(document).ready(function () {
  var $formWell = $('#form-well');
  var $formGroups = $('div.form-group');
  var $helpBlocks = $('span.help-block');
  var $nomeInput = $('#nome-input');
  var $tabelaItens = $('#tabela-itens');
  var $ajaxLoaderAdicionar = $('#ajax-loader-adicionar');
  var $ajaxLoaderTabela = $('#ajax-loader-tabela');

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
      $ajaxLoader.show();
      setTimeout(function(){
	      $.post('delete',
	        {'id': item.id}).success(function () {
	          $linhaObjeto.remove();
	        }).error(function (erros) {
	          alert('Não é possível apagar no momento')
	          $ajaxLoader.fadeOut();
	          $botao.fadeIn();
	        });
      }, 1000);
    });

    $tabelaItens.append($linhaObjeto);

  }

  function listarItens(lista){
    $.each(lista, function(i, item){
      adicionarItem(item);
    });
  }

  $ajaxLoaderTabela.show();
  $.get('restore').success(
    listarItens
  ).error(function() {
    alert('Não foi possível carregar a lista.');
  }).always(function () {
    $ajaxLoaderTabela.fadeOut();
  });

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
  $ajaxLoaderAdicionar.show();
  limparErros();
  var nome = $nomeInput.val();
  $.post('new',
    {'nome': nome}).success(function (item) {
      adicionarItem(item);
      $nomeInput.val('');
    }).error(function(erros) {
      mostrarErros({'nome': "Campo Obrigatório"});
    }).always(function() {
        $ajaxLoaderAdicionar.fadeOut();
      });
  });

});
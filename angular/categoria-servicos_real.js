(function () {
  var categoriaServicos = angular.module('categoria-servicos', []);

  categoriaServicos.factory('CategoriaAPI', function ($http) {
    const delay = 1;
    const BASE = '/categorias/rest/';

    function extrairDados(f) {
      return function (ajaxRetorno) {
        return f(ajaxRetorno.data);
      }
    }

    return {
      deletar: function (id, callbackSucesso, callbackErro, callbackAlways) {
        callbackSucesso = extrairDados(callbackSucesso);
        //callbackErro=extrairDados(callbackErro);
        $http.post(BASE + 'delete', {'id': id}).then(
          callbackSucesso, function (resposta) {
            callbackErro(resposta.data)
          }
        ).finally(callbackAlways);

      },
      editar: function (categoria, callbackSucesso, callbackErro, callbackAlways) {
        callbackSucesso = extrairDados(callbackSucesso);
        $http.post(BASE + 'edit', categoria).then(
          callbackSucesso, callbackErro).finally(callbackAlways);
      },
      salvar: function (categoria, callbackSucesso, callbackErro, callbackAlways) {
        callbackSucesso = extrairDados(callbackSucesso);
        callbackErro = extrairDados(callbackErro);
        $http.post(BASE + 'new', categoria).then(
          callbackSucesso, callbackErro).finally(callbackAlways);
      },
      listar: function (callbackSucesso, callbackErro, callbackAlways) {
        callbackSucesso = extrairDados(callbackSucesso);
        $http.get(BASE).then(
          callbackSucesso, callbackErro
        ).finally(callbackAlways);
      }
    };
  });
})();
(function () {

  var categoriaApp = angular.module('categoriaApp', ['categoria-components']);

  categoriaApp.controller('CategoriaCtrl', function ($scope) {
    $scope.categorias = [];

    $scope.adicionarCategoria = function (categoria) {
      $scope.categorias.unshift(categoria);
    }

  });
})();

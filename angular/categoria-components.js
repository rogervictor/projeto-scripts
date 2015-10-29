(function () {
  var categoriaComponents = angular.module('categoria-components', ['categoria-servicos']);

  categoriaComponents.directive('categoriaForm', function () {
    return {
      restric: 'E',
      templateUrl: 'angular/categoria-form.html',
      replace: true,
      scope: {
        salvarCategoriaListener: '&'
      },
      controller: function ($scope, CategoriaAPI) {
        $scope.erros = {};
        $scope.salvandoCategoriaFlag = false;

        $scope.salvar = function () {
          $scope.erros = {};
          $scope.salvandoCategoriaFlag = true;
          CategoriaAPI.salvar($scope.categoria, function (categoriaSalva) {
              $scope.salvarCategoriaListener({'categoria': categoriaSalva});
              $scope.categoria = {nome: ''};
            },
            function (erros) {
              $scope.erros = erros;
              console.log(erros);
            }, function () {
              $scope.salvandoCategoriaFlag = false;
            });
        }
      }
    };
  });

  categoriaComponents.directive('categoriaTabela', function () {
    return {
      restric: 'E',
      templateUrl: 'angular/categoria-tabela.html',
      replace: true,
      scope: {
        categorias: '='
      },
      controller: function ($scope, CategoriaAPI) {
        $scope.listandoCategoriasFlag = true;
        CategoriaAPI.listar(function (categorias) {
          $.each(categorias, function (index, cat) {
            $scope.categorias.push(cat);
          });
        }, function () {

        }, function () {
          $scope.listandoCategoriasFlag = false;
        });

        $scope.removerLinha = function (index) {
          $scope.categorias.splice(index, 1);
        }
      }

    };
  });


  categoriaComponents.directive('categoriaTabelaLinha', function () {
    return {
      restric: 'A',
      templateUrl: 'angular/categoria-tabela-linha.html',
      replace: true,
      scope: {
        categoria: '=',
        deletarCategoriaListener: '&'
      },
      controller: function ($scope, CategoriaAPI) {
        $scope.editandoFlag = false;
        $scope.categoriaParaEdicao = {};

        $scope.editarToggle = function () {
          $scope.editandoFlag = !$scope.editandoFlag;
          $scope.categoriaParaEdicao.nome = $scope.categoria.nome;
        };

        $scope.editar = function () {
          CategoriaAPI.editar($scope.categoriaParaEdicao, function (categoria) {
            $scope.categoria.nome = categoria.nome;
            $scope.editandoFlag = false;
          });
        };

        $scope.deletar = function () {
          CategoriaAPI.deletar($scope.categoria.id, function () {
            $scope.deletarCategoriaListener();

          });
        };

      }

    };
  });
})();
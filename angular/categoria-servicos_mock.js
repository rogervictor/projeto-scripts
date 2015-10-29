(function () {
  var categoriaServicos = angular.module('categoria-servicos', []);

  categoriaServicos.factory('CategoriaAPI', function ($rootScope) {
    const delay = 1;
    return {
      deletar: function (id, callbackSucesso, callbackErro, callbackAlways) {

        setTimeout(function () {
          if (callbackSucesso) {

            callbackSucesso();
          } else if (callbackErro && categoria.nome === '') {
            callbackErro({'nome': 'Campo Obrigatório'});
          }

          if (callbackAlways) {
            callbackAlways();
          }
          $rootScope.$digest();
        }, delay);

      },
      editar: function (categoria, callbackSucesso, callbackErro, callbackAlways) {

        setTimeout(function () {
          if (callbackSucesso && categoria.nome !== '') {

            const categoriaDoServidor = {
              'id': 1,
              creation: '02/02/02 02:02:02',
              nome: categoria.nome
            };
            callbackSucesso(categoriaDoServidor);
          } else if (callbackErro && categoria.nome === '') {
            callbackErro({'nome': 'Campo Obrigatório'});
          }

          if (callbackAlways) {
            callbackAlways();
          }
          $rootScope.$digest();
        }, delay);

      },
      salvar: function (categoria, callbackSucesso, callbackErro, callbackAlways) {

        console.log('Chamada ajax fake para salvar inciando');
        var id = 0;
        setTimeout(function () {
          id++;
          if (callbackSucesso && categoria.nome !== '') {

            const categoriaDoServidor = {
              'id': id,
              creation: '02/02/02 02:02:02',
              nome: categoria.nome
            };
            callbackSucesso(categoriaDoServidor);
          } else if (callbackErro && categoria.nome === '') {
            callbackErro({'nome': 'Campo Obrigatório'});
          }

          if (callbackAlways) {
            callbackAlways();
          }
          $rootScope.$digest();
        }, delay);

        console.log('Finalizando salvar do serviço');
      },
      listar: function (callbackSucesso, callbackErro, callbackAlways) {
        setTimeout(function () {
          if (callbackSucesso) {

            const categoriasDoServidor = [
              {
                'id': 1,
                creation: '02/02/02 02:02:02',
                nome: 'Celulares'
              },
              {
                'id': 2,
                creation: '03/03/03 02:02:02',
                nome: 'Notebooks'
              },
              {
                'id': 3,
                creation: '04/04/04 02:02:02',
                nome: 'Tablets'
              }
            ];
            callbackSucesso(categoriasDoServidor);
          } else if (callbackErro) {
            callbackErro({'nome': 'Campo Obrigatório'});
          }

          if (callbackAlways) {
            callbackAlways();
          }
          $rootScope.$digest();
        }, delay);
      }
    };
  });
})();
var getVarsGlobal;
var nGet = 0;
$.get = function (url) {
  nGet++;
  var getVarsHolder = {
    'url': url,
    success: function (callback) {
      this.successCallback = callback;
      return this
    }, error: function (callback) {
      this.errorCallback = callback;
      return this
    }, always: function (callback) {
      this.alwaysCallback = callback;
      return this
    }
  };

  getVarsGlobal = getVarsHolder;

  return getVarsHolder;
};

QUnit.test('Hello World', function (assert) {
  assert.strictEqual('http://localhost:8080/categorias/rest', getVarsGlobal.url, 'Verificando url de chamada ajax para listar categorias');
  assert.strictEqual(1, nGet, 'Verificando que get é chamado apenas uma vez');
  var $tabelaCategoria = $('#tabela-categoria');
  assert.strictEqual(0, $tabelaCategoria.children().length, 'Tabela vazia antes de retorno de listagem ajax');

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

  getVarsGlobal.successCallback(categoriasDoServidor);
  assert.strictEqual(3, $tabelaCategoria.children().length, 'Tabela vazia antes de retorno de listagem ajax');

  var $listarAjaxLoader = $('#listar-ajax-loader');

  assert.ok($listarAjaxLoader.is(':visible'), 'Mostrando ajax loader');
  getVarsGlobal.alwaysCallback();
  assert.ok(!$listarAjaxLoader.is(':visible'), 'Mostrando ajax loader');



});
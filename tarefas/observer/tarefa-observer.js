function construtorObserver () {
    var observer = {};
	var listaDeObservers = [];
	
	observer.addObserver = function (observer) {
	    listaDeObservers.push(observer);
	}
	
	function executarEvento () {
	    for (var i = 0; i < listaDeObservers.length; i++) {
			var funcaoObserver = listaDeObservers[i];
			funcaoObserver();
		}
	}
	
	observer.executarEvento = executarEvento;
	return observer;
}

var observer = construtorObserver();

var observer1 = function () {
    console.log('observer 1');
}
observer.addObserver(observer1);

var observer2 = function () {
    console.log('observer 2');
}
observer.addObserver(observer2);

observer.executarEvento();
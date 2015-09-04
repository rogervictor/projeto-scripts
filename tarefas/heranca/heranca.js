function Animal (barulho) {
    this.barulho = barulho || 'Grrr...';
}

var animalPrototype = {
    fazerBarulho: function () {
        throw 'Deve ser implementado';
    }
}

Animal.prototype = animalPrototype;

function Cachorro (raca) {
    this.raca = raca || 'Indefinida';
    Animal.call(this, 'au au...');
}

var cachorroPrototype = new Animal ();

cachorroPrototype.fazerBarulho = function () {
    return 'Cachorro latindo: ' + this.barulho;
}

cachorroPrototype.prototype = Animal.prototype;
Cachorro.prototype = cachorroPrototype;

function Gato (raca) {
    this.raca = raca || 'Indefinida';
    Animal.call(this, 'miau...');
}

var gatoPrototype = new Animal();

gatoPrototype.fazerBarulho = function () {
    return 'Gato miando: ' + this.barulho;
}

gatoPrototype.prototype = Animal.prototype;
Gato.prototype = gatoPrototype;

var cachorro = new Cachorro('Bulldog');
var gato = new Gato('Persa');
//console.log(cachorro.fazerBarulho());
//console.log(gato.fazerBarulho());

function Manada () {
    this.listaDeAnimais = [];
}

var manadaPrototype = {
    addAnimal: function (animal) {
        this.listaDeAnimais.push(animal);
        return 'Adicionando animal...';
    }
}

Manada.prototype = manadaPrototype;

var manada = new Manada();
//console.log(manada.addAnimal(cachorro));
//console.log(manada.addAnimal(gato));

function ManadaVirgula () {
    this.listaDeAnimais = [];
}

var manadaVirgulaPrototype = new Manada();

manadaVirgulaPrototype.listarBarulhos = function () {
    var barulhos = '';
    for (var i = 0; i < this.listaDeAnimais.length; i++) {
        barulhos += this.listaDeAnimais[i].fazerBarulho() + ', ';
    }
	return barulhos;
}

manadaVirgulaPrototype.prototype = Manada.prototype;
ManadaVirgula.prototype = manadaVirgulaPrototype;

var manadaVirgula = new ManadaVirgula();
console.log(manadaVirgula.addAnimal(cachorro));
console.log(manadaVirgula.addAnimal(gato));
console.log(manadaVirgula.listarBarulhos());

function ManadaSustenido () {
    this.listaDeAnimais = [];
}

var manadaSustenidoPrototype = new Manada();

manadaSustenidoPrototype.listarBarulhos = function () {
    var barulhos = '';
    for (var i = 0; i < this.listaDeAnimais.length; i++) {
        barulhos += this.listaDeAnimais[i].fazerBarulho() + ' # ';
    }
	return barulhos;
}

manadaSustenidoPrototype.prototype = Manada.prototype;
ManadaSustenido.prototype = manadaSustenidoPrototype;

var manadaSustenido = new ManadaSustenido();
console.log(manadaSustenido.addAnimal(cachorro));
console.log(manadaSustenido.addAnimal(gato));
console.log(manadaSustenido.listarBarulhos());

const assert = require('assert');
const Park = require('../models/park.js');
const Dinosaur = require('../models/dinosaur.js');
const { PassThrough } = require('stream');

describe('Park', function () {

  let park;
  let dinosaur;

  beforeEach(function () {
    park = new Park('Jura', 200)
    dinosaur1 = new Dinosaur('t-rex', 'carnivore', 50)
    dinosaur2 = new Dinosaur('koreanosaur', 'carnivore', 70)
    dinosaur3 = new Dinosaur('dreadnoughtus', 'herbivore ', 60)
    dinosaur4 = new Dinosaur('dinodinocutedino', 'carnivore', 100)
    dinosaur5 = new Dinosaur('t-rex', 'carnivore', 40)

  });

  it('should have a name', function () {
    const actual = park.name;
    assert.deepEqual(actual, 'Jura')
  });

  it('should have a ticket price', function () {
    const actual = park.fee;
    assert.deepStrictEqual(actual, 200)
  });

  it('should have a collection of dinosaurs', function () {
    const actual = park.collection;
    assert.deepStrictEqual(actual, [])
  });

  it('should be able to add a dinosaur to its collection', function () {
    park.addDino(dinosaur1)
    const actual = park.collection.length
    assert.deepStrictEqual(actual, 1)
  });

  it('should be able to remove a dinosaur from its collection', function () {
    park.addDino(dinosaur1)
    park.removeDino(dinosaur1)
    const actual = park.collection.length
    assert.deepStrictEqual(actual, 0)
  });

  it('should be able to find the dinosaur that attracts the most visitors', function () {
    park.addDino(dinosaur1)
    park.addDino(dinosaur2)
    park.addDino(dinosaur3)
    park.addDino(dinosaur4)
    park.addDino(dinosaur5)
    const actual =
      park.collection.reduce(function (first, second) {
        return (first.guestsAttractedPerDay > second.guestsAttractedPerDay) ? first : second
      }).species

    // if first is bigger than second, first. if not, second
    assert.deepStrictEqual(actual, 'dinodinocutedino')
  });

  it('should be able to find all dinosaurs of a particular species', function () {
    park.addDino(dinosaur1)
    park.addDino(dinosaur2)
    park.addDino(dinosaur3)
    park.addDino(dinosaur4)
    park.addDino(dinosaur5)
    const actual = park.findDino('t-rex').length
    assert.strictEqual(actual, 2)
  });

  it('should be able to calculate the total number of visitors per day', function () {
    park.addDino(dinosaur1)
    park.addDino(dinosaur2)
    park.addDino(dinosaur3)
    park.addDino(dinosaur4)
    park.addDino(dinosaur5)
    const actual = park.totalNumPeopleDay()
    assert.strictEqual(actual, 320)
  });

  it('should be able to calculate the total number of visitors per year', function () {
    park.addDino(dinosaur1)
    park.addDino(dinosaur2)
    park.addDino(dinosaur3)
    park.addDino(dinosaur4)
    park.addDino(dinosaur5)
    const actual = park.totalNumPeopleYear()
    assert.strictEqual(actual, 116800)
  });

  it('should be able to calculate total revenue for one year', function () {
    park.addDino(dinosaur1)
    park.addDino(dinosaur2)
    park.addDino(dinosaur3)
    park.addDino(dinosaur4)
    park.addDino(dinosaur5)
    const actual = park.totalRevenueYear()
    assert.strictEqual(actual, 23360000)
  });


  it('remove all dinosaurs of a particular species', function () {
    park.addDino(dinosaur1)
    park.addDino(dinosaur2)
    park.addDino(dinosaur3)
    park.addDino(dinosaur4)
    park.addDino(dinosaur5)
    const actual = park.deleteDino("t-rex").length
    assert.strictEqual(actual, 3)
  })

  it('Provide an object containing each of the diet types and the number of dinosaurs in the park of that diet type', function () {
    park.addDino(dinosaur1)
    park.addDino(dinosaur2)
    park.addDino(dinosaur3)
    const actual = park.dietType()
    assert.deepStrictEqual(actual, { carnivore: 2, herbivore: 0 })
  })

});
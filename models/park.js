const Dinosaur = require("./dinosaur")

const Park = function (name, fee) {
    this.name = name
    this.fee = fee
    this.collection = []
}

Park.prototype.addDino = function (name) {
    this.collection.push(name)
}

Park.prototype.removeDino = function (name) {
    this.collection.pop(name)
}

Park.prototype.findDino = function (name) {
    newCollection = []
    for (const dinosaur of this.collection) {
        if (dinosaur.species == name) {
            newCollection.push(dinosaur)
        }
    }
    return newCollection

}

Park.prototype.totalNumPeopleDay = function () {
    totalDay = 0;
    for (const dino of this.collection) {
        totalDay += dino.guestsAttractedPerDay
    }
    return totalDay
}

Park.prototype.totalNumPeopleYear = function () {
    return this.totalNumPeopleDay() * 365
}

Park.prototype.totalRevenueYear = function () {
    return this.totalNumPeopleYear() * this.fee
}

Park.prototype.deleteDino = function (name) {
    for (const dinosaur of this.collection) {
        if (dinosaur.species == name) {
            this.collection.shift(dinosaur)
        }
    }
    return this.collection
}

Park.prototype.dietType = function () {
    diets = {
        'carnivore': 0,
        'herbivore': 0
    }
    for (const dino of this.collection) {
        if (dino.diet == 'carnivore') {
            diets.carnivore++
        }
        else if (dino.diet == 'herbivore') {
            diets.herbivore++
        }
    }
    return diets
}
module.exports = Park;
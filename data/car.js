class Car {
  #brand;
  #model;
  speed = 0;
  topSpeed = 200;
  isTrunkOpen = false;

  constructor(brand, model) {
    this.#brand = brand,
    this.#model = model
  }

  go() {
    if (this.isTrunkOpen === true) { // Can't accelerate if the trunk is open 
      console.log("Can't accelerate with the trunk open")
      return
    }

    this.speed += 5
    if (this.speed > this.topSpeed) {
      this.speed = this.topSpeed 
    } 
  }

  brake() {
    this.speed -= 5
    if (this.speed < 0) {
      this.speed = 0 
    } 
  }

  openTrunk() {
    this.speed === 0 ? this.isTrunkOpen = true : console.log("The car must stop to open the trunk") // Can't open the trunk if the car is moving
  }

  closeTrunk() {
    this.isTrunkOpen = false
  }


  displayInfo() {
    console.log(`${this.brand} ${this.model}, Speed: ${this.speed} km/h, Trunk status: ${this.isTrunkOpen === false ? "closed" : "open"}`)
  }
}

class RaceCar extends Car {
  topSpeed = 300;
  acceleration;

  constructor(brand, model, acceleration) {
    super(brand, model);
    this.acceleration = acceleration
  }

  go() {
    if (this.isTrunkOpen === true) { // Can't accelerate if the trunk is open 
      console.log("Can't accelerate with the trunk open")
      return
    }

    this.speed += this.acceleration
    if (this.speed > this.topSpeed) {
      this.speed = this.topSpeed 
    } 
  }
  
  openTrunk() {
    console.log("Race cars don't have a trunk") // Can't open the trunk if the car is moving
  }

  closeTrunk() {
    console.log("Race cars don't have a trunk")
  }
}




const newCar = new Car("Toyota", "Corolla");
const newCar2 = new Car("Tesla", "Model 3");
const newCar3 = new Car("Mercedes", "S class")
const newRaceCar = new RaceCar("McLaren", "F1", 20)

// Adding speed
newCar.go()
newCar.go()
newCar.go()
newCar.go()
newCar.go()
newCar.go()
newCar2.go()
newCar2.go()
newCar2.go()
newCar2.go()
newCar2.openTrunk()

newCar.displayInfo();
newCar2.displayInfo();

// Removing speed
newCar.brake()
newCar.brake()
newCar.brake()
newCar2.brake()
newCar2.brake()

newCar.displayInfo();
newCar2.displayInfo();

// Opening trunk
newCar3.openTrunk();

newCar.displayInfo();
newCar2.displayInfo();
newCar3.displayInfo();

newCar3.go()
newCar3.displayInfo();

// Race car
newRaceCar.go()
newRaceCar.openTrunk()

newRaceCar.displayInfo()


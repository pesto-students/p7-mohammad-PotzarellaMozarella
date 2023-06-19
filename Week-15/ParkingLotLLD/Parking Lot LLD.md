# Parking Lot LLD

To design the LLD for this problem statement, we can start by identifying the objects/entities that will be involved in the system:

- **Parking Lot:** This will be the main entity that we will be designing the system around. It will have a fixed number of slots to park cars and will be responsible for allocating and deallocating these slots to incoming and exiting cars, respectively.
- **Car:** This will be a simple entity that will have a registration number and a color associated with it.
- **Slot:** This entity will represent a parking slot in the parking lot and will have a unique slot number associated with it.

**ParkingLot class:** 
 This class represents the parking lot itself and contains information about the slots, their availability, and the cars parked in them. 
 
To implement an automated parking lot ticketing system, we can create a ParkingLot class with the following methods:

* **createParkingLot(n: number):** Creates a parking lot with 'n' number of slots.
* **parkCar(registrationNumber: string, color: string):** Parks a car in the nearest available parking slot and returns the slot number. If the parking lot is full, it returns "Sorry, parking lot is full".
* **leave(slotNumber: number):** Removes the car from the given parking slot number and marks it as available.
* **getStatus():** Returns the current status of the parking lot in the format "Slot No. Registration No Colour".
* **getRegistrationNumbersForCarsWithColor(color: string):** Returns the registration numbers of all cars with the given color.
* **getSlotNumbersForCarsWithColor(color: string):** Returns the slot numbers of all slots where a car with the given color is parked.
* **getSlotNumberForRegistrationNumber(registrationNumber: string):** Returns the slot number in which the car with the given registration number is parked.*


### Code:

```
//creates a car with inputs registration number and color
class Car {
    constructor(registrationNumber, color) {
        this.registrationNumber = registrationNumber;
        this.color = color;
    }
}

//creates the parking lot
class ParkingLot {
    //takes input as the number of total slots
    constructor(slots) {
        this.slots = slots;
        //current parked cars in zero
        this.parkedCars = [];
        //takes available slots from total slots
        this.availableSlots = Array.from({ length: this.slots }, (_, i) => i + 1);
    }

    //method to park a car with inputs registration number and color
    parkCar(registrationNumber, color) {
        //if no slots available return msg
        if (this.availableSlots.length === 0) {
            return "Sorry, parking lot is full";
        }

        //takes the next first available slot for new car to be parked
        const slot = this.availableSlots[0];
        //creates a new car
        const car = new Car(registrationNumber, color);
        //pushes the new car to the parked cars array in the empty slot
        this.parkedCars.push({ slot, car });
        //removed the current available slot since a car is parked there now
        this.availableSlots = this.availableSlots.slice(1);

        return `Allocated slot number: ${slot}`;
    }

    //makes the given slotNumber available
    leave(slotNumber) {
        //finds the given slot number in the parked car array
        const parkedCarIndex = this.parkedCars.findIndex((item) => item.slot === slotNumber);

        //if the slot isnt present in the array return msg
        if (parkedCarIndex === -1) {
            return `Slot number ${slotNumber} is already empty`;
        }

        //remove the slot from the parked car array
        this.parkedCars.splice(parkedCarIndex, 1);
        //add the slot to available slots array
        this.availableSlots.push(slotNumber);
        //sorts the available slots array so the newly added slot moves to its ordered position
        this.availableSlots.sort((a, b) => a - b);

        //success msg
        return `Slot number ${slotNumber} is free`;
    }

    //gets the registration numbers of all cars with the input color
    getRegistrationNumbersByColor(color) {
        return this.parkedCars
            .filter((item) => item.car.color === color)
            .map((item) => item.car.registrationNumber)
            .join(", ");
    }

    //gets the slot numbers of all cars with the input color
    getSlotNumbersByColor(color) {
        return this.parkedCars
            .filter((item) => item.car.color === color)
            .map((item) => item.slot)
            .join(", ");
    }

    //gets the slot number of car with the input registration number
    getSlotNumberByRegistrationNumber(registrationNumber) {
        const item = this.parkedCars.find(
            (item) => item.car.registrationNumber === registrationNumber
        );
        
        //if not found returns msg
        return item ? item.slot : "Not found";
    }

    //returns the status of the parking lot 
    getStatus() {
        const header = "Slot No. Registration No Colour\n";
        const body = this.parkedCars
            .map((item) => `${item.slot} ${item.car.registrationNumber} ${item.car.color}`)
            .join("\n");

        return header + body;
    }

    //exesutes the given command with input
    executeCommand(input) {
        const [command, ...params] = input.trim().split(" ");

        switch (command) {
            case "create_parking_lot":
                return `Created a parking lot with ${params[0]} slots`;
            case "park":
                return this.parkCar(params[0], params[1]);
            case "leave":
                return this.leave(parseInt(params[0], 10));
            case "status":
                return this.getStatus();
            case "registration_numbers_for_cars_with_colour":
                return this.getRegistrationNumbersByColor(params[0]);
            case "slot_numbers_for_cars_with_colour":
                return this.getSlotNumbersByColor(params[0]);
            case "slot_number_for_registration_number":
                return this.getSlotNumberByRegistrationNumber(params[0]);
            default:
                return "Invalid command";
        }
    }
}
```

### Sample Input:

```
const parkingLot = new ParkingLot(6);
console.log(parkingLot.executeCommand("park KA-01-HH-1234 White"));
console.log(parkingLot.executeCommand("park KA-01-BB-0001 Black"));
console.log(parkingLot.executeCommand("park KA-01-HH-7777 Red"));
console.log(parkingLot.executeCommand("park KA-01-HH-2701 Blue"));
console.log(parkingLot.executeCommand("park KA-01-HH-3141 Black"));
console.log(parkingLot.executeCommand("park KA-01-HH-3141 Black"));
console.log(parkingLot.executeCommand("leave 5"));
console.log(parkingLot.executeCommand("status"));
console.log(parkingLot.executeCommand("leave 5"));
console.log(parkingLot.executeCommand("registration_numbers_for_cars_with_colour White"));
console.log(parkingLot.executeCommand("slot_numbers_for_cars_with_colour White"));
console.log(parkingLot.executeCommand("slot_number_for_registration_number KA-01-HH-3141"));
console.log(parkingLot.executeCommand("slot_number_for_registration_number MH-04-AY-1111"));

```

### Sample Output:
```
Allocated slot number: 1
Allocated slot number: 2
Allocated slot number: 3
Allocated slot number: 4
Allocated slot number: 5
Allocated slot number: 6
Slot number 5 is free
Slot No. Registration No Colour
1 KA-01-HH-1234 White
2 KA-01-BB-0001 Black
3 KA-01-HH-7777 Red
4 KA-01-HH-2701 Blue
6 KA-01-HH-3141 Black
Slot number 5 is already empty
KA-01-HH-1234
1
6
Not found
```

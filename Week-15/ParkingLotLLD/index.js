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

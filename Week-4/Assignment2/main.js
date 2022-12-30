//creating a person class
var Person = function() {};

//creating the initialize method in the object property .prototype of the class person
Person.prototype.initialize = function(name, age) {
    this.name = name;
    this.age = age;
};

//creating a class Teacher that inherits from the class Person 
class Teacher extends Person {
    //constructor method with super to get the values of name and age from the parent class Person
    constructor(name, age) {
        super (name, age);
    }
    //method to accept subject as parameter and print the message required
    teach(subject) {
        console.log(`${this.name} is now teaching ${subject}`);
    }
};

//using new operator to create a subclass of Teacher class: him
var him = new Teacher();

//since Person is the parent of Teacher and Teacher of him, him can access the .prototype methods through prototype chaining
him.initialize("Adam",45);
him.teach("Inheritance"); //prints: Adam is now teaching Inheritance

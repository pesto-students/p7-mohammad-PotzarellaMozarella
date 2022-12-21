
// object definition for student object
        const student = {
            name: "Student",
            introduction: function (score1, score2) {
                console.log(this.name + " scored " + score1 + " and " + score2 + " in the exams.");
            },
        };

        // object definition for student objects 1 & 2
            const student1 = {
                name: "Jimmy ",
            };
            const student2 = {
                name: "Julie ",
            };

        const result = student.introduction; //storing the reference to the function for re-use

/*Example for bind which creates a new function bound with a set of values */
        // binding the student1 and 95 to resultBind
        let resultBind = result.bind(student1, 95, 100);
        // binding the student2 and 96 to resultBind2
        let resultBind2 = result.bind(student2, 96, 90);
        // binding the student2 and 96 to resultBind
        let resultBind3 = resultBind.bind(student2, 96, 80);

        // invoking resultBind() functions 
        resultBind(); // Output: Jimmy scored 95 in an exam.
        resultBind2(); // Output: Julie scored 96 in an exam.   
        resultBind3(); // Output: Jimmy scored 95 in an exam. The value of resultBind is fixed to the object its bind with PERMANENTLY. This means that it cant be changed

/*Example for call which accepts a list of arguments */
        result.call(student1, 92, 81); // Output: Jin scored 92 in an exam.
        result.call(student2, 98, 98); // Output: Jill scored 98 in an exam.

/* Example for apply which accepts an array of arguments */
        result.apply(student1, [98, 91]); // Output: Jimmy  scored 98 and 91 in the exams.

/* Viewer.js: Contains StudentManager, Student and IO classes to be used throughout the viewer */

/*
 * @desc Performs all the input and output reading and writing to the page
 */
function IO(data) {

    this.data = data;
    
    // The student manager instance
    this.studentManager = null;

    /* 
     * @desc Writes the current formatted data out to the table
     * @return void
     */
    this.writeToTable = function() {
        $(document).ready(function () {
            $("#table").append("Test");
        });
    };

    /*
     * @desc Converts the input string to a 2D array
     * @return void
     */
    this.parseFiles = function() {
        var parsedData = this.data.split(",");

        // Keeps track of each student array (2D)
        var studentData = [];
        
        for (i = 0; i < parsedData.length; i += 11) {
            var start = i;
            var end = i + 11;

            var temp = [];
            
            // Add the current students data to an array
            for (j = start; j < end; j++) {
                temp.push(parsedData[j]);
            }

            studentData.push(temp);


        }
        
        console.log(studentData);
        // Create a StudentManager to hang onto, and allow it to create Student objects to hold onto
        this.studentManager = new StudentManager();
        this.studentManager.createStudentsFromData(studentData);
        
    };

}

io = new IO(localStorage.getItem("data"));
io.parseFiles();
io.writeToTable();



/*
 * @desc Contains a list of all students and can perform database like sorting options on them
*/
function StudentManager() {

	this.students = [];


	/* @desc Finds a student by an input OEN
	 * @param int oen
	 * @return <Student> 
	*/
	this.getStudentByOEN = function(oen) {};


	/* 
	 * @desc Finds a student by an input name
	 * @param String name
	 * @return <Student>
	*/
	this.getStudentsByName = function(name) {};

	
	/* 
	 * @desc Sorts the student list by reading level
	 * @return Array<Student>
	*/
   	this.sortByReadingLevel = function() {};

	
	/* 
	 * @desc Sorts the student list by reading score
	 * @return Array<Student>
	*/
	this.sortByReadingScore = function() {};

		
	/* 
	 * @desc Sorts the student list by writing level
	 * @return Array<Student>
	*/
	this.sortByWritingLevel = function() {};


	/* 
	 * @desc Sorts the student list by writing score
	 * @return Array<Student>
	*/
	this.sortByWritingScore = function() {};


	/* 
	 * @desc Sorts the student list by math level
	 * @return Array<Student>
	*/
	this.sortByMathLevel = function() {};


	/* 
	 * @desc Sorts the student list by math score
	 * @return Array<Student>
	*/
	this.sortByMathScore = function() {};


	/* 
	 * @desc Sorts the student list by students at risk
	 * @return Array<Student>
	*/
	this.getStudentsAtRisk = function() {};


	/* 
	 * @desc Reads through the input data to populate the students Array
	 * @param Array<Array> data
	 * @return void
	*/
	this.createStudentsFromData = function(data) {
            // Loop through each student, create a student object for him/her, and store it
            for (s = 0; s < data.length; s++) {
                var studentData = data[s];
                
                this.addNewStudent(studentData);
            }
            
        };

	/*
	 * @desc Adds a new student object to the students Array
	 * @param Array data
	 * @return void
	*/
	this.addNewStudent = function(data) {
            var studentObject = new Student(data);
            this.students.push(studentObject);
            console.log(studentObject.firstName);
        };


};

/*
 * @desc Contains a Student
 * @param Array data - The students properties
*/
function Student(data) {

	this.oen = data[0];
	this.firstName = data[1];
        this.lastName = data[2];
	this.gender = data[3];
	this.IEP = data[4];

	this.readingLevel = data[5];
	this.readingScore = data[6];
	
	this.writingLevel = data[7];
	this.writingScore = data[8];
	
	this.mathLevel = data[9];
	this.mathScore = data[10];
	
	
	/* 
	 * @desc Checks if the student is at risk of failing
	 * @return bool - true or false
	*/
	this.atRisk = function() {};
	 

};

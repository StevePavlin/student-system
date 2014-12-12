/* Viewer.js: Contains StudentManager, Student and IO classes to be used throughout the viewer */

/*
 * @desc Performs all the input and output reading and writing to the page
*/
function IO(data) {

	this.data = data;

	/* 
	 * @desc Writes the current formatted data out to the table
	 * @return void
	*/
	this.writeToTable() = function() {}

	/*
	 * @desc Converts the input string to a 2D array
	 * @param String data
	 * @return void
	*/
	this.parseFiles() = function() {}
	
}


/*
 * @desc Contains a list of all students and can perform database like sorting options on them
*/
function StudentManager() {

	this.students = [];


	/* @desc Finds a student by an input OEN
	 * @param int oen
	 * @return <Student> 
	*/
	this.getStudentByOEN = function(oen) {}


	/* 
	 * @desc Finds a student by an input name
	 * @param String name
	 * @return <Student>
	*/
	this.getStudentsByName = function(name) {}

	
	/* 
	 * @desc Sorts the student list by reading level
	 * @return Array<Student>
	*/
   	this.sortByReadingLevel = function() {}

	
	/* 
	 * @desc Sorts the student list by reading score
	 * @return Array<Student>
	*/
	this.sortByReadingScore = function {}

		
	/* 
	 * @desc Sorts the student list by writing level
	 * @return Array<Student>
	*/
	this.sortByWritingLevel = function() {}


	/* 
	 * @desc Sorts the student list by writing score
	 * @return Array<Student>
	*/
	this.sortByWritingScore = function() {}


	/* 
	 * @desc Sorts the student list by math level
	 * @return Array<Student>
	*/
	this.sortByMathLevel = function() {}


	/* 
	 * @desc Sorts the student list by math score
	 * @return Array<Student>
	*/
	this.sortByMathScore = function() {}


	/* 
	 * @desc Sorts the student list by students at risk
	 * @return Array<Student>
	*/
	this.getStudentsAtRisk = function() {}


	/* 
	 * @desc Reads through the input data to populate the students Array
	 * @param Array<Array> data
	 * @return void
	*/
	this.addStudentsFromData = function(data) {}
		

	/*
	 * @desc Adds a new student object to the students Array
	 * @param Array data
	 * @return void
	*/
	this.addNewStudent = function(data) {}


}

/*
 * @desc Contains a Student
 * @param Array data - The students properties
*/
function Student(data) {

	this.oen = data[0];
	this.name = data[1];
	this.gender = data[2];
	this.IEP = data[3];

	this.readingLevel = data[4];
	this.readingScore = data[5];
	
	this.writingLevel = data[6];
	this.writingScore = data[7];
	
	this.mathLevel = data[8];
	this.mathScore = data[9];
	
	
	/* 
	 * @desc Checks if the student is at risk of failing
	 * @return bool - true or false
	*/
	this.atRisk = function() {}
	 

}

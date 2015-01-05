/* Viewer.js: Contains StudentManager, Student and IO classes to be used throughout the viewer */

/*
 * @desc Performs all the input and output reading and writing to the page
 */
function IO(data) {

    this.data = data;
    
    // A list of StudentManager instances for the 3 files
    this.studentManagers = [new StudentManager(), new StudentManager(), new StudentManager()];
    
    // The Student Manager used to write to the table
    this.finalManager = new StudentManager();


    /*
     * @desc Takes in the user input filters, finds an array of student objects that match the filters, sets them as the current studentList, and finally writes to the table.
     * @return void
     */
    this.query = function() {};
    

    /* 
     * @desc Writes the current formatted data out to the table
     * @return void
     */
    this.writeToTable = function() {
        
                                // Libraries are great ^_^
        var htmlTable = "<center><table class='sortable' border=1 frame=hsides rules=rows width='90%'><tr>\n\
            <th>OEN</th>\n\
            <th>First Name</th>\n\
            <th>Last Name</th>\n\
            <th>Gender</th>\n\
            <th>IEP</th>\n\
            <th>Reading Level</th>\n\
            <th>Reading Score</th>\n\
            <th>Writing Level</th>\n\
            <th>Writing Score</th>\n\
            <th>Math Level</th>\n\
            <th>Math Score</th>\n\
            </tr>\n\
            ";
        
        // Loop through the current data in memory and begin formatting student rows
        for (var s = 0; s < this.finalManager.students.length - 1; s++) {
            // Got the students array, now loop through his/her properties
            for (var p = 0; p < this.finalManager.students[s].properties.length; p++) {
                var currentProperty = this.finalManager.students[s].properties[p];
                htmlTable += "<td style='width: 200px;'>" + this.finalManager.students[s][currentProperty] + "</td>";
            }
            // Done the students row
            htmlTable += "</tr>";
        }
    
        
        // Done the table
        htmlTable += "</table></center>";

        
        $(document).ready(function() {
            $("#table").append(htmlTable);       
        });
        
    };
    
    

    /*
     * @desc Converts the input string to a 2D array
     * @return void
     */
    this.parseData = function(data, currentSM) {
        // Remove newlines and create an array
        var parsedData = data.replace(/[\n\r]+/g, "").split(",");

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
        
        // Create a StudentManager to hang onto, and allow it to create Student objects to hold onto
        this.studentManagers[currentSM].createStudentsFromData(studentData);
        
    };
    
    /*
     * @desc Parses all of the files data
     * @return void
     */
    this.parse = function() {
        
        this.parseData(localStorage.getItem("grade3"), 0);
        this.parseData(localStorage.getItem("grade6"), 1);
        // TODO Add the other files here when needed         
        
    };
    
    
    /*
     * @desc Builds a list of student objects without conflicts from all 3 files, then saves it to a final StudentManager object to be written to the table
     * @return void
     */
    
    this.merge = function() {
        
        var mergedStudentArray = [];
        // Loop through all the students in the grade 3 data, this is guaranteed to have the most entries
        for (s = 0; s < this.studentManagers[0].students.length - 1; s++) {
            var currentStudent = this.studentManagers[0].students[s];
            
            // Check if this student exists in the grade 6 data
            if (this.studentManagers[1].getStudentByOEN(currentStudent.oen) !== null) {
                // Update the student were on
                currentStudent = this.studentManagers[1].getStudentByOEN(currentStudent.oen);
            }
            
            
            // Check if this student exists in the grade 9 data
            /*if (this.studentManagers[1].getStudentByOEN(currentStudent.oen) !== null) {
                // Update the student were on
                currentStudent = this.studentManagers[2].getStudentByOEN(currentStudent.oen);
            }*/
            
            // Now have the most updated info for this student, add him/her to the array
            mergedStudentArray.push(currentStudent);
            console.log(currentStudent);
        }
       
        this.finalManager.students = mergedStudentArray;
    };

}

io = new IO();
io.parse();
io.merge();
io.writeToTable();

//io.parseFiles();
//io.writeToTable();



/*
 * @desc Contains a list of all students and can perform database like sorting options on them
*/
function StudentManager() {

	this.students = [];


	/* @desc Finds a student by an input OEN
	 * @param int oen
	 * @return <Student> 
	*/
	this.getStudentByOEN = function(oen) {
            for (s = 0; s < this.students.length; s++) {
                if (this.students[s].oen === oen) {
                    return this.students[s];
                }
            }
        };


	/* 
	 * @desc Finds a student by an input name
	 * @param String name
	 * @return <Student>
	*/
	this.getStudentByName = function(name) {};

	
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
	
        // An list of the properties to allow for easy looping
        this.properties = ["oen", "firstName", "lastName", "gender", "IEP", "readingLevel", "readingScore", "writingLevel", "writingScore", "mathLevel", "mathScore"];
	
	/* 
	 * @desc Checks if the student is at risk of failing
	 * @return bool - true or false
	*/
	this.atRisk = function() {};
	 

};

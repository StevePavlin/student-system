/* Viewer.js: Contains StudentManager, Student and IO classes to be used throughout the viewer */

/*
 * @desc Performs all the input and output reading and writing to the page
 */
function IO(data) {

    this.data = data;
    
    // The Student Manager used to hold the list of students
    this.studentManager = new StudentManager();


    /*
     * @desc Takes in the user input filters, finds an array of student objects that match the filters, sets them as the current studentList, and finally writes to the table.
     * @return void
     */
    this.query = function() {
    }
    

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
        for (var s = 0; s < this.studentManager.students.length; s++) {
            // Got the students array, now loop through his/her properties
            var currentStudent = this.studentManager.students[s];
            
            // Print out the constants
            for (var c = 0; c < currentStudent.constants.length; c++) {
                var currentConstant = currentStudent.constants[c];
                htmlTable += "<td style='width: 200px;'>" + currentConstant + "</td>";
            }
            
            // Print out student specific scores and properties
            for (var i = 0; i < currentStudent.grade3Data.length; i++) {
                var currentProperty = currentStudent.grade3Data[i]
                var temp = "";
                
                // Check for a blank value and format
                currentProperty === "" ? temp = "None" : temp = currentProperty;                         
                
                // Check for an updated property, if it exists, display them both
                htmlTable += "<td style='width: 200px;'>" + temp + ", " + currentStudent.grade6Data[i];
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
    this.parseData = function(data, grade) {
        // Remove newlines and create an array
        var parsedData = data.replace(/[\n\r]+/g, "").split(",");

        // Keeps track of each student array (2D)
        var studentData = [];
        
        for (var i = 0; i < parsedData.length; i += 11) {
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
        this.studentManager.createStudentsFromData(studentData, grade);
        
    };
    
    /*
     * @desc Parses all of the files data
     * @return void
     */
    this.parse = function() {
        
        this.parseData(localStorage.getItem("grade3"), 3);
        this.parseData(localStorage.getItem("grade6"), 6);
        // TODO Add the other files here when needed         
        
    };
    
    


}

io = new IO();
io.parse();
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
                if (this.students[s].constants[0] === oen) {
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
	this.createStudentsFromData = function(data, grade) {
            // Loop through each student, create a student object for him/her, and store it

            for (var s = 0; s < data.length - 1; s++) {
                var studentData = data[s];

                if (typeof this.getStudentByOEN(studentData[0]) !== "undefined") {
                    // This student already exists, merge data
                    this.getStudentByOEN(studentData[0]).updateData(studentData, grade);
                    
                    
                } else {
                    this.addNewStudent(studentData, grade);
                }
                
                
                
            }
            
        };

	/*
	 * @desc Adds a new student object to the students Array
	 * @param Array data
	 * @return void
	*/
	this.addNewStudent = function(data, grade) {
            var studentObject = new Student(data);
            studentObject.updateData(data, grade);
            this.students.push(studentObject);
            
        };


};

/*
 * @desc Contains a Student
 * @param Array data - The students properties
*/
function Student(data) {

        // Positions: [0] OEN, [1] firstName, [2] lastName, [3] gender
        this.constants = null;
	
        
        // Positions: [0] IEP, [1] readingLevel, [2] readingScore, [3] writingLevel, [4] writingScore, [5] mathLevel, [6] mathScore
        this.grade3Data = null;
        this.grade6Data = null;
        
        // Positions: [0] Grade 9 Test
        this.grade9Data = null;
        
        
        
        
        /*
         * @desc Updates the students data for a grade accordingly
         * @param int grade
         */
        this.updateData = function(data, grade) {
            // Assign grade data variables accordingly
            switch(grade) {
                case 3:
                    this.grade3Data = [data[4], data[5], data[6], data[7], data[8], data[9], data[10]];
                    break;

                case 6:          
                    this.grade6Data = [data[4], data[5], data[6], data[7], data[8], data[9], data[10]];
                    break;

                case 9:
                    this.grade9Data = [data[4]];
                    break;
            }  
            
            // Set the constants
            this.constants = [data[0], data[1], data[2], data[3]];
           
        };
        

	
	/* 
	 * @desc Checks if the student is at risk of failing
	 * @return bool - true or false
	*/
	this.atRisk = function() {};
	 

};

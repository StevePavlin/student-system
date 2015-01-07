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
        
        filters = {
             
            "reading": {
                "level": {
                    "operator": $("#readingLevelOptions option:selected").text(),
                    "value": $("#readingLevel").val()
                },
                
                "score": {
                     "operator": $("#readingScoreOptions option:selected").text(),
                     "value": $("#readingScore").val()                   
                }
                
            },
            
            "writing": {
                "level": {
                    "operator": $("#writingLevelOptions option:selected").text(),
                    "value": $("#writingLevel").val()                   
                },
                
                "score": {
                    "operator": $("#writingScoreOptions option:selected").text(),
                    "value": $("#writingScore").val()                    
                }
                
            },
            
            "math":  {
                "level": {
                    "operator": $("#mathLevelOptions option:selected").text(),
                    "value": $("#mathLevel").val()                   
                },
                
                "score": {
                    "operator": $("#mathScoreOptions option:selected").text(),
                    "value": $("#mathScore").val()                    
                }
                
                
            }           
            
        }
        
        var studentList = [];
        // Build a new list of students based on the parameters
        for (var s in this.studentManager.students) {
            var currentStudent = this.studentManager.students[s];
            
            var pass = true;
            
            // Loop through categories
            for (var c in filters) {
                var currentCat = filters[c];
                // Loop through subcategory
                for (var i in currentCat) {
                    var currentSubcat = filters[c][i];
                    

                    console.log(currentSubcat.value)
                    // Is this subcategorys input blank?
                    if (currentSubcat.value === "") {
                        i++;
                    }
                    

                    // Check the condition against the current students properties and logs if he passes all filters, then adds it to the temporary list if necassary

                    
                    switch(c) {
                        
                          
                        
                        case "reading":
                            switch(i) {
                                
                                case "level":
                                    switch(filters[c][i].operator) {
                                        case ">":
                                            console.log("triggered reading level >");
                                            if (currentStudent.grade3Data[1] > currentSubcat.value || currentStudent.grade6Data[1] > currentSubcat.value) {
                                                pass = true;
                                            } 
                                            else {
                                                pass = false;
                                            }      
                                            break;
                                        case "<":
                                            console.log("triggered reading level <");
                                            if (currentStudent.grade3Data[1] < currentSubcat.value || currentStudent.grade6Data[1] < currentSubcat.value) {
                                                pass = true;
                                            } 
                                            else {
                                                pass = false;
                                            }                                           
                                            break;
                                    }
                                    break;
                                    
                                case "score":
                                    switch(filters[c][i].operator) {
                                        case ">":
                                            console.log("triggered reading score >");
                                            if (currentStudent.grade3Data[2] > currentSubcat.value || currentStudent.grade6Data[2] > currentSubcat.value) {
                                                pass = true;
                                            } 
                                            else {
                                                pass = false;
                                            }   
                                            break;
                                        case "<":
                                            console.log("triggered reading score <");
                                            if (currentStudent.grade3Data[2] < currentSubcat.value || currentStudent.grade6Data[2] < currentSubcat.value) {
                                                pass = true;
                                            } 
                                            else {
                                                pass = false;
                                            }   
                                            break;
                                    }
                                    break;
                            }
                            break;
                            
                            
                        case "writing":
                             switch(i) {
                                case "level":
                                    switch(filters[c][i].operator) {
                                        case ">":
                                            console.log("triggered writing level >");
                                            if (currentStudent.grade3Data[3] > currentSubcat.value || currentStudent.grade6Data[3] > currentSubcat.value) {
                                                pass = true;
                                            } 
                                            else {
                                                pass = false;
                                            }     
                                            break;
                                        case "<":
                                            console.log("triggered writing level <");
                                            if (currentStudent.grade3Data[3] < currentSubcat.value || currentStudent.grade6Data[3] < currentSubcat.value) {
                                                pass = true;
                                            } 
                                            else {
                                                pass = false;
                                            }   
                                            break;
                                    }
                                    break;
                                
                                case "score":
                                    switch(filters[c][i].operator) {
                                        case ">":
                                            console.log("triggered writing score >");
                                            if (currentStudent.grade3Data[4] > currentSubcat.value || currentStudent.grade6Data[4] > currentSubcat.value) {
                                                pass = true;
                                            } 
                                            else {
                                                pass = false;
                                            }    
                                            break;
                                        case "<":
                                            console.log("triggered writing score <");
                                            if (currentStudent.grade3Data[4] < currentSubcat.value || currentStudent.grade6Data[4] < currentSubcat.value) {
                                                pass = true;
                                            } 
                                            else {
                                                pass = false;
                                            }     
                                            break;
                                    }
                                    break;
                            }
                            break;
                            
                            
                        case "math":
                             switch(i) {
                                case "level":
                                    switch(filters[c][i].operator) {
                                        case ">":
                                            console.log("triggered math level >");
                                            if (currentStudent.grade3Data[5] > currentSubcat.value || currentStudent.grade6Data[5] > currentSubcat.value) {
                                                pass = true;
                                            } 
                                            else {
                                                pass = false;
                                            }                                                 
                                            break;
                                        case "<":
                                            console.log("triggered math level <");                                             
                                            if (currentStudent.grade3Data[5] < currentSubcat.value || currentStudent.grade6Data[5] < currentSubcat.value) {
                                                pass = true;
                                            } 
                                            else {
                                                pass = false;
                                            }                                                  
                                            break;
                                    }
                                    break;
                                case "score":
                                    switch(filters[c][i].operator) {
                                        case ">":
                                            console.log("triggered math score >");                                           
                                            if (currentStudent.grade3Data[6] > currentSubcat.value || currentStudent.grade6Data[6] > currentSubcat.value) {
                                                pass = true;
                                            } 
                                            else {
                                                pass = false;
                                            }                                
                                            break;
                                        case "<":
                                            console.log("triggered math score <");
                                            if (currentStudent.grade3Data[6] < currentSubcat.value || currentStudent.grade6Data[6] < currentSubcat.value) {
                                                pass = true;
                                            } 
                                            else {
                                                pass = false;
                                            }                                               
                                            break;
                                    }
                                    break;
                            }
                            break;
                    } // End switch
                    
                    
                } // End subcat loop
            } // End cat loop
            

            pass ? studentList.push(currentStudent) : null;
            
        } // End student loop
     
        
        //console.log(studentList);
        //console.log(studentList.length);
        
        
        this.writeToTable(studentList);
        
    };
    


    /* 
     * @desc Writes the current formatted data out to the table
     * @return void
     */
    this.writeToTable = function(studentList) {
        
        $("#table").empty();
        
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
        for (var s = 0; s < studentList.length; s++) {
            // Got the students array, now loop through his/her properties
            var currentStudent = studentList[s];
            
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
io.writeToTable(io.studentManager.students);

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

/* Viewer.js: Contains StudentManager, Student and IO classes to be used throughout the viewer */

/*
 * @desc Performs all the input and output reading and writing to the page
 */
function IO() {

    // The Student Manager used to hold the list of students
    this.studentManager = new StudentManager();

    /*
     * @desc Determines if a students grades pass the filters requirements
     * @params Student student, int paramIndex, String subCatOperator, String subCatOperator1, String value, String value2 
     */
    this.passesTest = function(student, paramIndex, subCatOperator, subCatOperator1, subCatValue, subCatValue1) {
        if (subCatOperator === ">" && subCatOperator1 === "<") {
            if ((student.grade3Data[paramIndex] > subCatValue && student.grade3Data[paramIndex] < subCatValue1) ||
                    (student.grade6Data[paramIndex] > subCatValue && student.grade6Data[paramIndex] < subCatValue1)) {
                return true;

            } else {
                return false;
            }
        }

        if (subCatOperator === "<" && subCatOperator1 === ">") {
            if ((student.grade3Data[paramIndex] < subCatValue && student.grade3Data[paramIndex] > subCatValue1) ||
                    (student.grade6Data[paramIndex] < subCatValue && student.grade6Data[paramIndex] > subCatValue1)) {
                return true;

            } else {
                return false;
            }
        }

        else if (subCatOperator === "<") {
            if (student.grade3Data[paramIndex] < subCatValue || student.grade6Data[paramIndex] < subCatValue) {
                return true;
            } else {
                return false;
            }
        }
        else if (subCatOperator === ">") {
            if (student.grade3Data[paramIndex] > subCatValue || student.grade6Data[paramIndex] > subCatValue) {
                return true;
            } else {
                return false;
            }
        }
        else if (subCatOperator === "=") {
            if (student.grade3Data[paramIndex] === subCatValue || student.grade6Data[paramIndex] === subCatValue) {
                return true;
            } else {
                return false;
            }
        }
        
    };


    /*
     * @desc Takes in the user input filters, finds an array of student objects that match the filters, sets them as the current studentList, and finally writes to the table.
     * @return void
     */
    this.query = function() {        
        
        // List of the filters and their info after input
        filters = {
            
            "iep": {
                "clicked": $("#iep").is(":checked")
            },
             
            "reading": {
                "level": {
                    "operator": $("#readingLevelOptions option:selected").text(),
                    "value": $("#readingLevel").val(),
                    "operator1": $("#readingLevelOptions1 option:selected").text(),
                    "value1": $("#readingLevel1").val()
                    
                },
                
                "score": {
                     "operator": $("#readingScoreOptions option:selected").text(),
                     "value": $("#readingScore").val(),    
                     "operator1": $("#readingScoreOptions1 option:selected").text(),
                     "value1": $("#readingScore1").val()
                }
                
            },
            
            "writing": {
                "level": {
                    "operator": $("#writingLevelOptions option:selected").text(),
                    "value": $("#writingLevel").val(),    
                    "operator1": $("#writingLevelOptions1 option:selected").text(),
                    "value1": $("#writingLevel1").val()
                },
                
                "score": {
                    "operator": $("#writingScoreOptions option:selected").text(),
                    "value": $("#writingScore").val(),
                    "operator1": $("#writingScoreOptions1 option:selected").text(),
                    "value1": $("#writingScore1").val()
                }
                
            },
            
            "math":  {
                "level": {
                    "operator": $("#mathLevelOptions option:selected").text(),
                    "value": $("#mathLevel").val(),
                    "operator1": $("#mathLevelOptions1 option:selected").text(),
                    "value1": $("#mathLevel1").val()
                },
                
                "score": {
                    "operator": $("#mathScoreOptions option:selected").text(),
                    "value": $("#mathScore").val(),      
                    "operator1": $("#mathScoreOptions1 option:selected").text(),
                    "value1": $("#mathScore1").val()
                }
                
                
            }           
            
        }
        
        var studentList = [];
        // Build a new list of students based on the parameters
        for (var s in this.studentManager.students) {
            var currentStudent = this.studentManager.students[s];
            
            // Tracks if Student passes search critera
            var iep = true;
            var pass1 = true;
            var pass2 = true;
            var pass3 = true;
            var pass4 = true;
            var pass5 = true;
            var pass6 = true;
            
            
            for (var cat in filters) {
                var currentCat = filters[cat];
                
                for (var subCat in filters[cat]) {
                    
                    var currentSubcat = filters[cat][subCat];
                    
                    if (currentSubcat.value === "") {
                        subCat++;
                    }
        
                    console.log(cat, subCat, currentSubcat.operator, currentSubcat.value);
                    
                    if (cat === "iep") {
                        if (currentCat.clicked) {
                            currentStudent.grade3Data[0] === "x" || currentStudent.grade6Data[0] === "x" ? iep = true : iep = false
                        }
                    }
                    
                    if (cat === "reading") {
                        if (subCat === "level") {
                            pass1 = this.passesTest(currentStudent, 1, currentSubcat.operator, currentSubcat.operator1, currentSubcat.value, currentSubcat.value1);                            
                        }
                    
                        
                        if (subCat === "score") {
                            pass2 = this.passesTest(currentStudent, 2, currentSubcat.operator, currentSubcat.operator1, currentSubcat.value, currentSubcat.value1);                                         
                        }
                    } 
                    
                    
                    if (cat === "writing") {
                        if (subCat === "level") {
                            pass3 = this.passesTest(currentStudent, 3, currentSubcat.operator, currentSubcat.operator1, currentSubcat.value, currentSubcat.value1);
                        }

                        if (subCat === "score") {
                            pass4 = this.passesTest(currentStudent, 4, currentSubcat.operator, currentSubcat.operator1, currentSubcat.value, currentSubcat.value1);
                        }
                    } 
                    
                    if (cat === "math") {
                        if (subCat === "level") {
                            pass5 = this.passesTest(currentStudent, 5, currentSubcat.operator, currentSubcat.operator1, currentSubcat.value, currentSubcat.value1);
                        }

                        if (subCat === "score") {
                            pass6 = this.passesTest(currentStudent, 6, currentSubcat.operator, currentSubcat.operator1, currentSubcat.value, currentSubcat.value1);
                        }                       
                    }
                    
                    
                    
                }
            }

            console.log(pass1, pass2, pass3, pass4, pass5, pass6)        
            iep && pass1 && pass2 && pass3 && pass4 && pass5 && pass6 ? studentList.push(currentStudent) : null;
      
            
        } // End student loop
     
        
        console.log(studentList);
        console.log(studentList.length);
        
        
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
            <th colspan='2'>IEP</th>\n\
            <th colspan='2'>Reading Level</th>\n\
            <th colspan='2'>Reading Score</th>\n\
            <th colspan='2'>Writing Level</th>\n\
            <th colspan='2'>Writing Score</th>\n\
            <th colspan='2'>Math Level</th>\n\
            <th colspan='2'>Math Score</th>\n\
            </tr>\n\
            ";
        
        // Loop through the current data in memory and begin formatting student rows
        for (var s = 0; s < studentList.length; s++) {
            // Got the students array, now loop through his/her properties
            var currentStudent = studentList[s];
            
            // Print out the constants
            for (var c = 0; c < currentStudent.constants.length; c++) {
                var currentConstant = currentStudent.constants[c];
                htmlTable += "<td style='width: 100px;'>" + currentConstant + "</td>";
            }
            
            // Print out student specific scores and properties
            for (var i = 0; i < currentStudent.grade3Data.length; i++) {
                var currentProperty = currentStudent.grade3Data[i]
                var temp3 = "";
                var temp6 = "";
                
                // Check for a blank value and format
                currentProperty === "" ? temp3 = "<td>None</td>" : temp3 = "<td>" + currentProperty + "</td>";       
                currentStudent.grade6Data[i] === "" ? temp6 = "<td>None</td>" : temp6 = "<td>" + currentStudent.grade6Data[i] + "</td>";
                
                
                
                // Check for an updated property, if it exists, display them both
                htmlTable += temp3 + temp6;
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

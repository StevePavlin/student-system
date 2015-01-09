/* The upload part of the system.
 * Saves submitted data in a localStorage variable to be used on other pages
 * Data from the users submitted files can be accessed with localStorage.getItem("data");
*/



if (window.File && window.FileReader && window.FileList && window.Blob) {
    // Great success! All the File APIs are supported.
} else {
    alert('The File APIs are not fully supported in this browser.');
}

// A simple way to add all the files to the local storage to be used in the viewer
function appendToStorage(name, data) {
    localStorage.setItem(name, data);
}

// Takes an input file, validates and reads it then disables the file input button.
function readFile(file, messageArea, grade) {

var allowedFile = "text/csv";
var fileProperties = file.files[0];

//if (fileProperties.type.match(allowedFile)) {
	var reader = new FileReader();

	reader.onload = function(e) {
		data = reader.result;
                appendToStorage("grade" + grade, data);
	};

	reader.readAsText(fileProperties);
	messageArea.innerText = "File successfully loaded.";

	// Disable the button
	file.disabled = true

	//} else {
		//messageArea.innerText = "Filetype not supported.";
	//}
};

// Get the ids of the input files and areas
var grade3File = document.getElementById('grade3File');
var grade6File = document.getElementById('grade6File');
var grade9File = document.getElementById('grade9File');
var button = document.getElementById('button');

var grade3Area = document.getElementById('grade3Area');
var grade6Area = document.getElementById('grade6Area');
var grade9Area = document.getElementById('grade9Area');

// Listen for a submitted file
grade3File.addEventListener('change', function(e) {
	readFile(grade3File, grade3Area, "3");
});

grade6File.addEventListener('change', function(e) {
	readFile(grade6File, grade6Area, "6");
});

grade9File.addEventListener('change', function(e) {
	readFile(grade9File, grade9Area, "9");
});

button.addEventListener('click', function(e) {
	
	// Check if all inputs are complete
	if (grade3File.disabled || grade6File.disabled || grade9File.disabled) {
		window.location = "viewer.html";
	}
	
});

localStorage.setItem('grade3', "");
localStorage.setItem('grade6', "");
localStorage.setItem('grade9', "");








var bio = {
	"name": "Steve Pavlin",
	"role": "Software Developer",
	"contacts": {
	  "mobile": "905-484-2421",
	  "email": "steve@pavlin.me",
	  "github": "StevePavlin",
	  "blog": "pavlin.me", 
	  "twitter": "StevePavz",
	  "location": "Toronto"
	},

	"picture": "/resume/images/profile.jpg",
	"welcome": "Welcome to my resume!",
	"skills": ["Full stack experience", "Proficient Linux admin and user", "Fluent in Python, Javascript, PHP, and MySQL", "Knowledgeable of game architecture and design"]
}

var work = {

	"jobs": [
		{
			"title": "Cashier",
			"employer": "McDonalds",
			"date": "Feburary 2014 - Present",
			"location": "Oakville, Ontario",
			"description": "Working at the front and drive-thru."
		}  
	]
}

var project = {

	"projects": [
		{
			"title": "TopTrending",
			"date": "February 2014 - Present",
			"description": "Linux Administrator",
			"image": "/resume/images/toptrending.png",
			"url": "http://toptrending.com"
		},

		{
			"title": "Ascension",
			"date": "December 2014",
			"description": "A Python RPG",
			"image": "http://stevepavlin.com/blog/wp-content/uploads/2014/12/ascension.png",
			"url": "http://pavlin.me"
		}	
	]
}


var education = {
	"schools": [
    	{
			"name": "St. Thomas Aquinas Secondary School",
			"location": "Oakville, Ontario",
			"degree": "High School Diploma",
			"date": "September 2011 - Present",
			"major": "N/A"
		}
	
	],
	
	"onlineCourses": [
		{
			"title": "JavaScript Basics",
			"school": "Udacity",
			"date": "November 2014",
			"url": "https://www.udacity.com/course/ud804"
		},


		{
			"title": "Learn Javascript",
			"school": "Codecademy",
			"date": "October 2014",
			"url": "http://www.codecademy.com/en/tracks/javascript"
		},

		{
			"title": "Try Objective-C",
			"school": "Code School",
			"date": "May 2014",
			"url": "https://www.codeschool.com/courses/try-objective-c"
		},
	
		{
			"title": "Learn Python",
			"school": "Codecademy",
			"date": "September 2013",
			"url": "http://www.codecademy.com/en/tracks/python"
		}
	]
}

bio.display = function() {
	
	// Add name and role
	var formattedName = HTMLheaderName.replace("%data%", bio.name);
	var formattedRole = HTMLheaderRole.replace("%data%", bio.role + "<img src='/resume/images/icon.png'>");
	
	$("#header").prepend(formattedName + formattedRole);

	// Add contact info
	var formattedMobile = HTMLmobile.replace("%data%", bio.contacts.mobile);
	var formattedEmail = HTMLemail.replace("%data%", bio.contacts.email);
	var formattedGithub = HTMLgithub.replace("%data%", bio.contacts.github);
	var formattedBlog = HTMLblog.replace("%data%", bio.contacts.blog);
	var formattedLocation = HTMLlocation.replace("%data%", bio.contacts.location);
	
	var formattedContactGeneric = HTMLcontactGeneric.replace("%data%", formattedMobile + formattedEmail + formattedGithub + formattedBlog + formattedLocation);

	$("#topContacts").append(formattedContactGeneric);
	
	// Add welcome message
	var formattedWelcomeMsg = HTMLWelcomeMsg.replace("%data%", bio.welcome);
	
	$("#header").append(formattedWelcomeMsg);


	// Add picture
	var formattedPicture = HTMLbioPic.replace("%data%", bio.picture);

	$("#header").append(formattedPicture);



	// Add skills
	$("#header").append(HTMLskillsStart);
	
	for (i = 0; i < bio.skills.length; i++) {		
		var formattedSkill = HTMLskills.replace("%data%", bio.skills[i]);
		$("#skills").append(formattedSkill);
	}


	// Add footer
	$("#footerContacts").append(formattedContactGeneric);
		
	
}

work.display = function() {
	for (job in work.jobs) {
		$("#workExperience").append(HTMLworkStart);

		var formattedEmployer = HTMLworkEmployer.replace("%data%", work.jobs[job].employer);
		var formattedTitle = HTMLworkTitle.replace("%data%", work.jobs[job].title);
		var formattedDate = HTMLworkDates.replace("%data%", work.jobs[job].date);
		var formattedLocation = HTMLworkLocation.replace("%data%", work.jobs[job].location);
		var formattedDescription = HTMLworkDescription.replace("%data%", work.jobs[job].description);

		$(".work-entry:last").append(formattedEmployer + formattedTitle + formattedDate + formattedLocation + formattedDescription);

	}
}



projects.display = function() {
	for (var currentProject in project.projects) {
		$("#projects").append(HTMLprojectStart);
	
		var formattedTitle = HTMLprojectTitle.replace("%data%", project.projects[currentProject].title).replace("%url%", project.projects[currentProject].url);
		var formattedDate = HTMLprojectDates.replace("%data%", project.projects[currentProject].date);
		var formattedDescription = HTMLprojectDescription.replace("%data%", project.projects[currentProject].description);
		var formattedImage = HTMLprojectImage.replace("%data%", project.projects[currentProject].image);

		$(".project-entry:last").append(formattedTitle + formattedDate + formattedDescription + formattedImage);
		
	}
}

education.display = function() {
	// Display schools
	for (var school in education.schools) {
		$("#education").append(HTMLschoolStart);

		var formattedName = HTMLschoolName.replace("%data%", education.schools[school].name);
		var formattedDegree = HTMLschoolDegree.replace("%data%", education.schools[school].degree);
		var formattedDate = HTMLschoolDates.replace("%data%", education.schools[school].date);
		var formattedLocation = HTMLschoolLocation.replace("%data%", education.schools[school].location);
	
		$(".education-entry:last").append(formattedName + formattedDegree + formattedDate + formattedLocation + "<br>");

	}

	// Display online courses
	$(".education-entry:last").append(HTMLonlineClasses);		
	for (var course in education.onlineCourses) {
		var formattedTitle = HTMLonlineTitle.replace("%data%", education.onlineCourses[course].title).replace("%url%", education.onlineCourses[course].url);
		var formattedSchool = HTMLonlineSchool.replace("%data%", education.onlineCourses[course].school);
		var formattedDate = HTMLonlineDates.replace("%data%", education.onlineCourses[course].date);
		//var formattedURL = HTMLonlineURL.replace("%data%", education.onlineCourses[course].url);

		$(".education-entry:last").append(formattedTitle + formattedSchool + formattedDate + "<br>");
	}
		
}

// Encapsulation
bio.display();
projects.display();
work.display();
education.display();

$("#mapDiv").append(googleMap);
$("#main").append("<center>" + internationalizeButton + "</center>");

function inName() {
	var name = bio.name.split(" ");
	return name[0].slice(0, 1).toUpperCase() + name[0].slice(1) + " " + name[1].toUpperCase();
}


function logClick(x, y) {
	console.log(x, y);
}

$(document).click(function(loc) {
	logClick(loc.clientX + " " + loc.clientY);

});




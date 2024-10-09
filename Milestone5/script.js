var _a;
var resumeForm = document.getElementById("resumeForm");
var resumeOutput = document.getElementById("resumeOutput");
var actionsContainer = document.getElementById("actions");
var shareLinkInput = document.getElementById("shareLink");
var downloadPdfButton = document.getElementById("downloadPdf");
resumeForm.addEventListener("submit", function (event) {
    var _a;
    event.preventDefault();
    // Get form data
    var username = document.getElementById("username").value;
    var name = document.getElementById("name").value;
    var address = document.getElementById("address").value;
    var phone = document.getElementById("phone").value;
    var email = document.getElementById("email").value;
    var education = document.getElementById("education").value;
    var experience = document.getElementById("experience").value;
    var skills = document.getElementById("skills").value.split(',').map(function (skill) { return "<li>".concat(skill.trim(), "</li>"); }).join('');
    // Handle Profile Picture
    var profilePicture = (_a = document.getElementById("profilePicture").files) === null || _a === void 0 ? void 0 : _a[0];
    var profilePictureURL = '';
    if (profilePicture) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            profilePictureURL = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
            // Now call the function to display the resume including the image
            generateResume(profilePictureURL);
        };
        reader.readAsDataURL(profilePicture);
    }
    else {
        // If no picture is uploaded, generate resume without the picture
        generateResume();
    }
    function generateResume(profilePic) {
        if (profilePic === void 0) { profilePic = ''; }
        // Generate resume content
        var profilePicHTML = profilePic ? "<img src=\"".concat(profilePic, "\" alt=\"Profile Picture\" style=\"width:150px;height:150px;object-fit:cover;border-radius:50%;\">") : '';
        var resumeContent = "\n            <div style=\"text-align: center;\">\n                ".concat(profilePicHTML, "\n                <h1>").concat(name, "</h1>\n            </div>\n            <h2>Contact:</h2>\n              <p><strong>Email:</strong> ").concat(email, "</p>\n               <p><strong>Phone #:</strong> ").concat(phone, "</p>\n            <p><strong>Address:</strong> ").concat(address, "</p>\n           \n          \n            <h2>Education</h2>\n        <p >").concat(education.split(',').map(function (item) { return "<p>".concat(item.trim(), "</p>"); }).join(''), "</p>\n            <h2>Experience:</h2>\n            <p>").concat(experience, "</p>\n            <h2>Skills:</h2>\n            <p>").concat(skills, "</p>\n        "); // Generate unique URL (Assuming you have a domain, for now using local URL as placeholder)
        var uniqueURL = "".concat(window.location.origin, "/index.html?username=").concat(username);
        shareLinkInput.value = uniqueURL;
        // Display share and download options
        actionsContainer.style.display = 'block';
        // Display the generated resume
        resumeOutput.innerHTML = resumeContent;
        // Show the download button
        downloadPdfButton.style.display = 'block';
    }
});
// Print functionality (Download as PDF via print dialog)
downloadPdfButton.addEventListener("click", function () {
    window.print();
});
// Copy link functionality
(_a = document.getElementById("copyLink")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
    shareLinkInput.select();
    document.execCommand("copy");
    alert("Link copied to clipboard!");
});

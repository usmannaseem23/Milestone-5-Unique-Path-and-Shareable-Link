const resumeForm = document.getElementById("resumeForm") as HTMLFormElement;
const resumeOutput = document.getElementById("resumeOutput") as HTMLDivElement;
const actionsContainer = document.getElementById("actions") as HTMLDivElement;

const shareLinkInput = document.getElementById("shareLink") as HTMLInputElement;
const downloadPdfButton = document.getElementById("downloadPdf") as HTMLButtonElement;

resumeForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Get form data
    const username = (document.getElementById("username") as HTMLInputElement).value;
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const address = (document.getElementById("address") as HTMLInputElement).value;
    const phone = (document.getElementById("phone") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const education = (document.getElementById("education") as HTMLInputElement).value;
    const experience = (document.getElementById("experience") as HTMLTextAreaElement).value;
    const skills = (document.getElementById("skills") as HTMLTextAreaElement).value.split(',').map(skill => `<li>${skill.trim()}</li>`).join('');

    // Handle Profile Picture
    const profilePicture = (document.getElementById("profilePicture") as HTMLInputElement).files?.[0];
    let profilePictureURL = '';

    if (profilePicture) {
        const reader = new FileReader();
        reader.onload = function(e) {
            profilePictureURL = e.target?.result as string;
            // Now call the function to display the resume including the image
            generateResume(profilePictureURL);
        };
        reader.readAsDataURL(profilePicture);
    } else {
        // If no picture is uploaded, generate resume without the picture
        generateResume();
    }

    function generateResume(profilePic: string = '') {
        // Generate resume content
        const profilePicHTML = profilePic ? `<img src="${profilePic}" alt="Profile Picture" style="width:150px;height:150px;object-fit:cover;border-radius:50%;">` : '';
        const resumeContent = `
            <div style="text-align: center;">
                ${profilePicHTML}
                <h1>${name}</h1>
            </div>
            <h2>Contact:</h2>
              <p><strong>Email:</strong> ${email}</p>
               <p><strong>Phone #:</strong> ${phone}</p>
            <p><strong>Address:</strong> ${address}</p>
           
          
            <h2>Education</h2>
        <p >${education.split(',').map(item => `<p>${item.trim()}</p>`).join('')}</p>
            <h2>Experience:</h2>
            <p>${experience}</p>
            <h2>Skills:</h2>
            <p>${skills}</p>
        `;   // Generate unique URL (Assuming you have a domain, for now using local URL as placeholder)
        const uniqueURL = `${window.location.origin}/index.html?username=${username}`;
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
downloadPdfButton.addEventListener("click", () => {
    window.print();
});

// Copy link functionality
document.getElementById("copyLink")?.addEventListener("click", () => {
    shareLinkInput.select();
    document.execCommand("copy");
    alert("Link copied to clipboard!");
});

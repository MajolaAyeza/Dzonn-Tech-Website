console.log("Dzonn Tech Website Loaded");

// Application Modal Handler
document.addEventListener("DOMContentLoaded", function() {
    const applicationModal = document.getElementById("applicationModal");
    const jobTitleSpan = document.getElementById("jobTitle");
    const jobPositionInput = document.getElementById("jobPosition");
    
    // Update job title when modal is triggered
    if (applicationModal) {
        applicationModal.addEventListener("show.bs.modal", function(event) {
            const button = event.relatedTarget;
            const jobTitle = button.getAttribute("data-job");
            jobTitleSpan.textContent = jobTitle;
            jobPositionInput.value = jobTitle;
        });
    }

    // Handle form submission
    const submitBtn = document.getElementById("submitApplicationBtn");
    const applicationForm = document.getElementById("applicationForm");
    
    if (submitBtn) {
        submitBtn.addEventListener("click", function() {
            if (applicationForm.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
                applicationForm.classList.add("was-validated");
                return;
            }

            // Collect form data
            const jobPosition = document.getElementById("jobPosition").value;
            const applicantName = document.getElementById("applicantName").value;
            const applicantEmail = document.getElementById("applicantEmail").value;
            const applicantPhone = document.getElementById("applicantPhone").value;
            const coverLetter = document.getElementById("applicantCoverLetter").value;

            // Create email subject and message
            const emailSubject = "New Career Application for " + jobPosition;
            const emailMessage = "\nNew Application Received:\n\nPosition: " + jobPosition + "\nName: " + applicantName + "\nEmail: " + applicantEmail + "\nPhone: " + applicantPhone + "\n\nCover Letter:\n" + coverLetter + "\n\n---\nThis application was submitted from the Dzonn Tech website.";

            // Send email using FormSubmit.co (free service)
            const formAction = "https://formsubmit.co/info@dzonntech.co.za";
            
            // Create a temporary form for submission
            const tempForm = document.createElement("form");
            tempForm.method = "POST";
            tempForm.action = formAction;
            tempForm.style.display = "none";

            // Add form fields
            const fields = {
                "email": applicantEmail,
                "subject": emailSubject,
                "message": emailMessage,
                "_captcha": "false",
                "_next": window.location.href
            };

            for (const [key, value] of Object.entries(fields)) {
                const input = document.createElement("input");
                input.type = "hidden";
                input.name = key;
                input.value = value;
                tempForm.appendChild(input);
            }

            document.body.appendChild(tempForm);
            
            // Show success notification
            showSuccessNotification();

            // Close modal
            const modal = bootstrap.Modal.getInstance(applicationModal);
            if (modal) {
                modal.hide();
            }

            // Reset form
            applicationForm.reset();
            applicationForm.classList.remove("was-validated");

            // Submit the form after a short delay
            setTimeout(() => {
                tempForm.submit();
                document.body.removeChild(tempForm);
            }, 500);
        });
    }
});

// Program Form Submission Handler
document.addEventListener("DOMContentLoaded", function() {
    const programSubmitButtons = document.querySelectorAll(".programSubmitBtn");
    
    programSubmitButtons.forEach(button => {
        button.addEventListener("click", function() {
            const formId = this.getAttribute("data-form");
            const programType = this.getAttribute("data-type");
            const form = document.getElementById(formId);
            
            if (!form) return;
            
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
                form.classList.add("was-validated");
                return;
            }

            // Collect form data
            const formData = new FormData(form);
            const dataObj = Object.fromEntries(formData);
            
            // Create appropriate subject based on program type
            let emailSubject = "";
            let emailMessage = "";
            
            switch(programType) {
                case "graduate":
                    emailSubject = "New Graduate Registration - " + dataObj.name;
                    emailMessage = "\nNew Graduate Registration Received:\n\nName: " + dataObj.name + "\nEmail: " + dataObj.email + "\nPhone: " + dataObj.phone + "\nUniversity: " + dataObj.university + "\nDegree: " + dataObj.degree + "\nGraduation Date: " + dataObj.graduationDate + "\nAreas of Interest:\n" + dataObj.interests + "\n\n---\nThis registration was submitted from the Dzonn Tech website.";
                    break;
                case "employer":
                    emailSubject = "New Employer Registration - " + dataObj.companyName;
                    emailMessage = "\nNew Employer Registration Received:\n\nCompany: " + dataObj.companyName + "\nEmail: " + dataObj.email + "\nContact Person: " + dataObj.contactPerson + "\nPhone: " + dataObj.phone + "\nIndustry: " + dataObj.industry + "\nNumber of Employees: " + dataObj.employees + "\nInterests:\n" + dataObj.interests + "\n\n---\nThis registration was submitted from the Dzonn Tech website.";
                    break;
                case "internship":
                    emailSubject = "New Internship Application - " + dataObj.name;
                    emailMessage = "\nNew Internship Application Received:\n\nName: " + dataObj.name + "\nEmail: " + dataObj.email + "\nPhone: " + dataObj.phone + "\nInterested Position: " + dataObj.position + "\n\nMotivation:\n" + dataObj.motivation + "\n\n---\nThis application was submitted from the Dzonn Tech website.";
                    break;
                case "learnership":
                    emailSubject = "New Learnership Registration - " + dataObj.name;
                    emailMessage = "\nNew Learnership Registration Received:\n\nName: " + dataObj.name + "\nEmail: " + dataObj.email + "\nPhone: " + dataObj.phone + "\nPreferred Learnership: " + dataObj.learnershipType + "\nExperience Level: " + dataObj.experienceLevel + "\n\n---\nThis registration was submitted from the Dzonn Tech website.";
                    break;
                case "talent-pool":
                    emailSubject = "New Talent Pool Registration - " + dataObj.name;
                    emailMessage = "\nNew Talent Pool Registration Received:\n\nName: " + dataObj.name + "\nEmail: " + dataObj.email + "\nPhone: " + dataObj.phone + "\nJob Title: " + dataObj.jobTitle + "\nYears of Experience: " + dataObj.experience + "\n\nKey Skills:\n" + dataObj.skills + "\n\nPreferred Role Types: " + dataObj.roleType + "\n\n---\nThis registration was submitted from the Dzonn Tech website.";
                    break;
                case "partner":
                    emailSubject = "New Partnership Inquiry - " + dataObj.organizationName;
                    emailMessage = "\nNew Partnership Inquiry Received:\n\nOrganization: " + dataObj.organizationName + "\nEmail: " + dataObj.email + "\nContact Person: " + dataObj.contactPerson + "\nPhone: " + dataObj.phone + "\nPartnership Type: " + dataObj.partnershipType + "\n\nProposal:\n" + dataObj.proposal + "\n\n---\nThis inquiry was submitted from the Dzonn Tech website.";
                    break;
            }

            // Submit using FormSubmit.co
            const formAction = "https://formsubmit.co/info@dzonntech.co.za";
            
            // Create a temporary form for submission
            const tempForm = document.createElement("form");
            tempForm.method = "POST";
            tempForm.action = formAction;
            tempForm.style.display = "none";

            // Add form fields
            const fields = {
                "email": dataObj.email,
                "subject": emailSubject,
                "message": emailMessage,
                "_captcha": "false",
                "_next": window.location.href
            };

            for (const [key, value] of Object.entries(fields)) {
                const input = document.createElement("input");
                input.type = "hidden";
                input.name = key;
                input.value = value;
                tempForm.appendChild(input);
            }

            document.body.appendChild(tempForm);
            
            // Show success notification
            showSuccessNotification();

            // Close modal
            const modalId = form.closest(".modal").id;
            const modal = bootstrap.Modal.getInstance(document.getElementById(modalId));
            if (modal) {
                modal.hide();
            }

            // Reset form
            form.reset();
            form.classList.remove("was-validated");

            // Submit the form after a short delay
            setTimeout(() => {
                tempForm.submit();
                document.body.removeChild(tempForm);
            }, 500);
        });
    });
});

// Success Notification Function
function showSuccessNotification() {
    const notification = document.getElementById("successNotification");
    if (notification) {
        notification.style.display = "block";
        notification.classList.add("show");
        
        // Auto-hide after 6 seconds
        setTimeout(() => {
            notification.style.display = "none";
        }, 6000);
    }
}
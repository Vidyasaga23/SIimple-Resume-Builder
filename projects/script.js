// Function to update the resume preview
function updateResume() {
    const name = document.getElementById('name').value;
    const title = document.getElementById('title').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const linkedin = document.getElementById('linkedin').value;
    const summary = document.getElementById('summary').value;
    const skills = document.getElementById('skills').value;
     const mainTitleElement = document.getElementById('mainTitle');
    if (name) {
        mainTitleElement.textContent = `${name}`;
        // Optionally, also update the browser tab title
        document.title = `${name}`;
    } else {
        mainTitleElement.textContent = 'Simple Resume Builder';
        document.title = 'Simple Resume Builder';
    }

    let previewHtml = '';

    // Header Section
    if (name || title || email || phone || linkedin) {
        previewHtml += `<div class="preview-header">`;
        if (name) previewHtml += `<h2>${name}</h2>`;
        if (title) previewHtml += `<p>${title}</p>`;
        
        let contactInfo = [];
        if (email) contactInfo.push(email);
        if (phone) contactInfo.push(phone);
        if (linkedin) contactInfo.push(`<a href="${linkedin}" target="_blank">${linkedin.replace(/^(https?:\/\/)?(www\.)?linkedin\.com\/in\//, '')}</a>`);
        
        if (contactInfo.length > 0) {
            previewHtml += `<p>${contactInfo.join(' | ')}</p>`;
        }
        previewHtml += `</div>`;
    }

    // Summary Section
    if (summary) {
        previewHtml += `
            <div class="preview-section">
                <h3>Summary</h3>
                <p>${summary.replace(/\n/g, '<br>')}</p>
            </div>
        `;
    }

    // Experience Section
    const experienceItems = document.querySelectorAll('.experience-item');
    if (experienceItems.length > 0) {
        let experienceContent = '';
        experienceItems.forEach((item, index) => {
            const jobTitle = item.querySelector(`#jobTitle-${index}`).value;
            const company = item.querySelector(`#company-${index}`).value;
            const durationExp = item.querySelector(`#durationExp-${index}`).value;
            const descriptionExp = item.querySelector(`#descriptionExp-${index}`).value;

            if (jobTitle || company || durationExp || descriptionExp) {
                experienceContent += `
                    <div class="preview-item">
                        <h4>${jobTitle} at ${company}</h4>
                        <p>${durationExp}</p>
                        <p>${descriptionExp.replace(/\n/g, '<br>')}</p>
                    </div>
                `;
            }
        });
        if (experienceContent) {
            previewHtml += `
                <div class="preview-section">
                    <h3>Experience</h3>
                    ${experienceContent}
                </div>
            `;
        }
    }

    // Education Section
    const educationItems = document.querySelectorAll('.education-item');
    if (educationItems.length > 0) {
        let educationContent = '';
        educationItems.forEach((item, index) => {
            const degree = item.querySelector(`#degree-${index}`).value;
            const university = item.querySelector(`#university-${index}`).value;
            const durationEdu = item.querySelector(`#durationEdu-${index}`).value;
            const descriptionEdu = item.querySelector(`#descriptionEdu-${index}`).value;

            if (degree || university || durationEdu || descriptionEdu) {
                educationContent += `
                    <div class="preview-item">
                        <h4>${degree} from ${university}</h4>
                        <p>${durationEdu}</p>
                        <p>${descriptionEdu.replace(/\n/g, '<br>')}</p>
                    </div>
                `;
            }
        });
        if (educationContent) {
            previewHtml += `
                <div class="preview-section">
                    <h3>Education</h3>
                    ${educationContent}
                </div>
            `;
        }
    }

    // Skills Section
    if (skills) {
        const skillsArray = skills.split(',').map(skill => skill.trim()).filter(skill => skill !== '');
        if (skillsArray.length > 0) {
            previewHtml += `
                <div class="preview-section">
                    <h3>Skills</h3>
                    <ul>`;
            skillsArray.forEach(skill => {
                previewHtml += `<li>${skill}</li>`;
            });
            previewHtml += `</ul></div>`;
        }
    }

    document.getElementById('preview-content').innerHTML = previewHtml;
}

// Function to add a new experience section
let experienceCounter = 0;
function addExperience() {
    const container = document.getElementById('experience-container');
    const newDiv = document.createElement('div');
    newDiv.classList.add('experience-item');
    newDiv.innerHTML = `
        <input type="text" id="jobTitle-${experienceCounter}" placeholder="Job Title" oninput="updateResume()">
        <input type="text" id="company-${experienceCounter}" placeholder="Company" oninput="updateResume()">
        <input type="text" id="durationExp-${experienceCounter}" placeholder="Start Date - End Date (e.g., Jan 2020 - Dec 2022)" oninput="updateResume()">
        <textarea id="descriptionExp-${experienceCounter}" placeholder="Job Responsibilities (use new lines for bullet points)" rows="3" oninput="updateResume()"></textarea>
        <button class="remove-btn" onclick="removeSection(this, 'experience')">Remove</button>
    `;
    container.appendChild(newDiv);
    experienceCounter++;
    updateResume(); // Update preview after adding new section
}

// Function to add a new education section
let educationCounter = 0;
function addEducation() {
    const container = document.getElementById('education-container');
    const newDiv = document.createElement('div');
    newDiv.classList.add('education-item');
    newDiv.innerHTML = `
        <input type="text" id="degree-${educationCounter}" placeholder="Degree/Field of Study" oninput="updateResume()">
        <input type="text" id="university-${educationCounter}" placeholder="University/Institution" oninput="updateResume()">
        <input type="text" id="durationEdu-${educationCounter}" placeholder="Start Year - End Year (e.g., 2018 - 2022)" oninput="updateResume()">
        <textarea id="descriptionEdu-${educationCounter}" placeholder="Achievements/Relevant Coursework" rows="2" oninput="updateResume()"></textarea>
        <button class="remove-btn" onclick="removeSection(this, 'education')">Remove</button>
    `;
    container.appendChild(newDiv);
    educationCounter++;
    updateResume(); // Update preview after adding new section
}

// Function to remove a section (experience or education)
function removeSection(button, type) {
    const itemToRemove = button.parentNode;
    itemToRemove.remove();
    // After removing, we need to re-index the IDs to keep them sequential,
    // or just rely on querySelectorAll to get the current state.
    // For simplicity, we'll just re-render the preview.
    updateResume();
}

// Function to print the resume
function printResume() {
    window.print();
}

// Initial update when the page loads
document.addEventListener('DOMContentLoaded', updateResume);

// Add initial sections so there's something to see
document.addEventListener('DOMContentLoaded', () => {
    addExperience(); // Add one default experience section
    addEducation();  // Add one default education section
});
const students = [
    { id: 1, name: 'Alice', teachers: [1, 2] },
    { id: 2, name: 'Bob', teachers: [1] },
    { id: 3, name: 'Charlie', teachers: [2] },
    { id: 4, name: 'Siva', teachers: [3] }
];

const teachers = [
    { id: 1, name: 'Mr. Smith' },
    { id: 2, name: 'Dr. Brown' },
    {id:3,name:'dr. smith'}
];

function populateStudents() {
    const studentDropdown = document.getElementById('studentDropdown');
    studentDropdown.innerHTML = '';  // Clear previous entries

    students.forEach(student => {
        const option = document.createElement('option');
        option.value = student.id;
        option.textContent = student.name;
        studentDropdown.appendChild(option);
    });

    // Add the "Add New" option at the end
    const addNewOption = document.createElement('option');
    addNewOption.value = "";
    addNewOption.textContent = "-- Add New --";
    studentDropdown.appendChild(addNewOption);
}

populateStudents();

document.getElementById('studentDropdown').addEventListener('change', function() {
    if (this.value == "") {
        document.getElementById('addStudentFields').style.display = 'block';
        document.getElementById('teacherDisplay').innerHTML = ''; // Clear teacher display
    } else {
        document.getElementById('addStudentFields').style.display = 'none';
        const selectedStudent = students.find(student => student.id == this.value);
        const teacherNames = selectedStudent.teachers.map(teacherId => teachers.find(t => t.id == teacherId).name);
        displayTeachers(teacherNames);
    }
});

document.getElementById('addStudentBtn').addEventListener('click', function() {
    const studentName = document.getElementById('newStudentName').value;
    const teacherName = document.getElementById('assignedTeacherName').value;

    if (!studentName || !teacherName) {
        alert('Both student and teacher names are required!');
        return;
    }

    // Check if teacher exists, if not, add
    let teacher = teachers.find(t => t.name == teacherName);
    if (!teacher) {
        teacher = { id: teachers.length + 1, name: teacherName };
        teachers.push(teacher);
    }

    // Add new student with assigned teacher
    const newStudent = { id: students.length + 1, name: studentName, teachers: [teacher.id] };
    students.push(newStudent);

    populateStudents();
});

function displayTeachers(teacherNames) {
    const teacherDisplay = document.getElementById('teacherDisplay');
    teacherDisplay.innerHTML = '';  // Clear previous entries

    teacherNames.forEach(name => {
        const div = document.createElement('div');
        div.textContent = name;
        div.classList.add('teacherName'); // Add class for click event
        div.style.cursor = 'pointer';
        teacherDisplay.appendChild(div);
    });
}

document.getElementById('teacherDisplay').addEventListener('click', function(event) {
    if (event.target.classList.contains('teacherName')) {
        const selectedTeacherName = event.target.textContent;
        const selectedTeacher = teachers.find(teacher => teacher.name == selectedTeacherName);
        const studentNames = students.filter(student => student.teachers.includes(selectedTeacher.id)).map(student => student.name);
        alert(`Students taught by ${selectedTeacherName}: ${studentNames.join(', ')}`);

    }
});

// ... [Existing code] ...

// Enable "Generate Certificate" button when student and teacher are selected
document.getElementById('studentDropdown').addEventListener('change', function() {
    const generateCertificateBtn = document.getElementById('generateCertificateBtn');
    if (this.value != "") {
        generateCertificateBtn.disabled = false;
    } else {
        generateCertificateBtn.disabled = true;
    }
});

// Generate the dummy certificate on button click
// ... [Existing code] ...

// Generate the dummy certificate on button click
document.getElementById('generateCertificateBtn').addEventListener('click', function() {
    const selectedStudent = students.find(student => student.id == document.getElementById('studentDropdown').value);
    const teacherNames = selectedStudent.teachers.map(teacherId => teachers.find(t => t.id == teacherId).name);

    // Get current date and format it
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`; // Format: dd/mm/yyyy

    document.getElementById('certStudentName').textContent = selectedStudent.name;
    document.getElementById('certTeacherName').textContent = teacherNames.join(' & ');
    document.getElementById('certDate').textContent = `Date: ${formattedDate}`; // Update date on the certificate
    document.getElementById('certificate').style.display = 'block';
});

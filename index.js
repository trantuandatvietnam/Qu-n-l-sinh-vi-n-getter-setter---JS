const Student = {
    storeKey: "STUDENT_KEY",
    isEdit: false,
    indexCurrentStudent: 0,
    data: [],
    load: function () {
        const jsonData = localStorage.getItem(this.storeKey);
        try {
            this.data = JSON.parse(jsonData);
        } catch (error) {
            alert("Lỗi, liên hệ quản trị viên qua dat130902@gmail.com");
        }
    },
    add: function (student) {
        this.data.push(student);
    },
    delete: function (index) {
        this.data.splice(index, 1);
    },
    edit: function (index, student) {
        this.data[index] = student;
    },
    save: function () {
        const json = JSON.stringify(this.data);
        localStorage.setItem(this.storeKey, json);
    },
    get studentList() {
        return this.data;
    },
    get statusCreateBtn() {
        return this.isEdit;
    },
    set statusCreateBtn(status) {
        this.isEdit = status;
    },
    set indexCurrent(index) {
        this.indexCurrentStudent = index;
    },
    get indexCurrent() {
        return this.indexCurrentStudent;
    }
}
//load student data from local storage
Student.load();
// render student from local storage list
renderStudent();

function onClickCreateStudent() {
    var name = getInputValue("name");
    var age = getInputValue("age");
    var phone = getInputValue("phone");
    var address = getInputValue("address");
    if (!Student.statusCreateBtn) {
        // Create student
        Student.add({
            name,
            age,
            phone,
            address,
        })
    } else {
        // edit student
        Student.edit(Student.indexCurrent, {
            name,
            age,
            phone,
            address,
        })
        setHtml("#button", "Create");
        clearInputValue();
        Student.statusCreateBtn = false;
    }
    Student.save();
    clearInputValue();
    renderStudent();
}

function clearInputValue() {
    setInputValue("#name", "");
    setInputValue("#age", "");
    setInputValue("#phone", "");
    setInputValue("#address", "");
}

function getInputValue(selector) {
    var element = document.getElementById(selector);
    var elementValue = element.value;
    return elementValue;
}

function renderStudent() {
    let htmls;
    var studentList = Student.studentList;
    htmls = studentList.map((student, index) => {
        return `<li class="student">
                    <p><span>Name: </span>${student.name}</p>
                    <p><span>Age: </span>${student.age}</p>
                    <p><span>Phone: </span>${student.phone}</p>
                    <p><span>Addess: </span>${student.address}</p>
                    <i class="student-delete" onclick={onDeleteStudent(${index})}>x</i>
                    <i class="student-edit" onclick={onEditStudent(${index})}>Edit</i>
                </li>`
    })
    setHtml("#students-list", htmls.join(""));
}
// function setHtml
function setHtml(selector, html) {
    var element = document.querySelector(selector);
    element.innerHTML = html;
}

function onDeleteStudent(index) {
    if (confirm("Are you sure you want to delete")) {
        Student.delete(index);
    }
    Student.save();
    renderStudent();
}

function onEditStudent(index) {
    var student = Student.studentList[index];
    Student.indexCurrent = index;
    setInputValue("#name", getDataStudent(student, "name"));
    setInputValue("#age", getDataStudent(student, "age"));
    setInputValue("#phone", getDataStudent(student, "phone"));
    setInputValue("#address", getDataStudent(student, "address"));
    setHtml("#button", "Save");
    Student.statusCreateBtn = true;
}

function getDataStudent(student, key) {
    return student[key];
}

function setInputValue(selector, value) {
    var element = document.querySelector(selector);
    element.value = value;
}

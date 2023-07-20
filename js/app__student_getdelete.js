const search = document.getElementById('student-search')
/* ELEMENTOS DO LOGIN CONTÍNUO */
const loginLocalStorage = localStorage
document.getElementById('loginUser').innerText = loginLocalStorage.user
document.getElementById('loginEmail').innerText = loginLocalStorage.email

/* -----------GET----------- */
/* INJETANDO CONTEUDO NO HTML */
const inputStudents = async (students) => {
    const content = document.getElementById('table-content')
    content.innerHTML = ''
    students.forEach(student => {
        content.innerHTML = content.innerHTML + `
        <tr class="itemTable">
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td class="rightSectionTableIcon"><span onclick="editStudent(${student.id})"><img src="../img/edit.png" alt=""></span><span onclick="deleteStudent(${student.id})"><img src="../img/delete.png" alt=""></span></td>
        </tr>
        `
    });
}

/* RECUPERANDO OS DADOS DA API */
const getStudents = async (textParameter = null) => {
    let text = ''
    if(textParameter) {
        text = textParameter
    }
    const response = await fetch(`http://localhost:3000/student${text}`)
    const students = await response.json()
    inputStudents(students)
}

/* -----------PUT(REDIRECIONAMENTO)----------- */
const editStudent = (id) => {
    window.location = `edit__student.html?id=${id}`
}

/* -----------DELETE----------- */
const deleteStudent = async (id) => {
    await fetch(`http://localhost:3000/student/${id}`, {
        method: 'DELETE'
    })
    window.location = 'home__mentor.html'
}

/* ORDENAÇÃO */
const sorting = (text, id) => {
    const selectedTableHead = document.getElementById(id)
    if(selectedTableHead.innerText === "⇓") {
        getStudents(`?_sort=${text}&_order=DESC`)
        selectedTableHead.innerText = "⇑"
    }
    else if(selectedTableHead.innerText === "⇑") {
        getStudents(`?_sort=${text}&_order=ASC`)
        selectedTableHead.innerText = "⇓"
    }
}

/* PESQUISA COM ENVIO COMPLETO DE PARÂMETRO */
search.addEventListener('keyup', element => {
    const text = search.value
    if(text === '') {
        getStudents()
    } else if(element.key === 'Enter') {
        getStudents(`?q=${text}`)
    }
})

getStudents()
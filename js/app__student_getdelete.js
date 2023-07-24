const search = document.getElementById('student-search')
/* ELEMENTOS DO LOGIN CONTÍNUO */
const loginLocalStorage = localStorage
document.getElementById('loginUser').innerText = loginLocalStorage.user
document.getElementById('loginEmail').innerText = loginLocalStorage.email

/* CONTADOR DA PÁGINA E QUANTIDADE MÁXIMA DE ITENS */
let currentPage = 1
let maxItensAPI

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
    fixArrows()
}

/* RECUPERANDO OS DADOS DA API */
const getStudents = async (textParameter = null) => {
    let text = `?_page=${currentPage}&_limit=5`
    if(textParameter) {
        text = textParameter
    }
    const response = await fetch(`https://api-mentor-class.onrender.com/student${text}`)
    maxItensAPI = parseInt(response.headers.get('x-total-count'))
    const students = await response.json()
    inputStudents(students)
}

/* -----------PUT(REDIRECIONAMENTO)----------- */
const editStudent = (id) => {
    window.location = `edit__student.html?id=${id}`
}

/* -----------DELETE----------- */
const deleteStudent = async (id) => {
    await fetch(`https://api-mentor-class.onrender.com/student/${id}`, {
        method: 'DELETE'
    })
    window.location = 'home__mentor.html'
}

/* PAGINAÇÃO */
const pagination = (operation) => {
    if(operation === '+' && currentPage<maxItensAPI/5) {
        currentPage++
        getStudents(`?_page=${currentPage}&_limit=5`)
    }
    if(operation === '-' && currentPage>1){
        currentPage--
        getStudents(`?_page=${currentPage}&_limit=5`)
    }
}

/* PAGINAÇÃO: CORREÇÃO DAS SETAS */

const fixArrows = () => {
    if(currentPage>=maxItensAPI/5 && currentPage === 1) {
        document.getElementById('next-arrow').classList = 'arrows hideArrow'
        document.getElementById('previous-arrow').classList = 'arrows hideArrow'
    } else if(currentPage>=maxItensAPI/5) {
        document.getElementById('next-arrow').classList = 'arrows hideArrow'
        document.getElementById('previous-arrow').classList = 'arrows'
    } else if(currentPage === 1) {
        document.getElementById('next-arrow').classList = 'arrows'
        document.getElementById('previous-arrow').classList = 'arrows hideArrow'
    } else {
        document.getElementById('next-arrow').classList = 'arrows'
        document.getElementById('previous-arrow').classList = 'arrows'
    }
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
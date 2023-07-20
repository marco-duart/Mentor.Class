const search = document.getElementById('class-search')
/* ELEMENTOS DO LOGIN CONTÍNUO */
const loginLocalStorage = localStorage
document.getElementById('loginUser').innerText = loginLocalStorage.user
document.getElementById('loginEmail').innerText = loginLocalStorage.email

/* -----------GET----------- */
/* INJETANDO CONTEUDO NO HTML */
const inputClasses = async (classes) => {
    const content = document.getElementById('table-content')
    content.innerHTML = ''
    classes.forEach(classUnit => {
        content.innerHTML = content.innerHTML + `
        <tr class="itemTable">
            <td>${classUnit.name}</td>
            <td>${classUnit.mentory.mentor.name}</td>
            <td>${classUnit.mentory.title}</td>
            <td>${classUnit.date}</td>
            <td>${classUnit.day}</td>
            <td>${classUnit.time.begin}h</td>
            <td>${classUnit.meet.done}/${classUnit.meet.total}</td>
            <td class="rightSectionTableIcon"><span onclick="editClass(${classUnit.id})"><img src="../img/edit.png" alt=""></span><span onclick="deleteClass(${classUnit.id})"><img src="../img/delete.png" alt=""></span></td>
        </tr>
        `
    });
}

/* RECUPERANDO OS DADOS DA API */
const getClasses = async (textParameter = null) => {
    let text = ''
    if(textParameter) {
        text = textParameter
    }
    const response = await fetch(`http://localhost:3000/class${text}`)
    const classes = await response.json()
    inputClasses(classes)
}

/* -----------PUT(REDIRECIONAMENTO)----------- */
const editClass = (id) => {
    window.location = `edit__class.html?id=${id}`
}

/* -----------DELETE----------- */
const deleteClass = async (id) => {
    await fetch(`http://localhost:3000/class/${id}`, {
        method: 'DELETE'
    })
    window.location = 'home__class.html'
}

/* ORDENAÇÃO */
const sorting = (text, id) => {
    const selectedTableHead = document.getElementById(id)
    if(selectedTableHead.innerText === "⇓") {
        getClasses(`?_sort=${text}&_order=DESC`)
        selectedTableHead.innerText = "⇑"
    }
    else if(selectedTableHead.innerText === "⇑") {
        getClasses(`?_sort=${text}&_order=ASC`)
        selectedTableHead.innerText = "⇓"
    }
}

/* PESQUISA COM ENVIO COMPLETO DE PARÂMETRO */
search.addEventListener('keyup', element => {
    const text = search.value
    if(text === '') {
        getClasses()
    } else if(element.key === 'Enter') {
        getClasses(`?q=${text}`)
    }
})

getClasses()
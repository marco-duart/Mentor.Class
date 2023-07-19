const search = document.getElementById('mentor-search')
/* ELEMENTOS DO LOGIN CONTÍNUO */
const loginLocalStorage = localStorage
document.getElementById('loginUser').innerText = loginLocalStorage.user
document.getElementById('loginEmail').innerText = loginLocalStorage.email

/* -----------GET----------- */
/* INJETANDO CONTEUDO NO HTML */
const inputMentors = async (mentors) => {
    const content = document.getElementById('table-content')
    content.innerHTML = ''
    mentors.forEach(mentor => {
        content.innerHTML = content.innerHTML + `
        <tr class="itemTable">
            <td>${mentor.name}</td>
            <td>${mentor.email}</td>
            <td class="optionIco"><span onclick="editMentor(${mentor.id})"><img src="../img/edit.png" alt=""></span><span onclick="deleteMentor(${mentor.id})"><img src="../img/delete.png" alt=""></span></td>
        </tr>
        `
    });
}

/* RECUPERANDO OS DADOS DA API */
const getMentors = async (textParameter = null) => {
    let text = ''
    if(textParameter) {
        text = textParameter
    }
    const response = await fetch(`http://localhost:3000/mentor${text}`)
    const mentors = await response.json()
    inputMentors(mentors)
}

/* -----------PUT(REDIRECIONAMENTO)----------- */
const editMentor = (id) => {
    window.location = `edit__mentor.html?id=${id}`
}

/* -----------DELETE----------- */
const deleteMentor = async (id) => {
    await fetch(`http://localhost:3000/mentor/${id}`, {
        method: 'DELETE'
    })
    window.location = 'home__mentor.html'
}

/* ORDENAÇÃO */
const sorting = (text, id) => {
    const selectedTableHead = document.getElementById(id)
    if(selectedTableHead.innerText === "⇓") {
        getMentors(`?_sort=${text}&_order=DESC`)
        selectedTableHead.innerText = "⇑"
    }
    else if(selectedTableHead.innerText === "⇑") {
        getMentors(`?_sort=${text}&_order=ASC`)
        selectedTableHead.innerText = "⇓"
    }
}

/* PESQUISA COM ENVIO COMPLETO DE PARÂMETRO */
search.addEventListener('keyup', element => {
    const text = search.value
    if(text === '') {
        getMentors()
    } else if(element.key === 'Enter') {
        getMentors(`?q=${text}`)
    }
})

getMentors()
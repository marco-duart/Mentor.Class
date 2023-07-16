const search = document.getElementById('mentor-search')

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
        text = `?q=${textParameter}`
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

search.addEventListener('keyup', element => {
    const text = search.value
    if(text === '') {
        getMentors()
    } else if(element.key === 'Enter') {
        getMentors(text)
    }
})

getMentors()
const search = document.getElementById('mentory-search')

/* -----------GET----------- */
/* INJETANDO CONTEUDO NO HTML */
const inputMentories = async (mentories) => {
    const content = document.getElementById('table-content')
    content.innerHTML = ''
    mentories.forEach(mentory => {
        content.innerHTML = content.innerHTML + `
        <tr class="itemTable">
            <td>${mentory.title}</td>
            <td>${mentory.mentor.name}</td>
            <td>${mentory.status}</td>
            <td class="optionIco"><span onclick="editMentory(${mentory.id})"><img src="../img/edit.png" alt=""></span><span onclick="deleteMentory(${mentory.id})"><img src="../img/delete.png" alt=""></span></td>
        </tr>
        `
    });
}

/* RECUPERANDO OS DADOS DA API */
const getMentories = async (textParameter = null) => {
    let text = ''
    if(textParameter) {
        text = `?q=${textParameter}`
    }
    const response = await fetch(`http://localhost:3000/mentory${text}`)
    const mentories = await response.json()
    inputMentories(mentories)
}

/* -----------PUT(REDIRECIONAMENTO)----------- */
const editMentory = (id) => {
    window.location = `edit__mentory.html?id=${id}`
}

/* -----------DELETE----------- */
const deleteMentory = async (id) => {
    await fetch(`http://localhost:3000/mentory/${id}`, {
        method: 'DELETE'
    })
    window.location = 'home__mentory.html'
}

search.addEventListener('keyup', element => {
    const text = search.value
    if(text === '') {
        getMentories()
    } else if(element.key === 'Enter') {
        getMentories(text)
    }
})

getMentories()
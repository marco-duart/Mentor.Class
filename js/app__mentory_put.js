const formEditMentory = document.getElementById('edit-mentory')
/* ELEMENTOS DO LOGIN CONTÍNUO */
const loginLocalStorage = localStorage
document.getElementById('loginUser').innerText = loginLocalStorage.user
document.getElementById('loginEmail').innerText = loginLocalStorage.email

let mentoryID = null

/* -----------PUT----------- */

// RECUPERANDO O ID ATRAVÉS DA URL DA PAGINA REDIRECIONADA
const getIdUrl = () => {
    const paramString = window.location.search
    const pararms = new URLSearchParams(paramString)
    mentoryID = pararms.get('id')
}

const searchMentory = async (mentoryID) => {
    const response = await fetch(`${urlAPI}/mentory/${mentoryID}`)
    const mentory = await response.json()
    return mentory
} 

/* CHAMANDO EVENTO DE ENVIO DO FORMULARIO DE EDIÇÃO */
formEditMentory.addEventListener('submit', async element => {
    element.preventDefault()
    const title = formEditMentory.elements['title'].value
    const mentor = formEditMentory.elements['mentor'].value
    
    let status
    let checkbox = document.getElementById('status')
    if(checkbox.checked)
    {
        status = 'Ativo'
    }
    else if (!checkbox.checked)
    {
        status = 'Inativo'
    }

    const mentorObjet = await getMentor(mentor)
    const mentory = {
        title,
        mentor: {
            name: mentorObjet.name,
            id: mentorObjet.id
        },
        status
    }
    editMentory(mentory)
})

/* CARREGANDO DADOS RECUPERADOS NO FORMULARIO */
const loadForm = async (mentory) => {
    document.getElementById('title').value = mentory.title
    document.getElementById('mentor-list').value = mentory.mentor.id
    let checkbox = document.getElementById('status')
    let status = mentory.status
    if(status === 'Ativo')
    {
        checkbox.setAttribute('checked', 'checked')
    }
    else if (status === 'Inativo')
    {
        checkbox.removeAttribute('checked')
    }
}

/* APÓS RECUPERADO OS DADOS DO FORMULARIO, ENVIANDO OS DADOS PARA A API */
const editMentory = async (mentory) => {
    await fetch(`${urlAPI}/mentory/${mentoryID}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(mentory)
    })
    window.location = 'home__mentory.html'
}

/* RECUPERANDO TODA LISTA DE MENTORES*/
const getMentors = async () => {
    const response = await fetch(`${urlAPI}/mentor`)
    const mentors = await response.json()
    return mentors
}

/* RECUPERANDO O MENTOR SELECIONADO*/
const getMentor = async (id) => {
    const resposta = await fetch(`${urlAPI}/mentor/${id}`)
    const mentor = await resposta.json()
    return mentor
}

/* INJETANDO TODA A LISTA DE MENTORES NO SELECT*/
const loadSelect = async () => {
    const selectMentor = document.getElementById('mentor-list')
    const mentors = await getMentors()

    const voidOption = new Option('Selecione uma opção...')
    voidOption.selected = true
    voidOption.disabled = true
    selectMentor.options.add(voidOption)

    mentors.forEach(mentor => {
        const option = new Option(mentor.name, mentor.id)
        selectMentor.options.add(option)
    })
}

const loadData = async () => {
    loadSelect()
    getIdUrl()
    const mentory = await searchMentory(mentoryID)
    loadForm(mentory)
}

loadData()
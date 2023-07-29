const formNewClass = document.getElementById('new-class')
/* ELEMENTOS DO LOGIN CONTÍNUO */
const loginLocalStorage = localStorage
document.getElementById('loginUser').innerText = loginLocalStorage.user
document.getElementById('loginEmail').innerText = loginLocalStorage.email


/* -----------POST----------- */
/* CHAMANDO EVENTO DE ENVIO DO FORMULARIO DE CADASTRO */
formNewClass.addEventListener('submit', async element => {
    element.preventDefault()
    const mentory = formNewClass.elements['mentory-list'].value
    const mentor = formNewClass.elements['mentor-list'].value
    const date = formNewClass.elements['date'].value
    const day = formNewClass.elements['day'].value
    const begin = formNewClass.elements['begin-time'].value
    const end = formNewClass.elements['end-time'].value
    const name = formNewClass.elements['name-class'].value
    const link = formNewClass.elements['link-class'].value
    const total = formNewClass.elements['meet-count'].value


    const mentoryObjet = await getMentory(mentory)
    const mentorObjet = await getMentor(mentor)
    const classUnit = {
        name,
        mentory: {
            title: mentoryObjet.title,
            mentor: {
                name: mentorObjet.name,
                id: mentorObjet.id
            },
            id: mentoryObjet.id
        },
        date,
        day,
        time: {
            begin,
            end
        },
        meet: {
            total,
            done: "0"
        },
        link
    }
    postClass(classUnit)
})

/* APÓS RECUPERADO OS DADOS DO FORMULARIO, ENVIANDO OS DADOS PARA A API */
const postClass = async (classUnit) => {
    await fetch(`${urlAPI}/class`, {
        method: 'POST',
        headers: {
            "Accept": 'aplication/json, text/plain, */*',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(classUnit)
    })
    window.location = 'home__class.html'
}

/* RECUPERANDO TODA LISTA DE MENTORES*/
const getMentors = async () => {
    const response = await fetch(`${urlAPI}/mentor`)
    const mentors = await response.json()
    return mentors
}

const getMentor = async (id) => {
    const resposta = await fetch(`${urlAPI}/mentor/${id}`)
    const mentor = await resposta.json()
    return mentor
}

const loadSelectMentor = async () => {
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


/* RECUPERANDO TODA LISTA DE MENTORIAS*/
const getMentories = async () => {
    const response = await fetch(`${urlAPI}/mentory`)
    const mentories = await response.json()
    return mentories
}

const getMentory = async (id) => {
    const resposta = await fetch(`${urlAPI}/mentory/${id}`)
    const mentory = await resposta.json()
    return mentory
}

const loadSelectMentory = async () => {
    const selectMentory = document.getElementById('mentory-list')
    const mentories = await getMentories()

    const voidOption = new Option('Selecione uma opção...')
    voidOption.selected = true
    voidOption.disabled = true
    selectMentory.options.add(voidOption)

    mentories.forEach(mentory => {
        const option = new Option(mentory.title, mentory.id)
        selectMentory.options.add(option)
    })
}

loadSelectMentory()
loadSelectMentor()
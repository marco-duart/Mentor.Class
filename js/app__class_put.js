const formEditClass = document.getElementById('edit-class')
/* ELEMENTOS DO LOGIN CONTÍNUO */
const loginLocalStorage = localStorage
document.getElementById('loginUser').innerText = loginLocalStorage.user
document.getElementById('loginEmail').innerText = loginLocalStorage.email
let classID = null

/* -----------PUT----------- */

// RECUPERANDO O ID ATRAVÉS DA URL DA PAGINA REDIRECIONADA
const getIdUrl = () => {
    const paramString = window.location.search
    const pararms = new URLSearchParams(paramString)
    classID = pararms.get('id')
}

const searchClass = async (classID) => {
    const response = await fetch(`https://api-mentor-class.onrender.com/class/${classID}`)
    const classUnit = await response.json()
    return classUnit
} 

/* CHAMANDO EVENTO DE ENVIO DO FORMULARIO DE EDIÇÃO */
formEditClass.addEventListener('submit', async element => {
    element.preventDefault()
    const mentory = formEditClass.elements['mentory-list'].value
    const mentor = formEditClass.elements['mentor-list'].value
    const date = formEditClass.elements['date'].value
    const day = formEditClass.elements['day'].value
    const begin = formEditClass.elements['begin-time'].value
    const end = formEditClass.elements['end-time'].value
    const name = formEditClass.elements['name-class'].value
    const link = formEditClass.elements['link-class'].value
    const total = formEditClass.elements['meet-count'].value


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
    editClass(classUnit)
})

/* CARREGANDO DADOS RECUPERADOS NO FORMULARIO */
const loadForm = async (classUnit) => {
    document.getElementById('mentory-list').value = classUnit.mentory.id
    document.getElementById('mentor-list').value = classUnit.mentory.mentor.id
    document.getElementById('date').value = classUnit.date
    document.getElementById('day-list').value = classUnit.day
    document.getElementById('begin-time').value = classUnit.time.begin
    document.getElementById('end-time').value = classUnit.time.end
    document.getElementById('name-class').value = classUnit.name
    document.getElementById('link-class').value = classUnit.link
    document.getElementById('meet-count').value = classUnit.meet.total
}

/* APÓS RECUPERADO OS DADOS DO FORMULARIO, ENVIANDO OS DADOS PARA A API */
const editClass = async (classUnit) => {
    await fetch(`https://api-mentor-class.onrender.com/class/${classID}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(classUnit)
    })
    window.location = 'home__class.html'
}

/* RECUPERANDO TODA LISTA DE MENTORES*/
const getMentors = async () => {
    const response = await fetch('https://api-mentor-class.onrender.com/mentor')
    const mentors = await response.json()
    return mentors
}

const getMentor = async (id) => {
    const resposta = await fetch(`https://api-mentor-class.onrender.com/mentor/${id}`)
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
    const response = await fetch('https://api-mentor-class.onrender.com/mentory')
    const mentories = await response.json()
    return mentories
}

const getMentory = async (id) => {
    const resposta = await fetch(`https://api-mentor-class.onrender.com/mentory/${id}`)
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

const loadData = async () => {
    loadSelectMentory()
    loadSelectMentor()
    getIdUrl()
    const classUnit = await searchClass(classID)
    loadForm(classUnit)
}

loadData()
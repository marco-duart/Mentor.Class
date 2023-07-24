const formNewMentory = document.getElementById('new-mentory')
const checkBox = document.getElementById('status')
/* ELEMENTOS DO LOGIN CONTÍNUO */
const loginLocalStorage = localStorage
document.getElementById('loginUser').innerText = loginLocalStorage.user
document.getElementById('loginEmail').innerText = loginLocalStorage.email


/* -----------POST----------- */
/* CHAMANDO EVENTO DE ENVIO DO FORMULARIO DE CADASTRO */
formNewMentory.addEventListener('submit', async element => {
    element.preventDefault()
    const title = formNewMentory.elements['title'].value
    const mentor = formNewMentory.elements['mentor'].value
    
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
    postMentory(mentory)
})

/* APÓS RECUPERADO OS DADOS DO FORMULARIO, ENVIANDO OS DADOS PARA A API */
const postMentory = async (mentory) => {
    await fetch('https://api-mentor-class.onrender.com/mentory', {
        method: 'POST',
        headers: {
            "Accept": 'aplication/json, text/plain, */*',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(mentory)
    })
    window.location = 'home__mentory.html'
}

/* RECUPERANDO TODA LISTA DE MENTORES, PORÉM VOU UTILIZAR O ID E NOME APENAS */
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

loadSelect()
const formNewMentory = document.getElementById('new-mentory')
const checkBox = document.getElementById('status')


/* -----------POST----------- */
/* CHAMANDO EVENTO DE ENVIO DO FORMULARIO DE CADASTRO */
formNewMentory.addEventListener('submit', async element => {
    element.preventDefault()
    const title = formNewMentory.elements['title'].value
    const mentor = formNewMentory.elements['mentor'].value
    const status = formNewMentory.elements['status'].value

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
    await fetch('http://localhost:3000/mentory', {
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
    const response = await fetch('http://localhost:3000/mentor')
    const mentors = await response.json()
    return mentors
}

const getMentor = async (id) => {
    const resposta = await fetch(`http://localhost:3000/mentor/${id}`)
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

checkBox.addEventListener("change", async element => {
    if(checkBox.value === "Inativo")
    {
        checkBox.value = "Ativo"
    }
    else if (checkBox.value === "Ativo")
    {
        checkBox.value = "Inativo"
    }
})

loadSelect()
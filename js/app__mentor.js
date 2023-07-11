/* const formNewMentor = document.getElementById('new-mentor') */
const formEditMentor = document.getElementById('edit-mentor')
let mentorID

/* -----------GET----------- */
/* INJETANDO CONTEUDO NO HTML */
const inputMentors = async (mentors) => {
    const content = document.getElementById('table-content')
    content.innerHTML = ''
    mentors.forEach(mentor => {
        content.innerHTML = content.innerHTML + `
        <tr>
            <td>${mentor.name}</td>
            <td>${mentor.email}</td>
            <td>buttons</td>
        </tr>
        `
    });
}

/* RECUPERANDO OS DADOS DA API */
const getMentors = async () => {
    const response = await fetch('http://localhost:3000/mentor')
    const mentors = await response.json()
    inputMentors(mentors)
}

/* -----------POST----------- */
/* CHAMANDO EVENTO DE ENVIO DO FORMULARIO DE CADASTRO */
/* formNewMentor.addEventListener('submit', async element => {
    element.preventDefault()
    const name = formNewMentor.elements['name'].value
    const email = formNewMentor.elements['email'].value

    const mentor = {
        name,
        email
    }
    postMentor(mentor)
}) */

/* APÓS RECUPERADO OS DADOS DO FORMULARIO, ENVIANDO OS DADOS PARA A API */
const postMentor = async (mentor) => {
    await fetch('http://localhost:3000/mentor', {
        method: 'POST',
        headers: {
            "Accept": 'aplication/json, text/plain, */*',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(mentor)
    })
    window.location = 'home__mentor.html'
}

/* -----------PUT----------- */

const searchMentor = async (mentorID) => {
    const response = await fetch(`http://localhost:3000/mentor/${mentorID}`)
    const mentor = await response.json()
    return mentor
}

formEditMentor.addEventListener('submit', async element => {
    element.preventDefault()

    const name = formEditMentor.elements['name'].value
    const email = formEditMentor.elements['email'].value

    const mentor = {
        name,
        email
    }
    editMentor(mentor)
})

const loadForm = async (mentor) => {
    document.getElementById('edit-mentor-name').value = mentor.name
    document.getElementById('edit-mentor-email').value = mentor.email
}

const editMentor = async (mentor) => {
    await fetch(`http://localhost:3000/mentor/${mentorID}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(mentor)
    })
    window.location = 'home__mentor.html'
}

const loadData = async (id) => {
    mentorID = id
    const mentor = await searchMentor(mentorID)
    loadForm(mentor)
}

loadData('3')


/* -----------DELETE----------- */
const deleteMentors = async (id) => {
    await fetch(`http://localhost:3000/mentor/${id}`, {
        method: 'DELETE'
    })
    window.location = 'home__mentor.html'
}

/* getMentors() */
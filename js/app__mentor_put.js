const formEditMentor = document.getElementById('edit-mentor')
/* ELEMENTOS DO LOGIN CONTÍNUO */
const loginLocalStorage = localStorage
document.getElementById('loginUser').innerText = loginLocalStorage.user
document.getElementById('loginEmail').innerText = loginLocalStorage.email

let mentorID = null

/* -----------PUT----------- */

// RECUPERANDO O ID ATRAVÉS DA URL DA PAGINA REDIRECIONADA
const getIdUrl = () => {
    const paramString = window.location.search
    const pararms = new URLSearchParams(paramString)
    mentorID = pararms.get('id')
}

const searchMentor = async (mentorID) => {
    const response = await fetch(`${urlAPI}/mentor/${mentorID}`)
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
    await fetch(`${urlAPI}/mentor/${mentorID}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(mentor)
    })
    window.location = 'home__mentor.html'
}

const loadData = async () => {
    getIdUrl()
    const mentor = await searchMentor(mentorID)
    loadForm(mentor)
}

loadData()
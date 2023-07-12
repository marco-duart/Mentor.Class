const formNewMentor = document.getElementById('new-mentor')


/* -----------POST----------- */
/* CHAMANDO EVENTO DE ENVIO DO FORMULARIO DE CADASTRO */
formNewMentor.addEventListener('submit', async element => {
    element.preventDefault()
    const name = formNewMentor.elements['name'].value
    const email = formNewMentor.elements['email'].value

    const mentor = {
        name,
        email
    }
    postMentor(mentor)
})

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
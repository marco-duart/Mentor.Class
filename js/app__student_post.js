const formNewStudent = document.getElementById('new-student')
/* ELEMENTOS DO LOGIN CONTÍNUO */
const loginLocalStorage = localStorage
document.getElementById('loginUser').innerText = loginLocalStorage.user
document.getElementById('loginEmail').innerText = loginLocalStorage.email


/* -----------POST----------- */
/* CHAMANDO EVENTO DE ENVIO DO FORMULARIO DE CADASTRO */
formNewStudent.addEventListener('submit', async element => {
    element.preventDefault()
    const name = formNewStudent.elements['name'].value
    const email = formNewStudent.elements['email'].value
    const classUnit = formNewStudent.elements['class'].value

    const classObjet = await getClass(classUnit)
    const student = {
        name,
        email,
        class: {
            name: classObjet.name,
            id: classObjet.id
        }
    }
    postStudent(student)
})

/* APÓS RECUPERADO OS DADOS DO FORMULARIO, ENVIANDO OS DADOS PARA A API */
const postStudent = async (student) => {
    await fetch(`${urlAPI}/student`, {
        method: 'POST',
        headers: {
            "Accept": 'aplication/json, text/plain, */*',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(student)
    })
    window.location = 'home__student.html'
}

/* RECUPERANDO TODA LISTA DE TURMAS*/
const getClasses = async () => {
    const response = await fetch(`${urlAPI}/class`)
    const classes = await response.json()
    return classes
}

const getClass = async (id) => {
    const resposta = await fetch(`${urlAPI}/class/${id}`)
    const classUnit = await resposta.json()
    return classUnit
}

const loadSelectClass = async () => {
    const selectClass = document.getElementById('class-list')
    const classes = await getClasses()

    const voidOption = new Option('Selecione uma opção...')
    voidOption.selected = true
    voidOption.disabled = true
    selectClass.options.add(voidOption)

    classes.forEach(classUnit => {
        const option = new Option(classUnit.name, classUnit.id)
        selectClass.options.add(option)
    })
}

loadSelectClass()
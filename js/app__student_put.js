const formEditStudent = document.getElementById('edit-student')
let studentID = null

/* -----------PUT----------- */

// RECUPERANDO O ID ATRAVÉS DA URL DA PAGINA REDIRECIONADA
const getIdUrl = () => {
    const paramString = window.location.search
    const pararms = new URLSearchParams(paramString)
    studentID = pararms.get('id')
}

const searchStudent = async (studentID) => {
    const response = await fetch(`http://localhost:3000/student/${studentID}`)
    const student = await response.json()
    return student
}

formEditStudent.addEventListener('submit', async element => {
    element.preventDefault()
    const name = formEditStudent.elements['name'].value
    const email = formEditStudent.elements['email'].value
    const classUnit = formEditStudent.elements['class'].value

    const classObjet = await getClass(classUnit)
    const student = {
        name,
        email,
        class: {
            name: classObjet.name,
            id: classObjet.id
        }
    }
    editStudent(student)
})

const loadForm = async (student) => {
    document.getElementById('name-student').value = student.name
    document.getElementById('email-student').value = student.email
    document.getElementById('class-list').value = student.class.id
}

const editStudent = async (student) => {
    await fetch(`http://localhost:3000/student/${studentID}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(student)
    })
    window.location = 'home__student.html'
}

/* RECUPERANDO TODA LISTA DE TURMAS*/
const getClasses = async () => {
    const response = await fetch('http://localhost:3000/class')
    const classes = await response.json()
    return classes
}

const getClass = async (id) => {
    const resposta = await fetch(`http://localhost:3000/class/${id}`)
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

const loadData = async () => {
    getIdUrl()
    loadSelectClass()
    const student = await searchStudent(studentID)
    loadForm(student)
}

loadData()
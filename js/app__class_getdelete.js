/* -----------GET----------- */
/* INJETANDO CONTEUDO NO HTML */
const inputClasses = async (classes) => {
    const content = document.getElementById('table-content')
    content.innerHTML = ''
    classes.forEach(classUnit => {
        content.innerHTML = content.innerHTML + `
        <tr class="itemTable">
            <td>${classUnit.name}</td>
            <td>${classUnit.mentory.mentor.name}</td>
            <td>${classUnit.mentory.title}</td>
            <td>${classUnit.date}</td>
            <td>${classUnit.day}</td>
            <td>${classUnit.time.begin}h</td>
            <td>${classUnit.meet.done}/${classUnit.meet.total}</td>
            <td class="optionIco"><span onclick="editClass(${classUnit.id})"><img src="../img/edit.png" alt=""></span><span onclick="deleteClass(${classUnit.id})"><img src="../img/delete.png" alt=""></span></td>
        </tr>
        `
    });
}

/* RECUPERANDO OS DADOS DA API */
const getClasses = async () => {
    const response = await fetch('http://localhost:3000/class')
    const classes = await response.json()
    inputClasses(classes)
}

/* -----------PUT(REDIRECIONAMENTO)----------- */
const editClass = (id) => {
    window.location = `edit__class.html?id=${id}`
}

/* -----------DELETE----------- */
const deleteClass = async (id) => {
    await fetch(`http://localhost:3000/class/${id}`, {
        method: 'DELETE'
    })
    window.location = 'home__class.html'
}

getClasses()
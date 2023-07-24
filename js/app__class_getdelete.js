const search = document.getElementById('class-search')
/* ELEMENTOS DO LOGIN CONTÍNUO */
const loginLocalStorage = localStorage
document.getElementById('loginUser').innerText = loginLocalStorage.user
document.getElementById('loginEmail').innerText = loginLocalStorage.email

/* CONTADOR DA PÁGINA E QUANTIDADE MÁXIMA DE ITENS */
let currentPage = 1
let maxItensAPI

/* -----------GET----------- */
/* INJETANDO CONTEUDO NO HTML */
const inputClasses = async (classes) => {
    const content = document.getElementById('table-content')
    content.innerHTML = ''
    classes.forEach(classUnit => {
        const fixedDate = fixDate(classUnit.date)
        content.innerHTML = content.innerHTML + `
        <tr class="itemTable">
            <td>${classUnit.name}</td>
            <td>${classUnit.mentory.mentor.name}</td>
            <td>${classUnit.mentory.title}</td>
            <td>${fixedDate}</td>
            <td>${classUnit.day}</td>
            <td>${classUnit.time.begin}h</td>
            <td>${classUnit.meet.done}/${classUnit.meet.total}</td>
            <td class="rightSectionTableIcon"><span onclick="editClass(${classUnit.id})"><img src="../img/edit.png" alt=""></span><span onclick="deleteClass(${classUnit.id})"><img src="../img/delete.png" alt=""></span></td>
        </tr>
        `
    });
    fixArrows()
}

/* CORREÇÃO DA DATA */
const fixDate = (valor) => {
    let dateSplit = valor.split('-')
    let dateReverse = dateSplit.reverse()
    return dateReverse.join('/')
}

/* RECUPERANDO OS DADOS DA API */
const getClasses = async (textParameter = null) => {
    let text = `?_page=${currentPage}&_limit=5`
    if(textParameter) {
        text = textParameter
    }
    const response = await fetch(`https://api-mentor-class.onrender.com/class${text}`)
    maxItensAPI = parseInt(response.headers.get('x-total-count'))
    const classes = await response.json()
    inputClasses(classes)
}

/* -----------PUT(REDIRECIONAMENTO)----------- */
const editClass = (id) => {
    window.location = `edit__class.html?id=${id}`
}

/* -----------DELETE----------- */
const deleteClass = async (id) => {
    await fetch(`https://api-mentor-class.onrender.com/class/${id}`, {
        method: 'DELETE'
    })
    window.location = 'home__class.html'
}

/* PAGINAÇÃO */
const pagination = (operation) => {
    if(operation === '+' && currentPage<maxItensAPI/5) {
        currentPage++
        getClasses(`?_page=${currentPage}&_limit=5`)
    }
    if(operation === '-' && currentPage>1){
        currentPage--
        getClasses(`?_page=${currentPage}&_limit=5`)
    }
}

/* PAGINAÇÃO: CORREÇÃO DAS SETAS */

const fixArrows = () => {
    if(currentPage>=maxItensAPI/5 && currentPage === 1) {
        document.getElementById('next-arrow').classList = 'arrows hideArrow'
        document.getElementById('previous-arrow').classList = 'arrows hideArrow'
    } else if(currentPage>=maxItensAPI/5) {
        document.getElementById('next-arrow').classList = 'arrows hideArrow'
        document.getElementById('previous-arrow').classList = 'arrows'
    } else if(currentPage === 1) {
        document.getElementById('next-arrow').classList = 'arrows'
        document.getElementById('previous-arrow').classList = 'arrows hideArrow'
    } else {
        document.getElementById('next-arrow').classList = 'arrows'
        document.getElementById('previous-arrow').classList = 'arrows'
    }
}

/* ORDENAÇÃO */
const sorting = (text, id) => {
    const selectedTableHead = document.getElementById(id)
    if(selectedTableHead.innerText === "⇓") {
        getClasses(`?_sort=${text}&_order=DESC`)
        selectedTableHead.innerText = "⇑"
    }
    else if(selectedTableHead.innerText === "⇑") {
        getClasses(`?_sort=${text}&_order=ASC`)
        selectedTableHead.innerText = "⇓"
    }
}

/* PESQUISA COM ENVIO COMPLETO DE PARÂMETRO */
search.addEventListener('keyup', element => {
    const text = search.value
    if(text === '') {
        getClasses()
    } else if(element.key === 'Enter') {
        getClasses(`?q=${text}`)
    }
})

getClasses()
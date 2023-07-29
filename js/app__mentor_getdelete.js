const search = document.getElementById('mentor-search')
/* ELEMENTOS DO LOGIN CONTÍNUO */
const loginLocalStorage = localStorage
document.getElementById('loginUser').innerText = loginLocalStorage.user
document.getElementById('loginEmail').innerText = loginLocalStorage.email

/* CONTADOR DA PÁGINA E QUANTIDADE MÁXIMA DE ITENS */
let currentPage = 1
let maxItensAPI

/* -----------GET----------- */
/* INJETANDO CONTEUDO NO HTML */
const inputMentors = async (mentors) => {
    const content = document.getElementById('table-content')
    content.innerHTML = ''
    mentors.forEach(mentor => {
        content.innerHTML = content.innerHTML + `
        <tr class="itemTable">
            <td>${mentor.name}</td>
            <td>${mentor.email}</td>
            <td class="rightSectionTableIcon"><span onclick="editMentor(${mentor.id})"><img src="../img/edit.png" alt=""></span><span onclick="deleteMentor(${mentor.id})"><img src="../img/delete.png" alt=""></span></td>
        </tr>
        `
    });
    fixArrows()
}

/* RECUPERANDO OS DADOS DA API */
const getMentors = async (textParameter = null) => {
    let text = `?_page=${currentPage}&_limit=5`
    if(textParameter) {
        text = textParameter
    }
    const response = await fetch(`${urlAPI}/mentor${text}`)
    maxItensAPI = parseInt(response.headers.get('x-total-count'))
    const mentors = await response.json()
    inputMentors(mentors)
}

/* -----------PUT(REDIRECIONAMENTO)----------- */
const editMentor = (id) => {
    window.location = `edit__mentor.html?id=${id}`
}

/* -----------DELETE----------- */
const deleteMentor = async (id) => {
    await fetch(`${urlAPI}/mentor/${id}`, {
        method: 'DELETE'
    })
    window.location = 'home__mentor.html'
}

/* PAGINAÇÃO */
const pagination = (operation) => {
    if(operation === '+' && currentPage<maxItensAPI/5) {
        currentPage++
        getMentors(`?_page=${currentPage}&_limit=5`)
    }
    if(operation === '-' && currentPage>1){
        currentPage--
        getMentors(`?_page=${currentPage}&_limit=5`)
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
        getMentors(`?_sort=${text}&_order=DESC`)
        selectedTableHead.innerText = "⇑"
    }
    else if(selectedTableHead.innerText === "⇑") {
        getMentors(`?_sort=${text}&_order=ASC`)
        selectedTableHead.innerText = "⇓"
    }
}

/* PESQUISA COM ENVIO COMPLETO DE PARÂMETRO */
search.addEventListener('keyup', element => {
    const text = search.value
    if(text === '') {
        getMentors()
    } else if(element.key === 'Enter') {
        getMentors(`?q=${text}`)
    }
})

getMentors()
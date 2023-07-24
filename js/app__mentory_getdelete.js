const search = document.getElementById('mentory-search')
/* ELEMENTOS DO LOGIN CONTÍNUO */
const loginLocalStorage = localStorage
document.getElementById('loginUser').innerText = loginLocalStorage.user
document.getElementById('loginEmail').innerText = loginLocalStorage.email

/* CONTADOR DA PÁGINA E QUANTIDADE MÁXIMA DE ITENS */
let currentPage = 1
let maxItensAPI

/* -----------GET----------- */
/* INJETANDO CONTEUDO NO HTML */
const inputMentories = async (mentories) => {
    const content = document.getElementById('table-content')
    content.innerHTML = ''
    mentories.forEach(mentory => {
        let classStatus
        if(mentory.status === 'Ativo') {
            classStatus = 'itemMentoryValid'
        } else if(mentory.status === 'Inativo') {
            classStatus = 'itemMentoryInvalid'
        }
        content.innerHTML = content.innerHTML + `
        <tr class="itemTable">
            <td>${mentory.title}</td>
            <td>${mentory.mentor.name}</td>
            <td class="${classStatus}"><span>${mentory.status}</span></td>
            <td class="rightSectionTableIcon"><span onclick="editMentory(${mentory.id})"><img src="../img/edit.png" alt=""></span><span onclick="deleteMentory(${mentory.id})"><img src="../img/delete.png" alt=""></span></td>
        </tr>
        `
    });
    fixArrows()
}

/* RECUPERANDO OS DADOS DA API */
const getMentories = async (textParameter = null) => {
    let text = `?_page=${currentPage}&_limit=5`
    if(textParameter) {
        text = textParameter
    }
    const response = await fetch(`https://api-mentor-class.onrender.com/mentory${text}`)
    maxItensAPI = parseInt(response.headers.get('x-total-count'))
    const mentories = await response.json()
    inputMentories(mentories)
}

/* -----------PUT(REDIRECIONAMENTO)----------- */
const editMentory = (id) => {
    window.location = `edit__mentory.html?id=${id}`
}

/* -----------DELETE----------- */
const deleteMentory = async (id) => {
    await fetch(`https://api-mentor-class.onrender.com/mentory/${id}`, {
        method: 'DELETE'
    })
    window.location = 'home__mentory.html'
}

/* PAGINAÇÃO */
const pagination = (operation) => {
    if(operation === '+' && currentPage<maxItensAPI/5) {
        currentPage++
        getMentories(`?_page=${currentPage}&_limit=5`)
    }
    if(operation === '-' && currentPage>1){
        currentPage--
        getMentories(`?_page=${currentPage}&_limit=5`)
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
        getMentories(`?_sort=${text}&_order=DESC`)
        selectedTableHead.innerText = "⇑"
    }
    else if(selectedTableHead.innerText === "⇑") {
        getMentories(`?_sort=${text}&_order=ASC`)
        selectedTableHead.innerText = "⇓"
    }
}

/* PESQUISA COM ENVIO COMPLETO DE PARÂMETRO */
search.addEventListener('keyup', element => {
    const text = search.value
    if(text === '') {
        getMentories()
    } else if(element.key === 'Enter') {
        getMentories(`?q=${text}`)
    }
})

getMentories()
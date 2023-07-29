const form = document.getElementById('form-login')
const checkbox = document.getElementById('remenber')

/* VERIFICANDO SE POSSUI A INFORMAÇÃO DE "LEMBRAR" NO LOCAL STORAGE */
const startPage = () => {
  if(localStorage.checked === 'true') {
    document.getElementById('email').value = localStorage.email
    checkbox.checked = true
  }
  else if(localStorage.checked === 'false') {
    localStorage.removeItem('user')
    localStorage.removeItem('email')
    checkbox.checked = false
  }
}

const getUsers = async () => {
    const response = await fetch(`${urlAPI}/user`)
    const users = await response.json()
    return users
}

/* EVENTO DE LOGIN E MENSAGENS DE ERRO */
form.addEventListener('submit', async event => {
  event.preventDefault()
  /* INICIANDO VARIAVEIS */
  const email = document.getElementById('email')
  const password = document.getElementById('password')

  /* VARIAVEIS DE RETORNO MENSAGEM DE ERRO */
  const emailError = document.getElementById('emailError')
  const passError = document.getElementById('passError')

  /* TESTANDO PRIMEIRAMENTE SE ESTÁ TUDO CERTO */
  if(email.value !== '' && password.value !== '') {
    const users = await getUsers()
    users.forEach(element => {
      if (element.email === email.value && element.password === password.value) {
        if(checkbox.checked)
        {
          localStorage.setItem('checked', 'true')
        }
        else if (!checkbox.checked)
        {
          localStorage.setItem('checked', 'false')
        }
        localStorage.setItem('user', `${element.name}`)
        localStorage.setItem('email', `${element.email}`)
        window.location = 'html/home__mentor.html'
      }
    })
    console.log(emailError.className)
    emailError.innerText = '*Os dados informados estão incorretos!'
    passError.innerText = '*Os dados informados estão incorretos!'
    emailError.className = 'show'
    passError.className = 'show'
  } else {
    if (email.value === '') {
      email.className='invalid'
      emailError.innerText = '*Digite o email!'
      emailError.className='show'
    }
    else {
      email.className='valid'
      emailError.className='hide'
    }
    
    if (password.value === '') {
      password.className='invalid'
      passError.innerText = '*Digite a senha!'
      passError.className='show'
    }
    else {
      password.className='valid'
      passError.className='hide'
    }
  }
})

/* MOSTRAR E ESCONDER SENHA */
const showHidePass = (idPassword, idClosedEye, idOpenedEye, action) => {
  let temporaryValue
  const password = document.getElementById(idPassword)
  const hidePass = document.getElementById(idClosedEye)
  const showPass = document.getElementById(idOpenedEye)
  if(action === 'show') {
    hidePass.className = 'eyePassword hide'
    showPass.className = 'eyePassword show'
    password.type = "text"
  } else if(action === 'hide') {
    showPass.className = 'eyePassword hide'
    hidePass.className = 'eyePassword show'
    password.type = "password"
  }
}

startPage()
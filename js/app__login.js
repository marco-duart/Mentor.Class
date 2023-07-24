const form = document.getElementById('form-login')
const checkbox = document.getElementById('remenber')

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
    const response = await fetch('https://api-mentor-class.onrender.com/user')
    const users = await response.json()
    return users
}

/* ATUALIZAR E DE EVENTO NOS .JS */
form.addEventListener('submit', async event => {
  event.preventDefault()
  /* INICIANDO VARIAVEIS */
  const email = document.getElementById('email')
  const password = document.getElementById('password')

  /* VARIAVEIS DE RETORNO MENSAGEM DE ERRO */
  const emailError = document.getElementById('emailError')
  const passError = document.getElementById('passError')



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

  if (email.value !== '' && password.value !== '') {
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
      } else {
        emailError.innerText = '*Os dados informados estão incorretos!'
        passError.innerText = '*Os dados informados estão incorretos!!'
        emailError.className='show'
        passError.className='show'
      }
    })
  }
})

const showHidePass = (param) => {
  let temporaryValue
  const password = document.getElementById('password')
  const hidePass = document.getElementById('eyeClosed')
  const showPass = document.getElementById('eyeOpened')
  if(param === 'eyeClosed') {
    hidePass.className = 'eyePassword hide'
    showPass.className = 'eyePassword show'
    temporaryValue = password.value
    password.type = "text"
    password.value = temporaryValue
  } else if(param === 'eyeOpened') {
    showPass.className = 'eyePassword hide'
    hidePass.className = 'eyePassword show'
    temporaryValue = password.value
    password.type = "password"
    password.value = temporaryValue
  }
}

startPage()
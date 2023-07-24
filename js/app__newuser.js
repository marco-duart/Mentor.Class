const form = document.getElementById('form-signup')


const postUser = async (user) => {
    await fetch('https://api-mentor-class.onrender.com/user', {
        method: 'POST',
        headers: {
            "Accept": 'aplication/json, text/plain, */*',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(user)
    })
    window.location = '../index.html'
}

const showHidePass = (passInput,hideId,showId,param) => {
  const password = document.getElementById(passInput)
  const hidePass = document.getElementById(hideId)
  const showPass = document.getElementById(showId)
  if(param === 'show') {
    hidePass.className = 'eyePassword hide'
    showPass.className = 'eyePassword show'
    password.type = "text"
  } else if(param === 'hide') {
    showPass.className = 'eyePassword hide'
    hidePass.className = 'eyePassword show'
    password.type = "password"
  }
}

const changePage = (toHide,toShow) => {
  const hide = document.getElementById(toHide)
  const show = document.getElementById(toShow)

  hide.classList = 'formItem hide'
  show.classList = 'formItem'

  if(toHide === 'page-one') {
    document.getElementById('submit-btn-login').classList = 'btnLogin'
    document.getElementById('return-page').classList = 'newUserLogin hide'
  } else if(toHide === 'page-two') {
    document.getElementById('submit-btn-login').classList = 'btnLogin hide'
    document.getElementById('return-page').classList = 'newUserLogin'
  }
}

form.addEventListener('submit', event => {
  event.preventDefault()
  /* INICIANDO VARIAVEIS */
  const name = document.getElementById('name')
  const email = document.getElementById('email')
  const password = document.getElementById('password')
  const confirmPassword = document.getElementById('confirmPassword')
  /* VARIAVEIS DE RETORNO MENSAGEM DE ERRO */
  const nameError = document.getElementById('nameError')
  const emailError = document.getElementById('emailError')
  const passError = document.getElementById('passError')
  const rePassError = document.getElementById('rePassError')

  const newUser = async (name, email, password) => {
    const user = {
      name,
      email,
      password
    }
    postUser(user)
  }


  if (name.value === '') {
    name.className='invalid'
    nameError.className='show'
  }
  else {
    name.className='valid'
    nameError.className='hide'
  }
  if (email.value === '') {
    email.className='invalid'
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

  if (confirmPassword.value === '') {
    confirmPassword.className='invalid'
    rePassError.innerText = '*Repita a senha!'
    rePassError.className='show'
  }
  else {
    confirmPassword.className='valid'
    rePassError.className='hide'
  }

  if (password.value != confirmPassword.value) {
    password.className='invalid'
    confirmPassword.className='invalid'
    passError.innerText = '*As senhas devem ser iguais!'
    rePassError.innerText = '*As senhas devem ser iguais'
    passError.className='show'
    rePassError.className='show'
  } else if (name.value !== '' && email.value !== '' && password.value !== '' && confirmPassword.value !== '') {
    newUser(name.value, email.value, password.value)
  }
})
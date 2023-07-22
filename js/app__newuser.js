const form = document.getElementById('form-signup')


const postUser = async (user) => {
    await fetch('http://localhost:3000/user', {
        method: 'POST',
        headers: {
            "Accept": 'aplication/json, text/plain, */*',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(user)
    })
    window.location = '../index.html'
}

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
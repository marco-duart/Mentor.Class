const form = document.getElementById('form')

form.addEventListener('submit', async element => {
    element.preventDefault()
    const date = form.elements['date'].value
    const time = form.elements['time'].value
    const week = form.elements['week'].value

    console.log(date)
    console.log(time)
    console.log(week)
})
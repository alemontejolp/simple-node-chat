document.getElementById('form').addEventListener('submit', (event) => {
  let username = document.getElementById('usernameInput').value.trim()
  let passwd1 = document.getElementById('passwdInput').value.trim()
  
  if (!username || !passwd1) {
    alert('Todos los campos son requeridos')
    event.preventDefault()
    return
  }

  console.log('ok')
})

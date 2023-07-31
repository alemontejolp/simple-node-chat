document.getElementById('form').addEventListener('submit', (event) => {
  let username = document.getElementById('usernameInput').value.trim()
  let passwd1 = document.getElementById('passwdInput').value.trim()
  let passwd2 = document.getElementById('passwdConfirmInput').value.trim()
  
  if (!username || !passwd1 || !passwd2) {
    alert('Todos los campos son requeridos')
    event.preventDefault()
    return
  }

  if (passwd1 != passwd2) {
    alert('Las contraseñas no coinciden.')
    event.preventDefault()
    return
  }

  console.log('ok')
})

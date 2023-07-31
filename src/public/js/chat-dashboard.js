(function() {
  let queryParams = getQueryParams()
  let userId = queryParams.get('user_id')
  if (!userId) {
    alert('El id del usuario no fue proporcionado.')
    window.location = '/'
    return
  }
  document.getElementById('create-room-user-id').value = userId
  document.getElementById('join-room-user-id').value = userId
  localStorage.setItem('user-id', userId)
})()

document.getElementById('create-room-form').addEventListener('submit', e => {
  let roomName = document.getElementById('new-room-name').value.trim()
  if (!roomName) {
    alert('El nombre de la nueva sala es requerido')
    e.preventDefault()
    return
  }
})

document.getElementById('join-room-form').addEventListener('submit', e => {
  let roomName = document.getElementById('room-name-selected').value.trim()
  if (roomName == 'not-valid-option') {
    alert('Debe elegir una sala para unirse')
    e.preventDefault()
    return
  }
})

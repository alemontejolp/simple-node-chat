function renderMessage(messageData) {
  //
}

function socketioLogic(queryParams) {
  const userId = queryParams.get('user_id')
  const roomId = queryParams.get('room_id')
  const socket = io(`ws://${domain}`, {
    auth: {
      userId: userId
    }
  });

  socket.on("connect", () => {
    console.log('Socket connected:', socket.id);
    socket.emit('join-chat-room', { roomId }, response => {
      console.log(response)
      if (response.code != 'ok') {
        alert(`No se pudo ingresar a la sala. ${response.code}: ${response.message}`)
        return
      }
    })
  });

  socket.on("connect_error", (err) => {
    console.log('Error while connecting to the socket.io server:', err.message);
  });

  socket.on('new-message', data => {
    let messageBoxElement = document.getElementById('chat-box')
    console.log('new message:', data)
    if (data.roomId == roomId) {
      messageBoxElement.innerHTML += `<p><b>${data.user.username}</b>: ${data.message}</p>`
    }
  })

  document.getElementById('send-message-form').addEventListener('submit', e => {
    e.preventDefault()
    console.log('Sending message')
    let messageInputElement = document.getElementById('message-input')
    let message = messageInputElement.value.trim()
    console.log(message)
    if (!message) {
      return
    }
    let data = {
      roomId,
      message
    }
    socket.emit('new-message', data, response => {
      console.log(response)
    })
    messageInputElement.value = ''
  })
}

(function() {
  let queryParams = getQueryParams()
  let userId = queryParams.get('user_id')
  let roomId = queryParams.get('room_id')
  if (!userId) {
    alert('El id del usuario no fue proporcionado.')
    window.location = '/'
    return
  }
  if (!roomId) {
    alert('El id de la sala no fue proporcionado.')
    window.location = '/chat'
    return
  }

  socketioLogic(queryParams)
})()

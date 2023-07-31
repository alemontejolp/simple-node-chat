(function() {
  document.getElementById('logout-btn').addEventListener('click', e => {
    localStorage.clear()
  })
  document.getElementById('go-dashboard-btn').addEventListener('click', e => {
    e.preventDefault()
    let userId = localStorage.getItem('user-id')
    if (userId == null) {
      userId = ''
    }
    window.location = `/chat?user_id=${userId}`
  })
})()

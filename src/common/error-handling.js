function logError(err) {
  console.log('Error:', err.message)
  console.log('Code:', err.code)
  console.log('Stack:')
  console.log(err.stack)
}

export function handleErrorInRequest(err, req, res) {
  logError(err)
  if (!res.headersSent) {
    res.render('error', {
      message: `${err.code || '__no_error_code__'}: ${err.message}`
    })
  }
}

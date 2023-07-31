const domain = 'localhost:3000'

function getQueryParams() {
  let paramString = window.location.search
  let queryString = new URLSearchParams(paramString)
  return queryString
}

const defaultGridSize = 3

function gridSize(size) {
  const URLparameter = sizeFromURLFragment()
  if (URLparameter) {
    return parseInt(URLparameter[1], 10)
  } else {
    return defaultGridSize
  }
}

// "#gridSize=3"
function sizeFromURLFragment() {
  return window.location.hash.slice(1)
    .split('&')
    .map((el) => el.split('=').map((part) => decodeURIComponent(part)))
    .find((el) => el[0] === 'gridSize')
}

export default gridSize

const addScript = document.querySelector('#add-script')
    , readApi = document.querySelector('#read-api')

addScript.addEventListener('change', (event) => {
  const file = addScript.files[0]
      , reader = new FileReader()

  reader.readAsText(file)

  reader.onload = () => {
    try {
      chrome.storage.local.set({ fetchCode: JSON.parse(reader.result) })
      alert(`Good load "${file.name}" script`)
    } catch (err) {
      alert(`
        Bad load "${file.name}" script
        ------------------------------
        stack: ${err.stack}
      `)
    }
  }

  reader.onerror = () => {
    alert(`
      Bad load "${file.name}" script
      ------------------------------
      stack: FileReader error
    `)
  }
})

readApi.addEventListener('click', () => {
  document.querySelector('#root').scrollTo({
    top: 400,
    behavior: 'smooth'
  })
})

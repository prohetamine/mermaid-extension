const addScript = document.querySelector('#add-script')
    , readApi = document.querySelector('#read-api')

addScript.addEventListener('change', (event) => {
  const file = addScript.files[0]
      , reader = new FileReader()

  reader.readAsText(file)

  reader.onload = () => {
    try {
      chrome.storage.local.set({ fetchCode: JSON.parse(reader.result) }, () => {
        alert(`Load "${file.name}" script`)
        if (Object.keys(JSON.parse(reader.result)).find(key => key === 'chaturbateSendSocket')) {
          alert(`In order for the "${file.name}" script to start working correctly, you need to reload the pages.`)
        }
      })
      alert(`Check "${file.name}" script`)
      addScript.value = ''
    } catch (err) {
      alert(`
        Bad load "${file.name}" script
        ------------------------------
        stack: ${err.stack}
      `)
      addScript.value = ''
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

readApi.addEventListener('click', () =>
  window.open('https://github.com/prohetamine/mermaid-extension')
)

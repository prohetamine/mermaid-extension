const addScript = document.querySelector('#add-script')
    , readApi = document.querySelector('#read-api')

addScript.addEventListener('change', (event) => {
  const file = addScript.files[0]
      , reader = new FileReader()

  reader.readAsText(file)

  reader.onload = () => {
    chrome.storage.local.set({ fetchCode: JSON.parse(reader.result) })
  }

  reader.onerror = () => {
    console.log(reader.error)
  }

  alert(12345)
})

readApi.addEventListener('click', () => {
  document.querySelector('#root').scrollTo({
    top: 400,
    behavior: 'smooth'
  })
})

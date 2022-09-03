const sleep = ms => new Promise(res => setTimeout(res, ms))

const replacementRequest = (request, event) => {
  const parser = (text, event) => {
    const match = text.match(/\({[^\}]+}\)/)

    if (match) {
      const keys = (match+'').slice(8, -2).split('.')
          , value = keys.reduce((event, key) => event[key], event)
      text = text.replace(match, value)
    } else {
      return text
    }

    return parser(text, event)
  }

  const text = JSON.stringify(request)

  return JSON.parse(parser(text, event))
}

const send = async (request, event) => {
  const _request = replacementRequest(request, event)

  const attemptsError = request.attemptsError || 1
      , attemptsSleepError = request.attemptsSleepError || 3000
      , cancel = _request.cancel || 3000
      , delay = _request.delay || 0

  await sleep(delay)

  for (let i = 0; i < attemptsError; i++) {
    const controller = new AbortController()

    const timeId = setTimeout(
      () =>
        controller.abort()
      ,
      cancel
    )

    try {
      await fetch(_request.fetch.url, {
        signal: controller.signal,
        ..._request.fetch
      })
      clearTimeout(timeId)
      return
    } catch (err) {
      console.log(err)
      await sleep(attemptsSleepError)
    }
  }
}

;(async () => {
  chrome.storage.local.onChanged.addListener(async () => {
    const {
      chaturbateEvent = false,
      bongacamsEvent = false,
      myfreecamsEvent = false,
      stripchatEvent = false,
      fetchCode = false
    } = await chrome.storage.local.get()

    if (chaturbateEvent && fetchCode) {
      fetchCode.chaturbateEvent.forEach(request => send(request, chaturbateEvent))
    }

    if (bongacamsEvent && fetchCode) {
      fetchCode.bongacamsEvent.forEach(request => send(request, bongacamsEvent))
    }

    if (myfreecamsEvent && fetchCode) {
      fetchCode.myfreecamsEvent.forEach(request => send(request, myfreecamsEvent))
    }

    if (stripchatEvent && fetchCode) {
      fetchCode.stripchatEvent.forEach(request => send(request, stripchatEvent))
    }
  })
})()

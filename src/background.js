const sendStack = {
  /* contextId */
}

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

const executeCondition = {
  '>=': (a, b) => a >= b,
  '<=': (a, b) => a <= b,
  '==': (a, b) => a == b,
  '>': (a, b) => a > b,
  '<': (a, b) => a < b
}

const ifParser = condition => {
  const findTwoConditionOperator = condition.match(/(&&|\|\|)/)
      , isTwoCondition = findTwoConditionOperator?.index
      , isOr = isTwoCondition ? findTwoConditionOperator[0] === '||' : false
      , isAnd = isTwoCondition ? findTwoConditionOperator[0] === '&&' : false

  let firstCondition = ['0', '==', '1']
    , lastCondition = ['0', '==', '1']

  if (isTwoCondition) {
    const [fa, foperator, fb] = condition
                                  .slice(0, isTwoCondition)
                                  .trim()
                                  .match(/([^(<|>|=)]+|>=|<=|==|>|<)/gi)

    const [la, loperator, lb] = condition
                                  .slice(isTwoCondition + 2)
                                  .trim()
                                  .match(/([^(<|>|=)]+|>=|<=|==|>|<)/gi)

    if (
      ((fa && fa.trim) && (fb && fb.trim)) &&
      ((la && la.trim) && (lb && lb.trim))
    ) {
      let _fa = fa.trim()
        , _fb = fb.trim()

      let _la = la.trim()
        , _lb = lb.trim()

      _fa = parseInt(_fa) === _fa - 0 ? parseInt(_fa) : _fa
      _fb = parseInt(_fb) === _fb - 0 ? parseInt(_fb) : _fb

      _la = parseInt(_la) === _la - 0 ? parseInt(_la) : _la
      _lb = parseInt(_lb) === _lb - 0 ? parseInt(_lb) : _lb

      firstCondition = [
        _fa,
        foperator,
        _fb
      ]

      lastCondition = [
        _la,
        loperator,
        _lb
      ]
    }
  } else {
    const [a, operator, b] = condition
                                .trim()
                                .match(/([^(<|>|=)]+|>=|<=|==|>|<)/gi)

    if ((a && a.trim) && (b && b.trim)) {
      let _a = a.trim()
        , _b = b.trim()

      _a = parseInt(_a) === _a - 0 ? parseInt(_a) : _a
      _b = parseInt(_b) === _b - 0 ? parseInt(_b) : _b

      firstCondition = [
        _a,
        operator,
        _b
      ]
    }
  }

  if (isOr || isAnd) {
    if (isOr) {
      if (
        executeCondition[firstCondition[1]](
          firstCondition[0],
          firstCondition[2]
        )
        ||
        executeCondition[lastCondition[1]](
          lastCondition[0],
          lastCondition[2]
        )
      ) {
        return true
      } else {
        return false
      }
    }

    if (isAnd) {
      if (
        executeCondition[firstCondition[1]](
          firstCondition[0],
          firstCondition[2]
        )
        &&
        executeCondition[lastCondition[1]](
          lastCondition[0],
          lastCondition[2]
        )
      ) {
        return true
      } else {
        return false
      }
    }
  } else {
    if (
      executeCondition[firstCondition[1]](
        firstCondition[0],
        firstCondition[2]
      )
    ) {
      return true
    } else {
      return false
    }
  }
}

const send = async (request, event) => {
  const _request = replacementRequest(request, event)

  const attemptsError = request.attemptsError || 1
      , attemptsSleepError = request.attemptsSleepError || 3000
      , cancel = _request.cancel || 3000
      , delay = _request.delay || 0
      , condition = _request.if || false

  if (condition) {
    const isСondition = ifParser(condition)

    if (!isСondition) {
      return
    }
  }

  await sleep(delay)

  for (let i = 0; i < attemptsError; i++) {
    const controller = new AbortController()

    const timeId = setTimeout(
      () =>
        controller.abort()
      ,
      cancel
    )

    if (!sendStack[event.contextId]) {
      sendStack[event.contextId] = []
    }

    if (!!(sendStack[event.contextId].find(id => id === event.id))) {
      return false
    }

    if (sendStack[event.contextId]) {
      sendStack[event.contextId].push(event.id)
    }

    try {
      const messages = await fetch(_request.fetch.url, {
        signal: controller.signal,
        ..._request.fetch
      }).then(d => d.json())
      clearTimeout(timeId)

      return { messages, id: event.id, contextId: event.contextId, isOk: true }
    } catch (err) {
      sendStack[event.contextId] = sendStack[event.contextId].filter(id => id !== event.id)
      console.log(err)
      await sleep(attemptsSleepError)
    }
  }

  return { messages: [], id: event.id, contextId: event.contextId, isOk: false }
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
      await chrome.storage.local.set({
        chaturbateEventCallback: (
          await Promise.all(
            fetchCode.chaturbateEvent.map(request => send(request, chaturbateEvent))
          )
        ).filter(send => send)
      })
    }

    if (bongacamsEvent && fetchCode) {
      await chrome.storage.local.set({
        bongacamsEventCallback: (
          await Promise.all(
            fetchCode.bongacamsEvent.map(request => send(request, chaturbateEvent))
          )
        ).filter(send => send)
      })
    }

    if (myfreecamsEvent && fetchCode) {
      await chrome.storage.local.set({
        myfreecamsEventCallback: (
            await Promise.all(
            fetchCode.myfreecamsEvent.map(request => send(request, chaturbateEvent))
          )
        ).filter(send => send)
      })
    }

    if (stripchatEvent && fetchCode) {
      await chrome.storage.local.set({
        stripchatEventCallback: (
            await Promise.all(
            fetchCode.stripchatEvent.map(request => send(request, chaturbateEvent))
          )
        ).filter(send => send)
      })
    }
  })
})()

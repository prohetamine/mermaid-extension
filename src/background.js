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

  console.log('firstCondition', firstCondition)
  console.log('isOr', 'isAnd', isOr, isAnd)
  console.log('lastCondition', lastCondition)

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

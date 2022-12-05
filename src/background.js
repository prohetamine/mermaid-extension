chrome.tabs.onCreated.addListener(tab => {
  chrome.tabs.update(tab.id, {
    autoDiscardable: false
  })
})

chrome.tabs.onReplaced.addListener(tabId => {
  chrome.tabs.update(tabId, {
    autoDiscardable: false
  })
})

chrome.runtime.onInstalled.addListener(details => {
  chrome.tabs.query({}, tabs => {
    tabs.forEach(tab => {
      chrome.tabs.update(tab.id, {
        autoDiscardable: false
      })
    })
  })
})

const sendStack = {}

const send = async (request, event) => {
	const _request = replacementRequest(request, event)

	const attemptsError = request.attemptsError || 1
      , attemptsSleepError = request.attemptsSleepError || 3000
      , cancel = _request.cancel || 3000
      , isReturn = _request.return !== undefined ? _request.return : true
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

    if (!sendStack[event.contextId+_request.fetch.url]) {
      sendStack[event.contextId+_request.fetch.url] = []
    }

    if (!!(sendStack[event.contextId+_request.fetch.url].find(id => id === event.id))) {
      return false
    }

    if (sendStack[event.contextId+_request.fetch.url]) {
      sendStack[event.contextId+_request.fetch.url].push(event.id)
    }

    try {
			console.log(`[fetch] from platform: ${event.platform} to: ${_request.title || _request.fetch.url}`)
      const messages = await fetch(_request.fetch.url, {
        signal: controller.signal,
        ..._request.fetch
      }).then(d => d.json())
      clearTimeout(timeId)

      return { messages, id: event.id, contextId: event.contextId+_request.fetch.url, isOk: true }
    } catch (err) {
			if (isReturn) {
				sendStack[event.contextId+_request.fetch.url] = sendStack[event.contextId+_request.fetch.url].filter(id => id !== event.id)
	      await sleep(attemptsSleepError)
			} else {
				return { messages: [], id: event.id, contextId: event.contextId+_request.fetch.url, isOk: true }
			}
    }
  }

	return { messages: [], id: event.id, contextId: event.contextId+_request.fetch.url, isOk: false }
}

;(async () => {
  chrome.storage.local.onChanged.addListener(() => {
		chrome.storage.local.get(async storage => {
			const {
	      chaturbateHttpEvent = false,
	      bongacamsHttpEvent = false,
	      myfreecamsHttpEvent = false,
	      stripchatHttpEvent = false,
	      fetchCode = false
	    } = storage

			if (chaturbateHttpEvent && fetchCode.chaturbateHttpEvent) {
				chrome.storage.local.set({
		      chaturbateHttpEventCallback: (
		      	await Promise.all(
		        	fetchCode.chaturbateHttpEvent.map(request => send(request, chaturbateHttpEvent))
		        )
		      ).filter(send => send)
				})
	    }

			if (stripchatHttpEvent && fetchCode.stripchatHttpEvent) {
				chrome.storage.local.set({
		    	stripchatHttpEventCallback: (
		      	await Promise.all(
		        	fetchCode.stripchatHttpEvent.map(request => send(request, stripchatHttpEvent))
		        )
		      ).filter(send => send)
				})
	    }

      if (stripchatHttpEvent && fetchCode.stripchatHttpEvent) {
				chrome.storage.local.set({
		    	stripchatHttpEventCallback: (
		      	await Promise.all(
		        	fetchCode.stripchatHttpEvent.map(request => send(request, stripchatHttpEvent))
		        )
		      ).filter(send => send)
				})
	    }

      if (xhamsterHttpEvent && fetchCode.xhamsterHttpEvent) {
				chrome.storage.local.set({
		    	xhamsterHttpEventCallback: (
		      	await Promise.all(
		        	fetchCode.xhamsterHttpEvent.map(request => send(request, xhamsterHttpEvent))
		        )
		      ).filter(send => send)
				})
	    }

			if (bongacamsHttpEvent && fetchCode.bongacamsHttpEvent) {
				chrome.storage.local.set({
		    	bongacamsHttpEventCallback: (
		      	await Promise.all(
		        	fetchCode.bongacamsHttpEvent.map(request => send(request, bongacamsHttpEvent))
		        )
		     	).filter(send => send)
				})
	    }

			if (myfreecamsHttpEvent && fetchCode.myfreecamsHttpEvent) {
				chrome.storage.local.set({
		    	myfreecamsHttpEventCallback: (
		      	await Promise.all(
		        	fetchCode.myfreecamsHttpEvent.map(request => send(request, myfreecamsHttpEvent))
		        )
		     	).filter(send => send)
				})
	    }
		})
	})
})()

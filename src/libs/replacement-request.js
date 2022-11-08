const replacementRequest = (request, event) => {
  const parser = (routeData, event) => {
		const match = routeData.match(/\({[^\}]+}\)/)

    if (match) {
      const keys = (match+'').slice(8, -2).split('.')

			const value = keys.reduce(
				(event, key) => {
					if (key === 'model' || key === 'user' || key === 'notice' || key === 'pureEvent' || key === 'message' || key === 'tokenMessage') {
            try {
              return base64.encode(JSON.stringify(event[key]).split('').map(e => e.charCodeAt()))
            } catch (err) {
              console.log(err)
              return base64.encode(JSON.stringify(''))
            }
					}
					return event[key]
				}
				,
				event
			)

      routeData = JSON.stringify(
				replaceValueByValue(
					match+'',
					value,
					JSON.parse(routeData)
				)
			)
    } else {
			const match = routeData.match(/bodyAsJSON/)
			if (match) {
				event.parseEvent.model = base64.encode(JSON.stringify(event.parseEvent.model).split('').map(e => e.charCodeAt()))
				event.parseEvent.user = base64.encode(JSON.stringify(event.parseEvent.user).split('').map(e => e.charCodeAt()))
				event.parseEvent.notice = base64.encode(JSON.stringify(event.parseEvent.notice).split('').map(e => e.charCodeAt()))
				event.parseEvent.message = base64.encode(JSON.stringify(event.parseEvent.message).split('').map(e => e.charCodeAt()))
				event.parseEvent.tokenMessage = base64.encode(JSON.stringify(event.parseEvent.tokenMessage).split('').map(e => e.charCodeAt()))
				event.pureEvent = base64.encode(JSON.stringify(event.parseEvent).split('').map(e => e.charCodeAt()))

				const data = JSON.parse(routeData)

				routeData = JSON.stringify({
					...data,
					fetch: {
						...data.fetch,
						body: JSON.stringify(event)
					}
				})
	  	} else {
				return routeData
			}
    }

    return parser(routeData, event)
  }

  const routeData = JSON.stringify(request)
	const json = parser(routeData, event)
  return JSON.parse(json)
}

const replacementRequest = (request, event) => {
  const parser = (routeData, event) => {
		const match = routeData.match(/\({[^\}]+}\)/)

    if (match) {
      const keys = (match+'').slice(8, -2).split('.')

			const value = keys.reduce(
				(event, key) => {
					if (key === 'model' || key === 'user' || key === 'notice' || key === 'pureEvent' || key === 'message' || key === 'tokenMessage') {
						return base64.encode(JSON.stringify(event[key]))
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
				event.parseEvent.model = base64.encode(JSON.stringify(event.parseEvent.model))
				event.parseEvent.user = base64.encode(JSON.stringify(event.parseEvent.user))
				event.parseEvent.notice = base64.encode(JSON.stringify(event.parseEvent.notice))
				event.parseEvent.message = base64.encode(JSON.stringify(event.parseEvent.message))
				event.parseEvent.tokenMessage = base64.encode(JSON.stringify(event.parseEvent.tokenMessage))
				event.pureEvent = base64.encode(JSON.stringify(event.parseEvent))

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

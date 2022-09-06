{
  "chaturbateEvent": [{
    "fetch": {
      "url": "http://localhost:8888/events",
      "method": "POST",
      "mode": "cors",
      "headers": {
        "Content-Type": "application/json"
      },
      "body": "{\"id\":({event.id}),\"username\":\"({event.parseMessageEvent.userUsername})\",\"tokenCount\":({event.parseMessageEvent.tokenCount}),\"message\":\"({event.parseMessageEvent.message})\"}"
    },
    "cancel": 13000,
    "attemptsError": 3,
    "attemptsSleepError": 5000,
    "if": "({event.modelUsername}) == ezra"
  }]
}

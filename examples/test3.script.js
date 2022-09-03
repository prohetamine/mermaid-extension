{
  "chaturbateEvent": [{
    "fetch": {
      "url": "http://localhost:8888/eventsPost",
      "method": "POST",
      "mode": "cors",
      "headers": {
        "Content-Type": "application/json"
      },
      "body": "{\"id\":({event.id}),\"username\":\"({event.parseMessageEvent.userUsername})\",\"tokenCount\":({event.parseMessageEvent.userUsername})}"
    },
    "cancel": 13000,
    "attemptsError": 3,
    "attemptsSleepError": 5000
  }]
}

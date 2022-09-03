{
  "chaturbateEvent": [{
    "fetch": {
      "url": "http://localhost:8888/events?id=({event.id})&platform=({event.platform})&username=({event.parseMessageEvent.modelUsername})({event.parseMessageEvent.userUsername})&message=({event.parseMessageEvent.message})"
    },
    "cancel": 13000,
    "attemptsError": 30,
    "attemptsSleepError": 3000
  }]
}

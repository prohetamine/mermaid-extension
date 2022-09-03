{
  "chaturbateEvent": [{
    "fetch": {
      "url": "http://localhost:8888/events?platform=({event.platform})&message=({event.parseMessageEvent.message})"
    },
    "delay": 500,
    "cancel": 13000,
    "attemptsError": 3,
    "attemptsSleepError": 5000
  }]
}

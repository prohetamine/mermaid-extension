{
  "chaturbateEvent": [{
    "fetch": {
      "url": "http://localhost:8888/events?data=platform: ({event.platform})"
    },
    "cancel": 13000
  },{
    "fetch": {
      "url": "http://localhost:8888/events?data=id: ({event.id})"
    },
    "cancel": 13000
  },{
    "fetch": {
      "url": "http://localhost:8888/events?data=isModel: ({event.parseMessageEvent.isModel})"
    },
    "cancel": 13000
  },{
    "fetch": {
      "url": "http://localhost:8888/events?data=modelUsername: ({event.parseMessageEvent.modelUsername})"
    },
    "cancel": 13000
  },{
    "fetch": {
      "url": "http://localhost:8888/events?data=isUser: ({event.parseMessageEvent.isUser})"
    },
    "cancel": 13000
  },{
    "fetch": {
      "url": "http://localhost:8888/events?data=user username: ({event.parseMessageEvent.userUsername})"
    },
    "cancel": 13000
  },{
    "fetch": {
      "url": "http://localhost:8888/events?data=message: ({event.parseMessageEvent.message})"
    },
    "cancel": 13000
  },{
    "fetch": {
      "url": "http://localhost:8888/events?data=isToken: ({event.parseMessageEvent.isToken})"
    },
    "cancel": 13000
  },{
    "fetch": {
      "url": "http://localhost:8888/events?data=tokenCount: ({event.parseMessageEvent.tokenCount})"
    },
    "cancel": 13000
  }]
}

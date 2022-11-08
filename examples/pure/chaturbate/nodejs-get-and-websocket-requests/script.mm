{
  "chaturbateSendSocket": {
    "host": "http://localhost:8888",
    "listen": "chat-chaturbate",
    "options": {
      "reconnectionDelayMax": 10000
    }
  },
  "chaturbateHttpEvent": [{
    "title": "chaturbate platform",
    "fetch": {
      "url": "http://localhost:8888/events?data=platform: ({event.platform})"
    },
    "cancel": 13000
  },{
    "title": "chaturbate id",
    "fetch": {
      "url": "http://localhost:8888/events?data=id: ({event.id})"
    },
    "cancel": 13000
  },{
    "title": "chaturbate isModel",
    "fetch": {
      "url": "http://localhost:8888/events?data=isModel: ({event.parseEvent.isModel})"
    },
    "cancel": 13000
  },{
    "title": "chaturbate username",
    "fetch": {
      "url": "http://localhost:8888/events?data=username: ({event.parseEvent.username})"
    },
    "cancel": 13000
  },{
    "title": "chaturbate isUser",
    "fetch": {
      "url": "http://localhost:8888/events?data=isUser: ({event.parseEvent.isUser})"
    },
    "cancel": 13000
  },{
    "title": "chaturbate message",
    "fetch": {
      "url": "http://localhost:8888/events?data=message: ({event.parseEvent.message})"
    },
    "cancel": 13000
  },{
    "title": "chaturbate isToken",
    "fetch": {
      "url": "http://localhost:8888/events?data=isToken: ({event.parseEvent.isToken})"
    },
    "cancel": 13000
  },{
    "title": "chaturbate tokenCount",
    "fetch": {
      "url": "http://localhost:8888/events?data=tokenCount: ({event.parseEvent.tokenCount})"
    },
    "cancel": 13000
  }]
}

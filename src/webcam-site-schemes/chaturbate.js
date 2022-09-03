// object | type | syntax | info

{
  contextId: '9999-9999-9999', // string ({event.contextId}) - the id of the current window is saved until the page is completely reloaded
  id: 1, // number ({event.id}) - serial number of the message (event)
  hashId: '3021e68df9a7200135725c6331369a22', // string ({event.hashId}) - md5 hash messages (there may be repetitions)
  platform: 'chaturbate', // string ({event.platform}) - the platform from which the event comes
  htmlMessage: '<html>', // string ({event.htmlMessage}) - full message in html form
  parseMessageEvent: {
    isModel: true, // boolean ({event.parseMessageEvent.isModel}) - is the sender a model
    modelUsername: 'alexa', // string ({event.parseMessageEvent.modelUsername}) - name of the sender of the model
    isNotice: false, // boolean ({event.parseMessageEvent.isNotice}) - is the message generated, sent by a toy or a bot
    isUser: false, // boolean ({event.parseMessageEvent.isUser}) - is the sender a user
    userUsername: '', // string ({event.parseMessageEvent.userUsername}) - name of the sender of the user
    isToken: false, // boolean ({event.parseMessageEvent.isToken}) - does the message contain tokens
    tokenCount: 0, // number ({event.parseMessageEvent.tokenCount}) - the number of tokens in the message
    message: 'Hello!!', // string ({event.parseMessageEvent.message}) - the text of the user's message
    isRemovedMessage: false // boolean ({event.parseMessageEvent.isRemovedMessage}) - is the message deleted or/and the user is kicked out
  }
}

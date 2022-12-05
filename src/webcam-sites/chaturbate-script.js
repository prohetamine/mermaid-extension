try {
  let contextId = parseInt(Math.random() * 100000) + '-' + parseInt(Math.random() * 100000) + '-' + parseInt(Math.random() * 100000)
    , EVENT_ID = 0

  const sendStack = {
    /* contextId */
  }

  const usersTokenStack = {
    /* contextId */
  }

  let currnetModelUsername = null

  /*
  {
    contextId: '9999-9999-9999',
    id: 1,
    socketType: 'message',
    hashId: 'ashdsdhfhfsdhdhedhasd',
    platform: 'chaturbate',
    modelUsername: 'username',
    pureEvent: 'base64',
    isParsedEvent: true,
    parseEvent: {
      isModel: false,
      isUser: false,
      isAnon: false,
      isNotice: false,
      isToken: false,
      isRoomCount: false,
      isRemovedMessage: false,
      isDisconnect: false,
      isConnect: false,
      isBan: false,
      tokenCount: 0,
      message: "base64",
      tokenMessage: "base64",
      username: "",
      roomCount: 0,
      user: 'base64',
      model: 'base64',
      notice: 'base64'
    }
  }
  */

  document.addEventListener('readystatechange', async () => {
    if (document.readyState === 'interactive' && document.body.parentElement.textContent.match(/chaturbate/gi)) {
      window.hiddenInput = document.createElement('input')
      window.hiddenButton = document.createElement('button')
      window.hiddenScript = document.createElement('script')

      hiddenInput.hidden = true
      hiddenButton.hidden = true
      hiddenInput.id = 'hidden-input-mermaid-extension'
      hiddenButton.id = 'hidden-button-mermaid-extension'

      hiddenScript.type = 'text/javascript'
      hiddenScript.text = `
        const hime = document.querySelector('#hidden-input-mermaid-extension')
            , hbme = document.querySelector('#hidden-button-mermaid-extension')

        hbme.addEventListener('click', () => {
          if (window.location.href.match(/\\/b\\//)) {
            window.TSHandler.message_outbound.send_room_message(hime.value)
          } else {
            console.log('[not your room]', hime.value)
          }
        })

        const proxySockJS = window.SockJS

        window.SockJS = function (...args) {
          window.instanceSockJS = proxySockJS.call(this, ...args)

          setTimeout(() => {
            const onmessage = window.instanceSockJS.onmessage
            window.instanceSockJS.onmessage = function (...args) {
              window.postMessage({ to: 'mermaidExtension', from: 'chaturbate', socketType: 'message', data: args }, window.origin);
              onmessage.call(this, ...args)
            }

            const onerror = window.instanceSockJS.onerror
            window.instanceSockJS.onerror = function (...args) {
              window.postMessage({ to: 'mermaidExtension', from: 'chaturbate', socketType: 'error', data: args }, window.origin);
              onerror.call(this, ...args)
            }

            const onclose = window.instanceSockJS.onclose
            window.instanceSockJS.onerror = function (...args) {
              window.postMessage({ to: 'mermaidExtension', from: 'chaturbate', socketType: 'close', data: args }, window.origin);
              onclose.call(this, ...args)
            }

            const send = window.instanceSockJS.send
            window.instanceSockJS.send = function (...args) {
              window.postMessage({ to: 'mermaidExtension', from: 'chaturbate', socketType: 'send', data: args }, window.origin);
              send.call(this, ...args)
            }
          }, 1)

          return instanceSockJS
        }
      `

      document.body.appendChild(hiddenInput)
      document.body.appendChild(hiddenButton)
      document.body.appendChild(hiddenScript)

      window.addEventListener('message', event => {
        if (window.origin === event.origin && event.data && event.data.to === 'mermaidExtension') {
          EVENT_ID++

          const id = EVENT_ID
              , socketType = event.data.socketType
              , hashId = MD5(JSON.stringify({ platform: 'chaturbate', data: event.data.data }))
              , platform = 'chaturbate'
              , modelUsername = window.location.pathname.replace(/(\/b\/|\/)/, '').slice(0, -1)
              , pureEvent = event.data.data

          let isParsedEvent = false // ok
            , isModel = false // ok
            , isUser = false // ok
            , isAnon = false // ok
            , isNotice = false // ok
            , isToken = false // ok
            , isRoomCount = false // ok
            , isRemovedMessage = false // ??
            , isDisconnect = false // ok
            , isConnect = false // ok
            , isBan = false // ???

          let tokenCount = 0 // ok
            , username = '' // ok
            , message = '' // ok
            , tokenMessage = '' // ok
            , roomCount = 0 // ok
            , user = {} // ok
            , model = {} // ok
            , notice = {} // ok

          if (socketType === 'send') {
            console.log('send', pureEvent)
            return
          }

          if (currnetModelUsername !== modelUsername) {
            currnetModelUsername = modelUsername
            contextId = parseInt(Math.random() * 100000) + '-' + parseInt(Math.random() * 100000) + '-' + parseInt(Math.random() * 100000)
            EVENT_ID = 0
          }

          try {
            const data = pureEvent[0]

            console.log(data.type)

            try {
              const messageData = JSON.parse(data.data)

              console.log(messageData.method)
            } catch (e) {
              console.log('none')
            }

            console.log(data)

            /*
              onKick
              {
                "type": "message",
                "bubbles": false,
                "cancelable": false,
                "timeStamp": 1665193213711,
                "data": "{\"args\":[\"acsafipubnicole\"],\"callback\":null,\"method\":\"onKick\"}"
              }
            */

            /*
              onSilence
              {
                "type": "message",
                "bubbles": false,
                "cancelable": false,
                "timeStamp": 1665194504671,
                "data": "{\"args\":[\"daykerfiso33\",\"voltica\"],\"callback\":null,\"method\":\"onSilence\"}"
              }

            */

            if (data.type === 'message') {
              const messageData = JSON.parse(data.data)

              if (messageData.method === 'onRoomMsg') {
                username = messageData.args[0]

                const parseMessage = JSON.parse(messageData.args[1])
                message = parseMessage.m

                if (username !== modelUsername) {
                  isUser = true
                  user = {
                    spam: parseMessage['X-Spam'],
                    good: parseMessage['X-Successful'],
                    textColor: parseMessage.c,
                    textFont: parseMessage.f,
                    gender: parseMessage.gender,
                    hasTokens: parseMessage.has_tokens,
                    inFanclub: parseMessage.in_fanclub,
                    isFollowing: parseMessage.is_following,
                    isMod: parseMessage.is_mod,
                    media: parseMessage.media,
                    tippedAlotRecently: parseMessage.tipped_alot_recently,
                    tippedRecently: parseMessage.tipped_recently,
                    tippedTonsRecently: parseMessage.tipped_tons_recently,
                    tippedMe: usersTokenStack[username] || 0
                  }
                } else {
                  isModel = true
                  model = {
                    spam: parseMessage['X-Spam'],
                    good: parseMessage['X-Successful'],
                    textColor: parseMessage.c,
                    textFont: parseMessage.f,
                    gender: parseMessage.gender,
                    hasTokens: parseMessage.has_tokens,
                    inFanclub: parseMessage.in_fanclub,
                    isFollowing: parseMessage.is_following,
                    isMod: parseMessage.is_mod,
                    media: parseMessage.media,
                    tippedAlotRecently: parseMessage.tipped_alot_recently,
                    tippedRecently: parseMessage.tipped_recently,
                    tippedTonsRecently: parseMessage.tipped_tons_recently,
                    tippedMe: usersTokenStack[username] || 0
                  }
                }

                isParsedEvent = true
              }

              if (messageData.method === 'onNotify') {
                const parseNotify = JSON.parse(messageData.args[0])

                if (parseNotify.type === 'tip_alert') {
                  isToken = true
                  isAnon = parseNotify.is_anonymous_tip
                  tokenCount = parseNotify.amount
                  tokenMessage = parseNotify.message || ''

                  if (!isAnon) {
                    isUser = true
                    username = parseNotify.from_username
                    user = {
                      hasTokens: parseNotify.has_tokens,
                      inFanclub: parseNotify.in_fanclub,
                      isFollowing: parseNotify.is_following,
                      isMod: parseNotify.is_mod,
                      tippedAlotRecently: parseNotify.tipped_alot_recently,
                      tippedRecently: parseNotify.tipped_recently,
                      tippedTonsRecently: parseNotify.tipped_tons_recently,
                      tippedMe: usersTokenStack[username] || 0
                    }
                  }

                  isParsedEvent = true
                }

                if (parseNotify.type === 'appnotice') {
                  isNotice = true
                  message = parseNotify.msg.join('\n')

                  notice = {
                    foreground: parseNotify.foreground,
                    weight: parseNotify.weight
                  }

                  isParsedEvent = true
                }

                if (parseNotify.type === 'room_entry') {
                  isConnect = true
                  username = parseNotify.username

                  if (username !== modelUsername) {
                    isUser = true
                    user = {
                      exploringHashTag: parseNotify.exploringHashTag,
                      hasTokens: parseNotify.has_tokens,
                      inFanclub: parseNotify.in_fanclub,
                      isMod: parseNotify.is_mod,
                      tippedAlotRecently: parseNotify.tipped_alot_recently,
                      tippedRecently: parseNotify.tipped_recently,
                      tippedTonsRecently: parseNotify.tipped_tons_recently,
                      tippedMe: usersTokenStack[username] || 0
                    }
                  } else {
                    isModel = true
                    model = {
                      exploringHashTag: parseNotify.exploringHashTag,
                      hasTokens: parseNotify.has_tokens,
                      inFanclub: parseNotify.in_fanclub,
                      isMod: parseNotify.is_mod,
                      tippedAlotRecently: parseNotify.tipped_alot_recently,
                      tippedRecently: parseNotify.tipped_recently,
                      tippedTonsRecently: parseNotify.tipped_tons_recently,
                      tippedMe: usersTokenStack[username] || 0
                    }
                  }

                  isParsedEvent = true
                }

                if (parseNotify.type === 'room_leave') {
                  isDisconnect = true
                  username = parseNotify.username

                  if (username !== modelUsername) {
                    isUser = true
                    user = {
                      exploringHashTag: parseNotify.exploringHashTag,
                      hasTokens: parseNotify.has_tokens,
                      inFanclub: parseNotify.in_fanclub,
                      isMod: parseNotify.is_mod,
                      tippedAlotRecently: parseNotify.tipped_alot_recently,
                      tippedRecently: parseNotify.tipped_recently,
                      tippedTonsRecently: parseNotify.tipped_tons_recently,
                      tippedMe: usersTokenStack[username] || 0
                    }
                  } else {
                    isModel = true
                    model = {
                      exploringHashTag: parseNotify.exploringHashTag,
                      hasTokens: parseNotify.has_tokens,
                      inFanclub: parseNotify.in_fanclub,
                      isMod: parseNotify.is_mod,
                      tippedAlotRecently: parseNotify.tipped_alot_recently,
                      tippedRecently: parseNotify.tipped_recently,
                      tippedTonsRecently: parseNotify.tipped_tons_recently,
                      tippedMe: usersTokenStack[username] || 0
                    }
                  }

                  isParsedEvent = true
                }
              }

              if (messageData.method === 'onRoomCountUpdate') {
                const parseRoomCount = JSON.parse(messageData.args[0])

                isRoomCount = true
                roomCount = parseRoomCount
                isParsedEvent = true
              }
            }
          } catch (e) {
            console.log(e, pureEvent)
            isParsedEvent = false
          }

          if (message.match(/ֹ/)) {
            return false
          }

          const chaturbateHttpEvent = {
            contextId,
            id,
            socketType,
            hashId,
            platform,
            modelUsername,
            pureEvent,
            isParsedEvent,
            parseEvent: {
              isModel,
              isUser,
              isAnon,
              isNotice,
              isToken,
              isBan,
              isRemovedMessage,
              isDisconnect,
              isConnect,
              isRoomCount,
              tokenCount,
              message,
              tokenMessage,
              username,
              roomCount,
              user,
              model,
              notice
            }
          }

          console.log(chaturbateHttpEvent)

          chrome.storage.local.set({
            chaturbateHttpEvent
          })
        }
      })
    }

    if (document.readyState === 'complete' && document.body.parentElement.textContent.match(/chaturbate/gi)) {
      chrome.storage.local.onChanged.addListener(() => {
        chrome.storage.local.get(async storage => {
          const {
            chaturbateHttpEventCallback = false
          } = storage

          if (chaturbateHttpEventCallback) {
            for (let i = 0; i < chaturbateHttpEventCallback.length; i++) {
              const event = chaturbateHttpEventCallback[i]

              if (event.isOk && (sendStack[event.contextId] ? !(sendStack[event.contextId].find(id => id === event.id)) : true)) {
                for (let m = 0; m < event.messages.length; m++) {
                  const { text, delay } = event.messages[m]
                  if (sendStack[event.contextId]) {
                    sendStack[event.contextId].push(event.id)
                  } else {
                    sendStack[event.contextId] = []
                  }
                  await sleep(delay)

                  const fixEmotionText = (match => (match && match[0]) ? ' '+text : text)(text.match(/^:(\w|-|_|\d)+/))

                  hiddenInput.value = 'ֹ' + fixEmotionText
                  hiddenButton.click()
                }
              }
            }
          }
        })
      })

      setTimeout(async () => {
        console.log(`[Chaturbate] Mermaid extension: chat connected`)

        chrome.storage.local.get(({ fetchCode }) => {
          if (fetchCode && fetchCode.chaturbateSendSocket && fetchCode.chaturbateSendSocket.host && fetchCode.chaturbateSendSocket.listen) {
            const socket = io(
              fetchCode.chaturbateSendSocket.host,
              fetchCode.chaturbateSendSocket.options
            )

            socket.on('connect', async () =>
              console.log(`[Chaturbate] Mermaid extension: chat Web Socket connected`)
            )

            socket.io.on('reconnect_attempt', async attempt =>
              console.log(`[Chaturbate] Mermaid extension: chat Web Socket reconnect (${attempt})`)
            )

            socket.io.on('reconnect_failed', async () =>
              console.log(`[Chaturbate] Mermaid extension: chat Web Socket reconnect`)
            )

            socket.io.on('error', async error =>
              console.log(`[Chaturbate] Mermaid extension: chat Web Socket error ${error}`)
            )

            socket.on(fetchCode.chaturbateSendSocket.listen, async messages => {
              for (let m = 0; m < messages.length; m++) {
                const { text, delay } = messages[m]
                await sleep(delay)

                const fixEmotionText = (match => (match && match[0]) ? ' '+text : text)(text.match(/^:(\w|-|_|\d)+/))

                hiddenInput.value = 'ֹ' + fixEmotionText
                hiddenButton.click()
              }
            })
          }
        })
      }, 5000)
    }
  })
} catch (err) {
  console.log('chaturbate-script')
  console.log(err)
}

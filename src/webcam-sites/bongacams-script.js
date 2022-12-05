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
    platform: 'bongacams',
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
    if (document.readyState === 'interactive' && document.head.querySelector('meta[content="#81003a"]')) {
      window.hiddenInput = document.createElement('input')
      window.hiddenButton = document.createElement('button')
      window.hiddenScript = document.createElement('script')

      hiddenInput.hidden = true
      hiddenButton.hidden = true
      hiddenInput.id = 'hidden-input-mermaid-extension'
      hiddenButton.id = 'hidden-button-mermaid-extension'

      hiddenScript.type = 'text/javascript'
      hiddenScript.text = `
        const proxyWebSocket = window.WebSocket

        window.WebSocket = class {
          constructor (...args) {
            const instanceWebSocket = new proxyWebSocket(...args)

            if (args[0].match(/\.bcccdn\./)) {
              const hime = document.querySelector('#hidden-input-mermaid-extension')
                  , hbme = document.querySelector('#hidden-button-mermaid-extension')

              let id = 2

              hbme.addEventListener('click', () => {
                if (document.querySelector('[id="js-chat_general"]')) {
                  let currentValue = hime.value
                  instanceWebSocket.send(
                    JSON.stringify({
                      "id":id,
                      "name":"ChatModule.sendMessage",
                      "args":["public-chat",currentValue,"key",null,true]
                    })
                  )
                  id++
                } else {
                  console.log('[not your room]', hime.value)
                }
              })

              console.log('connect', instanceWebSocket)

              instanceWebSocket.addEventListener('message', ({ data }) => {
                id++
                window.postMessage({ to: 'mermaidExtension', from: 'stripchat', socketType: 'message', data }, window.origin);
              })

              instanceWebSocket.addEventListener('error', error => {
                window.postMessage({ to: 'mermaidExtension', from: 'stripchat', socketType: 'error', data: error }, window.origin);
              })

              instanceWebSocket.addEventListener('close', close => {
                window.postMessage({ to: 'mermaidExtension', from: 'stripchat', socketType: 'close', data: close }, window.origin);
              })

              const send = instanceWebSocket.send
              instanceWebSocket.send = function (...args) {
                window.postMessage({ to: 'mermaidExtension', from: 'stripchat', socketType: 'send', data: args }, window.origin);
                send.call(this, ...args)
              }
            }

            return instanceWebSocket
          }
        }
      `

      document.body.appendChild(hiddenInput)
      document.body.appendChild(hiddenButton)
      document.body.appendChild(hiddenScript)

      window.addEventListener('message', event => {
        if (window.origin === event.origin && event.data && event.data.to === 'mermaidExtension') {
          EVENT_ID++

          const data = JSON.parse(event.data.data)

          const id = EVENT_ID
              , socketType = event.data.socketType
              , hashId = MD5(JSON.stringify({ platform: 'bongacams', data: event.data.data }))
              , platform = 'bongacams'
              , modelUsername = window.location.pathname.slice(1)
              , pureEvent = event.data.data
              , pureEventJS = JSON.parse(pureEvent)

          let isParsedEvent = false // ok
            , isModel = false // ok
            , isUser = false // ok
            , isAnon = false // ok
            , isNotice = false // ok
            , isToken = false // ok
            , isRoomCount = false // ??
            , isRemovedMessage = false // ??
            , isDisconnect = false // ??
            , isConnect = false // ??
            , isBan = false // ok

          let tokenCount = 0 // ok
            , username = '' // ok
            , message = '' // ok
            , tokenMessage = '' // ok
            , roomCount = 0 // ??
            , user = {} // ok
            , model = {} // ok
            , notice = {} // ok

          if (socketType === 'send') {
            return
          }

          if (!pureEventJS.type) {
            return
          }

          if (pureEventJS.type === 'ServerMessageEvent:INCOMING_TIP') {
            console.log(pureEventJS)
            isToken = true
            isUser = true
            tokenCount = pureEventJS.body.a
            username = pureEventJS.body.f.username
            user = pureEventJS.body.f
            isParsedEvent = true
          }

          if (pureEventJS.type === 'ServerMessageEvent:CHAT_INCOMING_MESSAGE') {
            console.log(pureEventJS)
            if (pureEventJS.body.author.role === 'member') {
              isUser = true
              user = pureEventJS.body.author
            } else {
              isModel = true
              model = pureEventJS.body.author
            }

            username = pureEventJS.body.author.username
            message = pureEventJS.body.message
            isParsedEvent = true
          }

          if (pureEventJS.type === 'ServerMessageEvent:DELETE_MESSAGE') {
            console.log(pureEventJS)
          }

          if (pureEventJS.type === 'ServerMessageEvent:INCOMING_NOTICE') {
            console.log(pureEventJS)
            isNotice = true
            message = pureEventJS.body.message
            notice = pureEventJS.body
            isParsedEvent = true
          }

          if (pureEventJS.type === 'ServerMessageEvent:TIP_KING_CHANGE') {
            console.log(pureEventJS)
          }

          if (message.match(/ֹ/)) {
            return false
          }

          const bongacamsHttpEvent = {
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

          ///console.log(bongacamsHttpEvent)

          chrome.storage.local.set({
            bongacamsHttpEvent
          })
        }
      })
    }

    if (document.readyState === 'complete' && document.head.querySelector('meta[content="#81003a"]')) {
      chrome.storage.local.onChanged.addListener(() => {
        chrome.storage.local.get(async storage => {
          const {
            bongacamsHttpEventCallback = false
          } = storage

          if (bongacamsHttpEventCallback) {
            for (let i = 0; i < bongacamsHttpEventCallback.length; i++) {
              const event = bongacamsHttpEventCallback[i]

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
        console.log(`[Bongacams] Mermaid extension: chat connected`)

        chrome.storage.local.get(({ fetchCode }) => {
          if (fetchCode && fetchCode.bongacamsSendSocket && fetchCode.bongacamsSendSocket.host && fetchCode.bongacamsSendSocket.listen) {
            const socket = io(
              fetchCode.bongacamsSendSocket.host,
              fetchCode.bongacamsSendSocket.options
            )

            socket.on('connect', async () =>
              console.log(`[Bongacams] Mermaid extension: chat Web Socket connected`)
            )

            socket.io.on('reconnect_attempt', async attempt =>
              console.log(`[Bongacams] Mermaid extension: chat Web Socket reconnect (${attempt})`)
            )

            socket.io.on('reconnect_failed', async () =>
              console.log(`[Bongacams] Mermaid extension: chat Web Socket reconnect`)
            )

            socket.io.on('error', async error =>
              console.log(`[Bongacams] Mermaid extension: chat Web Socket error ${error}`)
            )

            socket.on(fetchCode.bongacamsSendSocket.listen, async messages => {
              for (let m = 0; m < messages.length; m++) {
                const { text, delay } = messages[m]
                await sleep(delay + 200)

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
  console.log('bongacams-script')
  console.log(err)
}

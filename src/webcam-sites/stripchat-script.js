try {
  const webcamSiteIdentifyNode = '.'

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
    platform: 'stripchat',
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
      isRoomCount: false,
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
    if (document.readyState === 'interactive' && document.body.parentElement.textContent.match(/stripchat/gi)) {
      alert('stripchat')
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
          if (document.querySelector('[id="broadcast-settings"]')) {
            const input = document.querySelector('[class="input-message-wrapper__input"]')
                , send = document.querySelector('button.btn-send')

            let currentValue = input.value
            const inputReactKey = Object.keys(input).find(key => key.match(/__reactProps/))
            input[inputReactKey].onChange({ stopPropagation: () => {}, target: { value: hime.value } })
            send.click()
            input[inputReactKey].onChange({ stopPropagation: () => {}, target: { value: currentValue } })
          } else {
            console.log('[not your room]', hime.value)
          }
        })

        const proxyWebSocket = window.WebSocket

        window.WebSocket = class {
          constructor (...args) {
            const instanceWebSocket = new proxyWebSocket(...args)

            if (args[0].match(/comet2/)) {
              console.log('connect', instanceWebSocket)

              instanceWebSocket.addEventListener('message', ({ data }) => {
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
              , hashId = MD5(JSON.stringify({ platform: 'stripchat', data: event.data.data }))
              , platform = 'stripchat'
              , modelUsername = window.location.pathname.slice(1)
              , pureEvent = event.data.data

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

          if (currnetModelUsername !== modelUsername) {
            currnetModelUsername = modelUsername
            contextId = parseInt(Math.random() * 100000) + '-' + parseInt(Math.random() * 100000) + '-' + parseInt(Math.random() * 100000)
            EVENT_ID = 0
          }

          try {
            if (data.subscriptionKey) {
              //console.log('subscriptionKey', data.subscriptionKey)

              if (data.subscriptionKey.match(/modelStatusChanged/)) {
                //console.log(data)
              }

              if (data.subscriptionKey.match(/userBanned/)) {
                isBan = true
                /*
                  {
                    "ban": {
                        "id": 36536598,
                        "createdAt": "2022-10-07T15:24:36Z",
                        "isDeleted": false,
                        "moderatorId": 42965688,
                        "bannedId": 92406005,
                        "userId": 32721658,
                        "isExpired": false,
                        "expiredAt": "2022-10-08T15:24:36Z",
                        "type": "mute",
                        "isVisible": true,
                        "isAnonymous": false
                    },
                    "banReason": null
                  }
                */

                isParsedEvent = false
              }

              if (data.subscriptionKey.match(/goalChanged/)) {
                const goal = data.params.goal
                isNotice = true
                message = goal.description
                notice = {
                  type: 'goalChanged',
                  goal: goal.goal,
                  isEnabled: goal.isEnabled,
                  left: goal.left,
                  spent: goal.spent
                }

                isParsedEvent = false
              }

              if (data.subscriptionKey.match(/newChatMessage/)) {
                const msg = data.params.message

                //console.log(msg.type)

                if (msg.type === 'userBoughtContent') {
                  //console.log(msg)
                }


                if (msg.type === 'newKing') {
                  //console.log(msg)
                }


                if (msg.type === 'tip' || msg.type === 'privateTip') {
                  isToken = true
                  tokenCount = msg.details.amount
                  tokenMessage = msg.details.body || ''

                  if (msg.details.isAnonymous) {
                    isAnon = true
                  } else {
                    isUser = true
                    username = msg.userData.username
                    user = {
                      ...msg.userData,
                      tippedMe: usersTokenStack[username] || 0
                    }
                  }

                  isParsedEvent = false
                }

                if (msg.type === 'goal') {
                  isNotice = true
                  message = msg.details.body
                  notice = {
                    type: 'goal',
                    goal: msg.details.goal,
                    isEnabled: msg.details.isEnabled,
                  }

                  isParsedEvent = false
                }

                if (msg.type === 'thresholdGoal') {
                  isNotice = true
                  message = msg.details.body
                  notice = {
                    type: 'thresholdGoal',
                    goal: msg.details.goal
                  }

                  isParsedEvent = false
                }

                if (msg.type === 'lovense') {
                  isNotice = true
                  message = msg.details.lovenseDetails.text
                  notice = {
                    type: 'lovense',
                    ...msg.details.lovenseDetails
                  }

                  isParsedEvent = false
                }

                if (msg.type === 'text') {
                  message = msg.details.body
                  username = msg.userData.username

                  if (username !== modelUsername) {
                    isUser = true
                    user = {
                      ...msg.userData,
                      tippedMe: usersTokenStack[username] || 0
                    }
                  } else {
                    isModel = true
                    model = {
                      ...msg.userData
                    }
                  }

                  isParsedEvent = false
                }
              }
            } else {
              isParsedEvent = false
            }

          } catch (e) {
            console.log(e, pureEvent)
          }

          if (message.match(/ֹ/)) {
            return false
          }

          const stripchatHttpEvent = {
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

          console.log(stripchatHttpEvent)

          chrome.storage.local.set({
            stripchatHttpEvent
          })
        }
      })
    }

    if (document.readyState === 'complete') {
      chrome.storage.local.onChanged.addListener(() => {
        chrome.storage.local.get(async storage => {
          const {
            stripchatHttpEventCallback = false
          } = storage

          if (stripchatHttpEventCallback) {
            for (let i = 0; i < stripchatHttpEventCallback.length; i++) {
              const event = stripchatHttpEventCallback[i]

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
        console.log(`[Stripchat] Mermaid extension: chat connected`)

        chrome.storage.local.get(({ fetchCode }) => {
          if (fetchCode && fetchCode.stripchatSendSocket && fetchCode.stripchatSendSocket.host && fetchCode.stripchatSendSocket.listen) {
            const socket = io(
              fetchCode.stripchatSendSocket.host,
              fetchCode.stripchatSendSocket.options
            )

            socket.on('connect', async () =>
              console.log(`[Stripchat] Mermaid extension: chat Web Socket connected`)
            )

            socket.io.on('reconnect_attempt', async attempt =>
              console.log(`[Stripchat] Mermaid extension: chat Web Socket reconnect (${attempt})`)
            )

            socket.io.on('reconnect_failed', async () =>
              console.log(`[Stripchat] Mermaid extension: chat Web Socket reconnect`)
            )

            socket.io.on('error', async error =>
              console.log(`[Stripchat] Mermaid extension: chat Web Socket error ${error}`)
            )

            socket.on(fetchCode.stripchatSendSocket.listen, async messages => {
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
  console.log('stripchat-script')
  console.log(err)
}

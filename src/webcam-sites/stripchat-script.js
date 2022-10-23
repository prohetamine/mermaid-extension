const sleep = ms => new Promise(res => setTimeout(res, ms))

const MD5 = function(r){function n(o){if(t[o])return t[o].exports;var e=t[o]={i:o,l:!1,exports:{}};return r[o].call(e.exports,e,e.exports,n),e.l=!0,e.exports}var t={};return n.m=r,n.c=t,n.i=function(r){return r},n.d=function(r,t,o){n.o(r,t)||Object.defineProperty(r,t,{configurable:!1,enumerable:!0,get:o})},n.n=function(r){var t=r&&r.__esModule?function(){return r.default}:function(){return r};return n.d(t,"a",t),t},n.o=function(r,n){return Object.prototype.hasOwnProperty.call(r,n)},n.p="",n(n.s=4)}([function(r,n){var t={utf8:{stringToBytes:function(r){return t.bin.stringToBytes(unescape(encodeURIComponent(r)))},bytesToString:function(r){return decodeURIComponent(escape(t.bin.bytesToString(r)))}},bin:{stringToBytes:function(r){for(var n=[],t=0;t<r.length;t++)n.push(255&r.charCodeAt(t));return n},bytesToString:function(r){for(var n=[],t=0;t<r.length;t++)n.push(String.fromCharCode(r[t]));return n.join("")}}};r.exports=t},function(r,n,t){!function(){var n=t(2),o=t(0).utf8,e=t(3),u=t(0).bin,i=function(r,t){r.constructor==String?r=t&&"binary"===t.encoding?u.stringToBytes(r):o.stringToBytes(r):e(r)?r=Array.prototype.slice.call(r,0):Array.isArray(r)||(r=r.toString());for(var f=n.bytesToWords(r),s=8*r.length,c=1732584193,a=-271733879,l=-1732584194,g=271733878,h=0;h<f.length;h++)f[h]=16711935&(f[h]<<8|f[h]>>>24)|4278255360&(f[h]<<24|f[h]>>>8);f[s>>>5]|=128<<s%32,f[14+(s+64>>>9<<4)]=s;for(var p=i._ff,y=i._gg,v=i._hh,d=i._ii,h=0;h<f.length;h+=16){var b=c,T=a,x=l,B=g;c=p(c,a,l,g,f[h+0],7,-680876936),g=p(g,c,a,l,f[h+1],12,-389564586),l=p(l,g,c,a,f[h+2],17,606105819),a=p(a,l,g,c,f[h+3],22,-1044525330),c=p(c,a,l,g,f[h+4],7,-176418897),g=p(g,c,a,l,f[h+5],12,1200080426),l=p(l,g,c,a,f[h+6],17,-1473231341),a=p(a,l,g,c,f[h+7],22,-45705983),c=p(c,a,l,g,f[h+8],7,1770035416),g=p(g,c,a,l,f[h+9],12,-1958414417),l=p(l,g,c,a,f[h+10],17,-42063),a=p(a,l,g,c,f[h+11],22,-1990404162),c=p(c,a,l,g,f[h+12],7,1804603682),g=p(g,c,a,l,f[h+13],12,-40341101),l=p(l,g,c,a,f[h+14],17,-1502002290),a=p(a,l,g,c,f[h+15],22,1236535329),c=y(c,a,l,g,f[h+1],5,-165796510),g=y(g,c,a,l,f[h+6],9,-1069501632),l=y(l,g,c,a,f[h+11],14,643717713),a=y(a,l,g,c,f[h+0],20,-373897302),c=y(c,a,l,g,f[h+5],5,-701558691),g=y(g,c,a,l,f[h+10],9,38016083),l=y(l,g,c,a,f[h+15],14,-660478335),a=y(a,l,g,c,f[h+4],20,-405537848),c=y(c,a,l,g,f[h+9],5,568446438),g=y(g,c,a,l,f[h+14],9,-1019803690),l=y(l,g,c,a,f[h+3],14,-187363961),a=y(a,l,g,c,f[h+8],20,1163531501),c=y(c,a,l,g,f[h+13],5,-1444681467),g=y(g,c,a,l,f[h+2],9,-51403784),l=y(l,g,c,a,f[h+7],14,1735328473),a=y(a,l,g,c,f[h+12],20,-1926607734),c=v(c,a,l,g,f[h+5],4,-378558),g=v(g,c,a,l,f[h+8],11,-2022574463),l=v(l,g,c,a,f[h+11],16,1839030562),a=v(a,l,g,c,f[h+14],23,-35309556),c=v(c,a,l,g,f[h+1],4,-1530992060),g=v(g,c,a,l,f[h+4],11,1272893353),l=v(l,g,c,a,f[h+7],16,-155497632),a=v(a,l,g,c,f[h+10],23,-1094730640),c=v(c,a,l,g,f[h+13],4,681279174),g=v(g,c,a,l,f[h+0],11,-358537222),l=v(l,g,c,a,f[h+3],16,-722521979),a=v(a,l,g,c,f[h+6],23,76029189),c=v(c,a,l,g,f[h+9],4,-640364487),g=v(g,c,a,l,f[h+12],11,-421815835),l=v(l,g,c,a,f[h+15],16,530742520),a=v(a,l,g,c,f[h+2],23,-995338651),c=d(c,a,l,g,f[h+0],6,-198630844),g=d(g,c,a,l,f[h+7],10,1126891415),l=d(l,g,c,a,f[h+14],15,-1416354905),a=d(a,l,g,c,f[h+5],21,-57434055),c=d(c,a,l,g,f[h+12],6,1700485571),g=d(g,c,a,l,f[h+3],10,-1894986606),l=d(l,g,c,a,f[h+10],15,-1051523),a=d(a,l,g,c,f[h+1],21,-2054922799),c=d(c,a,l,g,f[h+8],6,1873313359),g=d(g,c,a,l,f[h+15],10,-30611744),l=d(l,g,c,a,f[h+6],15,-1560198380),a=d(a,l,g,c,f[h+13],21,1309151649),c=d(c,a,l,g,f[h+4],6,-145523070),g=d(g,c,a,l,f[h+11],10,-1120210379),l=d(l,g,c,a,f[h+2],15,718787259),a=d(a,l,g,c,f[h+9],21,-343485551),c=c+b>>>0,a=a+T>>>0,l=l+x>>>0,g=g+B>>>0}return n.endian([c,a,l,g])};i._ff=function(r,n,t,o,e,u,i){var f=r+(n&t|~n&o)+(e>>>0)+i;return(f<<u|f>>>32-u)+n},i._gg=function(r,n,t,o,e,u,i){var f=r+(n&o|t&~o)+(e>>>0)+i;return(f<<u|f>>>32-u)+n},i._hh=function(r,n,t,o,e,u,i){var f=r+(n^t^o)+(e>>>0)+i;return(f<<u|f>>>32-u)+n},i._ii=function(r,n,t,o,e,u,i){var f=r+(t^(n|~o))+(e>>>0)+i;return(f<<u|f>>>32-u)+n},i._blocksize=16,i._digestsize=16,r.exports=function(r,t){if(void 0===r||null===r)throw new Error("Illegal argument "+r);var o=n.wordsToBytes(i(r,t));return t&&t.asBytes?o:t&&t.asString?u.bytesToString(o):n.bytesToHex(o)}}()},function(r,n){!function(){var n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",t={rotl:function(r,n){return r<<n|r>>>32-n},rotr:function(r,n){return r<<32-n|r>>>n},endian:function(r){if(r.constructor==Number)return 16711935&t.rotl(r,8)|4278255360&t.rotl(r,24);for(var n=0;n<r.length;n++)r[n]=t.endian(r[n]);return r},randomBytes:function(r){for(var n=[];r>0;r--)n.push(Math.floor(256*Math.random()));return n},bytesToWords:function(r){for(var n=[],t=0,o=0;t<r.length;t++,o+=8)n[o>>>5]|=r[t]<<24-o%32;return n},wordsToBytes:function(r){for(var n=[],t=0;t<32*r.length;t+=8)n.push(r[t>>>5]>>>24-t%32&255);return n},bytesToHex:function(r){for(var n=[],t=0;t<r.length;t++)n.push((r[t]>>>4).toString(16)),n.push((15&r[t]).toString(16));return n.join("")},hexToBytes:function(r){for(var n=[],t=0;t<r.length;t+=2)n.push(parseInt(r.substr(t,2),16));return n},bytesToBase64:function(r){for(var t=[],o=0;o<r.length;o+=3)for(var e=r[o]<<16|r[o+1]<<8|r[o+2],u=0;u<4;u++)8*o+6*u<=8*r.length?t.push(n.charAt(e>>>6*(3-u)&63)):t.push("=");return t.join("")},base64ToBytes:function(r){r=r.replace(/[^A-Z0-9+\/]/gi,"");for(var t=[],o=0,e=0;o<r.length;e=++o%4)0!=e&&t.push((n.indexOf(r.charAt(o-1))&Math.pow(2,-2*e+8)-1)<<2*e|n.indexOf(r.charAt(o))>>>6-2*e);return t}};r.exports=t}()},function(r,n){function t(r){return!!r.constructor&&"function"==typeof r.constructor.isBuffer&&r.constructor.isBuffer(r)}function o(r){return"function"==typeof r.readFloatLE&&"function"==typeof r.slice&&t(r.slice(0,0))}/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
r.exports=function(r){return null!=r&&(t(r)||o(r)||!!r._isBuffer)}},function(r,n,t){r.exports=t(1)}]);

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
    message: "",
    tokenMessage: "",
    username: "",
    roomCount: 0,
    user: 'base64',
    model: 'base64',
    notice: 'base64'
  }
}
*/

document.addEventListener('readystatechange', () => {
  if (document.readyState === 'interactive') {
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
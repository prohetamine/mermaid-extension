/*! https://mths.be/base64 v1.0.0 by @mathias | MIT license */
;(function(root) {

	// Detect free variables `exports`.
	var freeExports = typeof exports == 'object' && exports;

	// Detect free variable `module`.
	var freeModule = typeof module == 'object' && module &&
		module.exports == freeExports && module;

	// Detect free variable `global`, from Node.js or Browserified code, and use
	// it as `root`.
	var freeGlobal = typeof global == 'object' && global;
	if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
		root = freeGlobal;
	}

	var InvalidCharacterError = function(message) {
		this.message = message;
	};
	InvalidCharacterError.prototype = new Error;
	InvalidCharacterError.prototype.name = 'InvalidCharacterError';

	var error = function(message) {
		// Note: the error messages used throughout this file match those used by
		// the native `atob`/`btoa` implementation in Chromium.
		throw new InvalidCharacterError(message);
	};

	var TABLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	// http://whatwg.org/html/common-microsyntaxes.html#space-character
	var REGEX_SPACE_CHARACTERS = /[\t\n\f\r ]/g;

	// `decode` is designed to be fully compatible with `atob` as described in the
	// HTML Standard. http://whatwg.org/html/webappapis.html#dom-windowbase64-atob
	// The optimized base64-decoding algorithm used is based on @atk’s excellent
	// implementation. https://gist.github.com/atk/1020396
	var decode = function(input) {
		input = String(input)
			.replace(REGEX_SPACE_CHARACTERS, '');
		var length = input.length;
		if (length % 4 == 0) {
			input = input.replace(/==?$/, '');
			length = input.length;
		}
		if (
			length % 4 == 1 ||
			// http://whatwg.org/C#alphanumeric-ascii-characters
			/[^+a-zA-Z0-9/]/.test(input)
		) {
			error(
				'Invalid character: the string to be decoded is not correctly encoded.'
			);
		}
		var bitCounter = 0;
		var bitStorage;
		var buffer;
		var output = '';
		var position = -1;
		while (++position < length) {
			buffer = TABLE.indexOf(input.charAt(position));
			bitStorage = bitCounter % 4 ? bitStorage * 64 + buffer : buffer;
			// Unless this is the first of a group of 4 characters…
			if (bitCounter++ % 4) {
				// …convert the first 8 bits to a single ASCII character.
				output += String.fromCharCode(
					0xFF & bitStorage >> (-2 * bitCounter & 6)
				);
			}
		}
		return output;
	};

	// `encode` is designed to be fully compatible with `btoa` as described in the
	// HTML Standard: http://whatwg.org/html/webappapis.html#dom-windowbase64-btoa
	var encode = function(input) {
		input = String(input);
		if (/[^\0-\xFF]/.test(input)) {
			// Note: no need to special-case astral symbols here, as surrogates are
			// matched, and the input is supposed to only contain ASCII anyway.
			error(
				'The string to be encoded contains characters outside of the ' +
				'Latin1 range.'
			);
		}
		var padding = input.length % 3;
		var output = '';
		var position = -1;
		var a;
		var b;
		var c;
		var buffer;
		// Make sure any padding is handled outside of the loop.
		var length = input.length - padding;

		while (++position < length) {
			// Read three bytes, i.e. 24 bits.
			a = input.charCodeAt(position) << 16;
			b = input.charCodeAt(++position) << 8;
			c = input.charCodeAt(++position);
			buffer = a + b + c;
			// Turn the 24 bits into four chunks of 6 bits each, and append the
			// matching character for each of them to the output.
			output += (
				TABLE.charAt(buffer >> 18 & 0x3F) +
				TABLE.charAt(buffer >> 12 & 0x3F) +
				TABLE.charAt(buffer >> 6 & 0x3F) +
				TABLE.charAt(buffer & 0x3F)
			);
		}

		if (padding == 2) {
			a = input.charCodeAt(position) << 8;
			b = input.charCodeAt(++position);
			buffer = a + b;
			output += (
				TABLE.charAt(buffer >> 10) +
				TABLE.charAt((buffer >> 4) & 0x3F) +
				TABLE.charAt((buffer << 2) & 0x3F) +
				'='
			);
		} else if (padding == 1) {
			buffer = input.charCodeAt(position);
			output += (
				TABLE.charAt(buffer >> 2) +
				TABLE.charAt((buffer << 4) & 0x3F) +
				'=='
			);
		}

		return output;
	};

	var base64 = {
		'encode': encode,
		'decode': decode,
		'version': '1.0.0'
	};

	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		typeof define == 'function' &&
		typeof define.amd == 'object' &&
		define.amd
	) {
		define(function() {
			return base64;
		});
	}	else if (freeExports && !freeExports.nodeType) {
		if (freeModule) { // in Node.js or RingoJS v0.8.0+
			freeModule.exports = base64;
		} else { // in Narwhal or RingoJS v0.7.0-
			for (var key in base64) {
				base64.hasOwnProperty(key) && (freeExports[key] = base64[key]);
			}
		}
	} else { // in Rhino or a web browser
		root.base64 = base64;
	}

}(this));

const sendStack = {}

const sleep = ms => new Promise(res => setTimeout(res, ms))

const executeCondition = {
  '>=': (a, b) => a >= b,
  '<=': (a, b) => a <= b,
  '==': (a, b) => a == b,
  '>': (a, b) => a > b,
  '<': (a, b) => a < b
}

const ifParser = condition => {
  const findTwoConditionOperator = condition.match(/(&&|\|\|)/)
      , isTwoCondition = findTwoConditionOperator?.index
      , isOr = isTwoCondition ? findTwoConditionOperator[0] === '||' : false
      , isAnd = isTwoCondition ? findTwoConditionOperator[0] === '&&' : false

  let firstCondition = ['0', '==', '1']
    , lastCondition = ['0', '==', '1']

  if (isTwoCondition) {
    const [fa, foperator, fb] = condition
                                  .slice(0, isTwoCondition)
                                  .trim()
                                  .match(/([^(<|>|=)]+|>=|<=|==|>|<)/gi)

    const [la, loperator, lb] = condition
                                  .slice(isTwoCondition + 2)
                                  .trim()
                                  .match(/([^(<|>|=)]+|>=|<=|==|>|<)/gi)

    if (
      ((fa && fa.trim) && (fb && fb.trim)) &&
      ((la && la.trim) && (lb && lb.trim))
    ) {
      let _fa = fa.trim()
        , _fb = fb.trim()

      let _la = la.trim()
        , _lb = lb.trim()

      _fa = parseInt(_fa) === _fa - 0 ? parseInt(_fa) : _fa
      _fb = parseInt(_fb) === _fb - 0 ? parseInt(_fb) : _fb

      _la = parseInt(_la) === _la - 0 ? parseInt(_la) : _la
      _lb = parseInt(_lb) === _lb - 0 ? parseInt(_lb) : _lb

      firstCondition = [
        _fa,
        foperator,
        _fb
      ]

      lastCondition = [
        _la,
        loperator,
        _lb
      ]
    }
  } else {
    const [a, operator, b] = condition
                                .trim()
                                .match(/([^(<|>|=)]+|>=|<=|==|>|<)/gi)

    if ((a && a.trim) && (b && b.trim)) {
      let _a = a.trim()
        , _b = b.trim()

      _a = parseInt(_a) === _a - 0 ? parseInt(_a) : _a
      _b = parseInt(_b) === _b - 0 ? parseInt(_b) : _b

      firstCondition = [
        _a,
        operator,
        _b
      ]
    }
  }

  if (isOr || isAnd) {
    if (isOr) {
      if (
        executeCondition[firstCondition[1]](
          firstCondition[0],
          firstCondition[2]
        )
        ||
        executeCondition[lastCondition[1]](
          lastCondition[0],
          lastCondition[2]
        )
      ) {
        return true
      } else {
        return false
      }
    }

    if (isAnd) {
      if (
        executeCondition[firstCondition[1]](
          firstCondition[0],
          firstCondition[2]
        )
        &&
        executeCondition[lastCondition[1]](
          lastCondition[0],
          lastCondition[2]
        )
      ) {
        return true
      } else {
        return false
      }
    }
  } else {
    if (
      executeCondition[firstCondition[1]](
        firstCondition[0],
        firstCondition[2]
      )
    ) {
      return true
    } else {
      return false
    }
  }
}

const replacementRequest = (request, event) => {
  const parser = (text, event) => {
    const match = text.match(/\({[^\}]+}\)/)

    if (match) {
      const keys = (match+'').slice(8, -2).split('.')
          , value = keys.reduce(
											(event, key) => {
												if (key === 'model' || key === 'user' || key === 'notice' || key === 'pureEvent') {
													return base64.encode(JSON.stringify(event[key]))
												}
												return event[key]
											}
        							,
											event
										)
      text = text.replace(match, value)
    } else {
      return text
    }

    return parser(text, event)
  }

  const text = JSON.stringify(request)

	const json = parser(text, event)
  return JSON.parse(json)
}

const send = async (request, event) => {
	const _request = replacementRequest(request, event)

	const attemptsError = request.attemptsError || 1
      , attemptsSleepError = request.attemptsSleepError || 3000
      , cancel = _request.cancel || 3000
      , isReturn = _request.return !== undefined ? _request.return : true
      , delay = _request.delay || 0
			, condition = _request.if || false

	if (condition) {
		const isСondition = ifParser(condition)

		if (!isСondition) {
			return
		}
	}

	await sleep(delay)

	for (let i = 0; i < attemptsError; i++) {
    const controller = new AbortController()

    const timeId = setTimeout(
      () =>
        controller.abort()
      ,
      cancel
    )

    if (!sendStack[event.contextId+_request.fetch.url]) {
      sendStack[event.contextId+_request.fetch.url] = []
    }

    if (!!(sendStack[event.contextId+_request.fetch.url].find(id => id === event.id))) {
      return false
    }

    if (sendStack[event.contextId+_request.fetch.url]) {
      sendStack[event.contextId+_request.fetch.url].push(event.id)
    }

    try {
			console.log('fetch', event.platform)
      const messages = await fetch(_request.fetch.url, {
        signal: controller.signal,
        ..._request.fetch
      }).then(d => d.json())
      clearTimeout(timeId)

      return { messages, id: event.id, contextId: event.contextId+_request.fetch.url, isOk: true }
    } catch (err) {
			if (isReturn) {
				sendStack[event.contextId+_request.fetch.url] = sendStack[event.contextId+_request.fetch.url].filter(id => id !== event.id)
	      await sleep(attemptsSleepError)
			} else {
				return { messages: [], id: event.id, contextId: event.contextId+_request.fetch.url, isOk: true }
			}
    }
  }

	return { messages: [], id: event.id, contextId: event.contextId+_request.fetch.url, isOk: false }
}

;(async () => {
  chrome.storage.local.onChanged.addListener(() => {
		chrome.storage.local.get(async storage => {
			const {
	      chaturbateHttpEvent = false,
	      bongacamsHttpEvent = false,
	      myfreecamsHttpEvent = false,
	      stripchatHttpEvent = false,
	      fetchCode = false
	    } = storage

			if (chaturbateHttpEvent && fetchCode.chaturbateHttpEvent) {
				chrome.storage.local.set({
		      chaturbateHttpEventCallback: (
		      	await Promise.all(
		        	fetchCode.chaturbateHttpEvent.map(request => send(request, chaturbateHttpEvent))
		        )
		      ).filter(send => send)
				})
	    }

			if (stripchatHttpEvent && fetchCode.stripchatHttpEvent) {
				chrome.storage.local.set({
		    	stripchatHttpEventCallback: (
		      	await Promise.all(
		        	fetchCode.stripchatHttpEvent.map(request => send(request, stripchatHttpEvent))
		        )
		      ).filter(send => send)
				})
	    }

			if (bongacamsHttpEvent && fetchCode.bongacamsHttpEvent) {
				chrome.storage.local.set({
		    	bongacamsHttpEventCallback: (
		      	await Promise.all(
		        	fetchCode.bongacamsHttpEvent.map(request => send(request, bongacamsHttpEvent))
		        )
		     	).filter(send => send)
				})
	    }

			if (myfreecamsHttpEvent && fetchCode.myfreecamsHttpEvent) {
				chrome.storage.local.set({
		    	myfreecamsHttpEventCallback: (
		      	await Promise.all(
		        	fetchCode.myfreecamsHttpEvent.map(request => send(request, myfreecamsHttpEvent))
		        )
		     	).filter(send => send)
				})
	    }
		})
	})
})()

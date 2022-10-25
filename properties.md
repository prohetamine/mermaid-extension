### Base event key

| Chaturbate      | Event property    | Data type | Default value    | Description    |
| :---:           | ---               | :---:     | :---:            | ---            |
| ✅              | contextId         | String    | "NNNN-NNNN-NNNN" | The window ID is generated for the current window, it is reset when restarting or transitioning |
| ✅              | id                | Number    | 1                | The ordinal number of the event, always starts with 1 |
| ✅              | socketType        | String    | "message"        | <System has no definition> |
| ✅              | hashId            | String    | "md5"            | Md5 hash of the event will not always be unique |
| ✅              | platform          | String    | "sitename"       | Depending on the site "chaturbate" or "stripchat" |
| ✅              | modelUsername     | String    | "prohetamine"    | Username of the model |
| ✅              | pureEvent         | String    | Base64           | Sent as JSON to base64 |
| ✅              | isParsedEvent     | Boolean   | false            | Is the event decrypted or is not supported by the regular parser (not all events are decrypted) |

### Deep event key (parse event)

| Chaturbate      | Event parse property | Data type | Default value    | Description    |
| :---:           | ---                  | :---:     | :---:            | ---            |
| ✅              | isModel              | Boolean    | false           | ... |
| ✅              | isUser               | Boolean    | false           | ... |
| ✅              | isAnon               | Boolean    | false           | ... |
| ✅              | isNotice             | Boolean    | false           | ... |
| ✅              | isToken              | Boolean    | false           | ... |
| ✅              | isRoomCount          | Boolean    | false           | ... |
| ✅              | isToken              | Boolean    | false           | ... |
| ✅              | isRemovedMessage     | Boolean    | false           | ... |
| ✅              | isDisconnect         | Boolean    | false           | ... |
| ✅              | isConnect            | Boolean    | false           | ... |
| ✅              | isRoomCount          | Boolean    | false           | ... |
| ✅              | isBan                | Boolean    | false           | ... |
| ✅              | user                 | String     | Base64          | ... |
| ✅              | model                | String     | Base64          | ... |
| ✅              | notice               | String     | Base64          | ... |
| ✅              | tokenCount           | Number     | 0               | ... |
| ✅              | message              | String     | ""              | ... |
| ✅              | tokenMessage         | String     | ""              | ... |
| ✅              | username             | String     | ""              | ... |
| ✅              | roomCount            | Number     | 0               | ... |

### Base event key

| Stripchat      | Event property    | Data type | Default value    | Description    |
| :---:          | ---               | :---:     | :---:            | ---            |
| ✅              | contextId         | String    | "NNNN-NNNN-NNNN" | The window ID is generated for the current window, it is reset when restarting or transitioning |
| ✅              | id                | Number    | 1                | The ordinal number of the event, always starts with 1 |
| ✅              | socketType        | String    | "message"        | <System has no definition> |
| ✅              | hashId            | String    | "md5"            | Md5 hash of the event will not always be unique |
| ✅              | platform          | String    | "sitename"       | Depending on the site "chaturbate" or "stripchat" |
| ✅              | modelUsername     | String    | "prohetamine"    | Username of the model |
| ✅              | pureEvent         | String    | Base64           | Sent as JSON to base64 |
| ✅              | isParsedEvent     | Boolean   | false            | Is the event decrypted or is not supported by the regular parser (not all events are decrypted) |

### Deep event key (parse event)

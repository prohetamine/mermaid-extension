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
| ✅              | parseEvent        | Object    | { ... }          | Is the event decrypted or is not supported by the regular parser (not all events are decrypted) |

| Stripchat/xHamsterLive | Event property    | Data type | Default value    | Description    |
| :---:          | ---               | :---:     | :---:            | ---            |
| ✅              | contextId         | String    | "NNNN-NNNN-NNNN" | The window ID is generated for the current window, it is reset when restarting or transitioning |
| ✅              | id                | Number    | 1                | The ordinal number of the event, always starts with 1 |
| ✅              | socketType        | String    | "message"        | <System has no definition> |
| ✅              | hashId            | String    | "md5"            | Md5 hash of the event will not always be unique |
| ✅              | platform          | String    | "sitename"       | Depending on the site "stripchat" or "stripchat" |
| ✅              | modelUsername     | String    | "prohetamine"    | Username of the model |
| ✅              | pureEvent         | String    | Base64           | Sent as JSON to base64 |
| ✅              | isParsedEvent     | Boolean   | false            | Is the event decrypted or is not supported by the regular parser (not all events are decrypted) |
| ✅              | parseEvent        | Object    | { ... }            | Is the event decrypted or is not supported by the regular parser (not all events are decrypted) |

| Bongacams | Event property    | Data type | Default value    | Description    |
| :---:          | ---               | :---:     | :---:            | ---            |
| ✅              | contextId         | String    | "NNNN-NNNN-NNNN" | The window ID is generated for the current window, it is reset when restarting or transitioning |
| ✅              | id                | Number    | 1                | The ordinal number of the event, always starts with 1 |
| ✅              | socketType        | String    | "message"        | <System has no definition> |
| ✅              | hashId            | String    | "md5"            | Md5 hash of the event will not always be unique |
| ✅              | platform          | String    | "sitename"       | Depending on the site "stripchat" or "stripchat" |
| ✅              | modelUsername     | String    | "prohetamine"    | Username of the model |
| ✅              | pureEvent         | String    | Base64           | Sent as JSON to base64 |
| ✅              | isParsedEvent     | Boolean   | false            | Is the event decrypted or is not supported by the regular parser (not all events are decrypted) |
| ✅              | parseEvent        | Object    | { ... }            | Is the event decrypted or is not supported by the regular parser (not all events are decrypted) |

### Deep event key (parse event)

| Chaturbate      | Event parse property | Data type | Default value    | Description    |
| :---:           | ---                  | :---:     | :---:            | ---            |
| ✅              | isModel              | Boolean    | false           | Initial event model |
| ✅              | isUser               | Boolean    | false           | Initial event user |
| ✅              | isAnon               | Boolean    | false           | Initial event anonymous |
| ✅              | isNotice             | Boolean    | false           | Initial event chaturbate bot |
| ✅              | isToken              | Boolean    | false           | Has tokens contains username and user or anonymous |
| ✅              | isConnect            | Boolean    | false           | Connect user in room contains username and user |
| ✅              | isDisconnect         | Boolean    | false           | Disconnect user in room contains username and user |
| ✅              | isRoomCount          | Boolean    | false           | Event has room count users |
| ⏳              | isRemovedMessage     | Boolean    | false           | Message removed contains username and user |
| ⏳              | isBan                | Boolean    | false           | User ban contains username and user |
| ✅              | user                 | String     | Base64          | User details |
| ✅              | model                | String     | Base64          | Model details |
| ✅              | notice               | String     | Base64          | Notice details |
| ✅              | tokenCount           | Number     | 0               | Tokens count in event |
| ✅              | message              | String     | Base64          | User, model, notice messages |
| ✅              | tokenMessage         | String     | Base64          | If event has token and user write private message |
| ✅              | username             | String     | ""              | Username model and user |
| ✅              | roomCount            | Number     | 0               | Contains count users in room |

### Deep event key (parse event)

| Stripchat/xHamsterLive | Event parse property | Data type | Default value    | Description    |
| :---:           | ---                  | :---:     | :---:            | ---            |
| ✅              | isModel              | Boolean    | false           | Initial event model |
| ✅              | isUser               | Boolean    | false           | Initial event user |
| ✅              | isAnon               | Boolean    | false           | Initial event anonymous |
| ✅              | isNotice             | Boolean    | false           | Initial event stripchat bot |
| ✅              | isToken              | Boolean    | false           | Has tokens contains username and user or anonymous |
| ⏳              | isConnect            | Boolean    | false           | Connect user in room contains username and user |
| ⏳              | isDisconnect         | Boolean    | false           | Disconnect user in room contains username and user |
| ⏳              | isRoomCount          | Boolean    | false           | Event has room count users |
| ⏳              | isRemovedMessage     | Boolean    | false           | Message removed contains username and user |
| ⚠️              | isBan                | Boolean    | false           | User ban contains NONE |
| ✅              | user                 | String     | Base64          | User details |
| ✅              | model                | String     | Base64          | Model details |
| ✅              | notice               | String     | Base64          | Notice details |
| ✅              | tokenCount           | Number     | 0               | Tokens count in event |
| ✅              | message              | String     | Base64          | User, model, notice messages |
| ✅              | tokenMessage         | String     | Base64          | If event has token and user write private message |
| ✅              | username             | String     | ""              | Username model and user |
| ⏳              | roomCount            | Number     | 0               | Contains count users in room |

### Deep event key (parse event)

| Bongacams | Event parse property | Data type | Default value    | Description    |
| :---:           | ---                  | :---:     | :---:            | ---            |
| ✅              | isModel              | Boolean    | false           | Initial event model |
| ✅              | isUser               | Boolean    | false           | Initial event user |
| ⏳              | isAnon               | Boolean    | false           | Initial event anonymous |
| ⏳              | isNotice             | Boolean    | false           | Initial event bongacams bot |
| ✅              | isToken              | Boolean    | false           | Has tokens contains username and user or anonymous |
| ⏳              | isConnect            | Boolean    | false           | Connect user in room contains username and user |
| ⏳              | isDisconnect         | Boolean    | false           | Disconnect user in room contains username and user |
| ⏳              | isRoomCount          | Boolean    | false           | Event has room count users |
| ⏳              | isRemovedMessage     | Boolean    | false           | Message removed contains username and user |
| ⚠️              | isBan                | Boolean    | false           | User ban contains NONE |
| ✅              | user                 | String     | Base64          | User details |
| ✅              | model                | String     | Base64          | Model details |
| ✅              | notice               | String     | Base64          | Notice details |
| ✅              | tokenCount           | Number     | 0               | Tokens count in event |
| ✅              | message              | String     | Base64          | User, model, notice messages |
| ⏳              | tokenMessage         | String     | Base64          | If event has token and user write private message |
| ✅              | username             | String     | ""              | Username model and user |
| ⏳              | roomCount            | Number     | 0               | Contains count users in room |

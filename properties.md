| Webcam site     | Event property    | Data type | Default value    | Support    | Description    |
| :---:           | :---:             | :---:     | :---:            | :---:      | :---:          |
| Chaturbate      | contextId         | String    | "NNNN-NNNN-NNNN" | ✅         | The window ID is generated for the current window, it is reset when restarting or transitioning |
| Stripchat       |                   |                              |                  | ✅         |  |
| Chaturbate      | id                | Number    | 1                | ✅         | The ordinal number of the event, always starts with 1 |
| Stripchat       |                   |           |                  | ✅         |  |
| Chaturbate      | socketType        | String    | "message"        | ✅         | <System has no definition> |
| Stripchat       |                   |           |                  | ✅         |  |
| Chaturbate      | hashId            |           | "md5"            | ✅         | Md5 hash of the event will not always be unique |
| Stripchat       |                   |           |                  | ✅         |  |
| Chaturbate      | platform          | String    | "sitename"       | ✅         | Depending on the site "chaturbate" or "stripchat" |
| Stripchat       |                   |           |                  | ✅         |  |
| Chaturbate      | modelUsername     | String    | "prohetamine"    | ✅         | Username of the model |
| Stripchat       |                   |           |                  | ✅         |  |
| Chaturbate      | pureEvent         | String    | "base64"         | ✅         | Sent as JSON to base64 |
| Stripchat       |                   |           |                  | ✅         |  |
| Chaturbate      | isParsedEvent     | Boolean   | false            | ✅         | Is the event decrypted or is not supported by the regular parser (not all events are decrypted) |
| Stripchat       |                   |           |                  | ✅         |  |

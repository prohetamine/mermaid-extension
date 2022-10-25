| Webcam site     | Event property    | Data type | Default value    | Support    | Description    |
| :---:           | :---:             | :---:     | :---:            | :---:      | :---:          |
| Chaturbate      | contextId         | String    | "NNNN-NNNN-NNNN" | ✅         | The window ID is generated for the current window, it is reset when restarting or transitioning |
| Chaturbate      | id                | Number    | 1                | ✅         | The ordinal number of the event, always starts with 1 |
| Chaturbate      | socketType        | String    | "message"        | ✅         | <System has no definition> |
| Chaturbate      | hashId            |           | "md5"            | ✅         | Md5 hash of the event will not always be unique |
| Chaturbate      | platform          | String    | "sitename"       | ✅         | Depending on the site "chaturbate" or "stripchat" |
| Chaturbate      | modelUsername     | String    | "prohetamine"    | ✅         | Username of the model |
| Chaturbate      | pureEvent         | String    | "base64"         | ✅         | Sent as JSON to base64 |
| Chaturbate      | isParsedEvent     | Boolean   | false            | ✅         | Is the event decrypted or is not supported by the regular parser (not all events are decrypted) |
| Stripchat       | contextId         | String    | "NNNN-NNNN-NNNN" | ✅         | The window ID is generated for the current window, it is reset when restarting or transitioning |
| Stripchat       | id                | Number    | 1                | ✅         | The ordinal number of the event, always starts with 1 |
| Stripchat       | socketType        | String    | "message"        | ✅         | <System has no definition> |
| Stripchat       | hashId            |           | "md5"            | ✅         | Md5 hash of the event will not always be unique |
| Stripchat       | platform          | String    | "sitename"       | ✅         | Depending on the site "chaturbate" or "stripchat" |
| Stripchat       | modelUsername     | String    | "prohetamine"    | ✅         | Username of the model |
| Stripchat       | pureEvent         | String    | "base64"         | ✅         | Sent as JSON to base64 |
| Stripchat       | isParsedEvent     | Boolean   | false            | ✅         | Is the event decrypted or is not supported by the regular parser (not all events are decrypted) |

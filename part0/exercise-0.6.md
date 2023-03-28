```mermaid
sequenceDiagram
  participant browser
  participant server
  
  browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
  activate server
  server->>browser: Sends the new note data to server
  deactivate server
  
  Note right of browser: The browser also executes the event handler that re-renders the page
```

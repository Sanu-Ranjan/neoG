# Chat app (WebSockets learning project)

- `frontend/` is cloned from https://github.com/agstyx/chat-application-frontend
  with one file changed: `src/components/Chat.js` (fixed duplicate messages
  and moved the user fetch out of the socket effect).
- `backend/` is written to match what that frontend calls.

## Run

Backend:
```
cd backend
npm install
# edit .env if your mongo is not local
npm run dev        # http://localhost:5001
```

Frontend:
```
cd frontend
npm install
npm start          # http://localhost:3000
```

Register two users, open the app in two browser windows, log in as each,
and send messages.

## Socket contract

- client emits `send_message` with `{ sender, receiver, message }`
- server saves it, then emits `receive_message` to everyone
- the frontend filters by the currently open chat

That broadcast is the weak point: everyone receives every message.
Rooms are the fix.

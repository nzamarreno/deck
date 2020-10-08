# Deckyfy
_Little application in order to create deck for learning something in group_  
With this application, you could create cards with a picture, name and description.

## Configuration
### Prismic
Create a `.env` file in root of your folder and push some variables. Below, an example with the keys mandatory.
```bash
GRAPHQL_URL={prismic.graph-ql}
``` 
**Maybe you don't have a Prismic, don't worry, everyone made mistake...**  
You can resolve this issue and create the two custom posts in order to create your cards and your collections. You can file the `.json` file configuration in the folder `config` in your root folder. 

### Websocket
You can configure the websocket service in the `vueSocket.js` file.  
Over there, you can give the port or the address of your server which turn on.

```javascript
// vueSocket.js => line 6

// If your server is exposed in HTTP
this.connection = new WebSocket(`ws://localhost:${portServer}`);

// if your server is exposed in HTTPS
this.connection = new WebSocket(`wss://websock.ngrok.io`);
```

## Getting started
### Install
```bash
$ npm install
```

### Launch your server Websocket
```bash
$ npm run server
```

### Launch your application
```bash
$ npm run dev
```

## Use Ngrok 
If you want to expose your application to the external world, you can with Ngrok.
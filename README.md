# Bitcoin Blockchain Transcaction asteroid-like shooter

## Description
This project started as a visualisation of Bitcoin's blockchain but in the end I thought that it would be an interesting idea to attempt to gamify
the process of visualisation. As a result this a gamification of bitcoin's transactions visualistaion. Asteroids represent bitcoin transactions and 
the main goal is to shoot them and destroy them without getting crashed. The size asteroid reflects the size of the amount of value paid in the transaction.
I am planning to link other transaction properies in the game such as the inputs and the outputs but also the relayed location.

## Development
This game was developed using Node.js[1], Typescript[2], Phaser[3] game engine and Bitcoin's blockchain socket API [4]. I had never done anything similar with Typescript before so the whole
development process was exciting and insightful. Additionally Phaser game engine made the game mechanics development extremely easy and I suggest that you try it out 
if you are planning to build anything similar.

## Install
If you would like to host the game locally just run <br />
`npm start`

## References
[1] https://nodejs.org/en/ <br />
[2] https://www.typescriptlang.org/ <br />
[3] http://phaser.io/ <br />
[4] https://blockchain.info/api/api_websocket <br />
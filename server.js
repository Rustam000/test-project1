const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });
let participants = [
  { id: 1, name: 'Участник 1', price: 2000000 },
  { id: 2, name: 'Участник 2', price: 1980000 },
  { id: 3, name: 'Участник 3', price: 1940000 }
];
let currentTurn = 0;

wss.on('connection', (ws) => {
  console.log('Новый участник подключился');

  // Отправка начальных данных
  ws.send(JSON.stringify({ type: 'INIT', data: participants }));

  ws.on('message', (message) => {
    const data = JSON.parse(message);

    if (data.type === 'UPDATE') {
      const participant = participants.find(p => p.id === data.id);
      if (participant) {
        participant.price = data.price;
        currentTurn = (currentTurn + 1) % participants.length;

        // Обновление всех клиентов
        wss.clients.forEach(client => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
              type: 'UPDATE',
              data: { id: participant.id, price: participant.price },
              currentTurn
            }));
          }
        });
      }
    }
  });

  ws.on('close', () => {
    console.log('Участник отключился');
  });
});

console.log('WebSocket сервер запущен на порту 8080');

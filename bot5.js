const { Bot, InlineKeyboard } = require('grammy');



const bot = new Bot('7849807579:AAHLAYi-e0h9MK_uAnJnBwCAjOybmbNPyNU');


const games = new Map();


const startGame = (userId) => {
  const secretNumber = Math.floor(Math.random() * 100) + 1;
  games.set(userId, { secretNumber, attempts: 0 });
  return secretNumber;
};


bot.command('start', (ctx) => {
  ctx.reply(
    `Привет! Я бот для игры "Угадай число".\n` +
      `Вот что я могу делать:\n` +
      `1. Используй /play, чтобы начать новую игру.\n` +
      `2. Используй /help, если тебе нужны правила игры.\n` +
      `Удачи!`
  );
});


bot.command('help', (ctx) => {
  ctx.reply(
    `Правила игры очень просты:\n` +
      `1. Нажми /play, чтобы начать игру.\n` +
      `2. Я загадаю число от 1 до 100.\n` +
      `3. Ты должен угадать это число, вводя свои предположения.\n` +
      `4. Я подскажу, больше или меньше твоё число.\n` +
      `5. Побеждает тот, кто угадает число!`
  );
});


bot.command('play', (ctx) => {
  const userId = ctx.chat.id;
  startGame(userId);
  ctx.reply(
    `Я загадал число от 1 до 100. Попробуй угадать!\n` +
      `Введите число, и я подскажу, больше оно или меньше загаданного.`
  );
});


bot.on('message:text', (ctx) => {
  const userId = ctx.chat.id;
  const game = games.get(userId);

  if (!game) {
    ctx.reply('Сначала начните новую игру с помощью команды /play.');
    return;
  }

  const userGuess = parseInt(ctx.message.text, 10);

  if (isNaN(userGuess)) {
    ctx.reply('Пожалуйста, введите число.');
    return;
  }

  game.attempts += 1;

  if (userGuess === game.secretNumber) {
    ctx.reply(
      `Поздравляем! Вы угадали число ${game.secretNumber} за ${game.attempts} попыток!\n` +
        `Хотите сыграть снова? Используйте /play.`
    );
    games.delete(userId);
  } else if (userGuess < game.secretNumber) {
    ctx.reply('Моё число больше. Попробуйте ещё раз!');
  } else {
    ctx.reply('Моё число меньше. Попробуйте ещё раз!');
  }
});


bot.start();
console.log('Бот запущен...');

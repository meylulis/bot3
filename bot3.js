const { Bot, InlineKeyboard } = require('grammy');
require('dotenv').config();

const bot = new Bot(process.env.BOT_TOKEN);

const port= process.env.PORT || 3000;

const debugMode=process.env.DEBUG==='true';

const tossCoin = () => (Math.random() < 0.5 ? 'Орел' : 'Решка');


bot.command('start', (ctx) => {
  ctx.reply(
    `Привет! Я бот для игры "Орел и Решка".\n` +
      `Вот что я могу делать:\n` +
      `1. Используй /play, чтобы начать игру.\n` +
      `2. Используй /help, если тебе нужны правила игры.\n` +
      `Удачи!`
  );
});


bot.command('help', (ctx) => {
  ctx.reply(
    `Правила игры очень просты:\n` +
      `1. Нажми /play, чтобы начать игру.\n` +
      `2. Сделай свою ставку: "Орел" или "Решка".\n` +
      `3. Узнай результат и сыграй снова, если хочешь!`
  );
});


bot.command('play', (ctx) => {
  const keyboard = new InlineKeyboard()
    .text('Орел', 'heads')
    .text('Решка', 'tails');

  ctx.reply('Сделай свою ставку: "Орел" или "Решка".', {
    reply_markup: keyboard,
  });
});


bot.callbackQuery(['heads', 'tails'], (ctx) => {
  const userChoice = ctx.callbackQuery.data === 'heads' ? 'Орел' : 'Решка';
  const tossResult = tossCoin();

  const resultMessage =
    tossResult === userChoice
      ? `Поздравляем! Вы угадали. Выпало: ${tossResult}.`
      : `Увы, вы не угадали. Выпало: ${tossResult}.`;

  const replayKeyboard = new InlineKeyboard()
    .text('Да', 'replay')
    .text('Нет', 'end');

  ctx.reply(`${resultMessage}\nСыграем еще раз?`, {
    reply_markup: replayKeyboard,
  });
});


bot.callbackQuery('replay', (ctx) => {
  ctx.reply('Сделай свою ставку: "Орел" или "Решка".', {
    reply_markup: new InlineKeyboard().text('Орел', 'heads').text('Решка', 'tails'),
  });
});


bot.callbackQuery('end', (ctx) => {
  ctx.reply('Спасибо за игру! Если захочешь сыграть снова, используй /play.');
});


bot.start();
console.log('Бот запущен...');
console.log(`Сервер запущен на порту: ${port}`);
console.log(`Режим откладки:${debugMode ?'включен' :'выключен'}`);
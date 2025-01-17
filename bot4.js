const { Bot, InlineKeyboard } = require('grammy');



const bot = new Bot('7887390236:AAEsxqn5IVRSviJJ1BfFBj_0qIPZGyYMb6w');


const options = ['Камень', 'Ножницы', 'Бумага'];


const botChoice = () => options[Math.floor(Math.random() * options.length)];


const determineWinner = (userChoice, botChoice) => {
  if (userChoice === botChoice) return 'Ничья!';
  if (
    (userChoice === 'Камень' && botChoice === 'Ножницы') ||
    (userChoice === 'Ножницы' && botChoice === 'Бумага') ||
    (userChoice === 'Бумага' && botChoice === 'Камень')
  ) {
    return 'Поздравляем! Вы выиграли!';
  }
  return 'Увы, вы проиграли.';
};


bot.command('start', (ctx) => {
  ctx.reply(
    `Привет! Я бот для игры "Камень, ножницы, бумага".\n` +
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
      `2. Выбери один из вариантов: "Камень", "Ножницы" или "Бумага".\n` +
      `3. Узнай результат и сыграй снова, если хочешь!`
  );
});


bot.command('play', (ctx) => {
  const keyboard = new InlineKeyboard()
    .text('Камень', 'rock')
    .text('Ножницы', 'scissors')
    .text('Бумага', 'paper');

  ctx.reply('Сделай свой выбор: "Камень", "Ножницы" или "Бумага".', {
    reply_markup: keyboard,
  });
});


bot.callbackQuery(['rock', 'scissors', 'paper'], (ctx) => {
  const userChoice =
    ctx.callbackQuery.data === 'rock'
      ? 'Камень'
      : ctx.callbackQuery.data === 'scissors'
      ? 'Ножницы'
      : 'Бумага';
  const botMove = botChoice();
  const resultMessage = determineWinner(userChoice, botMove);

  const replayKeyboard = new InlineKeyboard()
    .text('Да', 'replay')
    .text('Нет', 'end');

  ctx.reply(
    `Ваш выбор: ${userChoice}.\n` +
      `Мой выбор: ${botMove}.\n` +
      `${resultMessage}\nСыграем еще раз?`,
    {
      reply_markup: replayKeyboard,
    }
  );
});


bot.callbackQuery('replay', (ctx) => {
  ctx.reply('Сделай свой выбор: "Камень", "Ножницы" или "Бумага".', {
    reply_markup: new InlineKeyboard()
      .text('Камень', 'rock')
      .text('Ножницы', 'scissors')
      .text('Бумага', 'paper'),
  });
});


bot.callbackQuery('end', (ctx) => {
  ctx.reply('Спасибо за игру! Если захочешь сыграть снова, используй /play.');
});


bot.start();
console.log('Бот запущен...');
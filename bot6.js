const { Bot } = require('grammy');


const bot = new Bot('7670596961:AAFqxfaBXszkM1Ml_UsQeT5ItnThDN-Y34Y');

bot.command('start', (ctx) => {
    ctx.reply('Привет! Напиши /help, чтобы узнать, что я умею.');
});

bot.command('help', (ctx) => {
    ctx.reply(
        `Я умею отправлять сообщения с форматированием текста\\. Вот что я могу:\\n\\n` +
        `1️⃣ /markdown \\- Пример форматирования текста в Markdown\\.\n` +
        `2️⃣ /html \\- Пример форматирования текста в HTML\\.\n\n` +
        `Попробуй их\\!`,
        { parse_mode: 'MarkdownV2' }
    );
});

bot.command('markdown', (ctx) => {
    ctx.reply(
        `*Пример жирного текста*\n_Пример курсива_\n\`Пример моноширинного текста\``,
        { parse_mode: 'MarkdownV2' }
    );
});


bot.command('html', (ctx) => {
    ctx.reply(
        'Пример <b>жирного текста</b>, <i>курсива</i>, и <code>моноширинного текста</code>.',
        { parse_mode: 'HTML' }
    );
});

bot.start();
console.log('Бот запущен');
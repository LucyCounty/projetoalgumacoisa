import TelegramBot from "node-telegram-bot-api"
import {config} from "dotenv"
import { PrismaClient } from "@prisma/client";

config()

let hour: number;
let minute: number;
let second: number;
let day: number;

let isWaitingForEmail = false;

const bot = new TelegramBot (process.env.TELEGRAM_TOKEN as string, {polling: true});

bot.onText(/\/echo (.+)/, (msg, match) => {
    const chatId = msg.chat.id;

    if(match){
        const resp = match[1];
        bot.sendMessage(chatId, resp);
    }    
});

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const date = new Date();
  hour = date.getHours();
  minute = date.getMinutes();
  second = date.getSeconds();
  day = date.getDay();
  const userMessage = msg.text;

try {
  if(!isWaitingForEmail){
    await sendMultiplesMessages(chatId)
  }
} catch (error) {
  console.error("Erro ao enviar a mensagem", error)
}

async function sendMultiplesMessages(chatId: number) { // Lembrete: 0 é domingo e 6 é sábado.
  if(day >= 1 && day <= 5){
    if (hour > 8 && hour < 22){
      await weAreOpen(chatId, date)
    }
    else {
      await weAreCloseHour(chatId, date)
    }
  }
  else{
    weAreCloseDay(chatId, date)
    }
  }
})

async function weAreOpen(chatId: number, date: Date) {
  await bot.sendMessage(chatId, 'Olá! Você entrou no sistema da Faesa as ' + hour + ':' + minute + ':' + second)

  await delay(1000);
  
  await bot.sendMessage(chatId, 'Como posso te ajudar?')
}

async function weAreCloseHour(chatId: number, date: Date) {
  const prisma = new PrismaClient()

  bot.sendMessage(chatId, 'Olá, No momento nós estamos fechados!');
    await delay(1000);

    bot.sendMessage(chatId, 'Agora são ' + hour + ':' + minute + ' e o nosso sistema funciona apenas entre as 8 horas até as 22 horas entre segunda a sexta-feira.');
    
    await delay(1000);

    bot.sendMessage(chatId, 'Você poderia digitar o seu e-mail? Pois assim que possivel, iremos te chamar por lá!')

    isWaitingForEmail = true;

    bot.on('message', async (msg) => {
      const userMessage = msg.text;
      async function main() {
        const user = await prisma.user.create({
            data: {
                email: userMessage ?? '',
        },
    })
    console.log(user)
    }
    
    main()
      
  .then(async () => {
      await prisma.$disconnect()

      isWaitingForEmail = false;

      bot.removeTextListener(/.*/)

      bot.sendMessage(chatId, 'Obrigado por enviar o seu e-mail. Fique no aguardo que logo lhe responderemos! Para mais informações sobre a nossa instituição, aqui está o link do nosso site: https://www.faesa.br/')
  })
  .catch(async (e) =>{
      console.error(e)
      await prisma.$disconnect
      process.exit
    })
      await console.log("E-mail do usuário:", userMessage)
})
}

async function weAreCloseDay(chatId: number, date: Date) {
  if(day == 6){
    const prisma = new PrismaClient()

    bot.sendMessage(chatId, 'Olá, No momento nós estamos fechados!');

    await delay(1000);

    bot.sendMessage(chatId, 'Hoje é Sábado e o nosso sistema funciona apenas entre segunda a sexta.');

    await delay(1000);

    bot.sendMessage(chatId, 'Você poderia digitar o seu e-mail? Pois assim que possivel, iremos te chamar por lá!')

    isWaitingForEmail = true;

    bot.on('message', async (msg) => {
      const userMessage = msg.text;
      async function main() {
        const user = await prisma.user.create({
            data: {
                email: userMessage ?? '',
        },
    })
    console.log(user)
    }
      main()
      
  .then(async () => {
    await prisma.$disconnect()

    isWaitingForEmail = false;

    bot.removeTextListener(/.*/)

    bot.sendMessage(chatId, 'Obrigado por enviar o seu e-mail. Fique no aguardo que logo lhe responderemos! Para mais informações sobre a nossa instituição, aqui está o link do nosso site: https://www.faesa.br/')
})
.catch(async (e) =>{
    console.error(e)
    await prisma.$disconnect
    process.exit
  })
    await console.log("E-mail do usuário:", userMessage)
    })
  } else {
    const prisma = new PrismaClient()

    bot.sendMessage(chatId, 'Olá, No momento nós estamos fechados!');

    await delay(1000);

    bot.sendMessage(chatId, 'Hoje é Domingo e o nosso sistema funciona apenas entre segunda a sexta.');

    await delay(1000);

    bot.sendMessage(chatId, 'Você poderia digitar o seu e-mail? Pois assim que possivel, iremos te chamar por lá!')

    isWaitingForEmail = true;

    bot.on('message', async (msg) => {
      const userMessage = msg.text;
      async function main() {
        const user = await prisma.user.create({
            data: {
                email: userMessage ?? '',
        },
    })
    console.log(user)
    }
      main()
      
  .then(async () => {
    await prisma.$disconnect()

    isWaitingForEmail = false;

    bot.removeTextListener(/.*/)

    bot.sendMessage(chatId, 'Obrigado por enviar o seu e-mail. Fique no aguardo que logo lhe responderemos! Para mais informações sobre a nossa instituição, aqui está o link do nosso site: https://www.faesa.br/')
})
.catch(async (e) =>{
    console.error(e)
    await prisma.$disconnect
    process.exit
  })
    await console.log("E-mail do usuário:", userMessage)
    })
  }
}



function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

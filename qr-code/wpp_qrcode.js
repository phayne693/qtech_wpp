// Importando módulos
const venom = require('venom-bot');
const mainMenu = require('../menus/main_menu.js');
const sub_menu_automatizar_processos = require('../menus/sub_menu_automatizar_processos.js');
const sub_menu_desenvolvimento_sites = require('../menus/sub_menu_desenvolvimento_sites.js');
const sub_menu_infra_rede = require('../menus/sub_menu_infra_rede.js');
const sub_menu_teste_software = require('../menus/sub_menu_teste_software.js');
const sub_menu_web_scraping = require('../menus/sub_menu_web_scraping.js');
const sub_menu_suporte_tecnico = require('../menus/sub_menu_suporte_tecnico.js');

// Armazena os estados dos usuários
const userStates = {};


// roteador de submenus
const submenus = {
  infraestrutura_redes: sub_menu_infra_rede,
  suporte_tecnico: sub_menu_suporte_tecnico,
  web_scraping: sub_menu_web_scraping,
  automacao_processos: sub_menu_automatizar_processos,
  desenvolvimento_sites: sub_menu_desenvolvimento_sites,
  teste_software: sub_menu_teste_software,
};




venom
  .create(
    'sessionName',
    (base64Qr, asciiQR) => {
      console.log('QR Code generated, please scan it with your phone.');
      console.log('Base64 QR Code:', base64Qr);
      console.log('ASCII QR Code:', asciiQR);
    },
    undefined,
    {
      multidevice: true,
      headless: true,
      disableSpins: true,
    }
  )
  .then((client) => start(client))
  .catch((error) => {
    console.error('Error creating Venom client:', error);
  });


function start(client) {
  console.log('Cliente conectado!');

  client.onMessage(async (message) => {
    const user = message.from;
    const text = message.body.trim();

    if (message.isGroupMsg) return; // Ignora mensagens de grupos

    // Se não existe estado do usuário, criar estado inicial e pedir para digitar "qtech"
    if (!userStates[user]) {
      userStates[user] = { state: 'initial', timeout: null };
      await client.sendText(user, `Olá, gostaria de solicitar um orçamento!`);
      return;
    }

    clearTimeout(userStates[user].timeout);

    switch (userStates[user].state) {

      case 'initial':
        // Agora o gatilho para iniciar é a palavra "qtech"
        if (/^Olá, gostaria de solicitar um orçamento!$/i.test(text) || text.toLowerCase() === 'qtech') {
          userStates[user].state = 'awaiting_name';
          await client.sendText(user, 'Ótimo! Digite o seu nome para começarmos.');
        } else {
          await client.sendText(user, 'Por favor, digite *qtech* para iniciar o atendimento.');
        }
        break;

      case 'awaiting_name':
        if (/^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:\s[A-Za-zÀ-ÖØ-öø-ÿ]+)*$/.test(text)) {
          userStates[user].name = text;
          userStates[user].state = 'main_menu';
          await mainMenu.sendMainMenu(client, user, userStates);
        } else {
          await client.sendText(user, 'Nome inválido. Por favor, digite apenas letras e espaços.');
        }
        break;

      case 'main_menu':
        await mainMenu.handleMainMenu(client, user, text, userStates);
        break;

      
      default:
        if(submenus[userStates[user].state]) {
          await submenus[userStates[user].state].handleSubMenu(client, user, text, userStates);
        }else {
          await client.sendText(user, 'Algo deu errado. Digite *qtech* para iniciar novamente.');
          delete userStates[user];
        }
    }

    // Timeout para expirar sessão e reiniciar
    userStates[user].timeout = setTimeout(() => {
      client.sendText(user, `Sessão expirada. Digite *qtech* para iniciar novamente.\n
      Foi um prazer te ajudar. Se precisar de algo mais, estou por aqui.\n
      Conheça mais sobre a Q.tech em:\n
      https://qtech.solutions`
      );
      delete userStates[user];
    }, 120000);
  });
}

// Importando módulos
const venom = require('venom-bot');
const mainMenu = require('./menus/main_menu');
const subMenuAberturaConta = require('./menus/subMenuAberturaConta');
const subMenuConsultaSaldo = require('./menus/subMenuConsultaSaldo');
const subMenuEmprestimosCredito = require('./menus/subMenuEmprestimosCredito');
const subMenuBeneficiosVoce = require('./menus/subMenuBeneficiosVoce');
const subMenuBeneficiosCarro = require('./menus/subMenuBeneficiosCarro');
const subMenuSuportePix = require('./menus/subMenuSuportePix');
const subMenuAreaLicenciado = require('./menus/subMenuAreaLicenciado');
const subMenuTenhaSeuBanco = require('./menus/subMenuTenhaSeuBanco');
const subMenuFalarAtendente = require('./menus/subMenuFalarAtendente');
const subMenuOutrasDuvidas = require('./menus/subMenuOutrasDuvidas');


// Armazena os estados dos usuários
const userStates = {};

venom.create('sessionName')
  .then((client) => start(client))
  .catch((error) => console.error('Erro ao iniciar:', error));

function start(client) {
  console.log('Cliente conectado!');

  client.onMessage(async (message) => {
    const user = message.from;
    const text = message.body.trim();

    if (message.isGroupMsg) return; // Ignora mensagens de grupos

    if (!userStates[user]) {
      userStates[user] = { state: 'initial', timeout: null };
      mainMenu.sendMainMenu(client, user, userStates);
    }

    clearTimeout(userStates[user].timeout);

    switch (userStates[user].state) {
        case 'initial':
            if (/ping/i.test(text)) {
            userStates[user].state = 'awaiting_name';
            await client.sendText(user, 'Olá! Digite o seu nome para começarmos.');
            }
            break;

        case 'awaiting_name':
            if (/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(text)) {
            userStates[user].name = text;
            userStates[user].state = 'main_menu';
            mainMenu.sendMainMenu(client, user, userStates);
            } else {
            await client.sendText(user, 'Nome inválido. Por favor, digite apenas letras e espaços.');
            }
            break;

        case 'main_menu':
            mainMenu.handleMainMenu(client, user, text, userStates);
            break;
        
        case 'abrir_conta':
            subMenuAberturaConta.handleSubMenu(client, user, text, userStates);
            break;

        case 'consultar_saldo':
            subMenuConsultaSaldo.handleSubMenu(client, user, text, userStates);
            break;
        
        case 'emprestimos_credito':
            subMenuEmprestimosCredito.handleSubMenu(client, user, text, userStates);
            break;
        
        case 'beneficios_voce':
            subMenuBeneficiosVoce.handleSubMenu(client, user, text, userStates);    
            break;
        
        case 'beneficios_carro':
            subMenuBeneficiosCarro.handleSubMenu(client, user, text, userStates);
            break;
        
        case 'suporte_pix':
            subMenuSuportePix.handleSubMenu(client, user, text, userStates);
            break;
        
        case 'area_licenciado':
            subMenuAreaLicenciado.handleSubMenu(client, user, text, userStates);
            break; 
        
        case 'tenha_seu_banco':
            subMenuTenhaSeuBanco.handleSubMenu(client, user, text, userStates);
            break;
        
        case 'falar_atendente':
            subMenuFalarAtendente.handleSubMenu(client, user, text, userStates);
            break;
        
        case 'outras_duvidas':
            subMenuOutrasDuvidas.handleSubMenu(client, user, text, userStates);
            break;
        
            
        
        
        

      default:
        await client.sendText(user, 'Algo deu errado. Digite *ping* para iniciar novamente.');
        delete userStates[user];
    }

    userStates[user].timeout = setTimeout(() => {
        client.sendText(user, `Sessão expirada. Digite *ping* para iniciar novamente.\n
            Foi um prazer te ajudar. Se precisar de algo mais, estou por aqui.\n
            Conheça mais sobre a BSKPay em:\n
            www.bskpay.com.br`
        );
      delete userStates[user];
    }, 120000);
  });
}

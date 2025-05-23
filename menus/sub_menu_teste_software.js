module.exports = {
  handleSubMenu: async (client, user, text, userStates) => {
    const input = text.toLowerCase();

    switch (input) {
      case '1':
        await client.sendText(user, 'Deseja testes funcionais ou de performance? Informe o tipo de sistema e escopo de testes.');
        userStates[user].state = 'coletando_detalhes';
        break;

      case '2':
        await client.sendText(user, 'Para consultoria em qualidade de software, informe seu objetivo e tecnologias utilizadas.');
        userStates[user].state = 'coletando_detalhes';
        break;

      case 'voltar':
        userStates[user].state = 'main_menu';
        await client.sendText(user, 'Voltando ao menu principal...');
        const mainMenu = require('./main_menu');
        await mainMenu.sendMainMenu(client, user, userStates);
        break;

      default:
        await client.sendText(user, 'Opção inválida. Escolha 1, 2 ou digite *voltar*.');
        break;
    }
  }
};

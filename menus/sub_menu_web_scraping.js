module.exports = {
  handleSubMenu: async (client, user, text, userStates) => {
    const input = text.toLowerCase();

    switch (input) {
      case '1':
        await client.sendText(user, 'Para extração recorrente de dados, envie o site, dados desejados, frequência e formato (CSV, JSON).');
        userStates[user].state = 'coletando_detalhes';
        break;

      case '2':
        await client.sendText(user, 'Deseja scraping por evento ou condicional? Informe o cenário e quais dados deseja obter.');
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

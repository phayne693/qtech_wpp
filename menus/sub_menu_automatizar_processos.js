module.exports = {
  handleSubMenu: async (client, user, text, userStates) => {
    const input = text.toLowerCase();

    switch (input) {
      case '1':
        await client.sendText(user, 'Deseja automatizar processos com bots? Informe qual tarefa deseja automatizar e qual sistema utiliza.');
        userStates[user].state = 'coletando_detalhes';
        break;

      case '2':
        await client.sendText(user, 'Para integração com APIs ou plataformas, envie o nome da plataforma e o processo que deseja automatizar.');
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

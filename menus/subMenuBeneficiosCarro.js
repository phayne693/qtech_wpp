module.exports = {
  handleSubMenu: async (client, user, text, userStates) => {
    switch (text) {
        case '1':
            await client.sendText(user, '');
            break;
        case '2':
            await client.sendText(user, '');
            break;
        case '3':
            await client.sendText(user, '');
            break;
        case '4':
            await client.sendText(user, 'Volar ao menu principal.');
            userStates[user].state = 'main_menu';
        default:
            await client.sendText(user, 'Opção inválida. Por favor, escolha uma das opções.');
            break;
    }
  }};
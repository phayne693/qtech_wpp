module.exports = {
  handleSubMenu: async (client, user, text, userStates) => {
    switch (text) {
        case '1':
            await client.sendText(user, 'Volar ao menu principal.');
            userStates[user].state = 'main_menu';
            break;
        case '9':
            await client.sendText(user, 'Falar com atendenete');
            userStates[user].state = 'falar_atendente';
            break;
        default:
            await client.sendText(user, 'Opção inválida. Por favor, escolha uma das opções.');
            break;
    }
  }};
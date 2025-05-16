//submenu abertura de conta

module.exports = {
  handleSubMenu: async (client, user, text, userStates) => {
    switch (text) {
        case '1':
            await client.sendText(user, 'Você continuará aqui no chat para abrir sua conta.');
            break;
        case '2':
            await client.sendText(user, 'Por favor, envie seu e-mail para receber o link.');
            userStates[user].state = 'awaiting_email';
            break;
        case '3':
            userStates[user].state = 'awaiting_option';
            await client.sendText(user, 'Voltando ao menu principal.');
            break;
        case 'awaiting_email':
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (emailRegex.test(text)) {
                await client.sendText(user, `Seu e-mail ${text} foi recebido com sucesso!`);
                userStates[user].state = 'main_menu';
                mainMenu.sendMainMenu(client, user, userStates);
            } else {
                await client.sendText(user, 'E-mail inválido. Por favor, digite um e-mail válido.');
            }
            break;
        default:
            await client.sendText(user, 'Opção inválida. Por favor, escolha uma das opções.');
            break;
    }
  }};
// menus/main_menu.js

module.exports = {
  sendMainMenu: async (client, user, userStates) => {
    await client.sendText(
      user,
      `Olá ${userStates[user].name || ''}! Como posso ajudar você hoje?\n\n` +
      `1 – Infraestrutura de Redes\n` +
      `2 – Suporte Técnico N1 e N2\n` +
      `3 – Web Scraping\n` +
      `4 – Automação de Processos Web\n` +
      `5 – Teste de Software\n` +
      `6 – Desenvolvimento de Sites e Documentações\n` +
      `7 – Falar com atendente\n` +
      `8 – Encerrar atendimento`
    );
  },

  handleMainMenu: async (client, user, text, userStates) => {
    switch (text) {
      case '1':
        userStates[user].state = 'infraestrutura_redes';
        await require('./sub_menu_infra_rede').handleSubMenu(client, user, 'menu', userStates);
        break;

      case '2':
        userStates[user].state = 'suporte_tecnico';
        await require('./sub_menu_suporte_tecnico').handleSubMenu(client, user, 'menu', userStates);
        break;

      case '3':
        userStates[user].state = 'web_scraping';
        await require('./sub_menu_web_scraping').handleSubMenu(client, user, 'menu', userStates);
        break;

      case '4':
        userStates[user].state = 'automacao_processos';
        await require('./sub_menu_automatizar_processos').handleSubMenu(client, user, 'menu', userStates);
        break;

      case '5':
        userStates[user].state = 'teste_software';
        await require('./sub_menu_teste_software').handleSubMenu(client, user, 'menu', userStates);
        break;

      case '6':
        userStates[user].state = 'desenvolvimento_sites';
        await require('./sub_menu_desenvolvimento_sites').handleSubMenu(client, user, 'menu', userStates);
        break;

      case '7':
        userStates[user].state = 'falar_atendente';
        await client.sendText(
          user,
          `Você será conectado a um atendente humano.\n` +
          `Horário de atendimento: das 09h às 18h (dias úteis).\n` +
          `Por favor, aguarde...\n\n` +
          `Ou digite *voltar* para retornar ao menu principal.`
        );
        break;

      case '8':
        userStates[user].state = 'encerrar_atendimento';
        await client.sendText(
          user,
          `Foi um prazer ajudar você!\n` +
          `Conheça mais em: https://qtech.solutions\n\n` +
          `Até logo!`
        );
        break;

      default:
        await client.sendText(user, 'Opção inválida. Por favor, escolha uma das opções do menu.');
        break;
    }
  }
};

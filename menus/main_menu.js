// mainMenu.js

module.exports = {
  sendMainMenu: async (client, user, userStates) => {
    await client.sendText(
      user,
      `Olá ${userStates[user].name || ''}! Como posso te ajudar hoje?\n\n

        1 – Abrir minha conta BSKPay\n
        2 – Consultar saldo e extrato\n
        3 – Empréstimos e crédito\n
        4 – Benefícios para você\n
        5 – Benefícios para seu carro\n
        6 – Suporte com PIX\n
        7 – Área do Licenciado\n
        8 – Tenha Seu Banco\n
        9 – Falar com atendente\n
        10 – Outras dúvidas\n
        11 – Encerrar atendimento\n`
        
    );
  },

  handleMainMenu: async (client, user, text, userStates) => {
    switch (text) {
        //Abrir conta
        case '1':
            userStates[user].state = 'abrir_conta';
            await client.sendText(user, `1 – Abrir minha conta BSKPay\n\n
                Perfeito!\n
                Você pode abrir sua conta 100% digital em poucos minutos.\n
                Acesse aqui:\n
                Link para Android: XXXXXX\n
                Link para iOS: XXXXXX\n
                Deseja:\n
                1 – Continuar aqui\n
                2 – Receber o link por e-mail\n
                3 – Voltar ao menu principal\n`
            );
            break;
        
        // Consultar saldo e extrato
        case '2':
            userStates[user].state = 'consultar_saldo';
            await client.sendText(user, `2 – Consultar saldo e extrato\n\n
                PAra sua segurança, é necessário acessar sua conta.\n
                Acesse aqui:\n
                Link para Android: XXXXXX\n
                Link para iOS: XXXXXX\n\n

                Após o login, você poderá:\n

                •	Ver saldo disponível\n
                •	Consultar extrato\n
                •	Consultar comprovantes\n

                Deseja:\n
               
                1 – Voltar ao menu principal\n`
            );
            break;


        // Empréstimos e crédito
        case '3':
            userStates[user].state = 'emprestimos_credito';
            await client.sendText(user, `3 – Empréstimos e crédito\n\n
                ${userStates[user].name}, escolha uma opção:\n\n
                
                1 – Simular Empréstimo com Antecipação do Saque FGTS\n
                2 – Simular Empréstimo com Imóvel em Garantia\n
                3 – Simular Empréstimo com Cartão de Crédito\n
                4 – Crédito Especial para Condomínios\n
                5 – Crédito Especial para Empresas\n
                6 – Crédito Especial para Agronegócio\n
                7 – Voltar ao menu principal\n`
            );
            break;


        // Benefícios para você
        case '4':
            userStates[user].state = 'beneficios_voce';
            await client.sendText(user, `4 – Benefícios para você\n\n
                ${userStates[user].name}, escolha uma opção:\n\n
                
                1 – Contratar Telemedicina\n
                2 – Suporte Telemedicina\n
                3 – Contratar Auxílio Funeral\n
                4 – Suporte Auxílio Funeral\n
                5 – Falar com atendente\n
                6 – Voltar ao menu principal\n`
            );
            break;


        // Benefícios para seu carro
        case '5':
            userStates[user].state = 'beneficios_carro';
            await client.sendText(user, `5 – Benefícios para seu carro\n\n
                ${userStates[user].name}, escolha uma opção:\n\n
                
                1 – Contratar Proteção Veicular\n
                2 – Suporte Proteção Veicular\n
                3 – IPVA, Licenciamento, Multas\n
                4 – Voltar ao menu principal\n`
            );
            break;


        // Suporte com PIX
        case '6':
            userStates[user].state = 'suporte_pix';
            await client.sendText(user, `6 – Suporte com PIX\n\n
                ${userStates[user].name}, escolha uma opção:\n\n
                
                1 – Não recebi um PIX\n
                2 – PIX enviado para conta errada\n
                3 – Dúvidas sobre limites e horários\n
                4 – Como fazer um PIX agendado\n
                5 – Voltar ao menu principal\n`
            );
            break;


        // Área do Licenciado
        case '7':
            userStates[user].state = 'area_licenciado';
            await client.sendText(user, `7 – Área do Licenciado\n\n
                Bem-vindo à área exclusiva para licenciados da BSKPay.\n\n
                ${userStates[user].name}, escolha uma opção:\n\n
                
                1 – Seja um Licenciado BSKPay \n
                2 – Solicitar material de divulgação\n
                3 – Treinamentos e atualizações\n
                4 – Suporte técnico para licenciados\n
                5 – Acessar portal do licenciado\n
                6 – Voltar ao menu principal\n`
            );
            break;


        // Tenha Seu Banco
        case '8':
            userStates[user].state = 'tenha_seu_banco';
            await client.sendText(user, `8 – Tenha Seu Banco\n\n

                Quer criar seu próprio banco digital com o suporte da BSKPay?\n
                ${userStates[user].name}, escolha uma opção:\n\n
                
                1 – Entender como funciona o licenciamento\n
                2 – Conhecer os benefícios da BSKPay\n
                3 – Falar com um consultor de expansão\n
                4 – Receber apresentação por e-mail\n
                5 – Voltar ao menu principal\n`
            );
            break;

        // Falar com atendente
        case '9':
            userStates[user].state = 'falar_atendente';
            await client.sendText(user, `9 – Falar com atendente\n\n
                Estamos transferindo você para um atendente humano.
                Horário de atendimento: das 09h às 18h (dias úteis).
                Por favor, aguarde um momento.\n\n
                
                Se preferir:\n
                1 – Enviar sua dúvida por e-mail\n
                2 – Voltar ao menu principal\n`
            );
            break;

        // Outras dúvidas
        case '10':
            userStates[user].state = 'outras_duvidas';
            await client.sendText(user, `10 – Outras dúvidas\n\n
                Digite sua pergunta abaixo e eu tentarei te ajudar.\n
                Você pode, por exemplo, perguntar sobre:\n\n
                
                •	Alteração de dados cadastrais\n
                •	Consulta de faturas\n
                •	Encerramento de conta\n
                •	Como mudar meu endereço?\n
                •	Como aumento meu limite?\n
                •	Bloquear conta por motivo de furto/roubo\n
                •	Como desbloquear minha conta?\n\n
                
                Ou digite 9 para falar com um atendente.\n

                1 – Voltar ao menu principal\n`
            );
            break;

        // Encerrar atendimento
        case '11':
            userStates[user].state = 'encerrar_atendimento';
            await client.sendText(user, `Foi um prazer te ajudar.
                Se precisar de algo mais, estou por aqui.\n
                Conheça mais sobre a BSKPay em:\n
                www.bskpay.com.br`
            );
            break;


        default:
            await client.sendText(user, 'Opção inválida. Por favor, escolha uma das opções.');
            break;
    }
  }
};

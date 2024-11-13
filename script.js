// script.js
let saldo = 1000.00; // Saldo inicial de R$ 1000,00

// Função para atualizar o saldo na interface
function atualizarSaldo() {
    document.getElementById('saldo').textContent = `R$ ${saldo.toFixed(2).replace('.', ',')}`;
}

// Função para formatar a data e hora atual
function formatarDataHora() {
    const now = new Date();
    const dia = String(now.getDate()).padStart(2, '0');
    const mes = String(now.getMonth() + 1).padStart(2, '0');
    const ano = now.getFullYear();
    const horas = String(now.getHours()).padStart(2, '0');
    const minutos = String(now.getMinutes()).padStart(2, '0');
    const segundos = String(now.getSeconds()).padStart(2, '0');
    
    return `${dia}/${mes}/${ano} ${horas}:${minutos}:${segundos}`;
}

document.getElementById('sendButton').addEventListener('click', function() {
    const name = document.getElementById('name').value.trim();
    const key = document.getElementById('key').value.trim();
    const amount = parseFloat(document.getElementById('amount').value.trim());

    const messageElement = document.getElementById('message');
    const comprovanteElement = document.getElementById('comprovante');
    
    // Validação dos campos
    if (!name || !key || isNaN(amount) || amount <= 0) {
        messageElement.textContent = 'Por favor, preencha todos os campos corretamente.';
        messageElement.className = 'error';
        return;
    }

    // Verificar se há saldo suficiente
    if (amount > saldo) {
        messageElement.textContent = 'Saldo insuficiente para realizar a transferência.';
        messageElement.className = 'error';
        return;
    }

    // Simular a transferência
    messageElement.textContent = `Transferindo R$ ${amount.toFixed(2).replace('.', ',')} para a chave PIX ${key}...`;
    messageElement.className = '';  // Remover qualquer classe anterior

    // Simular tempo de processamento (2 segundos)
    setTimeout(function() {
        // Atualizar saldo após a transferência
        saldo -= amount;

        // Atualizar a interface com o novo saldo
        atualizarSaldo();

        // Gerar e exibir o comprovante
        const dataHora = formatarDataHora();

        // Exibir o comprovante
        comprovanteElement.style.display = 'block';  // Mostrar o comprovante
        comprovanteElement.innerHTML = `
            <h3>Comprovante de Transferência</h3>
            <p><strong>Nome do Destinatário:</strong> ${name}</p>
            <p><strong>Chave PIX:</strong> ${key}</p>
            <p><strong>Valor Transferido:</strong> R$ ${amount.toFixed(2).replace('.', ',')}</p>
            <p><strong>Data e Hora:</strong> ${dataHora}</p>
            <p><strong>Saldo Restante:</strong> R$ ${saldo.toFixed(2).replace('.', ',')}</p>
        `;
    }, 2000);
});

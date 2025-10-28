// Variável global para armazenar dados
let patrimonio = [];
let tombamentoParaExcluir = null;

// Inicializar dados
function inicializarDados() {
    const dadosSalvos = localStorage.getItem('patrimonioSMAPA');
    if (dadosSalvos) {
        patrimonio = JSON.parse(dadosSalvos);
    } else {
        // Se não houver dados salvos, inicializa com array vazio ou dados padrão
        patrimonio = typeof dadosPatrimonio !== 'undefined' ? [...dadosPatrimonio] : [];
        salvarDados();
    }
}

// Salvar dados no LocalStorage
function salvarDados() {
    localStorage.setItem('patrimonioSMAPA', JSON.stringify(patrimonio));
}

// Carregar tabela
function carregarTabela(dados = patrimonio) {
    const corpoTabela = document.getElementById('corpoTabela');
    corpoTabela.innerHTML = '';
    
    dados.forEach(item => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td class="tombamento">${item.tombamento}</td>
            <td>${item.descricao}</td>
            <td>${item.categoria}</td>
            <td>${item.dataAquisicao}</td>
            <td>${item.setor}</td>
            <td>${item.responsavel}</td>
            <td>${item.localizacaoEspecifica}</td>
            <td class="situacao-${item.situacao.toLowerCase()}">${item.situacao}</td>
            <td>${item.dataInclusao || '-'}</td>
            <td>
                <button class="action-btn btn-ver" onclick="verDetalhes('${item.tombamento}')">Ver</button>
                <button class="action-btn btn-excluir" onclick="abrirModalExcluir('${item.tombamento}')">Excluir</button>
            </td>
        `;
        corpoTabela.appendChild(linha);
    });
    
    atualizarEstatisticas(dados);
}

// Filtrar tabela
function filtrarTabela() {
    const busca = document.getElementById('busca').value.toLowerCase().trim();
    const categoria = document.getElementById('categoria').value;
    
    let dadosFiltrados = patrimonio;
    
    if (busca) {
        dadosFiltrados = dadosFiltrados.filter(item => 
            item.tombamento.toLowerCase().includes(busca) || 
            item.descricao.toLowerCase().includes(busca) ||
            item.setor.toLowerCase().includes(busca) ||
            item.responsavel.toLowerCase().includes(busca) ||
            item.localizacaoEspecifica.toLowerCase().includes(busca)
        );
    }
    
    if (categoria) {
        dadosFiltrados = dadosFiltrados.filter(item => item.categoria === categoria);
    }
    
    carregarTabela(dadosFiltrados);
    
    if (dadosFiltrados.length === 0 && (busca || categoria)) {
        document.getElementById('corpoTabela').innerHTML = 
            '<tr><td colspan="10" style="text-align: center; padding: 20px; color: #7f8c8d;">Nenhum item encontrado</td></tr>';
    }
}

// Limpar filtros
function limparFiltros() {
    document.getElementById('busca').value = '';
    document.getElementById('categoria').value = '';
    carregarTabela();
}

// Atualizar estatísticas
function atualizarEstatisticas(dados) {
    const total = dados.length;
    const ativos = dados.filter(item => item.situacao === 'Ativo').length;
    const manutencao = dados.filter(item => item.situacao === 'Manutenção').length;
    const categorias = [...new Set(dados.map(item => item.categoria))].length;
    
    document.getElementById('totalItens').textContent = total;
    document.getElementById('totalAtivos').textContent = ativos;
    document.getElementById('totalManutencao').textContent = manutencao;
    document.getElementById('totalCategorias').textContent = categorias;
}

// Abrir modal adicionar
function abrirModalAdicionar() {
    document.getElementById('modalTitulo').textContent = 'Novo Patrimônio';
    document.getElementById('formPatrimonio').reset();
    document.getElementById('modalPatrimonio').style.display = 'block';
}

// Fechar modal
function fecharModal() {
    document.getElementById('modalPatrimonio').style.display = 'none';
}

// Salvar patrimônio
function salvarPatrimonio(event) {
    event.preventDefault();
    
    const novoItem = {
        tombamento: document.getElementById('inputTombamento').value,
        descricao: document.getElementById('inputDescricao').value,
        categoria: document.getElementById('inputCategoria').value,
        dataAquisicao: formatarData(document.getElementById('inputDataAquisicao').value),
        setor: document.getElementById('inputSetor').value,
        responsavel: document.getElementById('inputResponsavel').value,
        localizacaoEspecifica: document.getElementById('inputLocalizacao').value,
        situacao: document.getElementById('inputSituacao').value,
        observacoes: document.getElementById('inputObservacoes').value || 'Sem observações',
        dataInclusao: new Date().toLocaleDateString('pt-BR')
    };
    
    // Verificar se tombamento já existe
    const existe = patrimonio.find(item => item.tombamento === novoItem.tombamento);
    if (existe) {
        alert('Erro: Já existe um patrimônio com este número de tombamento!');
        return;
    }
    
    patrimonio.push(novoItem);
    salvarDados();
    carregarTabela();
    fecharModal();
    
    alert('Patrimônio adicionado com sucesso!');
}

// Formatar data
function formatarData(dataISO) {
    const data = new Date(dataISO + 'T00:00:00');
    return data.toLocaleDateString('pt-BR');
}

// Abrir modal excluir
function abrirModalExcluir(tombamento) {
    const item = patrimonio.find(i => i.tombamento === tombamento);
    if (item) {
        tombamentoParaExcluir = tombamento;
        document.getElementById('itemExcluir').textContent = 
            `Tombamento: ${item.tombamento} - ${item.descricao}`;
        document.getElementById('modalConfirmar').style.display = 'block';
    }
}

// Fechar modal confirmar
function fecharModalConfirmar() {
    document.getElementById('modalConfirmar').style.display = 'none';
    tombamentoParaExcluir = null;
}

// Confirmar exclusão
function confirmarExclusao() {
    if (tombamentoParaExcluir) {
        patrimonio = patrimonio.filter(item => item.tombamento !== tombamentoParaExcluir);
        salvarDados();
        carregarTabela();
        fecharModalConfirmar();
        alert('Patrimônio excluído com sucesso!');
    }
}

// Ver detalhes
function verDetalhes(tombamento) {
    const item = patrimonio.find(i => i.tombamento === tombamento);
    if (item) {
        const detalhes = `
DETALHES DO PATRIMÔNIO
======================
Tombamento: ${item.tombamento}
Descrição: ${item.descricao}
Categoria: ${item.categoria}
Data de Aquisição: ${item.dataAquisicao}
Setor: ${item.setor}
Responsável: ${item.responsavel}
Localização: ${item.localizacaoEspecifica}
Situação: ${item.situacao}
Observações: ${item.observacoes}
Incluído em: ${item.dataInclusao || 'Não registrado'}

Consulta: ${new Date().toLocaleString('pt-BR')}
        `;
        alert(detalhes);
    }
}

// Exportar Excel
function exportarExcel() {
    const dadosExcel = patrimonio.map(item => ({
        'Tombamento': item.tombamento,
        'Descrição': item.descricao,
        'Categoria': item.categoria,
        'Data Aquisição': item.dataAquisicao,
        'Setor': item.setor,
        'Responsável': item.responsavel,
        'Localização': item.localizacaoEspecifica,
        'Situação': item.situacao,
        'Incluído em': item.dataInclusao || '-',
        'Observações': item.observacoes
    }));
    
    const ws = XLSX.utils.json_to_sheet(dadosExcel);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Patrimônio SMAPA");
    
    const colWidths = [
        {wch: 15}, {wch: 35}, {wch: 20}, {wch: 12},
        {wch: 25}, {wch: 20}, {wch: 30}, {wch: 12}, 
        {wch: 12}, {wch: 35}
    ];
    ws['!cols'] = colWidths;
    
    const nomeArquivo = `patrimonio_smapa_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(wb, nomeArquivo);
    
    alert(`Arquivo exportado: ${nomeArquivo}`);
}

// Gerar relatório
function gerarRelatorio() {
    const total = patrimonio.length;
    const ativos = patrimonio.filter(item => item.situacao === 'Ativo').length;
    const manutencao = patrimonio.filter(item => item.situacao === 'Manutenção').length;
    const inativos = patrimonio.filter(item => item.situacao === 'Inativo').length;
    
    const categorias = {};
    patrimonio.forEach(item => {
        categorias[item.categoria] = (categorias[item.categoria] || 0) + 1;
    });
    
    let relatorioCategorias = '';
    Object.keys(categorias).sort().forEach(cat => {
        relatorioCategorias += `- ${cat}: ${categorias[cat]}\n`;
    });
    
    const relatorio = `
RELATÓRIO PATRIMONIAL - SMAPA
================================
Data: ${new Date().toLocaleDateString('pt-BR')}
Hora: ${new Date().toLocaleTimeString('pt-BR')}

RESUMO GERAL:
- Total de Itens: ${total}
- Itens Ativos: ${ativos} (${total > 0 ? ((ativos/total)*100).toFixed(1) : 0}%)
- Em Manutenção: ${manutencao} (${total > 0 ? ((manutencao/total)*100).toFixed(1) : 0}%)
- Inativos: ${inativos} (${total > 0 ? ((inativos/total)*100).toFixed(1) : 0}%)

DISTRIBUIÇÃO POR CATEGORIA:
${relatorioCategorias}

Secretaria Municipal do Meio Ambiente e Proteção Animal
Prefeitura Municipal de Mogi das Cruzes - SP
    `;
    
    alert(relatorio);
}

// Atualizar data no rodapé
function atualizarDataRodape() {
    const dataElement = document.getElementById('dataAtualizacao');
    if (dataElement) {
        dataElement.textContent = new Date().toLocaleString('pt-BR');
    }
}

// Fechar modal ao clicar fora
window.onclick = function(event) {
    const modalPatrimonio = document.getElementById('modalPatrimonio');
    const modalConfirmar = document.getElementById('modalConfirmar');
    
    if (event.target === modalPatrimonio) {
        fecharModal();
    }
    if (event.target === modalConfirmar) {
        fecharModalConfirmar();
    }
}

// Inicializar ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    inicializarDados();
    carregarTabela();
    atualizarDataRodape();
    
    // Atualizar data a cada minuto
    setInterval(atualizarDataRodape, 60000);
});
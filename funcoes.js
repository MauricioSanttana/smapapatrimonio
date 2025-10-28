// Dados iniciais do patrimônio SMAPA
const dadosPatrimonio = [
    {
        tombamento: "000000123456",
        descricao: "Computador All In One Dell",
        categoria: "Equipamento TI",
        dataAquisicao: "15/01/2023",
        setor: "SEC MEIO AMBIENTE",
        responsavel: "Servidor Administrativo",
        localizacaoEspecifica: "Sala 201",
        situacao: "Ativo",
        observacoes: "Equipamento em perfeito estado",
        dataInclusao: "27/10/2024"
    },
    {
        tombamento: "000000123457",
        descricao: "Impressora Multifuncional HP LaserJet",
        categoria: "Equipamento TI",
        dataAquisicao: "20/02/2023",
        setor: "SEC MEIO AMBIENTE",
        responsavel: "Coordenador Administrativo",
        localizacaoEspecifica: "Sala 202",
        situacao: "Ativo",
        observacoes: "Impressora de uso geral",
        dataInclusao: "27/10/2024"
    },
    {
        tombamento: "000000123458",
        descricao: "Veículo Fiat Strada",
        categoria: "Veículos",
        dataAquisicao: "10/03/2022",
        setor: "SEC MEIO AMBIENTE",
        responsavel: "Motorista Oficial",
        localizacaoEspecifica: "Garagem Principal",
        situacao: "Ativo",
        observacoes: "Placa ABC-1234, para fiscalização",
        dataInclusao: "27/10/2024"
    },
    {
        tombamento: "000000123459",
        descricao: "Mesa de Escritório em L",
        categoria: "Mobiliário",
        dataAquisicao: "05/05/2023",
        setor: "SEC MEIO AMBIENTE",
        responsavel: "Servidor Administrativo",
        localizacaoEspecifica: "Sala 203",
        situacao: "Ativo",
        observacoes: "Mobiliário padrão",
        dataInclusao: "27/10/2024"
    },
    {
        tombamento: "000000123460",
        descricao: "Notebook Lenovo ThinkPad",
        categoria: "Equipamento TI",
        dataAquisicao: "12/06/2023",
        setor: "SEC MEIO AMBIENTE",
        responsavel: "Diretor de Departamento",
        localizacaoEspecifica: "Sala Direção",
        situacao: "Manutenção",
        observacoes: "Em manutenção preventiva",
        dataInclusao: "27/10/2024"
    }
];

// Exportar dados para uso global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = dadosPatrimonio;
}
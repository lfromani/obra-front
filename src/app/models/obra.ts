export interface Obra {
    idObra?: any;
    descricao: string;
    dataCadastro?: any;
    observacoes?: any;
    idCliente: any;
    nomeCliente: string;
    status?: any;
}

export function filterOptionsByLabel(obras: Obra[], descricao: string): Obra[] {
    const value = descricao.trim().toLowerCase();
    return obras.filter((option: Obra) => {
      return option.descricao.toLowerCase().includes(value);
    });
  }
interface Transaction {
  Data: string;
  Valor: string;
  Identificador: string;
  Descrição: string;
}
const totalIO = (data: Transaction[] | null) => {
  if (!data) {
    return { totalIn: 0, totalOut: 0 };
  }

  const totals = data.reduce(
    (acc, value) => {
      const valor = parseFloat(value.Valor);

      if (valor > 0) {
        acc.totalIn += valor;
      } else {
        acc.totalOut += valor;
      }
      return acc;
    },
    { totalIn: 0, totalOut: 0 }
  );
  return totals;
};

export default totalIO;

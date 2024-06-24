interface Transaction {
  Data: string;
  Valor: string;
  Identificador: string;
  Descrição: string;
}

export default function dataForPieChart(data: Transaction[]) {
  const pieChartIncome = data.reduce((acc, transaction) => {
    const { Valor, Descrição } = transaction;
    const value = parseFloat(Valor);
    if (value > 0) {
      if (!acc[Descrição]) {
        acc[Descrição] = value;
      } else {
        acc[Descrição] += value;
      }
    }
    return acc;
  }, {} as Record<string, number>);

  const pieChartOutcome = data.reduce((acc, transaction) => {
    const { Valor, Descrição } = transaction;
    const value = parseFloat(Valor);
    if (value < 0) {
      if (!acc[Descrição]) {
        acc[Descrição] = value;
      } else {
        acc[Descrição] += value;
      }
    }
    return acc;
  }, {} as Record<string, number>);

  return { pieChartIncome, pieChartOutcome };
}

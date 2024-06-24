interface Transaction {
  Data: string;
  Valor: string;
  Identificador: string;
  Descrição: string;
}

const dataForLineChart = (data: Transaction[]) => {
  const lineChartIncome = data.reduce((acc, transaction) => {
    const { Valor, Data } = transaction;
    const value = parseFloat(Valor);

    if (value > 0) {
      if (!acc[Data]) {
        acc[Data] = value;
      } else {
        acc[Data] += value;
      }
    }
    return acc;
  }, {} as Record<string, number>);

  const lineChartOutcome = data.reduce((acc, transaction) => {
    const { Valor, Data } = transaction;
    const value = parseFloat(Valor);

    if (value < 0) {
      if (!acc[Data]) {
        acc[Data] = value;
      } else {
        acc[Data] += value;
      }
    }
    return acc;
  }, {} as Record<string, number>);

  return { lineChartIncome, lineChartOutcome };
};

export default dataForLineChart;

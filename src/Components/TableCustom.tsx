import { useEffect, useState } from 'react';
import { Table, TableRow, TableCell, TableHeaderRow, TableHeaderCell } from '@ui5/webcomponents-react';
import { AlignmentKpilist, DataPoint, dataTableFormated, dataTableType } from './interfaces.interface';

interface TableCustomProps {
  dataTable: dataTableType[];
  formatNumber: (value: number) => string;
}

const TableCustom = ({ dataTable, formatNumber }: TableCustomProps) => {
  const [dataTableFormated, setDataTableFormated] = useState<dataTableFormated[]>([]);

  useEffect(() => {
    const formattedData = dataTable?.map(formatData).filter((data): data is dataTableFormated => data !== null);
    setDataTableFormated(formattedData);
  }, [dataTable]);

  const formatData = (d: dataTableType): dataTableFormated | null => {
    const aeTotal = calculateAlignment(d.alignmentKPIList);
    const aeCCM = calculateEnvironmentalObjective(d.alignmentKPIList, 'CCM');
    const aeCCA = calculateEnvironmentalObjective(d.alignmentKPIList, 'CCA');

    if (!d.product) return null;

    return {
      loanId: d.product.contractId,
      partnerName: d.product.borrower.name,
      exposure: `${formatNumber(d.product.grossCarryingAmount.amount)} ${d.product.grossCarryingAmount.currency}`,
      aeTotal: formatAlignment(aeTotal),
      aeCCM: formatAlignment(aeCCM),
      aeCCA: formatAlignment(aeCCA),
    };
  };

  const calculateAlignment = (alignmentKPIList: AlignmentKpilist[]) => {
    return alignmentKPIList.reduce((acc, aeT) => {
      acc.a += aeT.alignmentValue.amount;
      acc.e += aeT.eligibilityValue.amount;
      acc.eCurrency = aeT.eligibilityValue.currency;
      return acc;
    }, { a: 0, e: 0, eCurrency: '' });
  };

  const calculateEnvironmentalObjective = (alignmentKPIList: AlignmentKpilist[], objective: string) => {
    return alignmentKPIList.flatMap(aeT =>
      aeT.dataPoints
        .filter(dp => dp.environmentalObjective === objective)
        .reduce((acc, dp) => {
          acc.a += dp.alignedValue.amount;
          acc.e += dp.eligableValue.amount;
          acc.eCurrency = dp.eligableValue.currency;
          return acc;
        }, { a: 0, e: 0, eCurrency: '' })
    )[0] || { a: 0, e: 0, eCurrency: '' };
  };

  const formatAlignment = (alignment: any) => {
    return `${formatNumber(alignment.a)} of ${formatNumber(alignment.e)} ${alignment.eCurrency}`;
  };

  return (
    <div style={{ height: '400px', overflow: 'auto' }}>
      <Table headerRow={
        <TableHeaderRow sticky>
          {['Loan Id', 'Partner Name', 'Exposure', 'Aligned & Eligible Total', 'CCM Aligned & Eligible', 'CCA Aligned & Eligible'].map((header, index) => (
            <TableHeaderCell key={index} minWidth={index < 3 ? '10rem' : undefined}>
              <span style={{ color: '#00cc00' }}>{header}</span>
            </TableHeaderCell>
          ))}
        </TableHeaderRow>
      }>
        {dataTableFormated?.map((data) => (
          <TableRow key={data.loanId}>
            <TableCell><span>{data.loanId}</span></TableCell>
            <TableCell><span>{data.partnerName}</span></TableCell>
            <TableCell><span>{data.exposure}</span></TableCell>
            <TableCell><span>{data.aeTotal}</span></TableCell>
            <TableCell><span>{data.aeCCM}</span></TableCell>
            <TableCell><span>{data.aeCCA}</span></TableCell>
          </TableRow>
        ))}
      </Table>
    </div>
  );
};

export default TableCustom;

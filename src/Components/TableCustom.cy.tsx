import TableCustom from "./TableCustom";

describe('TableCustom Component', () => {
  const mockDataTable = [
    {
      product: {
        contractId: 1,
        borrower: { name: 'Borrower A' },
        grossCarryingAmount: { amount: 1000000, currency: 'USD' },
      },
      alignmentKPIList: [
        {
          alignmentValue: { amount: 500000, currency: 'USD' },
          eligibilityValue: { amount: 1000000, currency: 'USD' },
          dataPoints: [
            {
              environmentalObjective: 'CCM',
              alignedValue: { amount: 300000, currency: 'USD' },
              eligableValue: { amount: 500000, currency: 'USD' },
            },
          ],
        },
      ],
    },
    {
      product: {
        contractId: 2,
        borrower: { name: 'Borrower B' },
        grossCarryingAmount: { amount: 2000000, currency: 'EUR' },
      },
      alignmentKPIList: [
        {
          alignmentValue: { amount: 1000000, currency: 'EUR' },
          eligibilityValue: { amount: 2000000, currency: 'EUR' },
          dataPoints: [
            {
              environmentalObjective: 'CCM',
              alignedValue: { amount: 700000, currency: 'EUR' },
              eligableValue: { amount: 1000000, currency: 'EUR' },
            },
          ],
        },
      ],
    },
  ];

  const formatNumber = (number: number) =>
    number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, '.');

  beforeEach(() => {
    cy.mount(<TableCustom dataTable={mockDataTable} formatNumber={formatNumber} />);
  });

  it('renders the correct number of rows', () => {
    // The number of data rows should match the length of the mockDataTable
    cy.get('ui5-table-row').should('have.length', 2); // 2 data rows
  });

  it('renders correct CCM Aligned & Eligible values for each row', () => {
    // First row (Borrower A)
    cy.contains('300.000 of 500.000 USD').should('exist');

    // Second row (Borrower B)
    cy.contains('700.000 of 1.000.000 EUR').should('exist');
  });
});

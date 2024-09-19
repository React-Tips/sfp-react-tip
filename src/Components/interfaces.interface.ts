export interface dataHeaderType {
  productIds: string[]
  grossCarryingAmountTotal: AmountObjectFormat
  eligabilityTotal: AmountObjectFormat
  alignmentTotal: AmountObjectFormat
}

export interface dataTableType {
  product: Product
  alignmentKPIList: AlignmentKpilist[]
}

export interface Product {
  contractId: number
  borrower: Borrower
  useOfProceeds: string[]
  grossCarryingAmount: AmountObjectFormat
}

export interface Borrower {
  id: number
  name: string
  lei: string
}

export interface AlignmentKpilist {
  useOfProceeds?: string
  dataPoints: DataPoint[]
  eligibilityValue: AmountObjectFormat
  alignmentValue: AmountObjectFormat
}

export interface DataPoint {
  environmentalObjective: string
  fulfillmentType?: string
  isSpecializedLending: boolean
  eligableValue: AmountObjectFormat
  alignedValue: AmountObjectFormat
}

export interface dataTableFormated {
  loanId: number;
  partnerName: string;
  exposure: string;
  aeTotal: string;
  aeCCM: string;
  aeCCA: string;
}

export interface AmountObjectFormat {
  amount: number
  currency: string
  formatted: string
}
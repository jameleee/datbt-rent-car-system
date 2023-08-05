export enum EPaymenMethod {
  Cash = 1,
  CreditCard = 2,
  DebitCard = 3,
  Paypal = 4,
  EBanking = 5,
}

export enum EPaymentStatus {
  Pending = 1,
  Processing = 2,
  Paid = 3,
  Declined = 4,
}

export enum ECoupon {
  PercentageDiscount = 1,
  FlatDiscount = 2,
  FreeShipping = 2,
}

export enum ERentalStatus {
  Created = 1,
  Pending = 2,
  Reserved = 3,
  CheckedOut = 4,
  Returned = 5,
}

export enum ECarStatus {
  Available = 1,
  Maintenance = 2,
  Hired = 3,
}

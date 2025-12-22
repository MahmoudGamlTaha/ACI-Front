export interface IRequestDetails {
  hsCode?: string;
  productName?: string;
  productDescription?: string;
  numberOfParcels?: number;
  parcelType?: string;
  netWeight?: number;
  grossWeight?: number;
  unitOfWeight?: string;
  quantity?: number;
  unitOfQuantity?: string;
  unitValue?: number;
  currency?: string;
}

export interface ICreateRequestPayload {
  fromUserId: number;
  fromPortId: number;
  referenceNumber: string;
  toPortId: number;
  toUserId: number;
  shipTypeId: number;
  description: string;
  status: "ISSUED" | "PENDING" | "APPROVED" | "REJECTED" | "DRAFT";
  requestDetails: IRequestDetails[];
}


export interface ICountsApi {
  id: number | null;
  createdAt: string | null;
  updatedAt: string | null;
  createdBy: number | null;
  updatedBy: number | null;
  toRequest: number;
  fromRequest: number;
  totalRequest: number;
}
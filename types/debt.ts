export enum DebtType {
  OWED_TO_ME = "owed_to_me",
  I_OWE = "i_owe",
}

export interface Debt {
  id: number;
  user_id: string;
  type: DebtType;
  counterpart_name: string;
  amount: number;
  note: string | null;
  due_date: string;
  settled_at: string | null;
}

export interface CreateDebtPayload {
  type: DebtType;
  counterpart_name: string;
  amount: number;
  due_date: string;
  note?: string | null;
}

export type UpdateDebtPayload = Partial<CreateDebtPayload> & {
  settled_at?: string | null;
};

export interface DebtSummary {
  owed_to_me: number;
  i_owe: number;
  net: number;
}

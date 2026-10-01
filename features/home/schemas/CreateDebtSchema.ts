import * as Yup from "yup";

export const DebtSchema = Yup.object().shape({
  type: Yup.string(),
  counterpart_name: Yup.string().required("Nama wajib diisi"),
  amount: Yup.number().required("Jumlah wajib diisi"),
  due_date: Yup.date(),
  note: Yup.string(),
});

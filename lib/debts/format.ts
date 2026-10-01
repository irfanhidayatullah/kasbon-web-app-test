export const formatRupiah = (amount: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);

export function relativeDate(value: string) {
  const [year, month, day] = value.slice(0, 10).split("-").map(Number);

  const now = new Date();

  const days = Math.round(
    (Date.UTC(year, month - 1, day) -
      Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())) /
      86400000,
  );

  return new Intl.RelativeTimeFormat("id-ID", {
    numeric: "auto",
  }).format(days, "day");
}

export function today() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

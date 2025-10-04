export const formatAmountDisplay = (value: string | undefined | null) => {
  if (value === undefined || value === null) return "";
  const raw = String(value).replace(/,/g, "").trim();
  if (raw === "") return "";

  // allow possible decimal part
  const parts = raw.split(".");
  const intPart = parts[0].replace(/^0+(?=\d)/, ""); // remove leading zeros but leave single 0
  const decimals = parts[1];

  const withCommas = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return decimals !== undefined ? `${withCommas}.${decimals}` : withCommas;
};

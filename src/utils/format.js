// 格式化数值或百分比
export function format(val, isPct = false) {
  if (typeof val !== "number") return val;
  if (isPct) return (val * 100).toFixed(2) + "%";
  return val.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

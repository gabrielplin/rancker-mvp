export function formatDateBR(dateString?: string) {
  if (!dateString) return;

  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString().slice(-2); // pega os 2 últimos dígitos
  return `${day}/${month}/${year}`;
}

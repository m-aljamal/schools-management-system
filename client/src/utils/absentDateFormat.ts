function today() {
  const date = new Date();
  const month = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month + 1}-${day}-${year}`;
}

export { today };

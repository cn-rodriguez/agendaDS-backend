export const handleDate = (dateEvent) => {
  const date = new Date(dateEvent).toLocaleDateString("es-ES");

  return date;
};

export const handleTime = (timeEvent) => {
  const time = timeEvent.slice(1, 6);
  return time;
};

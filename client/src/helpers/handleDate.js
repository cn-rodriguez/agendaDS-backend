export const handleDate = (dateEvent) => {
  const date = new Date(dateEvent).toLocaleDateString();

  return date;
};

export const handleTime = (timeEvent) => {
  const time = timeEvent.slice(17, 25);
  return time;
};

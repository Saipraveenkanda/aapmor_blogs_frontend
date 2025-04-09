export const checkIsWritingEnabled = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const startOfEnable = new Date(year, month, 8, 0, 0, 0); // 8th of the month
  const endOfEnable = new Date(year, month, 27, 23, 59, 59); // 27th of the month

  return now >= startOfEnable && now <= endOfEnable;
};

export const getWritingUnlockTimeLeft = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const startOfEnable = new Date(year, month, 8, 0, 0, 0);
  const endOfEnable = new Date(year, month, 27, 23, 59, 59);

  if (now >= startOfEnable && now <= endOfEnable) {
    return ""; // Already enabled
  }

  const nextEnableDate =
    now < startOfEnable ? startOfEnable : new Date(year, month + 1, 8);

  const timeDifference = nextEnableDate - now;

  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);

  return `Analyzing entries... Writing unlocks in ${days}d ${hours}h ${minutes}m`;
};

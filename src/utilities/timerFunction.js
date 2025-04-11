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

export const timeAgo = (timestamp) => {
  const now = new Date();
  const time = new Date(timestamp);
  const seconds = Math.floor((now - time) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (let i = 0; i < intervals.length; i++) {
    const interval = Math.floor(seconds / intervals[i].seconds);
    if (interval >= 1) {
      return `${interval} ${
        interval === 1 ? intervals[i].label : intervals[i].label + "s"
      } ago`;
    }
  }

  return "just now";
};

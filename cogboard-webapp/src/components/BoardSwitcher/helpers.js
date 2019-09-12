export const formatTime = (timeInSec) => {
  const seconds = timeInSec % 60;
  const minutes = Math.floor(timeInSec / 60);
  const leadingZero = seconds < 10 ? 0 : '';

  return `${minutes}:${leadingZero}${seconds}`;
};

export const getPrevAndNextIndex = (array, currentIndex) => {
  const lastIndex = array.length - 1;
  const nextIndex = currentIndex < lastIndex ? currentIndex + 1 : 0;
  const prevIndex = currentIndex > 0 ? currentIndex - 1 : lastIndex;

  return [prevIndex, nextIndex];
};
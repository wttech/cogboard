const getNextStatus = status => {
  const statusArray = ['OK', 'FAIL', 'UNKNOWN'];
  const statusIndex = statusArray.findIndex(element => element === status);

  let nextStatusIndex = 0;

  if (statusIndex !== -1) {
    nextStatusIndex =
      statusIndex < statusArray.length - 1 ? statusIndex + 1 : 0;
  } else {
    nextStatusIndex = statusArray.findIndex(element => element === 'UNKNOWN');
  }

  return statusArray[nextStatusIndex];
};

export default getNextStatus;

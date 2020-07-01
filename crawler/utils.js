filterArray = (initialArr, newArr) =>
  newArr.filter((val) => !initialArr.includes(val));

module.exports = {
  filterArray,
};

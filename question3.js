function maintenanceCosts(maintenanceLogs, queries) {
  
  maintenanceLogs.sort((a, b) => a[1].localeCompare(b[1]));

  const dates = [];
  const prefixSums = [];

  let total = 0;
  for (let [, date, cost] of maintenanceLogs) {
    dates.push(date);
    total += cost;
    prefixSums.push(total);
  }

  function lowerBound(arr, target) {
    let low = 0,
      high = arr.length;
    while (low < high) {
      const mid = Math.floor((low + high) / 2);
      if (arr[mid] < target) low = mid + 1;
      else high = mid;
    }
    return low;
  }

  function upperBound(arr, target) {
    let low = 0,
      high = arr.length;
    while (low < high) {
      const mid = Math.floor((low + high) / 2);
      if (arr[mid] <= target) low = mid + 1;
      else high = mid;
    }
    return low;
  }

  const result = [];

  for (let [start, end] of queries) {
    const l = lowerBound(dates, start);
    const r = upperBound(dates, end) - 1;

    if (l > r) {
      result.push(0);
    } else {
      const sum = prefixSums[r] - (l > 0 ? prefixSums[l - 1] : 0);
      result.push(sum);
    }
  }

  return result;
}

// 🧪 Example Test
const logs3 = [
  [101, "2024-01-01", 500],
  [102, "2024-01-10", 300],
  [101, "2024-01-15", 700],
];
const queries3 = [
  ["2024-01-01", "2024-01-10"],
  ["2024-01-01", "2024-01-15"],
];

console.log(maintenanceCosts(logs3, queries3)); // [800, 1500]

/**
 * Compute the longest increasing subsequence (LIS) within an array of integers.
 * @param arr The array.
 * @return The indices of all elements belonging to the LIS.
 */
export function getLis(arr : number[]) : number[] {
  // The problem of finding the longest increasing subsequence within an array
  // of totally ordered can be solved in O(n*log(n)) using binary search.
  const len = arr.length;

  /**
   * After the algorithm terminates, parent[i] is an index k, such that
   * arr[k] is the predecessor in the longest increasing subsequence
   that arr[i] is a part of.
   */
  const parent : number[] = new Array(len);
  // The first element cannot have a predecessor
  parent[0] = -1;

  /**
   * After the algorithm terminates, m[i] is an index k, such that arr[k] is
   * the lowest element e in arr, such that an increasing subsequence of length
   * i ends at e.
   * It trivially follows that m[i] < m[i + 1] for all i in 0...l
   * - 1, where l is the length of the longest increasing subsequence in the
   * array.
   */
  const m : number[] = new Array(len);
  m[0] = 0;

  /**
   * The length of the longest LIS found so far.
   */
  let maxLength = 0;
  for (let i = 0; i < len; i++) {
    // For arr[i], find the largest j, such that arr[m[j]] < arr[i] and j < i.
    // In other words, from all the increasing subsequences that arr[i] could
    // extend, find the one that is currently the longest and extend it.
    // Searching for this index can performed using binary search, as m is
    // sorted in ascending order (see above).
    // For the lower bound, we must choose 0 as arr[i] might not be part of any
    // increasing subsequence. For the upper bound, we should choose i.
    // However, it obviously holds that maxLength <= i, hence we choose the
    // (potentially) better bound.

    let low = 0;
    let high = maxLength;
    while (low !== high) {
      const mid = Math.ceil((low + high) / 2);
      if (arr[m[mid]] >= arr[i]) {
        // We cannot extend the sequence of length mid, adjust upper bound
        high = mid - 1;
      } else {
        // We can extend the sequence of length mid, adjust lower bound
        low = mid;
      }
    }
    const j = low;

    // Set the value of m[j + i] to i.
    // If m[j + 1] already contained a value, we can safely overwrite it,
    // because we just found a smaller element arr[i] that represents the
    // end to an increasing subsequence of length j + 1. If arr[i] was bigger
    // than arr[m[j + 1]], the binary search would not have terminated at the
    // value j.
    m[j + 1] = i;
    // Set parent to the end of the sequence we just extended
    parent[i] = m[j];
    // Update maximum length if necessary
    if (j + 1 > maxLength) {
      maxLength = j + 1;
    }
  }

  // Extract the longest increasing subsequence using the parent array
  const lis = [];
  let index = m[maxLength];
  // Only add maxLength elements
  for (let i = 0; i < maxLength; i++) {
    lis.push(index);
    index = parent[index];
  }

  // Since we proceeded from the tail, reverse the sequence to maintain natural
  // sorting order
  return lis.reverse();
}



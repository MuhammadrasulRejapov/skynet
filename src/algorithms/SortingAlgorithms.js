/**
 * QuickSort and MergeSort
 */
class SortingAlgorithms {
    /**
     * QuickSort - O(n log n) average
     */
    static quickSort(arr, key = null) {
        const partition = (low, high) => {
            const pivot = arr[high];
            let i = low - 1;

            for (let j = low; j < high; j++) {
                const compareA = key ? arr[j][key] : arr[j];
                const compareB = key ? pivot[key] : pivot;

                if (compareA < compareB) {
                    i++;
                    [arr[i], arr[j]] = [arr[j], arr[i]];
                }
            }
            [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
            return i + 1;
        };

        const quickSortHelper = (low, high) => {
            if (low < high) {
                const pi = partition(low, high);
                quickSortHelper(low, pi - 1);
                quickSortHelper(pi + 1, high);
            }
        };

        quickSortHelper(0, arr.length - 1);
        return arr;
    }

    /**
     * MergeSort - O(n log n) guaranteed
     */
    static mergeSort(arr, key = null) {
        const merge = (left, right) => {
            const result = [];
            let i = 0, j = 0;

            while (i < left.length && j < right.length) {
                const compareA = key ? left[i][key] : left[i];
                const compareB = key ? right[j][key] : right[j];

                if (compareA <= compareB) {
                    result.push(left[i++]);
                } else {
                    result.push(right[j++]);
                }
            }

            return result.concat(left.slice(i)).concat(right.slice(j));
        };

        const mergeSortHelper = (array) => {
            if (array.length <= 1) return array;

            const mid = Math.floor(array.length / 2);
            const left = mergeSortHelper(array.slice(0, mid));
            const right = mergeSortHelper(array.slice(mid));

            return merge(left, right);
        };

        return mergeSortHelper(arr);
    }
}

module.exports = SortingAlgorithms;
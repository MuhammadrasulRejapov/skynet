/**
 * KMP String Matching Algorithm
 * Time: O(n + m)
 */
class StringMatching {
    static buildFailureFunction(pattern) {
        const m = pattern.length;
        const failure = new Array(m).fill(0);
        let j = 0;

        for (let i = 1; i < m; i++) {
            while (j > 0 && pattern[i] !== pattern[j]) {
                j = failure[j - 1];
            }
            if (pattern[i] === pattern[j]) {
                j++;
            }
            failure[i] = j;
        }

        return failure;
    }

    static kmpSearch(text, pattern) {
        if (pattern.length === 0) return [];

        const n = text.length;
        const m = pattern.length;
        const failure = this.buildFailureFunction(pattern);
        const matches = [];
        let j = 0;

        for (let i = 0; i < n; i++) {
            while (j > 0 && text[i] !== pattern[j]) {
                j = failure[j - 1];
            }
            if (text[i] === pattern[j]) {
                j++;
            }
            if (j === m) {
                matches.push(i - m + 1);
                j = failure[j - 1];
            }
        }

        return matches;
    }

    static searchPassengersInManifest(manifest, namePattern) {
        const results = [];
        for (let passenger of manifest) {
            const matches = this.kmpSearch(
                passenger.name.toLowerCase(),
                namePattern.toLowerCase()
            );
            if (matches.length > 0) {
                results.push(passenger);
            }
        }
        return results;
    }
}

module.exports = StringMatching;
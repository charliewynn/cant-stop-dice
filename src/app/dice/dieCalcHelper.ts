export class DieCalcHelper {
    static CalculatePairs(d1: number, d2: number, d3: number, d4: number): number[][] {
        let pairs: number[][] = [];
        const pairsContains = (sum1: number, sum2: number) =>
            pairs.some(p => p[0] === sum1 && p[1] === sum2 || pairs.some(p => p[0] === sum2 && p[1] === sum1));
        const tryPush = (sum1: number, sum2: number) => {
            if (!pairsContains(sum1, sum2)) {
                pairs.push([sum1, sum2]);
            }
        }

        tryPush(d1 + d2, d3 + d4);
        tryPush(d1 + d3, d2 + d4);
        tryPush(d1 + d4, d2 + d3);
        return pairs;
    }
}
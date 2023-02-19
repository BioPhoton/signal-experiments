const loops = 1000000
export function work(n: number) {
    for (let i = 0; i < loops; i++) {
        n += Math.sqrt(1 * n + 2 * n + 3 * n + 4 * n + 5 * n);
    }
    return n;
}

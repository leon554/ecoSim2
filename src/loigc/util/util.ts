

export function shortenNum(num: number): string {
    if (num < 1000) return num.toString();

    const units = ["", "k", "M", "B", "T"];
    let unitIndex = 0;

    while (num >= 1000 && unitIndex < units.length - 1) {
        num /= 1000;
        unitIndex++;
    }

    // Keep one decimal if needed (1.2k), but avoid trailing .0 (e.g. 120k, not 120.0k)
    const formatted = Number(num.toFixed(1));
    return `${formatted}${units[unitIndex]}`;
}

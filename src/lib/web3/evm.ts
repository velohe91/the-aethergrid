export function truncateAddress(address: string, head = 4, tail = 2): string {
  return address.length <= head + tail + 1 ? address : `${address.slice(0, head)}…${address.slice(-tail)}`;
}

export function formatNativeBalance(balance: number | null, symbol: string, digits = 4): string {
  if (balance === null || Number.isNaN(balance)) return `--- ${symbol}`;
  return `${balance.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: digits })} ${symbol}`;
}

export function getEvmExplorerUrl(chainId: number, address: string): string {
  const explorers: Record<number, string> = {
    1: "https://etherscan.io",
    8453: "https://basescan.org",
    137: "https://polygonscan.com",
    56: "https://bscscan.com",
    42161: "https://arbiscan.io",
    10: "https://optimistic.etherscan.io",
    43114: "https://snowtrace.io",
    4663: "https://robinhoodchain.blockscout.com",
    5042: "https://explorer.arc.io",
  };
  return `${explorers[chainId] ?? explorers[1]}/address/${address}`;
}
/**
 * EVM account helpers for THE AETHERGRID.
 * Ethereum + Base + Arc Testnet.
 */

export function truncateAddress(
  address: string,
  head = 4,
  tail = 2,
): string {
  if (address.length <= head + tail + 1) return address;
  return `${address.slice(0, head)}…${address.slice(-tail)}`;
}

export function getEvmExplorerUrl(chainId: number, address: string): string {
  const map: Record<number, string> = {
    1: `https://etherscan.io/address/${address}`,
    8453: `https://basescan.org/address/${address}`,
    5042002: `https://testnet.arcscan.app/address/${address}`,
  };
  return map[chainId] ?? `https://etherscan.io/address/${address}`;
}

export function formatNativeBalance(
  value: number | null,
  symbol: string,
  digits = 4,
): string {
  if (value === null || Number.isNaN(value)) return `--- ${symbol}`;
  return `${value.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: digits,
  })} ${symbol}`;
}

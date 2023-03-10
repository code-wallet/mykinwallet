import { sha512_256 } from "@noble/hashes/sha512";
import { Keypair, PublicKey, Transaction } from "@solana/web3.js";
import bs58 from "bs58";

interface TimeRemainingOpts {
    days?: boolean;
    hours?: boolean;
    minutes?: boolean;
    seconds?: boolean;
}

export function getHumanTimeRemaining(until: number, opts?: TimeRemainingOpts): string {
  const timeRemaining = Math.abs(until - Date.now());

  const seconds = Math.floor((timeRemaining / 1000) % 60);
  const minutes = Math.floor((timeRemaining / 1000 / 60) % 60);
  const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));

  if (opts) {
    const res : string[] = [];

    if (opts.days && days > 0) res.push(`${days} days`);
    if (opts.hours && hours > 0) res.push(`${hours} hours`);
    if (opts.minutes && minutes > 0) res.push(`${minutes} minutes`);
    if (opts.seconds && seconds > 0) res.push(`${seconds} seconds`);

    // join the res with commas, but the last one with "and"
    return res.join(", ").replace(/,([^,]*)$/, " and$1");
  }

  if (days > 0) return `${days} days`;
  if (hours > 0) return `${hours} hours`;
  if (minutes > 0) return `${minutes} minutes`;

  return `${seconds} seconds`;
}

export function chunk<T>(list: T[], size: number): T[][] {
  return list.reduce((acc, cur, i) => {
    const idx = Math.floor(i / size);
    acc[idx] = acc[idx] || [];
    acc[idx].push(cur);
    return acc;
  }, [] as T[][]);
}

export function shortenSignature(sig: string, len: number = 16): string {
  return `${sig.substring(0, len)}...${sig.substring(sig.length - len)}`;
}

export function shortenAddress(address: string, len: number = 6): string {
  return `${address.substring(0, len)}...${address.substring(address.length - len)}`;
}

export function shortenPubkey(pubkey: PublicKey, len: number = 6): string {
  const address = pubkey.toBase58();
  return `${address.substring(0, len)}...${address.substring(address.length - len)}`;
}

export function getInspectorLinkWithoutSigs(tx: Transaction) {
    const message = tx.serializeMessage().toString('base64');
    return `https://explorer.solana.com/tx/inspector?message=${encodeURIComponent(encodeURIComponent(message))}\n`;
}
export function getInspectorLink(tx: Transaction) {
    const signatures = tx.signatures.map(sig => bs58.encode(sig.signature!));
    const message = tx.serializeMessage().toString('base64');
    return `https://explorer.solana.com/tx/inspector?signatures=${encodeURIComponent(encodeURIComponent(JSON.stringify(signatures)))}&message=${encodeURIComponent(encodeURIComponent(message))}\n`;
}

export function getAssociatedNonceKeypair(pubkey: PublicKey, password: string) : Keypair {
  const seeds = Buffer.from([
    Buffer.from("associated-nonce-account"),
    pubkey.toBuffer(),
    Buffer.from(password)
  ].join());
  const hash = sha512_256(seeds);
  return Keypair.fromSeed(hash);
}

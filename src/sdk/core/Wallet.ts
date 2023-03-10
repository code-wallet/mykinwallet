import { computed, ref } from 'vue';
import { Kin4Ledger } from '../kin/kin-4-ledger';

export const derivationPaths = [
  "44'/2017'/0'",
  "44'/2017'/1'",
  "44'/2017'/2'",
  "44'/2017'/3'",
  "44'/2017'/4'",
  "44'/2017'/5'",
  "44'/2017'/6'",
  "44'/2017'/7'",
  "44'/2017'/8'",
  "44'/2017'/9'",
  "44'/2017'/10'"
];

const wallet = new Kin4Ledger();
const selectedPath = ref(0);

export function useWallet() {
  return {
    derivationPaths,
    selectedPath,
    provider: wallet,
  }
}

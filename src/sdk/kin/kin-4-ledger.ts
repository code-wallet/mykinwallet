import TransportWebUsb from '@ledgerhq/hw-transport-webusb';
import {
	solana_derivation_path,
	solana_ledger_request_pubkey,
	solana_ledger_get_pubkey,
	solana_ledger_sign_transaction
} from './ledger-utils';
import bs58 from 'bs58';
import { PublicKey, Transaction } from '@solana/web3.js';

export class Kin4Ledger {
	transport: typeof TransportWebUsb | undefined;
	connected: boolean = false;

	private connect = async () => {
		if (this.connected == false) {
			// @ts-ignore
			this.transport = await TransportWebUsb.create();
			// @ts-ignore
			this.transport.on('disconnect', () => {
				this.connected = false;
				this.transport = undefined;
			});
			this.connected = true;
		}
		return this;
	};

	getPublicKey = async (account: number) => {
		await this.connect();
		const path = solana_derivation_path(account, undefined);
		const keyBytes = await solana_ledger_get_pubkey(this.transport, path);
		const encoded = bs58.encode(keyBytes);
		return new PublicKey(encoded);
	};

	getPublicKeyWithDisplay = async (account: number) => {
		await this.connect();
		const path = solana_derivation_path(account, undefined);
		const keyBytes = await solana_ledger_request_pubkey(this.transport, path);
		const encoded = bs58.encode(keyBytes);
		return new PublicKey(encoded);
	};

	signTransaction = async (account: number, transaction: Transaction) => {
		await this.connect();
		const from_derivation_path = solana_derivation_path(account, undefined);
		const pkBytes = await solana_ledger_get_pubkey(this.transport, from_derivation_path);
		const pk = new PublicKey(bs58.encode(pkBytes));
		const sig_bytes = await solana_ledger_sign_transaction(this.transport, from_derivation_path, transaction);

		transaction.addSignature(pk, sig_bytes);
		return transaction;
	};
}

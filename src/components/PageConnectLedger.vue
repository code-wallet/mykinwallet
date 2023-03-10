<script lang="ts">

import Button from './Button.vue';
import Layout from './Layout.vue';

import { useWallet } from '../sdk/core/Wallet';
import { shortenAddress } from '../sdk/core/Utils';

export default {
  components: {
    Button,
    Layout,
  },
  setup() {
    const { derivationPaths, selectedPath, provider } = useWallet();
    return {
      derivationPaths,
      selectedPath,
      provider,
      shortenAddress
    };
  },
  data() {
    return {
      address: "",
    }
  },
  methods: {

    async onConnect() {
      const address = await this.provider.getPublicKeyWithDisplay(this.selectedPath);
      this.address = address.toBase58();
    },

    onConfirm() {
      this.$bus.emit('goto:signtransaction');
    },

    onBack() {
      this.$bus.emit('goto:home');
    }

  },
}
</script>

<template>
  <Layout :header="true">
    <div class="grid h-screen place-items-center mt-0 sm:mt-[-5rem]">
      <div class="max-w-2xl">

        <p class="font-display text-4xl tracking-tight text-white">
          Connect Ledger
        </p>

        <p class="mt-3 mb-2 text-sm sm:text-2xl tracking-tight text-slate-400">
          Please connect your device now, open the Kin app, and unlock it.
        </p>

        <h3 class="text-2xl font-medium leading-6 text-white mt-10">Derivation Path</h3>
        <select v-model="selectedPath" class="w-full mt-5 p-3 text-sm text-slate-400 bg-slate-800 rounded-lg">
          <option v-for="(path, index) in derivationPaths" :value="index">{{ path }}</option>
        </select> 

        <p class="mt-3 mb-2 text-sm sm:text-sm  text-slate-500">
          If you're unsure which derivation path to use, please contact the Kin Foundation.
        </p>

        <div class="mt-10">
          <button v-if="!address" class="swv-button" @click="onConnect()">Connect</button>
          <button v-else class="swv-button"  @click="onConnect()">{{ shortenAddress(address) }}</button>
        </div>

        <div class="mt-10 flex gap-4 justify-end">
          <Button variant="secondary" @click="onBack()">Go Back</Button>
          <Button v-if="address" variant="primary"  @click="onConfirm()">Continue</Button>
        </div>
      </div>
    </div>
  </Layout>
</template>

<style >
:root {
  --swv-button-background-color: #4f46e5;
  --swv-button-text-color: white;
  --swv-button-outline-color: #3730a3;
  --swv-button-hover-background-color: #4338ca;
  --swv-button-disabled-background-color: #475569;
  --swv-button-disabled-text-color: #94a3b8;
  --swv-overlay-background-color: rgba(200, 200, 200, .8);
  --swv-modal-background-color: white;
  --swv-modal-text-color: #1f2937;
  --swv-modal-close-button-background-color: #f3f4f6;
  --swv-modal-close-button-text-color: #9ca3af;
  --swv-modal-close-button-hover-text-color: #374151;
  --swv-modal-button-text-color: #1f2937;
  --swv-modal-wallet-status-text-color: #64748b;
  --swv-modal-button-hover-background-color: #f3f4f6;
  --swv-modal-button-outline-color: var(--swv-button-outline-color);
  --swv-dropdown-background-color: white;
  --swv-dropdown-item-hover-background-color: #f3f4f6;
  --swv-dropdown-text-color: #1f2937;
  --swm-modal-shadow: 0 25px 25px rgb(0 0 0 / .15);
  --swm-dropdown-shadow: 0px 10px 20px rgba(0, 0, 0, .3);
  --swv-button-radius: 6px;
  --swv-modal-radius: 10px;
  --swv-dropdown-radius: 10px;
  --swv-dropdown-item-radius: 6px;
}

.swv-button {
    background-color: var(--swv-button-background-color);
    border: none;
    color: var(--swv-button-text-color);
    cursor: pointer;
    display: flex;
    align-items: center;
    font-family: DM Sans,Roboto,Helvetica Neue,Helvetica,Arial,sans-serif;
    font-size: 16px;
    font-weight: 600;
    height: 48px;
    line-height: 48px;
    padding: 0 24px;
    border-radius: var(--swv-button-radius);
}
</style>
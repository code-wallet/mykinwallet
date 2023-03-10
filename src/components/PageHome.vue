<script setup lang="ts">
import { ref } from 'vue'
import Layout from './Layout.vue'
import Button from './Button.vue'
import DialogLedgerRequired from './DialogLedgerRequired.vue';

const showModal = ref(false);
function openModal() {
  showModal.value = true;
}
</script>

<template>
  <div>
    <Layout>
      <div class="grid h-screen place-items-center text-center mt-0 sm:mt-[-5rem]">
        <div class="max-w-2xl">
          <p class="mt-10 text-xl sm:text-2xl tracking-tight text-slate-400">
            The MyKinWallet tool enables you to sign a multi-sig transaction for
            an account that was created before the standard SPL derivation path
            was set.

            <br /><br />

            You don't need to use this tool unless you have an account that was
            created before the standard derivation path was set. If you are
            unsure, please contact the Kin Foundation.
          </p>

          <div class="mt-8 flex gap-4 justify-center ">
            <Button href="http://github.com" variant="secondary">View on GitHub</Button>
            <Button @click="openModal()">Get started</Button>
          </div>

        </div>
      </div>
    </Layout>

    <DialogLedgerRequired v-model="showModal" /> 
  </div>
</template>

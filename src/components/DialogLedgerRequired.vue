<script lang="ts">
import Button from './Button.vue'
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle, } from '@headlessui/vue'

export default {
  components: {
    Button,
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
  },

  props: {
    modelValue: Boolean
  },

  emits: ['update:modelValue'],

  methods: {
    closeModal() {
      this.$emit('update:modelValue', false);
    },
    confirm() {
      this.closeModal();
      this.$bus.emit('goto:connectledger');
    },
  }
}
</script>

<template>
    <TransitionRoot appear :show="modelValue" as="template">
        <Dialog as="div" @close="closeModal" class="relative z-10">
        <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
            leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
            <div class="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
            <div class="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                leave-to="opacity-0 scale-95">
                <DialogPanel
                class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div class="mt-8">
                    <p class="text-md text-lg text-gray-500 text-center">
                      You will need to connect your Ledger device to sign
                      transactions.
                      <br/><br/>
                      Please disconnect the device from any other browser tab
                      that might be using it before proceeding.
                    </p>
                </div>

                <div class="mt-10 flex gap-4 justify-center ">
                    <Button @click="confirm" variant="secondary">I Understand</Button>
                </div>
                </DialogPanel>
            </TransitionChild>
            </div>
        </div>
        </Dialog>
    </TransitionRoot>
</template>
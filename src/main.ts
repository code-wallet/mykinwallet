import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { EventEmitter } from './sdk/event/Emitter';

import { sha512 } from '@noble/hashes/sha512';
import * as ed from '@noble/ed25519';
ed.utils.sha512Sync = (...m) => sha512(ed.utils.concatBytes(...m));

const app = createApp(App);
const bus = new EventEmitter();

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $bus: EventEmitter;
  }
}

app.config.globalProperties.$bus = bus;
app.mount("#app");


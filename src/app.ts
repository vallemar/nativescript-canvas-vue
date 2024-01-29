import { createApp, registerElement } from 'nativescript-vue';
import Home from './components/Home.vue';
import { Utils } from '@nativescript/core';
registerElement("Canvas", () => require("@nativescript/canvas").Canvas)

declare const jp: any;

if (global.isAndroid) {
    jp.wasabeef.takt.Takt.stock(Utils.android.getApplicationContext()).seat(jp.wasabeef.takt.Seat.TOP_CENTER).color(-65536);
}

createApp(Home).start();

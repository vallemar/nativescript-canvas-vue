import { createApp, registerElement } from 'nativescript-vue';
import Home from './components/Home.vue';
import { Utils } from '@nativescript/core';

registerElement("Canvas", () => require("@nativescript/canvas").Canvas)
registerElement("Group", () => require("@nativescript/canvas/Dom").Group)
registerElement("Dom", () => require("@nativescript/canvas/Dom").Dom)
registerElement("Paint", () => require("@nativescript/canvas/Dom").Paint)
registerElement("Circle", () => require("@nativescript/canvas/Dom").Circle)
registerElement("Line", () => require("@nativescript/canvas/Dom").Line)
registerElement("Points", () => require("@nativescript/canvas/Dom").Points)
registerElement("Rect", () => require("@nativescript/canvas/Dom").Rect)
registerElement("RoundedRect", () => require("@nativescript/canvas/Dom").RoundedRect)
registerElement("ImageCanvas", () => require("@nativescript/canvas/Dom").Image)
registerElement("Text", () => require("@nativescript/canvas/Dom").Text)
registerElement("Shadow", () => require("@nativescript/canvas/Dom").Shadow)
registerElement("Path", () => require("@nativescript/canvas/Dom").Path)
registerElement("Fill", () => require("@nativescript/canvas/Dom").Fill)
registerElement("LinearGradient", () => require("@nativescript/canvas/Dom").LinearGradient)
registerElement("TwoPointConicalGradient", () => require("@nativescript/canvas/Dom").TwoPointConicalGradient)

declare const jp: any;

if (global.isAndroid) {

    //   jp.wasabeef.takt.Takt.stock(Utils.android.getApplicationContext()).seat(jp.wasabeef.takt.Seat.TOP_CENTER).color(android.graphics.Color.parseColor("#bd34fe"));
}


createApp(Home).start();

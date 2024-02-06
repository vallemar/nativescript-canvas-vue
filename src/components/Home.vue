<script lang="ts" setup>
import { computed, onMounted, ref } from 'nativescript-vue';
import { LinearGradient, type Canvas, CanvasRenderingContext2D } from '@nativescript/canvas';
import type { Dom } from '@nativescript/canvas/Dom';
import { EventData, ImageSource, Screen, StackLayout } from '@nativescript/core';
import { startListeningForSensor, stopListeningForSensor } from '@nativescript-community/sensors';
import { interpolate } from '~/utils';


const r1 = 100;
const r2 = 100;
const m1 = 10;
const m2 = 10;
const gForce = 1;
const vec = (x: number, y: number) => ({ x, y })
const height = Screen.mainScreen.heightDIPs
const width = Screen.mainScreen.widthDIPs
const cx = Screen.mainScreen.widthDIPs / 2;
console.log(cx);


const cy = Screen.mainScreen.heightDIPs / 2;
console.log(cy);
const sensor = ref({ x: 0, y: 0, z: 0 })
const a1Animated = ref(Math.PI / 2);
const a2Animated = ref(Math.PI / 2);
const a1_vAnimated = ref(0);
const a2_vAnimated = ref(0);
const x1Animated = ref(0);
const y1Animated = ref(0);
const x2Animated = ref(0);
const y2Animated = ref(0);



function onSensor(sensorData: any, sensorId: string) {
  //console.log(sensorData);

  sensor.value = global.isIOS ? sensorData.accelerometer.gravity : sensorData;
}

const gSensor = computed(() => {
  const isNotAvailable =
    sensor.value.x === 0 && sensor.value.y === 0 && sensor.value.z === 0;

  // if sensor is not available, we can use a default value (e.g. simulator)
  if (isNotAvailable) {
    return 9.8;
  }
  return sensor.value.y * -1;
})

const gAnimated = computed(() => {
  return interpolate(gSensor.value, [-10, 10], [-gForce, gForce])
});

startListeningForSensor(global.isIOS ? "motion" : "gravity", onSensor, 16);


const p0 = ref({ x: cx, y: cy });
const p1 = computed(() => ({ x: x1Animated.value, y: y1Animated.value }));
const p2 = computed(() => ({ x: x2Animated.value, y: y2Animated.value }));
const points = ref<{ x: number; y: number }[]>([]);
const frameRate = 30;
const fps = 1000 / frameRate;
const time = ref(0);
const pathRef = ref()
let path: any = null
function loadedPath(args: EventData) {
  console.log("loadedPath");
  path = args.object
  // (args.object as Dom).onFrameCallback = frameCallback;
}

function buildPath() {
  const first = points.value[0];
  if (!first || !pathRef?.value?.nativeView?._canvas) {
    return;
  }
  try {
    if (path) {
      // const context: CanvasRenderingContext2D = pathRef?.value?.nativeView._canvas.getContext('2d')
      // const path = pathRef?.value?.nativeView._path;
      path.moveTo(first.x, first.y);

      points.value.forEach(({ x, y }) => {
        path.lineTo(x, y);
      });
    }


  } catch (error) {
    console.log(error);
  }
};

function frameCallback(nowDate) {

  const frameInfo: any = { timestamp: nowDate }


  const g = gAnimated.value;

  let a1 = a1Animated.value;
  let a2 = a2Animated.value;
  let a1_v = a1_vAnimated.value;
  let a2_v = a2_vAnimated.value;

  let num1 = -g * (2 * m1 + m2) * Math.sin(a1);
  let num2 = -m2 * g * Math.sin(a1 - 2 * a2);
  let num3 = -2 * Math.sin(a1 - a2) * m2;
  let num4 = a2_v * a2_v * r2 + a1_v * a1_v * r1 * Math.cos(a1 - a2);
  let den = r1 * (2 * m1 + m2 - m2 * Math.cos(2 * a1 - 2 * a2));
  const a1_a = (num1 + num2 + num3 * num4) / den;

  num1 = 2 * Math.sin(a1 - a2);
  num2 = a1_v * a1_v * r1 * (m1 + m2);
  num3 = g * (m1 + m2) * Math.cos(a1);
  num4 = a2_v * a2_v * r2 * m2 * Math.cos(a1 - a2);
  den = r2 * (2 * m1 + m2 - m2 * Math.cos(2 * a1 - 2 * a2));
  const a2_a = (num1 * (num2 + num3 + num4)) / den;

  const x1 = r1 * Math.sin(a1);
  const y1 = r1 * Math.cos(a1);

  const x2 = x1 + r2 * Math.sin(a2);
  const y2 = y1 + r2 * Math.cos(a2);

  a1_v += a1_a;
  a2_v += a2_a;
  a1 += a1_v;
  a2 += a2_v;

  a1_v *= 0.998;
  a2_v *= 0.998;

  const now = frameInfo.timestamp - time.value;
  if (now > fps) {
    time.value = frameInfo.timestamp;

    const nextPoints = { x: x2 + cx, y: y2 + cy };
    points.value = [...points.value, nextPoints];

    //   points.value = points.value.filter((_, i) => i < 500);
    points.value = points.value.slice(-100);
  }

  a1Animated.value = a1;
  a2Animated.value = a2;
  a1_vAnimated.value = a1_v;
  a2_vAnimated.value = a2_v;

  x1Animated.value = x1 + cx;
  y1Animated.value = y1 + cy;
  x2Animated.value = x2 + cx;
  y2Animated.value = y2 + cy;
  buildPath()
}







</script>

<template>
  <Frame>
    <Page actionBarHidden="true" androidStatusBarBackground="#0a0a0a">
      <StackLayout rows="*" columns="*" iosOverflowSafeArea="false" width="100%" height="100%">
        <!--         <Label :text="p1.x"></Label>
        <Label :text="p1.y"></Label>
        <Label :text="p2.x"></Label>
        <Label :text="p2.y"></Label>
        <Label :text="x1Animated"></Label>
        <Label :text="y1Animated"></Label>
        <Label :text="m1"></Label>
        <Label :text="x2Animated"></Label>
        <Label :text="y2Animated"></Label> -->

        <!--  <Label :text="m2"></Label> -->
        <Dom height="100%" width="100%" background="white" @loaded="$event.object.onFrameCallback = frameCallback">
          <Group>
            <Path @loaded="loadedPath" ref="pathRef" paintStyle="stroke" strokeWidth="0.6" color="#bd34fe">
              <!--   <LinearGradient :start="vec(cx, cy)" :end="vec(cx + 1, cy + 1)" :colors="['#bd34fe', '#65adf1']" /> -->
            </Path>
          </Group>

          <Line :p1="p1" :p2="p2" strokeWidth="2" paintStyle="stroke" />
          <Line :p1="p0" :p2="p1" strokeWidth="2" paintStyle="stroke" />
          <Circle :cx="x1Animated" :cy="y1Animated" :r="m1 * 1.5" />
          <Circle :cx="x2Animated" :cy="y2Animated" :r="m2" />
        </Dom>
      </StackLayout>
    </Page>
  </Frame>
</template>

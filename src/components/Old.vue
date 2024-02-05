<script lang="ts" setup>
import { onMounted, ref } from 'nativescript-vue';
import type { Canvas } from '@nativescript/canvas';
import { ImageSource, StackLayout } from '@nativescript/core';

const r = ref(60);
const points = [
    { x: 128, y: 0 },
    { x: 168, y: 80 },
    { x: 256, y: 93 },
    { x: 192, y: 155 },
    { x: 207, y: 244 },
    { x: 128, y: 202 },
    { x: 49, y: 244 },
    { x: 64, y: 155 },
    { x: 0, y: 93 },
    { x: 88, y: 80 },
    { x: 128, y: 0 },
];

const image = ImageSource.fromFileSync("~/assets/NativeScript_Logo.png");
const pointP2 = ref({ x: 256, y: 256 })
onMounted(() => {
    setInterval(() => {
        // pointP2.value = { x: pointP2.value.x - 10, y: 256 };
    }, 500)
})

</script>

<template>
    <Frame>
        <Page actionBarHidden="true" androidStatusBarBackground="#0a0a0a">
            <StackLayout rows="*" columns="*" iosOverflowSafeArea="false" width="100%" height="100%" class="pt-12">

                <Dom :height="400" horizontalAlignment="center">

                    <!--  <Dom class="m-4"> -->
                    <!--           <Line cx="128" cy="128" r="128" color="lightblue" />
 -->
                    <!--     <Circle :cx="r" :cy="r" :r="r" color="lightblue" /> -->
                    <!--           <Line p1="128" p2="280" color="lightblue" paintStyle="stroke" strokeWidth="10" />
 -->
                    <!--             <Points :points="points" mode="polygon" color="lightblue" paintStyle="stroke" :strokeWidth="4" />
 -->
                    <!--           <Rect x="25" y="25" width="256" height="256" color="lightblue" />
 -->
                    <!--           <RoundedRect x="25" y="25" width="256" height="256" r="25" color="lightblue" />
 -->

                    <!--           <ImageCanvas :image="image" fit="contain" x="150" y="0" width="256" height="256" />
 -->
                    <!--           <Text x="25" y="60" text="Hello World" font="bold 32px serif" />
 -->
                    <!--  <RoundedRect x="32" y="32" width="192" height="192" r="32" color="lightblue">
            <Shadow dx="12" dy="12" blur="25" color="#93b8c4" />
            <Shadow dx="-12" dy="-12" blur="25" color="#c7f8ff" />
          </RoundedRect> -->

                    <!--      <Path path="M 128 0 L 168 80 L 256 93 L 192 155 L 207 244 L 128 202 L 49 244 L 64 155 L 0 93 L 88 80 L 128 0 Z"
            color="lightblue" /> -->


                    <!--     <Circle :cx="r / 2" :cy="r / 2" :r="r / 2" color="yellow" /> -->


                    <!--  <Group :origin="{ x: 60, y: 60 }">
            <Line :p1="{ x: 0, y: 0 }" :p2="pointP2" color="lightblue" paintStyle="stroke" strokeWidth="1" />

          </Group> -->

                    <!-- <Rect x="0" y="0" width="256" height="256">
            <TwoPointConicalGradient :start="{ x: 0, y: 0 }" startR="128" :end="{ x: 256, y: 256 }" endR="16"
              :colors="['#bd34fe', '#65adf1']" />
          </Rect> -->
                    <!--  <Circle :cx="r" :cy="r" :r="r" color="#65adf1" />
          <Group color="lightblue" paintStyle="stroke" strokeWidth="10">
            <Circle :cx="r" :cy="r" :r="5" />
            <Circle :cx="r" :cy="r" :r="r / 2" />
            <Circle :cx="r" :cy="r" :r="r / 3" color="white" />
          </Group>

          <Group :origin="{ x: 80, y: 80 }" color="#bd34fe" paintStyle="stroke" strokeWidth="4">
            <Circle :cx="r" :cy="r" :r="5" />
            <Circle :cx="r" :cy="r" :r="r / 3" />
          </Group> -->

                    <!--   <Group>
            <Fill color="lightblue" />

            <RoundedRect x="32" y="32" width="192" height="192" r="32" color="lightblue">
              <Shadow dx="12" dy="12" blur="25" color="#93b8c4" inner />
              <Shadow dx="-12" dy="-12" blur="25" color="#c7f8ff" inner />
            </RoundedRect>
          </Group> -->

                </Dom>
            </StackLayout>
        </Page>
    </Frame>
</template>

<style>
/* .info {
    font-size: 20;
  } */
</style>

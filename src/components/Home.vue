<script lang="ts" setup>
import {
  ref,
  computed,
  onMounted,
  onUnmounted,
  $navigateTo,
} from 'nativescript-vue';
import Details from './Details.vue';
import type { Canvas, CanvasRenderingContext2D } from '@nativescript/canvas';

function onCanvasReady(event: any) {
  const canvas = event.object as Canvas;
  initWebGL(canvas);
}
function initWebGL(c: Canvas) {

  var w = c.getActualSize().width,
    h = c.getActualSize().height,
    ctx = c.getContext('2d') as CanvasRenderingContext2D,

    spawnProb = 1,
    numberOfMoves = [8, 16], //[min, max]
    distance = [50, 400],
    attenuator = 30,
    timeBetweenMoves = [4, 10],

    lines = [] as any[],
    frame = (Math.random() * 360) | 0;

  ctx.lineWidth = 1;

  function rand(ar: any) {
    return Math.random() * (ar[1] - ar[0]) + ar[0];
  }
  function Line() {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.last = {};
    this.target = {};
    this.totalMoves = rand(numberOfMoves);
    this.move = 0;
    this.timeBetweenMoves = rand(timeBetweenMoves);
    this.timeSpentThisMove = this.timeBetweenMoves;
    this.distance = rand(distance);

    this.color = 'hsl(hue, 80%, 50%)'.replace('hue', (frame % 360).toString());
  }
  Line.prototype.use = function () {
    ++this.timeSpentThisMove;
    if (this.timeSpentThisMove >= this.timeBetweenMoves) {
      ++this.move;
      this.timeSpentThisMove = 0;

      var rad = Math.random() * 2 * Math.PI;
      this.target.x = this.x + Math.cos(rad) * this.distance;
      this.target.y = this.y + Math.sin(rad) * this.distance;
    }

    this.last.x = this.x;
    this.last.y = this.y;

    this.x += (this.x - this.target.x) / attenuator;
    this.y += (this.y - this.target.y) / attenuator;

    ctx.strokeStyle = ctx.shadowColor = this.color;
    ctx.beginPath();
    ctx.moveTo(this.last.x, this.last.y);
    ctx.lineTo(this.x, this.y);
    ctx.stroke();
  }

  function anim() {
    requestAnimationFrame(anim);

    frame += 1.5;

    ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(0, 0, 0, .04)';
    ctx.fillRect(0, 0, w, h);
    ctx.shadowBlur = 10;

    if (Math.random() < spawnProb) lines.push(new Line());

    for (var i = 0; i < lines.length; ++i) {
      lines[i].use();

      if (lines[i].move >= lines[i].totalMoves) {
        lines.splice(i, 1);
        --i;
      }
    }
  }



  anim();

}
</script>

<template>
  <Frame>
    <Page>


      <GridLayout>
        <Canvas height="100%" @ready="onCanvasReady($event)"></Canvas>
      </GridLayout>
    </Page>
  </Frame>
</template>

<style>
/* .info {
    font-size: 20;
  } */
</style>

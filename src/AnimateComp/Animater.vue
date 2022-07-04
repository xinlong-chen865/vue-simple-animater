<template>
   <slot></slot>
</template>

<script>
import { nextTick, onMounted, provide, ref, watch } from 'vue'
import { throttle } from 'lodash'
export default {
   props: {
      data: {
         type: Array,
         default: () => ([])
      },
      duration: {
         type: Number,
         default: 400,
      },
      animateOptions: {
         type: Object,
         default: () => ({})
      }
   },
   setup(props) {
      const prevNodeList = ref(new Map());
      const uniqueIdRef = ref(0);

      const provideRef = {
         add(animatedItem) {
            prevNodeList.value.set(animatedItem.animateId, animatedItem);
         },
         remove(animatedId) {
            prevNodeList.value.delete(animatedId);
         },
         update(animatedId, animatedItem) {
            prevNodeList.value.set(animatedId, animatedItem)
         },
         nextId() {
            return (uniqueIdRef.value += 1);
         },
      }
      provide('provideRef', provideRef);

      watch(() => props.data, () => {
         nextTick(() => {
            const { innerWidth, innerHeight } = window;
            const currentNodeList = new Map();
            prevNodeList.value.forEach((node) => {
               currentNodeList.set(node.animateId, node.node.getBoundingClientRect());
            });

            prevNodeList.value.forEach(({ animateId, node, rect }) => {
               const currentRect = currentNodeList.get(animateId);

               if (!currentRect && !rect) {
                  return;
               }

               const invert = {
                  left: rect.left - currentRect.left,
                  top: rect.top - currentRect.top,
               }

               const isPrevOutsideVisibleArea = 
                  rect.right < 0 ||
                  rect.left > innerWidth || 
                  rect.bottom < 0 || 
                  rect.top > innerHeight 
               const isCurrentOutsideVisibleArea = 
                  currentRect.right < 0 ||
                  currentRect.left > innerWidth || 
                  currentRect.bottom < 0 || 
                  currentRect.top > innerHeight 

               if (isPrevOutsideVisibleArea && isCurrentOutsideVisibleArea) {
                  return;
               }

               if (invert.left === 0 && invert.right === 0 ) {
                  return;
               }
               node.animate(
                  [
                     {
                        transform: `translate(${invert.left}px, ${invert.top}px)`,
                     },
                     { transform: "translate(0, 0)" },
                  ],
                  {
                     duration: props.duration,
                     easing: "cubic-bezier(0.25, 0.8, 0.25, 1)",
                     ...props.animateOptions,
                  }
               );
               // 轮回更替
               prevNodeList.value.get(animateId).rect = currentRect
            })
         })
      });

      onMounted(() => {
         window.onresize = throttle(() => {
            prevNodeList.value.forEach((node, key) => {
               prevNodeList.value.get(key).rect = node.node.getBoundingClientRect();
            });
         }, 500);
      });

      return {
         prevNodeList,
         uniqueIdRef,
      }
   },
}
</script>

<style scoped>

</style>

<template>
   <div ref="currentRef">
      <slot></slot>
   </div>
</template>

<script>
import { inject, onMounted, ref } from 'vue'

export default {
   setup() {
      const currentRef = ref(null);
      const ctx = inject('provideRef');
      const animateId = ctx.nextId();

      onMounted(() => {
         if (ctx) {
            ctx.add({ animateId, node: currentRef.value, rect: currentRef.value.getBoundingClientRect() });
         }
      });

      return {
         currentRef,
      }
   },
}
</script>

<style scoped>

</style>

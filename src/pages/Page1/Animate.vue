<template>
    <div>
        <button @click="handleShuffle">乱序</button>
        <button @click="handleRecover">重置</button>
        <div class="SquareBox" ref="listRef">
            <AnimateItem v-for="(num) in initData" :num="num" :key="num"></AnimateItem>
        </div>
    </div>
</template>

<script>
import { nextTick, ref, watch } from 'vue';
import { shuffle } from 'lodash';
import AnimateItem from '../../components/Amimate-item.vue';
import { createChildElementRectMap } from './utils';
export default {
    components: {
        AnimateItem,
    },
    setup() {
        const initConfig = [1,2,3,4,5,6,7,8,9,10];
        const initData = ref(initConfig);
        const listRef = ref(null);
        const prevNodeList = ref(new Map());
        const handleShuffle = () => {
            initData.value = shuffle(initData.value);
            prevNodeList.value = createChildElementRectMap(listRef.value)
        }
        const handleRecover = () => {
            initData.value = initConfig;
            prevNodeList.value = createChildElementRectMap(listRef.value)
        }
        watch(initData, () => {
            nextTick(() => {
                const currentNodeList = createChildElementRectMap(listRef.value);
                prevNodeList.value.forEach((prevRect, node) => {
                    const currentRect = currentNodeList.get(node);

                    const invert = {
                        left: prevRect.left - currentRect.left,
                        top: prevRect.top - currentRect.top,
                    };

                    const keyframes = [
                        {
                        transform: `translate(${invert.left}px, ${invert.top}px)`,
                        },
                        { transform: "translate(0, 0)" },
                    ];

                    node.animate(keyframes, {
                        duration: 1000,
                        easing: "cubic-bezier(0.25, 0.8, 0.25, 1)",
                    });
                });
            });
            
        })
        return {
            initData,
            listRef,
            prevNodeList,
            handleShuffle,
            handleRecover,
        }
    },
}
</script>

<style scoped>
.SquareBox {
    display: flex;
    flex-wrap: wrap;
}
</style>

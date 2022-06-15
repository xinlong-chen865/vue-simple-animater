<template>
   <div>
        <button @click="handleShuffle">乱序</button>
        <button @click="handleRecover">重置</button>
        <Animater :data="initData">
            <div class="SquareBox" ref="listRef">
                <Animated v-for="(num) in initData" :key="num">
                    <AnimateItem :num="num">{{ num }}</AnimateItem>
                </Animated>
            </div>
        </Animater>
   </div>
</template>

<script>
import { reactive, toRefs } from 'vue';
import Animater from '../../AnimateComp/Animater.vue';
import Animated from '../../AnimateComp/Animated.vue';
import AnimateItem from '../../components/Amimate-item.vue';
import { shuffle } from 'lodash';
export default {
    components: {
        Animater,
        Animated,
        AnimateItem,
    },
    setup() {
        const initConfig = [1,2,3,4,5,6,7,8,9,10]
        const state = reactive({
            initData: initConfig,
        });
        const handleShuffle = () => {
            state.initData = shuffle(state.initData);
        };
        const handleRecover = () => {
            state.initData = [2,1,3,4,5,6,7,8,9,10];
        }
        return {
            ...toRefs(state),
            handleShuffle,
            handleRecover
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

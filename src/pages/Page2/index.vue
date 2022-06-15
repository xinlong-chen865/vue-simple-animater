<template>
   <div>
        <button @click="handleShuffle">乱序</button>
        <button @click="handleRecover">重置</button>
        <button @click="handleAdd">新增</button>
        <Animater :data="initData" :duration="1000">
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
import { shuffle, range } from 'lodash';
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
            state.initData = initConfig;
        }
        const handleAdd = () => {
            state.initData = range(state.initData.length, state.initData.length + 10).concat(state.initData)
        }
        return {
            ...toRefs(state),
            handleShuffle,
            handleRecover,
            handleAdd,
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

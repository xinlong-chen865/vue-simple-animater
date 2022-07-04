<template>
   <div>
        <button @click="handleShuffle">乱序</button>
        <button @click="handleRecover">重置</button>
        <button @click="handleAdd">新增</button>
        <Animater :data="initData" :duration="1000">
            <div class="SquareBox" ref="listRef">
                <Animated v-for="(num) in initData" :key="num">
                    <div class="row">{{ num }}</div>
                </Animated>
            </div>
        </Animater>
   </div>
</template>

<script>
import { reactive, toRefs } from 'vue';
import Animater from '../../AnimateComp/Animater.vue';
import Animated from '../../AnimateComp/Animated.vue';
import { shuffle, cloneDeep, range } from 'lodash';
export default {
    components: {
        Animater,
        Animated,
    },
    setup() {
        const initConfig = [1,2,3,4,5,6,7,8,9,10]
        const state = reactive({
            initData: cloneDeep(initConfig),
        });
        const handleShuffle = () => {
            state.initData = shuffle(state.initData);
        };
        const handleRecover = () => {
            state.initData = cloneDeep(initConfig);
        }
        const handleAdd = () => {
            state.initData = range(state.initData.length, state.initData.length + 1).concat(state.initData)
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
.row {
    width: 100%;
    height: 80px;
    border: 1px solid #eee;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>

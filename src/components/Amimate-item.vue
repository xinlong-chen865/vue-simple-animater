<template>
   <div class="SquareItem">
       {{ num }}
   </div>
</template>

<script>
export default {
    props: {
        num: {
            type: Number
        }
    },
    setup() {
        
    },
}
</script>

<style scoped>
.SquareItem {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    border: 1px solid #eee;
}
</style>

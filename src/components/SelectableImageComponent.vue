<script>
export default {
    props: ['src', 'modelValue'],
    emits: ['update:modelValue'],
    data() {
        return {
            border: 'none'
        }
    },
    methods: {
        handleClick() {
            this.border = this.border == 'none' ? '4px red solid' : 'none'
        }
    },
    watch: {
        border(newVal) {
            if (newVal != 'none') {
                this.$emit('update:modelValue', true)
            } else {
                this.$emit('update:modelValue', false)
            }
        }
    }
}
</script>

<template>
    <img :src="src" :style="`border: ${border};`" @click="handleClick">
</template>

<style></style>
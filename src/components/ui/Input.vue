<template>
    <input type="text" class="form-control" :value="modelValue" @input="updateModel">
</template>

<script>
export default {
    name: "Input",
    props: {
        modelValue: [String,Number]
    },
    methods: {
        updateModel(e) {
            this.$emit('update:modelValue', e.target.value)
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
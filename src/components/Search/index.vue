<template lang="html">
  <Input type="text" class="search-input" placeholder="Kinolarni qidirish" :value="modelValue" @input="updateModel" />
</template>
<script lang="js">
export default {
  props: {
    modelValue: String
  },
  methods: {
    updateModel(e) {
      this.$emit('update:modelValue', e.target.value)
    }
  }
}
</script>
<style lang="scss" scoped>
.search-input {
  margin-top: 2rem;
  margin-bottom: 1rem;
  padding: 1.5rem;
  background-color: #fcfaf5;
  border-radius: 4px;
  box-shadow: 15px 15px 15px rgba(0, 0, 0, 0.15);
}
</style>

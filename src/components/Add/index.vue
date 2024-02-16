<template>
  <div class="add">
    <h3>Yangi kino qoshish</h3>
    <Box @submit.prevent>
      <form class="add-form d-flex">
        <Input type="text" class="add-movie" placeholder="Qanday kino?" v-model="name" />
        <Input type="number" class="add-movie" placeholder="Necha marotaba korilgan?" v-model="viewers" />
        <Button type="submit" class="btn-outline-dark" @click="addMovie">Qoshish</Button>
      </form>
    </Box>
  </div>
</template>

<script lang="js">
export default {
  data() {
    return {
      name: "",
      viewers: "",
    }
  },
  methods: {
    async addMovie() {
      const newMovie = {
        name: this.name,
        viewers: this.viewers,
        isFavourite: false,
        isCookiesEnabled: false,
        isTrash: false,
        id: Date.now()
      }
      this.$emit('createMovie', newMovie)
      this.name = ""
      this.viewers = ""
    },
  }
}
</script>

<style lang="scss" scoped>
.add-form {
  gap: 15px;
}
</style>

<template>
<Box class="list list-group">
    <Item v-for="movie in   movies" :movie="movie" :key="movie.id" :class="[{ none: !movies.length }]" :fetchData="fetchData" />
    <h1 class="text-danger fs-4 text-center" :class="[{ block: !movies.length }, { none: movies.length }]">Kechirasiz
        Hozir Hech Qanday Kinolar Yo`q</h1>
</Box>
</template>

<script>
import Item from "./item.vue";
export default {
    components: {
        Item,
    },
    props: {
        movies: {
            type: Array,
            required: true
        },
        fetchData: {
            type: Function,
            required: true
        }
    },
};
</script>

<style lang="scss" scoped>
.list {
    margin-bottom: 1rem;
}

h1 {
    font-size: 15px;
}

h2.fs-1 {
    margin-top: 30px;
    align-items: center;
}

.none {
    display: none;
}
</style>

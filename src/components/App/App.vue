<template>
<div class="app">
    <div class="content">
        <Info :allMoviesCount="allMoviesCount" :favouriteMoviesCount="movies.filter((movie) => movie.isFavourite).length" />
        <Box>
            <Search v-model="term" />
            <Filter :onFilterChange="onFilterChange" :filter="filter" />
        </Box>

        <Box v-if="!movies.length && !isLoading">
            <h1 class="text-danger text-center fs-3">Hech Qanday Kinolar Yo`q</h1>
        </Box>
        <Box v-else-if="isLoading">
            <h1 class="text-danger text-center fs-2">Loading
                <Spinner />
            </h1>
        </Box>
        <List v-else :movies="onTabChange(onFilter(movies, term), filter)" :fetchData="fetchData" />
        <Box class="d-flex justify-content-center">
            <nav aria-label="pagination">
                <ul class="pagination pagination-lg">
                    <li v-for="pageNumber in totalPages" class="page-item" @click="changePage(pageNumber)" :key="pageNumber" :class="{ active: pageNumber === page }">
                        <a class="page-link">{{ pageNumber }}</a>
                    </li>
                </ul>
            </nav>
        </Box>
        <Add @createMovie="createMovie" />
    </div>
</div>
</template>

<script lang="js">
import Info from "@/components/Info/index.vue"
import Search from "@/components/Search/index.vue"
import Filter from "@/components/Filter/index.vue"
import List from "@/components/List/index.vue"
import Add from "@/components/Add/index.vue"
import axios from "axios"
export default {
    data() {
        return {
            movies: [],
            term: '',
            filter: 'all',
            isLoading: true,
            limit: 5,
            page: 1,
            totalPages: 0,
            allMoviesCount: 0
        }
    },
    methods: {
        onFilter(arr, term) {
            if (arr.length === 0) {
                return arr
            }
            return arr.filter(item => item.name.toLowerCase().indexOf(term) > -1)
        },
        onSearch(term) {
            this.term = term
        },
        onTabChange(arr, term) {
            switch (term) {
                case 'all':
                    return arr
                case 'popular':
                    return arr.filter(item => item.isFavourite)
                case 'mostViewers':
                    return arr.filter(item => item.viewers >= 500)
                default:
                    return arr
            }
        },
        onFilterChange(value) {
            this.filter = value
        },
        changePage(pageNumber) {
            this.page = pageNumber
        },
        async fetchData(keyWord) {
            if (keyWord === 'withLoading') {
                try {
                    if (this.isLoading) {
                        const response = (await axios.get('https://my-json-server.typicode.com/shoha-coder-jsons/movies-vue/movies', {
                            params: {
                                _limit: this.limit,
                                _page: this.page
                            }
                        }))
                        this.movies = response.data
                        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
                    }
                } catch (err) {
                    console.error(err)
                } finally {
                    this.isLoading = false
                }
            } else if (keyWord === 'now') {
                const response = (await axios.get('https://my-json-server.typicode.com/shoha-coder-jsons/movies-vue/movies', {
                    params: {
                        _limit: this.limit,
                        _page: this.page
                    }
                }))
                this.movies = response.data
                this.allMoviesCount = response.headers['x-total-count']
                this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
                this.isLoading = false
            }
        },
        async createMovie(item) {
            if (item.name | item.viewers !== '') {
                await axios.post('https://my-json-server.typicode.com/shoha-coder-jsons/movies-vue/movies', item)
                this.movies.push(item)
            } else {
                alert("Barcha Hususiyatlarni Toldiring")
            }
        },
    },
    components: {
        Info,
        Search,
        Filter,
        List,
        Add,
    },
    async mounted() {
        await this.fetchData('now')
    },
    async updated() {
        await this.fetchData('withLoading')
    },
    watch: {
        page() {
            this.isLoading = true
            this.fetchData('now')
        },
    }
}
</script>

<style lang="scss">
.app {
    height: 100vh;
    color: #000;

    .content {
        width: 1000px;
        min-height: 700px;
        background-color: #fff;

        margin: 0 auto;
        padding: 5rem 0;
    }
}
</style>

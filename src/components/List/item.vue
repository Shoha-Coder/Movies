<template>
    <li class="list-group-item d-flex justify-content-between"
        :class="[{ like: movie.isFavourite }, { cookie: movie.isCookiesEnabled }, { 'd-none': movie.isTrash }]">
        <span class="list-group-item-label" @click="onToggle('favourite', movie.id)">{{ movie.name }}</span>
        <p :class="[{ cookie: movie.isCookiesEnabled }]">{{ movie.viewers }}</p>
        <div class="d-flex justify-content-center align-items-center">
            <Button type="button" class="btn-cookie btn-sm" @click="onToggle('cookie', movie.id)">
                <i class="fas fa-cookie"></i>
            </Button>
            <Button type="button" class="btn-trash btn-sm" @click="onToggle('trash', movie.id)">
                <i class="fas fa-trash"></i>
            </Button>
            <i class="fas fa-star"></i>
        </div>
    </li>
</template>

<script lang="js">
import axios from "axios"
export default {
    props: {
        movie: {
            type: Object,
            required: true,
        },
        fetchData: {
            type: Function,
            required: true
        }
    },
    methods: {
        async onToggle(method, id) {
            const changeMovie = async (isFavourite, isCookiesEnabled) => {
                await axios.put(`https://my-json-server.typicode.com/shoha-coder-jsons/movies-vue/movies${id}`, {
                    id: this.movie.id,
                    name: this.movie.name,
                    viewers: this.movie.viewers,
                    isFavourite: isFavourite,
                    isCookiesEnabled: isCookiesEnabled,
                    isTrash: this.movie.isTrash,
                })
            }
            if (method === 'favourite') {
                this.movie.isFavourite = !this.movie.isFavourite
                changeMovie(!this.movie.isFavourite, this.movie.isCookiesEnabled)
            } else if (method === 'cookie') {
                this.movie.isCookiesEnabled = !this.movie.isCookiesEnabled
                changeMovie(this.movie.isFavourite, !this.movie.isCookiesEnabled)
            } else if (method === 'trash') {
                this.movie.isTrash = !this.movie.isTrash
                const id = this.movie.id
                await axios.delete(`https://my-json-server.typicode.com/shoha-coder-jsons/movies-vue/movies${id}`)
            }
        }
    },
};
</script>

<style lang="scss" scoped>
.list-group-item {
    padding: 15px 20px;
    border: none;
    border-bottom: 1px solid #3d5a80;
    background-color: transparent;

    span {
        line-height: 35px;
        font-size: 20px;
        cursor: pointer;
        width: 550px;
    }

    // input {
    //   line-height: 35px;
    //   font-size: 20px;
    //   text-align: center;
    //   border: none;
    //   outline: none;
    //   width: 150px;
    // }
    .cookie {
        color: #e09f3e;
    }

    button {
        width: 35px;
        height: 35px;
        margin: 3px;
        font-size: 17px;
        border: none;
        cursor: pointer;

        &.btn {
            background-color: #f0f0f0;

            &-cookie {
                color: #e09f3e;
            }

            &-trash {
                color: #e5383b;
            }
        }
    }

    p {
        font-size: 20px;
        text-align: center;
    }

    .fa-star {
        width: 35px;
        height: 35px;
        text-align: center;
        line-height: 35px;
        font-size: 16px;
        color: #ffd700;
        transition: 0.3s all;
        transform: translate(30px);
        opacity: 0;
    }

    &.like {
        .fa-star {
            opacity: 1;
            transform: translate(0);
            transition: 0.3s all;
        }
    }

    &.cookie {
        span {
            color: #e09f3e;
        }

        input {
            color: #e09f3e;
        }
    }

    &:last-child {
        border-bottom: none;
    }
}
</style>

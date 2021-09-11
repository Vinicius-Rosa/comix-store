import { http } from './config'

export default {
    getComics: () => {
        return http.get('/v1/public/comics')
    },

    getHeroComics: (id) => {
        return http.get(`/v1/public/characters/${id}/comics`)
    },

    findComic: id => {
        return http.get(`/v1/public/comics/${id}`);
    },
}
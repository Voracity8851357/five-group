const baseUrl = "http://localhost:8081";
import parseParams from "./utils/parseParams";

export default {
    namespaced: true,
    state: {
        curpage: 1,
        eachpage: 10,
        maxpage: 0,
        total: 0,
        rows: [],
    },
    mutations: {
        addGoods(state, data) {
            Object.assign(state, data)
        },
    },
    actions: {
        async addGoods(context, data) {
            const {page, rows} = context.rootState.goodsManagement;
            const tempData = await fetch(baseUrl + "/goodsManagement/addGoods", {
                method: "post",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    data,
                    page,
                    rows,
                }),
            }).then(res => res.json());
            context.commit("addGoods", tempData);
        },
        async getGoods({commit}, options) {
            const {page = 1, rows = 10} = options || {};
            const params = parseParams({page, rows});
            const tempData = await fetch(baseUrl + "/goodsManagement" + params).then(res => res.json());
            commit("addGoods", tempData);
        }
    }
}
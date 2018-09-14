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
        setCurrentPage(state, currentPage) {
            state.curpage = currentPage;
        },
        setPageSize(state, pageSize) {
            state.eachpage = pageSize;
        }
    },
    actions: {
        async addGoods({commit, state}, data) {
            const {curpage, eachpage} = state;
            const tempData = await fetch("/goodsManagement/addGoods", {
                method: "post",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    data,
                    page: curpage,
                    rows: eachpage,
                }),
            }).then(res => res.json());
            commit("addGoods", tempData);
        },
        async getGoodsAsync({commit, state}, callback) {
            const {curpage, eachpage} = state;
            const tempData = await fetch(`/goodsManagement?page=${curpage}&rows=${eachpage}`).then(res => res.json());
            commit("addGoods", tempData);
            if (callback)
                callback();
        },
        async updateGoodsAsync({commit, state}, data) {
            const {curpage, eachpage} = state;
            const tempData = await fetch(`/goodsManagement/editGoods`, {
                method: "put",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    data,
                    page: curpage,
                    rows: eachpage,
                }),
            })
                .then(res => res.json());
        }
    }
}
import {Message} from 'element-ui';

export default {
    namespaced: true,
    state: {
        curpage: 1,
        eachpage: 10,
        maxpage: 0,
        total: 0,
        rows: [],
        uid: "",
        searchText: "",
        isRefresh: true,
    },
    mutations: {
        addGoods(state, data) {
            Object.assign(state, data);
        },
        setCurrentPage(state, currentPage) {
            state.curpage = currentPage;
        },
        setPageSize(state, pageSize) {
            state.eachpage = pageSize;
        },
        setSearchText(state, text) {
            state.searchText = text;
        },
        refreshStart(state) {
            state.isRefresh = true;
        },
        refreshEnd(state) {
            state.isRefresh = false;
        }
    },
    actions: {
        async addGoods({commit, state}, data) {
            commit("refreshStart");
            const {curpage, eachpage, uid} = state;
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
            Message.success({message: "新增成功", showClose: true});
            commit("addGoods", tempData);
            commit("refreshEnd");
        },
        async getGoodsAsync({commit, state, rootState}) {
            commit("refreshStart");
            const uid = rootState.app._id || "5b98b13a2e5e7559506c0d95";
            let {curpage, eachpage, searchText} = state;
            const tempData = await fetch(`/goodsManagement?uid=${uid}&page=${curpage}&rows=${eachpage}&goodsName=${searchText}`).then(res => res.json());
            commit("addGoods", tempData);
            commit("refreshEnd");
        },
        async updateGoodsAsync({commit, state}, data) {
            commit("refreshStart");
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
            Message.success({message: "修改成功", showClose: true});
            commit("addGoods", tempData);
            commit("refreshEnd");
        },
        async deleteGoodsAsync({commit, state}, id) {
            commit("refreshStart");
            const {curpage, eachpage} = state;
            const tempData = await fetch(`/goodsManagement/deleteGoods`, {
                method: "delete",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    id,
                    page: curpage,
                    rows: eachpage,
                }),
            })
                .then(res => res.json());
            Message.success({message: "删除成功", showClose: true});
            commit("addGoods", tempData);
            commit("refreshEnd");
        }
    }
}
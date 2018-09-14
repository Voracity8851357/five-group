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
        getServiceByPage(state, payload) {
            Object.assign(state, payload)
        },
        addService(state, payload) {
            Object.assign(state, payload)
        },
        deleteService(state, payload) {
            Object.assign(state, payload)
        },
        editService(state, payload) {
            Object.assign(state, payload)
        }
    },
    actions: {
        //搜索和展示列表
        async asyncgetServiceByPage(context, { curpage = 1, eachpage = 10, searchType = '', searchText = '' } = {}) {
            let url = '';
            if (searchType != '' && searchText != '') {
                url = `/serviceManage?page=${curpage}&rows=${eachpage}&type=${searchType}&text=${searchText}`
            } else {
                url = `/serviceManage?page=${curpage}&rows=${eachpage}`
            }
            const data = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => {
                    return response.json();
                })
            context.commit('getServiceByPage', data);//提交
        },
        //增加
        async add_Service(context, payload) {
            const data = await fetch('/serviceManage', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    addService: payload,
                    pageObj: {
                        page: context.state.curpage,
                        rows: context.state.eachpage
                    }
                })
            })
                .then(response => {
                    return response.json();
                })
            context.commit('addService', data)
        },
        //删除
        async deleteService(context, id) {
            const data = await fetch('/serviceManage/' + id, {
                method: 'delete',
                body:JSON.stringify({
                        page: context.state.curpage,
                        rows: context.state.eachpage
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => {
                    return response.json();
                })
            context.commit('deleteService', data)
        },
        // 修改
        async edit_Service(context, payload) {
            const data = await fetch('/serviceManage/'+payload._id, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    editService: payload,
                    pageObj: {
                        page: context.state.curpage,
                        rows: context.state.eachpage
                    }
                })
            })
                .then(response => {
                    return response.json();
                })
            context.commit('editService', data)
        }
    }
}
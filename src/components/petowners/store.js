export default {
    namespaced: true,
    state: {
        curPage: 1,
        eachPage: 10,
        rows: [],
        maxPage: 0,
        count: 0
    },
    mutations: {
        getEmpByPage(state, payload) { //state 自己的store的state ---paload 自己的参数
            Object.assign(state, payload)
        },
        setCurPage(state, payload) {
            state.curPage = payload
            console.log(state.curPage)
        },
        setEachPage(state, payload) {
            state.eachPage = payload
        }
    },
    actions: {
        //存
        async PostEmpByPage(context, { curPage, eachPage,obj } = {}) {
            const data = await fetch("http://localhost:8081/pet", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    curPage: curPage || context.state.curPage,
                    eachPage: eachPage || context.state.eachPage,
                    obj
                })
            }).then(response => {
                return response.json();
            });
            context.commit("getEmpByPage", data);
        },

        //删除
        async deleve(context, { curPage, eachPage,del} = {}) {
            console.log(del, '参数');
            const data = await fetch('http://localhost:8081/del', {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    curPage: curPage || context.state.curPage,
                    eachPage: eachPage || context.state.eachPage,
                    del
                })
            })
                .then(function (response) {
                    return response.json({del});
                });
            context.commit("getEmpByPage", data);
            console.log(data);
        },
        //获取
        async asyncGetEmpByPage(context, { curPage, eachPage } = {}) {
            const data = await fetch("http://localhost:8081/out", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    curPage: curPage || context.state.curPage,
                    eachPage: eachPage || context.state.eachPage,
                })
            }).then(response => {
                return response.json();
            });
            context.commit("getEmpByPage", data)
            console.log(data)
        }
    }
}
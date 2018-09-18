export default {
    namespaced: true,
    state: {
        curPage: 1,
        eachPage: 10,
        rows: [],
        maxPage: 0,
        count: 0,
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
        //获取
        async asyncGetEmpByPage(context, {curPage, eachPage, objs,_id} = {}) {
            console.log(objs,_id);
            const data = await fetch("http://localhost:8081/ord", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    curPage: curPage || context.state.curPage,
                    eachPage: eachPage || context.state.eachPage,
                    objs,
                    _id
                })
            }).then(response => {
                return response.json();
            });
            context.commit("getEmpByPage", data);
            console.log(data);
        },
        //新增
        async post(context, {curPage, eachPage,obj} = {}) {
            const data = await fetch("http://localhost:8081/post", {
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
            // console.log(data);
        },
        //查询
        //     async as(context, _id) {
        //     console.log(_id);
            // const data = await fetch(`http://localhost:8081/err?type=${obj.type}&text=${obj.text}`, {
            //     method: "GET",
            //     headers: {
            //         "Content-Type": "application/json"
            //     },
            //     // body: JSON.stringify({
            //     //     obj
            //     // })
            // }).then(response => {
            //     return response.json();
            // });
            // context.commit("getEmpByPage", data);
            // console.log(data);
        // },
        //修改
        async modifys(context,{curPage, eachPage,obj} = {}) {
            console.log("xiu",obj)
            const data = await fetch("http://localhost:8081/modify:id", {
                method: "PUT",
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
            console.log(data)
        },
        //删除
        async dels(context, {curPage, eachPage, row} = {}) {
            console.log("删除",row)
            const data = await fetch("http://localhost:8081/delete", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    curPage: curPage || context.state.curPage,
                    eachPage: eachPage || context.state.eachPage,
                    row
                })
            }).then(response => {
                return response.json();
            });
            context.commit("getEmpByPage", data)
            console.log(data)
        }
    }
}
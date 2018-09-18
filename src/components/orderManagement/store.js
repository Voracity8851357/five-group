export default {
    namespaced: true,
    state: {//储存初始化数据
        curPage: 1,
        eachPage: 10,
        rows: [],
        maxPage: 0,
        count: 0,
    },
    mutations: {//对数据进行计算的方法全部写在里面
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
    actions: {//处理Mutations中已经写好的方法
        //获取
        async asyncGetEmpByPage(context, {curPage, eachPage, objs,_id} = {}) {
            console.log(objs,_id);
            const data = await fetch("orderManagement/ord", {
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
            const data = await fetch("orderManagement/post", {
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
            const data = await fetch("orderManagement/modify:id", {
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
            const data = await fetch("orderManagement/delete", {
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
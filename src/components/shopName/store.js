export default {
    namespaced: true,
    // 门店管理列表
    state: {
        curPage: 1,
        eachPage: 10,
        rows: [],
        maxPage: 0,
        count: 0
      },
      mutations: {
        getEmpByPage(state, payload) {
          Object.assign(state, payload)
        },
        setCurPage(state, payload) {
          state.curPage = payload
          
        },
        setEachPage(state, payload) {
          state.eachPage = payload
        }
      },
      actions: {
        async asyncGetEmpByPage(context, { curPage, eachPage } = {}) {
           fetch("http://localhost:8081/shopManagement/getEmpByPage", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              curPage: curPage || context.state.curPage,
              eachPage: eachPage || context.state.eachPage
            })
          }).then(response => {
            return response.json();
          });
          context.commit("getEmpByPage")
        },
        async getAddShop(context,payload){
            fetch("http://localhost:8081/shopManagement/add", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({payload})
            }).then(response => {
              return response.json();
            });
          }
    
      }
}
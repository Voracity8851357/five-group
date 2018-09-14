export default {
    namespaced: true,
    // 门店管理列表
    state: {
      _id:0,
      curPage:1,
      eachPage:10,
      maxPage:0, 
      total:0, 
      rows:[],
      seachType:'',
      seachText:''
      },
      mutations: {
        getShopByPage(state, payload) {
          Object.assign(state, payload)
        },
        addShop(state,payload){
          Object.assign(state, payload)
        }
      },
      actions: {
        async asyncGetShopByPage(context,{curPage=1, eachPage=10}={}) {
         let data=await fetch(`http://localhost:8081/shopManagement/getShopByPage?page=${curPage}&rows=${eachPage}`, {
            headers: {
              "Content-Type": "application/json"
            },
          }).then(response => {
            return response.json();
          });
          context.commit("getShopByPage",data)
          console.log(data)
        },
        async getAddShop(context,payload){
            fetch("http://localhost:8081/shopManagement/add", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(payload)
            }).then(response => {
              return response.json();
            });
            context.commit("addShop")
          },
          async deleteShop(context,payload){
          await fetch(`http://localhost:8081/shopManagement/${payload._id}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(payload)
            }).then(response => {
              return response.json();
            });
          },
          async eitShop(context,payload){
            let data=await fetch(`http://localhost:8081/shopManagement/${payload._id}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
              }).then(response => {
                return response.json();
              });
              context.commit("eitShop",data)
            }
    
      }
}
export default {
    namespaced: true,
    // 门店管理列表
    state: {
      _id:0,
      curPage:1,
      eachPage:10,
      maxPage:0, 
      total:0, 
      rows:[]
      },
      mutations: {
        getShopByPage(state, payload) {
          Object.assign(state, payload)
        },
        addShop(state,payload){
          Object.assign(state, payload)
        },
        delete_shop(state,payload){
          Object.assign(state,payload)
        },
        edit_shop(state,payload){
          Object.assign(state,payload)
        }
      },
      actions: {
        async asyncGetShopByPage(context,{curPage=1, eachPage=10,searchType="",searchText=""}={}) {
          let url="";
          if(searchType!=''&searchText!=''){
            url=`http://localhost:8081/shopManagement/getShopByPage?page=${curPage}&row=${eachPage}&seachType=${searchType}&seachText=${searchText}`
          }else{
            url=`http://localhost:8081/shopManagement/getShopByPage?page=${curPage}&row=${eachPage}`
          }
          const data=await fetch(url, {
            headers: {
              "Content-Type": "application/json"
            },
          }).then(response => {
            return response.json();
          });
          context.commit("getShopByPage",data)
          console.log(data)
        },
        async asyncGetAddShop(context,payload){
         const data=await fetch("http://localhost:8081/shopManagement/add", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(payload)
            }).then(response => {
              return response.json();
            });
            context.commit("addShop",data)
          },
          async deleteShop(context,payload){
            const data= await fetch(`http://localhost:8081/shopManagement/`+payload._id, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                page:context.state.curPage,
                rows:context.state.eachPage
              })
            }).then(response => {
              return response.json();
            });
            context.commit('delete_shop',data)
          },
          async asyncEditShop(context,payload){
            const data=await fetch('http://localhost:8081/shopManagement/'+payload._id, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  editShop: payload,
                  pageObj: {
                      page: context.state.curpage,
                      rows: context.state.eachpage
                  }
              })
              }).then(response => {
                return response.json();
              });
              context.commit("edit_shop",data)
            }
    
      }
}
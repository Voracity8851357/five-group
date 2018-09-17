export default {
    namespaced: true,
    // 门店管理列表
    state: {
      curPage:1,
      eachPage:10,
      maxPage:0, 
      total:0, 
      rows:[],
      audit: []
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
        },
        setState(state, payload) {
          Object.assign(state, payload);
      }
      },
      actions: {
        // 分页及搜索
        async asyncGetShopByPage(context,{curPage=1, eachPage=10,searchType="",searchText=""}={}) {
          let url="";
          if(searchType!=''&searchText!=''){
            url=`http://localhost:8081/shopManagement/getShopByPage?page=${curPage}&rows=${eachPage}&type=${searchType}&text=${searchText}`
          }else{
            url=`http://localhost:8081/shopManagement/getShopByPage?page=${curPage}&rows=${eachPage}`
          }
          const data=await fetch(url, {
            headers: {
              "Content-Type": "application/json"
            },
          }).then(response => {
            return response.json();
          });
          data.rows.map((item) => {
            if (item.userStatus === '0') {
                item.userStatus = '申请中'
            } else if (item.userStatus === '1') {
                item.userStatus = '可用'
            } else if (item.userStatus === '2') {
                item.userStatus = '不可用'
            }
        });
          context.commit("getShopByPage",data)
        },
        // 增加门店
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
          // 删除门店
          async deleteShop(context,id){
            const data= await fetch(`http://localhost:8081/shopManagement/`+id, {
              method: "delete",
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
          // 修改门店
          async editShops(context, payload) {
           let data=await fetch(`http://localhost:8081/shopManagement/${payload._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            })
            .then(response => {
              return response.json();
          })
           context.commit('edit_shop', data)
           
        },
     //获取审核数据
     async async_getAudit(context) {
      const data = await fetch('http://localhost:8081/shopManagement/getAudit').then(response => {
          return response.json()
      });
      context.commit('setState', {audit: data});
      return 'success'
  },
  //审核
  async async_putAudit(context, {shopStatus, _id} = {}) {
      await fetch('http://localhost:8081/shopManagement/audit', {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              shopStatus, _id
          })
      });
      return 'success'
  },
      }
}
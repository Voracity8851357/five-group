
export default {
  namespaced: true,
  // 门店管理列表
  state: {
    curPage: 1,
    eachPage: 10,
    maxPage: 0,
    total: 0,
    rows: [],
    audit: [],
    userId:""
  },
  mutations: {
    getShopByPage(state, payload) {
      Object.assign(state, payload)
    },
    addShop(state, payload) {
      Object.assign(state, payload)
    },
    edit_shop(state, payload) {
      Object.assign(state, payload)
    },
    delete_shop(state, payload) {
      Object.assign(state, payload)
    },
    setState(state, payload) {
      Object.assign(state, payload);
    },
  },
  actions: {
    // 分页及搜索
    async asyncGetShopByPage( context, {
      curPage = 1,
      eachPage = 10,
      searchType = "",
      searchText = "",
      userId=""
    } = {}) {
      let url = "";
      if (searchType != '' & searchText != '') {
        url = `http://localhost:8081/shopManagement/getShopByPage?userId=${userId}&page=${curPage}&rows=${eachPage}&type=${searchType}&text=${searchText}`
      } else {
        url = `http://localhost:8081/shopManagement/getShopByPage?userId=${userId}&page=${curPage}&rows=${eachPage}`
      }
      const data = await fetch(url, {
        headers: {
          "Content-Type": "application/json"
        },
      }).then(response => {
        return response.json();
      });
      data.rows.map((item) => {
        if (item.shopStatus === '0') {
          item.shopStatus = '待审核'
        } else if (item.shopStatus === '1') {
          item.shopStatus = '审核通过'
        } else if (item.shopStatus === '2') {
          item.shopStatus = '审核未通过'
        }
      });
      context.commit("getShopByPage", {rows:data.rows})
    },
    // 增加门店
    async asyncGetAddShop(context, payload) {
      const data = await fetch("http://localhost:8081/shopManagement/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      }).then(response => {
        return response.json();
      });
      context.commit("addShop", data)
    },
    // 删除门店
    async deleteShop(context, id) {
      const data = await fetch(`http://localhost:8081/shopManagement/` + id, {
        method: "delete",
        body: JSON.stringify({
          page: context.state.curPage,
          rows: context.state.eachPage
        }),
        headers: {
          "Content-Type": "application/json"
        },
      })
      context.commit('delete_shop', data)
    },
    // 修改门店
    async editShops(context, payload) {
      let data = await fetch(`http://localhost:8081/shopManagement/` + payload._id, {
        method: 'PUT',
        body: JSON.stringify({
          editShop: payload,
          pageObj: {
            page: context.state.curpage,
            rows: context.state.eachpage
          }
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      context.commit('edit_shop', data)

    },
    //获取审核数据
    async async_getAudit(context) {
      const data = await fetch('http://localhost:8081/shopManagement/getAudit').then(response => {
        return response.json()
      });
      context.commit('setState', {
        audit: data
      });
      return 'success'
    },
    //审核
    async async_putAudit(context, {
      shopStatus,
      _id
    } = {}) {
    await fetch('http://localhost:8081/shopManagement/audit/'+_id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          shopStatus,
          _id
        })
      })
      return 'success'
    },
  }
}
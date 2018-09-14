export default {
    namespaced: true,
    // 申请
    actions:{
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
          }
    },
}
export default {
    namespaced: true,
    // 申请
    actions:{
        async getAddShop(context,{shopName, shopAdd, shopLicenceNum, description, shopTel, shopFeature, shopCorporate,shopImg,shopLicenceImg,shopVip,userId,shopStatus,shopLocation} = {}){
            fetch("http://localhost:8081/shopManagement/apply", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                shopName, shopAdd, shopLicenceNum, description, shopTel, shopFeature, shopCorporate,shopImg,shopLicenceImg,shopVip,userId,shopStatus,shopLocation
              })
            }).then(response => {
              return response.json();
            });
            return 'success'
          }
    },
}
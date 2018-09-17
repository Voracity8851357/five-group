export default {
    namespaced: true,
    // 申请
    actions:{
        async getAddShop(context,{shopName, shopAdd, shopLicenceNum, description, shopTel, shopFeature, shopCorporate,shopImg,shopLicenceImg,shopVip,userType,shopStatus} = {}){
            fetch("http://localhost:8081/shopManagement/add", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                shopName, shopAdd, shopLicenceNum, description, shopTel, shopFeature, shopCorporate,shopImg,shopLicenceImg,shopVip,userType,shopStatus
              })
            }).then(response => {
              return response.json();
            });
            console.log(data);
            return 'success'
          }
    },
}
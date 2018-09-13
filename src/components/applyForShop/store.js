export default {
    // namespaced: true,
    state: {
        city: {},
        formData: [{
            shopName: '', //店铺名称
            shopAdd: '', //地址
            shopLicenceNum: '',
            description: '', //介绍
            shopTel: '',
            is_premium: true,
            delivery_mode: true,
            new: true,
            startTime: '',
            endTime: '',
            image_path: '',
            business_license_image: '',
        }],
        rules: {
            name: [
                { required: true, message: '请输入店铺名称', trigger: 'blur' },
            ],
            address: [
                { required: true, message: '请输入详细地址', trigger: 'blur' }
            ],
            phone: [
                { required: true, message: '请输入联系电话' },
                { type: 'number', message: '电话号码必须是数字' }
            ],
        },
        options: [{
              value: '满减优惠',
              label: '满减优惠'
        }, {
              value: '优惠大酬宾',
              label: '优惠大酬宾'
        }, {
              value: '新用户立减',
              label: '新用户立减'
        }, {
              value: '进店领券',
              label: '进店领券'
        }],
            activityValue: '满减优惠',
        activities: [{
            icon_name: '减',
            name: '满减优惠',
            description: '满30减5，满60减8',
        }],
    },
    mutations: {
       getShop(state){
       console.log(state)
       }
      },
  }
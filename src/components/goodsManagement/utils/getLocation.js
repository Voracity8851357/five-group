export default async function (options = {}) {
    const {keywords = "", subdistrict = 1, getCities = true} = options;
    const url = `https://restapi.amap.com/v3/config/district?keywords=${keywords}&subdistrict=${subdistrict}&key=55f6944335587ba506bd832ece96f4bf`;
    let res = await
        fetch(url).then(res => res.json());
    return res.districts[0].districts.map((city, index) => ({label: city.name, cities: getCities ? [] : null, index}));
}
const request = require('request');
const axios = require('axios');

var getCode = async(country) => {
    try{
        const code = await axios.get(`https://restcountries.eu/rest/v2/name/${country}?fullText=true`);
        return code.data[0].currencies[0].code
    }catch(error) {
        if (error.response.data.status === 404){
            throw("Country does not exist")
        }
    }
};

// var getCode = (country) => {
//     return new Promise ((resolve, reject) => {
//         request({
//            url: `https://restcountries.eu/rest/v2/name/${country}?fullText=true`,
//             json: true
//         }, (error,response,body) => {
//             if (error) {
//                 reject("cannot connect to api")
//             }else if (body.status === 404) {
//                 reject('Cannot find the country')
//             }else {
//                 resolve({
//                     Code: body[0].currencies[0].code
//                 });
//             }
//         });
//     });
// };

var getCurrency= async (code) => {
    try{
        const rate = await axios.get(`https://api.exchangeratesapi.io/latest?symbols=${code}&base=USD`);
        return {
            code: rate.data.rates,
            rates: rate.data.rates[code]
        }
    }catch(error){
        if (error.response.data.error.search("Symbol")){
            throw ("Symbol does not exist")
        }else if (error.response.data.error.search("Base")){
            throw ("Code does not exist")
        }
    }
};

// var getCurrency = (code) => {
//     // console.log(`https://api.exchangeratesapi.io/latest?symbols=${code}&base=USD`);
//     return new Promise((resolve, reject) => {
//         request({
//             url:`https://api.exchangeratesapi.io/latest?symbols=${code}&base=USD`,
//             json:true
//         },(error,response,body) => {
//             if (error) {
//                 reject("Cannot connect")
//             }else if (body.error === 'string') {
//                 reject("Code does not exist")
//             }else if ('error' in body) {
//                 reject("Code error")
//             }else {
//                 resolve({
//                     code: body.rates,
//                     rates: body.rates[code]
//                 })
//             }
//         })
//     });
// };

module.exports = {
    getCode,
    getCurrency
};
import axios from 'axios';
 
const ID_URL='http://localhost:9898/inventory/trans';
const STOCK_URL='http://localhost:9898/inventory/stock';
const ANA_URL='http://localhost:9898/inventory/analysis';

export const generateId=()=>{
    return axios.get(ID_URL);
}
 export const saveTransaction=(transaction)=>{
    return axios.post(STOCK_URL,transaction);

 }
  export const findStockTransactionById=(id)=>{
    return axios.get(STOCK_URL+"/"+id);

 }
 export const findTransactionsByType=(type)=>{
    return axios.get(ID_URL+"/"+type);

 }
   export const removeTransactionById=(id)=>{
    return axios.delete(STOCK_URL+"/"+id);

 }
   export const showAllTransaction=()=>{
    return axios.get(STOCK_URL);

 }
   export const update=(transaction)=>{
    return axios.put(STOCK_URL,transaction);

 }
 export const getProductWiseTotalSale=()=>{
    return axios.get(ANA_URL);

 }
 export const getDemandByProduct=(id)=>{
    return axios.get(ANA_URL+"/"+id);

 }
 



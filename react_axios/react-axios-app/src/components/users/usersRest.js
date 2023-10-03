import axiosClient from "../../rest/restClient";

export async function fetchUsers(responseHandler){
  const response = await axiosClient.get('/users');
  responseHandler(response.data)
}

// export function addProduct(data){
//   return axiosClient.post('/product', JSON.stringify(data));
// }
export const serverUrl = "http://localhost:1337";

export const setToken = (token) => sessionStorage.setItem("token", token);

// function setToken(token) {
//   sessionStorage.setItem('token', token)
// }

export const getToken = () => sessionStorage.getItem("token");

export const removeToken = () => sessionStorage.removeItem("token");

export const dalImg = (url) => {
  if (url) {
    if (url.startsWith("http")) return url;
    return serverUrl + url;
  }
  return "https://img2.baidu.com/it/u=3251476880,269103712&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500";
};

const sum = (a, b) => a + b;

export default sum;

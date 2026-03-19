export const isAuth = () => {
  //console.log(JSON.parse(localStorage.getItem("user")) + "token")
  return JSON.parse(localStorage.getItem("user"))?.token ? true : false;
};


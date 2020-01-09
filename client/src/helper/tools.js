import { updatePath } from "./urls";

export let hasJustLogged = false

export const checkActiveUrl = linkTo => {
  return linkTo === window.location.pathname ? "active" : "";
};
const loggerSwitch = () => {
  setTimeout(() => {hasJustLogged = false}, 5000)
}

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("name");
  localStorage.removeItem("email");
  updatePath();
};
export const login = res => {
  localStorage.setItem("token", res.token);
  localStorage.setItem("name", res.name);
  localStorage.setItem("email", res.email);
  updatePath();
  hasJustLogged = true
  loggerSwitch()
};

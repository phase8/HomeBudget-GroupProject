import { updatePath } from "./urls";

export const checkActiveUrl = linkTo => {
  return linkTo === window.location.pathname ? "active" : "";
};

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
};

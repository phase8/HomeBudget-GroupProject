let userName,
  welcomepageUrl,
  categoryUrl,
  historyUrl,
  goalsUrl,
  accountManagmentUrl;

export const updatePath = () => {
  userName = localStorage.getItem("name") || "appuser";
  welcomepageUrl = `/${userName}/welcomepage`;
  categoryUrl = `/${userName}/category`;
  historyUrl = `/${userName}/history`;
  goalsUrl = `/${userName}/goals`;
  accountManagmentUrl = `/${userName}/userpanel`;
};
updatePath();

export {
  userName,
  welcomepageUrl,
  categoryUrl,
  historyUrl,
  goalsUrl,
  accountManagmentUrl
};

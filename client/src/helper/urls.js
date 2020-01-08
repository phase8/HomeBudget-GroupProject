let userName,
  welcomepageUrl,
  categoryUrl,
  historyUrl,
  goalsUrl,
  accountManagmentUrl,
  AddIncomeExpenseUrl;

export const updatePath = () => {
  userName = localStorage.getItem("name") || "appuser";
  welcomepageUrl = `/${userName}/welcomepage`;
  categoryUrl = `/${userName}/category`;
  historyUrl = `/${userName}/history`;
  goalsUrl = `/${userName}/goals`;
  accountManagmentUrl = `/${userName}/accountManagment`;
  AddIncomeExpenseUrl = `/${userName}/addincomeExpense`;
};
updatePath();

export {
  userName,
  welcomepageUrl,
  categoryUrl,
  historyUrl,
  goalsUrl,
  accountManagmentUrl,
  AddIncomeExpenseUrl
};

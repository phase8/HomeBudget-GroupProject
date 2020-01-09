let userName,
  welcomepageUrl,
  categoryUrl,
  categoryAddUrl,
  categoryIncomeUrl,
  categoryExpenseUrl,
  historyUrl,
  goalsUrl,
  accountManagementUrl,
  AddIncomeExpenseUrl;

export const updatePath = () => {
  userName = localStorage.getItem("name") || "appuser";
  welcomepageUrl = `/${userName}/welcomepage`;
  categoryUrl = `/${userName}/category`;
  categoryAddUrl = `${categoryUrl}/add`;
  categoryIncomeUrl = `${categoryUrl}/income`;
  categoryExpenseUrl = `${categoryUrl}/expense`;
  historyUrl = `/${userName}/history`;
  goalsUrl = `/${userName}/goals`;
  accountManagementUrl = `/${userName}/accountManagement`;
  AddIncomeExpenseUrl = `/${userName}/addincomeExpense`;
};
updatePath();

export {
  userName,
  welcomepageUrl,
  categoryUrl,
  categoryAddUrl,
  categoryIncomeUrl,
  categoryExpenseUrl,
  historyUrl,
  goalsUrl,
  accountManagementUrl,
  AddIncomeExpenseUrl
};

export function sortExpenses(expenses, columnName) {
  // console.log(expenses);
  return expenses.sort((a, b) => a[`${columnName}`] - b[`${columnName}`]);
}

export function remainingExpenses(accountData, notionData) {
  const remainingAccount =
    accountData &&
    notionData &&
    accountData.filter((accountEntry) => {
      return !notionData.some((notionEntry) => {
        return (
          accountEntry["Date operation"] === notionEntry.Date &&
          accountEntry.Debit === notionEntry.Montant
        );
      });
    });

  const remainingNotion =
    accountData &&
    notionData &&
    notionData.filter((notionEntry) => {
      return !accountData.some((accountEntry) => {
        return (
          accountEntry["Date operation"] === notionEntry.Date &&
          accountEntry.Debit === notionEntry.Montant
        );
      });
    });

  return [remainingAccount, remainingNotion];
}

class dataSheet {

  constructor() {
    this.sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET.DATA.NAME);
    this.values = this.sheet.getDataRange().getValues();
    [this.headers, this.records] = this.values;
  }

  getPdfRecords() {
    this.records.filter((record, index) => record[/* A列PDF対象 */0] === true);
  }
}

function dataSheetTest() {
  const data = new dataSheet();

  console.log(data.headers);
}

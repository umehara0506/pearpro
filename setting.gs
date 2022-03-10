/** @type {SpreadsheetApp.Spreadsheet} */
const SS = SpreadsheetApp.getActiveSpreadsheet();
/** @type {enum} */
const SHEET = Object.freeze({
  DATA: {
    NAME: '個別仕様書'
  },
  PDF_FORMAT: {
    NAME: 'FORMAT',
    RANGE: 'B3%3AI25'  // 対象範囲「%3A」 = : (コロン)
  }
});
/** @type {enum} */
const FOLDER = Object.freeze({
  PDF_CRETAED: {
    ID: '1-hditthwkYn4ZwqXjILUsUiC6MSVFSt8'
  }
});
/** @type {enum} */
const TAGS = Object.freeze([
  { NAME: '契約先名（乙）' },
  { NAME: '業務内容' },
  { NAME: '受託開始期間' },
  { NAME: '受託終了期間' },
  { NAME: '委託費(合計)' },
  { NAME: '委託費' },
  { NAME: '作業場所' },
  { NAME: '貸与物' },
  { NAME: '業務遂行時間' },
  { NAME: 'その他諸条件' },
]);
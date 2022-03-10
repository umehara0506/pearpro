const SS = SpreadsheetApp.getActiveSpreadsheet();

const SHEET = Object.freeze({
  DATA: {
    NAME: '個別仕様書'
  },
  PDF_FORMAT: {
    NAME: 'FORMAT',
    RANGE: 'B3%3AI25'  // 対象範囲「%3A」 = : (コロン)
  }
});

const FOLDER = Object.freeze({
  PDF_CRETAED: {
    ID: '1-hditthwkYn4ZwqXjILUsUiC6MSVFSt8'
  }
});


const HEADRES = Object.freeze([
  { NAME: '契約先名（乙）' },
  { NAME: '委託費(月額)' },
  { NAME: '委託期間(ヶ月)' },
  { NAME: '貸与物' },
  { NAME: '勤務地1' },
  { NAME: '勤務地2' },
  { NAME: '業務内容' },
  { NAME: '受託開始期間' },
  { NAME: '受託終了期間' },
  { NAME: '委託費(合計)' },
]);
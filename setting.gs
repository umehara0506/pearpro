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


// const TAGS = Object.freeze([
//   {NAME: '契約先名（乙）', '委託費(月額)', '委託期間(ヶ月)', '貸与物', '勤務地1', '勤務地2'},
//   {NAME: '業務内容'},
//   {NAME: '受託開始期間'},
//   {NAME: '受託終了期間'},
//   {NAME: '委託費(合計)'},
//   {NAME: },
//   {NAME: },
//   {NAME: },
//   {NAME: }
// ]);
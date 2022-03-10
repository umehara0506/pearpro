class dataSheet {

  constructor() {
    this.sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET.DATA.NAME);
    this.values = this.sheet.getDataRange().getValues();
    [this.headers, ...this.records] = this.values;
  }

  getPdfDicts() {
    const dicts = this.getAsDicts();
    const pdfDicts = dicts.filter(dict => dict.get('PDF対象') === true);
    return pdfDicts;
  }


  /**
   * シートの値から、ヘッダー情報をプロパティとして持つ Map 型を生成するメソッド
   * @param {number} index - ヘッダー行のヘッダーとなるインデックス。デフォルト引数は「headerRows - 1」
   * @return {Array.<Map>} ヘッダー情報を key, 値を value として持つ Map
   */
  getAsDicts() {
    if (this.dicts_ !== undefined) return this.dicts_;
    const dicts = this.records.map((record, i) => record.
      reduce((acc, cur, j) => acc.set(this.headers[j], cur), new Map([
        ['row', i + 2],
      ]))
    );
    this.dicts_ = dicts;
    return dicts;
  }

}

function dataSheetTest() {
  const data = new dataSheet();

  // console.log(data.headers);
  // console.log(data.records);
  // console.log(data.getAsDicts()[0].get('row'));
  const dicts = data.getPdfDicts();
  dicts.forEach(dict => console.log(dict.get('契約先名（乙）')));

}

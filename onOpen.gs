function onOpen() { 
  const ui = SpreadsheetApp.getUi(); 
  ui.createMenu('PDF作成') 
  .addItem('実行', 'createPDF') 
  .addToUi(); 
}
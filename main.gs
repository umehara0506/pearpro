function myFunction() {

  const data = new dataSheet();
  const dicts = data.getPdfDicts();
  dicts.forEach(dict => console.log(dict.get('契約先名（乙）')));



}

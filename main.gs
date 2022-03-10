function main() {

  const formatSheet = new FormatSheet();
  const dataSheet = new DataSheet();
  const dicts = dataSheet.getPdfDicts();

  dicts.forEach(dict => {
    // console.log([...dict])

    const tags = TAGS.map(tag => new Tag(dict, tag.NAME));
    console.log(tags);

  });




  // console.log(dicts[0]);




  // dicts.forEach(dict => console.log(dict.get('契約先名（乙）')));

  // HEADRES.forEach(header => new Tag(header));


}

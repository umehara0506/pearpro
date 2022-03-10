class Tag {

  constructor(dict, tag) {
    this.dict = dict;
    this.tag = tag
    this.before = '{{' + tag + '}}';
    this.after = this.makeAfter();
  }

  makeAfter() {
    console.log('this.tag: ', this.tag);
    switch (this.tag) {
      case '委託費':
        return this.makeOutsourcingFee();
      case '作業場所':
        return this.makeWorkLocation();
      case 'その他諸条件':
        return this.makeOtherConditions();
      case '業務遂行時間':
        return this.hoge();

      default:
        const value = this.dict.get(this.tag);
        console.log('value: ', value);
        const string = value instanceof Date ? Datetime.format(value) : value;
        const converted = ExtendedStiring.convHankakuToZenkaku(string);
        return converted;
    }
  }

  makeOutsourcingFee() {


  }

  makeWorkLocation() {

  }


  makeOtherConditions() {

  }

  hoge() {

  }



}



function myFunction_20220310_222159() {

  const tags = TAGS.map(tag => new Tag(tag.NAME));
  console.log(tags);


}
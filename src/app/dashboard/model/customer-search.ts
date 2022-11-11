
export class CustomerSearch {
  fulltext: string;
  name: string;
  surname: string;
  address: string;
  cap: string;
  city: string;
  province: string;

  constructor() {
    this.fulltext = '';
    this.name = '';
    this.surname = '';
    this.address = '';
    this.cap = '';
    this.city = '';
    this.province = '';
  }

  trimAll() {
    this.fulltext = this.fulltext.trim();
    this.name = this.name.trim();
    this.surname = this.surname.trim();
    this.address = this.address.trim();
    this.cap = this.cap.trim();
    this.city = this.city.trim();
    this.province = this.province.trim();
  }

  clear() {
    this.fulltext = '';
    this.name = '';
    this.surname = '';
    this.address = '';
    this.cap = '';
    this.city = '';
    this.province = '';
  }
}

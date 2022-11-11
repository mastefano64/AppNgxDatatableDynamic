// import { isMoment } from 'moment';
import { Exception } from './error/exception';

export class Utility {
  public static createDate(amg: string, sep: string = '/'): Date | string {
    if (!amg) {
      return '';
    }
    const array = amg.split(sep);
    const y = +array[0];
    const m = +array[1];
    const d = +array[2];
    const date = new Date(y, m - 1, d);
    return date;
  }

  public static isDate(value1: string): boolean {
    let valret = true;
    const regexp = '(0?[1-9]|[12][0-9]|3[01])/(0?[1-9]|1[012])/((19|20)\\d\\d)';
    try {
      if (!value1 || !value1.match(regexp)) {
        throw new Exception();
      }
      const numbers = value1.split('/');
      const value2 = numbers[2] + '/' + numbers[1] + '/' + numbers[0];
      if (isNaN(Date.parse(value2))) {
        throw new Exception();
      }
    } catch (e) {
      valret = false;
    }
    return valret;
  }

  public static isMail(value: string): boolean {
    let valret = true;
    const regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!value || !value.match(regexp)) {
      valret = false;
    } else {
      valret = true;
    }
    return valret;
  }

  public static toString(value: any): string {
    let valret = '';
    if (value === '' || value === undefined) {
      return valret;
    }
    valret = value.toString().trim();
    return valret;
  }

  public static toBoolean(value: any): boolean {
    let valret = false;
    if (value === '' || value === undefined) {
      return valret;
    }
    valret = value;
    return valret;
  }

  public static toInteger(value: any): number {
    let valret = 0;
    if (!value) {
      return valret;
    }
    const str = value.toString().trim();
    valret = parseInt(str, 10);
    return valret;
  }

  public static toDecimal(value: any, removecomma = true): number {
    let valret = 0;
    if (!value) {
      return valret;
    }
    const str = value.toString().trim();
    if (removecomma === true) {
      valret = parseFloat(str.replace(',', '.'));
    } else {
      valret = parseFloat(str);
    }
    return valret;
  }

  public static formatDec(value: number): string {
    let str = '';
    if (value) {
      const fraction = ',';
      const separator = '';
      str = value.toLocaleString('en-US');
      str = str.replace(/,/g, separator);
      str = str.replace(/\./, fraction);
    }
    return str;
  }

  public static fromDateToString(value: any, sep: string = '/'): string {
    if (!value) {
       return '';
    }
    let date = value;
    if (value instanceof Date) {
      const d = ("0" + value.getDate()).slice(-2)
      const m = ("0" + (value.getMonth() + 1)).slice(-2);
      const y = value.getFullYear();
      date = y + sep + m + sep + d;
    }
    return date;
  }
}

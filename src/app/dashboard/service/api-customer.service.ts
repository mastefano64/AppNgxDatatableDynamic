import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, of } from "rxjs";

import { DataTableDef, DataTableColumn } from "../../datatable/model/datatable-def";
import { DefinitionTableService } from "../../datatable/service/definitiontable.service";
import { IDefinitionTable } from "../../datatable/idefinitiontable";
import { CustomerSearch } from "../model/customer-search";
import { CustomerDto } from "../model/customer-dto";

@Injectable()
export class ApiCustomerService implements IDefinitionTable {
  list: any;

  constructor(private http: HttpClient, private deftable: DefinitionTableService) { }

  getDataTableDef(key = ''): Observable<DataTableDef> {
    let def = new DataTableDef();

    if (key) {
      const result = this.deftable.tryGetFromCache(key);
      if (result) {
        return of(result);
      }
    }

    const c1 = new DataTableColumn();
    c1.id = 1;
    c1.name = 'id';
    c1.prop = 'id';
    c1.searchable = false;
    c1.table = true;
    c1.tablevisible = true;
    c1.tableorder = 1;
    c1.detail = true;
    c1.detailvisible = true;
    c1.detailorder = 1;
    c1.group = false;
    c1.sort = true;
    def.columns.push(c1);
    const c2 = new DataTableColumn();
    c2.id = 2;
    c2.name = 'name';
    c2.prop = 'name';
    c2.searchable = true;
    c2.table = true;
    c2.tablevisible = true;
    c2.tableorder = 1;
    c2.detail = true;
    c2.detailvisible = true;
    c2.detailorder = 1;
    c2.group = false;
    c2.sort = true;
    def.columns.push(c2);
    const c3 = new DataTableColumn();
    c3.id = 3;
    c3.name = 'surname';
    c3.prop = 'surname';
    c3.searchable = true;
    c3.table = true;
    c3.tablevisible = true;
    c3.tableorder = 1;
    c3.detail = true;
    c3.detailvisible = true;
    c3.detailorder = 1;
    c3.group = false;
    c3.sort = true;
    def.columns.push(c3);
    const c4 = new DataTableColumn();
    c4.id = 4;
    c4.name = 'address';
    c4.prop = 'address';
    c4.searchable = true;
    c4.table = true;
    c4.tablevisible = true;
    c4.tableorder = 1;
    c4.detail = false;
    c4.detailvisible = false;
    c4.detailorder = 1;
    c4.group = false;
    c4.sort = true;
    def.columns.push(c4);
    const c5 = new DataTableColumn();
    c5.id = 5;
    c5.name = 'cap';
    c5.prop = 'cap';
    c5.searchable = true;
    c5.table = true;
    c5.tablevisible = true;
    c5.tableorder = 1;
    c5.detail = false;
    c5.detailvisible = false;
    c5.detailorder = 1;
    c5.group = true;
    c5.sort = true;
    def.columns.push(c5);
    const c6 = new DataTableColumn();
    c6.id = 6;
    c6.name = 'city';
    c6.prop = 'city';
    c6.searchable = true;
    c6.table = true;
    c6.tablevisible = true;
    c6.tableorder = 1;
    c6.detail = true;
    c6.detailvisible = true;
    c6.detailorder = 1;
    c6.group = false;
    c6.sort = true;
    def.columns.push(c6);
    const c7 = new DataTableColumn();
    c7.id = 7;
    c7.name = 'province';
    c7.prop = 'province';
    c7.searchable = true;
    c7.table = true;
    c7.tablevisible = true;
    c7.tableorder = 1;
    c7.detail = false;
    c7.detailvisible = false;
    c7.detailorder = 1;
    c7.group = true;
    c7.sort = true;
    def.columns.push(c7);
    const c8 = new DataTableColumn();
    c8.id = 8;
    c8.name = 'tel';
    c8.prop = 'tel';
    c8.searchable = true;
    c8.table = false;
    c8.tablevisible = false;
    c8.tableorder = 1;
    c8.detail = false;
    c8.detailvisible = false;
    c8.detailorder = 1;
    c8.group = false;
    c8.sort = false;
    def.columns.push(c8);
    def.url = 'https://www.prova.it/getlist';

    return of(def);
  }

  fetchData(search: CustomerSearch, page: number, pagesize: number, orderbycolumn: string,
                      orderbydirection: string): Observable<object> {
    if (!this.list) {
      this.list = this.createList();
    }

    if (search) {
      const params = new HttpParams()
        .set('page', page.toString())
        .set('pagesize', pagesize.toString())
        .set('orderbycolumn', orderbycolumn)
        .set('orderbydirection', orderbydirection);

      let templist = [...this.list];

      if (search.fulltext) {
        templist = templist.filter(x => x.name.toLowerCase().includes(search.fulltext.toLowerCase()) ||
                         x.surname.toLowerCase().includes(search.fulltext.toLowerCase()));
      }

      if (search.name) {
        templist = templist.filter(x => x.name.toLowerCase().includes(search.name.toLowerCase()));
      }
      if (search.surname) {
        templist = templist.filter(x => x.surname.toLowerCase().includes(search.surname.toLowerCase()));
      }
      if (search.address) {
        templist = templist.filter(x => x.address.toLowerCase().includes(search.address.toLowerCase()));
      }
      if (search.cap) {
        templist = templist.filter(x => x.cap.toLowerCase().includes(search.cap.toLowerCase()));
      }
      if (search.city) {
        templist = templist.filter(x => x.city.toLowerCase().includes(search.city.toLowerCase()));
      }
      if (search.province) {
        templist = templist.filter(x => x.province.toLowerCase().includes(search.province.toLowerCase()));
      }

      if (orderbycolumn) {
        templist.sort((a, b) => {
          if (orderbydirection === 'asc') {
            if (a[orderbycolumn] < b[orderbycolumn]) {
              return -1;
            }
            if (a[orderbycolumn] > b[orderbycolumn]) {
              return +1;
            }
          } else {
            if (a[orderbycolumn] > b[orderbycolumn]) {
              return -1;
            }
            if (a[orderbycolumn] < b[orderbycolumn]) {
              return +1;
            }
          }
          return 0;
        });
      }

      const start = page * pagesize;
      const end = start + pagesize;
      const data = {
        page: page,
        items: templist.slice(start, end),
        count: templist.length
      };

      return of(data);
    } else {
      const params = new HttpParams()
        .set('page', page.toString())
        .set('pagesize', pagesize.toString())
        .set('orderbycolumn', orderbycolumn)
        .set('orderbydirection', orderbydirection);

      const templist = [...this.list];

      if (orderbycolumn) {
        templist.sort((a, b) => {
          if (orderbydirection === 'asc') {
            if (a[orderbycolumn] < b[orderbycolumn]) {
              return -1;
            }
            if (a[orderbycolumn] > b[orderbycolumn]) {
              return +1;
            }
          } else {
            if (a[orderbycolumn] > b[orderbycolumn]) {
              return -1;
            }
            if (a[orderbycolumn] < b[orderbycolumn]) {
              return +1;
            }
          }
          return 0;
        });
      }

      const start = page * pagesize;
      const end = start + pagesize;
      const data = {
        page: page,
        items: templist.slice(start, end),
        count: templist.length
      };

      return of(data);
    }
  }

  getAllDataTableList(url: string): Observable<any[]> {
    let list = this.createList();
    return of(list);
  }

  // ------------------------------------------

  private createList() {
    const data = [
      {
        'id': 1,
        'name': 'Albina',
        'surname': 'Schiavone',
        'address': 'Via Antonio da Legnago 15',
        'cap': '89040',
        'city': 'Monasterace',
        'province': 'RC'
      },
      {
        'id': 2,
        'name': 'Michelino',
        'surname': 'Genovese',
        'address': 'Piazza Principe Umberto 130',
        'cap': '50139',
        'city': 'Firenze',
        'province': 'FI'
      },
      {
        'id': 3,
        'name': 'Cesio',
        'surname': 'Palerma',
        'address': 'Via Melisurgo 140',
        'cap': '55055',
        'city': 'Ponte All Ania',
        'province': 'LU'
      },
      {
        'id': 4,
        'name': 'Baldo',
        'surname': 'Marino',
        'address': 'Via Vicenza 140',
        'cap': '13888',
        'city': 'Zubiena',
        'province': 'BI'
      },
      {
        'id': 5,
        'name': 'Michelina',
        'surname': 'Barese',
        'address': 'Viale Ippocrate 150',
        'cap': '22020',
        'city': 'Pognana Lario',
        'province': 'CO'
      },
      {
        'id': 6,
        'name': 'Dalia',
        'surname': 'Li Fonti',
        'address': 'Via Silvio Spaventa 58',
        'cap': '06076',
        'city': 'San Martino Dei Colli',
        'province': 'PG'
      },
      {
        'id': 7,
        'name': 'Divo',
        'surname': 'Manna',
        'address': 'Via Guantai Nuovi 55',
        'cap': '80078',
        'city': 'Arco Felice',
        'province': 'NA'
      },
      {
        'id': 8,
        'name': 'Alice',
        'surname': 'Palermo',
        'address': 'Via Venezia 24',
        'cap': '87040',
        'city': 'Luzzi',
        'province': 'CS'
      },
      {
        'id': 9,
        'name': 'Abela',
        'surname': 'Rizzo',
        'address': 'Vico Giganti 125',
        'cap': '27020',
        'city': 'Valeggio Lomellina',
        'province': 'PV'
      },
      {
        'id': 10,
        'name': 'Fulvia',
        'surname': 'DeRose',
        'address': 'Corso Vittorio Emanuale 86',
        'cap': '33075',
        'city': 'Cordovado',
        'province': 'PN'
      },
      {
        'id': 11,
        'name': 'Gemma',
        'surname': 'Dellucci',
        'address': 'Lungodora Napoli 30',
        'cap': '89821',
        'city': 'Vallelonga',
        'province': 'VV'
      },
      {
        'id': 12,
        'name': 'Vittoria',
        'surname': 'Toscani',
        'address': 'Via Foria 117',
        'cap': '47010',
        'city': 'Corniolo',
        'province': 'FO'
      },
      {
        'id': 13,
        'name': 'Sabina ',
        'surname': 'Napolitani',
        'address': 'Via Lombardi 19',
        'cap': '24010',
        'city': 'Valtorta',
        'province': 'BG'
      },
      {
        'id': 14,
        'name': 'Serafino',
        'surname': 'Onio',
        'address': 'Viale delle Province 103',
        'cap': '95042',
        'city': 'Grammichele',
        'province': 'CT'
      },
      {
        'id': 15,
        'name': 'Eros',
        'surname': 'Pirozzi',
        'address': 'Via Donnalbina 2',
        'cap': '08020',
        'city': 'Brunella',
        'province': 'NU'
      },
      {
        'id': 16,
        'name': 'Virgilio',
        'surname': 'Pirozzi',
        'address': 'Via Sedile di Porto 59',
        'cap': '35129',
        'city': 'Padova',
        'province': 'PD'
      },
      {
        'id': 17,
        'name': 'Calliope ',
        'surname': 'Calabresi',
        'address': 'Via Alfredo Fusco 16',
        'cap': '26040',
        'city': 'Casalbellotto',
        'province': 'CR'
      },
      {
        'id': 18,
        'name': 'Emanuela',
        'surname': 'Iadanza',
        'address': 'Via Santa Teresa degli Scalzi 44',
        'cap': '90010',
        'city': 'Lascari Scalo',
        'province': 'PA'
      },
      {
        'id': 19,
        'name': 'Lelia',
        'surname': 'Lo Duca',
        'address': 'Via delle Mura Gianicolensi 146',
        'cap': '86024',
        'city': 'Petrella Tifernina',
        'province': 'CB'
      },
      {
        'id': 20,
        'name': 'Adriana',
        'surname': 'Lucciano',
        'address': 'Via Nazionale 107',
        'cap': '39020',
        'city': 'Schluderns',
        'province': 'BZ'
      },
      {
        'id': 21,
        'name': 'Giacomo',
        'surname': 'Ricci',
        'address': 'Via Galvani 96',
        'cap': '00062',
        'city': 'Vigna Di Valle',
        'province': 'RM'
      },
      {
        'id': 22,
        'name': 'Noemi',
        'surname': 'Manfrin',
        'address': 'Piazza Pilastri 115',
        'cap': '23873',
        'city': 'Maresso',
        'province': 'LC'
      },
      {
        'id': 23,
        'name': 'Edmonda',
        'surname': 'Ferri',
        'address': 'Via dei Serpenti 64',
        'cap': '25036',
        'city': 'Palazzolo Sull Oglio',
        'province': 'BS'
      },
      {
        'id': 24,
        'name': 'Santa',
        'surname': 'Bergamaschi',
        'address': 'Via Nazionale 5',
        'cap': '39020',
        'city': 'Toll',
        'province': 'BZ'
      },
      {
        'id': 25,
        'name': 'Liliana',
        'surname': 'De Luca',
        'address': 'Via Rocca de Baldi 123',
        'cap': '89823',
        'city': 'Fabrizia',
        'province': 'VV'
      },
      {
        'id': 26,
        'name': 'Catena',
        'surname': 'Esposito',
        'address': 'Via Solfatara 94',
        'cap': '14030',
        'city': 'Penango',
        'province': 'AT'
      },
      {
        'id': 27,
        'name': 'Nicola',
        'surname': 'Trevisano',
        'address': 'Viale Augusto 110',
        'cap': '73040',
        'city': 'Magliano',
        'province': 'LE'
      },
      {
        'id': 28,
        'name': 'Albertino',
        'surname': 'Trentini',
        'address': 'Via Roma 145',
        'cap': '14044',
        'city': 'Castel Rocchero',
        'province': 'AT'
      },
      {
        'id': 29,
        'name': 'Umberto',
        'surname': 'Genovese',
        'address': 'Via Antonio Cecchi 40',
        'cap': '30020',
        'city': 'Torre Di Fine',
        'province': 'VE'
      },
      {
        'id': 105,
        'name': 'Lanfranco',
        'surname': 'Esposito',
        'address': 'Via Francesco Del Giudice 125',
        'cap': '50056',
        'city': 'Fibbiana',
        'province': 'FI'
      },
      {
        'id': 106,
        'name': 'Noemi',
        'surname': 'Monaldo',
        'address': 'Piazza Mercato 14',
        'cap': '97018',
        'city': 'Jungi',
        'province': 'RG'
      },
      {
        'id': 107,
        'name': 'Michele',
        'surname': 'Lucchese',
        'address': 'Via Giotto 18',
        'cap': '37064',
        'city': 'Povegliano Veronese',
        'province': 'VR'
      },
      {
        'id': 108,
        'name': 'Gioacchina',
        'surname': 'Palerma',
        'address': 'Via Alfredo Fusco 41',
        'cap': '26020',
        'city': 'Corte De Cortesi',
        'province': 'CR'
      },
      {
        'id': 109,
        'name': 'Natalino',
        'surname': 'Panicucci',
        'address': 'Via Giberti 73',
        'cap': '10040',
        'city': 'Lombardore',
        'province': 'TO'
      },
      {
        'id': 110,
        'name': 'Rinaldo',
        'surname': 'Fiorentino',
        'address': 'Via Giovanni Amendola 124',
        'cap': '88833',
        'city': 'Caccuri',
        'province': 'KR'
      },
      {
        'id': 111,
        'name': 'Ireneo',
        'surname': 'Loggia',
        'address': 'Viale Maria Cristina di Savoia 116',
        'cap': '51010',
        'city': 'Avaglio',
        'province': 'PT'
      },
      {
        'id': 112,
        'name': 'Leda',
        'surname': 'Monaldo',
        'address': 'Via Nuova del Campo 88',
        'cap': '98030',
        'city': 'Mongiuffi Melia',
        'province': 'ME'
      },
      {
        'id': 113,
        'name': 'Angelica',
        'surname': 'Mancini',
        'address': 'Via Nicola Mignogna 93',
        'cap': '80040',
        'city': 'Volla',
        'province': 'NA'
      },
      {
        'id': 114,
        'name': 'Demetrio',
        'surname': 'Udinesi',
        'address': 'Via Silvio Spaventa 66',
        'cap': '61100',
        'city': 'Candelara',
        'province': 'PG'
      },
      {
        'id': 115,
        'name': 'Clementina',
        'surname': 'Lettiere',
        'address': 'Via Genova 49',
        'cap': '90040',
        'city': 'San Cipirello',
        'province': 'PA'
      },
      {
        'id': 116,
        'name': 'Vincenzo',
        'surname': 'Calabresi',
        'address': 'Via Matteo Schilizzi 49',
        'cap': '16153',
        'city': 'Genova',
        'province': 'GE'
      },
      {
        'id': 117,
        'name': 'Alide',
        'surname': 'Fallaci',
        'address': 'Via Giotto 73',
        'cap': '37010',
        'city': 'Pastrengo',
        'province': 'VR'
      },
      {
        'id': 118,
        'name': 'Daphne',
        'surname': 'Milanesi',
        'address': 'Piazzetta Concordia 31',
        'cap': '43018',
        'city': 'Sissa',
        'province': 'PR'
      },
      {
        'id': 119,
        'name': 'Bellino',
        'surname': 'Barese',
        'address': 'Discesa Gaiola 62',
        'cap': '85048',
        'city': 'Rotonda',
        'province': 'PZ'
      },
      {
        'id': 120,
        'name': 'Libera Maria',
        'surname': 'Calabrese',
        'address': 'Via Torre di Mezzavia 45',
        'cap': '22070',
        'city': 'Appiano Gentile',
        'province': 'CO'
      },
      {
        'id': 121,
        'name': 'Stanislao',
        'surname': 'Siciliano',
        'address': 'Via Campi Flegrei 36',
        'cap': '70053',
        'city': 'Canosa Di Puglia',
        'province': 'BA'
      },
      {
        'id': 122,
        'name': 'Gioacchino',
        'surname': 'Lori',
        'address': 'Via Miguel de Cervantes 8',
        'cap': '33070',
        'city': 'Polcenigo',
        'province': 'PN'
      },
      {
        'id': 123,
        'name': 'Aida',
        'surname': 'Padovesi',
        'address': 'Corso Novara 36',
        'cap': '08100',
        'city': 'Monte Ortobene',
        'province': 'NU'
      },
      {
        'id': 124,
        'name': 'Dimitri',
        'surname': 'Udinese',
        'address': 'Corso Alcide De Gasperi 64',
        'cap': '70045',
        'city': 'Torre A Mare',
        'province': 'BA'
      },
      {
        'id': 125,
        'name': 'Ovidio',
        'surname': 'Milani',
        'address': 'Corso Porta Borsari 55',
        'cap': '38020',
        'city': 'Mestriago',
        'province': 'TN'
      },
      {
        'id': 126,
        'name': 'Clemente',
        'surname': 'Palermo',
        'address': 'Lungodora Napoli 91',
        'cap': '36050',
        'city': 'Bressanvido',
        'province': 'VI'
      },
      {
        'id': 127,
        'name': 'Giulio',
        'surname': 'Castiglione',
        'address': 'Via Adua 65',
        'cap': '10078',
        'city': 'Altessano',
        'province': 'TO'
      },
      {
        'id': 128,
        'name': 'Gioele',
        'surname': 'Bergamaschi',
        'address': 'Via Nolana 22',
        'cap': '19132',
        'city': 'Marola',
        'province': 'SP'
      },
      {
        'id': 129,
        'name': 'Lodovica',
        'surname': 'Bianchi',
        'address': 'Via San Domenico 80',
        'cap': '39050',
        'city': 'Glaning',
        'province': 'BZ'
      },
      {
        'id': 130,
        'name': 'Marcello',
        'surname': 'Sagese',
        'address': 'Via del Carmine 126',
        'cap': '36021',
        'city': 'Ponte Di Barbarano',
        'province': 'VI'
      },
      {
        'id': 131,
        'name': 'Nilde',
        'surname': 'Manfrin',
        'address': 'Corso Vittorio Emanuale 119',
        'cap': '33090',
        'city': 'Colle',
        'province': 'PN'
      },
      {
        'id': 132,
        'name': 'Matteo',
        'surname': 'Manfrin',
        'address': 'Via Carlo Alberto 72',
        'cap': '22030',
        'city': 'Caglio',
        'province': 'CO'
      },
      {
        'id': 133,
        'name': 'Tarquinia',
        'surname': 'Rizzo',
        'address': 'Discesa Gaiola 109',
        'cap': '85024',
        'city': 'Lavello',
        'province': 'PZ'
      },
      {
        'id': 134,
        'name': 'Alvaro',
        'surname': 'Greco',
        'address': 'Via Partenope 140',
        'cap': '03030',
        'city': 'Anitrella',
        'province': 'FR'
      },
      {
        'id': 135,
        'name': 'Marina',
        'surname': 'Rossi',
        'address': 'Via Giulio Petroni 56 ',
        'cap': '24010',
        'city': 'Dossena',
        'province': 'BG'
      },
      {
        'id': 136,
        'name': 'Bonifacio',
        'surname': 'Greece',
        'address': 'Via Pasquale Scura 33',
        'cap': '75015',
        'city': 'Pisticci Scalo',
        'province': 'MT'
      },
      {
        'id': 137,
        'name': 'Bertoldo',
        'surname': 'Pisani',
        'address': 'Piazzetta Concordia 29 ',
        'cap': '43027',
        'city': 'San Prospero Parmense',
        'province': 'PR'
      },
      {
        'id': 138,
        'name': 'Eugenia',
        'surname': 'Fanucci',
        'address': 'Via delle Mura Gianicolensi 81',
        'cap': '86028',
        'city': 'Torella Del Sannio',
        'province': 'CB'
      },
      {
        'id': 139,
        'name': 'Dionisia',
        'surname': 'Barese',
        'address': 'Viale Ippocrate 12',
        'cap': '22070',
        'city': 'Valmorea',
        'province': 'CO'
      },
      {
        'id': 140,
        'name': 'Adelfina',
        'surname': 'Napolitani',
        'address': 'Vicolo Calcirelli 77',
        'cap': '38030',
        'city': 'Castello Di Fiemme',
        'province': 'TN'
      },
      {
        'id': 141,
        'name': 'Teresio',
        'surname': 'Beneventi',
        'address': 'Via Antonio Beccadelli 104 ',
        'cap': '73039',
        'city': 'Tutino',
        'province': 'LE'
      },
      {
        'id': 142,
        'name': 'Severino',
        'surname': 'Piazza',
        'address': 'Via Antonio Cecchi 41 ',
        'cap': '13030',
        'city': 'Albano Vercellese',
        'province': 'VC'
      },
      {
        'id': 152,
        'name': 'Ivano',
        'surname': 'Lettiere',
        'address': 'Via Agostino Depretis 92',
        'cap': '16032',
        'city': 'Camogli',
        'province': 'GE'
      },
      {
        'id': 153,
        'name': 'Romeo',
        'surname': 'Udinese',
        'address': 'Vico Giganti 52',
        'cap': '06040',
        'city': 'Beroide',
        'province': 'PG'
      },
      {
        'id': 154,
        'name': 'Frida',
        'surname': 'Padovesi',
        'address': 'Via Spalato 48',
        'cap': '30010',
        'city': 'Cona',
        'province': 'VE'
      },
      {
        'id': 155,
        'name': 'Neera',
        'surname': 'Castiglione',
        'address': 'Via Spalato 78',
        'cap': '30021',
        'city': 'Ca Corniani',
        'province': 'VE'
      },
      {
        'id': 156,
        'name': 'Lamberto',
        'surname': 'Calabresi',
        'address': 'Strada Provinciale 65 58',
        'cap': '24060',
        'city': 'Castelli Calepio',
        'province': 'BG'
      },
      {
        'id': 157,
        'name': 'Ferruccio',
        'surname': 'Manna',
        'address': 'Via Palermo 22',
        'cap': '98152',
        'city': 'Scala Ritiro',
        'province': 'ME'
      },
      {
        'id': 158,
        'name': 'Ivana',
        'surname': 'Pagnotto',
        'address': 'Via Miguel de Cervantes 81',
        'cap': '33170',
        'city': 'Pordenone',
        'province': 'PN'
      },
      {
        'id': 159,
        'name': 'Ippolito',
        'surname': 'Palermo',
        'address': 'Via Foria 62',
        'cap': '47030',
        'city': 'Gatteo',
        'province': 'FO'
      },
      {
        'id': 160,
        'name': 'Manlio',
        'surname': 'Udinesi',
        'address': 'Via Giacinto Gigante 46',
        'cap': '41050',
        'city': 'Pieve Di Trebbio',
        'province': 'MO'
      },
      {
        'id': 161,
        'name': 'Carmelo',
        'surname': 'Moretti',
        'address': 'Via Nicola Mignogna 72',
        'cap': '28010',
        'city': 'Agrate Conturbia',
        'province': 'NO'
      },
      {
        'id': 238,
        'name': 'Rosa',
        'surname': 'Barese',
        'address': 'Via Goffredo Mameli 127',
        'cap': '47900',
        'city': 'Bellariva',
        'province': 'RN'
      },
      {
        'id': 239,
        'name': 'Davide',
        'surname': 'Marcelo',
        'address': 'Via di Santa Melania 125',
        'cap': '39031',
        'city': 'Reischach',
        'province': 'BZ'
      },
      {
        'id': 240,
        'name': 'Palmira ',
        'surname': 'De Luca',
        'address': 'Via Nazario Sauro 133',
        'cap': '20088',
        'city': 'Gudo Visconti',
        'province': 'MI'
      },
      {
        'id': 241,
        'name': 'Abelino',
        'surname': 'Sabbatini',
        'address': 'Via Alessandro Farnese 80',
        'cap': '39050',
        'city': 'Deutschnofen',
        'province': 'BZ'
      },
      {
        'id': 242,
        'name': 'Gaetana',
        'surname': 'Lo Duca',
        'address': 'Via delle Coste 37',
        'cap': '02010',
        'city': 'Morro Reatino',
        'province': 'RI'
      },
      {
        'id': 243,
        'name': 'Veneranda',
        'surname': 'Marchesi',
        'address': 'Via Galvani 68',
        'cap': '00020',
        'city': 'Vivaro Romano',
        'province': 'RM'
      },
      {
        'id': 244,
        'name': 'Delinda',
        'surname': 'Udinese',
        'address': 'Strada Statale 56',
        'cap': '13886',
        'city': 'Viverone',
        'province': 'BI'
      },
      {
        'id': 245,
        'name': 'Alfredino',
        'surname': 'Rizzo',
        'address': 'Piazza San Carlo 81',
        'cap': '13033',
        'city': 'Costanzana',
        'province': 'VC'
      },
      {
        'id': 246,
        'name': 'Baldo',
        'surname': 'Buccho',
        'address': 'Via Antonio Cecchi 103',
        'cap': '30135',
        'city': 'Venezia',
        'province': 'VE'
      },
      {
        'id': 247,
        'name': 'Petronio',
        'surname': 'Bellucci',
        'address': 'Piazza San Carlo 19',
        'cap': '13017',
        'city': 'Quarona',
        'province': 'VC'
      },
      {
        'id': 248,
        'name': 'Uberto',
        'surname': 'Trentini',
        'address': 'Via Domenico Morelli 73',
        'cap': '65010',
        'city': 'Nocciano',
        'province': 'PE'
      },
      {
        'id': 249,
        'name': 'Gildo',
        'surname': 'Barese',
        'address': 'Stradone Antonio Provolo 136',
        'cap': '05034',
        'city': 'Ferentillo',
        'province': 'TR'
      }
    ];

    let index = 0;
    for (const x of data) {
      x.id = ++index;
    }

    return data;
  }

}

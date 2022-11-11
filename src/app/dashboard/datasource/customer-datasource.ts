import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { catchError, finalize } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { CustomerSearch } from '../model/customer-search';
import { CustomerDto } from '../model/customer-dto';
import { BaseDataSourceServer } from '../../appcore/datasource/basedatasourceserver';
import { ApiCustomerService } from '../service/api-customer.service';

export class CustomerDataSource extends BaseDataSourceServer<CustomerSearch, CustomerDto, ApiCustomerService> {
  constructor(service: ApiCustomerService, search?: CustomerSearch) {
    super(service, search);
    this.result = { count: 0 };
  }
}

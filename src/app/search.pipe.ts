import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: any, searchText?: any): any {
    console.log(items , searchText);
    if(! items) { return [] }
    if(!searchText) { return items}
    searchText = searchText.toLowerCase();
    console.log(items , searchText);
    return items.filter( it => {
    	console.log(it);
      if(it.name || it.companyName || it.address.country || it.email)
    	return ((it.name.toLowerCase().includes(searchText)) || (it.companyName.toLowerCase().includes(searchText)) || (it.address.country.toLowerCase().includes(searchText)) || (it.email.toLowerCase().includes(searchText)));
      else
        return (it.name.toLowerCase().includes(searchText));
    });
  }
  dashboardTransform(items: any, searchText?: any): any {
    console.log(items , searchText);
    if(! items) { return [] }
    if(!searchText) { return items}
    searchText = searchText.toLowerCase();
    console.log(items , searchText);
    return items.filter( it => {
      console.log(it);
      if(it.userId.name || it.userId.companyName || it.userId.address.country || it.userId.email)
      return ((it.userId.name.toLowerCase().includes(searchText)) || (it.invoiceId == searchText) || (it.userId.companyName.toLowerCase().includes(searchText)) || (it.totalAmount == searchText));
      else
        return ((it.userId.name.toLowerCase().includes(searchText)) || (it.invoiceId == searchText) || (it.userId.companyName.toLowerCase().includes(searchText)));
    });
  }

  clientWiseInvoiceTransform(items: any, searchText?: any): any {
    console.log(items , searchText);
    if(! items) { return [] }
    if(!searchText) { return items}
    searchText = searchText.toLowerCase();
    console.log(items , searchText);
    return items.filter( it => {
      console.log(it);
      return ((it.totalAmount == searchText) || (it.invoiceId == searchText));
    });
  }

}

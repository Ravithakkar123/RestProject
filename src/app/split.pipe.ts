import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'split'
})
export class SplitPipe implements PipeTransform {

  transform(value: any, args?: any): any {
  	console.log("value =========++>", value);
  	value = value.split(/\s|\|/)[0];
  	return value
  	
    // return null;
  }

}

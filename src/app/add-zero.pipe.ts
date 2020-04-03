import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addZero'
})
export class AddZeroPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    console.log("value" , value);
    var my_string = '' + value;
    while (my_string.length < 5) {
    	my_string = '0' + my_string;
    }
    console.log("my_string ===>", my_string);
    return my_string;
  }

}

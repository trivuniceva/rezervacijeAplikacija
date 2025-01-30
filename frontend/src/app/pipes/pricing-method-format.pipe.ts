import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pricingMethodFormat',
  standalone: true
})
export class PricingMethodFormatPipe implements PipeTransform {

  transform(value: string): string {
    const mapping: { [key: string]: string } = {
      'PER_UNIT': 'Per Unit',
      'PER_GUEST': 'Per Guest',
    };

    return mapping[value] || value;
  }
}

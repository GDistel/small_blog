import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sliceWithDots'
})
export class SliceWithDotsPipe implements PipeTransform {
  transform(
    value: string | null | undefined, end: number
  ): string | null {
    if (value == null || end < 1) return null;
    const suffix = value && value.length > end ? '...' : '';
    return value.slice(0, end) + suffix;
  }
}

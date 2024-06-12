import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'removeHtml',
    standalone: true,
})
export class RemoveHtmlPipe implements PipeTransform {
    transform(value: string): string {
        return value.replace(/<[^>]*>/g, '');
    }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'clipText',
    standalone: true,
})
export class ClipTextPipe implements PipeTransform {
    transform(
        value: string,
        limit: number = 100,
        trail: string = '...'
    ): string {
        if (value.length <= limit) {
            return value;
        }
        return value.substring(0, limit) + trail;
    }
}

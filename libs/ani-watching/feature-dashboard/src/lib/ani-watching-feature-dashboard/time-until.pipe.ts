import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'timeUntil', standalone: true })
export class TimeUntilPipe implements PipeTransform {
  transform(seconds: number): string {
    const timeUntilParts: string[] = [];
    const days = Math.floor(seconds / 86400);
    if (days > 0) {
      timeUntilParts.push(`${days}d`);
    }
    const hours = Math.floor((seconds - days * 86400) / 3600);
    if (hours > 0) {
      timeUntilParts.push(`${hours}h`);
    }
    const minutes = Math.floor((seconds - days * 86400 - hours * 3600) / 60);
    if (minutes > 0) {
      timeUntilParts.push(`${minutes}m`);
    }
    return timeUntilParts.join(' ');
  }
}

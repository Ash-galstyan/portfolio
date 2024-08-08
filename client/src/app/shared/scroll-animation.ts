import { trigger, animate, style, group, query, transition } from '@angular/animations';

export const scrollAnimation = trigger('scrollAnimation', [
  transition('* => *', [
    query(':enter', [
      style({ opacity: 0, transform: 'translateY(-50px)' }),
      animate('2s ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
    ], { optional: true }),
  ]),
]);
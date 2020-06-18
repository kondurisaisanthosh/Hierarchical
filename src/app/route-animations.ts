import{
trigger,
transition,
style,
query,
group,
animateChild,
animate,
keyframes
}from '@angular/animations';

export const fader=
    trigger('routeAnimations',[
        transition('users <=> home', [
            query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
            group([
                query(':enter', [
                    style({ transform: 'translateX(100%)' }),
                    animate('1.2s ease-in-out', style({ transform: 'translateX(0%)' }))
                ], { optional: true }),
                query(':leave', [
                    style({ transform: 'translateX(0%)' }),
                    animate('1.2s ease-in-out', style({ transform: 'translateX(-150%)' }))
                ], { optional: true }),
            ])
        ]),
         transition('home <=> users', [
            query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
            group([
                query(':enter', [
                    style({ transform: 'translateX(100%)' }),
                    animate('1.2s ease-in-out', style({ transform: 'translateX(0%)' }))
                ], { optional: true }),
                query(':leave', [
                    style({ transform: 'translateX(0%)' }),
                    animate('1.2s ease-in-out', style({ transform: 'translateX(-150%)' }))
                ], { optional: true }),
            ])
        ]),
    ])
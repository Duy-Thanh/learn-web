import { trigger, transition, style, animate, query } from '@angular/animations';

// You can use this thing whenever you import "slideInAnimation" from './animation.ts'
export const slideInAnimation =
  // conditions to trigger animation
  trigger('routeAnimations', [
    // Transition animation (occured when switch between webpages)
    transition('* <=> *', [ // From what to what?
        // Finds one or more inner elements within the current element that is 
        // being animated within a sequence. 
        //
        // Use with animate() only.
        //
        // Select "enter" and "leave" action
        //
        // Will change CSS secion that selected by query()
      query(':enter, :leave', [
        style({
            /** 
             * CSS-styled converted to TypeScript
             */
          position: 'absolute',
          width: '100%',
          opacity: 0, // Transparency
          transform: 'scale(0.95) translateY(20px)' // Animation transform type
        })
      ], { optional: true }), // this animation is not required
      query(':enter', [
        animate('300ms ease',
          style({
            opacity: 1,
            transform: 'scale(1) translateY(0)'
          })
        )
      ], { optional: true }) // this animation is not required
    ])
  ]);

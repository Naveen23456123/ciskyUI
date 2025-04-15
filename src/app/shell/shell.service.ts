import { Routes, Route } from '@angular/router';
import { ShellComponent } from './shell.component';


/**
 * Provied helper methods to create routes.
 */
export class Shell {

  /**
   * Create Routes using shell component and authentication.
   * @param routes The routes to add.
   * @return The new route using shell as a base.
   */
  static childRoutes(routes: Routes): Route {
    return {
      path: '',
      component: ShellComponent,
      children: routes,
      // Reuse shell instance when navigating between child views
      data: { reuse: true }
    };
  }

}

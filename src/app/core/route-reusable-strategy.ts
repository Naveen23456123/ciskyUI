import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';
import { Injectable } from "@angular/core";

/**
 * A route strategy allowing for explicit route reuse.
 * used as a workaround for https://github.com/angular/angular/issues/18374
 * To reuse a given route , add `data: { reuse: true }' to the route definition.
 */
@Injectable()
export class RouteReusableStrategy extends RouteReuseStrategy {

    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        return false;
    }
    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {

    }
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        return false;
    }
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {       
        return  {};
    }
    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        return future.routeConfig == curr.routeConfig;
    }

}

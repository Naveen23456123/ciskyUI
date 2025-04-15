import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


const untilDestroyedSymbol = Symbol('untilDestroyed');

export function untilDestroyed(instance: any, destroyMethodName: string = 'ngOnDestroy') {
    return <T>(source : Observable<T>) => {
        const originalDestroy = instance[destroyMethodName];
        const hasDestroyedFunction = typeof originalDestroy === 'function';

        if (!hasDestroyedFunction) {
            throw new Error(`${instance.constructor.name} is using untilDestroyed, but does not implemented ${destroyMethodName}`);
        }

        if (!instance[untilDestroyedSymbol]) {

            instance[untilDestroyedSymbol] = new Subject();

            instance[destroyMethodName] = function () {
                if (hasDestroyedFunction) {
                    originalDestroy.apply(this, arguments);
                }
                instance[untilDestroyedSymbol].next();
                instance[untilDestroyedSymbol].complete();
            }
        }
        return source.pipe(takeUntil<T>(instance[untilDestroyedSymbol]));

    }
}
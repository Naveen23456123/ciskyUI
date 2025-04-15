import { Constants } from '../constant.config';

export enum Operation {
    CREATE,
    UPDATE,
    DELETE,
    GET,
    INVALID,
    PATCH
}
export class ActionType {

    public getAction(action: Operation): string {

        switch (action) {
            case Operation.DELETE: return Constants.delete;
            case Operation.CREATE: return Constants.create;
            case Operation.GET: return Constants.get;
            case Operation.UPDATE: return Constants.update;
            default: return Constants.invalid;
        }
    }
}

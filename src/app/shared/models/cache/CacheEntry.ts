import { HttpResponse } from '@angular/common/http';

export interface HttpCaheEntry {
    lastUpdated: Date;
    data: HttpResponse<any>;
}

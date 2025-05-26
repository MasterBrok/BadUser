import { map, Observable } from "rxjs";
import { KvViewModel } from "../../models/KvViewModel";
import { ApiService } from "./api.service";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class ApiCall {

    constructor(private api: ApiService) { }
    public genders(): Observable<KvViewModel[]> {
        return this.api.get<KvViewModel[]>('Gender/ShortGenders')
            .pipe(map((res) => {
                console.log(res);
                if (res.httpCode === 200) {
                    return res.response;
                }
                else
                    throw new Error('Genders is null');
            }));
    }

    public avatars(): Observable<KvViewModel[]> {
        return this.api.get<KvViewModel[]>('Avatar/ShortPlayerAvatars')
            .pipe(map((res) => {
                if (res.httpCode === 200) {
                    return res.response;
                }
                else
                    throw new Error('Avatars is null');
            }));
    }

}
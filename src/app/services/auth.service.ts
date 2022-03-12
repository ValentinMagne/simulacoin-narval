import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(private readonly http: HttpClient) {
  }

  public login(authUrl: string): Observable<any> {
    return this.http.post(authUrl, {username: "simulacoin", password: "azerty"})
      .pipe(
        map((authResult: any) => {
          AuthService.setSession(authResult);
        })
      );
  }

  public logout() {
    localStorage.removeItem("id_token");
  }

  private static setSession(authResult: { token: string }) {
    localStorage.setItem('id_token', authResult.token);
  }
}

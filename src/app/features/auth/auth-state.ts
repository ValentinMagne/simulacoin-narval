import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthService } from '../../common/services/auth.service';
import { AuthStateModel } from './auth-state-model';
import { Login } from './login';
import { Logout } from './logout';

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    token: null,
    username: null
  }
})
@Injectable()
export class AuthState {
  @Selector()
  static token(state: AuthStateModel): string | null {
    return state.token;
  }

  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return !!state.token;
  }

  constructor(private readonly authService: AuthService) {
  }

  @Action(Login)
  public login(ctx: StateContext<AuthStateModel>, action: Login) {
    return this.authService.login(action.payload.username, action.payload.password).pipe(
      tap((token: string) => {
        ctx.patchState({
          token,
          username: action.payload.username
        });
      })
    );
  }

  @Action(Logout)
  public logout(ctx: StateContext<AuthStateModel>): Observable<boolean> {
    return this.authService.logout().pipe(
      tap(() => {
        ctx.setState({
          token: null,
          username: null
        });
      })
    );
  }
}

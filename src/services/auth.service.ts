import Axios from "axios-observable";
import { forkJoin, from, map, mergeMap, Observable, of, pipe, ReplaySubject, take, tap, throwError } from "rxjs";
import { ActionAuthAuthenticated, ActionAuthLoadUser, ActionAuthUnauthenticated } from "../app/core/auth/auth.actions";
import { defaultHttpOptions } from "../app/core/http/http-utils";
import { AuthPayload } from "../app/core/auth/auth.models";
import { LoginRequest, LoginResponse, PublicLoginRequest } from "../models/login.models";
// import store from "../store";
import { getCurrentAuthState, getCurrentAuthUser } from "../app/core/auth/auth.selectors";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { api, axiosForJava } from "./api";
import { UtilsService } from "./utils.service";
import { Authority } from "src/models/authority.enum";
import { AuthUser } from "src/models/user.model";
import { UserService } from "./user.service";
import { Console } from "console";
import { createAction, Store } from "@reduxjs/toolkit";
import { useDispatch, useStore } from "react-redux"
import { authHeader } from "./auth-header";
import { AppState } from "src/app/core/core.state";
import { axiosInstance } from "src/app/core/interceptor/global-http-interceptor";
import { WhiteLabel } from "src/models/white-label.model";
import { ActionSettingsChangeLanguage } from "src/app/core/settings/settings.actions";
import { ActionClearWhiteLabel, ActionLoadWhiteLabel } from "src/app/core/white-label/white-label.actions";
import { WhiteLabelService } from "./white-label.service";
import { axiosInstance as axios } from "src/app/core/interceptor/global-http-interceptor";
const jwt = require('jsonwebtoken');

// const dispatch = useDispatch();

export class AuthService {

  private utilsService = new UtilsService(window);
  private static refreshTokenSubject: ReplaySubject<LoginResponse> = null;
  private userService = new UserService();
  private whiteLabelService = new WhiteLabelService()
  // private globalHttpInterceptor = new GlobalHttpInterceptor();
  // private http = this.globalHttpInterceptor.httpClient();
  // private jwtHelper = new jwthelp();
  private store: Store<AppState> = useStore();
  private dispatch = useDispatch();
  readonly navigate = useNavigate();
  // static refreshTokenSubject: any;


  public static getJwtToken() {
    return AuthService._storeGet('jwt_token');
  }

  private static isTokenValid(prefix: string) {
    const clientExpiration = AuthService._storeGet(prefix + '_expiration');
    return clientExpiration && Number(clientExpiration) > (new Date().valueOf() + 2000);
  }

  readonly login = (loginRequest: LoginRequest) => {
    return from(axiosInstance.post<LoginResponse>('/api/auth/login', loginRequest))
      .pipe(
        map(axiosResponse => {
          return axiosResponse.data
        }),
        tap((loginResponse: LoginResponse) => {
          this.setUserFromJwtToken(loginResponse.token, loginResponse.refreshToken, true)

        }, error => {
          console.log(error)
        }),
      );
  }


  readonly publicLogin = (publicId: string) => {
    const publicLoginRequest: PublicLoginRequest = {
      publicId
    };
    return axiosInstance.post<LoginResponse>('/api/auth/login/public', publicLoginRequest);
  }

  readonly activate = (activateToken: string, password: string, sendActivationMail: boolean): Observable<LoginResponse> => {
    return Axios.post<LoginResponse>(`/api/noauth/activate?sendActivationMail=${sendActivationMail}`,
      { activateToken, password }, defaultHttpOptions()).pipe(
        map(axiosResponse => axiosResponse.data),
        tap((loginResponse: LoginResponse) => {
          this.setUserFromJwtToken(loginResponse.token, loginResponse.refreshToken, true);
        }
        ));
  }


  readonly changePassword = (currentPassword: string, newPassword: string) => {
    return Axios.post('/api/auth/changePassword',
      { currentPassword, newPassword }, defaultHttpOptions());
  }

  readonly activateByEmailCode = (emailCode: string): Observable<LoginResponse> => {
    return Axios.post<LoginResponse>(`/api/noauth/activateByEmailCode?emailCode=${emailCode}`,
      null, defaultHttpOptions()).pipe(
        map(axiosResponse => axiosResponse.data)
      );
  }

  readonly resendEmailActivation = (email: string) => {
    const encodeEmail = encodeURIComponent(email);
    return Axios.post(`/api/noauth/resendEmailActivation?email=${encodeEmail}`,
      null, defaultHttpOptions());
  }

  readonly loginAsUser = (userId: string) => {
    return Axios.get<LoginResponse>(`/api/user/${userId}/token`, defaultHttpOptions()).pipe(
      map(axiosResponse => axiosResponse.data),
      tap((loginResponse: LoginResponse) => {
        this.setUserFromJwtToken(loginResponse.token, loginResponse.refreshToken, true);
      }
      ));
  }


  readonly logout = (captureLastUrl: boolean = false) => {
    // if (captureLastUrl) {
    //   this.redirectUrl = this.router.url;
    // }
    let data = authHeader();


    from(axiosInstance.post('/api/auth/logout', null))
      .subscribe(() => {
        this.clearJwtToken()
      }, () => {
        this.clearJwtToken()
      })


    // from(axiosForJava.post('/api/auth/logout', null, data))
    //   .subscribe(() => {
    //     this.clearJwtToken()
    //   }, () => {
    //     this.clearJwtToken()
    //   })
  }


  public async reloadUser() {
    const authPayload = await this.loadUser(true).toPromise();
    console.log(authPayload)
    if (authPayload) {
      this.notifyAuthenticated(authPayload);
      this.notifyUserLoaded(true);
      console.log('start1')
    } else {
      this.notifyUnauthenticated();
      this.notifyUserLoaded(true);
      console.log('start2')
    }

    // this.loadUser(true).subscribe(
    //   (authPayload) => {
    //     this.notifyAuthenticated(authPayload);
    //     this.notifyUserLoaded(true);
    //     console.log('start1')
    //   },
    //   () => {
    //     this.notifyUnauthenticated();
    //     this.notifyUserLoaded(true);
    //     console.log('start2')
    //   }
    // );
  }

  readonly notifyUserLoaded = (isUserLoaded: boolean) => {
    // ActionAuthLoadUser(isUserLoaded)
    // createAction('[Auth] Load User', () => {
    //   return {
    //     payload: { isUserLoaded: isUserLoaded }
    //   }
    // })
    this.dispatch(ActionAuthLoadUser(isUserLoaded));
    console.log(this.store.getState())
  }

  readonly gotoDefaultPlace = (isAuthenticated: boolean) => {
    const authState = getCurrentAuthState(this.store);
    // const url = defaultUrl(isAuthenticated, authState);

    this.navigate('/home')
    // this.zone.run(() => {
    //   this.router.navigateByUrl(url);
    // });
  }

  // const loadOAuth2Clients = (): Observable<Array<OAuth2ClientInfo>> => {
  //   return this.http.post<Array<OAuth2ClientInfo>>(`/api/noauth/oauth2Clients`,
  //     null, defaultHttpOptions()).pipe(
  //       catchError(err => of([])),
  //       tap((OAuth2Clients) => {
  //         this.oauth2Clients = OAuth2Clients;
  //       })
  //     );
  // }


  readonly clearJwtToken = () => {
    this.setUserFromJwtToken(null, null, true);
  }

  readonly clearTokenData = () => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('jwt_token_expiration');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('refresh_token_expiration');
  }

  //redux
  readonly notifyUnauthenticated = () => {
    this.dispatch(ActionAuthUnauthenticated());
  }
  readonly notifyAuthenticated = (authPayload: AuthPayload) => {
    this.dispatch(ActionAuthAuthenticated(authPayload));
  }
  readonly notifyUserLang = (userLang: string) => {
    this.dispatch(ActionSettingsChangeLanguage(userLang));
  }

  readonly notifyWhiteLabel = (whiteLabel: WhiteLabel) => {
    this.dispatch(ActionLoadWhiteLabel(whiteLabel));
  }

  readonly notifyClearWhiteLabel = () => {
    this.dispatch(ActionClearWhiteLabel());
  }

  //redux
  public loadUser = (doTokenRefresh: boolean): Observable<AuthPayload> => {

    const authUser = getCurrentAuthUser(this.store);
    if (!authUser) {
      const publicId = this.utilsService.getQueryParam('publicId');
      const accessToken = this.utilsService.getQueryParam('accessToken');
      const refreshToken = this.utilsService.getQueryParam('refreshToken');
      const username = this.utilsService.getQueryParam('username');
      const password = this.utilsService.getQueryParam('password');
      const loginError = this.utilsService.getQueryParam('loginError');

      if (publicId) {
        return from(this.publicLogin(publicId)).pipe(
          map(axiosResponse => {
            return axiosResponse.data
          }),
          mergeMap(loginResponse => {

            this.updateAndValidateTokens(loginResponse.token, loginResponse.refreshToken, false);
            return this.procceedJwtTokenValidate();
          })
        )
      }
      else if (accessToken) {
        this.utilsService.updateQueryParam('accessToken', null);
        if (refreshToken) {
          this.utilsService.updateQueryParam('refreshToken', null);
        }
        try {
          this.updateAndValidateToken(accessToken, 'jwt_token', false);
          if (refreshToken) {
            this.updateAndValidateToken(refreshToken, 'refresh_token', false);
          } else {
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('refresh_token_expiration');
          }
        } catch (e) {

          return throwError(e);
        }
        return this.procceedJwtTokenValidate();
      } else if (username && password) {
        this.utilsService.updateQueryParam('username', null);
        this.utilsService.updateQueryParam('password', null);
        const loginRequest: LoginRequest = {
          username,
          password
        };

        return from(axiosInstance.post<LoginResponse>('/api/auth/login', loginRequest, defaultHttpOptions())).pipe(
          map(axiosResponse => {
            return axiosResponse.data
          }),
          mergeMap((loginResponse: LoginResponse) => {
            this.updateAndValidateTokens(loginResponse.token, loginResponse.refreshToken, false);
            return this.procceedJwtTokenValidate();

          })

        )
          ;
      } else if (loginError) {
        this.showLoginErrorDialog(loginError);
        this.utilsService.updateQueryParam('loginError', null);
        return throwError(Error());
      }

      return this.procceedJwtTokenValidate(doTokenRefresh);
    } else {
      console.log('no')
      return of({} as AuthPayload);
    }
  }


  private showLoginErrorDialog(loginError: string) {
    // this.translate.get(['login.error', 'action.close']).subscribe(
    //   (translations) => {
    //     const dialogConfig: MatDialogConfig = {
    //       disableClose: true,
    //       data: {
    //         title: translations['login.error'],
    //         message: loginError,
    //         ok: translations['action.close']
    //       }
    //     };
    //     this.dialog.open(AlertDialogComponent, dialogConfig);
    //   }
    // );
  }

  private static _storeGet(key: string) {
    return localStorage.getItem(key);
  }

  public static refreshTokenPending() {
    return this.refreshTokenSubject !== null;
  }

  public static isJwtTokenValid() {
    return AuthService.isTokenValid('jwt_token');
  }


  public refreshJwtToken(loadUserElseStoreJwtToken = true): Observable<LoginResponse> {
    let response: Observable<LoginResponse> = AuthService.refreshTokenSubject;
    if (AuthService.refreshTokenSubject === null) {
      AuthService.refreshTokenSubject = new ReplaySubject<LoginResponse>(1);
      response = AuthService.refreshTokenSubject;
      const refreshToken = AuthService._storeGet('refresh_token');
      const refreshTokenValid = AuthService.isTokenValid('refresh_token');
      this.setUserFromJwtToken(null, null, false);
      if (!refreshTokenValid) {
        AuthService.refreshTokenSubject = null;

        //TRANSLATE
        // this.translate.get('access.refresh-token-expired').subscribe(
        //   (translation) => {
        //     this.refreshTokenSubject.error(new Error(translation));
        //     this.refreshTokenSubject = null;
        //   }
        // );
      } else {
        const refreshTokenRequest = {
          refreshToken
        };
        const refreshObservable = from(axiosInstance.post<LoginResponse>('/api/auth/token', refreshTokenRequest, defaultHttpOptions()));
        refreshObservable.subscribe((loginResponse) => {
          if (loadUserElseStoreJwtToken) {
            this.setUserFromJwtToken(loginResponse.data.token, loginResponse.data.refreshToken, false);
          } else {
            this.updateAndValidateTokens(loginResponse.data.token, loginResponse.data.refreshToken, true);
          }
          AuthService.refreshTokenSubject.next(loginResponse.data);
          AuthService.refreshTokenSubject.complete();
          AuthService.refreshTokenSubject = null;
        }, () => {
          this.clearJwtToken();
          // this.refreshTokenSubject.error(new Error(this.translate.instant('access.refresh-token-failed')));
          AuthService.refreshTokenSubject = null;
        });
      }
    }
    return response;
  }

  private validateJwtToken(doRefresh: boolean | undefined): Observable<void> {
    const subject = new ReplaySubject<void>();
    if (!AuthService.isTokenValid('jwt_token')) {
      if (doRefresh) {
        this.refreshJwtToken(!doRefresh).subscribe(
          () => {
            subject.next();
            subject.complete();
          },
          (err: any) => {
            subject.error(err);
          }
        );
      } else {
        this.clearJwtToken();
        subject.error(null);
      }
    } else {
      subject.next();
      subject.complete();
    }
    return subject;
  }

  private procceedJwtTokenValidate(doTokenRefresh?: boolean): Observable<AuthPayload> {
    const loadUserSubject = new ReplaySubject<AuthPayload>();
    this.validateJwtToken(doTokenRefresh).subscribe(
      () => {
        let authPayload = {} as AuthPayload;
        const jwtToken = AuthService._storeGet('jwt_token');
        authPayload.authUser = jwt.decode(jwtToken);
        console.log(jwtToken)
        console.log(jwt.decode(jwtToken))
        if (authPayload.authUser && authPayload.authUser.scopes && authPayload.authUser.scopes.length) {
          authPayload.authUser.authority = Authority[authPayload.authUser.scopes[0]];
        } else if (authPayload.authUser) {
          authPayload.authUser.authority = Authority.ANONYMOUS;
        }
        if (authPayload.authUser.isPublic) {
          authPayload.forceFullscreen = true;
        }
        console.log(authPayload)
        if (authPayload.authUser.isPublic) {

          this.loadSystemParams(authPayload).subscribe(
            (sysParams) => {
              authPayload = { ...authPayload, ...sysParams };
              loadUserSubject.next(authPayload);
              loadUserSubject.complete();
            },
            (err) => {
              loadUserSubject.error(err);
            }
          );
        } else if (authPayload.authUser.userId) {
          this.userService.getUser(authPayload.authUser.userId, jwtToken).subscribe(
            (user) => {
              authPayload.userDetails = user;

              //Fullscreen
              authPayload.forceFullscreen = false;
              // if (this.userForceFullscreen(authPayload)) {
              //   authPayload.forceFullscreen = true;
              // }

              this.loadSystemParams(authPayload).subscribe(
                (sysParams) => {
                  authPayload = { ...authPayload, ...sysParams };


                  // Translate
                  let userLang;
                  if (authPayload.userDetails.additionalInfo && authPayload.userDetails.additionalInfo.lang) {
                    userLang = authPayload.userDetails.additionalInfo.lang;
                  } else {
                    userLang = null;
                  }


                  //White Label
                  let whiteLabel: WhiteLabel;
                  if (sysParams.whiteLabel && authPayload.userDetails.authority !== Authority.SYS_ADMIN) {
                    whiteLabel = sysParams.whiteLabel;
                  } else {
                    whiteLabel = null;
                  }

                  this.notifyUserLang(userLang);
                  this.notifyWhiteLabel(whiteLabel);
                  loadUserSubject.next(authPayload);
                  loadUserSubject.complete();
                },
                (err) => {
                  console.log(err)
                  loadUserSubject.error(err);
                  this.logout();
                });
            },
            (err) => {
              console.log(err)
              loadUserSubject.error(err);
              this.logout();
            }
          );
        } else {
          loadUserSubject.error(null);
        }
      },
      (err) => {

        loadUserSubject.error(err);
      }
    );
    return loadUserSubject;
  }


  private loadIsUserTokenAccessEnabled(authUser: AuthUser): Observable<boolean> {
    if (authUser.authority === Authority.SYS_ADMIN ||
      authUser.authority === Authority.TENANT_ADMIN) {

      return from(axiosInstance.get<boolean>('/api/user/tokenAccessEnabled')).pipe(map(axiosResponse => { return axiosResponse.data }));
    } else {
      return of(false);
    }
  }


  // private fetchAllowedDashboardIds(authPayload: AuthPayload): Observable<string[]> {
  //   if (authPayload.forceFullscreen && (authPayload.authUser.authority === Authority.TENANT_ADMIN || authPayload.authUser.authority === Authority.TENANT_USER
  //     || authPayload.authUser.authority === Authority.CUSTOMER_ADMIN || authPayload.authUser.authority === Authority.CUSTOMER_USER)) {
  //     const pageLink = new PageLink(100);
  //     let fetchDashboardsObservable: Observable<PageData<DashboardInfo>>;
  //     if (authPayload.authUser.authority === Authority.TENANT_ADMIN) {
  //       fetchDashboardsObservable = this.dashboardService.getTenantDashboards(pageLink);
  //     } else {
  //       fetchDashboardsObservable = this.dashboardService.getCustomerDashboards(authPayload.authUser.customerId, pageLink);
  //     }
  //     return fetchDashboardsObservable.pipe(
  //       map((result) => {
  //         const dashboards = result.data;
  //         return dashboards.map(dashboard => dashboard.id.id);
  //       })
  //     );
  //   } else {
  //     return of([]);
  //   }
  // }
  private loadSystemParams(authPayload: AuthPayload): Observable<any> {
    const isSysAdmin: Boolean = authPayload.authUser.authority === Authority.SYS_ADMIN;
    const sources: Array<Observable<any>> = [this.loadIsUserTokenAccessEnabled(authPayload.authUser),

      //Dashboard
      // this.fetchAllowedDashboardIds(authPayload),

      //time
      // this.timeService.loadMaxDatapointsLimit()
    ];
    if (!isSysAdmin) {

      //white label
      sources.push(this.whiteLabelService.getWhiteLabel(authPayload.authUser.tenantId));
    }
    return forkJoin(sources)
      .pipe(map((data) => {
        console.log(data)
        const userTokenAccessEnabled: boolean = data[0];
        // const allowedDashboardIds: string[] = data[1];

        //white label
        const whiteLabel: WhiteLabel = isSysAdmin ? {} : data[1];
        return { userTokenAccessEnabled, whiteLabel };
      }));
  }

  // private forceDefaultPlace(authState?: AuthState, path?: string, params?: any): boolean {
  //   if (authState && authState.authUser) {
  //     if (authState.authUser.authority === Authority.TENANT_ADMIN || authState.authUser.authority === Authority.TENANT_USER
  //       || authState.authUser.authority === Authority.CUSTOMER_ADMIN || authState.authUser.authority === Authority.CUSTOMER_USER) {
  //       if ((this.userHasDefaultDashboard(authState) && authState.forceFullscreen) || authState.authUser.isPublic) {
  //         if (path === 'profile') {
  //           if (this.userHasProfile(authState.authUser)) {
  //             return false;
  //           } else {
  //             return true;
  //           }
  //         } else if (path.startsWith('dashboard.') || path.startsWith('dashboards.') &&
  //           authState.allowedDashboardIds.indexOf(params.dashboardId) > -1) {
  //           return false;
  //         } else {
  //           return true;
  //         }
  //       }
  //     }
  //   }
  //   return false;
  // }

  // const defaultUrl = (isAuthenticated: boolean, authState?: AuthState, path?: string, params?: any): UrlTree => {
  //   let result: UrlTree = null;
  //   if (isAuthenticated) {
  //     if (!path || path === 'login' || this.forceDefaultPlace(authState, path, params)) {

  //       if (this.redirectUrl) {
  //         const redirectUrl = this.redirectUrl;
  //         this.redirectUrl = null;
  //         result = this.router.parseUrl(redirectUrl);
  //       } else {
  //         result = this.router.parseUrl('home');
  //       }
  //       if (authState.authUser.authority === Authority.TENANT_ADMIN || authState.authUser.authority === Authority.TENANT_USER
  //         || authState.authUser.authority === Authority.CUSTOMER_ADMIN || authState.authUser.authority === Authority.CUSTOMER_USER) {
  //         if (this.userHasDefaultDashboard(authState)) {

  //           const dashboardId = authState.userDetails.additionalInfo.defaultDashboardId;
  //           if (authState.forceFullscreen) {
  //             result = this.router.parseUrl(`dashboard/${dashboardId}`);
  //           } else {
  //             result = this.router.parseUrl(`dashboards/${dashboardId}`);
  //           }
  //         } else if (authState.authUser.isPublic) {
  //           result = this.router.parseUrl(`dashboard/${authState.lastPublicDashboardId}`);
  //         }
  //       } else if (authState.authUser.authority === Authority.SYS_ADMIN) {
  //         this.adminService.checkUpdates().subscribe((updateMessage) => {
  //           if (updateMessage && updateMessage.updateAvailable) {
  //             this.store.dispatch(new ActionNotificationShow(
  //               {
  //                 message: updateMessage.message,
  //                 type: 'info',
  //                 verticalPosition: 'bottom',
  //                 horizontalPosition: 'right'
  //               }));
  //           }
  //         });
  //       }
  //     }
  //   } else {
  //     result = this.router.parseUrl('login');
  //   }
  //   return result;
  // }


  readonly updateAndValidateTokens = (jwtToken: string, refreshToken: string, notify: boolean) => {
    this.updateAndValidateToken(jwtToken, 'jwt_token', notify);
    this.updateAndValidateToken(refreshToken, 'refresh_token', notify);
  }

  readonly updateAndValidateToken = (token: string, prefix: string, notify: boolean) => {
    let valid = false;
    // const tokenData = json.decodeToken(token);
    const tokenData = jwt.decode(token);
    const issuedAt = tokenData.iat;
    const expTime = tokenData.exp;
    if (issuedAt && expTime) {
      console.log(localStorage)
      const ttl = expTime - issuedAt;
      console.log(ttl)
      if (ttl > 0) {
        const clientExpiration = new Date().valueOf() + ttl * 1000;
        localStorage.setItem(prefix, token);
        localStorage.setItem(prefix + '_expiration', '' + clientExpiration);
        valid = true;
      }
    }
    if (!valid && notify) {
      this.notifyUnauthenticated();
    }
  }


  readonly setUserFromJwtToken = (jwtToken: any, refreshToken: any, notify: any) => {
    if (!jwtToken) {

      this.clearTokenData();
      if (notify) {

        this.notifyUnauthenticated();
        this.notifyClearWhiteLabel();
      }
    } else {
      this.updateAndValidateTokens(jwtToken, refreshToken, true);
      if (notify) {
        this.notifyUserLoaded(false);
        this.loadUser(false).subscribe(
          (authPayload) => {
            this.notifyUserLoaded(true);
            this.notifyAuthenticated(authPayload);
            this.navigate('/');
          },
          () => {
            this.notifyUserLoaded(true);
            this.notifyUnauthenticated();
          }
        );
      } else {
        this.loadUser(false).subscribe();
      }
    }
  }


}


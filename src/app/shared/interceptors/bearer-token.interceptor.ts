import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { from, lastValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment.development';

const addBearerToken = async (
  req: HttpRequest<any>,
  next: HttpHandlerFn,
): Promise<HttpEvent<any>> => {
  const _authFb = inject(Auth);
  await _authFb.currentUser?.getIdToken().then((token)=> {
      if (token) {
        req = req.clone({
          setHeaders: { Authorization: `Bearer ${token}` },
        });
      }
    }
  )
  return lastValueFrom(next(req));
};

export const bearerTokenInterceptor: HttpInterceptorFn = (req, next) => {
  return req.url.startsWith(environment.apiUrl) ? from(addBearerToken(req, next)) : next(req)
};

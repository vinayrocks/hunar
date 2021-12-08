import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpResponse
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap, materialize, delay, dematerialize } from 'rxjs/operators';
import { RdLogin } from '../../core/models/login/rd-login';
import { RdRegister } from '../../core/models/register/rd-register';
let users =
  [
    {
      id: 1,
      firstName: 'Jason',
      lastName: 'Watmore',
      username: 'test@gmail.com',
      password: 'Test@1234'
    }
  ];
let userProfiles =
  [
    {
      id: 1,
      ProfileName: 'Join A Wildlife Photographer',
      ProfilePicture: 'bg6.jpg',
      CoverPicture: 'bg6.jpg',
      ProfileDescription: 'For the past five years or so of being an Independent Recording Artist.' +
        ' I have written three bios and description of my music style in Cd jackets.' +
        ' This by chance is the best advice I have ever received.',
      ProfileSkill: JSON.parse('[{"Id":"1","name":"Visual Arts"}]'),
      ProfileExpertise: JSON.parse('[{"Id":"1","name":"Drawing"},{"Id":"2","name":"Paintings"},{"Id":"3","name":"Ceramics"}]'),
      LinkedPortfolio: JSON.parse('[{"Id":"2","name":"Portfolio 2"}]'),
      LastUpdatedDate: new Date(),
      IsDisabled: true

    },
    {
      id: 2,
      ProfileName: 'Join A Adventure Photographer',
      ProfilePicture: 'bg6.jpg',
      CoverPicture: 'bg6.jpg',
      ProfileDescription: 'For the past five years or so of being an Independent Recording Artist.' +
        ' I have written three bios and description of my music style in Cd jackets.' +
        ' This by chance is the best advice I have ever received.',
      ProfileSkill: JSON.parse('[{"Id":"1","name":"Visual Arts"}]'),
      ProfileExpertise: JSON.parse('[{"Id":"1","name":"Drawing"},{"Id":"2","name":"Paintings"},{"Id":"3","name":"Ceramics"}]'),
      LinkedPortfolio: JSON.parse('[{"Id":"1","name":"Portfolio 1"}]'),
      LastUpdatedDate: new Date(),
      IsDisabled: true

    },
    {
      id: 3,
      ProfileName: 'Join A Motion Photographer',
      ProfilePicture: 'bg6.jpg',
      CoverPicture: 'bg6.jpg',
      ProfileDescription: 'For the past five years or so of being an Independent Recording Artist.' +
        ' I have written three bios and description of my music style in Cd jackets.' +
        ' This by chance is the best advice I have ever received.',
      ProfileSkill: JSON.parse('[{"Id":"1","name":"Visual Arts"}]'),
      ProfileExpertise: JSON.parse('[{"Id":"1","name":"Drawing"},{"Id":"2","name":"Paintings"},{"Id":"3","name":"Ceramics"}]'),
      LinkedPortfolio: JSON.parse('[{"Id":"3","name":"Portfolio 3"}]'),
      LastUpdatedDate: new Date(),
      IsDisabled: true

    }
  ];

let userPortfolios =
  [
    {
      id: 1,
      PortfolioName: 'PortfolioName 1',
      PortfolioArtifacts: 'For the past five years or so of being an Independent Recording Artist.' +
        ' I have written three bios and description of my music style in Cd jackets.' +
        ' This by chance is the best advice I have ever received.',
      PortfolioMedia: JSON.parse('[' +
        '{"id":"1","imageMovieName":"name1","imageMovieURL":"assets/img/bg1.jpg","type":"image"},' +
        '{"id":"2","imageMovieName":"name2","imageMovieURL":"assets/img/bg6.jpg","type":"image"},' +
        '{"id":"3","imageMovieName":"name3","imageMovieURL":"assets/img/bg7.jpg","type":"image"},' +
        '{"id":"4","imageMovieName":"name3","imageMovieURL":"https://www.youtube.com/watch?v=iHhcHTlGtRs","type":"video"}]'),
      LastUpdatedDate: new Date(),
      IsDisabled: true

    },
    {
      id: 2,
      PortfolioName: 'PortfolioName 2',
      PortfolioArtifacts: 'For the past five years or so of being an Independent Recording Artist.' +
        ' I have written three bios and description of my music style in Cd jackets.' +
        ' This by chance is the best advice I have ever received.',
      PortfolioMedia: JSON.parse('[' +
        '{"id":"1","imageMovieName":"name1","imageMovieURL":"assets/img/bg1.jpg","type":"image"},' +
        '{"id":"2","imageMovieName":"name2","imageMovieURL":"assets/img/bg6.jpg","type":"image"},' +
        '{"id":"3","imageMovieName":"name3","imageMovieURL":"assets/img/bg7.jpg","type":"image"},' +
        '{"id":"4","imageMovieName":"name3","imageMovieURL":"https://www.youtube.com/watch?v=iHhcHTlGtRs","type":"video"}]'),
      LastUpdatedDate: new Date(),
      IsDisabled: true

    },
    {
      id: 3,
      PortfolioName: 'PortfolioName 3',
      PortfolioArtifacts: 'For the past five years or so of being an Independent Recording Artist.' +
        ' I have written three bios and description of my music style in Cd jackets.' +
        ' This by chance is the best advice I have ever received.',
      PortfolioMedia: JSON.parse('[' +
        '{"id":"1","imageMovieName":"name1","imageMovieURL":"assets/img/bg1.jpg","type":"image"},' +
        '{"id":"2","imageMovieName":"name2","imageMovieURL":"assets/img/bg6.jpg","type":"image"},' +
        '{"id":"3","imageMovieName":"name3","imageMovieURL":"assets/img/bg7.jpg","type":"image"},' +
        '{"id":"4","imageMovieName":"name3","imageMovieURL":"https://www.youtube.com/watch?v=iHhcHTlGtRs","type":"video"}]'),
      LastUpdatedDate: new Date(),
      IsDisabled: true

    }
  ];
let userEvents =
  [
    {
      id: 1,
      EventName: 'Event 1',
      EventDescription: 'For the past five years or so of being an Independent Recording Artist.' +
        ' I have written three bios and description of my music style in Cd jackets.' +
        ' This by chance is the best advice I have ever received.',
      EventMedia: JSON.parse('[' +
        '{"id":"1","imageMovieName":"name1","imageMovieURL":"assets/img/bg1.jpg","type":"image"},' +
        '{"id":"2","imageMovieName":"name2","imageMovieURL":"assets/img/bg6.jpg","type":"image"},' +
        '{"id":"3","imageMovieName":"name3","imageMovieURL":"assets/img/bg7.jpg","type":"image"},' +
        '{"id":"4","imageMovieName":"name3","imageMovieURL":"https://www.youtube.com/watch?v=iHhcHTlGtRs","type":"video"}]'),
      EventCategory: JSON.parse('[{"Id":"1","name":"Photography"},{"Id":"2","name":"Animation"},{"Id":"3","name":"Ceramics"}]'),
      EventSkill: '1',
      LastUpdatedDate: new Date(),
      IsDisabled: true

    },
    {
      id: 2,
      EventName: 'Event 3',
      EventDescription: 'For the past five years or so of being an Independent Recording Artist.' +
        ' I have written three bios and description of my music style in Cd jackets.' +
        ' This by chance is the best advice I have ever received.',
      EventMedia: JSON.parse('[' +
        '{"id":"1","imageMovieName":"name1","imageMovieURL":"assets/img/bg1.jpg","type":"image"},' +
        '{"id":"2","imageMovieName":"name2","imageMovieURL":"assets/img/bg6.jpg","type":"image"},' +
        '{"id":"3","imageMovieName":"name3","imageMovieURL":"assets/img/bg7.jpg","type":"image"},' +
        '{"id":"4","imageMovieName":"name3","imageMovieURL":"https://www.youtube.com/watch?v=iHhcHTlGtRs","type":"video"}]'),
      EventCategory: JSON.parse('[{"Id":"1","name":"Photography"},{"Id":"2","name":"Animation"},{"Id":"3","name":"Ceramics"}]'),
      EventSkill: '2',
      LastUpdatedDate: new Date(),
      IsDisabled: true

    },
    {
      id: 3,
      EventName: 'Event 3',
      EventDescription: 'For the past five years or so of being an Independent Recording Artist.' +
        ' I have written three bios and description of my music style in Cd jackets.' +
        ' This by chance is the best advice I have ever received.',
      EventMedia: JSON.parse('[' +
        '{"id":"1","imageMovieName":"name1","imageMovieURL":"assets/img/bg1.jpg","type":"image"},' +
        '{"id":"2","imageMovieName":"name2","imageMovieURL":"assets/img/bg6.jpg","type":"image"},' +
        '{"id":"3","imageMovieName":"name3","imageMovieURL":"assets/img/bg7.jpg","type":"image"},' +
        '{"id":"4","imageMovieName":"name3","imageMovieURL":"https://www.youtube.com/watch?v=iHhcHTlGtRs","type":"video"}]'),
      EventCategory: JSON.parse('[{"Id":"1","name":"Photography"},{"Id":"2","name":"Animation"},{"Id":"3","name":"Ceramics"}]'),
      EventSkill: '3',
      LastUpdatedDate: new Date(),
      IsDisabled: true

    }
  ];
@Injectable()
export class RdFakeDatabaseInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.endsWith('/account/authenticate') && method === 'POST':
          return authenticate();
        case url.endsWith('/account/register') && method === 'POST':
          return register();
        case url.endsWith('/account/forgotPassword') && method === 'POST':
          return forgotPassword();
        case url.endsWith('/user/profiles') && method === 'GET':
          return getUserProfiles();
        case url.endsWith('/user/profile') && method === 'POST':
          return getUserProfile();
        case url.endsWith('/user/portfolios') && method === 'GET':
          return getUserPortfolios();
        case url.endsWith('/user/portfolio') && method === 'POST':
          return getUserPortfolio();
        case url.endsWith('/user/events') && method === 'GET':
          return getUserEvents();
        case url.endsWith('/user/event') && method === 'POST':
          return getUserEvent();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions
    function authenticate() {
      const userModel = body;
      const user = users.find(x => x.username === userModel.email && x.password === userModel.password);
      if (!user) return error('Username or password is incorrect');
      return ok({
        data: {
          id: user.id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          token: 'fake-jwt-token'
        },
        message: "Logged in successfully.",
        status: true

      })
    }

    function register() {
      const userModel = new RdRegister(body);
      // const user = users.find(x => x.username === userModel.email && x.password === userModel.password);
      // if (!user) return error('Email or password is incorrect');
      return ok({
        data: null,
        message: "Register successfully.",
        status: true

      })
    }
    function forgotPassword() {
      // const email=body;
      // const user = users.find(x => x.username === userModel.email && x.password === userModel.password);
      // if (!user) return error('Email is incorrect');
      return ok({
        data: null,
        message: "Email sent successfully.Please check the registered email.",
        status: true

      })
    }

    // helper functions

    function ok(body?) {
      return of(new HttpResponse({ status: 200, body }))
    }

    function error(message) {
      return throwError({ error: { message } });
    }

    function getUserProfiles() {
      return ok({ userProfiles: userProfiles });
    }
    function getUserProfile() {
      const userModel = body;
      const userProfile = userProfiles.find(x => x.id === parseInt(userModel));
      if (!userProfile) return error('Username or password is incorrect');
      return ok({ userProfile: userProfile })
    }
    function getUserPortfolios() {
      return ok({ userPortfolios: userPortfolios });
    }
    function getUserPortfolio() {
      const userModel = body;
      const userPortfolio = userPortfolios.find(x => x.id === parseInt(userModel));
      if (!userPortfolio) return error('Username or password is incorrect');
      return ok({ userPortfolio: userPortfolio })
    }
    function getUserEvents() {
      return ok({ userEvents: userEvents });
    }
    function getUserEvent() {
      const userModel = body;
      const userEvent = userEvents.find(x => x.id === parseInt(userModel));
      if (!userEvent) return error('Username or password is incorrect');
      return ok({ userEvent: userEvent })
    }
  }
}
export const RdFakeDatabaseProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: RdFakeDatabaseInterceptor,
  multi: true
};

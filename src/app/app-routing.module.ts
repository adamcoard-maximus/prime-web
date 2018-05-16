import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsentModalComponent } from './core/consent-modal/consent-modal.component';
import { BlankPageComponent } from './pages/blank-page/blank-page.component';
import { ContactInformationComponent } from './pages/contact-information/contact-information.component';
import { DashboardBySiteComponent } from './pages/dashboard-page/dashboard-by-site/dashboard-by-site.component';
import { DashboardByUserComponent } from './pages/dashboard-page/dashboard-by-user/dashboard-by-user.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { DemoPageComponent } from './pages/demo-page/demo-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProfessionalInfoComponent } from './pages/professional-info/professional-info.component';
import { ReviewSubmitComponent } from './pages/review-submit/review-submit.component';
import { SelfDeclarationComponent } from './pages/self-declaration/self-declaration.component';
import { SiteAccessComponent } from './pages/site-access/site-access.component';
import { SiteEnrollmentComponent } from './pages/site-enrollment/site-enrollment.component';
import { UserAcceptanceComponent } from './pages/user-acceptance/user-acceptance.component';
import { UserEnrollmentComponent } from './pages/user-enrollment/user-enrollment.component';

const routes: Routes = [

  // --- Old Routes from prototype here! Scroll down to find new routes
  {
    path: 'professional-info',
    component: ProfessionalInfoComponent,
  },
  {
    path: 'prepare',
    component: ConsentModalComponent,
  },
  {
    path: 'site-access',
    component: SiteAccessComponent,
  },
  {
    path: 'contact-info',
    component: ContactInformationComponent
  },
  {
    path: 'self-declaration',
    component: SelfDeclarationComponent
  },
  {
    path: 'user-acceptance',
    component: UserAcceptanceComponent
  },
  {
    path: 'review-submit',
    component: ReviewSubmitComponent
  },


  // ----- New Routes
  {
    path: '',
    component: HomePageComponent,
    data: { breadcrumb: "Home"}
  },
  {
    path: 'demo',
    component: DemoPageComponent,
    data: {
      breadcrumb: "Demo"
    },
    //All these "Example" pages are just for demo purposes and can be removed.
    //They mainly demonstrate that the BreadcrumbComponent logic is sound.
    children: [
      {
        path: "ExampleA",
        data: { breadcrumb: "ExampleA"},
        component: BlankPageComponent
      },
      {
        path: "ExampleB",
        data: { breadcrumb: "ExampleB"},
        component: BlankPageComponent,
        children: [
          {
            path: "ExampleB-1",
            data: { breadcrumb: "ExampleB-1"},
            component: BlankPageComponent
          },
          {
            path: "ExampleB-2",
            data: { breadcrumb: "ExampleB-2"},
            component: BlankPageComponent
          },
        ]
      },
      {
        path: "ExampleC",
        data: { breadcrumb: "ExampleC"},
        component: BlankPageComponent
      }
    ]
  },
  {
    path: 'dashboard',
    component: DashboardPageComponent,

    children: [
      {
        path: 'user',
        component: DashboardByUserComponent,
      },
      {
        path: 'site',
        component: DashboardBySiteComponent,
      },
      {
        path: '**',
        redirectTo: 'user'
      }
    ]
  },
  {
    path: 'enrollment',
    children: [
      /**
       * Enrollment routes below must be duplicated, one with /:id and one
       * without. Using :id allows deep linking to specific items.
       */
      {
        path: 'user',
        component: UserEnrollmentComponent,
      },
      {
        path: 'site',
        component: SiteEnrollmentComponent,
      },
      {
        path: 'user/:id',
        component: UserEnrollmentComponent,
      },
      {
        path: 'site/:id',
        component: SiteEnrollmentComponent,
      },
      {
        path: '**',
        redirectTo: 'user'
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

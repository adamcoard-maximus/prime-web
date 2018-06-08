import { Component, OnInit } from '@angular/core';
import { PrimeDataService } from '../../../../services/prime-data.service';
import { Person } from '../../../../models/person.model';
import { DummyDataService } from '../../../../services/dummy-data.service';
import {SiteAccess} from '../../../../models/sites.model';
import {EnrollmentRowItem} from '../../../verifier/components/enrollment-row/enrollment-row.interface';
import {ApplEnrollmentRowItem} from '../../components/appl-enrollment-row/appl-enrollment-row.interface';

@Component({
  selector: 'prime-applicant-dashboard',
  templateUrl: './applicant-dashboard.component.html',
  styleUrls: ['./applicant-dashboard.component.scss']
})
export class ApplicantDashboardComponent implements OnInit {

  constructor(private primeDataService: PrimeDataService, private dummyDataService: DummyDataService) {}

  ngOnInit() {
    // TODO: Make sure this only fires once! Don't want to overwrite user behaviour.
    // TODO: Need to move this so it always excutes on ALL applicants, but only once. Maybe need ApplicantComponent like AppComponent?
    // ALTERNATIVELY: JUST REMOVE THIS! Users can fill it out themselves.
    //this.dummyDataService.setPersonToApplicant(this.applicant);
  }

  get applicant(): Person {
    return this.primeDataService.user;
  }

  get userSiteEnrollmentData(): ApplEnrollmentRowItem[] {
    console.log('userSiteEnrollmentData');
    return this.primeDataService.getUserSiteEnrollment();
  }

  get contactDone(): boolean {
    return this.applicant.hasContactInfo;
  }

  get professionalDone(): boolean {
    return !!this.applicant.license;
  }

  get accessAcceptanceDone(): boolean {
    return !!this.applicant.accessAcceptance;
  }

  updatesRequiringUserAction(): string[] {
    let result = [];

    if (!this.contactDone){
      result.push('Contact');
    }

    if (!this.professionalDone){
      result.push('Professional');
    }

    if (!this.accessAcceptanceDone){
      result.push('User Access Acceptance');
    }

    return result;
  }

  get updatesRequiringUserActionText(): string {
    let items = this.updatesRequiringUserAction();
    if (items.length === 0 ) { return; }
    if (items.length === 1 ) {
      return `Please update ${items[0]}`;
    }
    else if (items.length > 1 ) {
      let beforeAnd: string[] = items.slice(0, items.length - 1);
      let afterAnd: string = items[items.length - 1 ];

      return `Please update ${ beforeAnd.join(', ') } and ${afterAnd}`
    }
  }

  // Enrollment

}

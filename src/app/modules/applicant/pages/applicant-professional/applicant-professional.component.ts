import { Component, OnInit } from '@angular/core';
import { PrimeDataService } from '../../../../services/prime-data.service';
import { CollegeTypes,
  LicenceClassCPTypes,
  LicenceClassCRNTypes,
  LicenceClassCPSTypes,
  AdvancedPracticeCertificationTypes,
  JobTitleTypes,
  MaxLengthTypes } from '../../../../models/colleges.enum';

@Component({
  selector: 'prime-applicant-professional',
  templateUrl: './applicant-professional.component.html',
  styleUrls: ['./applicant-professional.component.scss']
})
export class ApplicantProfessionalComponent implements OnInit {
  // public collegeTypesSelector                       = 'pleaseSelect';
  // public licenceClassCPTypesSelector                = 'pleaseSelect';
  // public licenceClassCRNTypesSelector               = 'pleaseSelect';
  // public licenceClassCPSTypesSelector               = 'pleaseSelect';
  // public advancedPracticeCertificationTypesSelector = 'pleaseSelect';

  // public licenceNumberSelector = '';

  public collegeCertificationList = [{
    collegeType: 'pleaseSelect',
    licenceNumber: '',
    licenceClassCPType: 'pleaseSelect',
    licenceClassCRNType: 'pleaseSelect',
    licenceClassCPSType: 'pleaseSelect',
    advancedPracticeCertificationType: 'pleaseSelect' }];

  public deviceProviderList = [{ dpNumber: '' }];

  public workingOnBehalfList = [{ jobTitle: 'pleaseSelect' }];
  public workingOnBehalfTotal = 0;

  public hasChanged: boolean = false;


  constructor(private dataService: PrimeDataService) { }

  ngOnInit() {
  }


  addCollegeCertification() {
    this.collegeCertificationList.push({
      collegeType: 'pleaseSelect',
      licenceNumber: '',
      licenceClassCPType: 'pleaseSelect',
      licenceClassCRNType: 'pleaseSelect',
      licenceClassCPSType: 'pleaseSelect',
      advancedPracticeCertificationType: 'pleaseSelect' });
  }

  deleteCollegeCertification(i){
    console.log(`delete index ${i}`, this.collegeCertificationList);
    this.collegeCertificationList.splice(i, 1);
  }

  addDeviceProvider() {
    this.deviceProviderList.push({ dpNumber: '' });
  }

  deleteDeviceProvider(i){
    console.log(`delete index ${i}`, this.deviceProviderList);
    this.deviceProviderList.splice(i, 1);
  }

  addWorkingOnBehalf() {
    if(this.workingOnBehalfTotal < this.JobTitleTypesCount() - 1) {
      this.workingOnBehalfList.push({ jobTitle: 'pleaseSelect' });
      this.workingOnBehalfTotal++;
    }
  }

  deleteWorkingOnBehalf(i){
    console.log(`delete index ${i}`, this.workingOnBehalfList);
    this.workingOnBehalfList.splice(i, 1);
    this.workingOnBehalfTotal--;
  }

  get applicant() {
    return this.dataService.user;
  }

  // Make enum accessible to template
  get CollegeTypes() {
    return Object.keys(CollegeTypes);
  }

  // Make enum accessible to template
  get LicenceClassCPTypes() {
    return Object.keys(LicenceClassCPTypes);
  }

  // Make enum accessible to template
  get LicenceClassCRNTypes() {
    return Object.keys(LicenceClassCRNTypes);
  }

  // Make enum accessible to template
  get LicenceClassCPSTypes() {
    return Object.keys(LicenceClassCPSTypes);
  }

  // Make enum accessible to template
  get AdvancedPracticeCertificationTypes() {
    return Object.keys(AdvancedPracticeCertificationTypes);
  }

  // Make enum accessible to template
  get JobTitleTypes() {
    return Object.keys(JobTitleTypes);
  }

  JobTitleTypesCount() {
    return Object.keys(JobTitleTypes).length;
  }

  // // Make enum accessible to template
  // get MaxLengthTypes() {
  //   return Object.keys(MaxLengthTypes);
  // }

  collegeCurrValue(selection) {
    return CollegeTypes[selection];
    // const selection = this.collegeTypesSelector;
    // return CollegeTypes[selection] ? CollegeTypes[selection] : '';
  }

  // licenceClassCPCurrValue() {
  //   const selection = this.licenceClassCPTypesSelector;
  //   return LicenceClassCPTypes[selection] ? LicenceClassCPTypes[selection] : '';
  // }
  //
  // licenceClassCRNCurrValue() {
  //   const selection = this.licenceClassCRNTypesSelector;
  //   return LicenceClassCRNTypes[selection] ? LicenceClassCRNTypes[selection] : '';
  // }
  //
  // licenceClassCPSCurrValue() {
  //   const selection = this.licenceClassCPSTypesSelector;
  //   return LicenceClassCPSTypes[selection] ? LicenceClassCPSTypes[selection] : '';
  // }
  //
  // advancedPracticeCertificationCurrValue() {
  //   const selection = this.advancedPracticeCertificationTypesSelector;
  //   return AdvancedPracticeCertificationTypes[selection] ? AdvancedPracticeCertificationTypes[selection] : '';
  // }
  //
  // jobTitleCurrValue() {
  //   const selection = this.jobTitleTypesSelector;
  //   return JobTitleTypes[selection] ? JobTitleTypes[selection] : '';
  // }

  licenceClassCPValue(selection) {
    return LicenceClassCPTypes[selection];
  }

  licenceClassCRNValue(selection) {
    return LicenceClassCRNTypes[selection];
  }

  licenceClassCPSValue(selection) {
    return LicenceClassCPSTypes[selection];
  }

  advancedPracticeCertificationValue(selection) {
    return AdvancedPracticeCertificationTypes[selection];
  }

  jobTitleValue(selection) {
    return JobTitleTypes[selection];
  }

  // maxLengthValue(selection) {
  //   return MaxLengthTypes[selection];
  // }

  // licenceNumberLength() {
  //   const selection = this.licenceNumberSelector;
  //   return selection.length;
  // }
  //
  // deviceProviderNumberLength() {
  //   const selection = this.deviceProviderNumberSelector;
  //   return selection.length;
  // }
  //
  // get licenceNumberHasValue(): number {
  //   return this.inputFields.licenceNumber.length();
  // }

  collegeCertificationValid(i) {
    if(this.collegeCertificationList[i].collegeType !== 'pleaseSelect'
      && this.collegeCertificationList[i].licenceNumber.length
      && ((this.collegeCertificationList[i].collegeType === 'CPBC'
          && this.collegeCertificationList[i].licenceClassCPType.length)
        || (this.collegeCertificationList[i].collegeType === 'CRNBC'
          && this.collegeCertificationList[i].licenceClassCRNType.length
          && this.collegeCertificationList[i].advancedPracticeCertificationType.length)
        || (this.collegeCertificationList[i].collegeType === 'CPSBC'
          && this.collegeCertificationList[i].licenceClassCPSType.length))) {
      return true;
    }
    else {
      return false;
    }
  }
  // collegeCertificationValid(i) {
  //   if(this.collegeCurrValue().length
  //     && this.licenceNumberLength()
  //     && ((this.collegeTypesSelector === 'CPBC'
  //       && this.licenceClassCPCurrValue().length)
  //       || (this.collegeTypesSelector === 'CRNBC'
  //         && this.licenceClassCRNCurrValue().length
  //         && this.advancedPracticeCertificationCurrValue().length)
  //       || (this.collegeTypesSelector === 'CPSBC'
  //         && this.licenceClassCPSCurrValue().length))) {
  //     return true;
  //   }
  //   else {
  //     return false;
  //   }
  // }

  displayDeviceProviderSection() {
    if(this.applicant.hasCollege === false || this.collegeCertificationValid(0)) {
      return true;
    }
    else {
      return false;
    }
  }

  displayWorkingOnBehalfSection() {
    if(this.displayDeviceProviderSection()
      && (this.applicant.isDeviceProvider === false || this.deviceProviderList[0].dpNumber.length)) {
      return true;
    }
    else {
      return false;
    }
  }

  displaySelfDeclarationSection() {
    if(this.displayDeviceProviderSection()
      && this.displayWorkingOnBehalfSection()
      && (this.applicant.isWorkingOnBehalf === false || this.workingOnBehalfList[0].jobTitle !== 'pleaseSelect')) {
      return true;
    }
    else {
      return false;
    }
  }


  onChange() {
    this.hasChanged = true;
  }

  onSave(val: boolean){

    this.hasChanged = false;
  }

  onCancel(val: boolean){

    this.hasChanged = false;
  }
}

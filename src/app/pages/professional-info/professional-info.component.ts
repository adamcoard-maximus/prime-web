import { Component, OnInit, ViewChild, ChangeDetectorRef, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicantDataService } from '../../services/applicant-data.service';
import { Applicant } from '../../models/applicant';
import { ConsentModalComponent } from '../../core/consent-modal/consent-modal.component';
import { BaseComponent } from '../../core/base-component/base-component.component';
import { Colleges, CollegeList } from '../../models/colleges.enum';
import { CollegeDataService } from '../../services/college-data.service';
import { AdvancedPracticeCerts } from '../../models/advanced-practice-certs.enum';


@Component({
  selector: 'prime-professional-info',
  templateUrl: './professional-info.component.html',
  styleUrls: ['./professional-info.component.scss']
})
export class ProfessionalInfoComponent extends BaseComponent implements OnInit {
  public applicant: Applicant;
  @ViewChild(ConsentModalComponent) private consentModal: ConsentModalComponent;
  public Colleges: typeof Colleges = Colleges;
  public showError: boolean = false;
  public collegeList: CollegeList[];


  //Configuration option. Toggle this to turn the whole page into readonly.
  //Waiting to hear from Cristina if this will be a permanent change.
  public readonly: boolean = false;

  constructor(
    private applicantData: ApplicantDataService,
    private cdRef: ChangeDetectorRef,
    private elementRef: ElementRef,
    private router: Router,
    private collegeData: CollegeDataService) {
    super()
    this.applicant = applicantData.applicant;
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  ngOnInit() {
    this.collegeList = this.defaultCollegeList();
    this.initSelect();

    if (this.readonly){
      //For Demo purposes only
      this.applicant.college = [Colleges.CPBC, Colleges.CRNBC]
      this.applicant.advancedPracticeCerts = [AdvancedPracticeCerts.RemotePractice, AdvancedPracticeCerts.ReproductiveCare];
    }
  }

  get advancedPracticeCertsList() {
    return [
      {
        id: 'none',
        text: AdvancedPracticeCerts.None,
      },
      {
        id: AdvancedPracticeCerts.RemotePractice,
        text: AdvancedPracticeCerts.RemotePractice,
      },
      {
        id: AdvancedPracticeCerts.ReproductiveCare,
        text: AdvancedPracticeCerts.ReproductiveCare,
      },
      {
        id: AdvancedPracticeCerts.SexuallyTransmittedInfections,
        text: AdvancedPracticeCerts.SexuallyTransmittedInfections
      }
    ]
  }

  onAdvancedPracticeCertChanged(value, el){
    this.applicant.advancedPracticeCerts = this.enforceNoneSelect(value, el);
  }

  onCollegeChange(value: Colleges[], el): void {
    this.applicant.college = this.enforceNoneSelect(value, el);
  }


  ngAfterViewInit() {
    // if (!this.applicant.consentInfoCollection){
    //   this.consentModal.openModal();
    // }
  }

  onConsented(consent){
    this.applicant.consentInfoCollection = consent;
  }

  collegeDebug() {
    console.log('collegeDebug');
  }

  /**
   * Re-orders the selected elements in the Professional College multiselect box. Now they will be ordered in the same order the user selects them. This step is necessary in order for the code in onCollegeChange() to work, which enforces business logic rules relating to selecting 'None'.
   */
  initSelect() {
    $(this.elementRef.nativeElement).on("select2:select", 'select', function (evt: any) {
      var element = evt.params.data.element;
      var $element = $(element);

      $element.detach();
      $(this).append($element);
      $(this).trigger("change");
    });

  }


  /**
   * Enforces business logic relating to selecting a "None" value when select2's
   * multiselect is enabled.  Ensures the user cannot both have items selected
   * as well as 'none'. If 'none' is selected, it will clear all other
   * results, and vice versa.
   *
   * This MUST be used in conjunction w/ initSelects() reordering, otherwise
   * detection will not work.
   * @param value The $event.value from <select2>'s (valueChanged)
   * @param el A parent element containing the <select2> element.
   */
  enforceNoneSelect(value, el) : any[] {
    const firstSelected = el.querySelectorAll('.select2-selection__rendered > li')[0].title
    const isNoneInPreviousSelection = !(firstSelected.toLowerCase() === "none");
    const isNoneInSelection = value.indexOf("none") >= 0;
    const onlyNoneSelected = value.length === 1 && isNoneInPreviousSelection;
    const otherOptionsSelected = (value.length >= 2 || (value.length === 1 && ! isNoneInSelection))

    //Case: Have items, select 'None' -> clear and show 'None'
    if (isNoneInSelection && !isNoneInPreviousSelection && otherOptionsSelected){
      return ["none"];
    }
    //Case: Have 'None', select items -> clear and show items.
    else if (isNoneInSelection && isNoneInPreviousSelection) {
      return value.filter(x => x.toLowerCase() !== 'none')
    }
    else {
      return value;
    }
  }

  defaultCollegeList(): CollegeList[] {
    return this.collegeData.defaultCollegeList();
  }

  onChange(values: any) {
    console.log('professional-info onchange: ', values);
  }

  canContinue(): boolean {
    return true;
  }

  continue(): void {
    console.log('---------------\ncontinue');
    this.router.navigate(['site-access']);
  }

}

import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { PrimeDataService } from '../../services/prime-data.service';
import { Person } from '../../models/person.model';
import { DummyDataService } from '../../services/dummy-data.service';

@Component({
  selector: 'prime-add-user-button',
  templateUrl: './add-user-button.component.html',
  styleUrls: ['./add-user-button.component.scss']
})
export class AddUserButtonComponent implements OnInit {
  @Input() iconOnly: boolean = false;
  modalRef: BsModalRef;
  progress: any = []
  public searchResultsPeople: Person[] = [];
  public showSearchResults: boolean;
  public addUserSelected: boolean = false;
  public today: Date = new Date();
  public endDate: Date = null

  /** Binds to the form inputs used to generate search queries. Each field should correspond in name and type with attribtues on a Person object */
  public searchQuery: {lastName?: string, middleName?: string, firstName?: string, primeUserId?: string, dateOfBirth?: Date} = {};

  constructor(private modalService: BsModalService, private dataService: PrimeDataService, private dummyDataService: DummyDataService) { }

  ngOnInit() {
    // Clear out the form inputs when the modal closes
    this.modalService.onHide.subscribe(() => {
      this.clearSearch();
    });

  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.modalService.onHidden.subscribe(() => {this.addUserSelected = false});
  }


  get currentProgressStep(): number {
    return Object.keys(this.searchQuery)
      .map(key => this.searchQuery[key]) // Convert to value
      .filter(x => x).length;  //Filter out falsy, like empty strings
  }

  /**
   * Instead of genuinely searching for the user's result, we just create a new
   * user and make it match their search query. Will need to be completely
   * re-written for prod.
   *
   */
  findUser(){
    const person = this.dummyDataService.createPeople(1)[0];

    // Copy over the shared defined properties, ignore the rest.
    for (var key in this.searchQuery) {
      if (this.searchQuery.hasOwnProperty(key) && person.hasOwnProperty(key) ) {
         person[key] = this.searchQuery[key];
      }
    }
    person.email = `${person.firstName[0].toLowerCase()}${person.lastName.toLowerCase()}@gmail.com`;

    person.renewalDate = null //We don't want the set date from dummyDataService


    // Only return one result (prototype only)
    this.searchResultsPeople = [person];
    this.showSearchResults = true;
  }

  addUser(){
    // TODO: Only add SELECTED users! Currently this just adds all users as long as one user is selected.
    this.dataService.people.push(... this.searchResultsPeople);
    this.modalRef.hide();

  }

  canAddUser(): boolean {
    return this.addUserSelected;
  }

  canFindUser(): boolean {
    return this.currentProgressStep >= this.maxProgressSteps;
  }

  get showAdditionalFields(): boolean {
    return !!this.searchQuery.dateOfBirth;
  }

  get maxProgressSteps(): number {
    if (this.showAdditionalFields) {
      return 4;
    }
    return 3;
  }

  clearSearch(){
    this.searchQuery = {};
    this.searchResultsPeople = [];
    this.showSearchResults = false;
    this.addUserSelected = false;
  }


}

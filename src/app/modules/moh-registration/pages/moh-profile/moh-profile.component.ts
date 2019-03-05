import { Component, OnInit, OnChanges } from '@angular/core';
import { AbstractForm } from 'moh-common-lib/models';
import { Router } from '@angular/router';
import { PrimeConstants } from '../../../../models/prime-constants';

@Component({
  selector: 'prime-moh-profile',
  templateUrl: './moh-profile.component.html',
  styleUrls: ['./moh-profile.component.scss']
})
export class MohProfileComponent extends AbstractForm implements OnInit {

  constructor( protected router: Router ) {
    super( router );
  }

  ngOnInit() {
  }

  continue() {

    console.log(`form`, {valid: this.form.valid, submitted: this.form.submitted}, this.form);

    if (this.form.valid) {

      // TODO: Check if first name does not exist - ask if have first name



      // Navigate to next page
      this.navigate( PrimeConstants.MOH_REGISTRATION + '/' +
                     PrimeConstants.DOC_UPLD_PG );

    } else {
      // Errors exist on form
      // Mark all fields as touched to display errors
      this.markAllInputsTouched();
    }
  }
}

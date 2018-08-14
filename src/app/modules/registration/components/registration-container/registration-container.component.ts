import { Component, OnInit } from '@angular/core';
import {pageRoutes} from '../../registration-page-routing.module';
import {WizardProgressItem} from '../../../core/components/wizard-progress-bar/wizard-progress-bar.component';

@Component({
  selector: 'prime-registration-container',
  templateUrl: './registration-container.component.html',
  styleUrls: ['./registration-container.component.scss']
})
export class RegistrationContainerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.progressSteps = pageRoutes.map(x => {
      return {
        title: this.convertRouteToTitle(x.path),
        route: x.path,
      };
    });
  }

  progressSteps: WizardProgressItem[];

  /**
   * Converts a lower case string of a route in a user readable title.  e.g.
   * "document-upload" -> "Document Upload"
   *
   * @param {string} routePath
   */
  convertRouteToTitle(routePath: string): string{
    return routePath.split('-').map(x => x[0].toUpperCase() + x.slice(1)).join(' ');
  }
}

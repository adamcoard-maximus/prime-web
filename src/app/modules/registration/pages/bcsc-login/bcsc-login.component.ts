import { Component, OnInit } from '@angular/core';
import {PrimeDataService} from '../../../../services/prime-data.service';
import { Person } from '../../../../models/person.model';
import { cloneDeep } from 'lodash';
import {Router} from '@angular/router';

@Component({
  selector: 'prime-bcsc-login',
  templateUrl: './bcsc-login.component.html',
  styleUrls: ['./bcsc-login.component.scss']
})
export class BcscLoginComponent implements OnInit {

  constructor( private router: Router, private primeDataService: PrimeDataService) { }

  ngOnInit() {
  }

  get registrant(): Person {
    return this.primeDataService.user;
  }

  /**
   * Returns the URL with appropriate prefix
   * @param {string} route
   * @returns {string}
   */
  getRoute( route: string ): string {
    const idx = this.router.url.lastIndexOf( '/' );
    const prefix = this.router.url.slice(0 , idx + 1 );
    return prefix + route;
  }

  /**
   * go to dashboard when done.
   */
  continue() {
    this.router.navigate( ['/dashboard'] );
  }
}

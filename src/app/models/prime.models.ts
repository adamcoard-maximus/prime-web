import { Base } from '../core/base/base.class';
import { User } from './user.model';
import { Site, SiteAccess } from './sites.model';


// TODO: THIS FILE NEEDS TO BE REFACTORED/BROKEN UP.

// Currently this is largely a copy-paste from design/object-oriented-design.ts
// These models were designed _before_ the current design wireframes were given.
// So, it's very likely they will need substantial changes.

// TIP: Look at which classes are EXPORTED to see where work is done!


export class Person extends Base {
  userId: PrimeUserID; //human-readable, like a user-name - "JSmith"
  // name: Name;
  name: string; //FIXME: Revert back to proper name interface once we have real data! This is just done for quick prototyping.
  address: Address;
  dateOfBirth: Date;
  phone: PhoneNumber;

  //The different roles the person may have
  user?: User;
  verifier?: Verifier;
  organizationAuthority?: OrganizationAuthority;
  provisioner?: Provisioner;

  // requests: PrimeRequest[];

  // ALL sites, including expired/rejected.
  siteAccess: SiteAccess[] = [];
  get activeSites(): SiteAccess[] {
      return this.siteAccess.filter(x => x.status === EnrollmentStatus.Active);
  }

  get sites(): Site[]{
    return this.siteAccess.map(SA => SA.site);
  }

  canAccess(site: Site): boolean{
    return this.sites.indexOf(site) !== -1
  }
}

class Name {
  firstName: string;
  lastName: string;
  middleName: string;
  get fullName(): string { return this.firstName + this.lastName }
}

export interface Address {
  street: string;
  postal: string;
}

interface PhoneNumber { }
interface PrimeUserID { }



//-----------------------------------------------------------------------------
// ROLES
//-----------------------------------------------------------------------------



export abstract class Role extends Base {
  status: EnrollmentStatus;
  // Person is a circular reference for runtime convenience and does NOT need
  // to really be modelled in the JSON. We must handle the circular reference
  // when JSONifying. This makes it possible to, e.g. just pass a Verifier
  // object, and then easily get their name.
  person: Person;

  /** This should exactly match the different user types which extend from Role. Makes it easy to lookup role type in templates e.g. `user.type === Verifier` */
  type: Verifier | OrganizationAuthority | Provisioner;
  selfDeclarations: SelfDeclaration[];
}

// class User extends Role {
//   college: Colleges[];
//   license: License;
//   isDeviceProvider: boolean;
//   PoSUserId: string;
// }
export class Verifier extends Role { }
export class OrganizationAuthority extends Role { } //aka "OA" or "Site Admin"
export class Provisioner extends Role { }

//-----------------------------------------------------------------------------
// MISC
//-----------------------------------------------------------------------------



// class Group<T> extends Base {
//   find() { };
//   contains() { }; // just an example
//   members: T[];
// }
// class Collection extends Group<Site> { };
// class PeopleGroup extends Group<Person> { };


class SelfDeclaration {
  question: string;
  userAnswer: boolean;
  userDetails: string;
}



/** The reason we're showing the notification in the first place. */
export enum EnrollmentStatus {
  Initiated = "Initiated",
  Pending = "Pending",
  Incomplete = "Incomplete",
  Returned = "Returned to applicant",
  Declined = "Declined",
  // Approved = "Approved", //Same as active?
  Active = "Active",
  Expired = "Expired",
}
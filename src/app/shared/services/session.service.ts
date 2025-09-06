import { Injectable } from '@angular/core';
import { HelperService } from './helper.service';
import { v4 as uuid } from 'uuid';
import { Logger } from '@app/core/logger.service';
import { StorageService } from './storage.service';
import { BehaviorSubject, forkJoin, ReplaySubject, shareReplay } from 'rxjs';
import { Constants, SECTORS } from '../models/constant.config';
import { CommonInterfaceService } from './external/common-interface.service';
import { CommonService } from './common.service';

const log = new Logger('SessionService');

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private trackingId: string='';


  // logged in user subject
  private userSubject: ReplaySubject<any> = new ReplaySubject<any>(1);
  public userSubject$ = this.userSubject.asObservable();

  private orgSubject: ReplaySubject<any> = new ReplaySubject<any>(1);
  public orgSubject$ = this.orgSubject.asObservable();

  private dashBoardProjectSubject: ReplaySubject<any> = new ReplaySubject<any>(1);
  public dashBoardProjectSubject$ = this.dashBoardProjectSubject.asObservable();

  //working location Subject selected by the user
  private workingProjectSubject: ReplaySubject<any> = new ReplaySubject<any>(1);
  public workingProjectSubject$ = this.workingProjectSubject.asObservable();

  //working location Subject selected by the user
  private allLocationSubject: ReplaySubject<any> = new ReplaySubject<any>(1);
  public allLocationSubject$ = this.allLocationSubject.asObservable();

  private userPriviligesSubject: ReplaySubject<any> = new ReplaySubject<any>(1);
  public userPriviligesSubject$ = this.userPriviligesSubject.asObservable();

  private projectEntitySubject: ReplaySubject<any> = new ReplaySubject<any>(1);
  public projectEntitySubject$ = this.projectEntitySubject.asObservable();

  
  private invoiceEntitySubject: ReplaySubject<any> = new ReplaySubject<any>(1);
  public invoiceEntitySubject$ = this.invoiceEntitySubject.asObservable();

  private statusSubject = new BehaviorSubject<any[]>([]); 
  public statusSubject$ = this.statusSubject.asObservable(); 
  private maritalStatusSubject = new BehaviorSubject<any[]>([]); 
  public maritalStatusSubject$ = this.maritalStatusSubject.asObservable(); 
  private employeeTypeSubject = new BehaviorSubject<any[]>([]); 
  public employeeTypeSubject$ = this.employeeTypeSubject.asObservable(); 
  private genderTypeSubject = new BehaviorSubject<any[]>([]); 
  public genderTypeSubject$ = this.genderTypeSubject.asObservable(); 
  
  private projectWorkTypeSubject = new BehaviorSubject<any[]>([]); 
  public projectWorkTypeSubject$ = this.projectWorkTypeSubject.asObservable(); 
  private ourRoleSubject = new BehaviorSubject<any[]>([]); 
  public ourRoleSubject$ = this.ourRoleSubject.asObservable(); 
  private contractModeSubject = new BehaviorSubject<any[]>([]); 
  public contractModeSubject$ = this.contractModeSubject.asObservable(); 
  private profileLossScopeSubject = new BehaviorSubject<any[]>([]); 
  public profileLossScopeSubject$ = this.profileLossScopeSubject.asObservable(); 

  private generalStatusSubject = new BehaviorSubject<any[]>([]); 
  public generalStatusSubject$ = this.generalStatusSubject.asObservable(); 
  private exchangeTypeSubject = new BehaviorSubject<any[]>([]); 
  public exchangeTypeSubject$ = this.exchangeTypeSubject.asObservable(); 
  private officeTypeSubject = new BehaviorSubject<any[]>([]); 
  public officeTypeSubject$ = this.officeTypeSubject.asObservable(); 
  private workOwnerSubject = new BehaviorSubject<any[]>([]); 
  public workOwnerSubject$ = this.workOwnerSubject.asObservable(); 
  private entityTypeSubject = new BehaviorSubject<any[]>([]); 
  public entityTypeSubject$ = this.entityTypeSubject.asObservable(); 
  private approvalStatusSubject = new BehaviorSubject<any[]>([]); 
  public approvalStatusSubject$ = this.approvalStatusSubject.asObservable(); 

  private staffTypeSubject = new BehaviorSubject<any[]>([]); 
  public staffTypeSubject$ = this.staffTypeSubject.asObservable(); 

  constructor(
    private _helperservice: HelperService,
    private _storageService: StorageService,
    private commonService:CommonInterfaceService) { 
    const savedUser = _storageService.get(Constants.userStorage);
    if (savedUser)
      this.userSubject.next(savedUser);

    const projectEntityObj =_storageService.get(Constants.projectEntityStorage); 
    if(projectEntityObj)     
      this.projectEntitySubject.next(projectEntityObj);

    const projectObj = _storageService.get(Constants.workingProjectStorage);
    if(projectObj)
      this.workingProjectSubject.next(projectObj);

    const invObj =_storageService.get(Constants.invoiceEntityStorage);
    if(invObj)
      this.invoiceEntitySubject.next(invObj);

    const orgObj =_storageService.get(Constants.orgData);
    if(orgObj)
      this.orgSubject.next(orgObj);
  }

  public getRunTimeConfig(config: any) {
    return this._helperservice.getRunTimeConfigFile(config);
  }

  public setOrganization(orgObj: any) {
    this._storageService.set(Constants.orgData, orgObj);
    this.userSubject.next(this._storageService.get(Constants.orgData));
  }

  public setDashBoardProject(projectObj: any) {
    this.dashBoardProjectSubject.next(projectObj);
  }

  public setAllLocation(locationsObj: any) {
    this.allLocationSubject.next({ organizations: locationsObj });
  }
  public setWorkingLocation(locationObj: any) {
    this._storageService.set(Constants.OrgLocationStorage, {
      locId: locationObj?.orgId,
      emailId: locationObj?.emailId
    });
    // this.workingLocationSubject.next({
    //   organization: {
    //     id: locationObj?.orgId,
    //     emailId: locationObj?.emailId,
    //     name: locationObj?.name
    //   }
    //});
    // log.debug(this.workingLocationSubject.closed);
    // log.debug(this.workingLocationSubject.isStopped);
    // log.debug(this.workingLocationSubject.observers);
  }

  public setInvoiceEntity(projectObj: any) {
    this._storageService.set(Constants.invoiceEntityStorage, projectObj);
    this.invoiceEntitySubject.next(projectObj);
  }
  public setProfileLossScope(scopesObj: any) {
    //this._storageService.set(Constants.workingProjectStorage, projectObj);
    this.profileLossScopeSubject.next(scopesObj);
  }
  // Project
  public setCurrentProject(projectObj: any) {
    this._storageService.set(Constants.workingProjectStorage, projectObj);
    this.workingProjectSubject.next(projectObj);
  }
  public setStaffType(staffList: any) {
    this.staffTypeSubject.next(staffList);
  }
  // Project
  public setProjectEntity(projectEntityObj: any) {
    this._storageService.set(Constants.projectEntityStorage, projectEntityObj);        
    this.projectEntitySubject.next(projectEntityObj);
  }



  public setUserPriviliges(priviligies: any) {
    this.userPriviligesSubject.next(priviligies);
  }
  public setUser(user: any) {
    this._storageService.set(Constants.userStorage, user);
    this.userSubject.next(this._storageService.get(Constants.userStorage));
  }
  public getTokenData(){
    try {
      let token = this._storageService.get(Constants.AuthToken);
      if(token!=null){
        const base64Payload = token.split('.')[1];
        let payload = atob(base64Payload);
        if (payload) {
          let payloadObj = JSON.parse(payload);

          payloadObj.p = payloadObj.p.toLowerCase() === "true";
          payloadObj.c = payloadObj.c.toLowerCase() === "true";

          return payloadObj;
        } else {
          return null;
        }
      }     
    } catch (e) {
      return null;
    }
  }
  public getTrackingId() {
    if (this.trackingId) {
      return this.trackingId;
    }
    else {
      const trackingid = this._storageService.get('trackingId');
      if (!trackingid) {
        const newUid = uuid().replace(/-/g, '');
        this.trackingId = newUid;
        this._storageService.set('trackingId', newUid);
        return this.trackingId;
      } else {
        this.trackingId = trackingid;
        return this.trackingId;
      }
    }
  }

  public loadGlobalData(){
    forkJoin({
      genderAPI:this.commonService.getGenderList({},''),
      maritalAPI:this.commonService.getMaritalStatusList({},''),
      employeeType:this.commonService.getEmployeeTypeList({},''),
      statusAPI:this.commonService.getStatusList({},''),
      projectWorkTypeAPI:this.commonService.getProjectWorkTypeList({},''),
      ourRoleAPI:this.commonService.getOurRoleList({},''),
      contractModeAPI:this.commonService.getContractModeList({},''),
      exchangeTypeAPI:this.commonService.getExchangeTypeList({},''),
      generalStatusAPI:this.commonService.getGeneralStatusList({},''),
      officeTypeAPI:this.commonService.getOfficeTypeList({},''),
      workOwnerAPI:this.commonService.getWorkOwnerList({},''),
      entityTypeAPI:this.commonService.getEntityTypeList({},''),
      staffTypeAPI:this.commonService.getStaffTypesList({},''),
      approvalStatusAPI:this.commonService.getApprovalStatusList({},'')
    }).subscribe((response:any)=>{
       if(response.genderAPI)
         this.genderTypeSubject.next(response.genderAPI.data);

       if(response.maritalAPI)
        this.maritalStatusSubject.next(response.maritalAPI.data);

       if(response.employeeType)
        this.employeeTypeSubject.next(response.employeeType.data);

       if(response.statusAPI)
        this.statusSubject.next(response.statusAPI.data);

       if(response.projectWorkTypeAPI)
        this.projectWorkTypeSubject.next(response.projectWorkTypeAPI.data);

       if(response.ourRoleAPI)
        this.ourRoleSubject.next(response.ourRoleAPI.data);

       if(response.contractModeAPI)
        this.contractModeSubject.next(response.contractModeAPI.data)

       if(response.exchangeTypeAPI)
        this.exchangeTypeSubject.next(response.exchangeTypeAPI.data);

       if(response.generalStatusAPI)
        this.generalStatusSubject.next(response.generalStatusAPI.data);

       if(response.workOwnerAPI)
        this.workOwnerSubject.next(response.workOwnerAPI.data);

       if(response.officeTypeAPI)
        this.officeTypeSubject.next(response.officeTypeAPI.data);

       if(response.entityTypeAPI)
        this.entityTypeSubject.next(response.entityTypeAPI.data);
       if(response.staffTypeAPI)
        this.staffTypeSubject.next(response.staffTypeAPI.data);

       if(response.approvalStatusAPI)
        this.approvalStatusSubject.next(response.approvalStatusAPI.data);
    });
  }
}

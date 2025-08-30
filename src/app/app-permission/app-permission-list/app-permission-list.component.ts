import { Component } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { AdminInterfaceService } from '@app/shared/services/external/admin-interface.service';
import { CommonInterfaceService } from '@app/shared/services/external/common-interface.service';
interface Module {
  id: string;
  name: string;
  permission: string[];
  modulelist?: Module[];
}

@Component({
  selector: 'app-app-permission-list',
  standalone: false,
  templateUrl: './app-permission-list.component.html',
  styleUrl: './app-permission-list.component.scss'
})
export class AppPermissionListComponent {
  roles:any;
  isLoading=true;
  selectedRoleId!:string;
  permissions = {
    C: false,
    R: false,
    U: false,
    D: false
  };
  
  selectedModule: any = null;
  selectedSubModule: any = null;
  modules:any=[];
  allModules:any=[];

  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['name', 'C', 'R', 'U', 'D'];
  expandedModule: Module | null = null;

  constructor(private adminService:AdminInterfaceService,private commonService:CommonInterfaceService){
   this.dataSource.data = this.modules;
  }

  ngOnInit(){
    this.isLoading=false;
    this.commonService.getAppRoles().subscribe((response:any)=>{
     if(response){
      this.roles=response.data;
     }
    })
   
  }
  submit(){

  }
  onRoleChange(event: MatSelectChange){
    let moduleData:any=[];
    this.selectedRoleId= event.value;
    this.adminService.getAllModules().subscribe((response:any)=>{ 
      if(response && response.success){
        moduleData= response.data;
      }    
    });
     this.adminService.getModulesByRoleId(this.selectedRoleId).subscribe((response:any)=>{     
     if(response && response.success){
      this.modules= response.data.modules;
       this.modules.forEach((m:any) => {
        m.permissionMap = this.mapPermissions(m.permission);
        m.modulelist.forEach((sm:any) => sm.permissionMap = this.mapPermissions(sm.permission));
       });
       this.updatePermissions(this.modules,moduleData);
       console.log(moduleData);
       moduleData.forEach((m:any) => {
        m.permissionMap = this.mapPermissions(m.permission);
        m.submodules.forEach((sm:any) => sm.permissionMap = this.mapPermissions(sm.permission));
       });
       this.allModules= moduleData;
     }
    })
    
  }
   mapPermissions(perms: string[]) {
    if(perms){
      return {
        C: perms.includes('C'),
        R: perms.includes('R'),
        U: perms.includes('U'),
        D: perms.includes('D')
      };
    }
    else
    return {C:false,R:false,U:false,D:false};
  }

  onModuleChange() {
    //this.selectedSubModule = null; // reset submodule when module changes
  }
  hasPermission(module: Module, perm: string): boolean {
    return module.permission.includes(perm);
  }

  togglePermission(module: Module, perm: string, event: any) {
    if (event.checked) {
      if (!module.permission.includes(perm)) {
        module.permission.push(perm);
      }
    } else {
      module.permission = module.permission.filter(p => p !== perm);
    }
  }
  savePermission() {
    const selectedPermissions = Object.entries(this.permissions)
      .filter(([_, checked]) => checked)
      .map(([perm]) => perm);

    if (!this.selectedModule) return;

    const entry = {
      moduleId: this.selectedModule.id,
      moduleName: this.selectedModule.name,
      subModuleId: this.selectedSubModule?.id,
      subModuleName: this.selectedSubModule?.name,
      permissions: selectedPermissions,
      roleId:this.selectedRoleId
    };

    // this.tableData.push(entry);
     console.log(entry);
     this.adminService.assignModulesInRole(entry,'').subscribe((response:any)=>{
      if(response && response.success){
        console.log(response);
      }
     })
    // reset
    this.permissions = { C: false, R: false, U: false, D: false };
    this.selectedSubModule = null;
  }
  updatePermissions(modules:any, otherCollection:any) {
  // Flatten all module + submodule ids with permissions
  const permissionMap: any = {};
  //const permissionMapObj: any = {};

  modules.forEach((mod:any) => {
    permissionMap[mod.id] = mod.permission;
    //permissionMapObj[mod.id] = mod.permissionMap;
    if (mod.modulelist) {
      mod.modulelist.forEach((sub:any) => {
        permissionMap[sub.id] = sub.permission;
        //permissionMapObj[sub.id] = sub.permissionMap;
      });
    }
  });

  // Update other collection with permissions if id matches
  otherCollection.forEach((module:any) => {
    if (permissionMap[module.id]) {
      module.permission = permissionMap[module.id];
      //module.permissionMap = permissionMapObj[module.id];
    }

    if (module.submodules) {
      module.submodules.forEach((sub:any) => {
        if (permissionMap[sub.id]) {
          sub.permission = permissionMap[sub.id];
          //sub.permissionMap = permissionMapObj[sub.id];
        }
      });
    }
  });

  return otherCollection;
}
}

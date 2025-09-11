import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { EmployeeInterfaceService } from './external/employee-interface.service';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor(private employeeService:EmployeeInterfaceService) { }

  public pattern = {
    Email: new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/),
    numeric: new RegExp('^[0-9]*$'),
    Time: new RegExp('^([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9])$')
  };

  public Email = (c: FormControl) => {
    if (!c.value)
      return null;
    return this.pattern.Email.test(c.value) ? null : {
      Email: {
        valid: false
      }
    }
  }
  public passwordMatchValidator(passwordField: string, confirmPasswordField: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const password = formGroup.get(passwordField)?.value;
      const confirmPassword = formGroup.get(confirmPasswordField)?.value;

      if (password && confirmPassword && password !== confirmPassword) {
        formGroup.get(confirmPasswordField)?.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      } else {
        formGroup.get(confirmPasswordField)?.setErrors(null);
        return null;
      }
    };
  }
  public validNumeric = (c: FormControl) => {
    // If a field is empty, it shold be considered valid.
    // If empty is not valid, the required validator should be used in addition
    if (!c.value)
      return null;
    return this.pattern.numeric.test(c.value) ? null : {
      invalidNumeric: {
        valid: false
      }
    }
  }
  public validTime = (c: FormControl) => {
    // If a field is empty, it shold be considered valid.
    // If empty is not valid, the required validator should be used in addition
    if (!c.value)
      return null;
    return this.pattern.Time.test(c.value) ? null : {
      invalidTime: {
        valid: false
      }
    }
  }
  public greaterThan(fieldToCompare: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const compareValue = control.parent?.get(fieldToCompare)?.value;
      
      if (compareValue !== null && control.value !== null && control.value <= compareValue) {
        return { greaterThan: true }; // Validation fails
      }
      
      return null; // Validation passes
    };
  }
  public lessThan(fieldToCompare: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const compareValue = control.parent?.get(fieldToCompare)?.value;
      
      if (compareValue !== null && control.value !== null && control.value > compareValue) {
        return { lessThan: true }; // Validation fails
      }
      
      return null; // Validation passes
    };
  }
  public timeGreaterThan(fieldToCompare: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const parent = control.parent;
      if (!parent) return null; // Parent might not be initialized yet
  
      const startTime = parent.get(fieldToCompare)?.value;
      const endTime = control.value;
  
      if (!startTime || !endTime) return null; // Ignore empty values
  
      const start = this.convertToMinutes(startTime);
      const end = this.convertToMinutes(endTime);
  
      return end > start ? null : { timeGreaterThan: true }; // Validation fails if endTime <= startTime
    };
  }
  convertToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }
  validateUsername(): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return this.employeeService.validateCode({ code: control.value }, '')
      .pipe(
        map((response: any) => {
          if (response && response.success) {
            return response.data ? null : { usercodeTaken: true };
          } else {
            return null;
          }
        }),
        catchError(() => of(null)) 
      );
  };
}
}

import { formatDate } from "@angular/common";
import { AbstractControl, ValidationErrors, ValidatorFn, AsyncValidatorFn } from "@angular/forms";
import { isCPF, isPhone } from "brazilian-values";
import { Observable, map, of } from "rxjs";
import { ZipcodeAddressService } from "src/app/services/zipcode-address.service";
import { Address } from "src/app/interfaces/address";
export class RegisterValidators {


  static dateValidator(): ValidatorFn {
    const sameDateAndValid = (firstDate: string, secondDate: Date): boolean => {
      if(secondDate.toString() !== "Invalid Date") {
        const secondDateString = formatDate(secondDate, 'ddMMyyyy', 'pt-BR');
        if(firstDate === secondDateString) {
          return true;
        }
      } 
      return false;
    }

    return (control: AbstractControl): ValidationErrors | null => {
      const actualValue = control.value;

      let day = 0;
      let month = 0;
      let year = 0;

      if(actualValue && actualValue.length === 8) {
        day = actualValue.slice(0, 2);
        month = actualValue.slice(2, 4);
        year = actualValue.slice(4, 8);
      }

      const birthDate = new Date(`${year}/${month}/${day}`);

      const minimumAge = 473040000000;
      const underMaxDate = birthDate.getTime() + minimumAge < Date.now();
      const aboveMinYear = year > 1900;
    
      const validDateBirth = sameDateAndValid(actualValue, birthDate) && aboveMinYear;
      
      if(!validDateBirth){ 
        return { invalidDate: { value: actualValue } };
      } else { 
        if (!underMaxDate) {
          return { aboveMaxDate: { value: actualValue } };
        }
        return null;
      }
    }
  }

  static cpfValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const actualValue = control.value;
     
      return isCPF(actualValue) ? null : { invalidCpf: { value: actualValue } };
    }
  }

  

  static zipcodeValidator(zipcodeAddress: ZipcodeAddressService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const actualValue = control.value;
      
      
      return zipcodeAddress.getAddress(actualValue)
                        .pipe(map((address: Address) => {
                          if(!('erro' in address) && address){
                            return null
                          } else {
                            return { invalidZipcode: { value: actualValue } }
                          }
                        }))
    
    }
  }

  static lengthValidator(length: number, codigoError: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const actualValue = control.value

      return actualValue && actualValue.length === length ? null : { [codigoError]: { value: actualValue } } 
    }
  }

  static phoneValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const actualValue = control.value;
       
      return isPhone(actualValue) ? null : { invalidPhone: { value: actualValue } };
    }
  }

}
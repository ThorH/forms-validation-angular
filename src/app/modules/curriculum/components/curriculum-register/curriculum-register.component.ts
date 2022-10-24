import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr'

import { RegisterValidators } from './register-validators';

import { ZipcodeAddressService } from 'src/app/services/zipcode-address.service';
import { CurriculumService } from 'src/app/services/curriculum.service';

import { Address } from 'src/app/interfaces/address';
import { Curriculum } from 'src/app/interfaces/curriculum';


@Component({
  selector: 'app-curriculum-register',
  templateUrl: './curriculum-register.component.html',
  styleUrls: ['./curriculum-register.component.scss']
})
export class CurriculumRegisterComponent implements OnInit {

  addressSub = new Subscription();
  newAddress: Address = { cep: '', logradouro: '', complemento: '', 
                          bairro: '', localidade: '', uf: '' }; 
  actualAddress = this.newAddress;
  newCurriculum: Curriculum = { name: '', surname: '', birthdate: '',
                                cpf: '', zipcode: '', number: '', phone: '', 
                                email: '', experiences: [] };

  errorsMessage:{[key: string]: string} = {
    required: "Field required",
    invalidDate: "Invalid date",
    aboveMaxDate: "Minimum 15 years old",
    invalidCpf: "Invalid cpf",
    invalidZipcode: "Invalid zipcode",
    invalidPhone: "Invalid phone",
    invalidEmail: "Invalid email"
  };                              

  registerForm = this.formBuilder.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    birthdate: ['', [Validators.required, RegisterValidators.dateValidator()]],
    gender: '',
    cpf: ['', [Validators.required, RegisterValidators.cpfValidator()]],
    zipcode: ['', [Validators.required, RegisterValidators.lengthValidator(8, "invalidZipcode")], RegisterValidators.zipcodeValidator(this.zipcodeAddress)],
    number: ['', Validators.required],
    details: '',
    phone: ['', [Validators.required, RegisterValidators.lengthValidator(11, "invalidPhone"), RegisterValidators.phoneValidator()]],
    email: ['', [Validators.required, Validators.email]],
    experiences: this.formBuilder.array([
      this.formBuilder.control('', Validators.required)
    ])
  });

  constructor(private formBuilder: FormBuilder, private zipcodeAddress: ZipcodeAddressService,
              private curriculumServices: CurriculumService, private toastr: ToastrService) { }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    this.addressSub.unsubscribe();
  }

  onSubmit(): void {

    if(this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      this.toastr.error("Some field is invalid", "Failed!")
    } else {
      this.newCurriculum = this.registerForm.value;
      this.curriculumServices.addCurriculum(this.newCurriculum);

      this.toastr.success("Curriculum registered!", "Success!")      
      this.actualAddress = this.newAddress;
      this.registerForm.reset();
    }
    
  }

  get experiences() {
    return this.registerForm.get('experiences') as FormArray;
  }

  addExperience() {
    this.experiences.push(this.formBuilder.control('', Validators.required));
  }

  removeExperience(index: number) {
    this.experiences.removeAt(index);
  }

  getAddressFromZipcode() {
    const isValid = this.registerForm.get('zipcode')?.valid;

    if(isValid) { 
      this.addressSub.add(this.zipcodeAddress.getAddress(this.registerForm.get('zipcode')?.value)
                                          .subscribe((address) => {
                                            if('cep' in address) {
                                              this.actualAddress = address;
                                            } 
                                          })
                          );
    } else {
      this.actualAddress = this.newAddress;
    }
  }

  invalidFieldInteraction(field: string) {
    let fieldForm = this.registerForm.get(field);

    const dirtyOrTouched = fieldForm?.dirty || fieldForm?.touched;

    return fieldForm?.invalid && dirtyOrTouched;
  }

  invalidExperienceInteraction(field: AbstractControl) {
 
    const dirtyOrTouched = field?.dirty || field?.touched;

    return field?.invalid && dirtyOrTouched;
  
  }

  invalidValueMessage(field: string) {
    const fieldForm = this.registerForm.get(field);
    if(fieldForm?.errors){
      const key = Object.keys(fieldForm?.errors)[0];
      return this.errorsMessage[key];
    }
    return '';
  }

  invalidExperienceMessage(field: AbstractControl) {
    if(field?.errors){
      const key = Object.keys(field?.errors)[0];
      return this.errorsMessage[key];
    }
    return '';
  }

  applyCssFieldState(field: string) {
    const fieldForm = this.registerForm.get(field);
    
    if(fieldForm?.dirty || fieldForm?.touched){
      if(fieldForm?.valid){
        return 'valid-input';
      } else {
        return 'invalid-input';
      }
    } else {
      return 'neutral-input';
    }
    
  }

  applyCssExperienceState(field: AbstractControl) {
    
    if(field?.dirty || field?.touched){
      if(field?.valid){
        return 'valid-input';
      } else {
        return 'invalid-input';
      }
    } else {
      return 'neutral-input';
    }
    
  }

}

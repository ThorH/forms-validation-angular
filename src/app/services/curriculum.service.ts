import { Injectable } from '@angular/core';
import { formatToCPF, formatToCEP, formatToDate } from 'brazilian-values';
import { Curriculum } from 'src/app/interfaces/curriculum';

@Injectable({
  providedIn: 'root'
})
export class CurriculumService {

  constructor() { }

  private curriculumList: Curriculum[] = [];
  

  addCurriculum(newCurriculum: Curriculum) {
    const newCurriculumFormated = this.formatCurriculumValues(newCurriculum)
    this.curriculumList.push(newCurriculumFormated)
  }

  removeCurriculum(index: number) {
    this.curriculumList.splice(index, 1)
  }

  getCurriculumList() {
    return this.curriculumList
  }

  formatCurriculumValues(curriculum: Curriculum){

    if(curriculum.birthdate.length === 8){

      const day = curriculum.birthdate.slice(0, 2);
      const month = curriculum.birthdate.slice(2, 4);
      const year = curriculum.birthdate.slice(4, 8);
      
      const birthDate = new Date(`${year}/${month}/${day}`);

      curriculum.birthdate = formatToDate(birthDate)
    }

    if(!curriculum.gender) { curriculum.gender = "No reported" }

    if(!curriculum.details) { curriculum.details = "No reported" }

    curriculum.zipcode = formatToCEP(curriculum.zipcode);
    curriculum.cpf = formatToCPF(curriculum.cpf);

    return curriculum;

  }


}

import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Curriculum  } from 'src/app/interfaces/curriculum';
import { CurriculumService } from 'src/app/services/curriculum.service';
import { ToastrService } from 'ngx-toastr'
@Component({
  selector: 'app-curriculum-list',
  templateUrl: './curriculum-list.component.html',
  styleUrls: ['./curriculum-list.component.scss']
})
export class CurriculumListComponent implements OnInit {

  curriculumList: Curriculum[] = []
  jsonHref: SafeUrl = '';
  file?: File;
  fileName: string = '';
  showDetails: number[] = [] 

  constructor(private curriculumService: CurriculumService,
              private sanitizer: DomSanitizer, private toastr: ToastrService) { }
 
  ngOnInit(): void {
    this.curriculumList = this.curriculumService.getCurriculumList()
  }

  clickShowDetails(index: number) {
    if(this.showDetails.includes(index)){
      this.showDetails = this.showDetails.filter((showIndex) => showIndex !== index);
    } else {
      this.showDetails.push(index);
    }
  }

  exportCurriculum(index: number) {
    const curriculumJson = JSON.stringify(this.curriculumList[index]);
    const uri = this.sanitizer.bypassSecurityTrustUrl(`data:text/json;charset=UTF-8, ${ encodeURIComponent(curriculumJson)}`);
    this.jsonHref = uri;
  }

  removeCurriculum(index: number) {
    this.curriculumService.removeCurriculum(index);
    this.curriculumList = this.curriculumService.getCurriculumList();
  }

  fileChanged(event: Event) {
    const target = event.target as HTMLInputElement;
    this.file = (target.files as FileList)[0];
    
    if(this.file){
      this.fileName = this.file.name;
    }
  }

  importCurriculum() {

    const fileReader = new FileReader();
    fileReader.onload = () => {
      const dataFile = fileReader.result;

      if(typeof dataFile === 'string') {
        const newCurriculum = JSON.parse(dataFile);
        console.log(newCurriculum)
        this.curriculumService.addCurriculum(newCurriculum);
        console.log(this.curriculumList[0])
      }
    }

    this.file ? fileReader.readAsText(this.file) : this.toastr.error("File not selected!", "Empty file!");
  }


}

import { Component, OnInit } from '@angular/core';
import { SetupService } from 'src/app/services/setup/setup.service';
import { MediaService } from 'src/app/services/media.service';
import { CategoryService } from 'src/app/services/added/category.service';
import { GeneralValitationService } from 'src/app/services/general-valitation.service';
import { LibraryService } from 'src/app/services/library/library.service';

@Component({
  selector: 'app-information-modal',
  templateUrl: './information-modal.component.html',
  styleUrls: ['./information-modal.component.css']
})
export class InformationModalComponent implements OnInit {

  localReferenceString = '';

  constructor(
    private mediaS: MediaService,
    private setup: SetupService,
    private libraryS: LibraryService, 
    private generalValidation: GeneralValitationService,
  ) { }

 

  ngOnInit() {
  }

  
  

  addNoneData(noneData : any){
    for(let i = 0; i < noneData.length; i++){
      if(this.generalValidation.ItsPresent(this.libraryS.NonedataPush, noneData[i])){
        
      }else{
        if(noneData[i].length > 3){
          this.libraryS.NonedataPush.push(
            {
              NAMEREFERENCE : noneData[i]
            }
          )
          this.libraryS.maxData++;
        }else{
          this.libraryS.InvalidDataPush.push(
            {
              NAMEREFERENCE : noneData[i]
            }
          )
          this.libraryS.maxData++; 
        }
      }
    }
  }


  joinDataReferences(){
    let TotalData: string= '';
    for(let i = 0; i < this.libraryS.dataPush.length; i++){
      if(i == this.libraryS.dataPush.length-1){
        TotalData = TotalData + this.libraryS.dataPush[i].NAMEREFERENCE;
      }else{
        TotalData = TotalData + this.libraryS.dataPush[i].NAMEREFERENCE+';';
      }
    }
    if(this.libraryS.NonedataPush.length > 0){
      if(this.libraryS.dataPush.length > 0){
        TotalData = TotalData + ";";
      }
      for(let i = 0; i < this.libraryS.NonedataPush.length; i++){
        if(i == this.libraryS.NonedataPush.length-1){
          TotalData = TotalData + this.libraryS.NonedataPush[i].NAMEREFERENCE;
        }else{
          TotalData = TotalData + this.libraryS.NonedataPush[i].NAMEREFERENCE+';';
        }
      }
    }
    return TotalData;
  }

  saveReferences(){
    let joinedString = this.joinDataReferences();
    if(this.libraryS.maxData <= 8){
      if(this.libraryS.dataReferenceString == 'no-references'){
        this.libraryS.setUploadReferences(
          true, 
          this.mediaS.dataLibrary[this.mediaS.index].IDMEDIA, 
          this.mediaS.dataLibrary[this.mediaS.index].EMAIL, 
          joinedString).subscribe(
            res => {
              console.log(res);
            },
            err => {
              console.log(err);
            }
          );
      }else{
        this.libraryS.setUploadReferences(
          false, 
          this.mediaS.dataLibrary[this.mediaS.index].IDMEDIA, 
          this.mediaS.dataLibrary[this.mediaS.index].EMAIL, 
          joinedString).subscribe(
          res => {
            console.log(res);
          },
          err => {
            console.log(err);
          }
        );
      }
    }
  }


  deleteDataPush(index: number){
    this.libraryS.dataPush.splice(index, 1);
    this.libraryS.maxData--;
  }

  deleteNoneData(index: number){
    this.libraryS.NonedataPush.splice(index, 1);
    this.libraryS.maxData--;
  }
 
  deleteInvalidData(index: number)
  {
    this.libraryS.InvalidDataPush.splice(index, 1);
    this.libraryS.maxData--;
  }


}

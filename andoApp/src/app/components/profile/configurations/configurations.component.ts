import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/Category';
import { CategoryService } from 'src/app/services/added/category.service';
import { IfStmt } from '@angular/compiler';
import { GeneralValitationService } from 'src/app/services/general-valitation.service';
import { SetupService } from 'src/app/services/setup/setup.service';

@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.css']
})
export class ConfigurationsComponent implements OnInit {

  dataCategory: any;
  dataPush: any = [];
  NonedataPush: any = [];
  InvalidDataPush: any = [];
  _category: Category = {
    IDCATEGORY: 0,
    NAMECATEGORY: '',
    DESCRIPTIONCATEGORY: '',
    INSERTMETHOD: ''
  };
  maxData: number = 0;

  constructor(
    private categoryS: CategoryService, 
    private generalValidation: GeneralValitationService,
    private setup: SetupService
    ) { }

  ngOnInit() {
  }

  onChangeSearch(){
    let lastContent: any = this.generalValidation.separateAndReplace(this._category.NAMECATEGORY);
    
    if(lastContent[lastContent.length-1] == '' || lastContent[lastContent.length-1] == null){
      this.dataCategory = null;
    }else{
      this.categoryS.getCategoryLike(lastContent[lastContent.length-1]).subscribe(
        res =>{
          this.dataCategory = res;
        }, 
        err => 
        { 
        }
      );
    }

  }
  
  pushCategory(push : any){
    if(this.dataPush.includes(push)){
    }else{
      this.dataPush.push(push);
      this.maxData++;
    }

    if(this.generalValidation.lookRepeat(this.dataPush, push)){
      this.dataPush.pop();
      this.maxData--;
    }

  }

  addNoneData(noneData : any){
    for(let i = 0; i < noneData.length; i++){
      if(this.generalValidation.ItsPresent(this.NonedataPush, noneData[i])){
        
      }else{
        if(noneData[i].length > 3){
          this.NonedataPush.push(
            {
              IDCATEGORY: null,
              NAMECATEGORY : noneData[i],
              DESCRIPTIONCATEGORY: noneData[i],
              INSERTMETHOD: 'userMethod'
            }
          )
          this.maxData++;
        }else{
          this.InvalidDataPush.push(
            {
              IDCATEGORY: null,
              NAMECATEGORY : noneData[i],
              DESCRIPTIONCATEGORY: noneData[i],
              INSERTMETHOD: 'invalidMethod'
            }
          )
          this.maxData++; 
        }
      }
    }
  }

  savePreferences(){
   let TotalData: string= '';
    for(let i = 0; i < this.dataPush.length; i++){
      if(i == this.dataPush.length-1){
        TotalData = TotalData + this.dataPush[i].NAMECATEGORY;
      }else{
        TotalData = TotalData + this.dataPush[i].NAMECATEGORY+';';
      }
    }
    if(this.NonedataPush.length > 0){
      TotalData = TotalData + ";";
      for(let i = 0; i < this.NonedataPush.length; i++){
        if(i == this.NonedataPush.length-1){
          TotalData = TotalData + this.NonedataPush[i].NAMECATEGORY;
        }else{
          TotalData = TotalData + this.NonedataPush[i].NAMECATEGORY+';';
        }
      }
    }
    this.categoryS.makeUserPreferences(TotalData, this.setup.getMail(this.setup.getCondition())).subscribe(
      res => {
        console.log(res);
      },
      err => console.error(err)
    );
  }


  deleteDataPush(index: number){
    this.dataPush.splice(index, 1);
    this.maxData--;
  }

  deleteNoneData(index: number){
    this.NonedataPush.splice(index, 1);
    this.maxData--;
  }
 
  deleteInvalidData(index: number)
  {
    this.InvalidDataPush.splice(index, 1);
    this.maxData--;
  }

}

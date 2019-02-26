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

// ------------- data of the checkbox's and general config---//

 config: any = {
   searchProfile: false,
   sessionProfile: this.setup.getCondition()
 }

// ------------- data of the preferences --------------//
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
    public generalValidation: GeneralValitationService,
    private setup: SetupService
    ) { }

  ngOnInit() {
    this.showDataMain();
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


  recoverPreferences(){
    let data:any;
    this.categoryS.getPreferences(this.setup.getMail(this.setup.getCondition())).subscribe(
      res => {
        data = res;
        this.setup.setCurrentPreferences(this.setup.getCondition(), data[0].PREFERENCESTRING);
        this.dataPush = [];
        this.NonedataPush = [];
        this.InvalidDataPush = [];
        this.maxData = 0;
        this.showDataMain();
      },
      err => console.error(err)
    );
  }

  showDataMain(){
    if(this.isReferencesStringEmpty() ){
    }else{
      if(this.setup.getCurrentPreferences(this.setup.getCondition()) != ''){
        let ArrayString = this.generalValidation.separateAndReplaceAndMinus(this.setup.getCurrentPreferences(this.setup.getCondition()));
        for(let i = 0; i < ArrayString.length; i++){
          this.dataPush.push(
            {
              IDCATEGORY: null,
              NAMECATEGORY : ArrayString[i],
              DESCRIPTIONCATEGORY: ArrayString[i],
              INSERTMETHOD: 'requestMethod'
            }
          )
          this.maxData++;
        }
      }
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

  isReferencesStringEmpty(){
    if(this.setup.getCurrentPreferences(this.setup.getCondition()) == 'no-references'){
      return true;
    }else{
      return false;
    }
  }

  joinDataReferences(){
    let TotalData: string= '';
    for(let i = 0; i < this.dataPush.length; i++){
      if(i == this.dataPush.length-1){
        TotalData = TotalData + this.dataPush[i].NAMECATEGORY;
      }else{
        TotalData = TotalData + this.dataPush[i].NAMECATEGORY+';';
      }
    }
    if(this.NonedataPush.length > 0){
      if(this.dataPush.length > 0){
        TotalData = TotalData + ";";
      }
      for(let i = 0; i < this.NonedataPush.length; i++){
        if(i == this.NonedataPush.length-1){
          TotalData = TotalData + this.NonedataPush[i].NAMECATEGORY;
        }else{
          TotalData = TotalData + this.NonedataPush[i].NAMECATEGORY+';';
        }
      }
    }
    return TotalData;
  }

  saveConfiguration(){

    if(this.maxData <= 30){
      if(this.isReferencesStringEmpty()){
        let TotalData = this.joinDataReferences();
        this.categoryS.makeUserPreferences(TotalData, this.setup.getMail(this.setup.getCondition())).subscribe(
          res => {
            this.recoverPreferences();
          },
          err => console.error(err)
        );
      }else{
        let TotalData = this.joinDataReferences();
        this.categoryS.UpdateUserPreferences(TotalData, this.setup.getMail(this.setup.getCondition())).subscribe(
          res => {
            this.recoverPreferences();
          },
          err => console.error(err)
        );
      }
    }else{
      console.log("ERROR: preferencias superan las 30 unidades");
    }
    if(this.config.sessionProfile){
      if(!(this.setup.getCondition())){
        this.setup.setCondition(true);
        this.setup.changeOfSession(this.setup.getCondition());
      }
    }else if(this.config.searchProfile == false){
      if(this.setup.getCondition()){
        this.setup.setCondition(false);
        this.setup.changeOfSession(this.setup.getCondition());
      }
    }

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

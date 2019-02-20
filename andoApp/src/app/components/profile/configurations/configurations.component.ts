import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/Category';
import { CategoryService } from 'src/app/services/added/category.service';

@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.css']
})
export class ConfigurationsComponent implements OnInit {

  dataCategory: any;
  dataPush: any = [];
  _category: Category = {
    IDCATEGORY: 0,
    NAMECATEGORY: '',
    DESCRIPTIONCATEGORY: '',
    INSERTMETHOD: ''
  };

  constructor(private categoryS: CategoryService) { }

  ngOnInit() {
  }

  onChangeSearch(){
    if(this._category.NAMECATEGORY == ''){

    }else{
      this.categoryS.getCategoryLike(this._category.NAMECATEGORY).subscribe(
        res =>{
          this.dataCategory = res;
        }, 
        err => 
        {
          console.log(err);
        }
      );
    }
  }
  

  pushCategory(push : any){
    if(this.dataPush.includes(push)){
      console.log('include')
    }else{
      console.log('no include');
      this.dataPush.push(push);
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl, SafeHtml} from '@angular/platform-browser'
import {NgxPaginationModule} from 'ngx-pagination'; 
import { MediaService } from 'src/app/services/media.service';
import { Media } from 'src/app/models/Media';
import { SetupService } from 'src/app/services/setup/setup.service';


@Component({
  selector: 'app-media-library',
  templateUrl: './media-library.component.html',
  styleUrls: ['./media-library.component.css']
})
export class MediaLibraryComponent implements OnInit {


  actualPage: number = 1;
  public labels: any = {
    previousLabel: 'Anterior',
    nextLabel: 'Siguiente',
  };


  rawFrameEmbed = '';
  frameEmbed: SafeHtml;
  numberEpisode = 0;
  
  private _media: Media = {
    IDMEDIA: 0,
    TITLE: '',
    DESCRIPTION: '',
    TOTALEPISODES: 5
  };

  quality: any = [
    '1080p',
    '720p',
    '480p'
  ];

  selectedQuality = '';
  length = 0;

  public get media(): Media {
    return this._media;
  }
  public set media(value: Media) {
    this._media = value;
  }


  data:any;

  dataBind:any ={
    message: '',
    success: false
  }

  dataLibrary: any;

  index:number;



  constructor(
    private sanitizer: DomSanitizer, 
    private mediaS: MediaService,
    private setup: SetupService 
    ) { 

  }

  ngOnInit() {
    this.getLibrary();
    this.hideSearchError();
    this.hideDescriptionError();
    this.hideEmbedError();
    this.hideChapterError();
    this.hideQualityError();
   }
 
 


   //----- informative messages from the formularie about the upload

   searchError = '';
   descriptionError = '';
   chapterError = '';
   embedFrameError = '';
   qualityError = '';
   messageMedia = 'Este es un mensaje';

   showMessage(){
    document.querySelector(".success-message").setAttribute('style',`display: block;`);
    document.querySelector('.btn-save').setAttribute('style',`display: none`);
    if(this.dataBind.success == true){
      this.messageMedia = 'Tu video se ha subido con éxito, recuerda que en cualquier momento puedes editar o agregar otras versiones del mismo desde tu lista de videos, ubicada en la librería de medios de tu perfil. Felicitaciones y sigue así.';
    }else{
      this.messageMedia = 'Ha ocurrido un error inesperado que ha impedido que se agregara el video a tu librería de medios, revisa que no estés subiendo un capitulo que ya se encuentra dentro de tu librería o que todos los parámetros cumplan con las normas, si crees que no hay error, inténtalo mas tarde.';
    }
    console.log(this.dataBind);
   }

   showMessageUnexpected(){
    document.querySelector(".success-message").setAttribute('style',`display: block;`);
    document.querySelector('.btn-save').setAttribute('style',`display: none`);
    this.messageMedia = 'Ha ocurrido un error inesperado  de parte del servidor que ha impedido que se agregara el video a tu librería de medios, por favor inténtelo más tarde.';
   }

  showSearchError(message){
    document.querySelector("#searchError").setAttribute('style',`display: block`);
    this.searchError = message;
  }
  hideSearchError(){
    document.querySelector("#searchError").setAttribute('style',`display: none`);
  }
  showDescriptionError(message){
    document.querySelector("#descriptionError").setAttribute('style',`display: block`);
    this.descriptionError = message
  }
  hideDescriptionError(){
    document.querySelector("#descriptionError").setAttribute('style',`display: none`);
  }
  showChapterError(message){
    document.querySelector("#chapterError").setAttribute('style',`display: block`);
    this.chapterError = message
  }
  hideChapterError(){
    document.querySelector("#chapterError").setAttribute('style',`display: none`);
  }
  showEmbedError(message){
    document.querySelector("#embedError").setAttribute('style',`display: block`);
    this.embedFrameError = message
  }
  hideEmbedError(){
    document.querySelector("#embedError").setAttribute('style',`display: none`);
  }

  showQualityError(message){
    document.querySelector("#qualityError").setAttribute('style',`display: block`);
    this.qualityError = message
  }
  hideQualityError(){
    document.querySelector("#qualityError").setAttribute('style',`display: none`);
  }





  onChangeSearch(){
    if(this._media.TITLE == ''){
      document.querySelector('.autocomplete-input').setAttribute('style',`display: none`);
      this._media.IDMEDIA = 0;
      this._media.DESCRIPTION = '';
      this._media.TOTALEPISODES = 0;
    }else{
      document.querySelector('.autocomplete-input').setAttribute('style',`display: block`);
      this.mediaS.getMediaLike(this._media.TITLE).subscribe(
        res =>{
          this.data = res;
          console.log(res);
        }, 
        err => {
          document.querySelector('.autocomplete-input').setAttribute('style',`display: none`);
          this._media.IDMEDIA = 0;
          this._media.DESCRIPTION = '';
          this._media.TOTALEPISODES = 0;
        }
      );
    }
  }  

  onLostFocus(){
    if(this._media.TITLE == ''){
      document.querySelector('.autocomplete-input').setAttribute('style',`display: none`);
      this._media.IDMEDIA = 0;
      this._media.DESCRIPTION = '';
      this._media.TOTALEPISODES = 0;
    }else{
      document.querySelector('.autocomplete-input').setAttribute('style',`display: block`);
      this.mediaS.getMediaLike(this._media.TITLE).subscribe(
        res =>{
          this.data = res;
          console.log(res);
        }, 
        err => {
          document.querySelector('.autocomplete-input').setAttribute('style',`display: none`);
          this._media.IDMEDIA = 0;
          this._media.DESCRIPTION = '';
          this._media.TOTALEPISODES = 0;
        }
      );
    }
  }

  clickItemSearch(event : any){
    let parseId: number = parseInt(event.target.id);
    this._media.IDMEDIA = this.data[parseId].IDMEDIA;
    this._media.TITLE = this.data[parseId].TITLE;
    this._media.DESCRIPTION = this.data[parseId].DESCRIPTION;
    this._media.TOTALEPISODES = parseInt(this.data[parseId].TOTALEPISODES);
    document.querySelector('.autocomplete-input').setAttribute('style',`display: none`);
  }

  onBlurFrameEmbed(){
    this.frameEmbed =  this.sanitizer.bypassSecurityTrustHtml(this.rawFrameEmbed);
  }

  radioChangeHandler(event: any){
    this.selectedQuality = event.target.value;
  }
  
  restartLibrary(){
    document.querySelector('.backgraound-row').setAttribute('style',`display: none`);
    this._media.IDMEDIA = 0;
    this._media.TITLE = '';
    this._media.DESCRIPTION = '';
    this._media.TOTALEPISODES = 0;
    this.rawFrameEmbed = '';
    this.numberEpisode = 0;
    this.dataBind ={
      message: '',
      success: false
    }
    this.frameEmbed =  this.sanitizer.bypassSecurityTrustHtml('');
    document.querySelector(".success-message").setAttribute('style',`display: none;`);
    document.querySelector('.btn-save').setAttribute('style',`display: block`);
    this.getLibrary();
  }

  showMediaForm(){
    document.querySelector('.backgraound-row').setAttribute('style',`display: block`);
  }
  hideMediaForm(){
    document.querySelector('.backgraound-row').setAttribute('style',`display: none`);
  }


  getLibrary() {
    this.mediaS.getMediaLibrary(this.setup.getMail(this.setup.getCondition()))
      .subscribe(
        res => {
          this.dataLibrary = res;
          this.length = this.dataLibrary.length
        },
        err => console.error(err)
      );
  }

  getLibraryLenght(){
    return this.length;
  }

  saveUpload(){
    let searchBool = false;
    let descriptionBool = false;
    let chapterBool = false;
    let frameEmbedBool = false;
    let qualityBool = false;

    if(this._media.TITLE == ''){
      this.showSearchError('Debe de ingresar una serie, película u OVA valido.');
      searchBool = false;
    }else{
      this.hideSearchError();
      searchBool = true;
    }

    if(this._media.DESCRIPTION == ''){
      this.showDescriptionError('Debe de ingresar una descripción válida para su video.');
      descriptionBool = false;
    }else{
      this.hideDescriptionError();
      descriptionBool = true;
    }

    if(this.rawFrameEmbed == ''){
      this.showEmbedError('Ingrese el código embebido de su video ( <iframe> </iframe> ).');
      frameEmbedBool = false;
    }else{
      this.hideEmbedError();
      frameEmbedBool = true;
    }


    if(this.numberEpisode <= 0){
      this.showChapterError('El número del capítulo debe ser igual o superior a uno.');
      chapterBool = false;
    }else if(this.numberEpisode > this._media.TOTALEPISODES){
      this.showChapterError('El número del capítulo excede la totalidad de los capítulos de esta serie u OVA,  para películas coloque el número 1.');
      chapterBool = false;
    }else{
      this.hideChapterError();
      chapterBool = true;
    }

    if(this.selectedQuality == ''){
      this.showQualityError('Seleccione la calidad de imagen del video a subir');
      qualityBool = false;
    }else{
      this.hideQualityError();
      qualityBool = true;
    }

  //--------------------------------------------------------------------
  
  //----- used----//
  if(searchBool && descriptionBool && chapterBool && frameEmbedBool && qualityBool){
      this.mediaS.saveUpload(
        this.setup.getMail(this.setup.getCondition()),
        this._media,
        this.numberEpisode,
        this.rawFrameEmbed,
        this.selectedQuality).subscribe(
        (res)=>{
           this.dataBind = res;
           this.showMessage();
        },
        (err)=>{
          console.log(err);
          this.showMessageUnexpected();
        }
       )
    }

  }

  onPreMedia(dataLibrary: any, index: number){
    this.mediaS.dataLibrary = dataLibrary;
    this.mediaS.index = index;
    this.mediaS.getEmbedsFrames(
      this.mediaS.dataLibrary[this.mediaS.index].IDMEDIA,
      this.mediaS.dataLibrary[this.mediaS.index].EMAIL,
      this.mediaS.dataLibrary[this.mediaS.index].NUMBEREPISODE+'').subscribe(
      res => {
        this.mediaS.dataEmbed = res;
        this.mediaS.addEmbed = false;
        this.mediaS.frameActive = 0;
        this.mediaS.updateEmbed = true;
        console.log(this.mediaS.dataEmbed);
      },
      err => {
        this.mediaS.noFrameAvailables();
      } 
    );
  }

}

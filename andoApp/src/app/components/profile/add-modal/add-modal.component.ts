import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MediaService } from 'src/app/services/media.service';
import { SetupService } from 'src/app/services/setup/setup.service';
import { ClickOutsideModule } from 'ng4-click-outside';
import { LibraryAddedService } from 'src/app/services/library/library-added.service';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.css']
})
export class AddModalComponent implements OnInit {

  showDropDown = false;
  dissapearDropDown:number = 0;



  quality: any = [
    '1080p',
    '720p',
    '480p'
  ];
  selectedQuality = '';
  length = 0;

  dataSearch: any;
  messageError = '';
  messageSuccess = '';

  constructor(
    private sanitizer: DomSanitizer, 
    public mediaS: MediaService,
    public setup: SetupService,
    public libraryAdded: LibraryAddedService
    ) { 

  }

  ngOnInit() {

  }

  
  saveChapter(){
    if(this.libraryAdded._media.TITLE == '' 
      || this.libraryAdded._media.IDMEDIA == 0 
      || this.libraryAdded._media.DESCRIPTION == '' 
      || this.libraryAdded._media.TOTALEPISODES == 0
      || this.libraryAdded.PARCIALEPISODE <= 0){
        this.setErrorMessage('No se cuenta con la información completa para pasar a la siguiente etapa, ' +
        'verifica que hayas seleccionado un título valido o que no existan campos en blanco. De persistir '+
        'el problema cierra la ventana y vuelve a empezar.')
        this.showErrorAlert();
    }else{
      if(this.libraryAdded.PARCIALEPISODE > this.libraryAdded._media.TOTALEPISODES){
        this.setErrorMessage('El número de episodio ingresado supera al número total de episodios de la serie, '+
        'revise que el número ingresado este dentro de los parámetros. Recuerde que para películas debe de '+
        'ingresar un 1 en su lugar independiente de si es secuela.')
        this.showErrorAlert();
      }else{
        this.mediaS.saveUpload(
          this.setup.getMail(this.setup.getCondition()),
          this.libraryAdded._media,
          this.libraryAdded.PARCIALEPISODE,
          this.selectedQuality
        ).subscribe(
          (res)=>{
            let data :any = res;
            if(data.success){
              document.getElementById("step2").classList.add('active');
              this.hideErrorAlert();
              this.setSuccessMessage('Primer paso completado, ahora al refrescar tu librería de medios podrás ver que el '+
              'capítulo se anexo correctamente, aunque aún falta un paso, debe de agregar un frame de video inicial para que tu '+
              'capitulo pueda ser indexado en la página y los usuarios puedan acceder a él.')
              this.showSuccessAlert();
              this.libraryAdded.uploadProccess = !this.libraryAdded.uploadProccess;
              this.libraryAdded.frameProccess = !this.libraryAdded.frameProccess;
            }else{
              this.setErrorMessage('Un error inesperado ha finalizado la operación sin éxito, revise que el capítulo no '+
              'se encuentre ya en su librería de medios o que todos los valores dados son los correctos, si usted cree '+
              'que el problema es debido a otra razón, por favor inténtelo mas tarde. ')
              this.showErrorAlert();
            }
          },
          (err)=>{
            this.setErrorMessage('Un error inesperado ha finalizado de parte del servidor ha impedido que se finalice la '+
            'operación, por favor inténtelo mas tarde.  ')
            this.showErrorAlert();
          }
         )
        
      }
      
    }
  }

  saveFrame(){
    if(this.selectedQuality == ''
       || this.libraryAdded.rawFrameEmbed == ''
       || this.libraryAdded.frameEmbed == ''){
        this.setErrorMessage('No se cuenta con la información completa para pasar a la siguiente etapa, '+
        'verifica que hayas selecciona una calidad para tu video,  puedes usar 1080p para cualquier '+
        'calidad igual o superior a esa o cerciórate que hayas ingresado en el código de inserción del video.')
        this.showErrorAlert();
        this.hideSuccessAlert();
    }else{
      this.mediaS.saveUploadEmbed(
        this.libraryAdded._media.IDMEDIA,
        this.setup.getMail(this.setup.getCondition()),
        this.libraryAdded.PARCIALEPISODE,
        this.libraryAdded.rawFrameEmbed,
        this.selectedQuality).subscribe(
          (res)=>{
            let data :any = res;
            if(data.success){
              document.getElementById("step3").classList.add('active');
              this.hideErrorAlert();
              this.setSuccessMessage('Felicidades a completado este paso y su video ya está para ser visto y'+
              ' buscado por los demás usuarios, recuerde que siempre puede agregar, modificar o eliminar '+
              'contenido como nuevas versiones del mismo capítulo desde el icono Editar video.')
              this.showSuccessAlert();
              this.libraryAdded.frameProccess = !this.libraryAdded.frameProccess;
              this.libraryAdded.completeProccess = !this.libraryAdded.completeProccess;
            }else{
              this.setErrorMessage('Un error inesperado ha finalizado la operación sin éxito, por favor inténtelo mas tarde. ')
              this.showErrorAlert();
              this.hideSuccessAlert();
            } 
          },
          (err)=>{
            this.setErrorMessage('Un error inesperado ha finalizado de parte del servidor ha impedido que se finalice la '+
            'operación, por favor inténtelo mas tarde.  ')
            this.showErrorAlert();
            this.hideSuccessAlert();
          }
        )
    }
  }
  setErrorMessage(message: string){
    this.messageError = message;
  }
  setSuccessMessage(message: string){
    this.messageSuccess = message;
  }
  showErrorAlert(){
    document.querySelector('.alert-danger').setAttribute('style',`display: block`);
  }
  hideErrorAlert(){
    document.querySelector('.alert-danger').setAttribute('style',`display: none`);
  }
  showSuccessAlert(){
    document.querySelector('.alert-success').setAttribute('style',`display: block`);
  }
  hideSuccessAlert(){
    document.querySelector('.alert-success').setAttribute('style',`display: none`);
  }

  onChangeSearch(){
    if(this.libraryAdded.PARCIALTITLE == ''){
      this.libraryAdded._media.IDMEDIA = 0;
      this.libraryAdded._media.DESCRIPTION = '';
      this.libraryAdded._media.TOTALEPISODES = 0;
      this.showDropDown = false;
    }else{
      this.mediaS.getMediaLike(this.libraryAdded.PARCIALTITLE).subscribe(
        res =>{
          this.dataSearch = res;
          this.showDropDown = true;
        }, 
        err => {
          this.libraryAdded._media.IDMEDIA = 0;
          this.libraryAdded._media.DESCRIPTION = '';
          this.libraryAdded._media.TOTALEPISODES = 0;
        }
      );
    }
  } 

  radioChangeHandler(event: any){
    this.selectedQuality = event.target.value;
  }

  sendMedia(value: any){
    this.libraryAdded.PARCIALTITLE = value.TITLE;
    this.libraryAdded._media.IDMEDIA = value.IDMEDIA;
    this.libraryAdded._media.TITLE = value.TITLE;
    this.libraryAdded._media.DESCRIPTION = value.DESCRIPTION;
    this.libraryAdded._media.TOTALEPISODES = value.TOTALEPISODES;
    this.showDropDown = false;
    this.hideErrorAlert();
  }

  toggleDropDown(){
    this.showDropDown = !this.showDropDown;
    if(this.showDropDown == false){
      this.dissapearDropDown = 0;
    }
  }

  onClickedOutside() {
    this.dissapearDropDown++;
    if(this.dissapearDropDown > 1){
      this.showDropDown = !this.showDropDown;
      this.dissapearDropDown = 0;
    }
  }

  onBlurFrameEmbed(){
    this.libraryAdded.frameEmbed =  this.sanitizer.bypassSecurityTrustHtml(this.libraryAdded.rawFrameEmbed);
  }

}

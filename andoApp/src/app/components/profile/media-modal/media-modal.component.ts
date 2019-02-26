import { Component, OnInit } from '@angular/core';
import { MediaService } from 'src/app/services/media.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl, SafeHtml} from '@angular/platform-browser'

@Component({
  selector: 'app-media-modal',
  templateUrl: './media-modal.component.html',
  styleUrls: ['./media-modal.component.css']
})
export class MediaModalComponent implements OnInit {

  header: any = {
    id: 0,
    email: '',
    numberEpisode: 0
  }
  body:any ={
    id: 0,
    frame: '',
    quality: ''
  }
  quality: any = [
    '1080p',
    '720p',
    '480p'
  ];
  qualityNumber: number = 0;
  rawFrameEmbed: string;
  frameEmbed: SafeHtml;
  updateFrame: boolean = false;
  selectedQuality = '';
  markError: boolean = false;

  constructor(
    public mediaS : MediaService,
    private sanitizer: DomSanitizer
    ) { }

  ngOnInit() {
    
  }



  saveUploadFrame(){
    if(this.rawFrameEmbed == '' || this.selectedQuality == ''){
      this.markError = true;
    }else{
      console.log(this.header.id, this.header.email, this.header.numberEpisode, this.rawFrameEmbed, this.selectedQuality);
      this.mediaS.saveUploadEmbed(this.header.id, this.header.email, this.header.numberEpisode, this.rawFrameEmbed, this.selectedQuality)
      .subscribe(
        res => {
          console.log(res);
          this.onPreMedia(this.header.id, this.header.email, this.header.numberEpisode);
          this.mediaS.addEmbed = false;
          this.rawFrameEmbed = '';
          this.markError = false;
        },
        err => {
          console.log(err);
          this.mediaS.noFrameAvailables();
        }
      );
    }
  }

  updateUploadFrame(){
    if(this.selectedQuality != ''){
      this.body.quality = this.selectedQuality;
      }else{
    }
    this.mediaS.updatedFrames(this.body.id, this.rawFrameEmbed, this.body.quality).subscribe(
      res => {
          this.onPreMedia(this.header.id, this.header.email, this.header.numberEpisode);
          this.mediaS.addEmbed = false;
          this.rawFrameEmbed = '';
       },
       err => {
        this.mediaS.noFrameAvailables();
       }
     );


  }


  setHeader(id:number,email: string, numberEpisode: number){
    this.header.id = id;
    this.header.email = email;
    this.header.numberEpisode = numberEpisode;
  }
  setBody(id:number, frame: string, quality: string){
    this.body.id = id;
    this.body.frame = frame;
    this.body.quality = quality;
  }
  
  setQualityNumber(quality){
    if(quality == '1080p' && this.body.quality == '1080p'){
      return true;
    }else if(quality == '720p' && this.body.quality == '720p'){
      return true;
    }else if(quality == '480p' && this.body.quality == '480p'){
      return true;
    }
    return false;
  }

  showModalFrame(){
    this.mediaS.addEmbed = true;
    this.rawFrameEmbed = '';
    this.updateFrame = false;
    this.markError = false;
  }

  showModalFrameUpdated(){
    this.mediaS.addEmbed = true;
    this.rawFrameEmbed = this.body.frame;
    this.updateFrame = true;
    this.selectedQuality = '';
    this.markError = false;
  }

  deleteFrame(){
    this.mediaS.deleteFrames(this.body.id).subscribe(
      res => {
          this.onPreMedia(this.header.id, this.header.email, this.header.numberEpisode);
          this.mediaS.addEmbed = false;
          this.rawFrameEmbed = '';
       },
       err => {
        this.mediaS.noFrameAvailables();
       }
     );
  }

  onSafeHtml(html: string){
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  changeFrame(numberFrame: number){
    this.mediaS.frameActive = numberFrame;
    this.mediaS.addEmbed = false;
    this.updateFrame = false;
  }

  closeNewFrame(){
    this.mediaS.addEmbed = false;
    this.rawFrameEmbed = '';
    this.updateFrame = false;
    this.markError = false;
    this.selectedQuality = '';
  }
  
  radioChangeHandler(event: any){
    this.selectedQuality = event.target.value;
    this.markError = false;
  }

  onPreMedia(id:number,email: string, numberEpisode: number){
    this.mediaS.getEmbedsFrames(
      id,
      email,
      numberEpisode+'').subscribe(
      res => {
        this.mediaS.dataEmbed = res;
      },
      err => {
        this.mediaS.noFrameAvailables();
      }
    );
  }

}

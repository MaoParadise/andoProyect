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
  rawFrameEmbed: string;
  frameEmbed: SafeHtml;
  frameActive: number =0;
  selectedQuality = '';

  constructor(
    private mediaS : MediaService,
    private sanitizer: DomSanitizer
    ) { }

  ngOnInit() {
    
  }

  saveUploadFrame(){
    this.mediaS.saveUploadEmbed(this.header.id, this.header.email, this.header.numberEpisode, this.rawFrameEmbed, this.selectedQuality)
      .subscribe(
        res => {
          this.onPreMedia(this.header.id, this.header.email, this.header.numberEpisode);
          this.mediaS.addEmbed = false;
          this.rawFrameEmbed = '';
        },
        err => console.error(err)
      );
  }


  setHeader(id:number,email: string, numberEpisode: number){
    this.header.id = id;
    this.header.email = email;
    this.header.numberEpisode = numberEpisode;
  }

  showModalFrame(){
    this.mediaS.addEmbed = true;
    this.rawFrameEmbed = '';
  }

  onSafeHtml(html: string){
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  changeFrame(numberFrame: number){
    this.frameActive = numberFrame;
    this.mediaS.addEmbed = false;
  }

  closeNewFrame(){
    this.mediaS.addEmbed = false;
    this.rawFrameEmbed = '';
  }
  
  radioChangeHandler(event: any){
    this.selectedQuality = event.target.value;
  }

  onPreMedia(id:number,email: string, numberEpisode: number){
    this.mediaS.getEmbedsFrames(
      id,
      email,
      numberEpisode+'').subscribe(
      res => {
        this.mediaS.dataEmbed = res;
      },
      err => console.error(err)
    );
  }

}

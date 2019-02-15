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
  frameEmbed: SafeHtml;

  constructor(
    private mediaS : MediaService,
    private sanitizer: DomSanitizer
    ) { }

  ngOnInit() {
    
  }

  setHeader(id:number,email: string, numberEpisode: number){
    this.header.id = id;
    this.header.email = email;
    this.header.numberEpisode = numberEpisode;
  }

  getFrames(){
    
  }

  onSafeHtml(html: string){
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  

}

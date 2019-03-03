import { Component, OnInit } from '@angular/core';
import { PublicMediaService } from 'src/app/services/media/public-media.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent implements OnInit {

  dataRawFrame: any;
  dataFrames: any = [];
  dataUploaders: any;
  safeHtml: SafeHtml
  frameActive: number = 0;

  header: any = {
    id: 0,
    email: '',
    username: '',
    numberEpisode: 0
  }
  body:any ={
    id: 0,
    frame: ''
  }

  params = this.activatedRoute.snapshot.params;

  constructor(
    private _publicMedia: PublicMediaService,
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getPublicFrames(this.params.id,this.params.episode);
  }

  getPublicFrames(idMedia: number, episode: string){
    this._publicMedia.getPublicEmbedsFrames(idMedia,episode)
    .subscribe(
      (res)=>{
        this.dataRawFrame = res;
        this.dataUploaders = this._publicMedia.processPublicFrame(this.dataRawFrame);
        console.log(this.dataRawFrame);
      },
      (err)=>{
        
      }
    );
  }

  getFrameById(){
     this.dataFrames = this._publicMedia.getFramesByMail( this.dataRawFrame ,this.dataUploaders[0]);
     console.log(this.dataFrames);
  }

  onSafeHtml(html: string){
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }



}

import { Component, OnInit } from '@angular/core';
import { PublicMediaService } from 'src/app/services/media/public-media.service';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent implements OnInit {

  dataRawFrame: any;
  dataFrames: any = [];
  dataUploaders: any;

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

  constructor(
    private _publicMedia: PublicMediaService
  ) { }

  ngOnInit() {
    this.getPublicFrames(1,'7');
  }

  getPublicFrames(idMedia: number, episode: string){
    this._publicMedia.getPublicEmbedsFrames(idMedia,episode)
    .subscribe(
      (res)=>{
        this.dataRawFrame = res;
        this.dataUploaders = this._publicMedia.processPublicFrame(this.dataRawFrame);
      },
      (err)=>{
        
      }
    );
  }

  getFrameById(){
    console.log(this._publicMedia.getFramesByMail( this.dataRawFrame ,this.dataUploaders[1]));
  }



}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeneralValitationService } from 'src/app/services/general-valitation.service';

@Component({
  selector: 'app-media-test',
  templateUrl: './media-test.component.html',
  styleUrls: ['./media-test.component.css']
})
export class MediaTestComponent implements OnInit {

// Los / por -
// Los ? por ¿
// Los = por +


  params = this.activatedRoute.snapshot.params;
  urlStringsify = this.generalValidation.replaceSendVideo(this.params.url)
  url: string = 'http://'+this.urlStringsify;

  constructor(
    private activatedRoute: ActivatedRoute,
    private generalValidation: GeneralValitationService
  ) { }

  ngOnInit() {
    document.querySelector('.app-navigation').setAttribute('style',`display: none`);
  }




}

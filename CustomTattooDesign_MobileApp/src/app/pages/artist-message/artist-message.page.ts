import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Job } from 'src/app/model/job';
import { ArtistApiService } from 'src/app/services/artist-api.service';
import { Storage } from '@ionic/storage-angular';
import { Message } from 'src/app/model/message';
import { Artist } from 'src/app/model/artist';
import { ActionSheetController, AlertController, IonContent } from '@ionic/angular';

@Component({
  selector: 'app-artist-message',
  templateUrl: './artist-message.page.html',
  styleUrls: ['./artist-message.page.scss'],
})
export class ArtistMessagePage implements OnInit {
  @ViewChild(IonContent) content: IonContent;

  job : Job;
  artist : Artist;
  current_message : string = '';

  constructor(private router : Router, 
              private artistService : ArtistApiService,
              private storage : Storage,
              public actionSheetController: ActionSheetController,
              public alertController: AlertController) { 
                
    if (this.router.getCurrentNavigation().extras.state) {
      this.job = this.router.getCurrentNavigation().extras.state.job;
    }
  }

  ngOnInit() {
    this.storage.get("ARTIST").then(
      artist => this.artist = artist
    );

    this.scrollToBottom();
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom();
      }
    }, 400);
  }

  sendMessage() {
    var tempMsg : Message = {
        id : 0,
        design_id : null,
        body : this.current_message,
        created_at : new Date(),
        designer_id : this.artist.id,
        comment_picture : null,
        read : false
    }

    
    this.scrollToBottom();

    /* code to send msg to db goes here */
    this.artistService.sendMessage(this.job, tempMsg, this.artist).then(async result => {
      if (result == true) {
        console.log('message sent successfully');
        this.job.conversation.push(tempMsg);
        this.current_message = '';
      } else {
        console.log('message not sent successfully');
        const alert = await this.alertController.create({
          header: 'Error',
          subHeader: 'Message Not Sent',
          buttons: ['OK']
        });
    
        await alert.present();
      }
    }).catch();
  }

  refreshConversation() {
    var tempConversation : Message[] = [];

    this.artistService.getJobMessages(this.job).then(data => {
      let messages = data as Array<Object>;
      var tempMsg : Message;

      messages.forEach(m => {
        tempMsg = {
          id: m["messageId"],
          design_id: m["designId"],
          body: m["body"],
          created_at: new Date(m["createdAt"]),
          designer_id: m["designerId"],
          comment_picture: null, //API returns a boolean - need to fix
          read: m["read"],
        }
      tempConversation.push(tempMsg);
      });
    }).then(() => {
      this.job.conversation = tempConversation;
    })
  }

  async presentDesignsOptionSheet() {
    //TODO: need some sort of 'for each design, create button' code
    const actionSheet = await this.actionSheetController.create({
      header: 'Designs',
      buttons: [{
        text: 'Add',
        icon: 'add-circle-outline',
        handler: () => {
          console.log('Need Cordova - Saving Until the End');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
    await actionSheet.onDidDismiss();
  }
}

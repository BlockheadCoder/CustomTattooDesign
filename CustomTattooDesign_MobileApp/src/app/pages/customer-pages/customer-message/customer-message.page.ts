import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, IonContent } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Job } from 'src/app/model/job';
import { Message } from 'src/app/model/message';
import { CustomerApiService } from 'src/app/services/customer-api.service';

@Component({
  selector: 'app-customer-message',
  templateUrl: './customer-message.page.html',
  styleUrls: ['./customer-message.page.scss'],
})
export class CustomerMessagePage implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  current_message : string = '';
  job : Job = {
    "jobId" : 0,
    "status" : "",
    "title" : "",
    "customerName" : "",
    "tattooLocation" : "",
    "tattooType" : "",
    "tattooStyle" : "",
    "color" : false,
    "commission" : 0.0,
    "description" : "",
    "conversation" : [],
    "designImages" : []
  };

  constructor(private router : Router, 
    private storage : Storage,
    private customerService : CustomerApiService,
    public actionSheetController: ActionSheetController,
    public alertController: AlertController) { 
      
      this.storage.get("JOB").then(job => {
        this.job = job;
      }).then(() => {
        this.refreshConversation()
      });
  }

  ngOnInit() {
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
      designer_id : 0,
      comment_picture : null,
      read : false
    }

    this.scrollToBottom();

    /* code to send msg to db goes here */
    this.customerService.sendMessage(this.job, tempMsg).then(async result => {
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
    }).catch(error => console.log(error));
  }

  refreshConversation() {
    this.customerService.refreshConversation(this.job);
    this.scrollToBottom();
  }

}

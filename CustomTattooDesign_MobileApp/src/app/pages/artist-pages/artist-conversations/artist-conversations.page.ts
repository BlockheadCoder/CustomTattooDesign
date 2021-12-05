import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Job } from 'src/app/model/job';
import { Message } from 'src/app/model/message';
import { ArtistApiService } from 'src/app/services/artist-api.service';
import { Storage } from '@ionic/storage-angular';
import { Artist } from 'src/app/model/artist';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-artist-conversations',
  templateUrl: './artist-conversations.page.html',
  styleUrls: ['./artist-conversations.page.scss'],
})
export class ArtistConversationsPage implements OnInit {

  loaded : Boolean = false;
  artist : Artist;
  sendData : NavigationExtras;
  jobs : Job[] = [];

  constructor(private artistService : ArtistApiService, 
              private storage : Storage,
              private router : Router,
              public loadingController: LoadingController) { }

  ngOnInit() {
    this.storage.get("ARTIST").then(
      artist => this.artist = artist
    );
    this.getConversations();
  }

  ngAfterViewChecked() {
    if (this.loaded) {
      this.jobs.sort(this.compareBylastSentDateTime);
    }
  }

  async getConversations() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await loading.present();

    this.artistService.getClaimedJobs(this.artist).then(data => {
      let jobs = data as Array<Object>;
      var tempJob : Job;
      var tempMsg : Message;
      var tempMsgArr : []

      jobs.forEach(j => {
        tempJob = {
          jobId: j["jobId"],
          status: j["state"],
          title: j["title"],
          customerName: j["customerName"],
          tattooLocation: j["tattooLocation"],
          tattooType: j["tattooType"],
          tattooStyle: j["tattooStyle"],
          color: j["color"],
          commission: Math.round(j["commission"] * 100) / 100,
          description: j["description"],
          conversation: [],
          designImages: [],
          artistName: ""
        }
        tempMsgArr = j["messages"]

        tempMsgArr.forEach(m => {
          tempMsg = {
            id: m["messageId"],
            design_id: m["designId"],
            body: m["body"],
            created_at: new Date(m["createdAt"]),
            designer_id: m["designerId"],
            comment_picture: null,
            read: m["read"]
            }
          tempJob.conversation.push(tempMsg);
        })
        this.jobs.push(tempJob);
      })
      this.jobs.sort(this.compareBylastSentDateTime);
      loading.dismiss();
      this.loaded = true;
    }).catch(err => {
      console.log(err);
    })
  }

  async refreshConversations() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await loading.present();

    this.jobs.forEach(job => {
      this.artistService.getJobMessages(job).then(data => {
        let messages = data as Array<Object>;
        var tempMsg : Message;

        messages.forEach(m => {
          tempMsg = {
            id: m["messageId"],
            design_id: m["designId"],
            body: m["body"],
            created_at: new Date(m["createdAt"]),
            designer_id: m["designerId"],
            comment_picture: null,
            read: m["read"]
          }
          job.conversation.push(tempMsg);
        })
        this.jobs.sort(this.compareBylastSentDateTime); 
        loading.dismiss();
      }).catch(err => {
        console.log(err)
      });
    });
  }

  viewConversation(job : Job) {
    this.sendData = { state: { job : job } };

    this.router.navigate(['artist-message'], this.sendData).catch(err => 
      console.log(err)
    );
  }

  getLastMessage(job : Job) : String {
    var msg = '';
    if (job.conversation.length > 0) {
      var msg : string = job.conversation[job.conversation.length - 1].body;
      if (msg.length > 35) {
        msg = msg.substring(0, 33).trim() + "..."
      }
    }
    return msg;
  }

  compareBylastSentDateTime = (a : Job, b : Job) => {
    var aComp : Date;
    var bComp : Date;
    
    if (a.conversation.length == 0) {
      aComp = new Date(500000000000); //default to very old date, November 1985
    } else {
      aComp = a.conversation[a.conversation.length - 1].created_at;
    }
    if (b.conversation.length == 0) {
      bComp = new Date(500000000000); //default to very old date, November 1985
    } else {
      bComp = b.conversation[b.conversation.length - 1].created_at;
    }

    var comparison = 0;
    if (aComp < bComp) {
        comparison = 1;
    } else if (aComp > bComp) {
        comparison = -1;
    }
    return comparison;
  }
}

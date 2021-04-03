import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-claimed-jobs',
  templateUrl: './claimed-jobs.page.html',
  styleUrls: ['./claimed-jobs.page.scss'],
})
export class ClaimedJobsPage implements OnInit {

  segmentValue = "inProgress";

  inProgressJobs = [];
  approvedJobs = [];
  completedJobs = [];

  constructor() { }

  ngOnInit() {
  }
}

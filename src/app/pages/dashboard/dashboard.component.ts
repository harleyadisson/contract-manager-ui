import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-dashbord',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  activeContracts: number = 0;
  activeProviders: number = 0;

  constructor() { }

  ngOnInit(): void {
    fetch(`http://localhost:3000/contract`)
    .then(data => {
      return data.json()
    })
    .then(contracts => {
      console.log(contracts.length)
      this.activeContracts = contracts.length
    })
    fetch('http://localhost:3000/provider')
    .then(data => {
      return data.json()
    })
    .then(providers => {
    this.activeProviders = providers.length
    })
  }

}

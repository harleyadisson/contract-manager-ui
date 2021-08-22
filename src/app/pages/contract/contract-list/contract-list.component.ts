import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.css']
})



export class ContractListComponent implements OnInit {

  constructor() { }

  editCache: { [key: string]: { edit: boolean; data: ItemData } } = {};
  listOfData: ItemData[] = [];

  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    this.editCache[id] = {
      data: { ...this.listOfData[index] },
      edit: false
    };
  }

  saveEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    Object.assign(this.listOfData[index], this.editCache[id].data);
    this.editCache[id].edit = false;

    console.log(this.listOfData[index])

    fetch('http://localhost:3000/contract', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "id": this.listOfData[index].id,
        "name": this.listOfData[index].name,
        "serviceDescription": this.listOfData[index].description,
        "provider": {"document": this.listOfData[index].document},
        "term": {
          "id": this.listOfData[index].termId,
          "startDate": this.listOfData[index].startDate,
          "endDate": this.listOfData[index].endDate
        }
    }
        ),
    })
      .then(data => {
        return data.json()
      })
      .then(response => {
        console.log(response)
      });
  }

  updateEditCache(): void {
    this.listOfData.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  remove(id: string): void {
    console.log(id)
    const index = this.listOfData.findIndex(item => item.id === id);

    console.log(this.listOfData[index])

    fetch(`http://localhost:3000/contract?id=${id}`, {
      method: 'delete',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: "" 
    })
      .then(data => {
        return data.json()
      })
      .then(response => {
        console.log(response)
       
      });
      location.reload();
      
  }

   ngOnInit(): void {

    fetch('http://localhost:3000/contract')
    .then(data => {
      return data.json()
    })
    .then(contracts => {
      console.log(contracts)
      const data = [];
      for (let contract of contracts) {
        data.push({
          id: contract.id,
          name: contract.name,
          description: contract.serviceDescription,
          document: contract.provider.document,
          startDate: contract.term.startDate,
          endDate: contract.term.endDate,
          termId: contract.term.id
        });
      
      this.listOfData = data;
      this.updateEditCache();
    }}); 
  }
}

interface ItemData {
  id: string;
  name: string;
  description: string;
  document: string;
  termId: string;
  startDate: string;
  endDate: string;
}
